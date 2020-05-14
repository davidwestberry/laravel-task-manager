import React, { Component } from 'react';
import 'typeface-roboto';
import ReactDom from 'react-dom';
import TasksView from './TasksView';

class App extends Component {
    render() {
        return (
            <div className="main">
                <TasksView />
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById("content"));
