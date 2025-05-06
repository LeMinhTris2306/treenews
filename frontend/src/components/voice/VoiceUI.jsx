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
            console.log("predicting...");
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
                    <div className="card-body d-flex justify-content-center text-center">
                        <div className="d-flex flex-column">
                            <p>Microphone: {listening ? "on" : "off"}</p>
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    listening ? stop() : start();
                                }}
                            >
                                {listening ? (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#1f1f1f"
                                        >
                                            <path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z" />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#1f1f1f"
                                        >
                                            <path d="m710-362-58-58q14-23 21-48t7-52h80q0 44-13 83.5T710-362ZM480-594Zm112 112-72-72v-206q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v126l-80-80v-46q0-50 35-85t85-35q50 0 85 35t35 85v240q0 11-2.5 20t-5.5 18ZM440-120v-123q-104-14-172-93t-68-184h80q0 83 57.5 141.5T480-320q34 0 64.5-10.5T600-360l57 57q-29 23-63.5 39T520-243v123h-80Zm352 64L56-792l56-56 736 736-56 56Z" />
                                        </svg>
                                    </>
                                )}
                            </button>
                            <div className="card-text pt-2">
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
                <div>
                    <button
                        className="btn btn-primary"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling"
                        aria-controls="offcanvasScrolling"
                    >
                        Xem các câu lệnh có sẵn
                    </button>
                </div>
                <div
                    className="offcanvas offcanvas-start"
                    data-bs-scroll="true"
                    data-bs-backdrop="true"
                    tabIndex="-1"
                    id="offcanvasScrolling"
                    aria-labelledby="offcanvasScrollingLabel"
                >
                    <div className="offcanvas-header">
                        {/* <h5
                            className="offcanvas-title"
                            id="offcanvasScrollingLabel"
                        >
                            Các câu lệnh có sẵn
                        </h5> */}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        {listCommand.map((commandGroup, index) => (
                            <div key={commandGroup.name}>
                                <button
                                    className="btn"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse${index}`}
                                >
                                    <div className="d-flex">
                                        <h5>{commandGroup.name}</h5>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#1f1f1f"
                                        >
                                            <path d="M480-360 280-560h400L480-360Z" />
                                        </svg>
                                    </div>
                                </button>

                                <div
                                    className="collapse"
                                    id={`collapse${index}`}
                                >
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VoiceUI;
