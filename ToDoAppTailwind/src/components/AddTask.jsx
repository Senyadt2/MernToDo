import React, { useContext, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ApiCalls from "../utils/ApiCalls";
import "./AddTask.css";
import ResetContext from "../GlobalContext/ResetContext";
const AddTask = () => {
  const { setRestart } = useContext(ResetContext);
  const { addToDo } = ApiCalls();
  const [task, setTask] = useState("");
  const [isopen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setTask(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addToDo("add", task)
      .then((res) => {
        console.log(res);
        setRestart((prev) => !prev);
      })
      .catch((ex) => {
        console.log("error while posting data");
      });
  };
  //   console.log(task);
  return (
    <>
      <div className="w-full p-6 h-5 bg-slate-600 flex justify-between items-center">
        <div> </div>
        <div>
          <button onClick={handleOpen} type="button" class="button">
            <span class="button__text">Add Item</span>
            <span class="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                height="18"
                fill="none"
                class="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </div>
      </div>
      {isopen && (
        <div className="fixed rounded-lg w-[auto] h-[100px] px-10 py-20 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-slate-500  border z-50">
          <div className="flex justify-center items-center w-full h-full gap-6">
            <div className="form">
              <input
                className="input"
                name="task"
                placeholder="Type your text"
                required=""
                type="text"
                onChange={handleChange}
              />
              <span className="input-border"></span>
            </div>
            <Button size="small" onClick={handleSubmit} variant="contained">
              Add
            </Button>
            <Button size="small" onClick={handleClose} variant="contained">
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;
