import React from 'react'
//import logo from './../logo.png';
import './App.css'
import Typography from '@material-ui/core/Typography'
import { Accordion, AccordionDetails } from '@material-ui/core'
import SchemaTable from '../comp/SchemaTable'
import SchemaDialog from '../comp/SchemaDialog'
import ModelsTable from '../comp/ModelsTable'
import ModelsDialog from '../comp/ModelsDialog'
import ModelsDialogAdd from '../comp/ModelsDialogAdd'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { addSchema, setSchemasDialogOpen, loadExamples } from '../global-state'

function App() {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isModalAddOpen, setIsModalAddOpen] = React.useState(false)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const lastCurrentTypeElementIdx = useSelector((state) => state.types.length)

  return (
    <div className='App'>
      <Typography variant='h5' component='h1' gutterBottom>
        Schemas
      </Typography>
      <Accordion>
        <AccordionDetails>
          <SchemaTable></SchemaTable>
          <SchemaDialog></SchemaDialog>
        </AccordionDetails>
      </Accordion>
      <br></br>
      <Typography variant='h5' component='h1' gutterBottom>
        Models
      </Typography>
      <Accordion>
        <AccordionDetails>
          <ModelsTable></ModelsTable>
          <ModelsDialog></ModelsDialog>
          <ModelsDialogAdd
            isOpen={isModalAddOpen}
            onClose={onClose}
          ></ModelsDialogAdd>
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
              dispatch(addSchema())
              setAnchorEl(null)
              dispatch(
                setSchemasDialogOpen({
                  isTypesDialogOpen: true,
                  currentTypeElementIdx: lastCurrentTypeElementIdx
                })
              )
            }}
          >
            Add Schema
          </MenuItem>

          <MenuItem
            onClick={() => {
              setIsModalAddOpen(true)

              setAnchorEl(null)
            }}
          >
            Add Model
          </MenuItem>

          <MenuItem
            onClick={() => {
              dispatch(loadExamples())

              setAnchorEl(null)
            }}
          >
            Load Examples
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
