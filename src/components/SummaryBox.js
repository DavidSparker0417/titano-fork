import CountDown from './CountDown';

export default function SummaryBox(props) {
    const showData = (type, value) => {
        if (type==='')
        {
            return(<>$ {value}</>);
        }
        else if (type==='rate')
        {
            return(<>
                {value}%
                <div className="span-rot">APY</div>
            </>);
        }
        else if (type==='timer')
        {
            return(<>
                <CountDown interval={props.value} />
            </>);
        }
        
        return(<></>);
    }
    return(
        <li>
            <h5>
                <img src = {props.icon} alt=""/>
                {props.name}
            </h5>
            <div className={`bx ${props.type}`}>
                {showData(props.type, props.value)}
            </div>
        </li>
    )
}