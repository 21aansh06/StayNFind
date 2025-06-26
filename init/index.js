const mongoose = require("mongoose")
const Listing = require("../models/listing.js")
const initData = require("./data.js")

main()
.then(()=>{
    console.log("DB connected successfully")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

};

const initDB = async () =>{
 await Listing.deleteMany({})
 initData.data =initData.data.map((obj)=>({...obj, owner : "684b1a35d344adaebfda7073",}))
 await Listing.insertMany(initData.data)   
}

initDB()