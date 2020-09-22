import React from "react";
import axios from 'axios';

import {withTranslation} from "react-i18next";
import {Redirect} from 'react-router-dom'
import {Button, Form, Modal} from "react-bootstrap";

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: -1,
            laundryId: 0,
            customerName: null,
            customerPhone: null,
            customerEmail: null,
            address: " ",
            description: null,
            totalPrice: 0,
            servicesId: [],
            redirect: false
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
    }

    handleSubmit = () => {
        const {t} =this.props;
        if (this.validate("email", this.state.customerEmail)
            && this.validate("phone", this.state.customerPhone)
            && this.validate("name", this.state.customerName)) {
            this.setState(
                {
                    laundryId: this.props.laundry,
                    totalPrice: this.props.price,
                    servicesId: this.props.order
                },
                this.sendData
            )
        } else {
            alert(t("Check the data you entered"))
        }
    }

    sendData = () => {
        axios.post(`http://localhost:8080/api/order/create`, {
                laundryId: this.state.laundryId,
                customerName: this.state.customerName,
                customerPhone: this.state.customerPhone,
                customerEmail: this.state.customerEmail,
                description: this.state.description + "\nAddress: " + this.state.address,
                totalPrice: this.state.totalPrice,
                servicesId: this.state.servicesId
            },
            {
                headers: {}
            }).then(res => this.setState({orderId: res.data.id}, this.redirect))
    }

    redirect = () => {
        const {t} =this.props;
        alert(t("Your order number is ") + this.state.orderId);
        this.setState({redirect: true});
    }


    validate = (field, input) => {
        switch (field) {
            case "email":
                return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(input);
            case "phone":
                return /^\+(380)?([0-9]{9})$/.test(input);
            case "name":
                return input.length > 1;
            default:
                return false;
        }
    }

    changeName = (event) => {
        this.setState({customerName: event.target.value})
    }

    changePhone = (event) => {
        this.setState({customerPhone: event.target.value})
    }

    changeEmail = (event) => {
        this.setState({customerEmail: event.target.value})
    }

    changeAddress = (event) => {
        this.setState({address: event.target.value})
    }

    changeDescription = (event) => {
        this.setState({description: event.target.value})
    }

    render() {
        const {t} =this.props;

        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={this.props.onHide}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t("Leave us your contacts to continue")}
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>{t("Your name")}</Form.Label>
                            <Form.Control onChange={this.changeName} required type="name"
                                          placeholder={t("Your name")}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>{t("Phone number")}</Form.Label>
                            <Form.Control onChange={this.changePhone} required type="phoneNumber"
                                          placeholder="+380  _ _  _ _ _  _ _ _ _ "/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.changeEmail} required type="email"
                                          placeholder="email"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>{t("Address to deliver")}</Form.Label>
                            <Form.Control onChange={this.changeAddress} type="address"
                                          placeholder={t("Enter address to deliver")}/>
                        </Form.Group>
                        <Form.Group controlId="ControlTextarea">
                            <Form.Label>{t("Description")}</Form.Label>
                            <Form.Control onChange={this.changeDescription} as="textarea" rows="3"
                                          placeholder={t("Additional information")}/>
                        </Form.Group>
                        <h4>{t("Total")}: {this.props.price} {t("UAH")}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleSubmit}>{t("Confirm")}</Button>
                        <Button variant="dark" onClick={this.props.onHide}>{t("Close")}</Button>
                    </Modal.Footer>
                </Form>
                {this.renderRedirect()}
            </Modal>
        );
    }
}

export default withTranslation()(OrderForm)