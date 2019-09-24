import React, { Component } from 'react';
import datanumber from './data';
class Output extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[
            ],
            
           
        }
    }
    
   
   componentWillMount(){
    const data = JSON.parse(localStorage.getItem('List'))
    
    this.setState({
        list:data
        
    })
    // setTimeout(function(){localStorage.removeItem("List") ; }, 0);
    
         
   }

    
   componentDidMount(){
    //    var lista = this.state.listtest;
    //    var listb = this.state.listbreak;
      
    // var c= this.state.list.linenumber *this.state.list.linelength;
    // for( let i =0; i<c;i++){
    //  var a = lista[Math.floor(Math.random() * lista.length)] ;
    //  if(a !==listb ){
    //     this.state.listnumer.push(a); 
    //  }
    // }
   }
   
    render() {
        console.log(this.state);
        const a = this.state.listtest;
        const b = this.state.listbreak;
    
        return (

            <div>
                <button >Roll</button>
                
            </div>
        );
    }
}

export default Output;