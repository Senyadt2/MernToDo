import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  return (
    <>
      <div className="flex items-center justify-between w-full h-16 px-3 md:px-5 md:py-10 bg-slate-500">
        <div className="text-xl font-medium md:text-2xl">To Do App</div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 ">
          <div className="text-base font-medium md:text-xl">About Me</div>
          <div className="text-base font-medium md:text-xl">Log-Out</div>
        </div>
      </div>
    </>
  );
}
