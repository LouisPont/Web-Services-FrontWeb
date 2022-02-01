import React from 'react';
import './Profil.scss'

export default class Profil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prenom: "Simon",
            nom : "Gaufreteau",
        };
    }

    render(){
        return (
            <div className="profil">
                <div className="titre">Votre profil</div>
                    <div className="ligne first">
                        <div className="text">
                            Prénom :
                        </div>
                        <div className="text imported">
                            {this.state.prenom}
                        </div>
                    </div>
                    <div className="ligne">
                        <div className="text">
                            Nom :
                        </div>
                        <div className="text imported">
                            {this.state.nom}
                        </div>
                    </div>
                <div className="ligne">
                    <div className="text">
                        Rôle :
                    </div>
                    <div className="text imported">
                        {this.props.role}
                    </div>
                </div>
            </div>
        )
    }
}