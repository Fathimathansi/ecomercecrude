import React from 'react'
import './UserProfile.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate,Link } from 'react-router-dom' // Import useNavigate

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const UserId = localStorage.getItem("userId")
    const navigate = useNavigate(); // Initialize useNavigate
console.log(UserId)
    useEffect(() => {
        if (UserId) {
            axios.get(`http://localhost:3000/userbyid/${UserId}`)
                .then((res) => {
                    console.log(res.data.user);
                    setUser(res.data.user);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [UserId]);

    const handleUpdateProfile = () => {


        // You can navigate to an update page, e.g.:
        navigate(`/edit-profile/${UserId}`);
        // Or you could open a modal for editing
        console.log("Update Profile button clicked!");
    };

    return (
        <div>
            <div className='img-1'>
                <div className="card-1">
                    <div className="img-2">
                        <img className="img-2" src={`http://localhost:3000/upload/${user?.image?.filename}`} alt="Profile Silhouette" />
                    </div>
                    <div className="details">
                        {user ? (
                            <>
                                <p>Name: {user.firstName}</p>
                                <p>Email: {user.email}</p>
                                <p>Address: {user.address}</p>
                                <p>PhoneNumber: {user.tel}</p>
                              <Link to={`/updateuserprofile/${user._id}`}> 
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

export default UserProfile