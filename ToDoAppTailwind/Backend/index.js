const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://rikintuladhar:rVZMNRROkdnfltC4@cluster0.xi0fn2g.mongodb.net/?retryWrites=true&w=majority"
); //creating a database called test
mongoose.connection.on("error", (error) => {
  console.log(error);
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connect");
});

app.get("/", (req, res) => {
  TodoModel.find()
    .then((result) => {
      //   console.log(result);
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  //   console.log(task);
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json("Task Added"))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id }).then((result) => {
    res.json("Deleted");
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  let task = req.body.task;

  TodoModel.findByIdAndUpdate({ _id: id }, { task: task })
    .then((result) => {
      console.log(id + " : " + task);
      res.json("Updated Task");
    })
    .catch((ex) => console.log("Error while updating task" + ex));
});

app.put("/done/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: done })
    .then((response) => {
      res.json("Completed");
    })
    .catch((ex) => console.log("Error while completing" + ex));
});

app.listen(3000, () => {
  console.log("server is running");
});
