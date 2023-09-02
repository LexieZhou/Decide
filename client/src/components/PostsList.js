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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginTop: '1vh',
      marginBottom: '1vh',
    },
    container: {
      width: '100%',
      maxHeight: 1000,
    },
    table: {
      width: '100%',
    },
    columnHeader: {
      fontFamily: 'Open Sans',
      fontSize: '0.8rem',
      fontWeight: 'bold',
    },
    cellLinkText: {
      fontFamily: 'Open Sans',
      fontSize: '0.6rem',
    },
    cellVoteText: {
      fontFamily: 'Open Sans',
      fontSize: '0.7rem',
    },
    caption: {
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: "0.7rem",
      fontFamily: 'Open Sans',
    },
}));

const columns = [
    { id: 'postTitle', label: 'Title', minWidth: 50, align: 'center' },
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
    const postTitle = `https://stackoverflow.com/questions/${postId}`;
    return { postTitle, postVote};
}

function descendingComparator(a,b, orderBy) {
  const valueA = typeof a[orderBy] === 'string' ? parseInt(a[orderBy], 10) : a[orderBy];
  const valueB = typeof b[orderBy] === 'string' ? parseInt(b[orderBy], 10) : b[orderBy];

  if (valueB < valueA) {
    return -1;
  }
  if (valueB > valueA) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" 
    ? (a,b) => descendingComparator(a,b, orderBy)
    : (a,b) => -descendingComparator(a,b, orderBy);

}

const sortedRowInformation = (rowArray, comparator) => {
  const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
  stabilizedRowArray.sort((a,b) => {
    const order = comparator(a[0],b[0]);
    if (order !==0) return order;
    return a[1] - b[1]

  })
  return stabilizedRowArray.map((el) => el[0]);
}

const PostsList = ({posts_id, posts_vote}) => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [orderDirection, setOrderDirection] = React.useState('desc');
    const [valueToOrderBy, setValueToOrderBy] = React.useState('postVote');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
      const isAscending = (valueToOrderBy === property && orderDirection === 'desc');
      setValueToOrderBy(property);
      setOrderDirection(isAscending ? 'asc' : 'desc');
    }

    const createSortHandler = (property) => (event) => {
      handleRequestSort(event, property);
    }

    const postIds = posts_id.split('_');
    const postVotes = posts_vote.split('_');
    const rows = createRows(postIds, postVotes);

    return (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ 
                        minWidth: column.minWidthWidth,
                      }}
                    >
                      <TableSortLabel
                        active={valueToOrderBy === column.id}
                        direction={valueToOrderBy === column.id ? orderDirection: 'desc'}
                        onClick={createSortHandler(column.id)}
                      > 
                        <Typography variant="subtitle1" className={classes.columnHeader}>
                          {column.label}
                        </Typography>
                      </TableSortLabel>
                      
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              
              <TableBody>
                {
                  sortedRowInformation(rows, getComparator(orderDirection, valueToOrderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body1" className={classes.cellLinkText}>
                            <Link href={row['postTitle']} target="_blank" rel="noopener">
                              {row['postTitle']}
                            </Link>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" className={classes.cellVoteText}>
                            {row['postVote']}
                          </Typography>
                        </TableCell>
                      </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[4]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              caption: classes.caption,
            }}
          />
        </Paper>
      );

}

export default PostsList;