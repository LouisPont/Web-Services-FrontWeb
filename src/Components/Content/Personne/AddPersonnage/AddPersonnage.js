import React from 'react';
import './AddPersonnage.scss'
import {Autocomplete, createFilterOptions} from "@material-ui/lab";
import TextField from "@mui/material/TextField";
import CssTextField from "../../../CssTextField/CssTextField";

const ELEMENT_TO_SHOW = 3;

const filterOptions = createFilterOptions({
    limit: ELEMENT_TO_SHOW
})

export default class AddPersonnage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nomPers: "",
            films: "",
            selectedFilm: "",
            loaded: false
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async addPersonnage() {
        fetch("http://cinema.erebz.fr/personnages/ajouter", {
            "method": "POST",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            },
            "body": JSON.stringify({
                film: {
                    noFilm: this.state.selectedFilm.noFilm
                },
                acteur: {
                    noAct: this.props.acteur.noAct
                },
                nomPers: this.state.nomPers
            })
        })
            .then(() => {
                console.log("ajout perso succes")
            })
            .catch(err => {
                console.log(err);
            });
    }

    async componentDidMount() {

        await fetch("http://cinema.erebz.fr/films/list", {
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
                    films: response,
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
            <div className="add-perso">
                <div className="titre">Ajouter un personnage</div>
                <div className="ligne">
                    <div className="search-new">
                        <Autocomplete
                            className="auto-complete"
                            id="free-solo-demo"
                            filterOptions={filterOptions}
                            options={this.state.films}
                            name="real"
                            onChange={(event, value) => {
                                this.setState({
                                    selectedFilm: value
                                });
                            }}
                            getOptionLabel={(option) => option.titre}
                            renderInput={(params) => <TextField  {...params} label="Recherche ..."/>}
                        />
                    </div>

                    <CssTextField
                        color="var(--third-color)"
                        text="Personnage"
                        required={true}
                        name="nomPers"
                        onChange={this.handleChange}
                    />
                </div>
                <button
                    className="valider"
                    onClick={() => {
                        this.addPersonnage();
                        this.props.changePage(this.props.page)
                    }}
                >
                    Valider
                </button>
            </div>
        )
    }
}

