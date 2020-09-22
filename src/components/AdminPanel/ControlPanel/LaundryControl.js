import React from "react";

import {withTranslation} from "react-i18next";
import {Button, Card, Container, Dropdown, ListGroup, ListGroupItem, Tab, Tabs} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from "axios";
import LaundryForm from "../LaundryForm/LaundryForm";
import ServiceForm from "../ServiceForm/ServiceForm";


class LaundryControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLaundryForm: false,
            showServiceForm: false,
            selectedServices: [],
            selectedOrders: []
        }
        this.options1 = {
            defaultSortName: 'id',  // default sort column name
            defaultSortOrder: 'asc'  // default sort order
        };
        this.options2 = {
            defaultSortName: 'date',  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
        };
        this.selectRowService = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelectService,
            onSelectAll: this.onSelectAllServices
        };
        this.selectRowOrder = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelectOrder,
            onSelectAll: this.onSelectAllOrders
        };
    }

    renderPanel = () => {
        return <div>
            <LaundryForm
                show={this.state.showLaundryForm}
                edit={true}
                laundry={this.props.laundry}
                onHide={() => this.setState({showLaundryForm: false})}/>
            <ServiceForm
                show={this.state.showServiceForm}
                edit={this.state.selectedServices.length>0}
                service={this.state.selectedServices.length>0?
                    this.getOrder(this.state.selectedServices[0]):{
                        name: "",
                        description: "",
                        serviceType: "WASHING",
                        clothesType: "REGULAR",
                        unit: false,
                        quantity: 0,
                        price: 0,
                        minutesTime: 0
                    }}
                laundryId={this.props.laundry.id}
                onHide={() => this.setState({showServiceForm: false})}/>
        </div>
    }

    getOrder=(id)=>{
        let services = this.props.laundry.servicesList;
        for (let i = 0; i < services.length; i++) {
            if (id === services[i].id) {
                return services[i];
            }
        }
    }

    getOrderInfo = () => {
        let orders = this.props.laundry.ordersList;
        let selected = this.state.selectedOrders;
        let order = {services: []};
        for (let i = 0; i < orders.length; i++) {
            if (selected[0] === orders[i].id) {
                order = orders[i];
                break;
            }
        }
        let services = "\nServices:\n"
        // eslint-disable-next-line array-callback-return
        order.services.map((service) => {
                services += String(service.id) + ". " + service.name + "\n";
            }
        );
        alert("Customer name: " + order.customerName +
            "\nCustomer phone: " + order.customerPhone +
            "\nCustomer email: " + order.customerEmail +
            "\nDescription: " + order.description +
            "\nTotal: " + order.totalPrice + services)
    }
    setOrderStatus = (orderStatus) => {
        let login = JSON.parse(localStorage.getItem("admin")).login;
        let password = JSON.parse(localStorage.getItem("admin")).password;
        for (let i = 0; i < this.state.selectedOrders.length; i++) {
            axios.put(`http://localhost:8080/admin/order/${this.state.selectedOrders[i]}/${orderStatus}`,
                {
                    headers: {
                        Authorization: "Basic " + btoa(login + ":" + password)
                    }
                }).then()
        }
        window.location.reload(false)
    }

    deleteLaundry = () => {
        let login = JSON.parse(localStorage.getItem("admin")).login;
        let password = JSON.parse(localStorage.getItem("admin")).password;
        axios.delete(`http://localhost:8080/admin/delete/laundry/${this.props.laundry.id}`,
            {
                headers: {
                    Authorization: "Basic " + btoa(login + ":" + password)
                }
            }).then(res => this.setState({}, () => {
            alert("Laundry deleted, id: " + res.data);
            window.location.reload(false)
        }))
    }

    deleteFromTable = (toDelete, table) => {
        let login = JSON.parse(localStorage.getItem("admin")).login;
        let password = JSON.parse(localStorage.getItem("admin")).password;
        for (let i = 0; i < toDelete.length; i++) {
            axios.delete(`http://localhost:8080/admin/delete/${table}/${toDelete[i]}`,
                {
                    headers: {
                        Authorization: "Basic " + btoa(login + ":" + password)
                    }
                }).then(res => this.setState({}, () => {
                alert("Deleted, id: " + res.data);
            }));
        }
        window.location.reload(false)
    }

    onRowSelectService = (row, isSelected) => {
        let temp = this.state.selectedServices;
        if (isSelected) {
            temp.push(row["id"]);
            this.setState({selectedServices: temp});
        } else {
            let index = temp.indexOf(row["id"]);
            temp.splice(index, 1);
            this.setState({selectedServices: temp});
        }
    }

    onSelectAllServices = (isSelected, rows) => {
        let temp = this.state.selectedServices;
        if (isSelected) {
            for (let i = 0; i < rows.length; i++) {
                temp.push(rows[i].id);
            }
        } else {
            for (let i = 0; i < rows.length; i++) {
                let index = temp.indexOf(rows[i].id);
                temp.splice(index, 1);
            }
        }
        this.setState({selectedServices: temp});
    }

    onRowSelectOrder = (row, isSelected) => {
        let temp = this.state.selectedOrders;
        if (!isSelected) {
            let index = temp.indexOf(row["id"]);
            temp.splice(index, 1);
            this.setState({selectedOrders: temp});
        } else {
            temp.push(row["id"]);
            this.setState({selectedOrders: temp});
        }
    }

    onSelectAllOrders = (isSelected, rows) => {
        let temp = this.state.selectedOrders;
        if (!isSelected) {
            for (let i = 0; i < rows.length; i++) {
                let index = temp.indexOf(rows[i].id);
                temp.splice(index, 1);
            }
        } else {
            for (let i = 0; i < rows.length; i++) {
                temp.push(rows[i].id);
            }
        }
        this.setState({selectedOrders: temp});
    }

    render() {
        const {t} =this.props;

        let services = this.props.laundry.servicesList;
        let orders = this.props.laundry.ordersList;

        return (
            <Container>
                <div style={topStyle}>
                    <Card style={topBlockStyle}>
                        <Card.Body>
                            <Card.Title>{t("Name")}: {this.props.laundry.name}</Card.Title>
                            <Card.Title>ID: {this.props.laundry.id}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{t("Phone")}: {this.props.laundry.phoneNumber}</ListGroupItem>
                            <ListGroupItem>Email: {this.props.laundry.email}</ListGroupItem>
                            <ListGroupItem>{t("Address")}: {this.props.laundry.address}</ListGroupItem>
                            <ListGroupItem>{t("Description")}: {this.props.laundry.description}</ListGroupItem>
                        </ListGroup>
                        <Card.Link style={{"flexDirection": "row"}}>
                            <Button style={buttonStyle} variant="danger"
                                    onClick={this.deleteLaundry}>{t("Delete laundry")}</Button>
                            <Button style={buttonStyle} variant="info"
                                    onClick={() => this.setState({showLaundryForm: true})}>{t("Edit laundry")}</Button>
                        </Card.Link>
                    </Card>
                    <div style={topBlockStyle}>
                        <h4 style={{"marginLeft": "10px"}}>{t("Services")}</h4>
                        <Button style={buttonStyle} variant="danger"
                                onClick={() => this.deleteFromTable(this.state.selectedServices, "service")}>
                            {t("Delete service")}</Button>
                        <Button style={buttonStyle} variant="info"
                                onClick={() => this.setState({showServiceForm:true})}>{t("Edit service")}</Button>
                        <Button style={buttonStyle} variant="success"
                                onClick={() => this.setState({showServiceForm:true})}>{t("Add service")}</Button>
                    </div>
                    <div style={topBlockStyle}>
                        <h4 style={{"marginLeft": "10px"}}>{t("Orders")}</h4>
                        <Button style={buttonStyle} variant="danger"
                                onClick={() => this.deleteFromTable(this.state.selectedOrders, "order")}>
                            {t("Delete order")}</Button>
                        <Dropdown>
                            <Dropdown.Toggle style={buttonStyle} variant="info" id="dropdown-basic">
                                {t("Set status")}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.setOrderStatus("RECEIVED")}>
                                    {t("RECEIVED")} </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setOrderStatus("IN_PROGRESS")}>
                                    {t("IN PROGRESS")} </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setOrderStatus("AWAITING")}>
                                    {t("AWAITING")} </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setOrderStatus("COMPLETED")}>
                                    {t("COMPLETED")} </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setOrderStatus("CANCELED")}>
                                    {t("CANCELED")} </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button style={buttonStyle} variant="success"
                                onClick={this.getOrderInfo}>{t("Order info")}</Button>
                    </div>
                </div>
                <Tabs defaultActiveKey="services" id="uncontrolled-tab-example">
                    <Tab eventKey="services" title={t("Services")}>
                        <BootstrapTable data={services} selectRow={this.selectRowService} options={this.options1}>
                            <TableHeaderColumn width="5%" dataField='id' isKey dataSort>ID</TableHeaderColumn>
                            <TableHeaderColumn width="30%" dataField='name' dataSort>{t("Name")}</TableHeaderColumn>
                            <TableHeaderColumn width="30%" dataField='description'>{t("Description")}</TableHeaderColumn>
                            <TableHeaderColumn width="12%" dataField='serviceType'>{t("ServiceType")}</TableHeaderColumn>
                            <TableHeaderColumn width="8%" dataField='quantity'>{t("Quantity")}</TableHeaderColumn>
                            <TableHeaderColumn width="7%" dataField='unit'>{t("Unit")}</TableHeaderColumn>
                            <TableHeaderColumn width="8%" dataField='price'>{t("Price")}</TableHeaderColumn>
                        </BootstrapTable>
                    </Tab>
                    <Tab eventKey="orders" title={t("Orders")}>
                        <BootstrapTable data={orders} selectRow={this.selectRowOrder} options={this.options2}>
                            <TableHeaderColumn width="5%" dataField='id' isKey dataSort>ID</TableHeaderColumn>
                            <TableHeaderColumn width="20%" dataField='date' dataSort>{t("Date")}</TableHeaderColumn>
                            <TableHeaderColumn width="20%" dataField='customerName'
                                               dataSort>Customer</TableHeaderColumn>
                            <TableHeaderColumn width="20%" dataField='customerPhone'>{t("Phone")}</TableHeaderColumn>
                            <TableHeaderColumn width="8%" dataField='totalPrice'>{t("Price")}</TableHeaderColumn>
                            <TableHeaderColumn width="7%" dataField='paid'>{t("Paid")}</TableHeaderColumn>
                            <TableHeaderColumn width="10%" dataField='orderStatus'>{t("Status")}</TableHeaderColumn>
                        </BootstrapTable>
                    </Tab>
                </Tabs>
                {this.renderPanel()}
            </Container>
        );
    }
}

export default withTranslation()

(
    LaundryControl
)


const
    topStyle = {
        'display': "flex",
        "justifyContent": "flex-start",
        "flexDirection": "row",
        "textAlign": "left",
        'margin': '10px auto 10px 0'
    }

const
    topBlockStyle = {
        'display': "flex",
        "flexDirection": "column",
        "textAlign": "left",
    }


const
    buttonStyle = {
        'width': '150px',
        'height': '40px',
        'margin': '10px 10px 10px 10px'
    }