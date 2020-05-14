import React, { Component } from 'react';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TableHeader from './TableHeader';
import TaskList from './TaskList';
import NewTask from './NewTask';

class TasksView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            showNewTaskModal: false,
            showSuccessMessage: false,
            showErrorMessage: false,
            error: "",
            filters: [
                {
                    name: "all",
                    label: "All",
                    selected: true
                },
                {
                    name: "completed",
                    label: "Completed",
                    selected: false
                }
            ]
        };

        this.changeFilter = this.changeFilter.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.openNewTaskModal = this.openNewTaskModal.bind(this);
        this.closeNewTaskModal = this.closeNewTaskModal.bind(this);
        this.handleNewTaskError = this.handleNewTaskError.bind(this);
        this.handleNewTaskSuccess = this.handleNewTaskSuccess.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
    }

    changeFilter(event) {
        let updated = this.state.filters;

        updated.forEach(filter => {
            filter.selected = filter.name === event.currentTarget.dataset.filter;
        });

        this.setState({
            filters: updated
        });
    }

    completeTask(id) {
        axios
            .put(`/api/tasks/${id}`, { id: id, completed: true })
            .then(response => {
                this.setState({
                    tasks: response.data
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    openNewTaskModal() {
        this.setState({
            showNewTaskModal: true
        });
    }

    closeNewTaskModal() {
        this.setState({
            showNewTaskModal: false
        });
    }

    handleNewTaskError(msg) {
        this.closeNewTaskModal();
        this.setState({
            error: msg,
            showErrorMessage: true
        })
    }

    handleNewTaskSuccess() {
        this.closeNewTaskModal();
        this.setState({
            showSuccessMessage: true
        });
        this.fetchTasks();
    }

    fetchTasks() {
        axios.get("/api/tasks").then(response => {
            console.log(response);
            this.setState({
                tasks: response.data
            });
        });
    }

    componentDidMount() {
        this.fetchTasks();
    }

    render() {
        let selectedFilter = this.state.filters.find(el => el.selected);
        return(
            <Paper className="task-list">
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                          autoHideDuration={3000}
                          onClose={() => {this.setState({showSuccessMessage: false})} }
                          open={this.state.showSuccessMessage}
                >
                    <Alert variant="filled" severity="success" onClose={() => {this.setState({showSuccessMessage: false})}}>
                        Task created successfully!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                          autoHideDuration={3000}
                          onClose={() => {this.setState({showErrorMessage: false})} }
                          open={this.state.showErrorMessage}
                >
                    <Alert variant="filled" severity="error" onClose={() => {this.setState({showErrorMessage: false})}}>
                        {this.state.error}
                    </Alert>
                </Snackbar>

                <TableHeader onNewTaskClick={this.openNewTaskModal} onFilterSelect={this.changeFilter} filters={this.state.filters} />
                <TaskList completeTask={this.completeTask} tasks={this.state.tasks} filter={selectedFilter} />

                <Dialog open={this.state.showNewTaskModal} onClose={this.closeNewTaskModal}
                    fullWidth={true} maxWidth="md">
                    <DialogTitle>
                        Create New Task
                        <IconButton style={{position: "absolute", top: "5px", right: "5px"}} aria-label="close" onClick={this.closeNewTaskModal}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <NewTask onSuccess={this.handleNewTaskSuccess} onError={this.handleNewTaskError} />
                    </DialogContent>
                </Dialog>

            </Paper>
        )
    }
}

export default TasksView;
