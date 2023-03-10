import { useEffect, useState, useRef } from "react";

function QaFeedback() {
  let [feedback, setFeedback] = useState("");
  let [number, setNumber] = useState("");
  let [feedbacks, setFeedbacks] = useState([]);
  let [visible, setVisible] = useState(false);
  let [feedbackEdit, setFeedbackEdit] = useState([]);
  let [feedbackChange, setFeedbackChange] = useState("");
  let [avg, setAvg] = useState(0);
  let inputRef = useRef();
  useEffect(() => {
    let avgcurent = 0;
    for (const element of feedbacks) {
      avgcurent += parseInt(element.number);
    }
    setAvg((avgcurent / feedbacks.length).toFixed(2));
  }, [feedbacks]);

  useEffect(() => {
    fetch("http://localhost:3000/feedbacks")
      .then((res) => res.json())
      .then((todos) => {
        setFeedbacks(todos);
      })
      .catch((err) => console.log(err));
  }, []);

  let handleSubmit = () => {
    if (!feedback || feedback.length < 10 || !number) {
      alert("Missing Feedback or Number ");
      return;
    }
    let newid;
    if (feedbacks.length) {
      newid = feedbacks[feedbacks.length - 1].id + 1;
    } else {
      newid = 1;
    }
    // lưu dữ liệu vào data base
    let newfeedback = {
      id: newid,
      feedback: feedback,
      number: number,
    };

    fetch("http://localhost:3000/feedbacks", {
      method: "POST",
      body: JSON.stringify(newfeedback),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json)
      .then((data) => {
        ///Update vô giao diện
        setFeedbacks([...feedbacks, newfeedback]);
        inputRef.current.focus();
        setFeedback("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (e, i) => {
    const result = window.confirm("Are you sure to delete?");
    if (result) {
      // Delete logic goes here
      fetch(`http://localhost:3000/feedbacks/${e.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json)
        .then((data) => {
          let feedbackClone = [...feedbacks];
          feedbackClone.splice(i, 1);
          setFeedbacks(feedbackClone);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleSubmitEdit = (e) => {
    if (!feedbackChange || feedbackChange.length < 10 || !number) {
      alert("Missing Feedback or Number ");
      return;
    }
    let isEmtyObj = Object.keys(feedbackEdit).length === 0;
    if (isEmtyObj === false) {
      let updateFeedback = { ...feedbackEdit };
      fetch(`http://localhost:3000/feedbacks/${e.id}`, {
        method: "PUT",
        body: JSON.stringify(updateFeedback),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let feedbackClone = [...feedbacks];
          let objIndex = feedbacks.findIndex((obj) => obj.id == data.id);

          //Update object's name property.
          feedbackClone[objIndex].feedback = feedbackChange;
          feedbackClone[objIndex].number = number;
          setFeedbacks([...feedbackClone]);
          setFeedbackEdit([]);
          inputRef.current.focus();
        });
    }
  };

  const handleEdit = (e, i) => {
    setNumber(e.number);
    setFeedbackEdit(e);
  };
  let isEmtyObj = Object.keys(feedbackEdit).length === 0;
  const handleOnchangfeedbackEdit = (e) => {
    setFeedbackChange(e.target.value);
    let feedbackEditCopy = { ...feedbackEdit };
    feedbackEditCopy.feedback = e.target.value;
    feedbackEditCopy.number = number;
    setFeedbackEdit(feedbackEditCopy);
  };

  return (
    <div className="App">
      <h1>Feedback TA</h1>
      <div className="container-TA">
        <div className="elemnt-form">
          <h2>Thầy Phú dạy anh em có hay không???</h2>
          <div className="points">
            <button
              className={number == "1" ? "elemnt-point select" : "elemnt-point"}
              value="1"
              onClick={(e) => setNumber(e.target.value)}
            >
              1
            </button>
            <button
              className={number == "2" ? "elemnt-point select" : "elemnt-point"}
              onClick={(e) => setNumber(e.target.value)}
              value="2"
            >
              2
            </button>
            <button
              className={number == "3" ? "elemnt-point select" : "elemnt-point"}
              value="3"
              onClick={(e) => setNumber(e.target.value)}
            >
              3
            </button>
            <button
              className={number == "4" ? "elemnt-point select" : "elemnt-point"}
              value="4"
              onClick={(e) => setNumber(e.target.value)}
            >
              4
            </button>
            <button
              className={number == "5" ? "elemnt-point select" : "elemnt-point"}
              value="5"
              onClick={(e) => setNumber(e.target.value)}
            >
              5
            </button>
            <button
              className={number == "6" ? "elemnt-point select" : "elemnt-point"}
              value="6"
              onClick={(e) => setNumber(e.target.value)}
            >
              6
            </button>
            <button
              className={number == "7" ? "elemnt-point select" : "elemnt-point"}
              value="7"
              onClick={(e) => setNumber(e.target.value)}
            >
              7
            </button>
            <button
              className={number == "8" ? "elemnt-point select" : "elemnt-point"}
              value="8"
              onClick={(e) => setNumber(e.target.value)}
            >
              8
            </button>
            <button
              className={number == "9" ? "elemnt-point select" : "elemnt-point"}
              value="9"
              onClick={(e) => setNumber(e.target.value)}
            >
              9
            </button>
            <button
              className={
                number == "10" ? "elemnt-point select" : "elemnt-point"
              }
              value="10"
              onClick={(e) => setNumber(e.target.value)}
            >
              10
            </button>
          </div>
          <div className="elemnt-input">
            {feedbackEdit.id != undefined ? (
              <>
                <input
                  type="text"
                  ref={inputRef}
                  value={feedbackEdit.feedback}
                  onChange={(e) => {
                    handleOnchangfeedbackEdit(e);
                  }}
                />
                <button onClick={() => handleSubmitEdit(feedbackEdit)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <input
                  value={feedback}
                  ref={inputRef}
                  type="text"
                  placeholder="Write a review"
                  onChange={(e) => {
                    setFeedback(e.target.value);
                    setVisible(true);
                  }}
                />
                <button onClick={handleSubmit}>Add</button>
              </>
            )}
          </div>
          <>
            {visible === true &&
            feedback.length <= 10 &&
            feedbackChange.length <= 10 ? (
              <p>Text must at least contain 10 characters</p>
            ) : (
              ""
            )}
          </>
        </div>
        <div className="review">
          <div> {feedbacks.length} Reviews</div>
          <div>Average Rating {avg}</div>
        </div>

        <div className="elemnt-review">
          {feedbacks.map((e, i) => (
            <div key={i} className="item">
              <button className="elemnt-point">{e.number}</button>
              <span
                className="elemnt-delete"
                onClick={() => handleDelete(e, i)}
              >
                &times;
              </span>
              <span
                className="elemnt-edit"
                onClick={() => {
                  handleEdit(e, i);
                }}
              >
                &#9998;
              </span>

              <p>{e.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QaFeedback;
