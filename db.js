const {reconDB} = require("reconlx")
const db = new reconDB({
    uri: process.env.url,
  });
  
  module.exports = db;