const {ChainId, Fetcher} = require('@uniswap/sdk');
const chainId = ChainId.MUMBAI;
require('dotenv').config();
const Web3 = require('web3');
const ethers = require('ethers');
const walletProvider = require('@truffle/hdwallet-provider');

const addresses = {
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    MATIC:'0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', 
    router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    //recipient: '0xf11b2fc4f28150517af11c2c456cbe75e976f663'
    recipient: '0x00c3e8976ae622C79C6e33749eF999aa9ECba3c1'
  }

const init = async () => {
    console.log("we can start here...");

    const NODE_URL = 'https://rpc-mumbai.matic.today';

    const walletProvider = require('@truffle/hdwallet-provider');
    const web3 = new Web3(new walletProvider(process.env.PRIVATE_KEY,NODE_URL) );

    const accounts = await web3.eth.getAccounts();
    const balance = await  web3.eth.getBalance(accounts[0]);

    console.log("account name: ", accounts[0] );
    console.log("account balance: ", web3.utils.fromWei(balance) );

    const networkId = await web3.eth.net.getId();
    console.log("network name: ", networkId );
    console.log("ChainId: ", chainId);

    // Uniswap Contracts
    const UNISWAP_FACTORY_ABI = require('./contracts/UniswapFactory.json'); 
    const UNISWAP_EXCHANGE_ABI = require('./contracts/UniswapExchange.json');
    
    const Factory = new web3.eth.Contract(UNISWAP_FACTORY_ABI, "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f");
   
 //const wethAddress = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';

    //const exchangeAddress = await Factory.methods.getExchange(wethAddress).call();
    //console.log("Exchange Address: ", exchangeAddress );
   //const stinky =  Factory.methods.tokenCount().call();

    //const tokenPair = await Factory.methods.getPair('0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619','0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270').call();

    //const comp = await Fetcher.fetchTokenData(chainId, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F');
    //const alchemy = "https://polygon-mumbai.g.alchemy.com/v2/JNYQg9eO-sBO5PRWNl21_gcp76SRx8gz";
    //const provider = new ethers.providers.JsonRpcProvider(alchemy)

    const Weth = await Fetcher.fetchTokenData(80001, '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa');
    //const Matic = await Fetcher.fetchTokenData(80001, '0x0000000000000000000000000000000000001010');

    console.log("Mumbai WETH: ", Weth );
   // console.log("Mumbai Matic: ", Matic );

  //  const pair = await Fetcher.fetchPairData( Weth, Matic)
    process.exit();    
}//end init


 init();