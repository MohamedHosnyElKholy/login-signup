const anchors = document.querySelector(".anchor");
const aboa = document.querySelector(".aboa");
const emileinp = document.querySelector(".emileinp");
const passinp = document.querySelector(".passinp");
anchors.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "signup.html";
});
let x = JSON.parse(localStorage.getItem("user")) || [];
aboa.addEventListener("click", function () {
  
  let cartonaone = "";
  if (emileinp.value == "" || passinp.value == "") {
    cartonaone += `
    <span class="text-danger text-center fw-bold fs-5 m-3">All inputs is required</span>
  `;
  }else   if (x.length == 0) {
    cartonaone += `
<span class="text-danger text-center fw-bold fs-5 m-3">incorrect email or password</span>
`;
}
  else{
    for (let i = 0; i < x.length; i++){
      if (x[i].email == emileinp.value && x[i].passs == passinp.value) {
        console.log('done');
        window.location.href = 'welcome.html';
      }else{
             cartonaone += `
               <span class="text-danger text-center fw-bold fs-5 m-3">incorrect email or password</span>
             `;
      }
    }
  }
  document.getElementById("exit").innerHTML = cartonaone;
});
