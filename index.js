const express = require("express");
const app = express();
const path = require("path");
const { v4: getId } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

let items = [];
let editItem = [];

app.get("/todolist", (req, res) => {
  const combine = [items, editItem];
  res.render("todolist/main", { combine });
});

app.post("/todolist/input", (req, res) => {
  let { task } = req.body;
  if (task) {
    task = task.substr(0, 1).toUpperCase() + task.substr(1);
    items.push({ id: getId(), task: task });
  }
  res.redirect("/todolist");
});

app.get("/todolist/:id", (req, res) => {
  const { id } = req.params;
  console.log({ id });
  editItem = items.filter((c) => id === c.id);
  res.redirect("/todolist");
});

app.patch("/todolist/:id", (req, res) => {
  const { id } = req.params;
  const newTask = req.body.edit;
  const foundTask = items.find((c) => c.id === id);
  foundTask.task = newTask;
  editItem = [];
  res.redirect("/todolist");
});

app.delete("/todolist/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((i) => i.id !== id);
  res.redirect("/todolist");
});

app.listen(3000, () => {
  console.log("ON PORT 3000");
});
