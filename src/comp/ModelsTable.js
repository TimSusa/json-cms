import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useSelector, useDispatch } from 'react-redux'
import { setModelsDialogOpen } from '../global-state'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    padding: 8
  }
})

export default function ModelsTable(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const models = useSelector((state) => state.models || [])
  return (
    <Table className={classes.table} size='small' aria-label='a dense table'>
      <TableHead>
        <TableRow>
          <TableCell>Unique-Id</TableCell>
          <TableCell align='left'>Model-Name</TableCell>
          <TableCell align='left'>Namespaces</TableCell>
          <TableCell align='left'>Tenant</TableCell>
          <TableCell align='left'>Schema-Name</TableCell>
          <TableCell align='left'>Output</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {models.map((row, idx) => (
          <TableRow
            key={`model-idx-${idx}`}
            name={idx}
            onClick={handleClick.bind(this, idx)}
          >
            <TableCell component='th' scope='row'>
              {row.id}
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              {row.namespaces && row.namespaces.length > 0
                ? row.namespaces.join(', ')
                : ''}
            </TableCell>
            <TableCell>{row.tenantId}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell align='left'>
              {JSON.stringify(row.formData, null, '\t')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  function handleClick(id, evt) {
    dispatch(
      setModelsDialogOpen({
        currentModelElementIdx: id,
        isModelsDialogOpen: true
      })
    )
  }
}
