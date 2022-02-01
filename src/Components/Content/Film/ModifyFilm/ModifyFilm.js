import React from 'react';
import '../NewFilm/NewFilm.scss'
import CssTextField from "../../../CssTextField/CssTextField";
import {Autocomplete, createFilterOptions} from "@material-ui/lab";
import TextField from "@mui/material/TextField";

const ELEMENT_TO_SHOW = 3;

const filterOptions = createFilterOptions({
    limit: ELEMENT_TO_SHOW
})


export default class ModifyFilm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded : false,
            titre: this.props.film.titre,
            image: this.props.film.image,
            duree :this.props.film.duree,
            dateSortie:this.props.film.dateSortie,
            budget: this.props.film.budget,
            montantRecette: this.props.film.montantRecette,
            realisateur : this.props.film.realisateur,
            categorie : this.props.film.categorie,
            listReal: 0,
            listCategories : 0,

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


    async modifyFilm() {
        fetch("http://cinema.erebz.fr/films/modifier", {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                noFilm: this.props.film.noFilm,
                titre: this.state.titre,
                image: this.state.image,
                duree: this.state.duree,
                dateSortie: this.state.dateSortie,
                budget: this.state.budget,
                montantRecette: this.state.montantRecette,
                realisateur: {
                    noRea: this.state.realisateur.noRea,
                    nomRea: this.state.realisateur.nomRea,
                    prenRea: this.state.realisateur.prenRea,
                },
                categorie: {
                    codeCat: this.state.categorie.codeCat,
                    libelleCat: this.state.categorie.libelleCat
                }
            })
        })
            .then(() => {
                console.log("succes modif Film")
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
                    listCategories: response,
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
                    listReal: response,
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
                    defaultValue={this.props.film.titre}
                    color="var(--third-color)"
                    text="Titre"
                    required={true}
                    name="titre"
                    onChange={this.handleChange}
                />

                <div className="ligne">
                    <CssTextField
                        defaultValue={this.props.film.duree}
                        color="var(--third-color)"
                        text="Duree (en min)"
                        required={true}
                        name="duree"
                        onChange={this.handleChange}
                    />
                    <CssTextField
                        defaultValue={this.props.film.dateSortie}
                        color="var(--third-color)"
                        text="Date de sortie (YYYY-MM-DD)"
                        required={true}
                        name="date"
                        onChange={this.handleChange}
                    />
                </div>

                <div className="ligne">
                    <CssTextField
                        defaultValue={this.props.film.budget}
                        color="var(--third-color)"
                        text="Budget"
                        required={true}
                        name="budget"
                        onChange={this.handleChange}
                    />
                    <CssTextField
                        defaultValue={this.props.film.montantRecette}
                        color="var(--third-color)"
                        text="Recette"
                        required={true}
                        name="montantRecette"
                        onChange={this.handleChange}
                    />
                </div>

                <div className="ligne">
                    <div className="text"> Réalisateur</div>
                    <div className="search-new">
                        <Autocomplete
                            defaultValue={this.props.film.realisateur}
                            className="auto-complete"
                            id="free-solo-demo"
                            filterOptions={filterOptions}
                            options={this.state.listReal}
                            name="real"
                            onChange={(event, value ) => {
                                this.setState ({
                                    realisateur: value
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
                            defaultValue={this.props.film.categorie}
                            className="auto-complete"
                            id="free-solo-demo"
                            filterOptions={filterOptions}
                            options={this.state.listCategories}
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

                <input type="file" name="myImage" onChange={this.onImageChange} />


                <button
                    className="valider"
                    onClick={() => {this.modifyFilm();this.props.changePage(this.props.page) }}
                >
                    Valider
                </button>

            </div>
        );
    }

}