import { ethers } from "ethers";
import axios from "axios";
import artifact from "../artifacts/rinkeby/MultiChainTestToken.json";
const ADMIN_ADDRESS = "0xFD78F7E2dF2B8c3D5bff0413c96f3237500898B3";

const TOKEN_ADDRESS = {
    4: "0x9e8dBC0d301825F190C2519C04eaf684739Bd070",
    3: "0x43Cf390bca8cCc836F737E0bf415936877ef9CFA",
    5: "",
    42: "",
}

const getAddress = (chainId) => {
    return TOKEN_ADDRESS[chainId];
}

const getAllowance = async (account) => {
    try {
        const { ethereum } = window;
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const chainId = ethereum.networkVersion;
            const address = getAddress(chainId);
            if(!address) return "";
            const mctt = new ethers.Contract(address, artifact.abi, signer)
            console.log("signer: ", signer);
            const allowance = await mctt.allowance(account, ADMIN_ADDRESS);
            console.log("bridge allowance: ", allowance);
            return ethers.utils.formatEther(allowance.toString());
        }
    } catch (error) {
        let errObject = Object.assign({}, error)
        console.log(errObject.error.message);
        alert(`${errObject.error.message}`);
        return "";
    }
}

const approve = async (amount) => {
    try {
        const { ethereum } = window;
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const chainId = ethereum.networkVersion;
            const address = getAddress(chainId);
            if(!address) return false;
            const mctt = new ethers.Contract(address, artifact.abi, signer)

            let tx = await mctt.approve(ADMIN_ADDRESS, ethers.utils.parseEther(`${amount}`));
            const receipt = await tx.wait();
            console.log("tx hash: ", receipt);
            return true;
        }
    } catch (error) {
        let errObject = Object.assign({}, error)
        if(errObject.error) {
            console.log(errObject.error.message);
            alert(`${errObject.error.message}`);
        } else {
            alert("something went wrong");
        }
        return false;
    }
}

const transferOutsideFrom = async (formData) => {
    try {
        const { data } = await axios.post("http://multichain-token-project.herokuapp.com/transfer", formData);
        console.log("received from server: ", data);
        return true;
    } catch (error) {
        if(error.response) {
            console.log("error is: ", error.response.data);
            alert(error.response.data);
        } else {
            console.log("error: ",error);
        }
        return false;
    }
}

export { transferOutsideFrom, approve, getAllowance, getAddress };