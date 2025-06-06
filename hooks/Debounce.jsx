import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounceValue(value), delay || 500);

        return () => {
            clearTimeout(timer);
        };
    }, [delay, value]);

    return debounceValue;
}