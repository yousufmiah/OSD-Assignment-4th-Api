const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

app.use(bodyParser.json());

//urlQuery?name=Yousuf&age=25&city=Dhaka
app.post("/urlQuery", (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  const city = req.query.city;

  res.send(
    "name: " + name + "," + " " + "Age: " + age + "," + " " + "City: " + city
  );
});

//body
app.post("/body", (req, res) => {
  const jsonData = req.body;
  const name = jsonData["name"];
  const city = jsonData["city"];
  res.send("name: " + name + ", " + "City: " + city);
});

//header property
app.post("/header", (req, res) => {
  let userName = req.header("userName");
  let password = req.header("password");
  res.send("User Name:" + userName + ", " + " " + "password:" + password);
});

//upload file
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("myfile");

app.post("/uploadFile", (req, res) => {
  upload(req, res, function (error) {
    if (error) {
      res.send("file upload failed");
    } else {
      res.send("file upload success");
    }
  });
});

//download file
app.get("/downloadFile", function (req, res) {
  res.download("./fromDownload/images.png");
});

app.listen(8000, (err) => {
  if (!err) {
    console.log("server is running by port 8000");
  }
});
