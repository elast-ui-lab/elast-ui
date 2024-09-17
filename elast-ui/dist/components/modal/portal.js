import ReactDOM from "react-dom";
var Portal = function (_a) {
    var children = _a.children;
    var getRootElement = function () {
        var element = document.querySelector("#portal_root");
        if (!element) {
            element = document.createElement("div");
            element.id = "portal_root";
            document.body.appendChild(element);
        }
        return element;
    };
    var root = getRootElement();
    return ReactDOM.createPortal(children, root);
};
export default Portal;
