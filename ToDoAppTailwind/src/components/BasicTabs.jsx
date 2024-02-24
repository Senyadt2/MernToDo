import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import ApiCalls from "../utils/ApiCalls";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import ResetContext from "../GlobalContext/ResetContext";
import Button from "@mui/material/Button";
import CheckBox from "./CheckBox";
import SkeletonLayout from "./SkeletonLayout";
import "./CheckBoxCss.css";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const { restart, setRestart } = React.useContext(ResetContext);

  const { fetchToDos, deleteToDo, updateToDo, completeTask } = ApiCalls();
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [todos, setTodos] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    async function fetchdata() {
      const response = await fetchToDos();

      setTodos(response);
      setLoading(false);
    }
    fetchdata();
  }, [restart]);

  const [completedTodos, setCompletedTodos] = React.useState([]);
  /* The code snippet you provided is utilizing the `React.useCallback` hook to create a memoized
callback function named `filterCompletedTodos`. This function filters the `todos` array to find
items where the `done` property is `true`, and then sets the filtered data in the `completedTodos`
state. */
  const filterCompletedTodos = React.useCallback(() => {
    const completedData = todos.filter((item) => item.done === true);
    setCompletedTodos(completedData);
  }, [todos]);
  React.useEffect(() => {
    filterCompletedTodos(); // Call the function to filter completed todos
  }, [todos, filterCompletedTodos]);

  const [pendingToDos, setPendingToDos] = React.useState([]);
  const filterpendingData = React.useCallback(() => {
    const pendingData = todos.filter((item) => item.done === false);
    setPendingToDos(pendingData);
  });
  React.useEffect(() => {
    filterpendingData();
  }, [todos, filterpendingData]);

  const handleDelete = (id) => {
    deleteToDo(`delete/${id}`).then((res) => {
      setRestart((prev) => !prev);
    });
  };

  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState();
  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [text, setText] = React.useState("");
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setText(value);
  };

  const handleSubmit = (e) => {
    // console.log(selectedId + ":" + text);
    e.preventDefault();
    updateToDo(`update/${selectedId}`, text)
      .then((res) => {
        setRestart((prev) => !prev);
      })
      .catch((ex) => console.log("error while updating" + ex));
  };

  /* The code snippet you provided is defining a state variable `isChecked` and a function `handleTick`
 to update that state variable. Send as props to CheckBox.jsx*/

  const idStore = (id) => {
    setSelectedId(id);
  };
  const handleCheck = (id, e) => {
    const { checked } = e.target;

    completeTask(`done/${id}`, checked)
      .then((res) => {
        setRestart((prev) => !prev);
      })
      .catch((ex) => console.log(ex));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="View" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <table class="table  table-striped">
          {loading ? (
            <SkeletonLayout />
          ) : (
            <>
              <thead>
                <tr>
                  <th scope="col" className="w-[17%] text-center">
                    #
                  </th>

                  <th scope="col" className="text-center">
                    Name
                  </th>
                  <th colSpan="2" scope="col" className="text-center ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos &&
                  todos.map((item, inbdex) => (
                    <tr key={inbdex}>
                      {/* <th scope="row">{inbdex + 1}</th> */}
                      <td className="">
                        <div className="text-center">
                          <label className="checkbox-container">
                            <input
                              className="custom-checkbox"
                              checked={item.done === true ? true : false}
                              onClick={(e) => handleCheck(item._id, e)}
                              type="checkbox"
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </td>
                      <td
                        className={`text-center text-lg ${
                          item.done === true ? "line-through" : ""
                        }`}
                      >
                        {item.task}
                      </td>
                      <td className="flex justify-center gap-5 ">
                        <FaRegEdit
                          onClick={() => handleOpen(item._id)}
                          className="text-2xl cursor-pointer"
                        />
                        <MdOutlineDelete
                          className="text-2xl cursor-pointer"
                          onClick={() => handleDelete(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </table>
      </CustomTabPanel>
      {/* //pending table  */}
      <CustomTabPanel value={value} index={1}>
        <table class="table">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col" className="w-[17%] text-center">
                #
              </th>

              <th scope="col" className="text-center">
                Name
              </th>
              <th colSpan="2" scope="col" className="text-center ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingToDos &&
              pendingToDos.map((item, inbdex) => (
                <tr key={inbdex}>
                  {/* <th scope="row">{inbdex + 1}</th> */}
                  <td className="">
                    <div className="text-center">
                      <label className="checkbox-container">
                        <input
                          className="custom-checkbox"
                          checked={item.done === true ? true : false}
                          onClick={(e) => handleCheck(item._id, e)}
                          type="checkbox"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    {/* <input
                          type="checkbox"
                          checked={item.done === true ? true : false}
                          onClick={(e) => handleCheck(item._id, e)}
                        /> */}
                  </td>
                  <td
                    className={`text-center  text-lg ${
                      item.done === true ? "line-through" : ""
                    }`}
                  >
                    {item.task}
                  </td>
                  <td className="flex justify-center gap-5 ">
                    <FaRegEdit
                      onClick={() => handleOpen(item._id)}
                      className="text-2xl cursor-pointer"
                    />
                    <MdOutlineDelete
                      className="text-2xl cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CustomTabPanel>

      {/* completed  */}
      <CustomTabPanel value={value} index={2}>
        <table class="table">
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col" className="w-[17%] text-center">
                #
              </th>

              <th scope="col" className="text-center">
                Name
              </th>
              <th colSpan="2" scope="col" className="text-center ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {completedTodos &&
              completedTodos.map((item, inbdex) => (
                <tr key={inbdex}>
                  {/* <th scope="row">{inbdex + 1}</th> */}
                  <td className="">
                    <div className="text-center">
                      <label className="checkbox-container">
                        <input
                          className="custom-checkbox"
                          checked={item.done === true ? true : false}
                          onClick={(e) => handleCheck(item._id, e)}
                          type="checkbox"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </td>
                  <td
                    className={`text-center  text-lg ${
                      item.done === true ? "line-through" : ""
                    }`}
                  >
                    {item.task}
                  </td>
                  <td className="flex justify-center gap-5 ">
                    <FaRegEdit
                      onClick={() => handleOpen(item._id)}
                      className="text-2xl cursor-pointer"
                    />
                    <MdOutlineDelete
                      className="text-2xl cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CustomTabPanel>
      {open && (
        <div className="fixed rounded-lg w-[90%] md:w-[auto] h-[100px] px-10 py-20 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-slate-500  border z-50">
          <div className="flex items-center justify-center w-full h-full gap-6">
            <div className="form">
              <input
                className="input"
                name="task"
                placeholder="Type your text"
                required=""
                type="text"
                onChange={handleTextChange}
              />
              <span className="input-border"></span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                size="small"
                className="w-10 h-5 md:w-auto md:h-auto"
                onClick={handleSubmit}
                variant="contained"
              >
                Edited
              </Button>
              <Button
                size="small"
                className="w-10 h-5 md:w-auto md:h-auto"
                onClick={handleClose}
                variant="contained"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* {open } */}
    </Box>
  );
}
