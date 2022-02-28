import { ethers } from "ethers";
import artifact from "../artifacts/TokenFaucet.json";

const TOKEN_FAUCET_ADDRESS = "0xc42D4AdcAa3fAe94bdc6A4027fa4C1b8560c70c3";
const MCTT_RINKEBY_ADDRESS = "0x9e8dBC0d301825F190C2519C04eaf684739Bd070";

const getTokens = async (amount) => {
    try {
        const { ethereum } = window;
        if(ethereum) {
            if(ethereum.networkVersion !== "4") return false;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            const faucet = new ethers.Contract(TOKEN_FAUCET_ADDRESS, artifact.abi, signer)

            let tx = await faucet.getTokens(MCTT_RINKEBY_ADDRESS, amount);
            await tx.wait();
            return true;
        }
    } catch (error) {
        let errObject = Object.assign({}, error)
        console.log(errObject.error.message);
        alert(`Faucet Error --- ${errObject.error.message}`);
        return false;
    }
    // let count;
    // const promise = new Promise(resolve => {
    //     setTimeout(() => {
    //         count = waiter();
    //         const p = new Promise(resolve => {
    //             resolve(approve(123));
    //         });
    //         p.then(res => {
    //             resolve(count * res);
    //         })
    //     }, 5000);
    // });
    // return promise;
}

// const waiter = async () => {
//     let count = 0;
//     while(count < 10) {
//         count++;
//     }
//     return count;
// }

export { getTokens };