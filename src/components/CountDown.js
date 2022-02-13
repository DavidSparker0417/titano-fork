import { useState, useEffect } from "react";

export default function CountDown(props) {
    const[counter, setCounter] = useState(props.interval);
    
    useEffect(() => {
        if (counter === 0)
            setCounter(props.interval);
        else 
            setTimeout(() => setCounter(counter-1), 1000);
    }, [counter])

    return (
        <div id="countdown">
            <div id="tiles">
                <span>
                    {("0" + Math.floor(counter/3600)).slice(-2)}:
                    {("0" + Math.floor((counter%3600)/60)).slice(-2)}:
                    {("0" + Math.floor(counter%60)).slice(-2)}
                </span>
            </div>
        </div>
    )
}