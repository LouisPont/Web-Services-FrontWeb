import React from 'react';
import '../NewActeur/NewActeur.scss'
import CssTextField from "../../../CssTextField/CssTextField";

export default class ModifyActeur extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nomAct: this.props.acteur.nomAct,
            prenAct: this.props.acteur.prenAct,
            dateNaiss :this.props.acteur.dateNaiss,
            dateDeces: this.props.acteur.dateDeces,
            image: this.props.acteur.image,

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


    async modifyActeur() {
        fetch("http://cinema.erebz.fr/acteurs/modifier", {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                noAct:this.props.acteur.noAct,
                nomAct: this.state.nomAct,
                prenAct: this.state.prenAct,
                dateNaiss: this.state.dateNaiss,
                image: this.state.image,
                dateDeces : this.state.dateDeces,
            })
        })
            .then(() => {
                console.log("succes modify acteur")
            })
            .catch(err => {
                console.log(err);
            });
    }



    render() {
        return (
            <div className="new-acteur">
                <div className="titre">Modifier un acteur</div>

                <div className="ligne">
                    <CssTextField defaultValue={this.props.acteur.nomAct} name="nomAct" onChange={this.handleChange} color="var(--third-color)" text="Nom" required={true}/>
                    <CssTextField defaultValue={this.props.acteur.prenAct} name="prenAct" onChange={this.handleChange} color="var(--third-color)" text="Prenom" required={true}/>
                </div>

                <div className="ligne">
                    <CssTextField defaultValue={this.props.acteur.dateNaiss} name="dateNaiss" onChange={this.handleChange} color="var(--third-color)" text="Naissance (YYYY-MM-DD)" required={true}/>
                    <CssTextField defaultValue={this.props.acteur.dateDeces} name="dateDeces" onChange={this.handleChange} color="var(--third-color)" text="Décès (YYYY-MM-DD)" required={false}/>
                </div>

                <input type="file" name="myImage" onChange={this.onImageChange} />

                <button
                    className="valider"
                    onClick={() => {this.modifyActeur();this.props.changePage(this.props.page)}}
                >
                    Valider
                </button>

            </div>
        );
    }

}