import React, { Component } from 'react';

class text extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list: [],
          value1:"",
          value2: ""
        };
      }
      onChangeValue = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
      onAddItem = () => {
        const updatedArray = [];
        const value1 =[...this.state.value1];
        const value2 =[...this.state.value2];
        const value = value1.concat(value2)
        updatedArray.push(value);
        this.setState({
            list: updatedArray
        })
       
      };
      onDeleteItem = () => {
          this.setState({
              list: [],
              value1:"",
              value2:"",
              
          })
      }
    render() {
        console.log(this.state);
        
        return (
            <div>
            {/* <ul>
              {this.state.list.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul> */}
            <input
              type="checkbox"
              name="value1"
              value="1"
              
              onChange={this.onChangeValue}
            />
              <input
              type="checkbox"
              name="value2"
              value="2"
              onChange={this.onChangeValue}
            />
            
            <button
              type="button"
              onClick={this.onAddItem}
              
            >
              Add
            </button>
            <button
              type="button"
              onClick={this.onDeleteItem}
              
            >
              Delete
            </button>
          </div>
        );
    }
}

export default text;