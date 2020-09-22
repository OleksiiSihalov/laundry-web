import React from "react";
import axios from "axios";

import {withTranslation} from "react-i18next";
import {Button, Container, Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            redirect: false
        }
    }

    renderRedirect = () => {
        if (localStorage.getItem('admin')) {
            return <Redirect to='/admin'/>
        }
    }

    redirect = () => {
        this.setState({redirect: true});
    }

    changeLogin = (event) => {
        this.setState({login: event.target.value})
    }

    changePassword = (event) => {
        this.setState({password: event.target.value})
    }


    handleSubmit = () => {
        const {t} =this.props;
        let login = this.state.login;//JSON.parse(localStorage.getItem("admin")).login;
        let password = this.state.password;//JSON.parse(localStorage.getItem("admin")).password;
        axios.get("http://localhost:8080/admin", {
            headers: {
                Authorization: "Basic " + btoa(login + ":" + password)
            }
        }).then(response => {
            if (response.data === "ADMIN") {
                let admin =
                    {
                        login: this.state.login,
                        password: this.state.password
                    };
                localStorage.setItem("admin", JSON.stringify(admin));
                this.redirect();
            }
        })
            .catch(error => {
                alert(t("Wrong login or password!"))
            })
    }

    render() {
        const {t} =this.props;

        return (
            <Container style={{'width': '250px', 'marginTop': '10px'}}>
                <Form>
                    <Form.Group controlId="formBasicLogin">
                        <Form.Label>{t("Login")}</Form.Label>
                        <Form.Control onChange={this.changeLogin} type="login" placeholder={t("Login")}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>{t("Password")}</Form.Label>
                        <Form.Control onChange={this.changePassword} type="password" placeholder={t("Password")}/>
                    </Form.Group>
                    <Button variant="success" onClick={this.handleSubmit}>{t("Log in")}</Button>
                </Form>
                {this.renderRedirect()}
            </Container>
        );
    }
}

export default withTranslation()(LogIn)