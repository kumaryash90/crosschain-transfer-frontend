import React, { useContext, useState } from "react";
import Approve from "./Approve";
import Transfer from "./Transfer";
import CorrectNetwork from "../../utils/CorrectNetwork";
import "./bridge.css";
import { NetworkContext } from "../../../NetworkContext";

const Bridge = () => {
    const { chainId } = useContext(NetworkContext)
    const [toggle, setToggle] = useState(true);

    return (
        <div className="bridge">
            <ul className="toggle-ul">
                <li>
                    <input type='radio' value={1} name='toggle-radio' id='radio1' checked={toggle} onChange={(e) => setToggle(!toggle)} />
                    <label for='radio1'>Set Allowance</label>
                </li>
                <li>
                    <input type='radio' value={2} name='toggle-radio'  id='radio2' checked={!toggle} onChange={(e) => setToggle(!toggle)}/>
                    <label for='radio2'>Transfer Tokens</label>
                </li>
            </ul>
            {toggle && <Approve />}
            {!toggle && <Transfer />}
        </div>
    );
}

export default Bridge;