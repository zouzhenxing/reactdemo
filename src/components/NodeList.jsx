import React from 'react';

class NodeList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ul>
            {
                this.props.children.map((v)=> {
                    return <li>{v}</li>;
                })
            }
        </ul>;
    }
}

export default NodeList