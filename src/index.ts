import {sayHello, showHello} from "../tslib/printer/core"
import "./styles/test.pcss"

window.onload = () => {
    showHello("greeting", "TypeScript");
    sayHello([{title: "T1", content: "<div>D2</div>>"}, {title: "T1", content: "<div>D2</div>>"}], "100500")
}