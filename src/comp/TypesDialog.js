import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { List, ListItem, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import DialogContentText from '@material-ui/core/DialogContentText'
import AddTypeFieldDialog from '../comp/AddTypeFieldDialog'

import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import {
  setTypesDialogOpen,
  changeTypeName,
  basicTypes,
  changeTypeNamespace,
  changeTypeField
} from '../global-state'

export default function TypesDialog() {
  const dispatch = useDispatch()
  const [isAddTypeFieldDialogOpen, setIsAddTypeFieldDialogOpen] = useState(
    false
  )
  const isOpen = useSelector((state) => state.isTypesDialogOpen)
  const currentTypeElementIdx = useSelector(
    (state) => state.currentTypeElementIdx
  )
  const classes = useStyles()
  const types = useSelector((state) => state.types || [])
  const { fields, name, namespace } = types[currentTypeElementIdx] || {}
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='types-form-dialog-title'
    >
      <DialogTitle id='types-form-dialog-title'> {'Type'}</DialogTitle>
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
          <AddTypeFieldDialog
            isOpen={isAddTypeFieldDialogOpen}
            onClose={() => setIsAddTypeFieldDialogOpen(false)}
          ></AddTypeFieldDialog>
          {Object.keys(fields || {}).map((key, idx) => {
            return (
              <ListItem key={`type-fields-${idx}`}>
                <React.Fragment>
                  <FormControl>
                    <TextField
                      disabled
                      id={`type-key-input-${key}`}
                      value={key || ''}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId='basic-types-box-label'
                      id='basic-types-box'
                      value={fields[key] || ''}
                      disabled
                    >
                      {[
                        ...Object.values(basicTypes),
                        ...Object.values(extractCustomTypes(types))
                      ].map((typeName, idx) => {
                        return (
                          <MenuItem
                            key={`basic-type-fields-${idx}`}
                            value={typeName || ''}
                          >
                            {typeName || ''}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </React.Fragment>
              </ListItem>
            )
          })}

          <ListItem></ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={(e) => {
            //e.preventDefault()

            //dispatch(setTypesDialogOpen({ isTypesDialogOpen: false }))
            // dispatch(
            //   setIsAddTypeFieldDialogOpen({ isAddTypeFieldDialogOpen: true })
            // )
            setIsAddTypeFieldDialogOpen(true)
          }}
          color='primary'
        >
          Add Field
        </Button>
        <Button variant='contained' onClick={handleClose} color='primary'>
          OK
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

function extractCustomTypes(types) {
  return types.reduce((acc, cur) => {
    if (cur.namespace.toLowerCase() === basicTypes.custom.toLowerCase()) {
      return { ...acc, [cur.name]: cur.name }
    }
    return acc
  }, {})
}
