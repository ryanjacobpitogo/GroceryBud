import { useEffect } from "react";

export default function Alert ({ type, text, removeAlert, list }) {
    useEffect (() => {
        const timer = setTimeout(() => removeAlert(), 3500);
        return () => clearTimeout(timer);
    }, [list]);
    return <p className={`alert ${type}`}>{text}</p>;
}