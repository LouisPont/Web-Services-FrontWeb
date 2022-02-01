import React from "react";
import './CssButton.scss';

export default class CssButton extends React.Component {
    render(){
        return (
            <button onClick={this.props.handleClick}>
                {this.props.text}
            </button>
        )
    }
}
