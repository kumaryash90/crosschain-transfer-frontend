import React, { useContext } from "react";
import { NetworkContext } from "../../NetworkContext";
import "./utils.css";

const CorrectNetwork = () => {

    return (
        <div className="correct-network">
            <h2>This application is available on Ropsten and Rinkeby only</h2>
        </div>
    );
}

export default CorrectNetwork;