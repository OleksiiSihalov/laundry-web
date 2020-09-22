import React from "react";

import {withTranslation} from "react-i18next";
import {Button, Card, Container} from "react-bootstrap";

class Laundries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laundries: []
        };
    }


    componentDidMount() {
        fetch("http://localhost:8080/api/laundries")
            .then(res => res.json())
            .then(res => this.setState({laundries: res}));
    }

    geo = () => {
        navigator.geolocation.getCurrentPosition(this.find)
    }

    find = (position) => {
        const {t} = this.props;
        let id = 0;
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        // eslint-disable-next-line array-callback-return
        this.state.laundries.map((laundry) => {
                if (lat + 0.009 >= laundry.latitude && lat - 0.009 <= laundry.latitude)
                    if (lng + 0.009 >= laundry.longitude && lng - 0.009 <= laundry.longitude) {
                        console.log(laundry.id)
                        id = laundry.id
                    }
            }
        );
        if (id !== 0) {
            this.props.history.push(`/laundries/${id}`);
        } else {
            console.log(lat)
            console.log(lng)
            alert(t("There are no laundries in your area yet"))
        }
    }

    render() {
        const {t} = this.props;
        const list = this.state.laundries.map((laundry) =>
            <Button key={laundry.id} variant="light" style={laundryCardStyle} href={`/laundries/${laundry.id}`}>
                <Card>
                    <Card.Img variant="top"
                              src="https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg"/>
                    <Card.Body>
                        <Card.Title>{laundry.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Phone: {laundry.phoneNumber}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">email: {laundry.email}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"> {laundry.address}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Button>
        );

        return (
            <Container style={laundriesStyle}>
                <Button variant="light" style={laundryCardStyle} onClick={() => this.geo()} href="#">
                    <Card>
                        <Card.Body>
                            <Card.Title>{t("Find laundry nearby")}</Card.Title>
                            <Card.Subtitle
                                className="mb-2 text-muted"> {t("(a kilometer away from you)")}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </Button>
                {list}
            </Container>
        );
    }
}

export default withTranslation()(Laundries)

const laundryCardStyle = {
    'width': '18rem',
    'margin': '10px 10px 10px 10px'
}


const laundriesStyle = {
    'display': "flex",
    'flexWrap': "wrap",
    'justifyContent': 'flex-start'
}