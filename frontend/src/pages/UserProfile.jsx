import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userData } from "../context/UserProvider";
import { PinData } from "../context/PinProvider";
import Loader from "../component/Loader";
import PinCard from "../component/PinCard";

const UserProfile = ({ logedinuser }) => {
  const [user, setUser] = useState({});
  const [isFollow, setIsFollow] = useState(false);
  const { id } = useParams();
  const { UserProfile, followandUnfollowUser } = userData();
  const { pin } = PinData();
  const navigate = useNavigate();

  // Fetch user profile data
  useEffect(() => {
    if (!id) return;

    UserProfile(id)
      .then((data) => {
        setUser(data);
        // Check if the logged-in user is following this user
        if (data?.followers?.includes(logedinuser._id)) {
          setIsFollow(true);
        }
      })
      .catch((error) => console.error("Error fetching user profile:", error));
  }, [id, UserProfile, logedinuser._id]);

  // Handler for follow/unfollow
  const followHandler = (userId) => {
    setIsFollow((prevState) => !prevState);
    followandUnfollowUser(userId)
      .then((data) => console.log("Follow/Unfollow response:", data))
      .catch((err) => console.error("Error in followHandler:", err));
  };

  // Filter user pins
  const userPins = pin ? pin.filter((pin) => pin.user === user._id) : [];

  return (
    <div className="py-20">
      {user.name ? (
        <div className="max-w-[860px] text-center mx-auto">
          {/* User Avatar */}
          <div className="p-4 flex justify-center mx-auto bg-gray-400 w-20 h-20 text-2xl font-bold mt-7 rounded-full items-center">
            {user.name.slice(0, 1)}
          </div>
          <p className="text-3xl my-2 font-bold">{user.name}</p>
          <p className="text-gray-400">{user.email}</p>
          <p className="font-semibold">{`${
            user.followers?.length || 0
          } followers · ${user.following?.length || 0} following`}</p>

          {/* Follow/Unfollow Button */}
          {user._id !== logedinuser._id && (
            <button
              className={`px-6 py-3 my-3 rounded-full ${
                isFollow ? "bg-gray-300" : "bg-red-500"
              }`}
              onClick={() => followHandler(user._id)}
            >
              {isFollow ? "Following" : "Follow"}
            </button>
          )}

          {/* User Pins */}
          <div className="columns-1 sm:columns-2 md:columns-4 lg:columns-5 gap-4 mx-auto p-4 max-w-[1360px]">
            {userPins.map((item, index) => (
              <PinCard item={item} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserProfile;
