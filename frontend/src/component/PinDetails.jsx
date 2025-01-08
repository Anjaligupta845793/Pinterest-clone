import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinProvider";
import FullLoader from "./FullLoader";
import Navbar from "./Navbar";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { userData } from "../context/UserProvider";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const PinDetails = () => {
  const [Pin, setPin] = useState({});
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [PinTitle, setPinTitle] = useState("");
  const [PinDescription, setPinDescription] = useState("");
  const navigate = useNavigate();
  const {
    SinglePin,
    AddComments,
    deletePin,
    btnLoading,
    editPin,
    pinbtnLoading,
    deleteComment,
  } = PinData();
  const { user } = userData();
  const [comment, setcomment] = useState("");
  useEffect(() => {
    const pin = SinglePin(id)
      .then((pin) => setPin(pin))
      .catch((err) => console.log(err));
  }, []);
  const editHandler = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <Navbar />
      {Pin.image ? (
        <div className="py-20 w-full">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10 px-6">
            {/* Image Section */}
            <img
              src={Pin.image.url}
              alt="Pin"
              className="h-[400px] w-[300px] rounded-lg shadow-md object-cover"
            />

            {/* Content Section */}
            <div className="w-full px-5">
              {/* Title and Actions */}
              <div className="flex justify-between items-center mb-4">
                {edit ? (
                  <input
                    type="text"
                    placeholder="Edit Title"
                    className="max-w-[500px] border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500"
                    value={PinTitle}
                    onChange={(e) => setPinTitle(e.target.value)}
                  />
                ) : (
                  <p className="font-bold text-2xl">{Pin.name}</p>
                )}
                {user && user._id === Pin.user._id && (
                  <div className="flex gap-2">
                    <FaRegEdit
                      size={20}
                      className="cursor-pointer text-gray-600 hover:text-gray-800"
                      onClick={editHandler}
                    />
                    <MdDelete
                      size={20}
                      className="cursor-pointer text-red-600 hover:text-red-800"
                      onClick={() => deletePin(Pin._id, navigate)}
                    />
                  </div>
                )}
              </div>

              {/* Description and Edit Section */}
              {edit ? (
                <div className="space-y-4">
                  <textarea
                    placeholder="Edit Description"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500"
                    value={PinDescription}
                    onChange={(e) => setPinDescription(e.target.value)}
                  ></textarea>
                  <button
                    className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => editPin(Pin._id, PinTitle, PinDescription)}
                  >
                    {pinbtnLoading ? <Loader /> : "Update"}
                  </button>
                </div>
              ) : (
                <p className="my-4 text-gray-700">{Pin.discription}</p>
              )}

              {/* User Information */}
              <div className="flex items-center gap-4 my-5 border-b border-gray-300 pb-4">
                <div className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  <Link to={`/UserProfile/${Pin.user._id}`}>
                    {" "}
                    {Pin.user.name.slice(0, 1)}
                  </Link>
                </div>
                <div>
                  <p className="font-semibold">{Pin.user.name}</p>
                  <p className="text-sm text-gray-600">
                    {`${Pin.followers?.length || 0} follower${
                      Pin.followers?.length === 1 ? "" : "s"
                    }`}
                  </p>
                </div>
              </div>

              {/* Comment Section */}
              <div className="space-y-4">
                {/* Add Comment */}
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {user.name.slice(0, 1)}
                  </div>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-grow border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                  />
                  <button
                    className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => AddComments(Pin._id, comment, setcomment)}
                    disabled={btnLoading}
                  >
                    {btnLoading ? <Loader /> : "Add+"}
                  </button>
                </div>

                {/* Display Comments */}
                <div className="my-6 space-y-4">
                  {Pin.comments.length === 0 ? (
                    <p className="text-gray-600">No comments yet</p>
                  ) : (
                    Pin.comments.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-start border-b border-gray-200 pb-4"
                      >
                        <div className="flex gap-3">
                          <div className="w-9 h-9 bg-gray-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
                            <Link to={`/UserProfile/${item._id}`}>
                              {item.name.slice(0, 1)}
                            </Link>
                          </div>
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-gray-600">{item.comment}</p>
                          </div>
                        </div>
                        {user && user._id === item.user && (
                          <MdDelete
                            size={20}
                            className="cursor-pointer text-red-600 hover:text-red-800"
                            onClick={() => deleteComment(Pin._id, item._id)}
                          />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FullLoader />
      )}
    </div>
  );
};

export default PinDetails;
