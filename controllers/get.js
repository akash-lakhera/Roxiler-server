const { stats, bar, pie } = require("./dataBuilder");
const getStats = async (req, res, next) => {
  try {
    let data = await stats(req);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(new Error("Something went wrong. Please try again"));
  }
};
const getBar = async (req, res, next) => {
  try {
    let data = await bar(req);
    res.set("Content-Type","text/plain")
    res.status(200).send(data,null,4);
  } catch (error) {
    console.log(error);
    res.status(400).send(new Error("Something went wrong. Please try again"));
  }
};
const getPie = async (req, res, next) => {
  try {
    let data = await pie(req);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(new Error("Something went wrong. Please try again"));
  }
};
const getAll = async (req, res, next) => {
  try {
    let [s, b, p] =await Promise.all([stats(req), bar(req), pie(req)]);
    res.status(200).send({ stats: s, bar: b, pie: p.data });
  } catch (error) {
    console.log(error);
    res.status(400).send(new Error("Something went wrong. Please try again"));
  }
};
module.exports = { getStats, getBar, getPie, getAll };
