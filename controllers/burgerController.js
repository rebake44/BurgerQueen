const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burgers.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  burger.all(data => {
    const hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", (req, res) => {
  burger.create([
    "burger_name"
  ], [
    req.body.name
  ], result => {
    
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, result => {
    if (result.changedRows == 0) {
      // 404 error if no rows change (ID doesnt exist)
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burger/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  burger.delete(condition, result => {
    if (result.affectedRows == 0) {
      // 404 error if no rows change (ID doesnt exist)
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
  
  // Export routes for server.js to use.
  module.exports = router;