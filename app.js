const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const videoRoutes = require("./routes/video");
const audioRoutes = require("./routes/audio");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./graphql/schema");

const seedDB = require("./seeds");

seedDB();

app.use(cors());
app.use(bodyParser.json());

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(videoRoutes);
// app.use("/audio", audioRoutes);
app.use("/users", authRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/users", userRoutes);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

start();
