import React, { useState, useEffect } from 'react';
import './dstyle.css'; // Import your CSS styles
import SideBar from './SideBar';
import Navbar from './Navbar';

function Users() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Mock data to replace backend API call
    const mockUsers = [
      { 
        username: "johndoe", 
        email: "john.doe@example.com", 
        phno: "555-123-4567", 
        profession: "Software Developer" 
      },
      { 
        username: "janedoe", 
        email: "jane.doe@example.com", 
        phno: "555-987-6543", 
        profession: "UX Designer" 
      },
      { 
        username: "alice_smith", 
        email: "alice.smith@example.com", 
        phno: "555-456-7890", 
        profession: "Product Manager" 
      },
      { 
        username: "bob_johnson", 
        email: "bob.johnson@example.com", 
        phno: "555-789-0123", 
        profession: "Data Scientist" 
      },
      { 
        username: "sarah_williams", 
        email: "sarah.w@example.com", 
        phno: "555-321-6549", 
        profession: "Marketing Specialist" 
      }
    ];
    
    // Simulate delay like a real API call
    setTimeout(() => {
      setUsers(mockUsers);
    }, 500);
  }, []);
  
  console.log(users);
  
  return (
    <body style={{backgroundColor:"#eee"}}>
      <SideBar current={"user"}/>
      <section id="content">
        <Navbar />
        <main>
          <div className="table-data" style={{marginTop:"-10px"}}>
            <div className="order">
              <div className="head">
                <h3>Users Info</h3>
              </div>
              <table id="user" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ddd' }}>
                  <th style={{ padding: '10px', textAlign: 'start', borderBottom: '1px solid #ddd' }}>Username</th>
                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Email</th>
                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Phone Number</th>
                  <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>Profession</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px', textAlign: 'start', borderBottom: '1px solid #ddd' }}>{user.username}</td>
                    <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                    <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{user.phno}</td>
                    <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{user.profession}</td>
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

export default Users;