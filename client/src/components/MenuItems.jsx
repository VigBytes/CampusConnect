import React from "react";
import { NavLink } from "react-router-dom";
import { menuItemsData } from "./../assets/assets";

const MenuItems = ({ setSidebarOpen }) => {
      return (
            <div className="px-4 space-y-1.5 text-[#6b5b50] font-medium">
                  {menuItemsData.map(({ to, label, Icon }) => (
                        <NavLink key={to} to={to} end={to === "/"} onClick={() => setSidebarOpen(false)} className={({ isActive }) => `group relative px-4 py-3 flex items-center gap-3 rounded-lg transition-all duration-200 ease-in-out ${isActive ? "bg-[#651d2b] text-[#f8f3e8] shadow-sm" : "text-[#6b5b50] hover:bg-[#eee4d0] hover:text-[#651d2b]"}`}>
                              {({ isActive }) => (
                                    <>
                                          {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-[#c7a86b]" />}
                                          <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "text-[#c7a86b]" : "text-[#8c7768] group-hover:text-[#651d2b] group-hover:scale-105"}`} />
                                          <span className="text-sm">{label}</span>
                                    </>
                              )}
                        </NavLink>
                  ))}
            </div>
      );
};

export default MenuItems;