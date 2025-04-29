import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getCurrentCommand,
    setCommandList,
    getSpeechText,
    setSpeechText,
} from "../../store/reducers/speechSlice";
import { useDispatch } from "react-redux";

const CommandHandler = (props) => {
    const { actions, componentName } = props;
    const dispatch = useDispatch();
    const currentSpeechText = useSelector(getSpeechText);
    const currentCommand = useSelector(getCurrentCommand);

    useEffect(() => {
        const execute = (command) => {
            const cmd = actions.find(([name]) => name === command);
            if (cmd) {
                cmd[1]();
            } else {
                console.log(`Không hiểu ${command}`);
            }
            dispatch(setSpeechText(""));
        };
        if (currentSpeechText && currentSpeechText != "") {
            execute(currentSpeechText);
        }
    }, [currentSpeechText]);
    useEffect(() => {
        if (actions && actions != []) {
            // console.log(actions);
            let listAction = actions.map((action, index) => action[0]);
            dispatch(
                setCommandList([
                    { name: componentName, commandList: listAction },
                ])
            );
        }
    }, [actions]);
    return <></>;
};

export default CommandHandler;
