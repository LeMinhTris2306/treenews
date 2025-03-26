import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../store/reducers/userSlice";
import { useCategory } from "../../utils/hooks/useCategory";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [greeting, setGreeting] = useState("");
  const { getListCategory } = useCategory();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchListCategory = async () => {
      try {
        const response = await getListCategory();
        setCategories(response.categories);
      } catch (error) {
        console.error("Error fetching category:", error);
        // Có thể hiển thị thông báo lỗi cho người dùng tại đây
      }
    };
    fetchListCategory();
  }, []);

  useEffect(() => {
    if (currentUser) setGreeting(`Xin chào, ${currentUser.firstName}`);
    else setGreeting("");
  }, [currentUser]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex flex-column m-0 pb-0">
        <div className="container-sm" id="upper-nav">
          <Link to="/" className="navbar-brand">
            <span className="fw-bold text-secondary">Tree News</span>
          </Link>

          <div className="justify-content-end align-center">
            <ul className="navbar-nav d-flex flex-row">
              <li className="nav-item mx-2">
                <Link
                  to={currentUser ? "/account" : "/login"}
                  className="nav-link"
                >
                  {!currentUser && "Đăng nhập"}
                  {greeting}
                  <i className="fa-solid fa-user ms-1"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex flex-column">
        <div className="container" id="lower-nav">
          <div className="align-center mx-auto">
            <ul className="navbar-nav d-flex flex-row">
              {categories.map((category) => (
                <li className="nav-item mx-3" key={category.id}>
                  <Link
                    to={`/category/${category.urlDisplay}`}
                    className="nav-link"
                  >
                    <span>{category.categoryName}</span>
                  </Link>
                </li>
              ))}
              {/* Bỏ comment và chỉnh sửa nếu cần dùng dropdown
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
