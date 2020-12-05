import React from 'react'
//import logo from './../logo.png';
import './App.css'
import Typography from '@material-ui/core/Typography'
import { Accordion, AccordionDetails } from '@material-ui/core'
import TypesTable from '../comp/TypesTable'
import TypesDialog from '../comp/TypesDialog'
import ModelsTable from '../comp/ModelsTable'
import ModelsDialog from '../comp/ModelsDialog'
import AddModelDialog from '../comp/AddModelDialog'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { addType, setTypesDialogOpen } from '../global-state'

function App() {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isModalAddOpen, setIsModalAddOpen] = React.useState(null)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const lastCurrentTypeElementIdx = useSelector((state) => state.types.length)
  return (
    <div className='App'>
      <Typography variant='h5' component='h1' gutterBottom>
        JSON Schema Editor
      </Typography>
      <Accordion>
        <AccordionDetails>
          <TypesTable></TypesTable>
          <TypesDialog></TypesDialog>
        </AccordionDetails>
      </Accordion>
      <br></br>
      <Accordion>
        <AccordionDetails>
          <ModelsTable></ModelsTable>
          <ModelsDialog></ModelsDialog>
          <AddModelDialog
            isOpen={isModalAddOpen}
            onClose={onClose}
          ></AddModelDialog>
        </AccordionDetails>
      </Accordion>
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
      >
        <Fab
          color='primary'
          aria-label='add'
          onClick={(e) => {
            setAnchorEl(e.currentTarget)
          }}
        >
          <AddIcon />
        </Fab>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(addType())
              setAnchorEl(null)
              dispatch(
                setTypesDialogOpen({
                  isTypesDialogOpen: true,
                  currentTypeElementIdx: lastCurrentTypeElementIdx
                })
              )
            }}
          >
            Add Type
          </MenuItem>

          <MenuItem
            onClick={() => {
              setIsModalAddOpen(true)

              setAnchorEl(null)
            }}
          >
            Add Model
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
  function onClose() {
    setIsModalAddOpen(false)
  }
}

export default App
