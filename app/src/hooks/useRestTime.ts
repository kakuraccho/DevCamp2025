import { useState, useEffect } from "react";

export default function useRestTime( endtimeStr: string ) {

    const [currentTime, setCurrentTime] = useState(new Date())
    const endtime = new Date(endtimeStr)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])

    const nowTime = currentTime
    const difMs =  endtime.getTime() - nowTime.getTime()
    let difMin = Math.floor(difMs / 60000)
    if (difMin < 0) {
        difMin = 0
    }

    return difMin
}