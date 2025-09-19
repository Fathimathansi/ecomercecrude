import React from 'react'
import './SellerProfile.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate,Link } from 'react-router-dom' // Import useNavigate

const SellerProfile = () => {
    const [seller, setSeller] = useState(null);
    const { id } = useParams();
    const SellerId =  localStorage.getItem("sellerid")
    const navigate = useNavigate(); // Initialize useNavigate
console.log((SellerId))
    useEffect(() => {
        if (SellerId) {
            axios.get(`http://localhost:3000/sellerbyid/${(SellerId)}`)
                .then((res) => {
                    console.log(res.data.seller);
                    setSeller(res.data.seller);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [SellerId]);

    const handleUpdateProfile = () => {


        // You can navigate to an update page, e.g.:
        navigate(`/edit-profile/${SellerId}`);
        // Or you could open a modal for editing
        console.log("Update Profile button clicked!");
    };

    return (
        <div>
            <div className='img-1'>
                <div className="card-1">
                    <div className="img-2">
                        <img className="img-2" src={`http://localhost:3000/upload/${seller?.image?.filename}`} alt="Profile Silhouette" />
                    </div>
                    <div className="details">
                        {seller ? (
                            <>
                                <p>Name: {seller.firstName}</p>
                                <p>Email: {seller.email}</p>
                                <p>Address: {seller.address}</p>
                                <p>PhoneNumber: {seller.tel}</p>
                              <Link to={`/updatesellerprofile/${seller._id}`}> 
                               <button className="update-button">
                                    Update Profile
                                </button></Link>
                            </>
                        ) : (
                            <p>Loading user details...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerProfile