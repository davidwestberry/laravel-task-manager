import axios from 'axios';
import React, { Component } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Button, Card, CardActions, CardContent, CardHeader, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import format from 'date-fns/format';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';

class TaskForm extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.task || {
            name: "",
            completed_date: "",
            description: "",
            due_date: new Date(),
            completed: false
        };

        this.handleCreateTask = this.handleCreateTask.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
    }

    handleCreateTask(event) {
        event.preventDefault();

        const task = {
            name: this.state.name,
            description: this.state.description,
            due_date: this.state.due_date,
            completed: this.state.completed
        };

        axios.post("/api/task", task)
            .then(response => {
                console.log(response);
                this.props.onSuccess();
            })
            .catch(error => {
                console.error("An error occurred", error);
                let message = "";
                if (typeof error == "string")  {
                    message = error;
                } else {
                    message = error.message || "An unknown error occurred";
                }
                this.props.onError(message);
            })
    }

    handleDueDateChange(date) {
        this.setState({
            due_date: format(date, "yyyy-MM-dd")
        });
    }

    handleTaskChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Card>
                            <CardHeader title="Create New Task" />
                            <CardContent>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Task Name"
                                    value={this.state.name}
                                    onChange={this.handleTaskChange}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="description"
                                    label="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleTaskChange}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        variant="inline"
                                        format="P"
                                        margin="normal"
                                        id="due_date"
                                        name="due_date"
                                        label="Due Date"
                                        value={this.state.due_date}
                                        onChange={this.handleDueDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={<SaveIcon />}
                                    onClick={this.handleCreateTask}
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

TaskForm.propTypes = {
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};

export default TaskForm;
