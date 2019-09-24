import React, { Component } from 'react';
import Output from './Output';
import {connect} from 'react-redux'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:[
                {linenumber : 0},
                {linelength: 0},
                {linevalue: 1},
                {numberbreak: ""},
                {booleannumber:0},
        ]
           
        }
    }
    onChange = (e) =>{
        this.setState({
            value: e.target.value
        })
    }
    onSubmit = (e) => {
		e.preventDefault()
	
    }
    saveData = () =>{
        localStorage.setItem("List", JSON.stringify(this.state));
    }
    render() {
        console.log(this.state);
        
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Nhập dãy số</label>
                        <input 
                        type="text" 
                        name="linenumber" 
                        onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Nhập Độ dài</label>
                        <input 
                        type="text" 
                        name="linelength" 
                        onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Bạn có muốn dãy thứ tự hay không</label>
                        <select 
                        name="linevalue" 
                        id=""
                        onChange={this.onChange}
                        >
                            <option value="1">1</option>
                            <option value="0">0</option>
                        </select>
                        
                    </div>
                    <div className="form-group">
                        <label> Bạn có muốn bỏ số nào không</label>
                        <select 
                        name="booleannumber" 
                        id=""
                        onChange={this.onChange}
                        >
                            <option value="0">Không</option>
                            <option value="1">Có</option>
                        </select>
                        {
                            this.state.booleannumber ? 
                            (<div className="form-group">
                            <label htmlFor="">Nhập số bạn muốn bỏ</label>
                            <input 
                            type="radio"
                            value="1" 
                            name="numberbreak" 
                            onChange={this.onChange}/>
                            </div>)
                            : null
                        }
                        
                    </div>
               
                    <button className="btn btn-success" type="submit" onClick={this.saveData()}><a href="/output">Next</a></button>
                </form>
               
            </div>
        );
    }
}

export default Index;