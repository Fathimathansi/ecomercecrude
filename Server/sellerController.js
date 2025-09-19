const sellerSchema = require('./sellerSchema')
const multer = require('multer')



const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./Image");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const sellerImage = multer({ storage: storage}).single("image");


    
 const sellerRegistration = (req, res) => {
  sellerSchema.findOne({ email: req.body.email })
    .then((existingSeller) => {
      if (existingSeller) {
        return res.status(400).json({
          message: "Email already exists. Please use a different email."
        });
      }

      const Seller = new sellerSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password,
        image: req.file,
        status: "pending" // ✅ ensure pending until admin approves
      });

      return Seller.save();
    })
    .then((result) => {
      if (result) {
        res.status(201).json({
          Seller: result,
          message: "Registration successful, awaiting admin approval"
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });
};


const getAllSellers = (req, res) => {
    sellerSchema.find()
        .then((sellers) => {
            res.json({
                sellers: sellers,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};


const getSellerById = (req, res) => {
    const sellerId = req.params.id;

    sellerSchema.findById(sellerId)
        .then((seller) => {
            if (!seller) {
                return res.status(404).json({
                    message: "Seller not found"
                });
            }
            res.status(200).json({
                seller: seller
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};


const findOneSeller = (req, res) => {
    const email = req.body.email;

    sellerSchema.findOne({ email })
        .then((seller) => {
            if (!seller) {
                return res.status(404).json({
                    message: "seller not found"
                });
            }

            if (seller.status !== "approved") {
        return res.status(403).json({
          message: "Your account is pending approval by admin"
        });
      }
            res.status(200).json({
                seller: seller
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};



const updateSeller = (req, res) => {
    const sellerId = req.params.id;
    const updateData = {
        firstName: req.body.firstName,
        email: req.body.email,
         tel : req.body.tel,
           address: req.body.address,
            image: req.file 
    };

    sellerSchema.findByIdAndUpdate(sellerId, updateData, { new: true })
        .then((seller) => {
            if (!seller) {
                return res.status(404).json({
                    message: "Seller not found"
                });
            }
            res.status(200).json({
                seller: seller,
                message: "Seller updated successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};



const deleteSeller = (req, res) => {
    const sellerId = req.params.id;

    sellerSchema.findByIdAndDelete(sellerId)
        .then((seller) => {
            if (!seller) {
                return res.status(404).json({
                    message: "Seller not found"
                });
            }
            res.status(200).json({
                message: "Seller deleted successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};

// Get only pending sellers
const getPendingSellers = (req, res) => {
  sellerSchema.find({ status: "pending" })
    .then((sellers) => {
      res.status(200).json({ sellers });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Approve seller
const approveSeller = (req, res) => {
  const sellerId = req.params.id;

  sellerSchema.findByIdAndUpdate(sellerId, { status: "approved" }, { new: true })
    .then((seller) => {
      if (!seller) return res.status(404).json({ message: "Seller not found" });
      res.status(200).json({ seller, message: "Seller approved successfully" });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

// Reject seller
const rejectSeller = (req, res) => {
  const sellerId = req.params.id;

  sellerSchema.findByIdAndDelete(sellerId)
    .then((seller) => {
      if (!seller) return res.status(404).json({ message: "Seller not found" });
      res.status(200).json({ message: "Seller rejected and removed" });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
// Get only accepted sellers
const getAcceptedSellers = (req, res) => {
  sellerSchema.find({status:"approved"})
    .then((sellers) => {
      res.status(200).json({ sellers });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};



module.exports = {

    sellerRegistration,
    getAllSellers,
    getSellerById,
    findOneSeller,
    updateSeller,
    deleteSeller,
    sellerImage,
    getPendingSellers,
    approveSeller,
    rejectSeller,getAcceptedSellers

};