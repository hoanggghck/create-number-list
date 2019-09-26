import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import data from './data'
import '../css/style.css';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listbase: [],
            linenumber: "",
            linelength: "",
            linevalue: "1",
            numberbreak: "",
            booleannumber: "0",
            linenumberErr: "",
            linelengthErr: "",
            listModal:[],
            isOut: false,


        }

    }
    componentWillMount() {
        //Khởi tạo với state.listbase bằng với data có sẵn ( gồm các phần tử từ 1 tới 70)
        this.setState({
            listbase: data
        })
    }

    onChange = (e) => {
        //Truyền value của các thẻ input vào state ( với tên của thẻ input chính là tên của state)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    onSubmit = (e) => {
        //Ko cho trang tự load khi nhấn submit
        e.preventDefault();
        localStorage.setItem("List", JSON.stringify(this.state))
    }

    //Hàm xóa xóa các phần tử trong mảng không phải là số , lớn hơn 71 và nhỏ hơn 0
    deleteHigherNum = (arrs) => {
        // lọc các phần tử có giá trị lớn hơn 71
        let list = arrs.filter(arr => parseFloat(arr) < 71);
        //lọc các phần tử có giá trị nhỏ hơn 0
        return list.filter(arr => parseFloat(arr) > 0)
    }
    
    // Hàm lọc các phần tử giống nhau trong mảng
    deleteSameNum = (arrs) => {
        // Trả về mảng với các phần tử không bị lặp ( ví dụ mảng có 2 số 1 thì tự động trả về chỉ còn 1 phần tử mang giá trị là 1)
        return arrs.filter((value, index, arr) => arr.indexOf(value) === index);
    }
    // Hàm loại bỏ những phần tử trong a1 có tồn tại trong a2
    cutArray = (a1, a2) => {
        
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
    // Hàm chỉnh sửa chuỗi từ 1 chuỗi nhập vào cắt ra thành các phần chỉ là số
    handleTexttoArray = () => {
        // Tạo list đầu tiên với giá trị bằng list mà ta gán khi khởi tạo ở fuction componentWillMount
        let listBase = this.state.listbase;
        // Tạo list với giá trị đc cắt ra khi nhập vào các phần tử cần loại bỏ, hàm nhận về 1 chuỗi và trả về 1 mảng
        let listCut = this.state.numberbreak.trim().split(" ");
        //Chạy hàm deleteHigherNum để trả về mảng có các phần tử lơn hơn 0 và nhỏ hơn 71,
        let listChange = this.deleteHigherNum(listCut);
        //Chạy hàm deleteSameNum để lọc các phần tử bị lặp
        let listNumber = this.deleteSameNum(listChange);
        // Trả về list các phần tử sau khi đã loại bỏ ( list gồm các số từ 1 tới 70 nhưng ko bao gồm các số mà user đã xóa)
        let listFinal = this.cutArray(listBase, listNumber);
        // 
        let zero="0"
        // chạy vòng lặp để ghép các số có 1 chữ số , ví dụ số 1 sẽ thành 01
        for(let i =0; i<listNumber.length;i++){
            if(listNumber[i].length === 1)
            listNumber.splice(i,1,zero.concat(listNumber[i]))
        }
        
        //gán giá trị vào state
        this.setState({
            listbase: listFinal,
            listModal:listNumber
        })}
    
        
    //Validate đơn giản
    // Kiểm tra xem chuỗi nhập có lớn hơn 0 hay nhỏ hơn 50 hay không , ở đây các anh ko yêu cầu giới hạn sô dãy nhưng em để vậy cho dễ kiểm soát
    validateNumber = () => {
        let number = parseFloat(this.state.linenumber);
        if (number > 0 && number < 50) {
            this.setState({
                linenumberErr: ""
            });
            return true
        }
        else {
            this.setState({
                linenumberErr: "vui lòng nhập số từ 1 tới 49"
            });
            return false
        }
    }
    //Kiểm tra xem các số có lơn hơn 4 và nhỏ hơn 19 hay ko
    validateNumberLength = () => {
        let number = parseFloat(this.state.linelength);
        
        if (number > 4 && number < 19) {
            this.setState({
                linelengthErr: ""
            });
            return true
        }
        else {
            this.setState({
                linelengthErr: "vui lòng nhập số từ 5 tới 18"
            });
            return false
        }
    }
    // Mở Modal lên và chạy hàm handleTexttoArray
   OpenModal = () => {
        this.handleTexttoArray();
        //cho 2 giá trị ứng với validate
        let isValid = this.validateNumber();
        let isValidlength = this.validateNumberLength();
        //Nếu cả 2 bằng true thì mới mở dc modal
        if (isValid && isValidlength) {
            this.setState({
                isOut: true
            })}
    }
    //Đóng Modal
    CloseModal = () =>{
        this.setState({
            isOut: false,        
    })}


    render() {
        return (
            <div className="myBox animated  rubberBand delay-0.5s"  data-aos="fade-in">
                <h1>Tạo Số RanDom</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group form_form">

                        <input
                            type="number"
                            name="linenumber"
                            placeholder="Nhập số dãy bạn muốn hiển thị"
                            onChange={this.onChange}
                            onBlur={this.validateNumber}
                            />
                        <div className="">
                            <span style={{ color: "red" }}>{this.state.linenumberErr}</span>
                        </div>
                    </div>
                    <div className="form-group form_form">

                        <input
                            type="number"
                            name="linelength"
                            placeholder="Nhập số lượng trong 1 dãy"
                            onChange={this.onChange}
                            onBlur={this.validateNumberLength} />
                        <div className="">
                            <span style={{ color: "red" }}>{this.state.linelengthErr}</span>
                        </div>
                    </div>
                    <div className="form-group form_form">
                        <label htmlFor="">Bạn có muốn dãy thứ tự hay không?</label><br/>
                        <div className="select">
                        <select
                            name="linevalue"
                            
                            onChange={this.onChange}
                        >
                            <option value="1">Có</option>
                            <option value="0">Không</option>
                        </select>
                        </div>
                        

                    </div>
                    <div className="form-group form_form">
                        <label> Bạn có muốn bỏ số nào không?</label><br/>
                        <select
                            className="select"
                            name="booleannumber"
                            id=""
                            onChange={this.onChange}
                        >
                            <option value="0">Không</option>
                            <option value="1">Có</option>
                        </select>
                        {
                            this.state.booleannumber === "1" ?
                                (<div className="form-group form_break">
                                    <input
                                        type="textarea"
                                        name="numberbreak"
                                        placeholder="Nhập số bạn muốn bỏ"
                                        onChange={this.onChange}
                                        onBlur={this.validateNumberBreak}
                                    />
                                    <p>*Lưu ý : Máy chỉ nhận số có giá trị từ 1->70 và tự lọc bỏ chữ cũng như các kí tự</p>
                                    <p>Các bạn nhập bằng số và khoảng cách</p>  
                                    <p>Cú pháp: số cần xóa [khoảng cách] số cần xóa ....</p>

                                </div>
                                )
                                : null
                        }

                    </div>

                    <button
                        className=" btn_btn"
                        type="submit"
                        onClick={this.OpenModal}
                    >
                        Tiếp Tục
                    </button>
                    {this.state.isOut ? (
                        <div className="showModal animated jackInTheBox delay-0.5">
                            <div className="modal_content" >
                                {this.state.booleannumber === "1"?
                                (<p>Số bạn muốn xóa</p>):
                                (<p>Không có xóa nào mà bạn muốn xóa cả</p>)
                                }
                                
                                {this.state.listModal.map(item => {
                                return <span>{item} </span>
                                })}
                            <div className="modal_button">
                            <Link className="link" to="/output">Tiếp Tục</Link>
                            </div>
                            <div className="modal_close">
                                <button 
                                onClick={this.CloseModal}>X</button>
                            </div>
                            </div>
                        </div>


                    ) : null
                    }

                </form>

            </div>
        );
    }
}

export default Index;