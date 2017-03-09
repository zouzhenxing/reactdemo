import React from 'react';

class HelloMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>hello {this.props.name}</h1>;
    }
}

export default HelloMessage