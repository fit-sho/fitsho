"use client";
import { useState } from "react";

export const LoginForm = () => {
  return (
    <section>
      <div className="min-h-[80vh] flex justify-center items-center pb-16 bg-[radial-gradient(ellipse_250%_100%_at_bottom_right,#183EC2,#EAEEFE_35%)]">
        {/* Login Form Box */}
        <div
          className="rounded-2xl shadow-2xl p-8 md:w-[80%] md:max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden 
        bg-[radial-gradient(ellipse_250%_100%_at_bottom_right,#183EC2,#EAEEFE_25%)]"
        >
          {/* Left Side */}
          <div className="">
            <h1 className="section-title mb-6"> Welcome </h1>
            <hr />
          </div>
          {/* Right Side */}
          <div className="hidden md:block">
            <h1 className="section-description">Login using google</h1>
            <button className="btn btn-primary w-full mt-6">
              Login with Google Account
            </button>
          </div>

          <form className="">
            {/* Email Input */}
            <div className="space-y-3">
              <div className="block text-base font-medium text-gray-700 mt-3">
                Email or Username
              </div>
              <input
                type="email"
                id="email"
                className="px-3 py-2 border border-gray-300 rounded-lg md:w-[80%] focus:outline-none focus:ring focus:border-blue-300"
                placeholder="you@example.com"
                required
              />
            </div>
            {/* Password Input */}
            <div className="space-y-3">
              <div className="block text-base font-medium text-gray-700 mt-3">
                Password
              </div>
              <input
                type="password"
                id="password"
                className="px-3 py-2 border border-gray-300 rounded-lg md:w-[80%] focus:outline-none focus:ring focus:border-blue-300"
                placeholder="********"
                required
              />
            </div>
            {/* Submit Button */}

            <button
              type="submit"
              className="btn btn-google md:w-[80%] w-full mt-6"
            >
              Login
            </button>

            <div className="md:flex md:flex-row md:w-[80%] md:justify-between mt-2 md:mt-4 ">
              <p className="mt-2">
                <a href="/signup" className="underline">
                  Sign up
                </a>
              </p>
              <p className="mt-2">
                <a href="/resetpassword" className="underline">
                  Forgot Password
                </a>
              </p>
            </div>
            <div className="md:hidden block">
              <button className="btn btn-google w-full mt-6">
                Login with Google Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
