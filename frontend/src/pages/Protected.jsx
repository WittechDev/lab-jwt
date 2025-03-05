import React, { useEffect, useState } from "react";

import http from "../http";

function Protected() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await http.get("/users");
    setUsers(response.data || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-16">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Users
        </h2>
        <div>
          {users.length > 0 &&
            users.map((user) => (
              <a
                href="#"
                className="block max-w-sm p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {user.username}
                </h5>
                <p className="font-normal text-gray-700">
                  Email: {user.email || "-"}
                  <br />
                  Updated:{" "}
                  {user.updatedAt
                    ? `${new Date(
                        user.updatedAt
                      ).toLocaleDateString()} ${new Date(
                        user.updatedAt
                      ).toLocaleTimeString()}`
                    : "-"}
                </p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Protected;
