require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.json());

const Sequelize = require("sequelize-cockroachdb");
var sequelize = new Sequelize({
  dialect: process.env.DBTYPE,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.CERTIFICATE,
    },
  },
  logging: false,
});

const Winners = sequelize.define("winners", {
  winner: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  no_of_participations: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  value: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

app.post("/", (req, res) => {
  Winners.sync({
    force: false,
  })
    .then(() => {
      return Winners.create({
        winner: req.body.winner,
        no_of_participations: req.body.no_of_participations,
        value: req.body.value,
      });
    })
    .then((details) => {
      res.send(details);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.get("/", (req, res) => {
  Winners.sync({
    force: false,
  })
    .then(() => {
      return Winners.findAll({
        order: [["createdAt", "DESC"]],
      });
    })
    .then((details) => {
      res.send(details[0]);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Connected at port ${process.env.PORT}\n`);
});
