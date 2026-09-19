import app from "./src/app.js";
import ConnectToDB from "./src/config/database.js";

ConnectToDB();

app.listen(6500,()=>{
    console.log("Server is running on port 5000");
})