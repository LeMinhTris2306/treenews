import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/reducers/userSlice";
// Hook này sẽ trả về thông tin người dùng và trạng thái xác thực
const useAuth = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isAuthenticated = currentUser !== null; // Kiểm tra xem người dùng đã đăng nhập hay chưa

    return { currentUser, isAuthenticated };
};

export default useAuth;
