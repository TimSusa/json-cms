import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useSelector, useDispatch } from 'react-redux'
import { setTypesDialogOpen } from '../global-state'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export default function SchemaRegistryTable(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const types = useSelector((state) => state.types || [])

  return (
    <Table className={classes.table} size='small' aria-label='a dense table'>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Title</TableCell>
          <TableCell align='left'>Namespace</TableCell>
          <TableCell align='left'>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {types.map((row, idx) => (
          <TableRow
            key={`type-idx-${idx}`}
            name={idx}
            onClick={handleClick.bind(this, idx)}
          >
            <TableCell component='th' scope='row'>
              {row.id}
            </TableCell>
            <TableCell align='left'>{row.name}</TableCell>
            <TableCell align='left'>{row.schema.title}</TableCell>
            <TableCell align='left'>{row.namespace}</TableCell>
            <TableCell align='left'>{row.schema.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  function handleClick(idx, evt) {
    dispatch(
      setTypesDialogOpen({
        currentTypeElementIdx: idx,
        isTypesDialogOpen: true
      })
    )
  }
}
