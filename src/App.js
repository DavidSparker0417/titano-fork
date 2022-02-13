import './App.css';
import ListMainMenu, {MainMenuForMobile} from './components/ListMainMenu';
import SummaryBox from './components/SummaryBox';
import StakingStatistics from './components/StakingStatistics';
import TokenCalulator from './components/TokenCalculator';
import { useEffect, useState } from 'react';
import {ethers} from 'ethers';
import ErisTokenAbi from './artifacts/Titano.json';
import e2b from './artifacts/Titano2wBNB.json';
import RouterAbi from './artifacts/Router.json';
import {
  BSC_CHAIN, 
  REBASE_FREQ, 
  MIN_PER_YEAR, 
  MIN_PER_DAY,
  CalculateRewardsCustom,
  RINKEBY_CHAIN,
} from './components/TokenInterface';
import {numberWithCommas, truncateDecimals} from './components/utils.tsx';

const BN = ethers.BigNumber;

const ERIS_TOKEN_ADDRESS  = "0x9Cce58871a73D3Ea2141fB8b1843F408e459E141";
const BUSD_TOKEN_ADDRESS  = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

const log = console.log;
const errorWindow = (msg => alert(msg));

function App() {
  const apyPercentage = CalculateRewardsCustom(MIN_PER_YEAR).toFixed(4) * 100;
  const [tokenPrice, setTokenPrice] = useState(0);
  const [marketVal, setMarketVal] = useState(0);
  const [rebaseDuration, setRebaseDuration] = useState(1800);
  const [nextRewardAmount, setNextRewardAmount] = useState();
  const [nextRewardYield, setNextRewardYield] = useState();
  const [roi, setRoi] = useState();
  
  const [walletAccount, setWalletAccount] = useState("Connect Wallet");
  const [walletBalance, setWalletBalance] = useState();
  
  // event on initialize page.
  useEffect(() => {
    const interval = setInterval(refreshPage, 3000);
    InitPage();
    return () => clearInterval(interval);
  }, []);

  async function InitPage() {
    await refreshPage();
    await conntectWallet();
    log("[ERIS] Page Initialized");
  }

  async function refreshPage() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const erisTokenContract = new ethers.Contract(ERIS_TOKEN_ADDRESS, ErisTokenAbi.abi, provider);
      const pairCAddr = await erisTokenContract.pairContract();
      const routerCAddr = await erisTokenContract.router();
      const pairContract = new ethers.Contract(pairCAddr, e2b, provider);
      const routerContract = new ethers.Contract(routerCAddr, RouterAbi, provider);
      const tokenPrice = await getTokenPriceByRouter(erisTokenContract, routerContract);
      const totalSupply = await erisTokenContract.totalSupply();
      setMarketVal((ethers.utils.formatEther(totalSupply) * tokenPrice * 0.1047).toFixed(2));
      const balance = await getWalletInfo(provider, erisTokenContract);
      const rewards = CalculateRewardsCustom(REBASE_FREQ) - 1;
      setNextRewardYield((rewards*100).toFixed(5));
      setNextRewardAmount(rewards * balance);
      const fiveDayReawards = CalculateRewardsCustom(MIN_PER_DAY*5) - 1;
      setRoi(truncateDecimals(fiveDayReawards*100, 2));
    }
    catch (err) {
      log("[ERIS] Refresh page. error! (%s)", err.message);
    }
  }

  async function getTokenPriceByRouter(erisToken, erisRouter) {
    // get ERIS ratio to wBNB
    // log("[ERIS] getTokenPriceByRouter");
    try {
      const [, bgPrice] = await erisRouter.getAmountsOut(ethers.utils.parseUnits("1.0"), [ERIS_TOKEN_ADDRESS, BUSD_TOKEN_ADDRESS]);
      const price = parseFloat(ethers.utils.formatEther(bgPrice)).toFixed(6);
      setTokenPrice(price);
      log("[ERIS] :: Price of ERIS = %s $", price);
      return price;
    } catch (err) {
      log("[ERIS] Getting price of token error!");
      return 0;
    }
  }

  async function getWalletInfo(web3Provider, erisToken) {
    if (typeof web3Provider === "undefined" || 
        typeof erisToken === "undefined")
    {
      return 0;
    }
    try {
      const signer = web3Provider.getSigner(); // user
      const contractUser = await signer.getAddress();
      const tokenBalance = await erisToken.balanceOf(contractUser);
      const balance = ethers.utils.formatEther(tokenBalance)
      setWalletBalance(balance.toString());
      return balance;
    } catch(err) {
      log("[ERIS] Getting wallet balance error! (%s)", err.message);
    }
    return 0;
  }

  async function conntectWallet() {
    if (!window.ethereum)
    {
      alert("Metamask is not installed.")
      return;
    }
    
    try {

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: RINKEBY_CHAIN }],
      });

      const[account] = await window.ethereum.request({method: 'eth_requestAccounts'});
      setWalletAccount(account.substr(2, 4) + "..." + account.substr(-4, 4));
    } catch (err) {
      errorWindow(err.message);
    }
  }

  return (
    <div className="App">
      <div className = "bg-cover">
        <div className = "container-fluid">
          <div className = "row">
            <div className = 'col-6'>
              <div className='logo'>
                <img src="logo.png" alt="logo"/>
                Eris.finance
              </div>
            </div>
            <div className = 'col-6 position-relative'>
              <div className="info">
                <img src="info.svg" alt="Eris Token price"/>
                 &nbsp;&nbsp;$ {tokenPrice}
              </div>
              <div className="sea-green-btn" onClick={conntectWallet}>
                {walletAccount}
              </div>
            </div>
          </div>
        </div>
        <div className = "container-fluid">
          <div className="max-one-col">
            <ListMainMenu />
          </div>
          <div className="max-three-col">
            <div className="data">
              <ul className="data-row clearfix">
                <SummaryBox 
                  name = "Market Cap" 
                  icon = "images/profit-chart.svg" 
                  value={numberWithCommas(marketVal)}
                  type=''
                />
                <SummaryBox 
                  name = "APY Statistics"
                  icon = "images/statistics.svg"
                  value={numberWithCommas(apyPercentage)}
                  type='rate'
                />
                <SummaryBox 
                  name = "Next Rebase"
                  icon = "images/stopwatch.svg"
                  value={rebaseDuration}
                  type='timer'
                />
              </ul>
            </div>
            <h5 className="hedr">Staking Statistics</h5>
            <StakingStatistics
              apy = {numberWithCommas(apyPercentage)}
              walletBalance = {walletBalance}
              nextRewardAmount = {nextRewardAmount}
              nextRewardYield = {nextRewardYield}
              roi = {roi}
            />
          </div>
          <div className="max-third">
            <TokenCalulator price = {tokenPrice}/>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      <MainMenuForMobile />
    </div>
  );
}

export default App;
