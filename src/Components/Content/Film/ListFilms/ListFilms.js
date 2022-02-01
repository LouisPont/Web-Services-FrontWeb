import React from 'react';
import './ListFilms.scss'
import Plus from "../../../Plus/Plus";
import {Autocomplete, createFilterOptions} from "@material-ui/lab";
import TextField from "@mui/material/TextField";


const ELEMENT_TO_SHOW = 10;

const filterOptions = createFilterOptions({
    limit: ELEMENT_TO_SHOW
})

let saveMovies = [];

export default class ListFilms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
            image: "",
            categorie: [],
        };

        this.componentWillMount = this.componentWillMount.bind(this)
        this.changeMovies = this.changeMovies.bind(this)
    }

    async changeMovies(type) {
        if (type === null) {
            this.setState({
                films: saveMovies,
            })
        } else {

            await fetch("http://cinema.erebz.fr/categories/" + type.codeCat + "/films", {
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
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    componentWillMount() {
        fetch("http://cinema.erebz.fr/categories/list", {
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

        fetch("http://cinema.erebz.fr/films/list", {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            }
        })
            .then(response => response.json())
            .then(response => {
                saveMovies = response
                this.setState({
                    films: response
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="list-films">
                <div className={this.props.role === "admin" ? "ligne between " : "ligne around"}>
                    {this.props.role === "admin" &&
                        <div/>
                    }
                    <div className="titre">Liste des films</div>
                    <div className="search-new pad">
                        <Autocomplete
                            className="auto-complete"
                            id="free-solo-demo"
                            filterOptions={filterOptions}
                            options={this.state.categorie}
                            name="real"
                            onChange={(event, value) => {
                                this.changeMovies(value)
                            }}
                            getOptionLabel={(option) => option.libelleCat}
                            renderInput={(params) => <TextField  {...params} label="Recherche ..."/>}
                        />
                    </div>
                    {this.props.role === "admin" &&
                        <Plus
                            changePage={this.props.changePage}
                            page={5}
                        />
                    }
                </div>
                <div className="list">
                    {this.state.films.map((film, index) => {
                        return (
                            <div
                                onClick={() => {
                                    this.props.updateElement(film);
                                    this.props.changePage(6)
                                }}
                                className="card-film"
                            >
                                <img className="img-film" alt="image_casse" src={`/image/${film.image}`}/>
                                <p className="film-titre">{film.titre}</p>
                                <div className="details">Voir plus</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}