import ReactDOM from "react-dom";

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const getRootElement = () => {
    let element = document.querySelector("#portal_root");
    if (!element) {
      element = document.createElement("div");
      element.id = "portal_root";
      document.body.appendChild(element);
    }
    return element;
  };

  const root = getRootElement();
  return ReactDOM.createPortal(children, root);
};
