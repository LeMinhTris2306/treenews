import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAlertMessage, clearAlert } from "../../store/reducers/alertSlice";
import { useDispatch } from "react-redux";

const Alert = () => {
    const alertMessage = useSelector(getAlertMessage);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

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
                className="position-fixed bottom-0 start-50 mt-5 translate-middle"
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
