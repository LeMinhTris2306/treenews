import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

let commandList = {};

const SpeechRecognition = () => {
  const commandHandler = (command) => {};
  const commandRegister = (command, func) => {
    commandList = { ...commandList, command: () => func };
  };
};
