import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      // Get data from the userData state (userData state gets updated locally)
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      // Optionally update image if image is set
      image && formData.append("image", image);

      // Make API call
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);

        // Refetch the userData to update page
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  };

  return (
    userData && (
      <div className="flex max-w-lg flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="relative inline-block cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="absolute right-12 bottom-12 w-10"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="user image" />
        )}

        {isEdit ? (
          <input
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={userData.name}
            className="mt-4 max-w-60 bg-gray-100 text-3xl font-medium"
          />
        ) : (
          <p className="mt-4 text-3xl font-medium text-neutral-800">
            {userData.name}
          </p>
        )}

        <hr className="h-[1px] border-none bg-zinc-400" />
        <div>
          <p className="mt-3 text-neutral-500 underline">CONTACT INFORMATION</p>
          <div className="mt-3 grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
            <p className="font-medium">Email ID: </p>
            <p className="text-blue-500">{userData.email}: </p>
            <p className="font-medium">Phone: </p>
            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={userData.phone}
                className="max-w-52 bg-gray-100"
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  className="bg-gray-50"
                />
                <br />
                <input
                  type="text"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  className="bg-gray-50"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>

          <div>
            <p className="mt-3 text-neutral-500 underline">BASIC INFORMATION</p>
            <div className="mt-3 grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }));
                  }}
                  value={userData.gender}
                  className="max-w-20 bg-gray-100"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-400">{userData.gender}</p>
              )}

              <p className="font-medium">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  onChange={(e) => {
                    setUserData((prev) => ({ ...prev, dob: e.target.value }));
                  }}
                  value={userData.dob}
                  className="max-w-28 bg-gray-100"
                />
              ) : (
                <p className="text-gray-400">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="border-primary hover:bg-primary rounded-full border px-8 py-2 hover:text-white"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border-primary hover:bg-primary rounded-full border px-8 py-2 hover:text-white"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
