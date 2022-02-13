export default function StakingStatistics(props) {
    return(
        <div className = "statistics">
            <table className="table">
                <thead>
                    <tr>
                        <th>Current APY:</th>
                        <th>{props.apy} %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Your Wallet Balance:</td>
                        <td>{props.walletBalance}</td>
                    </tr>
                    <tr>
                        <td>Next Reward Amount:</td>
                        <td>{props.nextRewardAmount}</td>
                    </tr>
                    <tr>
                        <td>Next Reward Yield:</td>
                        <td>{props.nextRewardYield}%</td>
                    </tr>
                    <tr>
                        <td>ROI(5-Day Rate):</td>
                        <td className="sea-g">{props.roi}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}