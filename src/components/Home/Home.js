import React, { useContext } from "react";
import { NetworkContext } from "../../NetworkContext";
import Bridge from "./Bridge/Bridge";
import Faucet from "./Faucet/Faucet";
import { getAddress } from "../../actions/bridge";
import "./home.css";

const NETWORKS = {
    1: "Ethereum Mainnet",
    3: "Ropsten Testnet",
    4: "Rinkeby Testnet",
    5: "Goerli Testnet",
    42: "Kovan Testnet",
};

const Home = () => {
    const { chainId } = useContext(NetworkContext);
    const { account, setAccount } = useContext(NetworkContext);

    return (
        <div className="home">
            <div className="home-primary">
                <div className="container">
                    <h2>Welcome!</h2>
                    <p>You're connected on <span className="text-emphasis">{NETWORKS[chainId]}</span>,</p>
                    <p>with account <span className="text-emphasis">{account}</span>.</p>
                    {(chainId == 3 || chainId == 4 || chainId == 5) && 
                    <p>MCTT contract address on {NETWORKS[chainId]} is <span className="text-emphasis">{getAddress(chainId)}</span></p>}
                    <Faucet />
                </div>
            </div>
            <div className="home-secondary">
                <div className="container">
                    <Bridge />
                </div>
            </div>
        </div>
    );
}

export default Home;