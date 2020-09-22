import React from "react";

import {withTranslation} from "react-i18next";
import {Button, Table} from "react-bootstrap";
import MyVerticallyCenteredModal from "./OrderForm";

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            laundryId: 0,
            customerName: null,
            customerPhone: null,
            customerEmail: null,
            description: null,
            totalPrice: 0,
            servicesId: []
        }
    }

    getServiceById = (id) => {
        let obj = this.props.laundry.servicesList;
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].id === id) {
                return obj[i];
            }
        }
    }

    render() {
        const {t} =this.props;

        let order = <div/>;
        let tempPrice = 0;

        order = this.props.order.map((serviceId,i) => {
            let service = this.getServiceById(serviceId);
            tempPrice += service.price;
            return <tr key={i}>
                <td style={{'width': 'auto'}}>{service.name}</td>
                <td style={{'width': '80px'}}/>
                <td style={{'width': '80px'}}>{service.price} {t("UAH")}</td>
                <td style={{'width': '80px'}}>
                    <Button variant="dark" style={{'width': '40px'}} size="sm"
                            onClick={() => this.props.updateData(serviceId)}>-</Button>
                </td>
            </tr>
        })

        return (
            <div style={{'margin': '80px 10px 10px 10px'}}>
                <Table size="sm">
                    <thead>
                    <tr>
                        <td colSpan="4"><h4>{t("Your order")}</h4></td>
                    </tr>
                    </thead>
                    <tbody>
                    {order}
                    <tr>
                        <td style={{'width': 'auto'}}/>
                        <td style={{'width': '80px'}}/>
                        <td style={{'width': '80px'}}>{tempPrice} {t("UAH")}</td>
                        <td style={{'width': '80px'}}/>
                    </tr>
                    </tbody>
                </Table>

                <Button variant="dark" style={{'marginRight': '10px'}}
                        onClick={() => this.props.updateData(-1)}>{t("Clear")}</Button>
                <Button variant="success"
                        onClick={() => this.setState({modalShow: true})}>{t("Next")}</Button>
                <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    order={this.props.order}
                    price={tempPrice}
                    laundry={this.props.laundry.id}
                    confirmOrder={() => this.confirmOrder}
                    onHide={() => this.setState({modalShow: false})}
                />
            </div>
        );
    }
}

export default withTranslation()(Order)