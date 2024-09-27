import { useState } from "react";
import UsersTable from "../components/UsersTable";
import AddUser from "../components/AddUser";
const AdminDashboard = () => {
  const [addUser, setAddUser] = useState(false);
  const handleClose = () => {
    setAddUser(false);
  };
  return (
    <div className="relative pt-16 bg-gray-50 min-h-screen">
      {addUser && (
        <>
          <div
            onClick={() => setAddUser(false)}
            className="min-h-screen absolute bg-black/60 w-full z-50 top-0 flex items-center justify-center"
          ></div>
          <AddUser close={handleClose} />
        </>
      )}
        <>
        <UsersTable />
        </>
      
      <div className="mt-8 flex justify-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 rounded-lg px-6 py-3 text-white font-extralight shadow-lg"
          onClick={() => setAddUser(true)}
        >
          ADD USER
        </button>
      </div>
    </div>
  );
  
  
};

export default AdminDashboard;
