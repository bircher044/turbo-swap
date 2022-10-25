import {ethers} from "hardhat";
import {BigNumber } from "ethers";
import {UniswapV2ERC20__factory} from "../typechain-types";
import {UniswapV2Router02__factory} from "../typechain-types";
import * as dotenv from 'dotenv';

const uniswapV2Router02ContractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; //GOERLI

//
const tokenAmountToSwap : BigNumber = ethers.utils.parseEther("0.01")
let deadline = 1000;
const firstTokenAddressToSwap = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; //LINK
const secondTokenAddressToSwap = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const WETHAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
//

const signer = new ethers.Wallet((String(process.env.MY_WALLET_PRIVATE_KEY)), ethers.provider);
const ERC20 = UniswapV2ERC20__factory.connect(firstTokenAddressToSwap, signer);
const router02 = UniswapV2Router02__factory.connect(uniswapV2Router02ContractAddress, signer);

const swap = async(amount : BigNumber, path : string[], deadline ) => {

    if(path[0] == path[1]){
        console.log("Error. Exact token addreses")
    }

    else if(path[0] == ethers.constants.AddressZero){

        path[0] = WETHAddress;

        console.log("Swapping ETH for Token");
        const txReceipt = await (await router02.swapExactETHForTokens(0, path, signer.address, deadline, {value: amount})).wait();
        txReceipt && txReceipt.blockNumber ? console.log("Transaction signed") : console.log("Transaction failed");
    }

    else if(path[1] == ethers.constants.AddressZero){

        path[1] = WETHAddress;

        console.log("Approving token spend");
        const txReceipt1 = await (await ERC20.approve(router02.address, amount)).wait();
        txReceipt1 && txReceipt1.blockNumber ? console.log("Transaction signed") : console.log("Transaction failed");

        console.log("Swapping Token for ETH");
        const txReceipt2 = await (await router02.swapExactTokensForETH(amount, 0, path, signer.address, deadline)).wait();
        txReceipt2 && txReceipt2.blockNumber ? console.log("Transaction signed") : console.log("Transaction failed");
    }

    else{

        console.log("Approving token spend");
        const txReceipt1 = await (await ERC20.approve(router02.address, amount)).wait();
        txReceipt1 && txReceipt1.blockNumber ? console.log("Transaction signed") : console.log("Transaction failed");

        console.log("Swapping Token for Token");
        const txReceipt2 = await (await (router02.swapExactTokensForTokens(amount, 0, path, signer.address, deadline))).wait();
        txReceipt2 && txReceipt2.blockNumber ? console.log("Transaction signed") : console.log("Transaction failed");
    }

}

const main = async () => {

    deadline = ((await ethers.provider.getBlock("latest")).timestamp + deadline);
    await swap(tokenAmountToSwap, [firstTokenAddressToSwap, secondTokenAddressToSwap], deadline);

};

main();