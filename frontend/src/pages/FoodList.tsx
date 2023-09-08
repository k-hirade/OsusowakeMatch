import React, { useState, useEffect } from "react";
import axios from "axios";
import FooterBar from "../components/FooterBar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { myUserState } from "../utils/myUserState";

interface FoodItem {
  foodId: number;
  userId: number;
  userName: string;
  avatarUrl: string;
  foodName: string;
  foodImageUrl: string;
}

const FoodList: React.FC = () => {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const myUser = useRecoilValue(myUserState); // RecoilのmyUserStateを使用

  useEffect(() => {
    const fetchData = async () => {
      try {
        // userIdを使用してAPIを呼び出す
        const response = await axios.get(
          `http://localhost:3000/foods/${myUser?.userId}`,
        );
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching the food data:", error);
      }
    };
    fetchData();
  }, [myUser?.userId]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header title="Food List" className="z-50" />

      {/* Scrollable Food Items Grid */}
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 p-4">
          {foodData.map((item) => (
            <div key={item.foodId} className="relative bg-white p-4 rounded-xl shadow-md">
              <Link to={`/food-details/${item.foodId}`}>
                <img
                  src={
                    item.foodImageUrl.startsWith("http")
                      ? item.foodImageUrl
                      : `http://localhost:3000/images/foods/${item.foodImageUrl}`
                  }
                  alt={item.userName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-white bg-opacity-50 text-black rounded">
                  {item.userName}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <FooterBar />
    </div>
  );
};

export default FoodList;
