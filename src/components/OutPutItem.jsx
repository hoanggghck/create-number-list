import React, { Component } from 'react';

class OutPutItem extends Component {
    render() {
        const user = this.props.item
         const alo = user.map((number) =>
        <li  style={{display:"inline",marginRight:"20px",marginBottom:"10px",padding:"3px 2px",backgroundColor:"red"}}>{number}</li>
);
        
        return (
            <div >
                {alo}
            </div>
        );
    }
}

export default OutPutItem;