import express from "express";
import {spawn} from "child_process"

const app = express();

app.get("/getByName/:name", (req, res) => {
    if (req.params.name === "") {
        res.send("No name provided");
        return;
    }
    try {
        const name = req.params.name;
        const pythonProcess = spawn('/usr/bin/python3',["scrape.py", name]);
        //print the data
        pythonProcess.stdout.on('data', (data) => {
            const stocks = JSON.parse(data);
            res.send(stocks);
        });
    } catch (error) {
        console.error(error);
        res.send("Error occurred while scraping data: " + error);
    }
});


app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
