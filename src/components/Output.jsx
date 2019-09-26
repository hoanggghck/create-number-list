/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OutPutItem from './OutPutItem'
import '../css/output.css'

class Output extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            listoutput: [],
            
        }
    }


    componentWillMount() {
        //Khởi tạo bằng việc cho gán state list các state của component Index bằng cách lấy dữ liệu từ localStorage
        var data = JSON.parse(localStorage.getItem('List'))
        this.setState({
            list: data

        })
    }
    //Hàm tạo ra 1 dãy các sô bằng đúng số phần tử mà người dùng muốn xuất hiện trong 1 dãy, đã lọc các phần tử giống nhau trong 1 dãy
    arrCreateRow = () => {
        let arr = this.state.list.listbase
        let list = []
        let zero = "0"
        let c = this.state.list.linelength;
        for (let i = 0; i < c; i++) {
            var a = arr[Math.floor(Math.random() * arr.length)];
            list = list.concat(a);
            arr = arr.filter(item => item !== a)
        }
        for (let i = 0; i < list.length; i++) {
            if (list[i].length === 1) {
                list[i] = zero.concat(list[i]);
            }
        }
        return list
    }
    //Hàm tạo ra chuỗi bằng đúng số lượng(n*m) mà người dùng mong muốn
    arrCreateColumn = () => {
        let list = [];
        let c = this.state.list.linenumber;
        for (let i = 0; i < c; i++) {
            let item = this.arrCreateRow();
            list = list.concat(item)
        } return list
    }
    //Hàm cắt chuỗi (n*m) thành các dãy với số lượng n
    arrSplit = () => {
        var list = this.arrCreateColumn();

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
    //Hàm thêm list vào state để in ra nhưng ko quan trọng thứ tự
    noneOrdinal = () => {
        var result = this.arrSplit();
        this.setState({
            listoutput: result
        })
    }

    
    //Hàm này có tác dụng khi chúng ta truyền vào dãy gồm các phần tử thì nó sẽ lọc các phần tử giống nhau và chỉ để lại 1
    deduplicate = (arr) => {
        let isExist = (arr, x) => {
            for (let i = 0; i < arr.length; i++) {
                //Ở đây em xài combo sort toString replace là để đưa cái chuỗi về 1 số và so sánh
                //   Ví dụ chuỗi của em có a[1] = "02","01" và a[2]="01","02" thì hàm này sẽ đưa cả 2 về 1 số giống nhau và loại bỏ nó
                if (arr[i].sort().toString().replace(/,/g, "") === x.sort().toString().replace(/,/g, "")) return true;
            }
            return false;
        }
        let ans = [];
        arr.forEach(element => {
            if (!isExist(ans, element)) ans.push(element);
        });
        return ans;
    }
    // Hàm này có tác dụng là khi ta đã lọc chuỗi đồng nghĩa với việc chuỗi sẽ bị thiếu đi n phần tử và ở đây em cho nó so sánh với nhau nếu độ dài chuỗi của mình có số lượng bằng với số lượng người dùng nhập thì ta ngừng và trả về list còn ko sẽ chạy cho tới khi nào đạt yêu cầu
    AddItem = (listA) => {
        let a = this.state.list.linenumber;
        let c = a - listA.length;
        if (c === 0) {
            return listA;

        } else {
            for (let i = 0; i < c; i++) {
                let item = this.arrCreateRow(this.state.listtest);

                listA.push(item);
            }
            // trả về list sau khi push nhưng ta phải kiểm tra độ giống nhau nếu bị lặp thì ta lại xóa đi và chạy lại hàm
            let list = this.deduplicate(listA);


            return this.AddItem(list);
        }



    }

    //Hàm kiểm tra thứ tự 
    Ordinal = () => {
        //Tạo list chưa đc kiểm tra thứ tự
        let list = this.arrSplit(this.state.listtest);
        // kiểm tra thứ tự và xóa các phần tự lặp
        let listA = this.deduplicate(list)
        //chạy hàm thêm phần tử cho đến khi phần tử ko còn bị lặp thứ tự
        listA = this.AddItem(listA);
        console.log(listA);
        //Hàm suffer lại vị trí các phần tử vì hàm dulicate đã làm các phần tử xếp theo vị trí từ bé đến lớn
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
           
            while (0 !== currentIndex) {
           
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
           
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
           
            return array;
          } 
        for(let i =0;i<listA.length;i++){
            console.log(shuffle(listA[i]));
            
        }        
        //thêm vào state và in ra thôi @@ 
        this.setState({
            listoutput: listA
        })

    }
    //Nếu người dùng chọn có thứ tự thì chạy hàm Ordinal còn ko thì chạy hàm không thứ tự
    finalArr = () => {
        let isValid = this.state.list.linevalue;

        if (isValid === "1") {
            this.Ordinal();

        } else {
            this.noneOrdinal();
        }
    }

    render() {
        const list = this.state.listoutput;
        const listArr = list.map((item, index) =>
            <div className="listNumber" key={index} >
                <OutPutItem item={item}></OutPutItem>
            </div>
        )
        return (
            <div className="myOutput myHello">
                <button
                    className="buttonSpin"
                    onClick={this.Ordinal}
                >Tạo Số</button>
                <div className="">
                    <Link className="button_back" to="/input">Back</Link>
                </div>
                <div>
                    {listArr}
                </div>
                
            </div>
        );
    }
}

export default Output;