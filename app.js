require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// const IPFSMini = require("ipfs-mini");

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
  // ipfs_cid: {
  //   type: Sequelize.STRING,
  //   allowNull: true,
  // },
});

// const ipfs = new IPFSMini({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });

app.post("/", (req, res) => {
  Winners.sync({
    force: false,
  })
    .then(() => {
      // const cid = await storeWinnerDataInIPFS(req.body);
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
      // const earliestWinner = await retrieveEarliestWinnerFromIPFS();
      // res.send(earliestWinner);
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

// // Function to store winner data in IPFS
// async function storeWinnerDataInIPFS(winnerData) {
//   try {
//     const jsonData = JSON.stringify(winnerData);

//     const { cid } = await ipfs.add(jsonData);
//     return cid;
//   } catch (error) {
//     throw error;
//   }
// }

// // Function to retrieve the earliest winner from IPFS
// async function retrieveEarliestWinnerFromIPFS() {
//   try {
//     let earliestWinner = null;
//     let earliestWinTime = new Date();

//     // Query the IPFS network for winner data
//     const files = JSON.parse(await ipfs.cat("/ipfs"));

//     for (const file of files) {
//       const winnerData = JSON.parse(file.content.toString());

//       const winTime = new Date(winnerData.win_time);
//       if (winTime < earliestWinTime) {
//         earliestWinTime = winTime;
//         earliestWinner = winnerData;
//       }
//     }

//     return earliestWinner;
//   } catch (error) {
//     throw error;
//   }
// }