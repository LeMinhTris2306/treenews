import voiceApi from "../../API/voiceApi";

export const useVoiceApi = () => {
    const predictTranscriptHandler = async (transcript, commands) => {
        const response = await voiceApi.predict(transcript, commands);
        return response;
    };
    return {
        predictTranscript: predictTranscriptHandler,
    };
};
