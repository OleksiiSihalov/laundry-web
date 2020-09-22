import React from "react";
import axios from 'axios';

import {withTranslation} from "react-i18next";
import {Redirect} from 'react-router-dom'
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

class ServiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            serviceType: "WASHING",
            clothesType: "REGULAR",
            unit: true,
            quantity: 0,
            price: 0,
            minutesTime: 0,
            redirect: false,
            created: false,
            edited: false
        }
    }


    renderRedirect = () => {
        if (!this.state.edited && typeof this.props.service.id !== 'undefined') {
            this.setState({
                    name: this.props.service.name,
                    description: this.props.service.description,
                    serviceType: this.props.service.serviceType,
                    clothesType: this.props.service.clothesType,
                    unit: this.props.service.unit,
                    quantity: this.props.service.quantity,
                    price: this.props.service.price,
                    minutesTime: this.props.service.minutesTime,
                    edited: true
                }
            )
        }
        if (this.state.redirect) {
            return <Redirect to='/admin'/>
        }
    }

    handleSubmit = () => {
        const {t} = this.props;
        if (this.validate("name", this.state.name)
            && this.validate("quantity", this.state.quantity)
            && this.validate("price", this.state.price)
            && this.validate("time", this.state.minutesTime)) {
            this.sendData();
        } else {
            alert(t("Check the data you entered"));
        }
    }

    sendData = () => {
        let login = JSON.parse(localStorage.getItem("admin")).login;
        let password = JSON.parse(localStorage.getItem("admin")).password;
        if (!this.props.edit) {
            axios.post(`http://localhost:8080/admin/create/service`, {
                    laundryId: this.props.laundryId,
                    name: this.state.name,
                    description: this.state.description,
                    serviceType: this.state.serviceType,
                    clothesType: this.state.clothesType,
                    unit: this.state.unit + "",
                    quantity: this.state.quantity,
                    price: this.state.price,
                    minutesTime: this.state.minutesTime
                },
                {
                    headers: {
                        Authorization: "Basic " + btoa(login + ":" + password)
                    }
                }).then(res => this.setState({created: true}, this.redirect))
        } else {
            axios.put(`http://localhost:8080/admin/edit/service/${this.props.service.id}`, {
                    name: this.state.name,
                    description: this.state.description,
                    serviceType: this.state.serviceType,
                    clothesType: this.state.clothesType,
                    unit: this.state.unit + "",
                    quantity: this.state.quantity,
                    price: this.state.price,
                    minutesTime: this.state.minutesTime
                },
                {
                    headers: {
                        Authorization: "Basic " + btoa(login + ":" + password)
                    }
                }).then(res => this.setState({created: true}, this.redirect))
        }
    }

    redirect = () => {
        alert(this.props.edit ? "Service was edited" : "Service was added");
        this.setState({redirect: true});
        window.location.reload(false);
    }

    validate = (field, input) => {
        switch (field) {
            case "name":
                return input.length > 1;
            case "quantity":
                return (input % 1 === 0 && !isNaN(input));
            case "price":
                return (input % 1 === 0 && !isNaN(input));
            case "time":
                return (input % 1 === 0 && !isNaN(input));
            default:
                return false;
        }
    }

    changeName = (event) => {
        this.setState({name: event.target.value})
    }

    changeServiceType = (event) => {
        this.setState({serviceType: event.target.value})
    }

    changeClothesType = (event) => {
        this.setState({clothesType: event.target.value})
    }

    changeDescription = (event) => {
        this.setState({description: event.target.value})
    }

    changeUnit = (event) => {
        this.setState({unit: event.target.value})
    }

    changeQuantity = (event) => {
        this.setState({quantity: event.target.value})
    }

    changePrice = (event) => {
        this.setState({price: event.target.value})
    }

    changeTime = (event) => {
        this.setState({minutesTime: event.target.value})
    }

    close = () => {
        this.setState({edited: false}, this.props.onHide())
    }

    render() {
        const {t} = this.props;

        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={this.props.onHide}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.edit ? t("Edit service information") : t("Add service information")}
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>{t("Name")}</Form.Label>
                            <Form.Control onChange={this.changeName} required type="name"
                                          defaultValue={this.props.edit ? this.props.service.name : ""}
                                          placeholder={t("Name")}/>
                        </Form.Group>
                        <Form.Group controlId="ControlSelectClothes">
                            <Form.Label>{t("Service Type")}</Form.Label>
                            <Form.Control as="select" onChange={this.changeServiceType}
                                          defaultValue={this.props.edit ? this.props.service.serviceType : "WASHING"}>
                                <option value="WASHING">{t("WASHING")}</option>
                                <option value="DRYING">{t("DRYING")}</option>
                                <option value="IRONING">{t("IRONING")}</option>
                                <option value="DELIVERY">{t("DELIVERY")}</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="ControlSelectService">
                            <Form.Label>{t("Clothes Type")}</Form.Label>
                            <Form.Control as="select" onChange={this.changeClothesType}
                                          defaultValue={this.props.edit ? this.props.service.clothesType : "SPECIAL"}>
                                <option value="SPECIAL">{t("SPECIAL")}</option>
                                <option value="REGULAR">{t("REGULAR")}</option>
                                <option value="OUTERWEAR">{t("OUTERWEAR")}</option>
                                <option value="DELICATE">{t("DELICATE")}</option>
                                <option value="WOOLENS">{t("WOOLENS")}</option>
                                <option value="LINEN">{t("LINEN")}</option>
                                <option value="BLANKET">{t("BLANKET")}</option>
                                <option value="CARPET">{t("CARPET")}</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="ControlTextarea">
                            <Row>
                                <Col>
                                    <Form.Label>{t("Units")}</Form.Label>
                                    <Form.Control as="select" onChange={this.changeUnit}
                                                  defaultValue={this.props.edit ? this.props.service.unit : true}>
                                        <option value="true">unit</option>
                                        <option value="false">kg</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>{t("Quantity")}</Form.Label>
                                    <Form.Control onChange={this.changeQuantity}
                                                  defaultValue={this.props.edit ? this.props.service.quantity : 0}
                                                  placeholder="1"/>
                                </Col>
                                <Col>
                                    <Form.Label>{t("Price")}, {t("UAH")}</Form.Label>
                                    <Form.Control onChange={this.changePrice}
                                                  defaultValue={this.props.edit ? this.props.service.price : 0}
                                                  placeholder="100"/>
                                </Col>
                                <Col>
                                    <Form.Label>{t("Time")}, {t("min")}</Form.Label>
                                    <Form.Control onChange={this.changeTime}
                                                  defaultValue={this.props.edit ? this.props.service.minutesTime : 0}
                                                  placeholder="120"/>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="ControlTextarea2">
                            <Form.Label>{t("Description")}</Form.Label>
                            <Form.Control onChange={this.changeDescription} as="textarea" rows="3"
                                          defaultValue={this.props.edit ? this.props.service.description : ""}
                                          placeholder={t("Additional information")}/>
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

export default withTranslation()(ServiceForm)