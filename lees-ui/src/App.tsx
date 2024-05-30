import React from "react";
import "./App.css";
import { Select } from "./components/select/select";
import styled from "styled-components";

const selectList = [
  { name: "이은혁", value: "Eunhyeok Lee" },
  { name: "이수연", value: "Sooyeon Lee" },
  { name: "김윤미", value: "Yoonmi Kim" },
];

function App() {
  return (
    <div className="App">
      <h1 className="text-4xl font-medium my-10">Lees UI Library</h1>
      <div className="w-[200px]">
        <h3 className="text-xl font-medium">Select</h3>
        <form action="">
          <Select
            // value="Eunhyeok Lee"
            className="mb-3"
            required
          >
            <Select.Trigger className="hover:bg-[white] focus:bg-[white] hover:text-[black] focus:text-[black] bg-[#f4f4f4] text-[black] rounded border py-3 px-4 h-[3rem]">
              <Arrow />
            </Select.Trigger>
            <Select.OptionWrapper className="bg-[white] text-[black] rounded border z-50">
              {selectList.map((option: any, index: number) => (
                <Select.Option
                  className="hover:bg-[#ededed] py-3 px-4"
                  key={`${option.name}-${index}`}
                  value={option.value}
                >
                  {option.name}
                </Select.Option>
              ))}
            </Select.OptionWrapper>
            <Select.Error>필수 입력값입니다.</Select.Error>
          </Select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;

const Arrow = styled.span`
  position: absolute;
  top: 22px;
  right: 13px;
  width: 0;
  height: 0;
  border-top: 7px solid #999999;
  border-bottom: none;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
`;
