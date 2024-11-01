const contactformdb = require('../model/contactForm');

async function handleContactForm(req, res){
    const formData = req.body;
    if(formData.name != null && formData.email != null && formData.gender != null && formData.mobile != null && formData.suggestion != null){
        const formDataSaved = await contactformdb.create({
            name : formData.name,
            email : formData.email, 
            gender : formData.gender,
            mobile : formData.mobile,
            suggestion : formData.suggestion 

        });

        res.status(201).json({
            message: 'Thanks! data stored',
        });
    }
    else{
        res.status(400).json({
            message: 'please fill all information',
        });
    }

}

module.exports = handleContactForm;
