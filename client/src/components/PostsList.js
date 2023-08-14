import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        marginLeft: '5%',
        marginTop: '1vh',
        marginBottom: '1vh',

    },
    container: {
        width: '100%',
        maxHeight: 1000,
    },
    tableContent: {
        width: '100%',
    },
    cellTxt: {
        fontFamily: 'Open Sans',
        fontSize: '0.4rem',
    }
}));

const columns = [
    { id: 'postLink', label: 'Link', minWidth: 50, align: 'center' },
    { id: 'postVote', label: 'Vote', minWidth: 20, align: 'center' },
];

function createRows(postIds, postVotes) {
    let rows = [];
    for (let i = 0; i < postIds.length; i++) {
        rows.push(createData(postIds[i], postVotes[i]));
    }
    return rows;
}

function createData(postId, postVote) {
    const postLink = `https://stackoverflow.com/questions/${postId}`;
    return { postLink, postVote};
}

const PostsList = ({posts_id, posts_vote}) => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const postIds = posts_id.split('_');
    const postVotes = posts_vote.split('_');
    const rows = createRows(postIds, postVotes);

    return (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table" className={classes.tableContent}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={
                        { minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.postLink}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                <Typography className={classes.cellTxt}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                </Typography>
                            </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      );

}

export default PostsList;