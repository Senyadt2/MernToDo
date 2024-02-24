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
      <div className="w-full bg-slate-500 h-16 flex justify-between px-5 items-center py-10">
        <div className="font-medium text-2xl">To Do App</div>
        <div className="flex justify-center flex-wrap items-center gap-5 ">
          <div className="font-medium text-xl">About Me</div>
          <div className="text-xl">Log-Out</div>
        </div>
      </div>
    </>
  );
}
