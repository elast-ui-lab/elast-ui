
import React, {useState} from "react";
import "./App.css";
import styled from "styled-components";
import { Select } from "./components/select/select";
import { ComboBox } from "./components/combobox/combobox";
import { Switch } from "./components/switch/switch";
import { Modal } from "./components/modal/modal";
const selectList = [
  { name: "이은혁", value: "Eunhyeok Lee" },
  { name: "이수연", value: "Sooyeon Lee" },
  { name: "김윤미", value: "Yoonmi Kim" },
];

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [enabled, setEnabled] = useState(false)

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
        <h3 className="text-xl font-medium">ComboBox</h3>
        <ComboBox className="mb-3">
          <ComboBox.Input className="hover:bg-[white] focus:bg-[white] hover:text-[black] focus:text-[black] bg-[#f4f4f4] text-[black] rounded border py-3 px-4 h-[50px]">
            <Arrow />
          </ComboBox.Input>
          <ComboBox.OptionWrapper className="bg-[white] text-[black] rounded border z-50">
            {selectList.map((option: any, index: number) => (
              <ComboBox.Option
                className="hover:bg-[#ededed] py-3 px-4 data-[focused]:bg-[#ededed]"
                key={`${option.name}-${index}`}
                tabIndex={index}
                value={option.value}
              >
                {option.name}
              </ComboBox.Option>
            ))}
          </Select.OptionWrapper>
        </Select>
        <h3 className="text-xl font-medium">Modal</h3>
        <button
          onClick={() => {
            setModalOpen(!modalOpen);
            console.log(modalOpen);
          }}
        >
          {modalOpen ? "close" : "open"}
        </button>
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            console.log("closed");
          }}
          className="flex flex-col w-full h-full justify-center items-center backdrop-blur-md"
        >
          <Modal.Container className="bg-white rounded-lg shadow-lg py-6 px-8">
            <Modal.Title className="text-[1.5rem] mb-4">HI THERE</Modal.Title>
            <Modal.Content className="bg-gray-100 h-[200px] w-[500px] rounded-md relative">
              <div>Here is Content Section</div>
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                className="inline-block bottom-0"
              >
                close
              </button>
            </Modal.Content>
          </Modal.Container>
        </Modal>
          </ComboBox.OptionWrapper>
        </ComboBox>
        <h3 className="text-xl font-medium">Switch</h3>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
        >
          <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
        </Switch>
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
