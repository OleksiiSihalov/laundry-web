import React from "react";

import {withTranslation} from "react-i18next";
import {Container} from "react-bootstrap";
import Recommendation from "./Recommendation/Recommendation";
import LaundryInfo from "./LaundryInfo/LaundryInfo";
import Services from "./Services/Services";
import Order from "./Order/Order";
import {Redirect} from "react-router-dom";

class Laundry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            laundry: {
                servicesList: []
            },
            newOrder: [],
        }
    }


    renderRedirect = () => {
        if (isNaN(this.props.match.params.id)) {
            return <Redirect to='/'/>
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/api/laundries/${this.state.id}`)
            .then(res => res.json())
            .then(res => this.setState({laundry: res}));
    }

    addService = (value) => {
        let temp = this.state.newOrder;
        temp.push(value)
        this.setState({newOrder: temp})
    }

    deleteService = (value) => {
        let temp = this.state.newOrder;
        let index = temp.indexOf(value);
        if (index > -1) {
            temp.splice(index, 1);
        } else {
            temp = [];
        }
        this.setState({newOrder: temp})
    }

    addRecommendations = (list) => {
        let temp = this.state.newOrder;
        // eslint-disable-next-line array-callback-return
        list.map(service => {
            temp.push(service.id);
        })
        this.setState({newOrder: temp});
    }

    render() {

        return (
            <Container style={laundryStyle}>
                <div style={leftBlockStyle}>
                    <LaundryInfo laundry={this.state.laundry}/>
                    <Recommendation laundry={this.state.laundry} update={this.addRecommendations}/>
                </div>
                <div style={rightBlockStyle}>
                    <Services laundry={this.state.laundry} updateData={this.addService}/>
                    <Order laundry={this.state.laundry} order={this.state.newOrder} updateData={this.deleteService}/>
                </div>
                {this.renderRedirect()}
            </Container>

        );
    }
}

export default withTranslation()(Laundry)

const laundryStyle = {
    'display': "flex",
    'flexWrap': "wrap",
    'justifyContent': 'flex-start'
}

const leftBlockStyle = {
    'width': '35%',
    'display': "flex",
    'flexWrap': "wrap",
    'justifyContent': 'flex-start',
    'margin': '10px 0px 10px 0px'
}

const rightBlockStyle = {
    'width': '65%',
    'display': "block",
    'margin': '10px 0px 10px 0px'
}
