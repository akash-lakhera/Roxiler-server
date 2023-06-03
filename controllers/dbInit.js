const mongoose = require("mongoose");
const express = require('express')
const router = express.Router()
const products = require("../models/product");
module.exports = dbInit = async (req, res, next) => {
  try {
    console.log(router.handle)
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json",
      { redirect: "follow", follow: 10 }
    );
    const data = await response.json(response);
    await products.deleteMany({});
    await products.insertMany(data);
    res.status(200).send("INITIALIZED");
  } catch (error) {
    console.log(error);
  }
};
