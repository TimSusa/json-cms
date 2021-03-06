import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { List, ListItem, TextField, Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import DialogContentText from '@material-ui/core/DialogContentText'
import SchemaDialogFieldAdd from './SchemaDialogFieldAdd'
import Form from '@rjsf/material-ui'
import DialogTitle from '@material-ui/core/DialogTitle'
import MonacoEditor from 'react-monaco-editor'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSchemasDialogOpen,
  changeSchemaName,
  changeSchemaNamespace,
  changeSchemaTitle,
  changeSchemaDescription,
  setSchema
  //changeSchemaField
} from '../global-state'

export default function SchemaDialog() {
  const dispatch = useDispatch()
  const [isSchemaDialogFieldAddOpen, setIsSchemaDialogFieldAddOpen] = useState(
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
  const [editorValue, setEditorValue] = useState(
    JSON.stringify(schema, null, 2)
  )
  const options = {
    selectOnLineNumbers: true
  }
  useEffect(() => {
    if (!isEditorOpen) {
      //dispatch(setSchema({ schema: JSON.parse(editorValue) }))
    } else {
      setEditorValue(JSON.stringify(schema, null, 2))
      console.log('use effect set schema to editor')
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
                  dispatch(changeSchemaName({ name: evt.target.value }))
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
                  dispatch(
                    changeSchemaNamespace({ namespace: evt.target.value })
                  )
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
                  dispatch(changeSchemaTitle({ title: evt.target.value }))
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
                    changeSchemaDescription({ description: evt.target.value })
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
                uiSchema={uiSchema && JSON.parse(uiSchema)}
                children={true}
              />
              <SchemaDialogFieldAdd
                isOpen={isSchemaDialogFieldAddOpen}
                onClose={() => setIsSchemaDialogFieldAddOpen(false)}
              ></SchemaDialogFieldAdd>
            </ListItem>
          )}
        </List>
        {isEditorOpen && (
          <MonacoEditor
            width='500'
            height='500'
            language='json'
            theme='vs-dark'
            options={options}
            value={editorValue}
            onChange={(value, e) => {
              setEditorValue(value)
              //dispatch(setSchema({ schema: JSON.parse(value) }))
            }}
            //editorWillMount={editorWillMount}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() => {
            if (isEditorOpen) {
              dispatch(setSchema({ schema: JSON.parse(editorValue) }))
            }
            setIsEditorOpen(!isEditorOpen)
          }}
          color='primary'
        >
          Switch Preview
        </Button>

        {!isEditorOpen && (
          <Button
            variant='contained'
            onClick={(e) => {
              setIsSchemaDialogFieldAddOpen(true)
            }}
            color='primary'
          >
            Add Field
          </Button>
        )}
        <Button variant='contained' onClick={handleClose} color='primary'>
          OK
        </Button>

        <Button
          variant='contained'
          onClick={() => {
            setIsEditorOpen(false)
            dispatch(setSchemasDialogOpen({ isTypesDialogOpen: false }))
          }}
          color='primary'
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )

  function handleClose({ schema }) {
    if (isEditorOpen) {
      dispatch(setSchema({ schema: JSON.parse(editorValue) }))
    } else {
    }
    setIsEditorOpen(false)

    //setIsSchemaDialogFieldAddOpen(false)
    dispatch(setSchemasDialogOpen({ isTypesDialogOpen: false }))
  }

  // function editorWillMount(monaco) {
  //   monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  //     validate: true,
  //     schemas: [
  //       {
  //         uri: 'http://json-schema.org/draft-07/schema#',
  //         fileMatch: ['*']
  //         // schema: {
  //         //     type: "object",
  //         //     properties: {
  //         //         p1: {
  //         //             enum: [ "v1", "v2"]
  //         //         },
  //         //         p2: {
  //         //             $ref: "http://myserver/bar-schema.json"
  //         //         }
  //         //     }
  //         // }
  //       }
  //     ]
  //   })
  // }
}
