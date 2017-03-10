import React from 'react';

class FormTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text : ''
        };
    }

    textChange(event) {
        this.setState({
            text : event.target.value
        });
    }

    render() {
        return <p>
            <input type="text" onChange={this.textChange.bind(this)}/>
            <br/>
            <span>Hello {this.state.text}</span>
        </p>;
    }
}

export default FormTest;