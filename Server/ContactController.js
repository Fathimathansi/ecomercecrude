const ContactSchema = require('./ContactSchema')

const addContact =(req,res)=>{    
const Contact = new ContactSchema({

        name: req.body.name,
        email: req.body.email,
        subject: req.body. subject,
        message: req.body.message,
         createdAt: req.body. createdAt,
       

    })
    console.log(Contact);
    
      Contact.save()
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessfull"
            })
        })
        .catch((error) => {
            console.log(error);

        })

}



const ViewContact = (req, res) => {
    ContactSchema.find()
   
        .then((result) => {
            res.json({
                data: result,
                msg: "successfull"
            })
        })  
        .catch((error) => {
            console.log(error)
        })
}

const viewContactId = (req, res) => {
    const contactId = req.params.id;
    ContactSchema.findById(contactId)
        .then((result) => {
            res.json({
                data: result,
                msg: "successfull"
            })
        })
        .catch((error) => {
            console.log(error);

        })
}
const Contactupdate = (req, res) => {
    const contactId = req.params.id;
    const updateData = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body. subject,
        message: req.body.message,
         createdAt: req.body. createdAt,
       
       }


    ContactSchema.findByIdAndUpdate(contactId, updateData, { new: true })
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessfull"
            })
        })
        .catch((error) => {
            console.log(error)
        })
}
const deleteContact = (req, res) => {
    const contactId = req.params.id;

    ContactSchema.findByIdAndDelete(contactId)
        .then((result) => {

            res.json({
                data: result,
                msg: "sucessfull"
            })
        })
        .catch((error) => {
            console.log(error)
        })
};



module.exports = {addContact, ViewContact, viewContactId, Contactupdate,deleteContact}