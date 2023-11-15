const express = require("express");
const router = express.Router();

const Request = require("../model/Request");

router.post("/request/create", async (req, res) => {
  try {
    const { name, database, route, user } = req.body;
    const newRequest = new Request({
      name: name,
      database: database,
      route: route,
      user: user,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/request/list", async (req, res) => {
  try {
    const requestsList = await Request.find();
    res.json(requestsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/request/update", async (req, res) => {
  try {
    const requestUpdate = await Request.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
    });

    if (req.body.name && req.body.id) {
      return res.json({ message: "request updated" });
    } else {
      res.json({ message: "missing parameters" });
    }
    await requestUpdate.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/request/delete", async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.body.id);
    if (req.body.id) {
      res.status(200).json({ message: "request deleted" });
    } else {
      res.json({ message: "missing elements" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
