import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { List, ListItem, FormControl, TextField } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import Form from '@rjsf/material-ui'
import { useDispatch, useSelector } from 'react-redux'
import {
  setModelsDialogOpen,
  changeModelData,
  changeModelName
} from '../global-state'

export default function ModelsDialog() {
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.isModelsDialogOpen)
  const currentModelElementIdx = useSelector(
    (state) => state.currentModelElementIdx
  )
  const models = useSelector((state) => state.models || [])
  const types = useSelector((state) => state.types || [])

  const { name, namespaces, schemaId, id, tenantId, type, formData } =
    models[currentModelElementIdx] || {}
  const { schema, uiSchema } = types.find((item) => item.id === schemaId) || {}
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='models-form-dialog-title'
    >
      <DialogTitle id='models-form-dialog-title'> {name}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <FormControl>
              <TextField disabled value='Model-Name:'></TextField>
            </FormControl>
            <FormControl>
              <TextField
                value={name || ''}
                onChange={(e) => {
                  dispatch(changeModelName({ name: e.target.value }))
                }}
              ></TextField>
            </FormControl>
          </ListItem>
          <ListItem>
            <Form
              schema={schema}
              uiSchema={uiSchema && JSON.parse(uiSchema)}
              formData={formData}
              onSubmit={handleClose}
              onError={console.log('errors')}
            />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  )
  function handleClose({ formData }) {
    dispatch(changeModelData({ formData }))
    dispatch(setModelsDialogOpen({ isModelsDialogOpen: false }))
  }
}
