const mongoose= require("mongoose")

const dbConnect=()=>{
    mongoose.connect("mongodb+srv://gohelpalak14:palak%4022@cluster0.cjwxl.mongodb.net/Recipe-MERN")
    .then((res) => {
        console.log("Db connect");
    }).catch((err) => {
        console.log(err);
    })
}

module.exports= dbConnect()