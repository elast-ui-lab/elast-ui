import React from "react";
import "./App.css";
import { Select } from "./components/select/select";
import styled from "styled-components";
import { Tabs } from "./components/tabs/tabs";

const selectList = [
  { name: "이은혁", value: "Eunhyeok Lee" },
  { name: "이수연", value: "Sooyeon Lee" },
  { name: "김윤미", value: "Yoonmi Kim" },
];

const tabList = [
  {
    name: "tab 1",
    imgSrc:
      "https://cdn.pixabay.com/photo/2013/05/09/09/06/waves-circles-109964_1280.jpg",
  },
  {
    name: "tab 2",
    imgSrc:
      "https://cdn.pixabay.com/photo/2020/04/08/08/08/spring-5016266_1280.jpg",
  },
  {
    name: "tab 3",
    imgSrc:
      "https://cdn.pixabay.com/photo/2019/07/06/12/51/palace-4320416_1280.jpg",
  },
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
        <h3 className="text-xl font-medium">Tabs</h3>
        <Tabs className="mt-4">
          <Tabs.TabsWrapper className="flex flex-row">
            {tabList.map((tab) => (
              <Tabs.Tab className="rounded data-[selected]:bg-black/10 cursor-pointer px-2 py-1 mb-2">
                {tab.name}
              </Tabs.Tab>
            ))}
          </Tabs.TabsWrapper>
          <Tabs.ContentWrapper>
            {tabList.map(({ imgSrc }) => (
              <Tabs.Content>
                <p>첫 번째 탭의 내용입니다.</p>
                <img src={imgSrc} alt="사진" width={1280} height={905} />
              </Tabs.Content>
            ))}
          </Tabs.ContentWrapper>
        </Tabs>
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
