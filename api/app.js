import express from "express";
import {spawn} from "child_process"

const app = express();

app.get("/getByName/:name", (req, res) => {
    const name = req.params.name;
    const pythonProcess = spawn('/usr/bin/python3',["scrape.py", name]);
    //print the data
    pythonProcess.stdout.on('data', (data) => {
        const stocks = JSON.parse(data);
        res.send(stocks);
    });
    // pythonProcess.on('exit', (code, signal) => {
    //     console.log(`Python process exited with code ${code} and signal ${signal}`);
    // });
});


app.listen(9000, () => {
    console.log("Server is running on port 9000");
});

