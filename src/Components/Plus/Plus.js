import React from 'react';
import './Plus.scss'

export default class Plus extends React.Component {


    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this)
    }

    handler() {
        this.props.changePage(this.props.page)
    }

    render(){
        return (
                <div
                    className="plus"
                    onClick={this.handler }
                >
                    <p>+</p>
                </div>
        )
    }
}