import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/reducers/userSlice";

const categories = [
  { key: "sport", value: "Thể thao" },
  { key: "vleague", value: "VLeague" },
  { key: "esport", value: "E-sport" },
  { key: "basketball", value: "Bóng rổ" },
  { key: "tennis", value: "Tennis" },
];

const Header = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const HandleHeaderCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (currentUser) setGreeting(`Xin chào, ${currentUser.firstName}`);
    else setGreeting("");
  }, [currentUser]);
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="container-sm" id="upper-nav">
            <a
              href="/"
              className="navbar-brand"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <span className="fw-bold text-secondary">Tree News</span>
            </a>

            <div className="justify-content-end align-center">
              <ul className="navbar-nav  d-flex flex-row">
                <li className="nav-item mx-2">
                  <a
                    href=""
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!currentUser) {
                        navigate("/login");
                      } else {
                        navigate("/account");
                      }
                    }}
                  >
                    {!currentUser && "Đăng nhập"}
                    {greeting}
                    <i className="fa-solid fa-user ms-1"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="container" id="lower-nav">
            <div className="align-center mx-auto">
              <ul className="navbar-nav d-flex flex-row">
                {categories.map((category) => (
                  <li className="nav-item mx-3" key={category.key}>
                    <a
                      className="nav-link"
                      href="#"
                      onClick={() => {
                        HandleHeaderCategoryClick(category.key);
                      }}
                    >
                      <span>{category.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
