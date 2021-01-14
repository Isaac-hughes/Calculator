import React from 'react' ;
import "./button.css"
import "../App.js"

const isOperator = val => {
    return !isNaN(val) || val === "." || val === "=";
  };

const Button = (props) => {
    return(
        <div>
            <button className={`button ${ isOperator(props.buttonLabel) ? null : "operator" }`}
             onClick={() => props.click(props.buttonLabel)}>{props.buttonLabel}</button>
        </div>
    )
}


// Export Button
export default Button