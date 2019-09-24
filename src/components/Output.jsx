import React, { Component } from 'react';
import datanumber from './data';
class Output extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            listnumer: [],
            listtest: [1,2,3,4,5,6,7,8],
            listbreak: [1,4]
        }
    }
    
   
   componentWillMount(){
    const data = JSON.parse(localStorage.getItem('List'))
    this.setState({
        list: data,
        
    })
    setTimeout(function(){localStorage.removeItem("List") ; }, 0);
    
         
   }

    arr_diff =(a1, a2)=> {

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

    console.log(diff);
    
}
   componentDidMount(){
       var lista = this.state.listtest;
       var listb = this.state.listbreak;
      
    var c= this.state.list.linenumber *this.state.list.linelength;
    for( let i =0; i<c;i++){
     var a = lista[Math.floor(Math.random() * lista.length)] ;
     if(a !==listb ){
        this.state.listnumer.push(a); 
     }
    }
   }
   
    render() {
        console.log(this.state.listnumer);
        const a = this.state.listtest;
        const b = this.state.listbreak;
        {this.arr_diff(a,b)}
        return (

            <div>
                <button >Roll</button>
                
            </div>
        );
    }
}

export default Output;