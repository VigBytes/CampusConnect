import React from "react";
import { useNavigate, Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import { CirclePlus, LogOut, Building2 } from "lucide-react";
import { UserButton, useClerk } from "@clerk/react";
import { dummyUserData } from "./../assets/assets";

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
      const navigate = useNavigate();
      const user = dummyUserData;
      const { signOut } = useClerk();

      return (
            <div className={`w-60 ${sidebarOpen ? "xl:w-72" : ""} bg-[#f8f3e8] border-r-2 border-[#d5c6ae] flex flex-col justify-between items-center max-sm:absolute max-sm:top-0 max-sm:bottom-0 max-sm:z-20 ${sidebarOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out`}>

                  {/* Top */}
                  <div className="w-full">

                        {/* Logo / Brand */}
                        <div onClick={() => navigate("/")} className="cursor-pointer px-6 py-5 flex items-center gap-3 group">

                              {/* Campus Icon */}
                              <div className="w-11 h-11 rounded-lg bg-[#651d2b] text-[#c7a86b] flex items-center justify-center border border-[#c7a86b] shadow-sm group-hover:scale-105 transition">
                                    <Building2 className="w-6 h-6" />
                              </div>

                              {/* Brand */}
                              <div>
                                    <h1 className="text-xl font-serif font-bold text-[#3b2922] tracking-tight">
                                          CampusConnect
                                    </h1>

                                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#8c7768]">
                                          Campus Community
                                    </p>
                              </div>

                        </div>

                        {/* Heritage Divider */}
                        <div className="px-6 mb-6">
                              <div className="h-[2px] bg-[#651d2b]" />
                              <div className="h-[1px] bg-[#c7a86b] mt-1" />
                        </div>

                        {/* Navigation */}
                        <MenuItems setSidebarOpen={setSidebarOpen} />

                        {/* Create Post */}
                        <Link to="/create-post" onClick={() => setSidebarOpen(false)} className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-[#651d2b] hover:bg-[#4f1621] text-[#f8f3e8] border border-[#651d2b] shadow-sm hover:shadow-md active:scale-95 transition-all duration-200">
                              <CirclePlus className="w-5 h-5" />
                              <span className="font-medium">Create Post</span>
                        </Link>

                  </div>

                  {/* User */}
                  <div className="w-full border-t border-[#d5c6ae] p-4 px-5 bg-[#eee4d0]">

                        <div className="flex items-center gap-3">

                              {/* Clerk User */}
                              <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />

                              {/* User Info */}
                              <div className="min-w-0">

                                    <h1 className="text-sm font-semibold text-[#3b2922] truncate">
                                          {user.full_name}
                                    </h1>

                                    <p className="text-xs text-[#8c7768] truncate">
                                          @{user.username}
                                    </p>

                              </div>

                              {/* Logout */}
                              <button onClick={() => signOut()} className="ml-auto p-2 rounded-lg text-[#8c7768] hover:text-[#651d2b] hover:bg-[#f8f3e8] transition" title="Logout">
                                    <LogOut className="w-5 h-5" />
                              </button>

                        </div>

                  </div>

            </div>
      );
};

export default SideBar;