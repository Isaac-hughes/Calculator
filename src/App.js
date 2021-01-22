import React, {Component} from 'react';
import './App.css';
import Button from './components/button';

class App extends Component {
  state = {
    mathDisplay: '',
    keys: ["7","8","9","C","4","5","6","x","1","2","3","÷","+","0","-","="]
  };
  buttonClick = (button) => {
    if (isNaN(parseInt(button))){
      if(button === "C"){
        this.clearButtonClick()
      } else if (button === "x" || button === "÷" || button === "+" || button === "-"){
        this.setState({mathDisplay: this.state.mathDisplay + button})
      } else if (button === "="){
        this.equateClick()
      }
    } else {
      this.setState({mathDisplay: this.state.mathDisplay + button})
    }
  };
  clearButtonClick = () => {
    this.setState({mathDisplay: ''})
  };
  equateClick = () => {
    let str = this.state.mathDisplay;
    let array = str.split("")
    let mathArray = []
    for (let i = 0; array.length;){
      if(array[i] === "x" || array[i] === "÷" || array[i] === "+" || array[i] === "-"){
        let y = array[i]
        mathArray.push(y)
        array = array.slice(y.length, array.length)
      } else if (!isNaN(parseInt(array[i]))){
        let holder = array[i]
        for (let j = 1; array.length; j++){
          if(!isNaN(parseInt(array[j]))){
            holder = holder + array[j]
          } else if (isNaN(parseInt(array[j]))){
            mathArray.push(holder)
            array = array.slice(holder.length, array.length)
            holder = ''
            break
          } else {
            console.log(`${array[j]} broke me`)
          }
        }
      }
    }
    // dealing with the math array
    let total = 0
    let num1 = 0
    let num2 = 0
    let operator = ''
    let temp = 0
    for (let i = 0; mathArray.length > 1;){
      num1 = parseInt(mathArray[i])
      operator = mathArray[i + 1]
      num2 = parseInt(mathArray[i + 2])
      if (operator === "+"){
        temp = num1 + num2
      } else if (operator === "-"){
        temp = num1 - num2
      } else if (operator === "x"){
        temp = num1 * num2
      } else if (operator === "÷"){
        temp = num1 / num2
      } else if (num1 == null || num2 == null || operator == null || isNaN(num1) || isNaN(num2)){
        console.log("Killed")
        this.setState({mathDisplay: "Error"})
        break
      }
      total = temp
      mathArray.splice(0, 3)
      mathArray.unshift(total)
      this.setState({mathDisplay: total})
    }
  }
  render(){
    return (
      <div className="App">
        <div className="wrapper">
          <h1 className="mathDisplay">{this.state.mathDisplay}</h1>
          {this.state.keys.map((key, index) => {
            return <Button key={index} buttonLabel={key} click={this.buttonClick}/>
          })}
        </div>
      </div>
    )
  }
};

export default App;
