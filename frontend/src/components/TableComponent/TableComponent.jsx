import React, { useState, useEffect } from 'react'

import _ from 'underscore'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'

import TablePaginationActions from '../TablePaginationActions/TablePaginationActions'
import TableHeadRow from '../TableHeadRow/TableHeadRow'
import { useStyles } from '../../materialStyles'

const getField = (field) => {
    return field['sortByField'].toLowerCase()
}

const descendingComparator = (a, b, orderBy) => {
    if (getField(b[orderBy]) < getField(a[orderBy])) {
        return -1
    }
    
    if (getField(b[orderBy]) > getField(a[orderBy])) {
        return 1
    }
    
    return 0
}

const getComparator = (order, orderBy) => {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = (array, comparator) => {
    const stabilizedArray = array.map((el, index) => [el, index])
    stabilizedArray.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })

    return stabilizedArray.map((el) => el[0])
}

/**
 * Renders the common table component containing sortable header cells and the table content
 */
const TableComponent = ({ headerCells, tableData, setSuccessOrErrorMessage, successOrErrorMessage }) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')

    useEffect(() => {
        if (successOrErrorMessage && page !== 0) {
            setPage(0)
        }
    }, [successOrErrorMessage, page])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
      };

    const handleChangePage = (event, newPage) => {
        setSuccessOrErrorMessage('')
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setSuccessOrErrorMessage('')
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const getTableCells = (employeeData) => {
        return _.map(Object.keys(employeeData), (employeeDataKey, index) => {
            const blueTextClass = index % 2 !== 0 ? classes.boldedBlue : ''
            return <TableCell className={`${classes.tableCell} ${blueTextClass}`} key={index}>{employeeData[employeeDataKey].label}</TableCell>
        })
    }

    const renderTableData = () => {
        const sortedData = stableSort(tableData, getComparator(order, orderBy))
        const paginatedTableData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        return _.map(paginatedTableData, (employeeData, index) => {    
            return (
                <TableRow className={index % 2 === 0 ? classes.grayTableCell : ''} key={index}>
                    {getTableCells(employeeData)}
                </TableRow>
            )
        })
    }

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHeadRow
                        headerCells={headerCells}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {tableData && renderTableData()}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={tableData ? tableData.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                classes={{ select: classes.select }}
                ActionsComponent={TablePaginationActions}
            />
        </div>
    )
}

export default TableComponent