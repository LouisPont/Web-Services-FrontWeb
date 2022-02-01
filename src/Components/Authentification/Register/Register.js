import CssTextField from "../../CssTextField/CssTextField";
import CssButton from "../../CssButton/CssButton";
import React from "react";


export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 0,
            password : "",
            confirmPass : ""
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

        fetch("http://cinema.erebz.fr/authentification/register", {
            "method": "POST",
            "headers": {
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                nomUtil: this.state.user,
                motPasse: this.state.password
            })
        }).then(
                this.props.changePage()
            )
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        return (
            <div>
                <div className="register">
                    <CssTextField
                        color="var(--primary-color)"
                        text="Identifiant"
                        required={true}
                        name="user"
                        onChange={this.handleChange}
                    />
                    <CssTextField
                        color="var(--primary-color)"
                        text="Mot de passe"
                        password={true}
                        name="password"
                        onChange={this.handleChange}
                        required={true}
                    />
                    <CssTextField
                        color="var(--primary-color)"
                        text="Confirmer mot de passe"
                        password={true}
                        name="confirmPass"
                        onChange={this.handleChange}
                        required={true}
                    />
                    <CssButton handleClick={this.handleClick} text="Créer un compte"/>

                    {this.state.confirmPass !== "" &&
                        <p
                            className={this.state.password === this.state.confirmPass ? "hidden no_match" : "no_match"}>
                            Les mots de passe ne correspondent pas !
                        </p>
                    }
                    <p onClick={this.props.changePage} className="lien retour"> Retour </p>
                </div>
            </div>
        )
    }
}
