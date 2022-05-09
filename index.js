const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./db");

const routes = require("./routes");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(morgan("tiny"));
app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 3001;

db.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server listening ON ${PORT}`));
});
