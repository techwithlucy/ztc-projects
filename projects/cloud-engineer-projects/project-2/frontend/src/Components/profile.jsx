import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ImgUpload from "./ImgUpload";
import Performance from "./DashBoard/Performance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";


function Profile() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
   const id = localStorage.getItem("id");
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");



  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }

    async function fetchUserDetails() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }
        const data = await response.json();
        console.log(data);
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUserDetails();
  }, [authToken, navigate,id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;
        localStorage.setItem("profileImage", imageData);
        setProfileImage(imageData);
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <div>
      <Navbar page={"profile"} />
      <div className="profile-card" id="pbg" style={{ marginTop: '3%' }}>
        <ImgUpload onChange={handleImageChange} src={profileImage} />
        <h2 className="profile-name">{userDetails?.username}</h2>
        <div style={{ marginTop: '20px' }}>
          <h4>Email: </h4>
          <p className="profile-email">{userDetails?.email}</p>
        </div>
        <div>
          <h4>Phone Number: </h4>
          <p className="profile-phno">{userDetails?.phno}</p>
        </div>
        <div>
        <h4>Gender: </h4>
        <p className="profile-gender">{userDetails?.gender}</p>
      </div>
      <div>
        <h4>Date of Birth: </h4>
        <p className="profile-dob">{userDetails?.dob}</p>
      </div>
      <div>
        <h4>Profession: </h4>
        <p className="profile-gender">{userDetails?.profession}</p>
      </div>
        <div>
          <h4>Learning courses: </h4>
          <p className="profile-phno">{userDetails?.learningCourses.length}</p>
        </div>
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a
            href={userDetails?.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginRight: '15px',
              color: '#0077B5',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.color = '#004471'}
            onMouseOut={(e) => e.target.style.color = '#0077B5'}
          >
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" style={{ fontSize: '38px' }} />
          </a>
          <a
            href={userDetails?.github_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'darkviolet',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.color = '#000'}
            onMouseOut={(e) => e.target.style.color = 'darkviolet'}
          >
            <FontAwesomeIcon icon={faGithub} className="social-icon" style={{ fontSize: '38px' }} />
          </a>
        </div>
      </div>
      <Performance />
    </div>
  );
}

export default Profile;
