import React from 'react';
import './NewRealisateur.scss'
import CssTextField from "../../../CssTextField/CssTextField";

export default class NewRealisateur extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prenom: "",
            nom: 0,
            image: 0,

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


    async newReal() {
        fetch("http://cinema.erebz.fr/realisateurs/ajouter", {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                nomRea: this.state.nom,
                prenRea: this.state.prenom,
                image: this.state.image,
            })
        })
            .then(() => {
                console.log("succes new real")
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="new-real">
                <div className="titre">Ajouter un réalisateur</div>

                <div className="ligne">
                    <CssTextField name="nom" onChange={this.handleChange} color="var(--third-color)" text="Nom" required={true}/>
                    <CssTextField name="prenom" onChange={this.handleChange} color="var(--third-color)" text="Prenom" required={true}/>
                </div>

                <input type="file" name="myImage" onChange={this.onImageChange} />

                <button
                    className="valider"
                    onClick={() => {this.newReal();this.props.changePage(this.props.page)}}
                >
                    Valider
                </button>
            </div>
        );
    }

}