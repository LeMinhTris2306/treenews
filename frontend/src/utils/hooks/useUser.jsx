import { useDispatch, useSelector } from "react-redux";
import {
    getUsers,
    getUser,
    login,
    register,
    updateUser,
    changePassword,
    changeAvatar,
} from "../../store/actions/userActions";
import { logout, setUser } from "../../store/reducers/userSlice";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
    const dispatch = useDispatch();
    // Login
    const getUserHandler = async (userId) => {
        const { payload: user } = await dispatch(getUser(userId));
        return user;
    };

    const loginHandler = async (loginData) => {
        const { payload: result } = await dispatch(login(loginData));
        if (result && result.type == "success") {
            const { payload: user } = await dispatch(getUser(result.userId));
            console.log(user);
            if (user) {
                dispatch(setUser(user));
            }
            return true;
        } else if (result && result.type == "danger") {
            return result;
        }
    };

    //Change password
    const changePasswordHandler = async (passwords, id) => {
        const { payload: result } = await dispatch(
            changePassword({ passwords, id })
        );
        return result;
    };
    //Register
    const registerHandler = async (regData) => {
        const { payload: result } = await dispatch(register(regData));
        return result;
    };

    const loadUserHandler = async () => {
        const token = localStorage.getItem("user");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem("user");
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
    const logoutHanler = async () => {
        dispatch(logout());
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
    return {
        getUser: getUserHandler,
        login: loginHandler,
        createUser: registerHandler,
        loadUser: loadUserHandler,
        changePassword: changePasswordHandler,
        logout: logoutHanler,
        updateUser: updateUserHandler,
        changeAvatar: changeAvatarHandler,
    };
};
