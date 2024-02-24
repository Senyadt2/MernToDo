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

  const [value, setValue] = React.useState(0);
  const [todos, setTodos] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    async function fetchdata() {
      const response = await fetchToDos();
      console.log(response);
      setTodos(response);
    }
    fetchdata();
  }, [restart]);

  const handleDelete = (id) => {
    deleteToDo(`delete/${id}`).then((res) => {
      setRestart((prev) => !prev);
      console.log(res);
    });
  };
  const handleUpdate = (id, task) => {
    updateToDo(`update/${id}`, task).then((res) => {
      setRestart((prev) => !prev);
      // console.log(res);
    });
  };
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState();
  const handleOpen = (id) => {
    setSelectedId(id);
    // console.log(id);
    // console.log("Open");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [text, setText] = React.useState("");
  const handleTextChange = (e) => {
    // console.log(selectedId);
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
        // console.log(res);
      })
      .catch((ex) => console.log("error while updating" + ex));
  };

  /* The code snippet you provided is defining a state variable `isChecked` and a function `handleTick`
 to update that state variable. Send as props to CheckBox.jsx*/
  const [isChecked, setIsChecked] = React.useState(false);
  console.log(isChecked);
  const idStore = (id) => {
    setSelectedId(id);
    console.log(id);
  };
  const handleTick = (status) => {
    completeTask(`done/${selectedId}`, isChecked);
    setIsChecked(status);
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
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col" className="w-[17%]">
                Completed
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
                  <td className="flex items-center justify-center">
                    <CheckBox
                      onClick={() => idStore(item._id)}
                      key={inbdex}
                      handleTick={handleTick}
                      tick={isChecked}
                    />
                  </td>
                  <td
                    className={`text-center ${
                      item.done === true ? "line-through" : ""
                    }`}
                  >
                    {item.task}
                  </td>
                  <td className="flex items-center justify-center gap-5">
                    <FaRegEdit
                      onClick={() => handleOpen(item._id)}
                      className="text-xl cursor-pointer"
                    />
                    <MdOutlineDelete
                      className="text-xl cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </CustomTabPanel>
      {open && (
        <div className="fixed rounded-lg w-[auto] h-[100px] px-10 py-20 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-slate-500  border z-50">
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
            <Button size="small" onClick={handleSubmit} variant="contained">
              Edited
            </Button>
            <Button size="small" onClick={handleClose} variant="contained">
              Close
            </Button>
          </div>
        </div>
      )}
      {/* {open } */}
    </Box>
  );
}
