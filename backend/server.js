import app from "./src/app.js";
import { envConfig } from "./src/config/config.js";
import { connectDB } from "./src/config/database.js";




connectDB()

const startServer = () => {
    const port = envConfig.port || 4000
    app.listen(port, () => {
        console.log(`Server has started at port [${port}]`)
    })
}

startServer()