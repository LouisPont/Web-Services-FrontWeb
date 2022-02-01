import React from 'react';
import './NewActeur.scss'
import CssTextField from "../../../CssTextField/CssTextField";

export default class NewActeur extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prenom: "",
            nom: 0,
            date :"",
            deces: null,
            image: 0,

        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event ) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }


    async newActeur() {
        fetch("http://cinema.erebz.fr/acteurs/ajouter", {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                nomAct: this.state.nom,
                prenAct: this.state.prenom,
                dateNaiss: this.state.date,
                image: this.state.image,
                dateDeces : this.state.deces,
            })
        })
            .then(() => {
                console.log("succes new acteur")
            })
            .catch(err => {
                console.log(err);
            });
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                image: event.target.files[0].name
            });
        }
    };

 render() {
  return (
      <div className="new-acteur">
       <div className="titre">Ajouter un acteur</div>

       <div className="ligne">
        <CssTextField name="nom" onChange={this.handleChange} color="var(--third-color)" text="Nom" required={true}/>
        <CssTextField name="prenom" onChange={this.handleChange} color="var(--third-color)" text="Prenom" required={true}/>
       </div>

       <div className="ligne">
        <CssTextField name="date" onChange={this.handleChange} color="var(--third-color)" text="Naissance (YYYY-MM-DD)" required={true}/>
        <CssTextField name="deces" onChange={this.handleChange} color="var(--third-color)" text="Décès (YYYY-MM-DD)" required={false}/>
       </div>

      <input type="file" name="myImage" onChange={this.onImageChange} />

      <button
          className="valider"
          onClick={() => {this.newActeur();this.props.changePage(this.props.page)}}
      >
          Valider
      </button>

      </div>
  );
 }

 }