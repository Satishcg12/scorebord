import { useEffect, useState } from "react";

export const userCountdown = (initialValue: number) => {
    const [countdown, setCountdown] = useState(initialValue);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [countdown]);


    return {countdown, };
}
