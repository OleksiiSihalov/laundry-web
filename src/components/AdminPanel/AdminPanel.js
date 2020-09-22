import React from "react";


import {withTranslation} from "react-i18next";
import {Redirect} from "react-router-dom";
import {Button, Container, Navbar} from "react-bootstrap";
import LaundryList from "./NavList/LaundryList";
import LaundryControl from "./ControlPanel/LaundryControl";
import LaundryForm from "./LaundryForm/LaundryForm";

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            laundry: {
                servicesList: [],
                ordersList: [],
            },
            laundries: [],
            laundryId: 0,
            showLaundryForm: false
        }
    };

    componentDidMount() {
        fetch("http://localhost:8080/api/laundries")
            .then(res => res.json())
            .then(res => this.setState({laundries: res}));
    }

    renderPanel = () => {
        const {t} = this.props;
        if (this.state.laundryId === -1) {
            return <LaundryForm
                show={this.state.showLaundryForm}
                edit={false}
                laundry={{}}
                onHide={() => this.setState({showLaundryForm: false})}/>
        }
        if (this.state.laundryId === 0) {
            return <h4>{t("Select laundry")}</h4>
        }
        return <LaundryControl laundry={this.state.laundry}/>
    }

    renderRedirect = () => {
        if (!localStorage.getItem('admin')) {
            return <Redirect to='/admin/login'/>
        }
    }

    redirect = () => {
        this.setState({redirect: true});
    }

    handleSubmit = () => {
        localStorage.removeItem('admin');
        this.redirect();
    }

    getLaundry = (id) => {
        this.setState({laundryId: id}, () => {
            if (id > 0) {
                fetch(`http://localhost:8080/api/laundries/${id}`)
                    .then(res => res.json())
                    .then(res => this.setState({laundry: res}));
            }
        })
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                {this.renderRedirect()}
                <Navbar bg="light" variant="light">
                    <Container style={{"justifyContent": "flex-start"}}>
                        <Button style={{'width': '150px', 'height': '38px'}} variant="danger"
                                onClick={this.handleSubmit}>{t("Log out")}</Button>
                        <Button style={{'width': '150px', 'height': '38px', 'marginLeft': '10px'}} variant="success"
                                onClick={() => this.setState({showLaundryForm: true}, () => this.getLaundry(-1))}>
                            {t("Add laundry")}</Button>
                        <LaundryList laundries={this.state.laundries} getLaundry={this.getLaundry}/>
                    </Container>
                </Navbar>
                <Container>
                    {this.renderPanel()}
                </Container>
            </div>
        );
    }
}

export default withTranslation()(AdminPanel)

