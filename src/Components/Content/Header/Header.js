import React from 'react';
import './Header.scss'


export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                showCata:false
        };

        this.showSubs = this.showSubs.bind(this)
        this.hideSubs = this.hideSubs.bind(this)
    }

    showSubs() {
        this.setState({
            showCata : true
        });
    }

    hideSubs() {
        this.setState({
            showCata : false
        });
    }


    render() {
        return (
            <div className="header">
                <div
                    className="home"
                    onClick={() => this.props.changePage(0)}
                >
                    AzZ Cine
                </div>
                <div className={this.state.showCata? "dropDown visible" : "dropDown"}
                     onMouseEnter={this.showSubs}
                     onMouseLeave={this.hideSubs}
                >
                    <div className="cat middle">Catalogue</div>
                    <div className={this.state.showCata? "sub-cats" : "sub-cats hidden"}>
                        <div
                            className="sub-cat top"
                            onClick={() => this.props.changePage(1)}
                        >
                            Films
                        </div>
                        <div
                            className="sub-cat"
                            onClick={() => this.props.changePage(2)}
                        >
                            Humains
                        </div>
                    </div>
                </div>
                <div
                    className="cat"
                    onClick={() => this.props.changePage(8)}
                >
                    Profil
                </div>
            </div>
        )
    }

}