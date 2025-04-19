import React from "react";
import "./dstyle.css";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

function Courses() {
  // Mock data instead of API calls
  const [courses, setCourses] = useState([
    { course_id: 1, course_name: "Introduction to React" },
    { course_id: 2, course_name: "AWS Cloud Fundamentals" },
    { course_id: 3, course_name: "Docker & Containerization" },
    { course_id: 4, course_name: "ECS Fargate Deployment" },
    { course_id: 5, course_name: "Application Load Balancer Configuration" }
  ]);
  
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cid, setCid] = useState(-1);

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  function deleteCourse(courseId) {
    // Local state modification instead of API call
    setCourses(courses.filter(course => course.course_id !== courseId));
    setCid(-1);
  }

  function editCourse(course_id) {
    // Navigate but with a note in console that this is demo only
    console.log(`Edit course ${course_id} (demo mode - no backend)`);
    navigate(`/editCourse/${course_id}`);
  }
  
  function addquestions(course_id) {
    // Navigate but with a note in console that this is demo only
    console.log(`Add questions to course ${course_id} (demo mode - no backend)`);
    navigate(`/addquestions/${course_id}`);
  }
  
  return (
    <>
      <body>
        <SideBar current={"courses"} />
        <section id="content">
          <Navbar />
          <main className="t">
            <div className="table-data" style={{ marginTop: "-10px" }}>
              <div className="order">
                <div id="course" className="todo">
                  <div className="head" style={{ marginTop: "-100px" }}>
                    <h3 style={{color:'white'}}>Courses</h3>
                    <div style={{fontSize: "0.8rem", color: "#ccc", marginBottom: "10px"}}>
                      Demo Mode - Frontend Only
                    </div>
                    <button
                      onClick={() => navigate("/addcourse")}
                      style={{
                        backgroundColor: "darkblue",
                        borderRadius: "10px",
                        color: "white",
                        border: "none",
                        padding: "8px",
                        fontWeight: "500",
                      }}
                    >
                      Add Course{" "}
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
                    </button>
                  </div>
                  <ul className="todo-list">
                    {courses.map((course) => (
                      <div key={course.course_id}>
                        <li className="completed" style={{ marginTop: "10px",backgroundColor:'white',color:'black' }}>
                          <p>{course.course_name}</p>
                          <div style={{ width: "50px", display: "flex" }}>
                              <button
                                onClick={() => {setOpenModal(true); setCid(course.course_id)}}
                                style={{ marginLeft: "-100px", marginRight:'40px', backgroundColor:'white'}}
                                className="delete-button"
                              >
                              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>

                            <button
                              onClick={() => editCourse(course.course_id)}
                              style={{ marginRight: "40px", backgroundColor:'white'}}
                              className="edit-button"
                            >
                              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                            </button>
                              
                            <button onClick={() => addquestions(course.course_id)}
                            style={{
                              backgroundColor: "#457BC1",
                              borderRadius: "10px",
                              color: "white",
                              border: "none",
                              padding: "8px",
                              fontWeight: "500",
                            }}
                            >
                              Test
                            </button>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </section>
      </body>
      <Modal
        id="poppup"
        open={openModal}
        onOk={
          () => {
            handleOk();
            deleteCourse(cid);
          }}
        onCancel={handleCancel}
        style={{padding:"10px"}}
      >
        <h3>Are you sure you want to delete?</h3>
      </Modal>
    </>
  );
}

export default Courses;