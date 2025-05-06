import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    commandList: [],
    speechText: "",
    predictedText: "",
};

export const speechSlice = createSlice({
    name: "speech",
    initialState,
    reducers: {
        clearCommand: (state) => {
            state.commandList = [];
        },
        setCommandList: (state, action) => {
            const incoming = action.payload;
            const seen = new Set();
            const duplicates = [];

            const filtered = incoming.filter((item) => {
                if (seen.has(item.name)) {
                    duplicates.push(item.name);
                    return false; // Loại bỏ trùng
                }
                seen.add(item.name);
                return true;
            });

            if (duplicates.length > 0) {
                console.warn("Trùng lệnh:", duplicates); // Log ra console hoặc dispatch ra ngoài nếu cần
            }

            state.commandList = filtered;
        },
        removeCommandByName: (state, action) => {
            const name = action.payload;
            state.commandList = state.commandList.filter(
                (item) => item.name !== name
            );
        },
        setSpeechText: (state, action) => {
            if (state.predictedText === action.payload) {
                state.predictedText = ""; // Reset trước để tạo trigger
            }
            state.speechText = action.payload;
        },
        clearSpeechText: (state) => {
            state.speechText = "";
        },
        setPredictedText: (state, action) => {
            state.predictedText = action.payload;
        },
        clearPredictedText: (state) => {
            state.predictedText = "";
        },
    },
});

export const getCurrentCommand = (state) => state.speech.commandList;
export const getSpeechText = (state) => state.speech.speechText;
export const getPredictedText = (state) => state.speech.predictedText;

export const {
    setCommandList,
    removeCommandByName,
    clearCommand,
    setSpeechText,
    clearSpeechText,
    setPredictedText,
    clearPredictedText,
} = speechSlice.actions;

export default speechSlice.reducer;
