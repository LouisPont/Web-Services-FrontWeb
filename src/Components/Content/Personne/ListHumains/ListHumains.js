import React from 'react';
import './ListHumains.scss';
import Plus from "../../../Plus/Plus";

export default class ListHumains extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            real: [],
            acteurs : [],
            loaded: false
        };

    }

    async componentDidMount() {

        await fetch("http://cinema.erebz.fr/realisateurs/list" , {
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
                })
            })
            .catch(err => {
                console.log(err);
            });

        await fetch("http://cinema.erebz.fr/acteurs/list" , {
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
                        acteurs: response,
                        loaded : true
                    })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        return (
            <div className="list-humain">
                <div className={this.props.role === "admin" ? "ligne between " : "ligne center"}>
                    {this.props.role === "admin" &&
                        <div/>
                    }
                    <div className="titre">Liste des acteurs</div>
                    {this.props.role === "admin" &&
                        <Plus
                            changePage={this.props.changePage}
                            page={3}
                        />
                    }
                </div>
                <div className="acteurs">
                    {this.state.acteurs.map((acteur, index) => {
                        return (
                            <div
                                onClick={() => {this.props.updateElement(acteur);this.props.changePage(7)}}
                                className="card-acteur"
                            >
                                <img className="img-film" alt="image_casse"  src={`/image/${acteur.image}`} />
                                <p className="film-titre">{acteur.prenAct} {acteur.nomAct}</p>

                                <div className="details">Voir plus</div>
                            </div>
                        )
                    })}
                </div>

                <div className={this.props.role === "admin" ? "ligne between " : "ligne center"}>
                    {this.props.role === "admin" &&
                        <div/>
                    }
                    <div className="titre">Liste des réalisateurs</div>
                    {this.props.role === "admin" &&
                        <Plus
                            changePage={this.props.changePage}
                            page={4}
                        />
                    }
                </div>
                <div className="acteurs">
                    {this.state.real.map((acteur, index) => {
                        return (
                            <div
                                onClick={() => {this.props.updateElement(acteur);this.props.changePage(7)}}
                                className="card-acteur"
                            >
                                <img className="img-film" alt="image_casse"  src={`/image/${acteur.image}`} />
                                <p className="film-titre">{acteur.prenRea} {acteur.nomRea}</p>

                                <div className="details">Voir plus</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}