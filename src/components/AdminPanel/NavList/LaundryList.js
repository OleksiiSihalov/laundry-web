import React from "react";
import {Button, Dropdown, FormControl} from "react-bootstrap";
import {withTranslation} from "react-i18next";

class LaundryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    render() {
        const {t} = this.props;

        const list = this.props.laundries.map((laundry) =>
            <Dropdown.Item key={laundry.id} onSelect={() => this.props.getLaundry(laundry.id)}>
                {"id: " + laundry.id + ", " + laundry.name}</Dropdown.Item>
        );

        return (
            <Dropdown style={{'marginLeft': '10px'}}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    {t("Select laundry")}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                    {list}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default withTranslation()(LaundryList)


const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <Button style={{'width': '150px'}} variant="dark" href="" ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}>
        {children}
        &#x25bc;
    </Button>
));


const CustomMenu = React.forwardRef(
    ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        const [value, setValue] = React.useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}>
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Search"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}/>
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().includes(value),)}
                </ul>
            </div>
        );
    },
);
