import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/api";

const Users = () => {
  const [userList, setUserList] = useState([]);

  const getUserApiCall = async () => {
    try {
      const data = await getAllUsers();
      setUserList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserApiCall();
  }, []);

  const renderUsersByRole = (role) => {
    const filteredUsers = userList?.filter((user) => user.role === role);

    if (!filteredUsers || filteredUsers.length <= 0) {
      return null; 
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <div
            key={user?.id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-2">{user?.username}</h2>
            <p className="text-gray-600 mb-1">{user?.email}</p>
            <p className="text-gray-500 font-bold">Role - {user?.role}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <section>
        {renderUsersByRole("operator") && (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-gray-700">Operators</h1>
            {renderUsersByRole("operator")}
          </>
        )}
      </section>

      <section className="mt-6">
        {renderUsersByRole("manager") && (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-gray-700">Managers</h1>
            {renderUsersByRole("manager")}
          </>
        )}
      </section>

      <section className="mt-6">
        {renderUsersByRole("engineer") && (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-gray-700">Engineers</h1>
            {renderUsersByRole("engineer")}
          </>
        )}
      </section>
    </div>
  );
};

export default Users;
