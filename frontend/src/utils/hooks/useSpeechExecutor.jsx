// src/utils/hooks/useSpeechExecutor.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getPredictedText,
    clearPredictedText,
    getCurrentCommand,
    setPredictedText,
} from "../../store/reducers/speechSlice";

export const useSpeechExecutor = (actions = [], componentName) => {
    const dispatch = useDispatch();
    const predictedText = useSelector(getPredictedText);

    useEffect(() => {
        const execute = (command) => {
            // const combinedStrings = currentCommand
            //     .map((item) => item.commandList.join(", "))
            //     .join(", ");
            // console.log(combinedStrings);
            const found = actions.find(([name]) => name === command.trim());
            if (found) {
                const [, actionFunc] = found;
                if (typeof actionFunc === "function") {
                    actionFunc();
                }
            } else {
                console.log(`lệnh: ${command} không có trong ${componentName}`);
            }
            dispatch(setPredictedText(""));
        };
        if (predictedText?.trim()) {
            execute(predictedText.trim());
        }
    }, [predictedText]);
};
