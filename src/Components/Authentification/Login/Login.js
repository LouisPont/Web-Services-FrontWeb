import CssTextField from "../../CssTextField/CssTextField";
import CssButton from "../../CssButton/CssButton";
import React from "react";


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: 0,
            password : ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    handleChange(event ) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }


    async handleClick() {

        fetch("http://cinema.erebz.fr/authentification/login", {
            "method": "POST",
            "headers": {
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                nomUtil: this.state.user,
                motPasse: this.state.password
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.role){
                    this.props.logIn(response.role, response.token)
                }
                else {

                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        return (
            <div className="login">
                <div className="form">
                    <CssTextField
                        name="user"
                        onChange={this.handleChange}
                        color="var(--primary-color)"
                        text="Identifiant"
                        required={true}/>
                    <CssTextField
                        color="var(--primary-color)"
                        onChange={this.handleChange}
                        text="Mot de passe"
                        name="password"
                        required={true}
                        password={true}/>
                </div>
                <CssButton handleClick={this.handleClick} text="Se connecter"/>
                <p onClick={this.props.changePage} className="lien"> S'inscrire </p>
            </div>
        )
    }
}
