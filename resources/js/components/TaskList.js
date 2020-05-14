import React, { Component } from 'react';
import TaskListItem from './TaskListItem';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: "due_date",
            sortDir: "desc"
        };
        
        this.handleCompleteClick = this.handleCompleteClick.bind(this);
        this.requestSort = this.requestSort.bind(this);
        this.sortList = this.sortList.bind(this);
    }

    requestSort(column) {
        let direction = this.state.sortDir;

        if (this.state.sortBy === column) {
            direction = direction === "desc" ? "asc" : "desc";
        } else {
            direction = "asc";
        }

        this.sortList(column, direction);

        this.setState({
            sortBy: column,
            sortDir: direction
        });
    }

    sortList(column, direction) {
        return this.props.tasks.sort((a, b) => {
            let aValue = a[column];
            let bValue = b[column];
            if (column === "due_date") {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } else {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue > bValue) {
                return direction === "desc" ? -1 : 1;
            }
            if (aValue < bValue) {
                return direction === "desc" ? 1 : -1;
            }
            return 0;
        });
    }
    
    handleCompleteClick(e) {
        let id = e.currentTarget.dataset.id;
        this.props.completeTask(id);
    }

    render() {
        if (this.props.tasks.length === 0) {
            return (
                <Typography component="h4" variant="h4" gutterBottom>
                    No tasks to display.
                </Typography>
            )
        }

        let tasks = this.sortList(this.state.sortBy, this.state.sortDir);
        if (this.props.filter.name === "completed") {
            tasks = tasks.filter(task => task.completed);
        }

        return (
            <TableContainer component="div">
                <Table component="table">
                    <TableHead component="thead">
                        <TableRow component="tr">
                            <TableCell>Completed</TableCell>
                            <TableCell>
                                <TableSortLabel
                                                active={
                                                    this.state.sortBy === "name"
                                                }
                                                direction={
                                                    this.state.sortBy === "name"
                                                        ? this.state.sortDir
                                                        : "asc"
                                                }
                                                onClick={() =>
                                                    this.requestSort("name")
                                                }
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>
                                <TableSortLabel
                                                active={
                                                    this.state.sortBy ===
                                                    "due_date"
                                                }
                                                direction={
                                                    this.state.sortBy ===
                                                    "due_date"
                                                        ? this.state.sortDir
                                                        : "asc"
                                                }
                                                onClick={() =>
                                                    this.requestSort("due_date")
                                                }
                                >
                                    Due Date
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody component="tbody">
                        {tasks.map(task => (
                            <TaskListItem key={task.id} task={task} onCompleteClick={this.handleCompleteClick}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool,
        completed_date: PropTypes.date,
        id: PropTypes.number,
        due_date: PropTypes.date
    })),
    completeTask: PropTypes.func,
    filter: PropTypes.shape({
        name: PropTypes.string,
        label: PropTypes.string,
        selected: PropTypes.bool
    })
};

export default TaskList;
