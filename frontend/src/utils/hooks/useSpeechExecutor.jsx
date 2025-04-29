// src/utils/hooks/useSpeechExecutor.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpeechText, setSpeechText } from "../../store/reducers/speechSlice";

export const useSpeechExecutor = (actions = [], componentName) => {
    const dispatch = useDispatch();
    const currentSpeechText = useSelector(getSpeechText);

    useEffect(() => {
        const execute = (command) => {
            const found = actions.find(([name]) => name === command.trim());
            if (found) {
                const [, actionFunc] = found;
                if (typeof actionFunc === "function") {
                    actionFunc();
                }
            } else {
                console.log(`lệnh: ${command} không có trong ${componentName}`);
            }
            dispatch(setSpeechText(""));
        };
        if (currentSpeechText?.trim()) {
            execute(currentSpeechText.trim());
        }
    }, [currentSpeechText]);
};
