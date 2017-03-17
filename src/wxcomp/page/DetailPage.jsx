import React from "react";

class DetailPage extends React.Component {
    constructor (props) {

        super(props);
        this.state = {
            detail: {}
        };

    }

    componentDidMount() {
        let nodedata = sessionStorage.getItem("nodedata");
        if(nodedata) {
            nodedata = JSON.parse(nodedata);
            nodedata[this.props.location.query.tab].map((item)=>{
                if(item.id === this.props.params.id) {
                    this.setState({
                        detail: item
                    });
                    return false;
                }
            });
        }
    }

    render () {

        return <p>{this.state.detail.title}</p>;

    }
}

DetailPage.propTypes = {};

DetailPage.defaultProps = {};

export default DetailPage;
