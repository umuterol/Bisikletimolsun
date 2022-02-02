const express = require("express");
const app = express()
app.use(express.json())
const dotenv = require('dotenv');
dotenv.config({
    path: './config/setting.env'
})
const db = require("./models");
const defaultDatabaseDataHandler = require("./data/defaultDatabaseData");
const apiRouters = require("./rooters")


app.use("/api", apiRouters)
app.use('/image', express.static('upload/images'));

app.get("/initialize", async (req, res) => {
    try {
        await defaultDatabaseDataHandler();
        res.status(200).send("initialize successful.")
    } catch (error) {
        res.status(500).send("initialize unsuccessful.")
    }
})

app.listen(process.env.PORT, async () => {
    // db.sequelize.sync();
    // db.sequelize.sync({ force: true });
    console.log("server started")
})

