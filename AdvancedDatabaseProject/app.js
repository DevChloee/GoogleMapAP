
// This is the server side file
const mongoose = require('mongoose');
const express = require('express')
// const express = import('express');
const app = express();
const path = require('path');



// Set up static file serving
app.use(express.static('public'));

// Making Schema
const layerSchema = new mongoose.Schema({
    layer: Object
})
// Making mongoose Model
const layerModel = new mongoose.model("LayerModel", layerSchema);

// For Parsing json file
app.use(express.json());
app.post("/postData", async (req, res) => {

    const receivedData = req.body;

    const doc = new layerModel({ layer: receivedData });
    doc.save()

    console.log("you have successfully saved the data to the mongo DB database")

    const dataFromMongoDB = await layerModel.find({});
    res.status(200).json(dataFromMongoDB);
}
)

app.get("/", async (req, res) => {
    console.log("helllo world.")


    try {

        res.sendFile(path.resolve(__dirname, "index.html"));

    } catch (error) {
        console.error("Error retrieving data from MongoDB:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    // Send the HTML file as a response




})

// This will listen on the port 3000.
app.listen(3000, () => console.log("Server started on port 3000"));

// This will be executed when the server is started. 
const start = async () => {
    try {
        main().catch(err => console.log(err));

        async function main() {
            await mongoose.connect('mongodb://127.0.0.1/MapDatabase');
        }

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};


start();