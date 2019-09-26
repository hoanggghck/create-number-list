import React, { Component } from 'react';
import '../css/begin.css'
import {Link} from 'react-router-dom'
class Begin extends Component {
    render() {
        return (
            <div className="  myHello">
                <h1 className="animated  bounceInDown delay-0.5s">Hello</h1>
                <h2 className="animated  slideInLeft delay-1s ">Welcome to my app!</h2>
                <div >
                <Link className="btn_lo jackInTheBox animated delay-2s" to="/input">Click here</Link><i className="fas fa-arrow-alt-circle-right"></i>
                </div>
            </div>
        );
    }
}

export default Begin;