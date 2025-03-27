import React from "react";
import { ShopList } from "../shopData";
const Shops = () => {
  return (
    <div>
      <h1>Shops For you<hr/></h1>
      <div className="Card">
        {ShopList.map((item) => (
          <div className="p-cards">
            <div>
              <img className='shop-img'src={item.picture} alt={item.name} />
            </div>
            <div className="card-content">
              <p className="name">{item.name}</p>
                <p className="category">{item.category}</p>
                <p className="address">{item.address}</p>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shops;
