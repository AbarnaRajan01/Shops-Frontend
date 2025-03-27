import React, { useEffect, useState } from "react";

import axios from "axios";

const Category: React.FC = () => {
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/count`);
      setCategoryCounts(response.data.categoryCounts);
    } catch (error) {
      console.error("Error fetching category counts:", error);
      alert("Error in fetching category counts");
    }
  };

  return (
    <div>
      <div className="category">
        {Object.keys(categoryCounts).map((category) => (
          <div className="categories" key={category}>
            {category}: {categoryCounts[category]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
