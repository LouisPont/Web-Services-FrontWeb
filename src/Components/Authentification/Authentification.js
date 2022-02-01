import React from 'react';
import fond from '../../image/fond.jpg'
import './Authentification.scss';
import Login from "./Login/Login";
import Register from "./Register/Register";



export default class Authentification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            password : "",

        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event ) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    changePage(index) {
        this.setState({
            page : index,
        });
    }

    render() {
        return (
            <div className="Authentification">
                <div className="left">
                    <h1 className="titre">AzZ Cine</h1>
                    {this.state.page === 0 &&
                       <Login
                           changePage = {() => this.changePage(1)}
                           logIn = {this.props.logIn}
                       />
                    }

                    {this.state.page === 1 &&
                        <Register
                            password = {this.state.password}
                            handleChange = {this.handleChange}
                            confirmPass = {this.state.confirmPass}
                            changePage = {() => this.changePage(0)}
                        />
                    }

                    <div className="line" />
                </div>
                <div className="right">
                    <img alt="fond" src={fond} />
                </div>
            </div>
        )
    }
}
