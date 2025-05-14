import { useState, useEffect } from "react";
import { useUser } from "../utils/hook/useUser";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
    const { getUsers } = useUser();
    const navigate = useNavigate();

    const [users, setUsers] = useState(null);
    useEffect(() => {
        const fetchUsers = async (n) => {
            const response = await getUsers(n);

            if (response) setUsers(response.users);
        };
        fetchUsers(100);
    }, []);

    // useEffect(() => {
    //     if (users) console.log(users);
    // }, [users]);
    return (
        <div className="warpper">
            <div className="container bg-body-tertiary pt-5">
                <div id="page-header">
                    <h3>Quản lí người dùng</h3>
                </div>
                <hr />

                {users ? (
                    <div id="user-manage-content">
                        <div id="user-table">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Họ</th>
                                        <th scope="col">Tên</th>
                                        <th scope="col">Phân loại</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            onClick={() =>
                                                navigate(`/user/${user.id}`)
                                            }
                                        >
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.email}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.userType}</td>
                                            <td>
                                                <div className="d-flex flex-row">
                                                    <button className="btn btn-danger mx-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="24px"
                                                            viewBox="0 -960 960 960"
                                                            width="24px"
                                                            fill="#1f1f1f"
                                                        >
                                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                        </svg>
                                                    </button>
                                                    {/* <button className="btn btn-primary mx-1">
                                                        fix
                                                    </button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </div>
    );
};

export default UserPage;
