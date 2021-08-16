var express = require('express');
var router = express.Router();
const Category = require('../model/Category');
const Post = require('../model/Post');

router.get('/:id', function(req, res, next) {
    Category.find()
    .then(category => {
    Post.find({postCategory: req.params.id})
    .populate('postCategory', 'categoryName')
    .then(post => {
        res.render('singleCat', {post, category, title: post.postName, user: req.user});
    })
})
})

module.exports = router;