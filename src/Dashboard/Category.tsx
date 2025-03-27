import React, { useEffect, useState } from "react";

import axios from "axios";

const Category: React.FC = () => {
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    fetchData();
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
