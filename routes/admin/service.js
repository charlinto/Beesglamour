const express = require('express');
const router = express.Router();
const Service = require('../../model/Service')

router.get('/add', (req, res) =>{
    res.render('admin/service/add-service', {layout: 'backendLayout'})
});


router.post('/add', (req, res) =>{
    const {service_name, service_desc} = req.body;
        let errors = [];
    if(!service_name || !service_desc){
        errors.push({msg: "please fill in all the fields"})
    }
    if(errors.length > 0){
        res.render('admin/service/add-service', {layout: 'backendLayout', errors})
    }
    else{
        //checking if category exists
        Service.findOne({serviceName: service_name})
        .then(service =>{
            if(service){
                errors.push({msg: "category already exists"})
                return res.render('admin/service/add-service', {layout: 'backendLayout', errors})
            }
            const newService = new Service({
                serviceName: service_name,
                serviceDesc: service_desc
            })
            newService.save()
            .then(servce =>{
                req.flash('success_msg', servce.serviceName  +  ' was created successfully')
                res.redirect('/service/add')
            })
        })
    }
});



router.get('/all', (req, res) =>{
    Service.find()
    .then(service =>{
        if(service){
            res.render('admin/service/all-service', {layout: 'backendLayout', service})
        }
    })
    .catch(err =>{
        req.flash('success_msg', 'there was an error. Try again!')

    })

});


router.get('/edit/:id', (req, res) =>{

    Service.findOne({_id: req.params.id})
    .then(service =>{
        if(service){
            res.render('admin/service/edit-service', {layout: 'backendLayout', service})
        }
    })

    .catch(err =>{
        req.flash("error_msg", "There was an error")
    })

    
});


router.get('/update', (req, res) =>{
    res.render('admin/service/edit-service', {layout: 'backendLayout'})
});


router.post('/update/:id', (req, res) =>{
    const {service_name, service_desc} = req.body;
        let errors = [];
    if(!service_name || !service_desc){
        errors.push({msg: "please fill in all the fields"})
    }
    if(errors.length > 0){
        res.render('admin/service/edit-service', {layout: 'backendLayout', errors})
    }
    else{
        //checking if category exists
        const updateService = {
            serviceName: service_name,
            serviceDesc: service_desc
        }

        Service.findOneAndUpdate({_id: req.params.id}, {$set: updateService}, {new: true})
        .then(service =>{
            req.flash('success_msg', service.serviceName + ' was successfully updated')
            res.redirect('/service/all')
        })
        .catch(err =>{
            req.flash('error_msg', "There was an error, Try Again")
        })
        // newCategory.save()
        // .then(category =>{
        //     req.flash('success_msg', category.categoryName  +  'was created successfully')
        //     res.redirect('/category/add')
        // })
    }
});

router.get('/delete/:id', (req, res) =>{
    Service.findOneAndDelete({_id: req.params.id})
    .then(service =>{
        req.flash('error_msg', service.serviceName + ' was successfully deleted')
        res.redirect('/service/all')
    })
    .catch(err =>{
        req.flash('error_msg', "There was an error, Try Again")
    })
})


module.exports = router;