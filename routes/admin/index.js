const express = require('express');
const router = express.Router();
const Post = require('../../model/Post')
const Category = require('../../model/Category')
const User = require('../../model/User')
const Comment = require('../../model/Comment')
const ac = require('../../config/accesscontorl')
const mongoose = require('mongoose')
const {ensureAuthenticated} = require ('../../config/auth')
const {accassControl} = require ('../../config/accesscontorl')
const BookMes = require('../../model/BookMe')

router.get('/',ensureAuthenticated, accassControl, (req,res) =>{
    Category.find()
    .then(categories => {
        Post.find()
        .then(posts => {
            User.find()
            .then(users => {
                Comment.find()
                .then(comments =>{
                    let user = req.user
                    let getintouchs = BookMes.length
                    console.log('========>',getintouchs)
                    res.render('admin/dashboard', {layout:"backendLayout.hbs", title:"Linto", posts, categories, comments, users, user, getintouchs})

                })
                

            })
           
        })
    })
    
})

module.exports = router;