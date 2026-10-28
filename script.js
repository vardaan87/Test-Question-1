let editingStudentId = null;

function handleFormSubmit(event) {
  event.preventDefault();

  const studentDetails = {
    name: event.target.name.value,
    mobile: event.target.mobile.value,
    address: event.target.address.value,
  };

  if (editingStudentId !== null) {
    axios
      .put(
        `https://crudcrud.com/api/7126b0d8ff3c4e948dd3f0364bf9c87d/students/${editingStudentId}`,
        studentDetails,
      )
      .then(() => {
        editingStudentId = null;
        event.target.reset();
        fetchStudents();
        console.log("Student updated successfully");
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .post(
        "https://crudcrud.com/api/7126b0d8ff3c4e948dd3f0364bf9c87d/students",
        studentDetails,
      )
      .then(() => {
        fetchStudents();
        event.target.reset();
      })
      .catch((err) => console.log(err));
  }
}

function displayStudentDetails(student) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  const details = document.createElement("span");
  details.textContent =
    student.name + "  " + student.mobile + "  " + student.address;
  li.appendChild(details);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delBtn";

  deleteBtn.addEventListener("click", () => deleteStudentDetails(student));

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "editBtn";

  editBtn.addEventListener("click", () => editStudentDetails(student));

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  ul.appendChild(li);
}

function deleteStudentDetails(student) {
  axios
    .delete(
      `https://crudcrud.com/api/7126b0d8ff3c4e948dd3f0364bf9c87d/students/${student._id}`,
    )
    .then((res) => {
      fetchStudents();
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

function editStudentDetails(student) {
  const name = document.querySelector("#name");
  name.value = student.name;
  const mobile = document.querySelector("#mobile");
  mobile.value = student.mobile;
  const address = document.querySelector("#address");
  address.value = student.address;

  editingStudentId = student._id;
}

function fetchStudents() {
  axios
    .get("https://crudcrud.com/api/7126b0d8ff3c4e948dd3f0364bf9c87d/students")
    .then((res) => {
      const ul = document.querySelector("ul");
      ul.innerHTML = "";
      const studentCount = document.querySelector("p");
      studentCount.textContent = `Student Count : ${res.data.length}`;

      for (let i = 0; i < res.data.length; i++) {
        displayStudentDetails(res.data[i]);
      }
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", fetchStudents);
