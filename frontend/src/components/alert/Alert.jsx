import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setAlert,
    getAlertMessage,
    clearAlert,
} from "../../store/reducers/alertSlice";

const Alert = () => {
    const alertMessage = useSelector(getAlertMessage);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (alertMessage && alertMessage.message !== "") {
            setMessage(alertMessage.message);
            setAlertType(alertMessage.type);

            const timer = setTimeout(() => {
                setMessage("");
                setAlertType("");
                dispatch(clearAlert());
            }, 2500); // 2.5 giây

            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    return (
        <>
            <div
                className="position-fixed bottom-0 end-0 z-3 mb-3 me-3"
                id="alert"
            >
                {message && (
                    <div
                        className={`alert alert-${alertType} fade show`}
                        role="alert"
                    >
                        {message}
                    </div>
                )}
            </div>
        </>
    );
};

export default Alert;
