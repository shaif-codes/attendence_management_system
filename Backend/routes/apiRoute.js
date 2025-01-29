const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ Name: "Himanshu", Password: "12345" });
});

module.exports = router;
