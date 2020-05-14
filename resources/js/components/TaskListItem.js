// Base imports
import React from 'react';

// Material-UI Core imports
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

// Material-UI Icon imports
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'

// Utility imports
import { lightFormat } from 'date-fns';
import PropTypes from 'prop-types';

function TaskListItem(props) {
    return (
        <TableRow component="tr" key={props.task.id}>
            <TableCell
                style={{ textAlign: "center" }}
            >
                {props.task.completed ? (
                    <div>
                        <DoneIcon htmlColor="green" />
                        <Typography component="p"
                            variant="caption"
                            display="block"
                            gutterBottom
                        >
                            {props.task.completed_date}
                        </Typography>
                    </div>
                ) : (
                    <Checkbox
                        checked={props.task.completed}
                        data-id={props.task.id}
                        onClick={props.onCompleteClick}
                    />
                )}
            </TableCell>
            <TableCell component="th" scope="row">
                {props.task.name}
            </TableCell>
            <TableCell>{props.task.description}</TableCell>
            <TableCell>
                {lightFormat(new Date(props.task.due_date), "MM/dd/yyyy")}
            </TableCell>
            <TableCell>
                <IconButton data-id={props.task.id} onClick={props.onEditClick}>
                    <EditIcon/>
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton data-id={props.task.id} onClick={props.onDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

TaskListItem.propTypes = {
    task: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool,
        completed_date: PropTypes.date,
        id: PropTypes.number,
        due_date: PropTypes.date
    }),
    onCompleteClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func
};

export default TaskListItem;
