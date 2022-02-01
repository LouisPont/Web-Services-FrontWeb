import React from 'react';
import './SearchPage.scss'
import {Autocomplete, createFilterOptions} from "@material-ui/lab";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const ELEMENT_TO_SHOW = 3;

const filterOptions = createFilterOptions({
    limit: ELEMENT_TO_SHOW
})

const Search = function(objet) {
    const element = objet;
    let label = "";
    if (Object.keys(objet)[0] === "noFilm"){
        label = objet.titre
    }
    if (Object.keys(objet)[0] === "noRea"){
        label = objet.nomRea
    }
    if (Object.keys(objet)[0] === "noAct"){
        label = objet.nomAct
    }
    return { element, label };
};

export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tout: [],
            loaded: false
        };

        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {

        await fetch("http://cinema.erebz.fr/films/list" , {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + this.props.token,
                "Access-Control-Allow-Origin": "Allow",
                "content-type": "application/json",
            }
        })
            .then(response => response.json())
            .then((response) => {
                response.map((elem) => {

                    this.setState({
                        tout: [...this.state.tout, Search(elem) ],
                    })
                })

            })
            .catch(err => {
                console.log(err);
            });

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
                response.map((elem) => {

                    this.setState({
                        tout: [...this.state.tout, Search(elem) ],
                    })
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
                response.map((elem) => {

                    this.setState({
                        tout: [...this.state.tout, Search(elem) ],
                        loaded : true
                    })
                })

            })
            .catch(err => {
                console.log(err);
            });
    }

    handleClick(value) {
        if (Object.keys(value.element)[0] === "noFilm"){
            this.props.updateElement(value.element)
            this.props.changePage(6)
        } else {
            this.props.updateElement(value.element)
            this.props.changePage(7)
        }
    }

    render() {
        return (
            this.state.loaded &&
            <div className="search-page">
                <div className="search">
                    <SearchIcon className="icon"/>
                    <Autocomplete
                        className="auto-complete"
                        id="free-solo-demo"
                        filterOptions={filterOptions}
                        options={this.state.tout}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, value) => this.handleClick(value)}
                        renderInput={(params) => <TextField {...params} label="Recherche ..."/>}
                        sx={{
                            "& 	.MuiAutocomplete-inputRoot": {
                                borderColor: "green"},
                            "& 	.MuiAutocomplete-input": {
                                borderColor: "green"},
                            "	.MuiAutocomplete-inputRoot": {
                                borderColor: "green"},
                            "	.MuiAutocomplete-input": {
                                borderColor: "green"},
                        }}
                    />
                </div>
            </div>

        )
    }
}