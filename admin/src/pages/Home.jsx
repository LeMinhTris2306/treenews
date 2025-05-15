import { useEffect, useState } from "react";
import { useAdmin } from "../utils/hook/useAdmin";
import { Link } from "react-router-dom";
const Home = () => {
    const { getDashboardInfo } = useAdmin();
    const [dashboardInfo, setDashboardInfo] = useState(null);
    useEffect(() => {
        const fetchDashboardInfo = async () => {
            const response = await getDashboardInfo();
            if (response) setDashboardInfo(response);
        };

        fetchDashboardInfo();
    }, []);

    return (
        <>
            <div className="wrapper">
                <div className="container bg-body-tertiary pt-5">
                    <div id="page-header">
                        <h3>Dashboard</h3>
                    </div>
                    <hr />

                    <div id="dashboard-content" className="">
                        {dashboardInfo && (
                            <div className="d-flex flex-row justify-content-around">
                                <div className="card">
                                    <div className="card-body row">
                                        <div className="card-icon col-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 -960 960 960"
                                                fill="#1f1f1f"
                                            >
                                                <path d="M320-440h320v-80H320v80Zm0 120h320v-80H320v80Zm0 120h200v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                                            </svg>
                                        </div>
                                        <div className="card-content col-8">
                                            <div className="d-flex flex-column">
                                                <h1>
                                                    {dashboardInfo.articles}
                                                </h1>
                                                <span>
                                                    Tổng số bài báo được đăng
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={`/articles`}>Xem thêm</Link>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body row ">
                                        <div className="card-icon col-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 -960 960 960"
                                                fill="#1f1f1f"
                                            >
                                                <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
                                            </svg>
                                        </div>
                                        <div className="card-content col-8">
                                            <div className="d-flex flex-column">
                                                <h1>{dashboardInfo.users}</h1>
                                                <span>Tổng số người dùng</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={`/users`}>Xem thêm</Link>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body row ">
                                        <div className="card-icon col-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 -960 960 960"
                                                fill="#1f1f1f"
                                            >
                                                <path d="M240-320h320v-80H240v80Zm0-160h480v-80H240v80Zm-80 320q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
                                            </svg>
                                        </div>
                                        <div className="card-content col-8">
                                            <div className="d-flex flex-column">
                                                <h1>
                                                    {dashboardInfo.categories}
                                                </h1>
                                                <span>Tổng số thể loại</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={`/categories`}>Xem thêm</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
