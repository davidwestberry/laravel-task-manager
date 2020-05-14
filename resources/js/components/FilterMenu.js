import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FilterListIcon from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from 'prop-types';

class FilterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listFilterPopover: {
                open: false,
                anchorElement: null
            }
        };

        this.openPopover = this.openPopover.bind(this);
        this.closePopover = this.closePopover.bind(this);
        this.onFilterSelected = this.onFilterSelected.bind(this);
    }

    openPopover(event) {
        this.setState({
            listFilterPopover: {
                open: true,
                anchorElement: event.currentTarget
            }
        });
    }

    closePopover() {
        this.setState({
            listFilterPopover: {
                open: false,
                anchorElement: null
            }
        });
    }

    onFilterSelected(event) {
        this.props.onFilterSelect(event);
        this.closePopover();
    }

    render() {
        let popoverId = this.state.listFilterPopover.open ? 'filter-popover' : undefined;

        return (
            <Tooltip title="Filter Items" style={{flexGrow: 1}}>
                <div>
                    <Typography
                        component="h6"
                        style={{display: "inline-block"}}
                        variant="subtitle1"
                    >
                        Filter Tasks
                    </Typography>
                    <IconButton
                        href="#"
                        aria-label="filter list"
                        aria-describedby={popoverId}
                        onClick={this.openPopover}
                    >
                        <FilterListIcon/>
                    </IconButton>
                    <Popover
                        id={popoverId}
                        open={this.state.listFilterPopover.open}
                        anchorEl={this.state.listFilterPopover.anchorElement}
                        onClose={this.closePopover}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                    >
                        <List
                            component="nav"
                            aria-label="list filter menu"
                            style={{minWidth: "150px"}}
                        >
                            {this.props.filters.map(filter => (
                                <ListItem button key={filter.name} data-filter={filter.name}
                                          onClick={this.onFilterSelected}>
                                    <ListItemText style={{flexGrow: 1}} id={`list-filter-${filter.name}-items`} primary={filter.label}/>
                                    {filter.selected ? <DoneIcon/> : undefined}
                                </ListItem>
                            ))}
                        </List>
                    </Popover>
                </div>
            </Tooltip>
        );
    }
}

FilterMenu.proptypes = {
    filters: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        label: PropTypes.string,
        selected: PropTypes.bool
    })).isRequired,
    onFilterSelect: PropTypes.func.isRequired
};

export default FilterMenu;
