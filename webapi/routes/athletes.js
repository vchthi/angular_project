var express = require("express");
var router = express.Router();
const athletesController = require("../mongo/athletes.controller");



router.get("/list", async (req, res) => {

    try {
        const yearOfBirth = req.query.year; 
      const athletes = await athletesController.find({ yearofbirth: { $lte: parseInt(yearOfBirth) } });
      res.status(200).json(athletes);
    } catch (error) {
      console.log("Lỗi lấy danh sách", error);
      return res.status(500).json({ mess: error });
    }
  });

  