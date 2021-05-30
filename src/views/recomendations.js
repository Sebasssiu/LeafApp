import React from 'react'
import useApi from '../customHooks/useApi'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Recomendations = () => {
  const list = useApi({
    link: 'listen/recommended/',
    method: 'GET'
  })
  
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      width: 700,
      margin: 10,
    },
    tableContainer: {
      width: 720,
    }
  });

  const classes = useStyles();

  if (list.isLoading) {
    return (
      <div className="container">
        <div className="loading" />
      </div>
    )
  }
  return (
    <div className="container">
      <h1>Recomendations</h1>
      <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User name</StyledTableCell>
            <StyledTableCell align="right">Recomended song</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(list.fetchedData).map((user) => (
            <StyledTableRow key={user.name}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="right">{user.song}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {Object.values(list.fetchedData).map((user) => {
        console.log(user)
      })}
    </div>
  )
}

export default Recomendations
