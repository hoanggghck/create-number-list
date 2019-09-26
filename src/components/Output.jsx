import React, { Component } from 'react';
import datanumber from './data';
import {Link} from 'react-router-dom';
import OutPutItem from './OutPutItem'
import '../css/output.css'
class Output extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            listoutput: []    
        }
    }
    
   
   componentWillMount(){
    //Khởi tạo bằng việc cho gán state list các state của component Index bằng cách lấy dữ liệu từ localStorage
    var data = JSON.parse(localStorage.getItem('List'))
    this.setState({
        list:data
        
    })}
    //Hàm thêm số 0 vào trc các phần tử chỉ có 1 chữ số ví dụ 1 sẽ đc thay thế bằng 01
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
    //Hàm tạo ra 1 dãy các sô bằng đúng số phần tử mà người dùng muốn xuất hiện trong 1 dãy, đã lọc các phần tử giống nhau trong 1 dãy
    arrCreateRow = (arr) =>{
        var listbase = this.state.list.listbase;
        var list = []
        var c= this.state.list.linelength;
        for( let i =0; i<c;i++){
        var a = arr[Math.floor(Math.random() * arr.length)] ;
        list = list.concat(a); 
        arr = arr.filter(item => item !== a)
        }   
        return list
    }
    //Hàm tạo ra chuỗi bằng đúng số lượng(n*m) mà người dùng mong muốn
   arrCreateColumn = (arr) =>{
    let list = [];
    let c = this.state.list.linenumber;
    for (let i =0 ; i<c;i++){
        let item = this.arrCreateRow(arr);
        list = list.concat(this.findLength(item)) 
    }return list
   }
   //Hàm cắt chuỗi (n*m) thành các dãy với số lượng n
   arrSplit = (arr) => {
    var list = this.arrCreateColumn(arr);    
    
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
   //Thêm List vào và in ra các dãy số
   updateState = () => {
       let arr = this.state.list.listbase
       var result= this.arrSplit(arr);
       this.setState({
           listoutput:result
       })
       
    
   }
    render() {
        const list = this.state.listoutput; 
        const listArr =  list.map((item,index) => 
            <div className="listNumber" key={index} >
                <OutPutItem item={item}></OutPutItem>
            </div>
        )
        return (
            <div className="myOutput">
                <button
                className="buttonSpin"
                onClick={this.updateState}
                >Tạo Số</button>
                <div className="">
                <Link className="button_back" to="/">Back</Link>
                </div>
                   <div>
                   {listArr}
                   </div>
            </div>
        );
    }
}

export default Output;