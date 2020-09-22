import React from "react";

import {withTranslation} from "react-i18next";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";

class LaundryInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeLeft: 0,
            available: "",
        }
    }


    componentDidMount() {
        fetch(`http://localhost:8080/schedule`)
            .then(res => res.json())
            .then(res => this.setState({timeLeft: res.checkTime, available: res.availability}));
    }

    openMap = () =>{
        let lat = this.props.laundry.latitude;
        let lng = this.props.laundry.longitude;
        let url = "https://www.google.com.sa/maps/search/" + lat + "," + lng;

        window.open(url, '_blank');
    }

    render() {
        const {t} = this.props;

        let washers = parseInt(this.state.available.split("/")[0]);
        let dryers = parseInt(this.state.available.split("/")[1]);
        let timeD = 45 - (new Date().getTime() - this.state.timeLeft)/60000;
        let availability = true;
        if (washers === 0 || dryers === 0) {
            availability = false;
        }

        return (
            <div>
                <Card>
                    <Card.Img variant="top"
                              src="https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg"/>
                    <Card.Body>
                        <Card.Title>{this.props.laundry.name}</Card.Title>
                        <Card.Text>
                            {this.props.laundry.description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{this.props.laundry.phoneNumber}</ListGroupItem>
                        <ListGroupItem>{this.props.laundry.email}</ListGroupItem>
                        <ListGroupItem><strong>{availability?t("Available for now"):
                            t(`No available machine, check in `) + ~~timeD + t("min")}</strong></ListGroupItem>
                        <ListGroupItem onClick={()=>this.openMap()}>
                            <Button variant="success">{t("Show on the map")}</Button></ListGroupItem>
                    </ListGroup>
                </Card>
            </div>
        );
    }
}
export default withTranslation()(LaundryInfo)

