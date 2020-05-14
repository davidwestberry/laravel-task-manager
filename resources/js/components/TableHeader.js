import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FilterMenu from './FilterMenu';
import PropTypes from 'prop-types';

function TableHeader(props) {
    return (
        <Toolbar component="nav">
            <Typography variant="h6" id="tableTitle" style={{flexGrow: 10}} component="div">
                Tasks
            </Typography>
            <FilterMenu filters={props.filters} onFilterSelect={props.onFilterSelect} />
            <Tooltip title="Create Task">
                <Fab  onClick={props.onNewTaskClick}
                      aria-label="create task"
                      color="primary"
                      size="medium"
                >
                    <AddIcon/>
                </Fab>
            </Tooltip>
        </Toolbar>
    );
}

TableHeader.propTypes = {
    onFilterSelect: PropTypes.func,
    onNewTaskClick: PropTypes.func,
    filters: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        label: PropTypes.string,
        selected: PropTypes.bool
    }))
};

export default TableHeader;
