# :six_pointed_star: elast-ui

<br/>
:thought_balloon: "커스텀이 쉬운 UI 어디 없을까?"<br/>
:thought_balloon: "유지보수가 간편한 UI가 있었으면 좋겠어."<br/>
:thought_balloon: "UI 라이브러리도 공부를 해야 하다니..."<br/><br/>
elast-ui는 이런 고민에서 시작했습니다. <br/>
직관적이지 않은 UI 컴포넌트와 복잡한 유지보수 작업은 개발자에게 큰 부담이었습니다.
<br/><br/>
많은 UI 라이브러리가 기본적인 기능을 제공하지만, 필요에 따라 자유롭게 스타일을 변경하거나 컴포넌트를 확장하는 데 제약이 따르는 경우가 많습니다.
반면, 지나치게 유연한 라이브러리는 일관성을 잃고 복잡도가 높아져, 유지보수에 어려움을 겪게 됩니다.
<br/><br/>
우리는 어떻게 하면 더 쉽게 커스터마이징할 수 있을까
개발자들이 더 빠르게 작업할 수 있을까를 고민했고<br/>
그 해답으로 탄생한 것이 elast-ui입니다.

<br/><br/>

# :curly_loop: Why elast-ui?

### 직관적인 커스터마이징

elast-ui는 컴포넌트의 커스터마이징이 쉽고 직관적입니다. 개발자가 CSS나 스타일링을 복잡하게 다루지 않고도 자신만의 스타일을 쉽게 적용할 수 있는 구조를 갖추고 있습니다.

### 유연한 스타일링 (TailwindCSS 기반)

TailwindCSS를 기반으로 만들어져 있어, 클래스 기반의 유연한 스타일링을 제공합니다. 이를 통해 사용자는 빠르게 스타일을 변경하거나 확장할 수 있습니다.

### TypeScript 지원

TypeScript로 개발되어 타입 안전성이 보장되며, 개발자가 컴파일 시 오류를 미리 감지할 수 있어 안정적인 개발 환경을 제공합니다.

### 유지보수가 쉬운 구조

elast-ui는 코드를 간결하고 읽기 쉽게 설계하여, 유지보수와 확장이 용이합니다. 프로젝트 규모가 커지더라도 쉽게 관리할 수 있는 구조를 제공합니다.

</br></br>

# :heavy_check_mark: Installation

elast-ui의 더 직관적이고 유연한 UI를 통해 생산성과 가독성을 높여보세요.

### yarn

```bash
yarn add elast-ui
```

### npm

```bash
npm install elast-ui
```

---

</br></br>

# :ballot_box_with_check: Components

### INDEX

- [select](#select)
- [combobox](#combobox)
- [dropdown](#dropdown)
- [tabs](#tabs)
- [modal](#modal)
- [switch](#switch)
  </br></br></br>

# Select

`Select` 컴포넌트는 다음과 같은 서브 컴포넌트들로 구성됩니다.

### 서브 컴포넌트

- `Select`: 전체 셀렉트 박스를 관리하는 루트 컴포넌트
- `Select.Trigger`: 드롭다운을 열고 닫는 버튼 역할
- `Select.OptionWrapper`: 드롭다운의 옵션들을 감싸는 래퍼
- `Select.Option`: 개별 옵션 아이템
- `Select.Error`: 유효성 검사에 따른 에러 메시지를 표시하는 컴포넌트

### 기본 예제

```tsx
import React, { useState } from "react";
import { Select } from "elast-ui";

const Example = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <form>
      <Select value={selectedValue} onChange={handleChange} required>
        <Select.Trigger>옵션을 선택하세요</Select.Trigger>
        <Select.OptionWrapper>
          <Select.Option value="option1">옵션 1</Select.Option>
          <Select.Option value="option2">옵션 2</Select.Option>
          <Select.Option value="option3">옵션 3</Select.Option>
        </Select.OptionWrapper>
        <Select.Error>필수 항목입니다.</Select.Error>
      </Select>
      <button type="submit">제출</button>
    </form>
  );
};

export default Example;
```

### 주요 속성

- `value`: 기본으로 선택된 값을 지정합니다.
- `onChange`: 선택된 값이 변경될 때 호출되는 콜백 함수입니다. 옵션을 선택하거나 변경하면 `onChange` 함수가 호출되며, 콜백 함수의 인수로 선택된 값이 전달됩니다.
- `required`: 선택 필드를 필수로 설정할 때 사용합니다. `required` 속성이 설정된 경우, 옵션을 선택하지 않으면 `Select.Error`에 에러 메시지가 표시됩니다

### Keyboard Navigation

- **Enter**: 현재 포커스된 옵션을 선택합니다.
- **ArrowUp / ArrowDown**: 드롭다운에서 위/아래로 이동합니다.
- **Escape**: 드롭다운을 닫습니다.

## Error

`required` 속성이 있는 경우, 유효성 검사를 통과하지 못할 때 에러 메시지를 표시합니다.

```jsx
<Select.Error>선택은 필수 항목입니다.</Select.Error>
```

## required

form사용 시 form태그를 참조하지 않아도 required 옵션만 지정하면 필수 입력값을 설정 가능합니다.

- `required`설정 시, 옵션을 선택하지 않을 경우 `<Select.Erorr>`가 표시되며, `<Select.Erorr>` 컴포넌트를 이용해 에러 메시지를 설정할 수 있습니다.

```jsx
<Select required>
  <Select.Trigger>...</Select.Trigger>
  <Select.OptionWrapper>
    <Select.Option value="1">옵션 1</Select.Option>
    <Select.Option value="2">옵션 2</Select.Option>
    <Select.Option value="3">옵션 3</Select.Option>
  </Select.OptionWrapper>
  <Select.Error>필수 입력값입니다.</Select.Error>
</Select>
```

## Dataset을 이용한 상태별 스타일링

`Select` 컴포넌트는 가상 클래스(`pseudo-class`)를 쉽게 스타일링할 수 있도록 `data-*` 속성을 제공합니다. 이를 통해 특정 상태(예: 선택됨, 포커스됨 등)를 식별하고, 그에 맞는 스타일을 적용할 수 있습니다.

- `data-selected`: 현재 선택된 옵션
- `data-focused`: 포커스된 옵션(키보드를 이용한 선택 시 현재 포커스된 옵션 값)

```jsx
<Select>
  <Select.Trigger>
    <Arrow />
  </Select.Trigger>
  <Select.OptionWrapper>
    {selectList.map((option: any, index: number) => (
      <Select.Option
        className="data-[focused]:bg-[#ededed] data-[selected]:bg-blue-100"
        key={`${option.name}-${index}`}
        value={option.value}
      >
        {option.name}
      </Select.Option>
    ))}
  </Select.OptionWrapper>
</Select>
```

---

</br></br>

# Combobox

`ComboBox` 컴포넌트는 키보드와 마우스를 사용하여 옵션을 선택할 수 있는 UI 요소입니다. `ComboBox`는 여러 서브 컴포넌트로 구성되며, 각각의 역할을 통해 사용자 입력, 드롭다운 옵션 선택 및 유효성 검사를 지원합니다.

### 서브 컴포넌트

- `ComboBox`: 전체 컴포넌트를 감싸는 루트 컴포넌트
- `ComboBox.Input`: 검색 또는 옵션을 입력하는 필드
- `ComboBox.OptionWrapper`: 드롭다운에서 옵션들을 감싸는 컨테이너
- `ComboBox.Option`: 개별 옵션 항목
- `ComboBox.Error`: 유효성 검사 실패 시 에러 메시지를 표시하는 컴포넌트

### 기본 예제

```tsx
import React, { useState } from "react";
import ComboBox from "elast-ui";

const Example = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <form>
      <ComboBox value={selectedValue} onChange={handleChange} required>
        <ComboBox.Input placeholder="옵션을 입력하거나 선택하세요" />
        <ComboBox.OptionWrapper>
          <ComboBox.Option value="option1">옵션 1</ComboBox.Option>
          <ComboBox.Option value="option2">옵션 2</ComboBox.Option>
          <ComboBox.Option value="option3">옵션 3</ComboBox.Option>
        </ComboBox.OptionWrapper>
        <ComboBox.Error>필수 항목입니다.</ComboBox.Error>
      </ComboBox>
      <button type="submit">제출</button>
    </form>
  );
};

export default Example;
```

### 주요 속성

- `value`: 선택된 값을 저장합니다.
- `onChange`: 옵션이 변경될 때 호출되는 콜백 함수입니다. 선택된 값이 `onChange`의 인수로 전달됩니다.
- `required`: 필수 입력 필드로 설정하면, 값이 없을 때 `ComboBox.Error`에 에러 메시지가 표시됩니다.

### Keyboard Navigation

- **Enter**: 현재 포커스된 옵션을 선택합니다.
- **ArrowUp / ArrowDown**: 드롭다운에서 위/아래로 이동합니다.
- **Escape**: 드롭다운을 닫습니다.

### Error

`required` 속성이 지정된 경우, 유효성 검사에 실패하면 에러 메시지를 표시합니다.

```tsx
<ComboBox.Error>옵션을 선택하세요.</ComboBox.Error>
```

### Dataset을 이용한 상태별 스타일링

`ComboBox.Option`은 가상 클래스(`pseudo-class`) 상태를 스타일링하기 위해 `data-*` 속성을 지원합니다.

- `data-focused`: 키보드로 탐색 중 포커스된 옵션
- `data-selected`: 현재 선택된 옵션

```tsx
<ComboBox.OptionWrapper>
  <ComboBox.Option
    className="data-[focused]:bg-[#ededed] data-[selected]:bg-blue-100"
    value="option1"
  >
    옵션 1
  </ComboBox.Option>
</ComboBox.OptionWrapper>
```

---

</br></br>

# Dropdown

`Dropdown` 컴포넌트는 여러 옵션 중 하나를 선택할 수 있는 UI 요소입니다. `Dropdown`은 여러 서브 컴포넌트로 구성되어 있으며, 각각의 역할을 통해 드롭다운 메뉴 표시, 항목 선택 및 키보드 내비게이션을 지원합니다.

### 서브 컴포넌트

- `Dropdown`: 전체 컴포넌트를 감싸는 루트 컴포넌트
- `Dropdown.Trigger`: 드롭다운을 열거나 닫는 버튼 역할을 하는 컴포넌트
- `Dropdown.ItemWrapper`: 드롭다운에서 옵션들을 감싸는 컨테이너
- `Dropdown.Item`: 개별 옵션 항목

### 기본 예제

```tsx
import React, { useState } from "react";
import Dropdown from "elast-ui";

const Example = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Dropdown onChange={handleChange}>
      <Dropdown.Trigger>옵션 선택</Dropdown.Trigger>
      <Dropdown.ItemWrapper>
        <Dropdown.Item value="option1">옵션 1</Dropdown.Item>
        <Dropdown.Item value="option2">옵션 2</Dropdown.Item>
        <Dropdown.Item value="option3">옵션 3</Dropdown.Item>
      </Dropdown.ItemWrapper>
    </Dropdown>
  );
};

export default Example;
```

### 주요 속성

- `onChange`: 선택한 값이 변경될 때 호출되는 콜백 함수입니다. 선택된 값이 `onChange`의 인수로 전달됩니다.
- `className`: 스타일을 커스터마이징할 수 있는 클래스 네임을 전달할 수 있습니다.

### Keyboard Navigation

- **Enter**: 현재 포커스된 옵션을 선택합니다.
- **ArrowUp / ArrowDown**: 드롭다운에서 위/아래로 이동합니다.
- **Escape**: 드롭다운을 닫습니다.

### Focus와 Selection 상태 스타일링

`Dropdown.Item`은 상태를 구분하기 위해 `data-*` 속성을 지원합니다.

- `data-focused`: 키보드로 탐색 중 포커스된 항목
- `data-selected`: 현재 선택된 항목

```tsx
<Dropdown.ItemWrapper>
  <Dropdown.Item
    className="data-[focused]:bg-[#ededed] data-[selected]:bg-blue-100"
    value="option1"
  >
    옵션 1
  </Dropdown.Item>
</Dropdown.ItemWrapper>
```

### 이벤트 핸들링

`Dropdown.Trigger`와 `Dropdown.Item`은 `onClick` 이벤트를 통해 각각 드롭다운을 열거나 닫고, 항목을 선택할 수 있습니다.

---

</br></br>

# Tabs

`Tabs` 컴포넌트는 여러 개의 탭과 그에 대응하는 콘텐츠를 표시하는 UI 요소입니다. 각 탭을 클릭하면 해당하는 콘텐츠로 전환되며, `Tabs`, `TabsWrapper`, `Tab`, `ContentWrapper`, `Content`로 구성되어 있습니다.

### 서브 컴포넌트

- `Tabs`: 전체 탭 시스템을 감싸는 루트 컴포넌트
- `TabsWrapper`: 탭 항목을 감싸는 컨테이너
- `Tab`: 개별 탭 항목
- `ContentWrapper`: 탭 선택에 따라 콘텐츠를 표시하는 컨테이너
- `Content`: 각 탭에 연결된 개별 콘텐츠

### 기본 예제

```tsx
import React, { useState } from "react";
import Tabs from "elast-ui";

const Example = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Tabs defaultIndex={activeTab} onChange={handleTabChange}>
      <Tabs.TabsWrapper>
        <Tabs.Tab>탭 1</Tabs.Tab>
        <Tabs.Tab>탭 2</Tabs.Tab>
        <Tabs.Tab>탭 3</Tabs.Tab>
      </Tabs.TabsWrapper>
      <Tabs.ContentWrapper>
        <Tabs.Content>탭 1의 내용</Tabs.Content>
        <Tabs.Content>탭 2의 내용</Tabs.Content>
        <Tabs.Content>탭 3의 내용</Tabs.Content>
      </Tabs.ContentWrapper>
    </Tabs>
  );
};

export default Example;
```

### 주요 속성

- `defaultIndex`: 처음에 활성화될 탭의 인덱스를 설정합니다. 기본값은 `0`입니다.
- `onChange`: 탭이 변경될 때 호출되는 콜백 함수입니다. 선택된 탭의 인덱스가 인수로 전달됩니다.

### 데이터 속성 및 상태 스타일링

`Tabs.Tab`은 탭의 활성 상태를 스타일링하기 위해 `data-*` 속성을 지원합니다.

- `data-tabindex`: 탭의 인덱스를 나타냅니다.
- `data-selected`: 현재 선택된 탭에 부여되는 속성입니다.

```tsx
<Tabs.TabsWrapper>
  <Tabs.Tab className="data-[selected]:font-bold" data-tabindex={0}>
    탭 1
  </Tabs.Tab>
  <Tabs.Tab className="data-[selected]:font-bold" data-tabindex={1}>
    탭 2
  </Tabs.Tab>
</Tabs.TabsWrapper>
```

### 이벤트 핸들링

`TabsWrapper` 내부의 각 `Tab`은 클릭 시 해당 탭을 활성화하며, `onClick` 이벤트를 통해 `TabsContext`에 설정된 인덱스를 업데이트합니다. 각 탭은 클릭 이벤트 외에도 키보드로 내비게이션할 수 있습니다.

---

</br></br>

# Modal

`Modal` 컴포넌트는 사용자가 특정 이벤트를 트리거했을 때 나타나는 팝업 UI 요소입니다. 이 컴포넌트는 여러 서브 컴포넌트로 구성되어 있으며, 모달의 구조와 콘텐츠를 정의할 수 있습니다.

### 서브 컴포넌트

- `Modal`: 모달을 감싸는 루트 컴포넌트로, `open` 속성에 따라 모달을 표시하거나 숨깁니다.
- `Modal.Container`: 모달의 메인 콘텐츠를 감싸는 컨테이너
- `Modal.Title`: 모달의 제목을 표시하는 컴포넌트
- `Modal.Content`: 모달의 본문 내용을 표시하는 컴포넌트

### 기본 예제

```tsx
import React, { useState } from "react";
import Modal from "elast-ui";

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpen}>모달 열기</button>
      <Modal open={isOpen} onClose={handleClose}>
        <Modal.Container>
          <Modal.Title>모달 제목</Modal.Title>
          <Modal.Content>모달의 본문 내용입니다.</Modal.Content>
        </Modal.Container>
      </Modal>
    </>
  );
};

export default Example;
```

### 주요 속성

- `open`: 모달을 열지 여부를 제어하는 속성입니다. `true`일 경우 모달이 표시됩니다.
- `onClose`: 모달이 닫힐 때 실행되는 콜백 함수입니다.
- `className`: 스타일을 커스터마이징하기 위해 클래스명을 전달할 수 있습니다.

### Keyboard Navigation

- **Escape**: 모달이 열려 있을 때 `Escape` 키를 누르면 모달이 닫힙니다.

### 포커스 관리

모달이 열리면 내부에 포커스가 이동하여 화면 리더와 같은 보조 도구를 사용할 때도 모달이 효과적으로 작동합니다. 모달이 닫히면 포커스는 원래 있던 위치로 돌아갑니다.

### 스타일링 및 확장성

각 서브 컴포넌트는 `className` 속성을 통해 스타일을 쉽게 확장할 수 있습니다. 필요에 따라 `Modal.Container`, `Modal.Title`, `Modal.Content`를 커스터마이징할 수 있습니다.

```tsx
<Modal.Container className="p-4 bg-white rounded-lg shadow-lg">
  <Modal.Title className="text-xl font-bold">모달 제목</Modal.Title>
  <Modal.Content className="text-gray-700">모달 본문입니다.</Modal.Content>
</Modal.Container>
```

---

</br></br>

# Switch

`Switch` 컴포넌트는 사용자가 상태를 토글할 수 있는 UI 요소입니다. 체크된 상태에 따라 스타일을 변경할 수 있으며, 사용자 인터랙션에 따라 상태 변경을 처리할 수 있습니다.

### 기본 예제

```tsx
import React, { useState } from "react";
import Switch from "elast-ui";

const Example = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (newState: boolean) => {
    setIsChecked(newState);
  };

  return (
    <>
      <Switch checked={isChecked} onChange={handleChange}>
        {isChecked ? "ON" : "OFF"}
      </Switch>
    </>
  );
};

export default Example;
```

### 주요 속성

- `checked`: 스위치의 현재 상태를 나타내며, `true`일 경우 스위치가 활성화된 상태입니다.
- `onChange`: 스위치 상태가 변경될 때 호출되는 콜백 함수입니다. 새로운 상태값이 함수의 인수로 전달됩니다.
- `id`: 스위치 컴포넌트에 고유한 식별자를 부여할 수 있습니다.
- `className`: 스타일을 커스터마이징하기 위해 클래스명을 전달할 수 있습니다.

### Dataset을 이용한 상태별 스타일링

`Switch` 컴포넌트는 가상 클래스(`pseudo-class`) 상태를 스타일링하기 위해 `data-checked` 속성을 지원합니다.

```tsx
<Switch
  checked={isChecked}
  onChange={handleChange}
  className="data-[checked]:bg-green-500 data-[checked]:text-white"
>
  {isChecked ? "ON" : "OFF"}
</Switch>
```

위 예제에서 `data-checked` 속성을 이용해 체크된 상태에 따른 스타일링을 적용할 수 있습니다.

### 클릭 이벤트

스위치는 클릭 이벤트를 통해 상태가 변경됩니다. `onChange` 콜백 함수가 실행되며, 새로운 상태값이 전달됩니다. 이를 통해 사용자는 스위치의 상태를 제어할 수 있습니다.
