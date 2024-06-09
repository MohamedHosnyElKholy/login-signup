// الانتقال إلى صفحة التسجيل عند النقر على الرابط
let anchors = document.querySelector(".anchor");
anchors.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "index.html";
});

// عناصر الإدخال
const nameinp = document.querySelector(".nameinp");
const emileinp = document.querySelector(".emileinp");
const passinp = document.querySelector(".passinp");
const clicksignbtn = document.querySelector(".btnsign");

// مصفوفة المستخدمين
let arr = JSON.parse(localStorage.getItem('user')) || [];

// دالة للتحقق من صحة المدخلات
function valdtions(element) {
  let data = {
    name: /^[A-Za-z\s\-]{3,50}$/, 
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  
    passs: /^\d{7}$/, 
  };

  if (data[element.id].test(element.value)) {  
    element.classList.add("lighting");
    element.classList.remove("lighting-re");
    return true;
  } else { 
    element.classList.add("lighting-re");
    element.classList.remove("lighting");
    return false;
  }
}

function getUser() {
  let cartona = "";

  let isValidName = valdtions(nameinp);  
  let isValidEmail = valdtions(emileinp);  
  let isValidPass = valdtions(passinp);  


  if (nameinp.value === "" || emileinp.value === "" || passinp.value === "") {
    cartona = `
      <h4 class="text-danger">All inputs are required. Please fill in all fields.</h4>
    `;
  } else if (isValidName && isValidEmail && isValidPass) {  
    let emailExists = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].email === emileinp.value) {
        emailExists = true;
        break;
      }
    }

    if (emailExists) {
      cartona = `
        <h4 class="text-danger">Email already exists</h4>
      `;
    } else {
      let data = {
        name: nameinp.value,
        email: emileinp.value,
        passs: passinp.value,
      };
      arr.push(data);
      cartona = `
        <h4 class="text-info">Success</h4>
      `;
      localStorage.setItem('user', JSON.stringify(arr));  
    }
  } else {  
    cartona = `
      <h4 class="text-danger">Some inputs are not valid. Please check your inputs.</h4>
    `;
  }
  document.getElementById("exit").innerHTML = cartona; 
}

clicksignbtn.addEventListener("click", getUser);  