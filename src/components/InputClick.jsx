import React from 'react';

class InputClick extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(event) {
        console.log(event);
        this.refs.myinput.focus();
    }

    render() {
        return <div>
            <input type="text" ref="myinput"/>
            <button onClick={this.handleClick.bind(this)}>click me</button>
        </div>;
    }
}

export default InputClick;