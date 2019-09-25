import React, { Component } from 'react';
import datanumber from './data';
import {Link} from 'react-router-dom';
import OutPutItem from './OutPutItem'
class Output extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            listoutput: []
           
        }
    }
    
   
   componentWillMount(){
    const data = JSON.parse(localStorage.getItem('List'))
    
    this.setState({
        list:data
        
    })
  
    // setTimeout(function(){localStorage.removeItem("List") ; }, 0);
    
         
   }
   arrCutting = () =>{
        var listbase = this.state.list.listbase;
        var list = []
        var c= this.state.list.linenumber *this.state.list.linelength;
        for( let i =0; i<c;i++){
        var a = listbase[Math.floor(Math.random() * listbase.length)] ;
        
        list.push(a); 
        }   
        return list
        
   }
   arrSplit = () => {
    var list = this.arrCutting();    
    var counter = -1;
    var c = this.state.list.linelength;
    var result = list.reduce((final, curr, i) => {
    if (i % c === 0) {
        final.push([curr])
        counter++;
    } else {
        final[counter].push(curr);
    }

    return final;
    }, []);
    return result
    
   }
   updateState = () => {
       var result= this.arrSplit();
       this.setState({
           listoutput:result
       })
   }
    render() {

        
        const list = this.state.listoutput;
        return (

            <div>
                <button
                onClick={this.updateState}
                >Roll</button>
                <Link to="">Back</Link>
                <div>
                    {list.map(item => (
                        <OutPutItem item={item} ></OutPutItem>
                    ))}
                </div>
            </div>
        );
    }
}

export default Output;