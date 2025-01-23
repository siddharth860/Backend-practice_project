const fs = require("fs");
const filePath = "sample.json";
function createStudent(newStudent) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    json.push(newStudent);
    fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log("New student added successfully!");
      }
    });
  });
}

function readStudents() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    console.log("Students List:", json);
  });
}

function updateStudent(rollNo, updatedData) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    const updatedJson = json.map((student) =>
      student.rollNo === rollNo ? { ...student, ...updatedData } : student
    );
    fs.writeFile(filePath, JSON.stringify(updatedJson, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } 
    });
  });
}

function deleteStudent(rollNo) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    const updatedJson = json.filter((student) => student.rollNo !== rollNo);
    fs.writeFile(filePath, JSON.stringify(updatedJson, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } 
    });
  });
}



readStudents();
updateStudent(103, { studentName: "A", dept: "Mech" });
deleteStudent(100);