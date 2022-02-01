import React from 'react';
import './HumanDetails.scss'
import Moins from "../../../Plus/Moins";
import Tild from "../../../Plus/Tild";
import Plus from "../../../Plus/Plus";

export default class HumainDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            personne: [],
            personnages: [],
            type: ""
        };

        this.componentWillMount = this.componentWillMount.bind(this)
        this.deleteMan = this.deleteMan.bind(this)
    }

    componentWillMount() {
        if (Object.keys(this.props.acteur)[0] === "noRea") {
            fetch("http://cinema.erebz.fr/realisateurs/" + this.props.acteur.noRea, {
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
                        personne: response,
                        type: "real"
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            fetch("http://cinema.erebz.fr/acteurs/" + this.props.acteur.noAct, {
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
                        personne: response,
                        type: "acteur"
                    })
                })
                .catch(err => {
                    console.log(err);
                })

            fetch("http://cinema.erebz.fr/acteurs/" + this.props.acteur.noAct + "/personnages", {
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
                        personnages: response
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    async deleteMan() {
        if (this.state.type === "acteur") {
            fetch("http://cinema.erebz.fr/acteurs/supprimer", {
                "method": "POST",
                "headers": {
                    "Authorization": "Bearer " + this.props.token,
                    "Access-Control-Allow-Origin": "Allow",
                    "content-type": "application/json",
                },
                "body": JSON.stringify({
                    noAct: this.state.personne.noAct,
                })
            })
                .then(() => {
                    console.log("Succes delete acteur")
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            fetch("http://cinema.erebz.fr/realisateurs/supprimer", {
                "method": "POST",
                "headers": {
                    "Authorization": "Bearer " + this.props.token,
                    "Access-Control-Allow-Origin": "Allow",
                    "content-type": "application/json",
                },
                "body": JSON.stringify({
                    noRea: this.state.personne.noRea,
                })
            })
                .then(() => {
                    console.log("Succes delete real")
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    render() {
        return (
            <div className="humain-detail">
                <div className="main-card">
                    {this.props.role === "admin" &&
                        <div>
                            <div className="tild">
                                {this.state.type === "real" &&
                                    <Tild
                                        updateElem={this.props.updateElement}
                                        elem={(this.state.personne)}
                                        changePage={this.props.changePage}
                                        page={9}
                                    />
                                }
                                {this.state.type === "acteur" &&
                                    <Tild
                                        updateElem={this.props.updateElement}
                                        elem={(this.state.personne)}
                                        changePage={this.props.changePage}
                                        page={11}
                                    />
                                }
                            </div>
                            <div className="perso">
                                <Plus
                                    changePage={this.props.changePage}
                                    page={12}
                                />
                            </div>
                            <div className="moins">
                                <Moins
                                    changePage={this.props.changePage}
                                    page={2}
                                    deleteMan={this.deleteMan}
                                />
                            </div>
                        </div>
                    }
                    <div className="cat-1 ">
                        <img className="img-film" alt="image_casse"
                             src={`/image/${this.state.personne.image}`}/>
                        <div className="infos">

                            {this.state.type === "acteur" &&
                                <div className="ligne">
                                    <div className="info">{this.state.personne.prenAct}</div>
                                    <div className="info">{this.state.personne.nomAct}</div>
                                </div>
                            }
                            {this.state.type === "real" &&
                                <div className="ligne">
                                    <div className="info">{this.state.personne.prenRea}</div>
                                    <div className="info">{this.state.personne.nomRea}</div>
                                </div>
                            }

                            {this.state.type === "acteur" &&
                                <div className="enbas">
                                    <div className="info">Naissance : {this.state.personne.dateNaiss}</div>
                                    {this.state.personne.dateDeces !== null &&
                                        <div className="info">Décès : {this.state.personne.dateDeces}</div>
                                    }
                                </div>
                            }

                        </div>
                    </div>
                    <div className="cat-2 ">
                        <div className="films">
                            {this.state.type === "real" &&
                                this.state.personne.films.map((film) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                this.props.updateElement(film);
                                                this.props.changePage(6)
                                            }}
                                            className="card-film"
                                        >
                                            <img className="img-film" alt="image_casse"
                                                 src={`/image/${film.image}`}/>
                                            <p>{film.titre}</p>
                                            <div className="details">Voir plus</div>
                                        </div>
                                    )
                                })
                            }
                            {this.state.type === "acteur" &&
                                this.state.personnages.map((perso) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                this.props.updateElement(perso.film);
                                                this.props.changePage(6)
                                            }}
                                            className="card-film"
                                        >
                                            <img className="img-film" alt="image_casse"
                                                 src={`/image/${perso.film.image}`}/>
                                            <p>{perso.film.titre}</p>
                                            <p>{perso.nomPers}</p>
                                            <div className="details">Voir plus</div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </ div>
                </div>
            </div>
        )
    }
}