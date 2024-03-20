import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env"
})

connectDB()
.then(()=> {
  app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server is run at Port: ${process.env.PORT}`);
  })
})
.catch((err)=>{console.log("MongoDB connection failed:", err)})

/* const app = express();

( async ()=> {
  try{
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    app.on("error", (error)=>{
      console.log("err: ", error );
      throw error
    })
    app.listen(process.env.PORT, ()=>{
      console.log(`App is Listening on Port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error("err: ", error)
    throw error
  }
})() */