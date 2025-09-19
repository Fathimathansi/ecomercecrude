const userSchema = require('./userSchema')
const multer = require('multer')



const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./Image");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})
const userImage = multer({ storage: storage}).single("image");
 const userRegistration = (req,res)=>{
    const User = new userSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        tel : req.body.tel,
        password: req.body.password,
        image: req.file 
    })
  User.save()
        .then((result) => {
            res.status(201).json({
                User:result,
                message: "registration sucessfully"
            })
        })
        .catch((error) => {




            
            console.log(error)
        })
}

const getAllUsers = (req, res) => {
    userSchema.find()
        .then((users) => {
            res.json({
                users: users,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};


const getUserById = (req, res) => {
    const userId = req.params.id;

    userSchema.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.status(200).json({
                user: user
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};


const findOneUser = (req, res) => {
    const email = req.body.email;

    userSchema.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.status(200).json({
                user: user
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};



const updateUser = (req, res) => {
    const userId = req.params.id;
    const updateData = {
        firstName: req.body.firstName,
        email: req.body.email,
         tel : req.body.tel,
           address: req.body.address,
            image: req.file 
    };

    userSchema.findByIdAndUpdate(userId, updateData, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.status(200).json({
                user: user,
                message: "User updated successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};



const deleteUser = (req, res) => {
    const userId = req.params.id;

    userSchema.findByIdAndDelete(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            res.status(200).json({
                message: "User deleted successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};

module.exports = {

    userRegistration,
    getAllUsers,
    getUserById,
    findOneUser,
    updateUser,
    deleteUser,
    userImage
    
};