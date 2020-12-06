import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { List, ListItem, TextField } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import DialogContentText from '@material-ui/core/DialogContentText'
import AddTypeFieldDialog from './AddTypeFieldDialog'
import Form from '@rjsf/material-ui'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import {
  setTypesDialogOpen,
  changeTypeName,
  changeTypeNamespace,
  changeTypeField
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
  const { fields, name, namespace, schema, uiSchema } =
    types[currentTypeElementIdx] || {}
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
            <Form
              schema={schema}
              uiSchema={JSON.parse(uiSchema)}
              //ormData={formData}
              onChange={console.log('changed')}
              onSubmit={handleClose}
              onError={console.log('errors')}
            />
          </ListItem>
          <AddTypeFieldDialog
            isOpen={isAddTypeFieldDialogOpen}
            onClose={() => setIsAddTypeFieldDialogOpen(false)}
          ></AddTypeFieldDialog>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={(e) => {
            setIsAddTypeFieldDialogOpen(true)
          }}
          color='primary'
        >
          Add Field
        </Button>
      </DialogActions>
    </Dialog>
  )

  function handleClose() {
    dispatch(
      changeTypeField({
        fields
      })
    )
    //setIsAddTypeFieldDialogOpen(false)
    dispatch(setTypesDialogOpen({ isTypesDialogOpen: false }))
  }
}
