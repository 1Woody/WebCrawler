import mongoose from "mongoose";


async function dbConnect(){
    const DB_URI = `${process.env.DB_URI}`
    console.log(`Starting DB connection to ${DB_URI}...`)
    await mongoose.connect(DB_URI)
    .then(() => { console.log(`Connected to ${DB_URI}`)})
    .catch((error) => { console.log(error)});
}

export default dbConnect;