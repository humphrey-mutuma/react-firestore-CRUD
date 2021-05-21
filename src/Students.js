import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Button } from "@material-ui/core";

import { db } from "./firebase";

const Students = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  // initial students info state
  const [studentsInfo, setStudentsInfo] = useState([]);

  // send students data to firebase firestore
  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("Students")
      .add({
        name: name,
        age: age,
        course: course,
      })
      .then(() => {
        alert("Data sent successfully");
      })
      .catch((error) => {
        console.log("The students error: " + error);
      });

    setName("");
    setAge("");
    setCourse("");
  };

  // *************************************
  // retrieve students info from firestore

  useEffect(() => {
    db.collection("Students").onSnapshot((snapshot) => {
      setStudentsInfo(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  
  return (
    <center>
      <h2>React firebase firestore Test</h2>

      <form noValidate autoComplete="off">
        <FormControl variant="outlined">
          <OutlinedInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </FormControl>
        <br />
        <br />
        <FormControl variant="outlined">
          <OutlinedInput
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            type="number"
          />
        </FormControl>
        <br />
        <br />

        <FormControl variant="outlined">
          <OutlinedInput
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course"
          />
        </FormControl>
        <br />
        <br />
        <Button
          onClick={handleSubmit}
          color="primary"
          variant={name && age && course ? "outlined" : "disabled"}
          type="submit"
        >
          Submit
        </Button>
      </form>

      {/* ******************Show data************************** */}
      <hr />
      <main>
        <h1>Them Students Info</h1>
        <div>
          {studentsInfo?.map((studentInfo) => (
            <div style={{ border: "1px solid grey" }}>
              <p>Name: {studentInfo.name}</p>
              <p>Age: {studentInfo.age}</p>
              <p>Course: {studentInfo.course}</p>
            </div>
          ))}
      
        </div>
      </main>
    </center>
  );
};
export default Students;
