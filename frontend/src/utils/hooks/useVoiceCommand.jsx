import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setCommandList,
    removeCommandByName,
    getCurrentCommand,
} from "../../store/reducers/speechSlice";

export const useVoiceCommands = ({ actions, componentName }) => {
    const dispatch = useDispatch();
    const currentCommand = useSelector(getCurrentCommand);

    useEffect(() => {
        if (actions && actions.length > 0) {
            const commandNames = actions.map(([name]) => name);

            // Lọc trùng componentName
            const filtered = currentCommand.filter(
                (item) => item.name !== componentName
            );
            // console.log(commandNames);
            const updatedList = [
                ...filtered,
                { name: componentName, commandList: commandNames },
            ];

            dispatch(setCommandList(updatedList));
        }

        return () => {
            // Cleanup: xóa command khi component unmount
            dispatch(removeCommandByName(componentName));
        };
    }, [actions, componentName]);
};
