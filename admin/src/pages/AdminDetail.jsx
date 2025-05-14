import UserInfo from "../components/userDetail/UserInfo";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/reducers/userSlice";

const AdminDetail = () => {
    const currentUser = useSelector(selectCurrentUser);
    return (
        <div className="warpper">
            <div className="container bg-body-tertiary pt-5">
                {currentUser && <UserInfo user={currentUser} />}
            </div>
        </div>
    );
};

export default AdminDetail;
