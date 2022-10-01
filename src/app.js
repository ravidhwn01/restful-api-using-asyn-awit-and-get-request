const express = require("express");
const Student = require("./db/students");
require("./db/conn");
const student = require("./db/students");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("this is root folder!");
// });
// app.post("/students",(req, res)=>{
//     console.log(req.body)
//     const user = new Student(req.body)
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })

// } )

// app.post("/students", async (req, res) => {
//   try {
//     const user = new Student(req.body);
//     const createUser = await user.save();
//     res.status(201).send(createUser);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
// read the data of registered students
app.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.send(studentData);
  } catch (e) {
    res.send(e);
  }
});

app.listen(port, () => {
  console.log(`connection is setup at port ${port}`);
});
