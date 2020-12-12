import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch } from 'react-redux'
import {
  setTypesDialogOpen,
  basicTypes,
  changeTypeField
} from '../global-state'

export default function AddTypeFieldDialog({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  //const types = useSelector((state) => state.types || [])
  //const isAddTypeFieldDialogOpen = isOpen
  // useSelector(
  //   (state) => state.isAddTypeFieldDialogOpen
  // )
  const [valueLocal, setVal] = useState(basicTypes.boolean)
  const [keyNameLocal, setKeyNameLocal] = useState('dummyKey')
  // const isAddTypeFieldDialogOpen = useSelector(
  //   (state) => state.isAddTypeFieldDialogOpen
  // )

  // const [isTypeAddOpen, setIsTypeAddOpen] = React.useState(
  //   isAddTypeFieldDialogOpen
  // )
  const handleChangeVal = (event) => {
    setVal(event.target.value)
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='types-form-dialog-title'
    >
      <DialogTitle id='add-field-ypes-form-dialog-title'>
        {'Add Field'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>

        <React.Fragment>
          <FormControl>
            <TextField
              onChange={(e) => setKeyNameLocal(e.target.value)}
              value={keyNameLocal || 'Not set'}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              labelId='basic-types-box-label'
              id='basic-types-box'
              value={valueLocal || basicTypes.boolean}
              onChange={(e) => handleChangeVal(e)}
            >
              {[
                ...Object.values(basicTypes)
                //...Object.values(extractCustomTypes(types))
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
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() =>
            dispatch(setTypesDialogOpen({ isTypesDialogOpen: false }))
          }
          color='primary'
        >
          Cancel
        </Button>
        <Button variant='contained' onClick={handleClose} color='primary'>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )

  function handleClose() {
    if (keyNameLocal) {
      dispatch(
        changeTypeField({
          key: keyNameLocal,
          value: valueLocal
        })
      )
    }
    //dispatch(setTypesDialogOpen({ isTypesDialogOpen: false }))
    onClose()
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

// function extractCustomTypes(types) {
//   return types.reduce((acc, cur) => {
//     if (cur.namespace.toLowerCase() === basicTypes.custom.toLowerCase()) {
//       return { ...acc, [cur.name]: cur.name }
//     }
//     return acc
//   }, {})
// }
