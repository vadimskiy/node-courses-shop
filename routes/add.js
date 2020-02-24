const {Router} = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add new course',
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const {title, price, img} = req.body;
    const course = new Course({
        title,
        price,
        img
    });

    try {
        await course.save();
        res.redirect('courses');
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
