import React from "react";
import { selectCurrentUser } from "../store/reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import AccountDetail from "../components/account/AccountDetail";

const Account = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <div className="container">
        {currentUser && <AccountDetail user={currentUser} />}
      </div>
    </>
  );
};

export default Account;
