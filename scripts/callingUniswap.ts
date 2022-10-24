import {ethers} from "hardhat";
import { Contract, BigNumber, Wallet, ContractFactory, providers, Signer } from "ethers";
import {UniswapV2ERC20__factory} from "../typechain-types";
import * as dotenv from 'dotenv';

const uniswapV2Router02ContractAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; //GOERLI
const uniswapV2Factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

const signer = new ethers.Wallet((String(process.env.MY_WALLET_PRIVATE_KEY)), ethers.provider);
const UNISWAP = UniswapV2ERC20__factory.connect(uniswapV2Router02ContractAddress, signer);

const tokenAmountToSwap : BigNumber = BigNumber.from(10 ** 5);
const slippageTollerance = 50; // 1 = 0.01%
const deadline = 60;

const firstTokenAddressToSwap = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"; //WETH
const secondTokenAddressToSwap = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; //LINK

function swap(amount : BigNumber, path : string[], ){
    let amountOut = 

}
const main = async () => {

    await swap(tokenAmountToSwap, [firstTokenAddressToSwap, secondTokenAddressToSwap]);

};

main();