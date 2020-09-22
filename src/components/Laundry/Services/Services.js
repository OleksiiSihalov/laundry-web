import React from "react";

import {withTranslation} from "react-i18next";
import {Tabs, Tab, Table, Button} from "react-bootstrap";

class Services extends React.Component {

    render() {
        const {t} = this.props;

        let washing = <div/>;
        let drying = <div/>;
        let ironing = <div/>;
        let delivery = <div/>;
        if (this.props.laundry.servicesList.length > 0) {
            // eslint-disable-next-line array-callback-return
            delivery = this.props.laundry.servicesList.map(service => {
                    if (service.serviceType === "DELIVERY")
                        return <Table key={service.id} size="sm">
                            <tbody>
                            <tr>
                                <td style={{'width': 'auto'}}>{service.name}</td>
                                <td style={{'width': '80px'}}/>
                                <td style={{'width': '80px'}}>{service.price} UAH</td>
                                <td style={{'width': '80px'}}>
                                    <Button variant="dark" style={{'width': '40px'}} size="sm"
                                            onClick={() => this.props.updateData(service.id)}>
                                        +</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                }
            );
            // eslint-disable-next-line array-callback-return
            washing = this.props.laundry.servicesList.map(service => {
                    if (service.serviceType === "WASHING")
                        return <Table key={service.id} size="sm">
                            <tbody>
                            <tr>
                                <td style={{'width': 'auto'}}>{service.name}</td>
                                <td style={{'width': '40px'}}>{service.quantity}</td>
                                <td style={{'width': '40px'}}>{service.unit ? "unit" : "kg"}</td>
                                <td style={{'width': '80px'}}/>
                                <td style={{'width': '80px'}}>{service.price} UAH</td>
                                <td style={{'width': '80px'}}>
                                    <Button variant="dark" style={{'width': '40px'}} size="sm"
                                            onClick={() => this.props.updateData(service.id)}>
                                        +</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                }
            );
            // eslint-disable-next-line array-callback-return
            drying = this.props.laundry.servicesList.map(service => {
                    if (service.serviceType === "DRYING")
                        return <Table key={service.id} size="sm">
                            <tbody>
                            <tr>
                                <td style={{'width': 'auto'}}>{service.name}</td>
                                <td style={{'width': '40px'}}>{service.quantity}</td>
                                <td style={{'width': '40px'}}>{service.unit ? "unit" : "kg"}</td>
                                <td style={{'width': '80px'}}/>
                                <td style={{'width': '80px'}}>{service.price} UAH</td>
                                <td style={{'width': '80px'}}>
                                    <Button variant="dark" style={{'width': '40px'}} size="sm"
                                            onClick={() => this.props.updateData(service.id)}>
                                        +</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                }
            );
            // eslint-disable-next-line array-callback-return
            ironing = this.props.laundry.servicesList.map(service => {
                    if (service.serviceType === "IRONING")
                        return <Table key={service.id} size="sm">
                            <tbody>
                            <tr>
                                <td style={{'width': 'auto'}}>{service.name}</td>
                                <td style={{'width': '40px'}}>{service.quantity}</td>
                                <td style={{'width': '40px'}}>{service.unit ? "unit" : "kg"}</td>
                                <td style={{'width': '80px'}}/>
                                <td style={{'width': '80px'}}>{service.price} UAH</td>
                                <td style={{'width': '80px'}}>
                                    <Button variant="dark" style={{'width': '40px'}} size="sm"
                                            onClick={() => this.props.updateData(service.id)}>
                                        +</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                }
            );
        }

        return (
            <div style={{'margin': '0px 10px 10px 10px'}}>

                <Tabs defaultActiveKey="DELIVERY" id="uncontrolled-tab-example">
                    <Tab eventKey="DELIVERY" title={t("DELIVERY")}>
                        {delivery}
                    </Tab>
                    <Tab eventKey="WASHING" title={t("WASHING")}>
                        {washing}
                    </Tab>
                    <Tab eventKey="DRYING" title={t("DRYING")}>
                        {drying}
                    </Tab>
                    <Tab eventKey="IRONING" title={t("IRONING")}>
                        {ironing}
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default withTranslation()(Services)