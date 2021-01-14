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
    console.log('equate clicked')
    let str = this.state.mathDisplay;
    let array = str.split("")
    let mathArray = []

    for (let i = 0; array.length; i++){

      console.log(`for loop started for ${array[i]}`)


      if(isNaN(parseInt(array[i]))){

        if(isNaN(parseInt(array[i++]))){
          this.setState({mathDisplay: 'Big Ole Error'})
        }else if (!isNaN(parseInt(array[i++]))){
          mathArray.push(array[i])
          array.splice(array[i], 0)
        }

      } else if (!isNaN(parseInt(array[i]))){

        let holder = array[i]
        for (let j = 1; array.length; j++){
          console.log(`second loop checking for subs num ${array[j]}`)
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
    console.log(mathArray)
  }

  render(){
    return (
      <div className="App">
        <div className="wrapper">
          <h1 className="mathDisplay">{this.state.mathDisplay}</h1>
          {this.state.keys.map((key) => {
            return <Button buttonLabel={key} click={this.buttonClick}/>
          })}
        </div>
      </div>
    )
  }
};

export default App;
