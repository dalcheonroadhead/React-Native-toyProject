import { useState } from "react";

export default useCalculator = () => {
  const[input, setInput] = useState(0);
  const[currentOperator, setCurrentOperator] = useState(null)
  const[result, setResult] = useState(null);
  const[tempInput, setTempInput] = useState(null);
  const[tempOperator, setTempOperator] = useState(null); 
  const[isClickedOperator, setIsClickedOperator] = useState(false);
  const[isClickedEqual, setIsClickedEqual] = useState(false);
  
  // const hasInput = input? true : false;
  const hasInput = !!input;

  const onPressNum = (num) => {
    if(currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
    }
    else{
      const newInt = Number(`${input}${num}`)
      setInput(newInt)
    }
  };

  const onPressOperator = (operator) => {
    
    

    if(operator !== "=") {
      setCurrentOperator(operator)
      setIsClickedOperator(true)
      setIsClickedEqual(false)
    }
    else{
      let finalResult = result;
      const finalInput = isClickedEqual ? tempInput : input;
      const finalOperator = isClickedEqual ? tempOperator: currentOperator; 
      switch (finalOperator) {
        case "*":
          finalResult *= finalInput;
          break;
        case "/":
          finalResult /= finalInput;
          break;
        case "+":
          finalResult += finalInput;
          break;
        case "-":
          finalResult -= finalInput;
        default:
          break;
      }
      setInput(finalResult);
      setResult(finalResult); 
      setTempInput(finalInput);
      setCurrentOperator(null); // 직전에 = 눌렀으면, Operrator 아무것도 안 들어가게 이제 CurrentOperator 사용 안하고, tempOperator만 쓴다.
      setTempOperator(finalOperator); // = 누르기 전 마지막으로 누른 Operator는 이제 tempOperator로 들어간다.
      setIsClickedEqual(true);
    }
  };
  
  const onPressReset = () => {
    if(hasInput){
      setInput(0);
    }
    else{
      setInput(0);
      setResult(null);
      setCurrentOperator(null);
      setTempInput(null);
      setTempOperator(null);
    }
  };

  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset
  }

}