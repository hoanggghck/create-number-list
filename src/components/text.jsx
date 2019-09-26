import React, { Component } from 'react';

class text extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list: ["1","2","3"],
          listout: []
        };
      }

      deleteComma = (item) =>{
        
        let sum = 0;
        for ( let i =0; i<item.length ;i++){
          sum += parseFloat(item[i])
          
        }
        return sum
        
      }
      // Hàm Kiểm tra xem có thứ tự hay không
      check = () => {
        let listbase = this.state.list;
        let list = this.arrCheck(listbase); 
        let c =2;
        console.log(list);
        if(list.length < c){
          let d = c - list.length;
          
          for(let i =0; i<d;i++){
            let item = this.arrCut(listbase).toString();
            console.log(item);
            
            let a = list.filter(str => str === item)
            if(a.length === 0){
              list.push(item);
            }
          }          
          console.log(list);
          
        }
          console.log(list);
          
      }
      arrCheck = () => {
        let listbase = this.state.list
        let list = this.arrCutting(listbase);
        let abc = [];
        for(let i =0; i<list.length;i++){
          let a= list[i];                              
          abc.push(a);
          
        }
        console.log(abc);
        
      let adc = abc.filter((value, index, arr) => (arr.indexOf(value).toString()) === index);    
      console.log(adc);
      let acd = []
      for(let i = 0; i<adc.length;i++){
          let a = adc[i];
          console.log(a.split(""));
          
      }
      console.log(acd);
      
               
        
      }
      // Tạo ra 1 object với số lượng phần tử bằng số người dùng muốn xuất hiện trong 1 dãy nhưng ko bị lặp ( ví dụ số 01 chỉ xuất hiện 1 lần)
      arrCut = (listbase) => {
        
        let  list = [];
        let c =2;
        for( let i =0; i<c;i++){
          var a = listbase[Math.floor(Math.random() * listbase.length)] ;
          list.push(a); 
          listbase = listbase.filter(item => item !== a)
          }   
          return list
           
      }
      //Tạo ra list với số lượng bằng số lượng dãy mà người dùng muốn
      arrCutting = (listbase) => {   
        let d=2;
        let list = [];
        for(let i=0; i< d  ; i++){
            let a = this.arrCut(listbase);
            list.push(a);
        }
        
          return list          
      }
      
      findLength = (list) => {
        
        var a = "0";
        // list.forEach(function(item, i) { if (item === 1) list[i] = "1010"; });
        for(let i =0; i<list.length;i++){
            if(list[i].length === 1){
                list.splice(i,1,a.concat(list[i]))
            }
        }
       return list       
    }

    arrSplit = () => {
      var list = this.arrCutting();    
      var counter = -1;
      var c = 4;
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
        listout:result
      })}

      replaceNumber = () => {
        let list = this.state.listout;

      }
    render() {
        console.log(this.state.listout);
        
        return (
            <div>
            <button
            onClick={this.arrCheck}
            >
            Add
            </button> 
           </div>
        );
    }
}

export default text;