import React, { useEffect, useState } from "react";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Dash: React.FC = () => {
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});
  const [loggedInUsersCount, setLoggedInUsersCount] = useState<number>(0);
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  useEffect(() => {
    fetchData();
    fetchLoggedInUsersCount();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shops-backend-28ts.onrender.com/auth/count"
      );
      setCategoryCounts(response.data.categoryCounts);
    } catch (error) {
      console.error("Error fetching category counts:", error);
      alert("Error in fetching category counts");
    }
  };

  const fetchLoggedInUsersCount = async () => {
    try {
      const response = await axios.get(
        "https://shops-backend-28ts.onrender.com/auth/loggedCount"
      );
      setLoggedInUsersCount(response.data.count);
    } catch (error) {
      console.error("Error fetching logged-in users count:", error);
      alert("Error in fetching logged-in users count");
    }
  };

  const totalCategories = Object.values(categoryCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <div>
      <div className="dash-nav">
        <li>
          <img className="logo" src={logo} alt="" />
        </li>
        <li>
          <button className="d-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </div>
      <div className="dash-content">
        <div className="side-nav">
          <div className="side-menu">
            <button className="dash-btn">Dashboard</button>
            <Link to="/search">
              <button className="dash-btn">Search</button>
            </Link>
          </div>
        </div>

        <div className="dash-info">
          <Link to="/shops">
            <div className="dash-menu">
              <h1>Shops</h1>
            </div>
          </Link>

          <Link to="/users">
            <div className="dash-menu">
              {" "}
              <h1>No of Users: {loggedInUsersCount}</h1>
            </div>
          </Link>

          <Link to="/category">
            <div className="dash-menu">
              <h1>
                Total Categories
                <br />
                {totalCategories}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dash;
