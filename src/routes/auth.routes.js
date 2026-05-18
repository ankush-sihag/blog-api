const express = require('express');

const router = express.Router();
const asyncHandler = require('../middleware/async.middleware');

router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Auth route working'
    });
});




module.exports = router;