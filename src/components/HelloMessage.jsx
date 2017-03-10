import React from 'react';

class HelloMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>hello {this.props.name}</h1>;
    }
}

HelloMessage.propTypes = {
    name : React.PropTypes.string,
}

HelloMessage.defaultProps = {
    name : '小样'
}

export default HelloMessage