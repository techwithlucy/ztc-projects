import React, { useState } from 'react';
import './dstyle.css';
import SideBar from './SideBar';
import Navbar from './Navbar';

function Dashboard() {
  // Use hardcoded mock data instead of API calls
  const [userscount, setUserscount] = useState(152);
  const [coursescount, setCoursescount] = useState(48);
  const [enrolled, setEnrolled] = useState(327);

  // No useEffect needed as we're not making API calls

  return (
    <body style={{backgroundColor:"#eee"}}>
      <SideBar current={"dashboard"}/>
      <section id="content">
        <Navbar />
        <main>
          <div className="head-title">
            <div className="left">
              <h1 id="dashboard" style={{color:'darkblue'}} > Dashboard</h1>
              <p className="mt-2 text-muted">Demo Mode - Frontend Only</p>
            </div>
          </div>
          <ul className="box-info">
            <li>
              <i className='bx bxs-group' id="i"></i>
              <span className="text">
                <h3>{userscount}</h3>
                <p>Total Users</p>
              </span>
            </li>
            <li>
              <i className='bx bx-book' id="i"></i>
              <span className="text">
                <h3>{coursescount}</h3>
                <p>Total Courses</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-calendar-check' id="i"></i>
              <span className="text">
                <h3>{enrolled}</h3>
                <p>Total Enrollment</p>
              </span>
            </li>
          </ul>
        </main>
      </section>
    </body>
  );
}

export default Dashboard;