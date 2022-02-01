import React from 'react';
import Header from "./Header/Header";
import SearchPage from "./SearchPage/SearchPage";
import './Content.scss'
import Profil from "./Profil/Profil";
import ListFilms from "./Film/ListFilms/ListFilms";
import NewFilm from "./Film/NewFilm/NewFilm";
import NewActeur from "./Personne/NewActeur/NewActeur";
import NewRealisateur from "./Personne/NewRealisateur/NewRealisateur";
import FilmDetails from "./Film/FilmDetails/FilmDetails";
import HumainDetails from "./Personne/HumainDetails/HumainDetails";
import ListHumains from "./Personne/ListHumains/ListHumains";
import ModifyRealisateur from "./Personne/Modify/ModifyRealisateur";
import ModifyFilm from "./Film/ModifyFilm/ModifyFilm";
import ModifyActeur from "./Personne/Modify/ModifyActeur";
import {Add} from "@mui/icons-material";
import AddPersonnage from "./Personne/AddPersonnage/AddPersonnage";


export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page : 0,
            element : []
        };
        this.changePage = this.changePage.bind(this)
        this.updateElement = this.updateElement.bind(this)
    }

    changePage(index) {
        this.setState({
            page : index,
        });
    }

    updateElement(elem) {
        this.setState({
            element : elem
        })
    }

    render() {
        return (
            <div className="content">
                <Header changePage = {this.changePage} />
                {this.state.page === 0 &&
                    <SearchPage
                        changePage={this.changePage}
                        updateElement={this.updateElement}
                        token={this.props.token}
                    />
                }
                {this.state.page === 1 &&
                    <ListFilms
                        changePage={this.changePage}
                        updateElement={this.updateElement}
                        role={this.props.role}
                        token={this.props.token}
                    />
                }
                {this.state.page === 2 &&
                    <ListHumains
                        changePage={this.changePage}
                        updateElement={this.updateElement}
                        token={this.props.token}
                        role={this.props.role}
                    />
                }
                {this.state.page === 3 &&
                    <NewActeur
                        token={this.props.token}
                        changePage={this.changePage}
                        page={0}
                    />
                }
                {this.state.page === 4 &&
                    <NewRealisateur
                        token={this.props.token}
                        changePage={this.changePage}
                        page={0}
                    />
                }
                {this.state.page === 5 &&
                    <NewFilm
                        token={this.props.token}
                        changePage={this.changePage}
                        page={0}
                    />
                }
                {this.state.page === 6 &&
                    <FilmDetails
                        changePage={this.changePage}
                        token={this.props.token}
                        updateElement={this.updateElement}
                        film = {this.state.element}
                        role={this.props.role}
                    />
                }
                {this.state.page === 7 &&
                    <HumainDetails
                        changePage={this.changePage}
                        token={this.props.token}
                        updateElement={this.updateElement}
                        acteur = {this.state.element}
                        role={this.props.role}
                    />
                }
                {this.state.page === 8 &&
                    <Profil
                        role={this.props.role}
                    />
                }
                {this.state.page === 9 &&
                    <ModifyRealisateur
                        real = {this.state.element}
                        changePage={this.changePage}
                        token={this.props.token}
                        page={0}
                    />
                }
                {this.state.page === 10 &&
                    <ModifyFilm
                        film = {this.state.element}
                        changePage={this.changePage}
                        token={this.props.token}
                        page={0}
                    />
                }
                {this.state.page === 11 &&
                    <ModifyActeur
                        acteur = {this.state.element}
                        changePage={this.changePage}
                        token={this.props.token}
                        page={0}
                    />
                }
                {this.state.page === 12 &&
                    <AddPersonnage
                        acteur = {this.state.element}
                        changePage={this.changePage}
                        token={this.props.token}
                        page={0}
                    />
                }

            </div>
        )
    }
}