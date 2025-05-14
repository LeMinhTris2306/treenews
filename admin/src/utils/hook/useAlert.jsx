import { useDispatch } from "react-redux";
import { setAlert, clearAlert } from "../../store/reducers/alertSlice";

export function useAlert() {
    const dispatch = useDispatch();

    return {
        success: (message) => dispatch(setAlert({ message, type: "success" })),
        danger: (message) => dispatch(setAlert({ message, type: "danger" })),
        info: (message) => dispatch(setAlert({ message, type: "info" })),
        warning: (message) => dispatch(setAlert({ message, type: "warning" })),
        clear: () => dispatch(clearAlert()),
    };
}
