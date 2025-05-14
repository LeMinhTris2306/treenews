import { useDispatch } from "react-redux";
import {
    login,
    getUser,
    changePassword,
    changeAvatar,
    getUsers,
    updateUser,
    register,
    deleteUser,
} from "../../store/actions/userActions";
import { setUser, logout } from "../../store/reducers/userSlice";
import { jwtDecode } from "jwt-decode";
import { setAlert } from "../../store/reducers/alertSlice";

export const useUser = () => {
    const dispatch = useDispatch();

    const loginHandler = async (loginData) => {
        const { payload: result } = await dispatch(login(loginData));
        if (result && result.type === "success") {
            const { payload: user } = await dispatch(getUser(result.userId));
            console.log(user);
            if (user) {
                // Dispatching setUser correctly
                dispatch(setUser(user));
            }
            return true;
        } else if (result && result.type === "danger") {
            return result;
        }
    };

    const getUserHandler = async (userId) => {
        const { payload: user } = await dispatch(getUser(userId));
        return user;
    };

    const getUsersHandler = async (n = 100) => {
        const { payload: users } = await dispatch(getUsers(n));
        return users;
    };

    const loadUserHandler = async () => {
        const token = localStorage.getItem("user");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem("user");
                    dispatch(
                        setAlert({
                            message: "Token không hợp lệ",
                            type: "danger",
                        })
                    );
                } else {
                    const { payload: user } = await dispatch(
                        getUser(decodedToken.userid)
                    );
                    if (user) {
                        dispatch(setUser(user));
                    }
                }
            } catch (error) {
                localStorage.removeItem("user");
            }
        }
    };

    //Change password
    const changePasswordHandler = async (passwords, id) => {
        const { payload: result } = await dispatch(
            changePassword({ passwords, id })
        );
        return result;
    };

    const logoutHanler = async () => {
        await dispatch(logout());
    };
    const updateUserHandler = async (data, id) => {
        const { payload: result } = await dispatch(updateUser({ data, id }));
        if (result) {
            await dispatch(setUser(result));
            return true;
        } else {
            return false;
        }
    };

    const changeAvatarHandler = async (img, id) => {
        const { payload: result } = await dispatch(changeAvatar({ img, id }));
        if (result) {
            await dispatch(setUser(result));
            return true;
        } else {
            return false;
        }
    };

    //Register
    const registerHandler = async (regData) => {
        const { payload: result } = await dispatch(register(regData));
        return result;
    };

    const deleteUserHandler = async (userId) => {
        const { payload: result } = await dispatch(deleteUser(userId));
        return result;
    };

    return {
        login: loginHandler,
        logout: logoutHanler,
        getUser: getUserHandler,
        getUsers: getUsersHandler,
        loadUser: loadUserHandler,
        createUser: registerHandler,
        changePassword: changePasswordHandler,
        updateUser: updateUserHandler,
        deleteUser: deleteUserHandler,
        changeAvatar: changeAvatarHandler,
    };
};
