import React from 'react';
import './FilmDetails.scss'
import Moins from "../../../Plus/Moins";
import Tild from "../../../Plus/Tild";

export default class FilmDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            film: [],
            personnages: [],
            loaded: false
        };

        this.componentDidMount = this.componentDidMount.bind(this)
        this.deleteFilm = this.deleteFilm.bind(this)
    }

    async componentDidMount() {
        await fetch("http://cinema.erebz.fr/films/" + this.props.film.noFilm, {
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
                    film: response
                })
            })
            .catch(err => {
                console.log(err);
            });

        fetch("http://cinema.erebz.fr/personnages/list", {
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
                    personnages: response,
                    loaded: true
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    async deleteFilm() {
            fetch("http://cinema.erebz.fr/films/supprimer", {
                "method": "POST",
                "headers": {
                    "Authorization": "Bearer " + this.props.token,
                    "Access-Control-Allow-Origin": "Allow",
                    "content-type": "application/json",
                },
                "body": JSON.stringify({
                    noFilm: this.state.film.noFilm,
                })
            })
                .then(() => {
                    console.log("Succes delete Film")
                })
                .catch(err => {
                    console.log(err);
                })
    }

    render() {
        return (
            this.state.loaded &&
            <div className="film-detail">
                <div className="main-card">
                    {this.props.role === "admin" &&
                        <div>
                        <div className="tild">
                                <Tild
                                    updateElem={this.props.updateElement}
                                    elem={(this.state.film)}
                                    changePage={this.props.changePage}
                                    page={10}
                                />
                        </div>
                        <div className="moins">
                            <Moins
                                changePage={this.props.changePage}
                                page={1}
                                deleteMan={this.deleteFilm}
                            />
                        </div>
                        </div>
                    }
                    <div className="cat-1 ">
                        <img className="img-film" alt="image_casse" src={`/image/${this.state.film.image}`}/>
                        <div className="infos">
                            <div className="ligne info ">Titre : {this.state.film.titre}</div>
                            <div className="ligne">
                                <div className="info">Durée : {this.state.film.duree} minutes</div>
                                <div className="info">Date de sortie : {this.state.film.dateSortie}</div>
                            </div>
                            <div className="ligne">
                                <div className="info">Budget : {this.state.film.budget}€</div>
                                <div className="info">Recette : {this.state.film.montantRecette}€</div>
                            </div>
                        </div>
                    </div>
                    <div className="cat-2 ">
                        <div
                            className="card-acteur"
                            onClick={() => {
                                this.props.updateElement(this.state.film.realisateur);
                                this.props.changePage(7)
                            }}
                        >
                            <img className="img-film" alt="image_casse"
                                 src={`/image/${this.state.film.realisateur.image}`}/>
                            <div
                                className="padding-top">{this.state.film.realisateur.prenRea} {this.state.film.realisateur.nomRea}</div>
                            <div className="details">Voir plus</div>
                        </div>
                        <div className="separator"/>
                        <div className="acteurs">
                            {this.state.personnages.map((perso) => {
                                if (this.state.film.noFilm === perso.film.noFilm) {
                                    return (
                                        <div
                                            onClick={() => {
                                                this.props.updateElement(perso.acteur);
                                                this.props.changePage(7)
                                            }}
                                            className="card-acteur"
                                        >
                                            <img className="img-film" alt="image_casse"
                                                 src={`/image/${perso.acteur.image}`}/>

                                            <p>{perso.acteur.prenAct} {perso.acteur.nomAct}</p>
                                            <p>{perso.nomPers}</p>
                                            <div className="details">Voir plus</div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </ div>
                </div>
            </div>
        )
    }
}