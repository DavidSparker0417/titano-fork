import {useEffect, useState} from 'react';
import {CalculateRewardsCustom} from './TokenInterface';

export default function TokenCalulator(props) {
    const [estmDuration, setEstmDuration] = useState(4);
    const [estmInp, setEstmInp] = useState("");
    const [estmEris, setEstmEris] = useState();
    const [estmUSD, setEstmUSD] = useState();
    const DURATIONS = [
        {id: 1, title: "7 dyas",    minutes: 1440*7}, 
        {id: 2, title: "1Month",    minutes: 1440*30}, 
        {id: 3, title: "6Months",   minutes: 1440*(365/2)}, 
        {id: 4, title: "1year",     minutes: 1440*365}, 
    ];
    
    useEffect(calculateEstimateRewards, [estmInp, estmDuration]);

    function handleEstimateValueChange({target})
    {
        setEstmInp(target.value.replace(/\D/,''));
    }

    function calculateEstimateRewards() {
        if (estmInp === "")
            return;

        const dr = DURATIONS.find(element => element.id == estmDuration);
        const interest = CalculateRewardsCustom(dr.minutes)
        console.log(interest);
        setEstmEris(interest.toFixed(3));
        setEstmUSD((interest * props.price).toFixed(2));
    }

    return (
        <div className="calculator">
            <h3>
                <img src="images/calculator.svg" alt=""/>
                Calculator
            </h3>
            <div className="calculator-bx">
                <h4>Estimate Your Returns</h4>
                <div className="input-space">
                    <input 
                        type="text" 
                        pattern="[0-9]"
                        placeholder="Add Token Amount Here..." 
                        value={estmInp}
                        onChange={handleEstimateValueChange}
                    />
                </div>
                <ul className="years-list clearfix">
                    {
                        DURATIONS.map((t) => 
                            <li 
                                className={t.id === estmDuration ? "active" : ""}
                                onClick={() => setEstmDuration(t.id)}
                                key = {t.id}
                            >
                                <a>{t.title}</a>
                            </li>
                        )
                    }
                </ul>
                <ul className="total-profit clearfix">
                    <li>$ERIS Balance</li>
                    <li>{estmEris}</li>
                </ul>
                <ul className="total-profit clearfix">
                    <li>Total USD Balance</li>
                    <li className="sea-green">$ {estmUSD}</li>
                </ul>
                <span className="small-font">
                    Earnings calculated, indicate the scenario when the RFV Sustain the Rebase Reward for 365 days
                </span>
                <a href="https://pancakeswap.finance/swap?outputCurrency=0xba96731324de188ebc1ed87ca74544ddebc07d7f" target="_blank">
                    <div className="input-space">
                        <input type="button" value="Swap $ERIS"/>
                    </div>
                </a>
            </div>
        </div>
    )
}