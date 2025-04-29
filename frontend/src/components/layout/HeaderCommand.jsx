import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    setCommandList,
    getSpeechText,
    setSpeechText,
} from "../../store/reducers/speechSlice";
import { useDispatch } from "react-redux";

const HeaderCommand = (props) => {
    const { actions } = props;
    const dispatch = useDispatch();
    const currentSpeechText = useSelector(getSpeechText);

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
        if (actions) {
            // console.log(actions);
            let listAction = actions.map((action, index) => action[0]);
            dispatch(setCommandList(listAction));
        }
    }, [actions]);
    return <></>;
};

export default HeaderCommand;
