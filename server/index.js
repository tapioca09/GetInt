const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const internModel = require("./Models/intern")

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://shivam1812:atlas1812@cluster0.ghlhz8q.mongodb.net/Internships?retryWrites=true&w=majority",
{
    useNewUrlParser: true
});


app.post("/insert",async(req,res)=>{
    console.log("Post made")
    const companyName = req.body.companyName;
    const jobRole = req.body.jobRole;
    const stipend = req.body.stipend;
    const cutoff = req.body.cutoff;

    const entry = new internModel({ CompanyName: companyName, JobRole: jobRole , Stipend: stipend, CutOff: cutoff});
    
    try{
        await entry.save();
        console.log("Entry Added!");
        res.send("");
    }
    catch(err){
        console.log(err)
    }
});

app.get("/read",async(req,res)=>{
    internModel.find({}).then((result)=>{
        res.send(result);
        console.log("result sent.")
    })
    .catch((err)=>{
        res.send(err)
    })
});

app.listen(3001,()=>{
    console.log("Running...");
});