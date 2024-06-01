import React from "react";
import "./App.css";
import { Select } from "./components/select/select";
import styled from "styled-components";
import { Dropdown } from "./components/dropdown/dropdown";
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
        <Select className="mb-3">
          <Select.Trigger className="hover:bg-[white] focus:bg-[white] hover:text-[black] focus:text-[black] bg-[#f4f4f4] text-[black] rounded border py-3 px-4">
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
        </Select>
      </div>
      <div className="w-[200px]">
        <h3 className="text-xl font-medium">Dropdown</h3>
        <Dropdown>
          <Dropdown.Trigger className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
            버튼
          </Dropdown.Trigger>
          <Dropdown.ItemWrapper className="w-[52px] text-black">
            <Dropdown.Item value={"option1"} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              옵션1
            </Dropdown.Item>
            <Dropdown.Item value={"option2"} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              옵션2
            </Dropdown.Item>
            <Dropdown.Item value={"option3"} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              옵션3
            </Dropdown.Item>
          </Dropdown.ItemWrapper>
        </Dropdown>
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
