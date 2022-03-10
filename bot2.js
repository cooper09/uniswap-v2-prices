const ethers = require('ethers');

require('dotenv').config();
const Web3 = require('web3');

const addresses = {
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', 
  router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  //recipient: '0xf11b2fc4f28150517af11c2c456cbe75e976f663'
  recipient: '0x00c3e8976ae622C79C6e33749eF999aa9ECba3c1'
}

const NODE_URL = 'https://rpc-mumbai.matic.today';

const walletProvider = require('@truffle/hdwallet-provider');
const web3 = new Web3(new walletProvider(process.env.PRIVATE_KEY,NODE_URL) );

const accounts = await web3.eth.getAccounts();
const accountName = getAccountName(accounts[0]);

console.log("account name: ", accountName );

//const mnemonic = 'c70ee88b8015156e2cd54314cf8d3b3f61689843106efef12f2f0f8721e7bb17';

//const provider = new ethers.providers.WebSocketProvider('https://mainnet.infura.io/v3/4cd98623d90d401ca984c02080c6bf72');
//const wallet = ethers.Wallet.fromMnemonic(mnemonic);
//const account = wallet.connect(provider);
//const factory = new ethers.Contracgit 
//  addresses.factory,
//  ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
//  account
//);

/*
const router = new ethers.Contract(
  addresses.router,
  [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
  ],
  account
);

factory.on('PairCreated', async (token0, token1, pairAddress) => {
  console.log(`
    New pair detected
    =================
    token0: ${token0}
    token1: ${token1}
    pairAddress: ${pairAddress}
  `);

  //The quote currency needs to be WETH (we will pay with WETH)
  let tokenIn, tokenOut;
  if(token0 === addresses.WETH) {
    tokenIn = token0; 
    tokenOut = token1;
  }

  if(token1 == addresses.WETH) {
    tokenIn = token1; 
    tokenOut = token0;
  }

  //The quote currency is not WETH
  if(typeof tokenIn === 'undefined') {
    return;
  }

  //We buy for 0.1 ETH of the new token
  const amountIn = ethers.utils.parseUnits('0.1', 'ether');
  const amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
  //Our execution price will be a bit different, we need some flexbility
  const amountOutMin = amounts[1].sub(amounts[1].div(10));
  console.log(`
    Buying new token
    =================
    tokenIn: ${amountIn.toString()} ${tokenIn} (WETH)
    tokenOut: ${amounOutMin.toString()} ${tokenOut}
  `);
  const tx = await router.swapExactTokensForTokens(
    amountIn,
    amountOutMin,
    [tokenIn, tokenOut],
    addresses.recipient,
    Date.now() + 1000 * 60 * 10 //10 minutes
  );
  const receipt = await tx.wait(); 
  console.log('Transaction receipt');
  console.log(receipt);
  
});

*/