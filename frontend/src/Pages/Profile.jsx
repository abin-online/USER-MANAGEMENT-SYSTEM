import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { updateUser } from "../slices/userSlice";
import { setCredentials, updateImage } from "../slices/authSlice";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preview, setPreview] = useState();
  const [phone , setPhone] = useState()
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth); 

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } 
    else {
      if(phone.toString().length < 10 || phone.toString().length > 10 ) {
        toast.error('Phone number should be 10 digits')
      }
      else{
      let imageUrl;
      if (image) {
        // Create a new FormData instance
        const formData = new FormData();
        formData.append("avatar", image);

        // Send the image to the server
        const imageResponse = await fetch(
          "http://localhost:5000/api/users/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!imageResponse.ok) {
          toast.error("Error uploading image");
          return;
        }
        setPreview("");

        // Get the URL of the uploaded image
        imageUrl = await imageResponse.text();
        // Append the image URL to the form data
        formData.append("imageUrl", imageUrl);
      }

      dispatch(updateUser({ name, password, phone ,  imageUrl })).then(action => {
        if (action.meta.requestStatus === "rejected") {
          const errorMessage = "Some Error occurred";
          toast.error(errorMessage);
        } else {
          console.log(action.payload);
          dispatch(setCredentials(action.payload));
          toast.success("Credentials Updated");
        } 
      });
    }
    }
  };
  const handleFileChange = event => {
    setImage(event.target.files[0]);
    // Create a preview URL
    let reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    event.target.value = "";
  };
  const handleDelete = () => {
  dispatch(updateImage(""))
  };
  const src = preview
    ? preview
    : userInfo.image
    ? "http://localhost:5000/" + userInfo.image
    : "https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-vector-icon-with-white-background-png-image_5168884.jpg";

    return (
      <>
        <main className="w-screen pt-5 flex justify-center min-h-screen bg-gray-100">
          <div className="p-4">
            <div className="w-full max-w-xl px-6 pb-8 mt-8 bg-white shadow-md rounded-lg">
              <h2 className="pl-6 text-2xl font-bold text-gray-800">Update Profile</h2>
              <div className="grid max-w-2xl mx-auto mt-8">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    {src && (
                      <img
                        src={src}
                        alt="chosen"
                        className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300"
                      />
                    )}
                    <div className="flex flex-col space-y-5 sm:ml-8">
                      <input
                        onChange={handleFileChange}
                        type="file"
                        name="avatar"
                        id="file-input"
                        className="sr-only"
                      />
                      <label
                        htmlFor="file-input"
                        className="py-2 px-4 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
                      >
                        Change Your Picture
                      </label>
    
                      <button
                        onClick={handleDelete}
                        type="button"
                        className="py-2 px-4 text-base font-medium text-indigo-900 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      >
                        Delete Picture
                      </button>
                    </div>
                  </div>
    
                  <div className="mt-8 text-gray-800">
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div className="w-full">
                        <label
                          htmlFor="fullname"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Your Full Name
                        </label>
                        <input
                          onChange={e => setName(e.target.value)}
                          type="text"
                          id="fullname"
                          className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="Your full name"
                          defaultValue={userInfo.name}
                          required
                        />
                      </div>
                    </div>
    
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="your.email@mail.com"
                        required
                        value={userInfo.email}
                        readOnly
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Phone No
                      </label>
                      <input
                        onChange={e => setPhone(e.target.value)}
                        type="number"
                        id="phone"
                        defaultValue={userInfo.phone}
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="phone no:"
                      />
                    </div>
    
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="Password"
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <input
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirmPassword"
                        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </>
    );
    
};

export default Profile;
