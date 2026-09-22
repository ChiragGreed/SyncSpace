import app from "./src/app.js";
import { Config } from "./src/config/config.js";
import ConnectToDB from "./src/config/database.js";

ConnectToDB();

const PORT = Config.PORT || 6500;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});