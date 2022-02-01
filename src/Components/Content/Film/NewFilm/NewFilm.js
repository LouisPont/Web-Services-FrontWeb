import './NewFilm.scss';
import React from 'react';
import CssTextField from "../../../CssTextField/CssTextField";
import TextField from "@mui/material/TextField";
import {Autocomplete, createFilterOptions} from "@material-ui/lab";



const ELEMENT_TO_SHOW_2 = 10;

const filterOptions_2 = createFilterOptions({
    limit: ELEMENT_TO_SHOW_2
})

const ELEMENT_TO_SHOW = 3;

const filterOptions = createFilterOptions({
    limit: ELEMENT_TO_SHOW
})

export default class NewFilm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded : false,
            titre: "",
            duree: 0,
            image :"",
            date: "",
            budget: 0,
            recette: 0,
            realUnique : 0,
            real: 0,
            categorie : 0,
            catUnique : 0

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

    async newFilm() {
        fetch("http://cinema.erebz.fr/films/ajouter", {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                titre: this.state.titre,
                image: this.state.image,
                duree: this.state.duree,
                dateSortie: this.state.date,
                budget: this.state.budget,
                montantRecette: this.state.recette,
                realisateur : {
                    noRea : this.state.realUnique.noRea,
                    nomRea : this.state.realUnique.nomRea,
                    prenRea : this.state.realUnique.prenRea,
                },
                categorie: {
                        codeCat: this.state.catUnique.codeCat,
                        libelleCat: this.state.catUnique.libelleCat
                }
            })
        })
            .then(() => {
                console.log("succes")
            })
            .catch(err => {
                console.log(err);
            });
    }

    async componentDidMount() {

        await fetch("http://cinema.erebz.fr/categories/list", {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            }
        })
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    categorie: response,
                })
            })
            .catch(err => {
                console.log(err);
            });

        await fetch("http://cinema.erebz.fr/realisateurs/list", {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            }
        })
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    real: response,
                    loaded: true
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            this.state.loaded === true &&
            <div className="new-film">
                <div className="titre">Ajouter un film</div>

                <CssTextField
                    color="var(--third-color)"
                    text="Titre"
                    required={true}
                    name="titre"
                    onChange={this.handleChange}
                />

                <div className="ligne">
                    <CssTextField
                        color="var(--third-color)"
                        text="Duree (en min)"
                        required={true}
                        name="duree"
                        onChange={this.handleChange}
                    />
                    <CssTextField
                        color="var(--third-color)"
                        text="Date de sortie (YYYY-MM-DD)"
                        required={true}
                        name="date"
                        onChange={this.handleChange}
                    />
                </div>

                <div className="ligne">
                    <CssTextField
                        color="var(--third-color)"
                        text="Budget"
                        required={true}
                        name="budget"
                        onChange={this.handleChange}
                    />
                    <CssTextField
                        color="var(--third-color)"
                        text="Recette"
                        required={true}
                        name="recette"
                        onChange={this.handleChange}
                    />
                </div>

                <div className="ligne">
                    <div className="text"> Réalisateur</div>
                    <div className="search-new">
                        <Autocomplete
                            className="auto-complete"
                            id="free-solo-demo"
                            filterOptions={filterOptions}
                            options={this.state.real}
                            name="real"
                            onChange={(event, value ) => {
                               this.setState ({
                                   realUnique: value
                               });
                            }}
                            getOptionLabel={(option) => option.nomRea}
                            renderInput={(params) => <TextField  {...params} label="Recherche ..."/>}
                        />
                    </div>
                </div>
                <div className="ligne">
                    <div className="text"> Catégorie</div>
                    <div className="search-new pad">
                        <Autocomplete
                            className="auto-complete"
                            id="free-solo-demo"
                            filterOptions={filterOptions_2}
                            options={this.state.categorie}
                            name="real"
                            onChange={(event, value ) => {
                                this.setState ({
                                    catUnique: value
                                });
                            }}
                            getOptionLabel={(option) => option.libelleCat}
                            renderInput={(params) => <TextField  {...params} label="Recherche ..."/>}
                        />
                    </div>
                </div>

                <input type="file" name="myImage" className="insert" onChange={this.onImageChange} />


                <button
                    className="valider"
                    onClick={() => {this.newFilm();this.props.changePage(this.props.page) }}
                >
                    Valider
                </button>

            </div>
        );
    }
}

