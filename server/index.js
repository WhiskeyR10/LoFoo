const express = require("express");
const http = require("http");
const WebSocket = require('ws');
const fileUpload = require("express-fileupload")
const path = require("path");



require("./config/database");
require("dotenv").config()

const PORT= (process.env.PORT || 7000)
const bodyParser = require("body-parser");
const lostItemRoutes = require("./routes/lostitem");
const founditem_routes = require("./routes/founditem");
const auth_routes = require("./routes/auth");
const cors = require("cors");


const {
  handleResourceNotFound,
  handleServerError,
} = require("./middleware/error");

const app = express();

const allowedOrigins = ['http://localhost:3000'];
// Making upload folder public to access

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static('uploads'));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.use(bodyParser.json());

app.use(express.json());

// Image upload from npm file-upload
app.use(fileUpload());


app.use("/api/lostitems", lostItemRoutes);
// Found Items endpoint
app.use("/api/findings", founditem_routes);

// User signup signin endpoint
app.use(auth_routes);

app.use(handleResourceNotFound);

app.use(handleServerError);


app.listen(process.env.PORT, () => {
  console.log(`Server started at ${PORT}`);
});
