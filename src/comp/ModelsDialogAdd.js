import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import { addModel } from '../global-state'

export default function ModelsDialogAdd({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const types = useSelector((state) => state.types || [])

  const [typeLocal, setTypeLocal] = useState(types[0].name)

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='types-form-dialog-title'
    >
      <DialogTitle id='types-form-dialog-title'> {'Add Model'}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>

        <React.Fragment>
          <FormControl className={classes.formControl}>
            <Select
              labelId='basic-types-box-label'
              id='basic-types-box'
              value={typeLocal}
              onChange={(e) => setTypeLocal(e.target.value)}
            >
              {types.map((type, idx) => {
                const { name } = type
                return (
                  <MenuItem key={`type-fields-${idx}`} value={name || ''}>
                    {name || ''}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </React.Fragment>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => onClose()} color='primary'>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleClose} color='primary'>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )

  function handleClose() {
    if (typeLocal) {
      dispatch(addModel({ type: typeLocal }))
    }
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
