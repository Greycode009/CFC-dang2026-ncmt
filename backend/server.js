import app from "./src/app.js";
import { envConfig } from "./src/config/config.js";
import { connectDB } from "./src/config/database.js";
import "./src/models/index.js"
import seedAdmin from "./src/seeders/adminSeeder.js";


const startServer = async () => {
    await connectDB()
    await seedAdmin()

    const port = envConfig.port || 4000
    app.listen(port, () => {
        console.log(`Server has started at port [${port}]`)
    })
}

startServer()