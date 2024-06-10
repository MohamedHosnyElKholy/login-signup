const anchors = document.querySelector(".anchor");
const aboa = document.querySelector(".aboa");
const emileinp = document.querySelector(".emileinp");
const passinp = document.querySelector(".passinp");

anchors.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.setItem('newWord', 'Signin');
  window.location.href = "signup.html";
});

let x = JSON.parse(localStorage.getItem("user")) || [];

aboa.addEventListener("click", function () {
  let cartonaone = "";
  if (emileinp.value == "" || passinp.value == "") {
    cartonaone += `
      <span class="text-danger text-center fw-bold fs-5 m-3">All inputs are required</span>
    `;
  } else if (x.length == 0) {
    cartonaone += `
      <span class="text-danger text-center fw-bold fs-5 m-3">incorrect email or password</span>
    `;
  } else {
    let userFound = false;
    for (let i = 0; i < x.length; i++) {
      if (x[i].email == emileinp.value && x[i].passs == passinp.value) {
        userFound = true;
        console.log('done');
        window.location.href = 'welcome.html';
        break;
      }
    }
    if (!userFound) {
      cartonaone += `
        <span class="text-danger text-center fw-bold fs-5 m-3">incorrect email or password</span>
      `;
    }
  }
  document.getElementById("exit").innerHTML = cartonaone;
});

window.addEventListener('load', function() {
  let newWord = localStorage.getItem('newWord');
  if (newWord) {
    document.querySelector('.anchor').innerHTML = newWord;
    localStorage.removeItem('newWord');
  }
});
