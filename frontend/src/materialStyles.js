import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    tableHeaderCell: {
        fontSize: '25px !important',
        fontWeight: 'bold !important',
    },
    tableCell: {
        borderBottom: 'none !important',
    },
    grayTableCell:{
        backgroundColor: '#d3d3d3'
    },
    boldedBlue: {
        color: '#0072bc !important',
        fontWeight: 'bold !important'
    },
    select:{
        paddingRight: '40px !important'
    },
    deleteIcon: {
        color: 'red',
        cursor: 'pointer'
    },
    editIcon: {
        cursor: 'pointer',
        marginRight: 10,
        color: 'black'
    },
    tablePaginationRoot: {
        flexShrink: 0,
    }
});