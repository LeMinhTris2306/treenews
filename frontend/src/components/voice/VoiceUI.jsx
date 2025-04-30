import React, { useEffect, useState, useRef } from "react";
import {
    getCurrentCommand,
    setSpeechText,
    getSpeechText,
    clearSpeechText,
    setPredictedText,
} from "../../store/reducers/speechSlice";
import { useSelector, useDispatch } from "react-redux";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useVoiceApi } from "../../utils/hooks/useVoiceApi";

// component này sẽ xử lý và lưu giọng nói
const VoiceUI = () => {
    const { predictTranscript } = useVoiceApi();
    const dispatch = useDispatch();
    const currentCommand = useSelector(getCurrentCommand);
    const currentSpeechText = useSelector(getSpeechText);
    const [listCommand, setListCommand] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [segments, setSegments] = useState([]);
    const silenceTimer = useRef(null);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        interimTranscript,
    } = useSpeechRecognition();

    useEffect(() => {
        if (currentCommand.commandList != []) {
            setListCommand(currentCommand);
        }
        // console.log(currentCommand);
    }, [currentCommand]);

    // Recording session
    const start = () => {
        setIsRecording(true);
        resetTranscript();
        SpeechRecognition.startListening({
            continuous: true,
            language: "vi-VN",
        });
    };

    const stop = () => {
        setIsRecording(false);
        SpeechRecognition.stopListening();
        clearTimeout(silenceTimer.current);
    };

    // Theo dõi im lặng
    useEffect(() => {
        if (!isRecording) return;

        if (interimTranscript) {
            // Có người đang nói -> reset timer
            clearTimeout(silenceTimer.current);
            silenceTimer.current = setTimeout(() => {
                if (transcript.trim()) {
                    console.log("Người dùng ngừng nói...");
                    setSegments((prev) => [...prev, transcript.trim()]);
                    resetTranscript();
                    dispatch(setSpeechText(transcript.trim().toLowerCase()));
                }
            }, 1069); // 2.5s im lặng
        }
    }, [interimTranscript]);

    useEffect(() => {
        const predict = async (currentSpeechText, combinedStrings) => {
            const response = await predictTranscript(
                currentSpeechText,
                combinedStrings
            );
            if (response && response != "") {
                dispatch(setPredictedText(response.toLowerCase()));
            }
        };
        if (currentSpeechText && currentSpeechText != "") {
            const combinedStrings = currentCommand
                .map((item) => item.commandList.join(", "))
                .join(", ");
            predict(currentSpeechText, combinedStrings);
        }
    }, [currentSpeechText]);
    //end recording session
    if (!browserSupportsSpeechRecognition) {
        return (
            <>
                <div
                    className="position-fixed top-0 start-0 ms-3"
                    id="quick-voice-command"
                >
                    <span>Browser doesn't support speech recognition.</span>;
                </div>
            </>
        );
    }
    return (
        <>
            <div
                className="position-fixed top-0 start-0 ms-3"
                id="quick-voice-command"
            >
                <div className="card my-2">
                    <div className="card-body d-flex justify-content-around">
                        <div className="d-flex flex-column">
                            <p>Microphone: {listening ? "on" : "off"}</p>
                            <div className="d-flex flex-row">
                                <button
                                    className="btn"
                                    id="speech-stop-button"
                                    onClick={() => stop()}
                                >
                                    <i className="fa-solid fa-stop"></i>
                                </button>
                                <button
                                    className="btn"
                                    id="speech-start-button"
                                    onClick={() => start()}
                                >
                                    <i className="fa-solid fa-play"></i>
                                </button>
                            </div>
                            <div className="card-text">
                                <p>
                                    {transcript == ""
                                        ? "Say something cool"
                                        : transcript}
                                </p>
                                {/* <h4>📄 Các đoạn đã ghi:</h4>
                            <ul>
                                {segments.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="card-text">
                            {listCommand.map((commandGroup) => (
                                <div key={commandGroup.name}>
                                    <h5>{commandGroup.name}</h5>
                                    <ul>
                                        {commandGroup.commandList.map(
                                            (eachCommand, index) => (
                                                <li
                                                    key={`${commandGroup.name}-${index}`}
                                                    onClick={() => {
                                                        dispatch(
                                                            setSpeechText(
                                                                `${eachCommand}`
                                                            )
                                                        );
                                                    }}
                                                >
                                                    {eachCommand}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VoiceUI;
