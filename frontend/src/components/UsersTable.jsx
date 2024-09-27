/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { deleteUser, getUsers, editUser } from "../slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

 
const UsersTable = () => {

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const users = useSelector(state => state.admin.users); 
  const [editedUserId, setEditedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]); 

  const handleDeleteUser = userId => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleEditUser = async (userId, updatedUserData) => {
    console.log(userId);
    dispatch(editUser({ id: userId, data: updatedUserData })).then(
      res => {console.log("edit Data", res)
      setEditedUserId(null);
      setEditedUserData({});
      dispatch(getUsers());}
    );
  };
const [searchQuery, setSearchQuery] = useState("");



return (
  <>
    <div className="flex flex-col items-center justify-center mt-5">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Admin Dashboard</h1>
      
      <div className="flex justify-center w-full mb-4">
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto w-full max-w-4xl mx-auto"> {/* Centering and limiting max width */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">ID</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users
              ?.filter(user =>
                `${user.name} ${user.email}`
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map(user => (
                <tr key={user._id} className="bg-gray-100 border-b transition duration-200 hover:bg-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <pre>{user._id}</pre>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {editedUserId === user._id ? (
                      <input
                        className="border border-gray-300 rounded-lg px-2 py-1"
                        type="text"
                        defaultValue={editedUserData.name || user.name}
                        onChange={e =>
                          setEditedUserData({
                            ...editedUserData,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {editedUserId === user._id ? (
                      <input
                        className="border border-gray-300 rounded-lg px-2 py-1"
                        type="email"
                        defaultValue={editedUserData.email || user.email}
                        onChange={e =>
                          setEditedUserData({
                            ...editedUserData,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {editedUserId === user._id ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-extralight py-1 px-4 rounded transition duration-200"
                        onClick={() => handleEditUser(user._id, editedUserData)}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="mr-4 bg-yellow-500 hover:bg-yellow-600 text-white font-extralight py-1 px-4 rounded transition duration-200"
                          onClick={() => setEditedUserId(user._id)}
                          disabled={userInfo._id === user._id}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-extralight py-1 px-4 rounded transition duration-200"
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={userInfo._id === user._id}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);


};

export default UsersTable;
