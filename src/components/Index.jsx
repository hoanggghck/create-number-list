import React, { Component } from 'react';
import Output from './Output';
import {connect} from 'react-redux';
import data from './data'
import { stringify } from 'querystring';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listbase: [],
            linenumber : "",
            linelength: "",
            linevalue: "1",
            numberbreak: "",
            booleannumber:1,
        }
        this.addNumberBreak = this.addNumberBreak.bind(this);
    }
    addNumberBreak = (a) => {
       this.setState({
           numberbreak: (a.value) 
       })
    }
    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.handleTexttoArray();
        
    }
    deleteHigherNum = (arrs) => {
        return arrs.filter(arr => parseFloat(arr) < 71);
      
          
    }

    deleteSameNum = (arrs) => {
        return  arrs.filter((value, index, arr) => arr.indexOf(value) === index);
    }
    
    handleTexttoArray =() =>{
        const listBase = data;
        const listchange = this.state.numberbreak.trim().split(" ");
        
        const log = this.deleteHigherNum(listchange);
        const  listnumber = this.deleteSameNum(log);        
        // return this.cutArray();
        const finalList = this.cutArray(listBase,listnumber);
        console.log(finalList);
        
        this.setState({
            listbase: finalList
        })
      
        localStorage.setItem("List", JSON.stringify(this.state))
      
    }
    cutArray =(a1, a2)=> {

        var a = [], diff = [];
    
        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
    
        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
    
        for (var k in a) {
            diff.push(k);
        }
        
                return diff
        
    }
   
    render() {
        
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
                            <option value="1">Có</option>
                            <option value="0">Không</option>
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
                            type="textarea"
                            name="numberbreak" 
                            onChange={this.onChange}
                            />
                            
                            </div>
                            )
                            : null
                        }
                        
                    </div>
               
                    <button
                    className="btn btn-success" 
                    type="submit" >
                    <a 
                    href="/output"
                    >
                    Next
                    </a>
                    </button>
                </form>
               
            </div>
        );
    }
}

export default Index;