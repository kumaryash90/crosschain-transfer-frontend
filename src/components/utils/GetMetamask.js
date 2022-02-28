import React, { useContext } from "react";
import { NetworkContext } from "../../NetworkContext";
import "./utils.css";

const GetMetamask = (props) => {

    return (
        <div className="utils">
            <div className="container utils">
                <div className="get-metamask">
                    <h2>Please install Metamask</h2>
                </div>
            </div>
        </div>
    );
}

export default GetMetamask;