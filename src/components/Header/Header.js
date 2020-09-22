import React from "react";
import i18n from '../../i18n'

import {withTranslation} from "react-i18next";
import {Navbar, Nav, Container, Button} from "react-bootstrap";
import lang from "./lang300.jpg"

class Header extends React.Component {

    render() {
        const {t} = this.props;

        function switchLanguage() {
            const currentLang = i18n.language;
            switch (currentLang) {
                case 'en':
                    localStorage.setItem("currentLanguage", "ua");
                    i18n.changeLanguage('ua');
                    break;
                case 'ua':
                    localStorage.setItem("currentLanguage", "en");
                    i18n.changeLanguage('en');
                    break;
                default:
                    break;
            }
        }

        return (
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="md">
                <Container>
                    <Navbar.Brand href="/">
                        Laundry
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="/laundries">{t("Laundries")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/check">{t("Check order")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/about">{t("About Us")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/contacts">{t("Contacts")}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Button variant="dark" size='sm' onClick={() => switchLanguage()}>
                            <img
                                src={lang}
                                height="15px"
                                width="40px"
                                alt="lang"
                            />
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default withTranslation()(Header)

