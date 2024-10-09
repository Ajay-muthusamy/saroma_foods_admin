import React, { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const SidebarLay = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div className="flex h-screen overflow-hidden font-semibold">
        <aside
          className={`fixed inset-y-0 left-0 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition duration-300 ease-in-out bg-gray-800 z-30 w-60 md:block`}
        >
          <div className="h-screen text-white p-5">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <button
                className="text-2xl md:hidden"
                onClick={toggleSidebar}
                aria-label="Close Sidebar"
              >
                <AiOutlineClose />
              </button>
            </div>
            <ul className="space-y-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:bg-gray-700 px-4 py-2 rounded ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  New Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dash/productList"
                  className={({ isActive }) =>
                    `hover:bg-gray-700 px-4 py-2 rounded ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customers"
                  className={({ isActive }) =>
                    `hover:bg-gray-700 px-4 py-2 rounded ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  Customers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `hover:bg-gray-700 px-4 py-2 rounded ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>

        <main
          className={`flex-1 p-5 transition-all duration-300 ${
            isOpen ? "ml-60" : "ml-0"
          } md:ml-60 `}
          onClick={() => isOpen && toggleSidebar()}
        >
          <div className="md:hidden flex items-center justify-between">
            <button
              className="text-3xl text-gray-800 z-10"
              onClick={toggleSidebar}
              aria-label="Open Sidebar"
            >
              <AiOutlineMenu />
            </button>
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>
        </main>
      </div>
      <Outlet />
    </div>
  );
};

export default SidebarLay;
