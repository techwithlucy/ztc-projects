import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
 import { useNavigate } from "react-router-dom";
import axios from "axios";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Courses() {

  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem("id");
   const navigate = useNavigate();
   const[enrolled , SetEnrolled] = useState([]);
   const authToken = localStorage.getItem('token');
  
  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      const userId = localStorage.getItem("id");
      if(userId){
        fetch(`http://localhost:8080/api/learning/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            let arr = [];
            for (let i=0;i<data.length ;i++){
              arr.push(data[i].course_id);
            }
            SetEnrolled(arr);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        }
  }, []);

  function enrollCourse(courseId) {
    if(authToken){
      const enrollRequest = {
        userId: userId,
        courseId: courseId
     };
      axios.post('http://localhost:8080/api/learning', enrollRequest)
          .then((response) => {
            if(response.data == "Enrolled successfully"){
              toast.success('Course Enrolled successfully', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
              });
              setTimeout(()=>{
                navigate(`/course/${courseId}`);
              },2000);
            }
          })
          .catch((error) => {
              console.error('Enrollment error:', error);
          });
    }else{
      toast.error('You need to login to continue', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      setTimeout(()=>{
        navigate('/login');
      },2000);
    }
    
 }


return (
<div>
  <Navbar page={"courses"}/>
     <div className="courses-container" style={{marginTop :"20px"}}>
      {courses.map((course) => (
        <div key={course.course_id} className="course-card">
          
            <img src={course.p_link} alt={course.course_name} className="course-image" />
            <div className="course-details">
              <h3 className="course-heading">
                {course.courseName.length < 8
                  ? `${course.courseName} Tutorial`
                  : course.courseName
                }
              </h3>
              <p className="course-description" style={{color:"grey"}}>Price: Rs.{course.price}</p>
              <p className="course-description">Tutorial by {course.instructor}</p>
            </div> 
          {enrolled.includes(course.course_id) ? (<button className="enroll-button" style={{color:'#F4D03F',backgroundColor:'darkblue',fontWeight:'bold'}} onClick={() => navigate("/learnings")}>
            Enrolled
          </button> ):(<button className="enroll-button" onClick={() => enrollCourse(course.course_id)}>
            Enroll
          </button> )}
        </div>
      ))}
     </div>
    </div>
  );
}

export default Courses;
