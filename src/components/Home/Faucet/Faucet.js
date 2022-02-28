import React, { useContext, useState } from "react";
import { NetworkContext } from "../../../NetworkContext";
import { getTokens } from "../../../actions/faucet";
import Loading from "../../utils/Loading";
import CorrectNetwork from "../../utils/CorrectNetwork";
import "./faucet.css";

const Faucet = () => {
    const { chainId } = useContext(NetworkContext);
    const { account } = useContext(NetworkContext);
    const [loading, setLoading] = useState(false);

    const handleClick = (e) => {
        setLoading(true);
        const promise = getTokens(50);
        promise.then(result => {
            console.log("result: ",result);
            setLoading(false);
        });
    }

    return (
        <div>
            <div className="faucet">
                <p>If you don't have tokens, get 50 tokens from the <span className="text-emphasis">Rinkeby faucet</span>: </p>
                <p className="text-small">(once per account per day)</p>
                <button className="btn-primary" disabled={loading || chainId === 1} onClick={handleClick}>Get Tokens</button>
                <p className="text-small">(Faucet is on Rinkeby only)</p>
                {loading && <Loading />}
            </div>
            {chainId !== 3 && chainId !== 4 && <CorrectNetwork />}
        </div>
    );
}

export default Faucet;