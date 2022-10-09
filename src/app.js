const express = require("express");
const Student = require("./db/students");
require("./db/conn");
const student = require("./db/students");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
// using .then().catch() method

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


// using async await method

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

// read the data of registered students
app.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.send(studentData);
  } catch (e) {
    res.send(e);
  }
});
// get student data by using Id

app.get("/students/:id", async (req, res) => {
  try {
    const _id = await req.params.id; 
    const stdata = await Student.findById(_id);
    if (!stdata) {
      return res.status(404).send();
    } else{
      res.send(stdata)
    }
  } catch (e) {
    res.send(e);
  }
});
// getting student data by using name   // not working
// app.get("/students/:name" ,async (req,res)=>{
//         try {
//           const _name = await req.params.name;
//           // const  namedata = await Student.find({name:_name});
//           res.send(_name)
//           // if (!_name) {
//           //   return res.status(404).send();
//           // } else{
//           //   res.send(namedata)
//           // }
        
//         } catch (e) {
//           res.send(e);
//         }
// } )

// delete the student by it id

app.delete("/students/:id", async (req, res)=>{
  try{
       const deleteStudent = await Student.findByIdAndDelete(req.params.id);
       if(!res.params.id){
        return res.status(400).send();
       }
       res.send(deleteStudent);
  }catch(e){
      res.status(500).send(e);
  }
})

// update the student by its id
// not working 😑
 
app.patch("/students/:id" , async (req,res)=>{
  try {
    const _id = res.params.id;
const updateStudent = await Student.findByIdAndUpdate(_id);
res.send(updateStudent);
    
  } catch (e) {
    res.status(404).send(e);
  }

} )



app.listen(port, () => {
  console.log(`connection is setup at port ${port}`);
});
