import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Learnings(){
    const userId = localStorage.getItem("id");
    const [courses , setCourse] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchCourse() {
          try {
            const response = await axios.get(`http://localhost:8080/api/learning/${userId}`);
            const fetchedCourse = response.data;
            setCourse(fetchedCourse);
          } catch (err) {
            console.log(err);
          }
        }
        fetchCourse();
      }, []);

      if (courses.length === 0) {
        return (
          <>
            <Navbar page="learnings" />
            <div style={{ textAlign: 'center', marginTop: '10%' }}>
              <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>
                You have not enrolled in any courses yet...!!!
              </h1>
              <p style={{ color: '#666', fontSize: '18px' }}>
                Explore our courses and start your learning journey.
              </p>
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#017bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
                onClick={() => navigate('/courses')}
              >
                Explore Courses
              </button>
            </div>
          </>
        );
      }

    return(
        <>
        <Navbar page={"learnings"} />
    <div className="learn-courses-container" style={{marginTop :"20px"}}>
      {courses.map((course) => (
        <div key={course.id} className="learn-course-card">
        <img src={course.photo} alt={course.courseName} className="learn-course-image" />
        <div className="course-details">
            <h3 className="course-heading">
              {course.courseName.length < 8
                ? `${course.courseName} Tutorial`
                : course.courseName
              }
            </h3>
            <p className="course-description">by {course.instructor}</p>
        </div>
        <Link to={`/course/${course.id}`} style={{textDecoration:"none"}}>
        <button className="learn-course-button">Start Learning</button>
        </Link>
        </div>
      ))}
     </div>
     </>
    );
}
export default Learnings;