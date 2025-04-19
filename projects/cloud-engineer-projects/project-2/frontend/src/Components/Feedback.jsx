import React, { useEffect, useState } from "react";

const Feedback = (props) => {
  const [feedback, setFeedback] = useState("");

  const courseId = props.courseid;

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/feedbacks/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        const firstThreeFeedbacks = data.slice(0, 3);
        setFeedbacks(firstThreeFeedbacks);
      })
      .catch((error) => console.error("Error:", error));
  }, [courseId]);

  const sendFeedback = () => {
    if (feedback === "" && !courseId) {
      alert("Please enter feedback to submit");
    } else {
      fetch("http://localhost:8080/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: feedback, course_id: courseId }),
      })
        .then((response) => {
          console.log(response);
          setFeedback("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {}, [feedback]);

  return (
    <div className="feedback-main">
      <div className="get-input">
        <label htmlFor="email">Your Feedback</label>
        <input
          type="text"
          className="form-control"
          style={{ width: "100%", marginRight: "50px" }}
          onChange={(e) => setFeedback(e.target.value)}
          value={feedback}
        />
        <button
          onClick={sendFeedback}
          style={{
            marginTop: "5px",
            padding: "5px",
            backgroundColor: "darkviolet",
            borderRadius: "5px",
            color: "white",
          }}
        >
          Submit
        </button>
      </div>
      <div className="feedback-list">
        <h3>Recent Feedbacks:</h3>
        <ul>
          {feedbacks.map((item, index) => (
            <li key={index}>{item.comment}</li>
          ))}
        </ul>
      </div>
      <br />
    </div>
  );
};

export default Feedback;
