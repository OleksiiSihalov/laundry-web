import React from "react";
import axios from 'axios';

import {withTranslation} from "react-i18next";
import {Redirect} from 'react-router-dom'
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

class LaundryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phoneNumber: "",
            email: "",
            address: "",
            description: "",
            latitude: 0.0,
            longitude: 0.0,
            redirect: false,
            created: false,
            edited: false
        }
    }

    renderRedirect = () => {
        if (!this.state.edited && typeof this.props.laundry.id !== 'undefined') {
            this.setState({
                    name: this.props.laundry.name,
                    phoneNumber: this.props.laundry.phoneNumber,
                    email: this.props.laundry.email,
                    address: this.props.laundry.address,
                    description: this.props.laundry.description,
                    latitude: this.props.laundry.latitude,
                    longitude: this.props.laundry.longitude,
                    edited: true
                }
            )
        }
        if (this.state.redirect) {
            return <Redirect to='/admin'/>
        }
    }

    handleSubmit = () => {
        const {t} =this.props;
        if (this.validate("email", this.state.email)
            && this.validate("phone", this.state.phoneNumber)
            && this.validate("name", this.state.name)
            && this.validate("coords", this.state.latitude)
            && this.validate("coords", this.state.longitude)) {
            this.sendData();
        } else {
            alert(t("Check the data you entered"))
        }
    }

    sendData = () => {
        let login = JSON.parse(localStorage.getItem("admin")).login;
        let password = JSON.parse(localStorage.getItem("admin")).password;
        if (!this.props.edit) {
            axios.post(`http://localhost:8080/admin/create/laundry`, {
                    name: this.state.name,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    address: this.state.address,
                    description: this.state.description,
                    latitude: this.state.latitude.toFixed(7),
                    longitude: this.state.longitude.toFixed(7)
                },
                {
                    headers: {
                        Authorization: "Basic " + btoa(login + ":" + password)
                    }
                }).then(res => this.setState({created: true}, this.redirect))
        } else {
            axios.put(`http://localhost:8080/admin/edit/laundry/${this.props.laundry.id}`, {
                    name: this.state.name,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    address: this.state.address,
                    description: this.state.description,
                    latitude: parseFloat(this.state.latitude),//.toFixed(7),
                    longitude: parseFloat(this.state.longitude)//.toFixed(7)
                },
                {
                    headers: {
                        Authorization: "Basic " + btoa(login + ":" + password)
                    }
                }).then(res => this.setState({created: true}, this.redirect))
        }
    }

    redirect = () => {
        const {t} =this.props;
        alert(this.props.edit ? t("Laundry was edited") : t("Laundry was added"));
        this.setState({redirect: true});
        window.location.reload(false);
    }


    validate = (field, input) => {
        switch (field) {
            case "email":
                return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(input);
            case "phone":
                return /^\+(380)?([0-9]{9})$/.test(input);
            case "name":
                return input.length > 1;
            case "coords":
                return (!isNaN(input));
            default:
                return false;
        }
    }

    changeName = (event) => {
        this.setState({name: event.target.value})
    }

    changePhone = (event) => {
        this.setState({phoneNumber: event.target.value})
    }

    changeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    changeAddress = (event) => {
        this.setState({address: event.target.value})
    }

    changeDescription = (event) => {
        this.setState({description: event.target.value})
    }

    changeLatitude = (event) => {
        this.setState({latitude: event.target.value})
    }

    changeLongitude = (event) => {
        this.setState({longitude: event.target.value})
    }

    close = () => {
        this.setState({edited: false}, this.props.onHide())
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
                        {this.props.edit ? t("Edit laundry information") : t("Add laundry information")}
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>{t("Name")}</Form.Label>
                            <Form.Control onChange={this.changeName} required type="name"
                                          defaultValue={this.props.edit ? this.props.laundry.name : ""}
                                          placeholder={t("Name")}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPhone">
                            <Form.Label>{t("Phone number")}</Form.Label>
                            <Form.Control onChange={this.changePhone} required type="phoneNumber"
                                          defaultValue={this.props.edit ? this.props.laundry.phoneNumber : ""}
                                          placeholder="+380  _ _  _ _ _  _ _ _ _ "/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={this.changeEmail} required type="email"
                                          defaultValue={this.props.edit ? this.props.laundry.email : ""}
                                          placeholder="email"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicAddress">
                            <Form.Label>{t("Address")}</Form.Label>
                            <Form.Control onChange={this.changeAddress} required type="address"
                                          defaultValue={this.props.edit ? this.props.laundry.address : ""}
                                          placeholder={t("Address")}/>
                        </Form.Group>
                        <Form.Group controlId="ControlTextarea">
                            <Form.Label>{t("Location")}</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control onChange={this.changeLatitude}
                                                  defaultValue={this.props.edit ? this.props.laundry.latitude : 0.0}
                                                  placeholder={t("latitude")}/>
                                </Col>
                                <Col>
                                    <Form.Control onChange={this.changeLongitude}
                                                  defaultValue={this.props.edit ? this.props.laundry.longitude : 0.0}
                                                  placeholder={t("longitude")}/>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="ControlTextarea2">
                            <Form.Label>{t("Description")}</Form.Label>
                            <Form.Control onChange={this.changeDescription} as="textarea" rows="3"
                                          defaultValue={this.props.edit ? this.props.laundry.description : ""}
                                          placeholder="Additional information"/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={this.handleSubmit}>{t("Confirm")}</Button>
                        <Button variant="dark" onClick={this.close}>{t("Close")}</Button>
                    </Modal.Footer>
                </Form>
                {this.renderRedirect()}
            </Modal>
        );
    }
}

export default withTranslation()(LaundryForm)