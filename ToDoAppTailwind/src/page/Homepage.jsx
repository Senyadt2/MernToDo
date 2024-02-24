import React from "react";
import NavBar from "../components/NavBar";
import Tabs from "../components/BasicTabs";
import AddTask from "../components/AddTask";
const Homepage = () => {
  return (
    <div className="w-auto h-auto">
      <NavBar />
      <div className="flex justify-center items-center w-full h-[auto] mt-[10vh] min-h-[100vh]">
        <div className="w-[50%] h-[auto]">
          <AddTask />
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
