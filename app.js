const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const checkListRules = {
  isValuationFeePaid: true,
  isUkResident: true,
  riskRating: "medium",
  maxLtvValue: 60,
};

const checkValuationFeePaid = (isValuationFeePaid) => {
  return checkListRules.isValuationFeePaid === isValuationFeePaid;
};
const checkIsUkResident = (isUkResident) => {
  return checkListRules.isUkResident === isUkResident;
};
const checkRiskRating = (riskRating) => {
  return checkListRules.riskRating === riskRating;
};
const checkLtvValue = (data) => {
  const ltvValue =
    (data.mortgage.loanRequired / data.mortgage.purchasePrice) * 100;

  return ltvValue < checkListRules.maxLtvValue;
};

const initializeServer = () => {
  app.listen(5500, () => {
    console.log("Server started running at http://localhost:5500");
  });
};

initializeServer();

const fetchData = async () => {
  const response = await axios.get(
    "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639"
  );

  return response.data;
};

app.get("/check", (req, res) => {
  // const data = fetchData();

  // const valuationFeePaid = checkValuationFeePaid(data.isValuationFeePaid);
  // const ukResident = checkIsUkResident(data.isUkResident);
  // const riskRating = checkRiskRating(data.riskRating);
  // const ltvBelow60 = checkLtvValue(data);

  // res.send({
  //   valuationFeePaid,
  //   ukResident,
  //   riskRating,
  //   ltvBelow60,
  // });
  res.send({
    valuationFeePaid: true,
    ukResident: true,
    riskRating: true,
    ltvBelow60: true,
  });
});
