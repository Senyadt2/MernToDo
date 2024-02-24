import React from "react";
import NavBar from "../components/NavBar";
import Tabs from "../components/BasicTabs";
import AddTask from "../components/AddTask";
const Homepage = () => {
  return (
    <div className="w-auto h-auto">
      <NavBar />
      <div className="flex justify-center md:items-center w-full h-[auto]  min-h-[100vh]">
        <div className=" md:w-[70%] h-[auto]">
          <div className="mt-5 mb-5 text-4xl text-center md:text-5xl">
            To-DO-list
          </div>
          <AddTask />
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
