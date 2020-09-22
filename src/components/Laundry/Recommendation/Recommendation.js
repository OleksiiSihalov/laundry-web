import React from "react";

import {withTranslation} from "react-i18next";
import {Button, FormControl, Image, OverlayTrigger, Tooltip} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceTypes: "",
            laundryId: 0,
            SPECIAL: 0,
            LINEN: 0,
            BLANKET: 0,
            CARPET: 0,
            OUTERWEAR: 0,
            REGULAR: 0,
            WOOLENS: 0,
            DELICATE: 0,
            services: []
        }
    }

    getRecommendation = (serviceTypes) => {
        this.setState({
            laundryId: this.props.laundry.id,
            serviceTypes: serviceTypes,
            services: []
        }, this.sendData)
    }

    sendData = () => {
        axios.post(`http://localhost:8080/api/order/calculate`, {
            serviceTypes: this.state.serviceTypes,
            laundryId: this.state.laundryId,
            SPECIAL: this.state.SPECIAL,
            LINEN: this.state.LINEN,
            BLANKET: this.state.BLANKET,
            CARPET: this.state.CARPET,
            OUTERWEAR: this.state.OUTERWEAR,
            REGULAR: this.state.REGULAR,
            WOOLENS: this.state.WOOLENS,
            DELICATE: this.state.DELICATE
        },).then(res => this.setState({services: res.data}, () => this.props.update(res.data)))
    }

    changeQuantity = (event, type) => {
        if (event.target.value === "")
            event.target.value = 0;
        switch (type) {
            case "SPECIAL":
                this.setState({SPECIAL: event.target.value})
                break;
            case "LINEN":
                this.setState({LINEN: event.target.value})
                break;
            case "BLANKET":
                this.setState({BLANKET: event.target.value})
                break;
            case "CARPET":
                this.setState({CARPET: event.target.value})
                break;
            case "OUTERWEAR":
                this.setState({OUTERWEAR: event.target.value})
                break;
            case "WOOLENS":
                this.setState({WOOLENS: event.target.value})
                break;
            case "REGULAR":
                this.setState({REGULAR: event.target.value})
                break;
            case "DELICATE":
                this.setState({DELICATE: event.target.value})
                break;
            default:
                break;
        }
    }

    getDescription = (type) => {
        const {t} = this.props;
        switch (type) {
            case "SPECIAL":
                return ""
            case "LINEN":
                return ""
            case "BLANKET":
                return ""
            case "CARPET":
                return ""
            case "OUTERWEAR":
                return t("Outerwear: jackets, coats, etc. By the piece.")
            case "WOOLENS":
                return t("Wool Products. In kg.")
            case "REGULAR":
                return t("Simple jersey. In kg.")
            case "DELICATE":
                return ""
            default:
                break;
        }
    }

    getImg = (type) => {
        switch (type) {
            case "SPECIAL":
                return ""
            case "LINEN":
                return ""
            case "BLANKET":
                return ""
            case "CARPET":
                return ""
            case "OUTERWEAR":
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSSu4XLgSPkX6xKjP193VNHi77EQOdNiMNdI_xRRP9w3u89iOM_&usqp=CAU"
            case "WOOLENS":
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtBPf8K51VcDlj9DLXN4gpRM2DPwdw8Scfo8Pzn2u7BSocKK2S&usqp=CAU"
            case "REGULAR":
                return "https://w0.pngwave.com/png/70/329/t-shirt-tshirt-templates-png-clip-art.png"
            case "DELICATE":
                return ""
            default:
                break;
        }
    }


    render() {
        const {t} = this.props;

        let serviceTypes = "";
        let clothesTypes = [];
        if (this.props.laundry.servicesList.length > 0) {
            this.props.laundry.servicesList.forEach(service => {
                    if (!clothesTypes.includes(service.clothesType) && service.clothesType !== "SPECIAL") {
                        clothesTypes.push(service.clothesType);
                    }
                    if (!serviceTypes.includes(service.serviceType)) {
                        serviceTypes += " " + service.serviceType;
                    }
                }
            );
        }

        const recommendedTypes = clothesTypes.map(type =>

            <div key={type} style={recommendationStyle}>
                <OverlayTrigger key={type}
                                overlay={<Tooltip id="tooltip-disabled">{this.getDescription(type)}</Tooltip>}>
                  <span className="d-inline-block">
                    <Button style={{'pointerEvents': 'none', width: '100px'}} variant="light">
                        <Image style={{'pointerEvents': 'none', height: "50px"}}
                               src={this.getImg(type)} fluid/></Button>
                  </span>
                </OverlayTrigger>
                <FormControl style={{width: '100px', 'marginLeft': '10px'}} placeholder={t("quantity")}
                             onChange={(e) => this.changeQuantity(e, type)}/>
            </div>
        );

        return (
            <div>
                <Alert style={recommendationStyle} variant="info">
                    {t("Choose number of clothes you have to wash")}
                </Alert>
                {recommendedTypes}
                <Button variant="success" style={recommendationStyle}
                        onClick={() => this.getRecommendation(serviceTypes)}>{t("Get recommendation")}</Button>
            </div>
        );
    }
}

/*
*     SPECIAL,
    LINEN,
    BLANKET,
    CARPET,
    OUTERWEAR,
    REGULAR,
    WOOLENS,
    DELICATE
* */

export default withTranslation()(Recommendation)


const recommendationStyle = {
    display: 'flex',
    'margin': '10px 0px 10px 0px'
}