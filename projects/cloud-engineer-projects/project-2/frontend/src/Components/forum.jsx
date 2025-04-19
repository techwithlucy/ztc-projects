import { useEffect, useRef, useState } from 'react';
import './css/forum.css';
import { useLocation } from 'react-router-dom';

function Forum() {

  const taskRef = useRef("");
  const [message, setMessage] = useState([]);
  const [name, setName] = useState(localStorage.getItem("name"));
  const [course, setCourse] = useState();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];

  const [formData, setFormData] = useState({
    name: name,
    course_id: courseId,
    content: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/discussions/${courseId}`)
      .then((res) => res.json())
      .then((data) => setMessage(data));
      fetch(`http://localhost:8080/api/courses/${courseId}`).then((res)=>res.json()).then((data)=>setCourse(data));
  }, []);

  const addTask = () => {
    if (taskRef.current && taskRef.current.value.trim() !== "") {
      const newMessage = taskRef.current.value.trim();
      setFormData({ ...formData, content: newMessage });
  
      fetch('http://localhost:8080/api/discussions/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then(() => {
        taskRef.current.value = ""; 
        setMessage([...message, formData]);
        setFormData({ ...formData, content: "" }); 
      });
    } else {
      alert("Enter a Message");
    }
  }
  console.log(course);

  return (
    <div className="Forum">
      <h2 style={{ color: 'black', marginLeft: '16px' }}>Discussion Forum for {course?.course_name}</h2>
      
      <div className='inputContainer'>
        <textarea
          cols='30'
          rows='5'
          type='text'
          ref={taskRef}
          name="taskInput"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </div>
      <div className='snd'>
        <button onClick={addTask}>Send</button>
      </div>
      {message.length>0 &&
      <div className='taskContainer'>
        
        {message.map((value, key) => {  
          if (value.content.trim() !== "") {
            return (
              <div className='taskItem' key={key}>
                <p style={{ color: 'black' }}><div style={{fontSize:"12px" ,padding:"2px",borderRadius:"8px" , color:"brown", marginLeft:"-9px" , marginTop:"-10px" , fontWeight:"bold"}}>{value.uName}</div>{value.content}</p>
              </div>
            );
          }
          return null;
        })}
      </div>}
      
    </div>
  );
}

export default Forum;
