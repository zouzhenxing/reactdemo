import React from "react";

class StatusTest extends React.Component {
    constructor (props) {

        super(props);
        this.state = {"love": false};

    }

    handelClick () {

        this.setState({"love": !this.state.love});

    }

    render () {

        return <p onClick={this.handelClick.bind(this)}>
            你喜欢React吗? {this.state.love ? '是' : '否'}
        </p>;

    }
}

export default StatusTest;
