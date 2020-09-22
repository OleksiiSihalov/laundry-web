import React from "react";

import {withTranslation} from "react-i18next";
import {Card} from "react-bootstrap";

class Placeholder extends React.Component {

    render() {
        const {t} =this.props;
        return (
                <Card className="text-center" border="light">
                    <Card.Header>{t("AboutUs")}</Card.Header>
                    <Card.Body>
                        <Card.Title>{t("Making washing easier")}</Card.Title>
                        <Card.Text>
                            {t("We cooperate with 0 laundry around the world!")}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">email: oleksii.sihalov@nure.ua</Card.Footer>
                </Card>
        );
    }
}

export default withTranslation()(Placeholder)