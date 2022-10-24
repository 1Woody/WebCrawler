import mongoose from "mongoose";


async function dbConnect(){
    
    const { DB_URI, DB_URI_TEST, NODE_ENV  } = process.env;
    const connection = (NODE_ENV === 'test') ? DB_URI_TEST : DB_URI;
    if(connection === null) console.log("Mongo DB URI is empty");
    else {
        console.log(`Starting DB connection to ${connection} ...`)
        await mongoose.connect(String(connection))
        .then(() => { console.log(`Connected to ${connection}`)})
        .catch((error) => { console.log(error)});
    }
}

export default dbConnect;