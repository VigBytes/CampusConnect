import React from "react";
import { SignIn } from "@clerk/react";
import {
      Building2,
      Users,
      CalendarDays,
      BookOpen,
} from "lucide-react";

const Login = () => {
      return (
            <div className="min-h-screen bg-[#eee4d0] flex items-center justify-center p-6">

                  <div className="w-full max-w-6xl min-h-175 bg-[#f8f3e8] border-2 border-[#3b2922] shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-2">

                        {/* LEFT SIDE */}
                        <div className="relative bg-[#651d2b] text-[#f8f3e8] p-10 flex flex-col justify-center overflow-hidden">

                              {/* Background text */}
                              <div className="absolute text-[180px] font-serif font-bold opacity-5 select-none">
                                    IIT ISM
                              </div>

                              <div className="relative z-10">

                                    {/* Logo */}
                                    <div className="flex items-center gap-3 mb-8">
                                          <div className="w-14 h-14 rounded-xl border-2 border-[#c7a86b] flex items-center justify-center">
                                                <Building2 size={30} className="text-[#c7a86b]" />
                                          </div>

                                          <div>
                                                <h1 className="text-3xl font-serif font-bold">
                                                      CampusConnect
                                                </h1>

                                                <p className="text-sm text-[#c7a86b]">
                                                      Your Campus. Your Community.
                                                </p>
                                          </div>
                                    </div>

                                    {/* Hero */}
                                    <h2 className="text-5xl font-serif font-bold leading-tight mb-6">
                                          Where campus
                                          <br />
                                          comes alive.
                                    </h2>

                                    <p className="text-lg text-[#eee4d0] max-w-md mb-10">
                                          Connect with students, discover societies, join events,
                                          and stay connected with everything happening around campus.
                                    </p>

                                    {/* Features */}
                                    <div className="grid grid-cols-2 gap-4 max-w-md">

                                          <div className="border border-[#c7a86b]/40 p-4 rounded-lg">
                                                <Users className="text-[#c7a86b] mb-2" size={22} />
                                                <p className="font-semibold">Communities</p>
                                                <p className="text-xs opacity-70">
                                                      Find your people
                                                </p>
                                          </div>

                                          <div className="border border-[#c7a86b]/40 p-4 rounded-lg">
                                                <CalendarDays className="text-[#c7a86b] mb-2" size={22} />
                                                <p className="font-semibold">Events</p>
                                                <p className="text-xs opacity-70">
                                                      Never miss out
                                                </p>
                                          </div>

                                          <div className="border border-[#c7a86b]/40 p-4 rounded-lg">
                                                <BookOpen className="text-[#c7a86b] mb-2" size={22} />
                                                <p className="font-semibold">Societies</p>
                                                <p className="text-xs opacity-70">
                                                      Explore campus life
                                                </p>
                                          </div>

                                    </div>

                              </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex items-center justify-center p-8 md:p-12">

                              <div className="w-full max-w-md">

                                    <div className="text-center mb-6">
                                          <h2 className="text-3xl font-serif font-bold text-[#3b2922]">
                                                Welcome Back
                                          </h2>

                                          <p className="text-[#6b5b50] mt-2">
                                                Sign in to your campus account
                                          </p>
                                    </div>

                                    {/* CLERK LOGIN */}
                                    <SignIn
                                          appearance={{
                                                elements: {
                                                      rootBox: "w-full",
                                                      card: "shadow-none border-0 bg-transparent w-full",
                                                      headerTitle: "font-serif text-[#3b2922]",
                                                      headerSubtitle: "text-[#6b5b50]",
                                                      formButtonPrimary:
                                                            "bg-[#651d2b] hover:bg-[#4f1621] text-white",
                                                      formFieldInput:
                                                            "border-[#c7a86b] focus:border-[#651d2b]",
                                                      formFieldLabel: "text-[#3b2922]",
                                                      footerActionLink:
                                                            "text-[#651d2b] hover:text-[#3b2922]",
                                                },
                                          }}
                                    />

                              </div>
                        </div>

                  </div>
            </div>
      );
};

export default Login;