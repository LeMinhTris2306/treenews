import React, { useEffect, useState } from "react";
import UserInfo from "../components/userDetail/UserInfo";
import { useParams } from "react-router-dom";
import { useUser } from "../utils/hook/useUser";

const UserDetail = () => {
    const { userid } = useParams();
    const { getUser } = useUser();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async (userid) => {
            const fetchedUser = await getUser(userid);
            if (fetchedUser) setUser(fetchedUser);
        };
        if (userid) {
            fetchUser(userid);
        }
    }, [userid]);
    return (
        <div className="warpper">
            <div className="container bg-body-tertiary pt-5">
                {user ? <UserInfo user={user} /> : <p>Loaing...</p>}
            </div>
        </div>
    );
};

export default UserDetail;
