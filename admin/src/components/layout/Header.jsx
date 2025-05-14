import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className="container bg-body-tertiary " id="navigation-bar">
            <nav className="navbar navbar-expand-lg bg-success-subtle">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Treenews admin
                    </Link>

                    <div className="navbar-collapse">
                        <ul className="navbar-nav d-flex ">
                            <li className="nav-item">
                                <Link className="nav-link" to="/articles">
                                    Quản lí bài báo
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">
                                    Quản lí Người dùng
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown-center">
                        <Link className="btn nav-link" to="/admin">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 -960 960 960"
                                width="20px"
                                fill="#1f1f1f"
                            >
                                <path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.81-195q-57.81 0-97.31-39.69-39.5-39.68-39.5-97.5 0-57.81 39.69-97.31 39.68-39.5 97.5-39.5 57.81 0 97.31 39.69 39.5 39.68 39.5 97.5 0 57.81-39.69 97.31-39.68 39.5-97.5 39.5Zm.66 370Q398-80 325-111.5t-127.5-86q-54.5-54.5-86-127.27Q80-397.53 80-480.27 80-563 111.5-635.5q31.5-72.5 86-127t127.27-86q72.76-31.5 155.5-31.5 82.73 0 155.23 31.5 72.5 31.5 127 86t86 127.03q31.5 72.53 31.5 155T848.5-325q-31.5 73-86 127.5t-127.03 86Q562.94-80 480.47-80Zm-.47-60q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
