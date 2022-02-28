import React, { useContext } from "react";
import { NetworkContext } from "../../NetworkContext";
import "./utils.css";

const CHAINS = {
    1: "Mainnet",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    42: "Kovan",
}

const ConnectWallet = (props) => {
    const { chainId } = useContext(NetworkContext);
    const chain = CHAINS[chainId];

    return (
        <div className="utils">
            <div className="container utils">
                <div className="connect-wallet">
                    <h1>Current Network: {chain}</h1>
                    <h2>Please connect wallet to continue</h2>
                    <button className="btn-primary" onClick={props.connectWallet}>connect wallet</button>
                </div>
            </div>
        </div>
    );
}

export default ConnectWallet;