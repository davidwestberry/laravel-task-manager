import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
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
    onCompleteClick: PropTypes.func
};

export default TaskListItem;
