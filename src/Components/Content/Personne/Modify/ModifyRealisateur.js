import React from 'react';
import '../NewRealisateur/NewRealisateur.scss'
import CssTextField from "../../../CssTextField/CssTextField";

export default class ModifyRealisateur extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prenom: this.props.real.prenRea,
            nom: this.props.real.nomRea,
            image: this.props.real.image,

        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event ) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                image: event.target.files[0].name
            });
        }
    };


    async modifyReal() {
        fetch("http://cinema.erebz.fr/realisateurs/modifier", {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                noRea: this.props.real.noRea,
                nomRea: this.state.nom,
                prenRea: this.state.prenom,
                image: this.state.image,
            })
        })
            .then(() => {
                console.log("succes modif real")
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="new-real">
                <div className="titre">Modifier un réalisateur</div>

                <div className="ligne">
                    <CssTextField defaultValue={this.props.real.nomRea} name="nom" onChange={this.handleChange} color="var(--third-color)" text="Nom" required={true}/>
                    <CssTextField defaultValue={this.props.real.prenRea} name="prenom" onChange={this.handleChange} color="var(--third-color)" text="Prenom" required={true}/>
                </div>

                <input type="file" name="myImage" onChange={this.onImageChange} />

                <button
                    className="valider"
                    onClick={() => {this.modifyReal();this.props.changePage(this.props.page)}}
                >
                    Valider
                </button>
            </div>
        );
    }

}