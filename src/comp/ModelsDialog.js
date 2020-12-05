import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { List, ListItem, FormControl, TextField } from '@material-ui/core'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import {
  setModelsDialogOpen,
  changeModelData,
  changeModelDataNested,
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

  const { json, name, namespaces, id, tenantId, type } =
    models[currentModelElementIdx] || {}
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='models-form-dialog-title'
    >
      <DialogTitle id='models-form-dialog-title'> {name}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
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
          {Object.keys(json || {}).map((key, idx) => {
            const parentKey = key
            const typeThingy = types.find(
              (item) => item.name === json[parentKey]
            )
            return (
              <ListItem key={`model-fields-${idx}`}>
                <FormControl>
                  <TextField disabled value={key + ':  ' || ''}></TextField>
                </FormControl>
                {typeof json[parentKey] === 'object' ? (
                  <div>{JSON.stringify(json[parentKey], null, 1)}</div>
                ) : (
                  <FormControl>
                    {typeThingy ? (
                      Object.entries(typeThingy.fields).map(([key, value]) => {
                        return (
                          <div key={`modell-value-inputt-${json[key]}`}>
                            <FormControl>
                              <TextField
                                disabled
                                value={key + ':  ' || ''}
                              ></TextField>
                            </FormControl>
                            <FormControl>
                              <TextField
                                id={`model-value-inputt-${json[key]}`}
                                value={value || ''}
                                onChange={(evt) =>
                                  dispatch(
                                    changeModelDataNested({
                                      typeName: json[parentKey],
                                      idx,
                                      key,
                                      value: evt.target.value
                                    })
                                  )
                                }
                              />
                            </FormControl>
                          </div>
                        )
                      })
                    ) : (
                      <TextField
                        id={`model-value-input-${json[key]}`}
                        value={json[key] || ''}
                        onChange={(evt) =>
                          dispatch(
                            changeModelData({ key, value: evt.target.value })
                          )
                        }
                      />
                    )}
                  </FormControl>
                )}
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleClose} color='primary'>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )

  function handleClose() {
    dispatch(setModelsDialogOpen({ isModelsDialogOpen: false }))
  }
}
