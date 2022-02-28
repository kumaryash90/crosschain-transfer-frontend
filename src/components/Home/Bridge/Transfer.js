import React, { useContext, useState } from "react";
import { NetworkContext } from "../../../NetworkContext";
import { transferOutsideFrom } from "../../../actions/bridge";
import Loading from "../../utils/Loading";
import "./bridge.css";

const Transfer = () => {
    const { chainId } = useContext(NetworkContext);
    const { account } = useContext(NetworkContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        to: "",
        amount: "",
        to_net: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.amount < 1) {
            alert("invalid amount");
            return;
        } else if((formData.to).length<42) {
            alert("please enter a valid hex address");
            return;
        } else if((account.toLowerCase() === (formData.to).toLowerCase()) && (chainId.toString() === (formData.to_net).toString())) {
            alert("sender & receiver can't be same on a network");
            return;
        }
        setLoading(true);
        const data = { ...formData, account: account, chainId: `${chainId}` };
        clear();
        console.log("form data: ", data);
        // const promise = new Promise(resolve => {
        //     resolve(transferOutsideFrom(formData));
        // });
        const promise = transferOutsideFrom(data);
        promise.then(result => {
            console.log("result: ",result);
            setLoading(false);
        });
    }

    const clear = () => {
        setFormData({
            to: "",
            amount: "",
            to_net: "",
        });
    }

    return (
        <div className="bridge-section">
            <div className="bridge-section-info">
            <h2>Transfer</h2>
                <p>Tokens to be sent should be less than or equal to the allowance</p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <fieldset className="form-fieldset" disabled={loading || (chainId !== 3 && chainId !== 4)}>
                    <p>Sending From: <span className="text-emphasis">{account.substr(0,6)}...{account.substr(38)}</span></p>
                    <br/>
                    <input className="form-input" type="text" placeholder="recipient hex address" value={formData.to} onChange={(e) => setFormData({...formData, to: e.target.value})}/>
                    <input className="form-input" type="text" placeholder="min 1 token" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}/>
                    <select className="form-input" name="" id="" required value={formData.to_net} onChange={(e) => setFormData({...formData, to_net: e.target.value})}>
                        <option value="">Select Recipient Network</option>
                        <option value={3}>Ropsten</option>
                        <option value={4}>Rinkeby</option>
                        {/* <option value={42}>Kovan</option>
                        <option value={5}>Goerli</option> */}
                    </select>
                    <button className="btn-primary" type="submit">Send</button>
                    <button className="btn-secondary" onClick={clear}>Reset</button>
                    {loading && <Loading />}
                </fieldset>
            </form>
        </div>
    );
}

export default Transfer;