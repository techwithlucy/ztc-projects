import React, { useState } from 'react';
import './dstyle.css'; // Import your CSS styles
import SideBar from './SideBar';
import Navbar from './Navbar';

function Tutors() {
  // Mock data instead of API calls
  const [tutors, setTutors] = useState([
    {
      tutor_id: 1,
      tutor_name: "Alex Johnson",
      tutor_email: "alex.johnson@example.com",
      tutor_phno: "555-123-4567",
      tutor_qualification: "PhD in Computer Science"
    },
    {
      tutor_id: 2,
      tutor_name: "Sarah Williams",
      tutor_email: "sarah.williams@example.com",
      tutor_phno: "555-234-5678",
      tutor_qualification: "MSc in Cloud Computing"
    },
    {
      tutor_id: 3,
      tutor_name: "Michael Chen",
      tutor_email: "michael.chen@example.com",
      tutor_phno: "555-345-6789",
      tutor_qualification: "AWS Certified Solutions Architect"
    },
    {
      tutor_id: 4,
      tutor_name: "Emma Garcia",
      tutor_email: "emma.garcia@example.com",
      tutor_phno: "555-456-7890",
      tutor_qualification: "MS in DevOps Engineering"
    },
    {
      tutor_id: 5,
      tutor_name: "James Wilson",
      tutor_email: "james.wilson@example.com",
      tutor_phno: "555-567-8901",
      tutor_qualification: "Docker Certified Associate"
    }
  ]);

  return (
    <body style={{backgroundColor:"#eee"}}>
      <SideBar current={"tutor"}/>
      <section id="content">
        <Navbar />
        <main>
          <div className="table-data" style={{marginTop:"-10px"}}>
            <div className="order">
              <div className="head">
                <h3>Tutors Info</h3>
                <div style={{fontSize: "0.8rem", color: "#888", marginLeft: "15px"}}>
                  Demo Mode - Frontend Only
                </div>
              </div>
              <table id="user">
                <thead>
                  <tr>
                    <th>Tutorname</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Qualification</th>
                  </tr>
                </thead>
                <tbody>
                {tutors.map((tutor) => (
                   <tr key={tutor.tutor_id}>
                   <td><p>{tutor.tutor_name}</p></td>
                   <td>{tutor.tutor_email}</td>
                   <td>{tutor.tutor_phno}</td>
                   <td>{tutor.tutor_qualification}</td>
                 </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </body>
  );
}

export default Tutors;