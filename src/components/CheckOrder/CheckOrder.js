import React from "react";

import {withTranslation} from "react-i18next";
import {Button, Card, Container, Form, ListGroup, ListGroupItem} from "react-bootstrap";

class CheckOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerPhone: null,
            order: {},
            orderId: -1,
            orderC: <div/>
        }
    }

    changePhone = (event) => {
        this.setState({customerPhone: event.target.value})
    }

    changeOrderId = (event) => {
        this.setState({orderId: event.target.value})
    }

    handleSubmit = () => {
        const {t} =this.props;
        if (this.validate("id", this.state.orderId)
            && this.validate("phone", this.state.customerPhone)) {
            this.getOrder();
        } else {
            alert(t("Check the data you entered"));
        }
    }

    getOrder = () => {
        fetch(`http://localhost:8080/api/order/${this.state.orderId}?phone=%2B${this.state.customerPhone.slice(1)}`)
            .then(res => res.json())
            .then(res => this.setState({order: res}, this.formOrder))
    }

    formOrder = () => {
        if (this.state.order.status==500){
            alert("No such")
            return;
        }
        const {t} =this.props;
        if (this.state.order !== {} && this.state.order.services !== null) {
            let services = this.state.order.services.map((service, i) =>
                <ListGroup key={i + 1}>
                    <ListGroupItem>{i + 1 + ". " + service.name}</ListGroupItem>
                </ListGroup>
            );
            let order =
                <Card style={{width: '30rem', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
                    <Card.Body>
                        <Card.Title>{t("Order")} №{this.state.order.id}</Card.Title>
                        <Card.Title>{this.state.order.customerName}</Card.Title>
                        <Card.Text>{t("Order status")}: {this.state.order.orderStatus}
                            <br/>{this.state.order.paid ? "Paid" : "Not paid"}</Card.Text>
                    </Card.Body>
                    {services}
                    <Card.Footer><h5>{t("Total")}: {this.state.order.totalPrice}</h5></Card.Footer>
                </Card>
            this.setState({orderC: order})
        } else {
            this.setState({orderC: <div/>})
        }
    }

    validate = (field, input) => {
        switch (field) {
            case "id":
                return ~isNaN(input);
            case "phone":
                return /^\+(380)?([0-9]{9})$/.test(input);
            default:
                return false;
        }
    }

    render() {
        const {t} =this.props;

        return (
            <Container>
                <Form style={{'margin': '10px auto 10px auto'}}>
                    <Form.Group controlId="formBasicId">
                        <h4>{t("Order number")}</h4>
                        <Form.Control style={{width: "200px", 'marginLeft': 'auto', 'marginRight': 'auto'}}
                                      onChange={this.changeOrderId} required type="text"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPhone">
                        <h4>{t("Phone number")}</h4>
                        <Form.Control style={{width: "200px", 'marginLeft': 'auto', 'marginRight': 'auto'}}
                                      onChange={this.changePhone} required type="phoneNumber"
                                      placeholder="+380  _ _  _ _ _  _ _ _ _ "/>
                    </Form.Group>
                    <Button variant="success" onClick={this.handleSubmit}>{t("Confirm")}</Button>
                </Form>
                {this.state.orderC}
            </Container>
        )
    }
}

export default withTranslation()(CheckOrder)
