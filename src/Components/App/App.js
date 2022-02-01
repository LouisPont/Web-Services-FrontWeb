import Authentification from '../Authentification/Authentification';
import './App.css';
import React from 'react';
import Content from "../Content/Content";



export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn : false,
            role : "",
            token : ""
        }

        this.logIn = this.logIn.bind(this)
    }

    logIn(role, tok) {
        this.setState({
            loggedIn : true,
            token : tok,
            role : role
        })
        console.log(this.state.role + " " + this.state.token)
    }

    render() {
        return (
            <div className="App">
                {this.state.loggedIn === true &&
                    <Content
                        role={this.state.role}
                        token={this.state.token}
                    />
                }
                {this.state.loggedIn === false &&
                    <Authentification logIn={this.logIn}/>
                }
            </div>
        );
    }
}


