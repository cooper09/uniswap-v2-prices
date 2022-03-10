//const {ChainId, Fetcher} = require('@uniswap/sdk');
const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Percent } = require('@uniswap/sdk');
const ethers = require('ethers');

const chainId = ChainId.ROPSTEN;

console.log("ChainID: ", chainId );
const tokenAddress = '0xaD6D458402F60fD3Bd25163575031ACDce07538D'; //'0x6B175474E89094C44Da98b954EedeAC495271d0F';

const init = async () => {
    console.log("init");
    const dai = await Fetcher.fetchTokenData(chainId, tokenAddress);
    const weth = WETH[chainId];

    const pair = await Fetcher.fetchPairData(dai, weth);
    const route = new Route([pair], weth);
    const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
    console.log("DAI/WETH mid price: ", route.midPrice.toSignificant(6));
    console.log("DAI/WETH mid price - Inverted: ", route.midPrice.invert().toSignificant(6));
    console.log("DAI/WETH execution price: ", trade.executionPrice.toSignificant(6));
    console.log("DAI/WETH nextmid price: ", trade.nextMidPrice.toSignificant(6));
    
    const slippageTolerance = new Percent('50', '10000');
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
    const path = [weth.address, dai.address];
    const to = '';
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    const value = trade.inputAmount.raw;

    const provider = ethers.getDefaultProvider('mainnet', {
          infura: 'https://mainnet.infura.io/v3/4cd98623d90d401ca984c02080c6bf72'
      });

      /* 
        Ethers version
      */

      /* 
        Truffle Wallet version
      */

}//init



init();
