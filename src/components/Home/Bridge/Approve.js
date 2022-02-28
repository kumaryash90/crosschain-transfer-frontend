import React, { useContext, useEffect, useState } from "react";
import { NetworkContext } from "../../../NetworkContext";
import { approve, getAllowance } from "../../../actions/bridge";
import Loading from "../../utils/Loading";
import "./bridge.css";

const Approve = () => {
    const { chainId } = useContext(NetworkContext);
    const { account } = useContext(NetworkContext);
    const [loading, setLoading] = useState(false);
    const [currentAllowance, setCurrentAllowance] = useState("0");
    const [formData, setFormData] = useState({
        amount: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.amount < 1) {
            alert("invalid amount");
            return;
        }
        setLoading(true);
        const data = { ...formData };
        clear();
        console.log("form data: ", data);
        // const promise = new Promise(resolve => {
        //     resolve(transferOutsideFrom(formData));
        // });
        const promise = approve(data.amount);
        promise.then(result => {
            console.log("result: ",result);
            if(result) {
                const promise = getAllowance(account);
                promise.then((allowance) => {
                    if(allowance) {
                        setCurrentAllowance(allowance);
                    }
                });
            }
            setLoading(false);
        });
    }

    const clear = () => {
        setFormData({
            amount: "",
        });
    }

    useEffect(() => {
        const promise = getAllowance(account);
        promise.then((allowance) => {
            setCurrentAllowance(allowance);
            console.log("allowance: ", allowance);
            
        });
    }, []);

    return (
        <div className="bridge-section">
            <div className="bridge-section-info">
                <h2>Approve</h2>
                <p>Available Allowance: <span className="text-emphasis">{currentAllowance}</span> MCTT tokens</p>
                <br/>
                <p>Set allowance for the ADMIN account here.</p>
                <p>You can transfer tokens if the allowance is more than the amount to be sent.</p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <fieldset className="form-fieldset" disabled={loading || (chainId !== 3 && chainId !== 4)}>
                    <input className="form-input" type="text" placeholder="amount" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}/>
                    <button className="btn-primary" type="submit">Send</button>
                    {loading && <Loading />}
                </fieldset>
            </form>
        </div>
    );
}

export default Approve;