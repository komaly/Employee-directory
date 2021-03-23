import React from 'react'

import _ from 'underscore'

import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import { useStyles } from '../../materialStyles'

/**
 * Renders the header row of the table component
 */
const TableHeadRow = ({ headerCells, order, orderBy, onRequestSort }) => {
    const classes = useStyles()

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    const renderSortLabel = (cell) => {
        if (cell.id !== '') {
            return (
                <TableSortLabel
                    active={orderBy === cell.id}
                    direction={orderBy === cell.id ? order : 'asc'}
                    onClick={createSortHandler(cell.id)}
                >
                    {cell.label}
                </TableSortLabel>
            )
        }

        return cell.label
    }

    const renderHeaderCells = () => {
        return _.map(headerCells, (cell, index) => {
            const align = index !== 0 ? 'left': 'inherit'

            return (
                <TableCell
                key={index}
                align={align}
                sortDirection={orderBy === cell.id ? order : false}
                className={classes.tableHeaderCell}
                >
                    {renderSortLabel(cell)}
                </TableCell>
            )
        })
    }

    return (
        <TableHead>
            <TableRow>
                {renderHeaderCells()}
            </TableRow>
        </TableHead>
    )
}

export default TableHeadRow