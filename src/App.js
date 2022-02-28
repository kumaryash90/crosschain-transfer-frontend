import React, { useEffect, useState } from "react";
import { NetworkContext } from "./NetworkContext";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import ConnectWallet from "./components/utils/ConnectWallet";
import GetMetamask from "./components/utils/GetMetamask";
import "./index.css";

const App = () => {
    const [chainId, setChainId] = useState("");
    const [account, setAccount] = useState("");
    const { ethereum } = window;

    const checkNetwork = async () => {
        if(ethereum) {
            ethereum.on("chainChanged", (chainId) => {
                setChainId(parseInt(chainId, 16));
            }); 
            
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if(accounts.length !== 0) {
                console.log("account: ", account);
                ethereum.on('accountsChanged', (accounts) => {
                    window.location.reload();
                });
                setAccount(accounts[0]);
            }
            setChainId(parseInt(ethereum.networkVersion));
        }
    }

    const connectWallet = async () => {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
    }

    useEffect(() => {
        console.log("useeffect");
        checkNetwork();
    }, []);

    return (
        <NetworkContext.Provider value={{chainId, account, setAccount}}>
            <>
                <Header />
                { chainId
                    ? account
                        ? <Home />
                        : <ConnectWallet connectWallet={connectWallet}/>
                    : <GetMetamask />}
                <Footer />   
            </>
        </NetworkContext.Provider>
    );
}

export default App;