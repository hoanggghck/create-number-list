import React, { Component } from 'react';

class OutPutItem extends Component {
    render() {
        const user = this.props.item
        const number = user.map((number,index) =>
            <span className="" key={index} >{number}</span>
        );
        
        return (
            <div className="myNumber animated bounceInRight ">
                {number}
            </div>
        );
    }
}

export default OutPutItem;