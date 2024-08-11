import React from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  resetUserState,
} from "../../redux/user/userSlice";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const [image, setImage] = useState(undefined);
  const [imgPercent, setImgPercent] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateWorks, setUpdateWorks] = useState(false);

  const fileRef = useRef();
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress callback
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPercent(progress.toFixed(2));
      },
      (error) => {
        // Error callback
        setImgError(true);
        console.log(error);
      },
      () => {
        // Completion callback
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };
  const handleUpdate = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFail(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateWorks(true);
    } catch (err) {
      dispatch(updateUserFail(err));
      console.error("Error sending formData:", err);
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      dispatch(signOut());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      // if (data.success === false) {
      //   dispatch(deleteUserFail(data));
      //   return;
      // }
      // dispatch(deleteUserSuccess());
      dispatch(resetUserState());
      navigate("/");
    } catch (err) {
      // dispatch(deleteUserFail(err));
      console.error("Error deleting user:", err);
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOut());
      await fetch("/api/auth/signout");
      navigate("/signin");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <div>
      <div className="font-semibold text-4xl text-center mt-10">Profile</div>
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col max-w-lg">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          id="profilePicture"
        />

        {/* firebase storage rules 
          allow read;
          allow write : if
          request.resource.size < 2 * 1024 * 1024 &&
          request.resource.contentType.mathes("image/.*")  */}
        <img
          className="h-20 w-20 rounded-full self-center m-3 cursor-pointer object-cover "
          onClick={() => fileRef.current.click()}
          src={formData.profilePicture || currentUser.profilePicture}
          alt="Profile Picture"
        />
        <div className="text-red-700 text-center m-2">
          {imgPercent > 0 && imgPercent < 100 ? (
            <div className="text-green-700 text-center m-2">
              Uploading {imgPercent}%
            </div>
          ) : imgPercent >= 100 ? (
            <div className="text-green-700 text-center m-2">
              Image uploaded successfully
            </div>
          ) : imgError ? (
            "Error uploading image (file size must be less than 2 MB)"
          ) : (
            " "
          )}
        </div>
        <input
          onChange={handleUpdate}
          defaultValue={currentUser.username}
          type="text"
          placeholder="Username"
          id="username"
        />
        <input
          onChange={handleUpdate}
          defaultValue={currentUser.email}
          type="email"
          placeholder="Email"
          id="email"
        />
        <input
          onChange={handleUpdate}
          type="password"
          placeholder="Password"
          id="password"
        />
        <button
          type="submit"
          className="animate-background-shine border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 m-2 rounded p-2 self-center w-full "
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <div className="flex justify-between m-3 ">
          <button
            onClick={handleDelete}
            className="text-red-700 border border-red-200 rounded-lg px-2 shadow-sm "
          >
            Delete account
          </button>
          <button
            onClick={handleSignOut}
            className=" p-2 self-center w-1/4 text-black border-slate-400 rounded-lg px-2 shadow-sm"
          >
            Sign Out
          </button>
        </div>
        <p className="text-red-600 ">{error && "Something went wrong!"}</p>
        <p className="text-green-600 ">
          {updateWorks && "User updated successfully"}
        </p>
      </form>
    </div>
  );
};

export default Profile;
