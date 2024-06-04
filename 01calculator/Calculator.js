import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import useCalculator from "./use-calculator";

const COLOR = {
  RESULT : '#4e4c51',
  RESET : '#5f5e62',
  OPERATOR : '#f39c29',
  NUM : '#5c5674',
}


// button type : reset, operator, num
const Button = ({type, text, flex, onPress, isSelected}) => {

  const backgroundColor 
  = (type === "reset") 
    ? COLOR.RESET : (type === "operator") 
    ? COLOR.OPERATOR : (type === "num")
    ? COLOR.NUM : COLOR.RESULT;

    return(
    <TouchableOpacity 
      
      onPress={onPress}
      
      style={{
        backgroundColor,
        flex, 
        justifyContent: "center", 
        alignItems: "center",
        height: 50,
        borderWidth: isSelected? 1 : 0.2,
        borderColor: "black"
        }}>
      <Text> {text}</Text>
    </TouchableOpacity>)
  }

const ButtonContainer = styled.View`
  flexDirection: row;
  width: 100%;
`;

const InputContainer = styled.View`
  backgroundColor: ${COLOR.RESULT};
  justify-content: center;
  align-items: flex-end;
  min-height: 50px;
`;


export default () => {

  const {    
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset

  } = useCalculator();

  return(
    <View style={{flex: 1, width: 250, justifyContent: "center"}}>
      {__DEV__ &&(
        <View>
        <Text>input: {input}</Text>
        <Text>currentOperator: {currentOperator}</Text>
        <Text>result: {result}</Text>
        <Text>tempInput: {tempInput}</Text>
        <Text>tempOperator: {tempOperator}</Text>  
        </View>
      )}

      
      <InputContainer>
        <Text style={{color:"white", textAlign: "right", fontSize: 24 }}> {input}</Text>
      </InputContainer>

      {/* AC ~ / */}
    <ButtonContainer>

        <Button
          type={"reset"}
          text ={hasInput? "C" : "AC"}
          flex ={3}
          onPress={onPressReset}
        />

        <Button
          type={"operator"}
          text ={"/"}
          flex ={1}
          onPress={() => onPressOperator("/")}
          isSelected={currentOperator === "/"}
        />
    </ButtonContainer>
      {/* 7 ~ x */}
      <ButtonContainer>
      {[7,8,9].map((num) => { 
        return <Button
        key={`num-${num}`}
        type={"num"}
        text ={`${num}`}
        flex ={1}
        onPress={() => onPressNum(num)}
      />
      })}


        <Button
          type={"operator"}
          text ={"*"}
          flex ={1}
          onPress={() => onPressOperator("*")}
          isSelected={currentOperator === "*"}
        />
    </ButtonContainer>
      {/* 4 ~ -*/}
      <ButtonContainer>
      {[4,5,6].map((num) => { 
        return <Button
        key={`num-${num}`}
        type={"num"}
        text ={`${num}`}
        flex ={1}
        onPress={() => onPressNum(num)}
      />
      })}

        <Button
          type={"operator"}
          text ={"-"}
          flex ={1}
          onPress={() => onPressOperator("-")}
          isSelected={currentOperator === "-"}
        />
    </ButtonContainer>     

      {/* 1 ~ + */}

      <ButtonContainer>
      {[1,2,3].map((num) => { 
        return <Button
        key={`num-${num}`}
        type={"num"}
        text ={`${num}`}
        flex ={1}
        onPress={() => onPressNum(num)}
      />
      })}

        <Button
          type={"operator"}
          text ={"+"}
          flex ={1}
          onPress={() => onPressOperator("+")}
          isSelected={currentOperator === "+"}
        />
    </ButtonContainer> 
      
      {/*0 ~ = */}
  
      <View style={{flexDirection: "row", width: "100%"}}>
        <Button
          type={"num"}
          text ={"0"}
          flex ={3}
          onPress={() => onPressNum(0)}
        />

        <Button
          type={"operator"}
          text ={"="}
          flex ={1}
          onPress={() => onPressOperator("=")}
          isSelected={currentOperator === "="}
        />
    </View>

    </View>
  )
}