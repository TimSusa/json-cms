import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { List, ListItem, TextField, Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import DialogContentText from '@material-ui/core/DialogContentText'
import AddTypeFieldDialog from './AddTypeFieldDialog'
import Form from '@rjsf/material-ui'
import DialogTitle from '@material-ui/core/DialogTitle'
import MonacoEditor from 'react-monaco-editor'
import { useDispatch, useSelector } from 'react-redux'
import {
  setTypesDialogOpen,
  changeTypeName,
  changeTypeNamespace,
  changeTypeTitle,
  changeTypeDescription,
  setSchema
  //changeTypeField
} from '../global-state'

export default function SchemaRegistryDialog() {
  const dispatch = useDispatch()
  const [isAddTypeFieldDialogOpen, setIsAddTypeFieldDialogOpen] = useState(
    false
  )
  const isOpen = useSelector((state) => state.isTypesDialogOpen)
  const currentTypeElementIdx = useSelector(
    (state) => state.currentTypeElementIdx
  )
  const types = useSelector((state) => state.types || [])
  const { name, namespace, schema, uiSchema } =
    types[currentTypeElementIdx] || {}
  const { title, description } = schema
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editorValue, setEditorValue] = useState(schema)
  const options = {
    selectOnLineNumbers: true
  }
  useEffect(() => {
    if (isEditorOpen) {
    } else {
      setEditorValue(schema)
    }
  }, [isEditorOpen, schema])
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='types-form-dialog-title'
    >
      <DialogTitle id='types-form-dialog-title'> {'Schema'}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>

        <List>
          <ListItem>
            <FormControl>
              <TextField disabled value='Name:'></TextField>
            </FormControl>
            <FormControl>
              <TextField
                onChange={(evt) =>
                  dispatch(changeTypeName({ name: evt.target.value }))
                }
                value={name || ''}
              ></TextField>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl>
              <TextField disabled value='Namespace:'></TextField>
            </FormControl>
            <FormControl>
              <TextField
                value={namespace || ''}
                onChange={(evt) =>
                  dispatch(changeTypeNamespace({ namespace: evt.target.value }))
                }
              ></TextField>
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl>
              <TextField disabled value='Title:'></TextField>
            </FormControl>
            <FormControl>
              <TextField
                value={title || ''}
                onChange={(evt) =>
                  dispatch(changeTypeTitle({ title: evt.target.value }))
                }
              ></TextField>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl>
              <TextField disabled value='Description:'></TextField>
            </FormControl>
            <FormControl>
              <TextField
                value={description || ''}
                onChange={(evt) =>
                  dispatch(
                    changeTypeDescription({ description: evt.target.value })
                  )
                }
              ></TextField>
            </FormControl>
          </ListItem>
          <ListItem>
            <Typography variant='h5'>Preview</Typography>
          </ListItem>
          {!isEditorOpen && (
            <ListItem>
              <Form
                disabled
                schema={schema}
                uiSchema={uiSchema && uiSchema}
                children={true}
              />
              <AddTypeFieldDialog
                isOpen={isAddTypeFieldDialogOpen}
                onClose={() => setIsAddTypeFieldDialogOpen(false)}
              ></AddTypeFieldDialog>
            </ListItem>
          )}
        </List>
        {isEditorOpen && (
          <MonacoEditor
            //width='800'
            height='500'
            language='json'
            theme='vs-dark'
            options={options}
            value={JSON.stringify(editorValue, null, 2)}
            onChange={(value) => {
              setEditorValue(JSON.parse(value))
              dispatch(setSchema({ schema: JSON.parse(value) }))
            }}
            // editorDidMount={::this.editorDidMount}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() => setIsEditorOpen(!isEditorOpen)}
          color='primary'
        >
          Switch Preview
        </Button>
        {!isEditorOpen && (
          <Button
            variant='contained'
            onClick={(e) => {
              setIsAddTypeFieldDialogOpen(true)
            }}
            color='primary'
          >
            Add Field
          </Button>
        )}
        <Button variant='contained' onClick={handleClose} color='primary'>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )

  function handleClose({ schema }) {
    console.log('tim ', editorValue)
    if (isEditorOpen) {
      dispatch(setSchema({ schema: editorValue }))
    } else {
    }
    setIsEditorOpen(false)

    //setIsAddTypeFieldDialogOpen(false)
    dispatch(setTypesDialogOpen({ isTypesDialogOpen: false }))
  }
}
