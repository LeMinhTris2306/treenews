import axios from "axios";
import { variables } from "./variables";

const API_URL = variables.VOICE_URL;

const predict = async (transcript, commands) => {
    try {
        const response = await axios.post(`${API_URL}predict`, {
            transcript: transcript,
            commands: commands,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default {
    predict,
};
