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
    name: /^[A-Za-z\s\-]{3,50}$/,  // تحقق من الاسم
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // تحقق من البريد الإلكتروني
    passs: /^\d{7}$/,  // تحقق من كلمة المرور
  };

  if (data[element.id].test(element.value)) {  // إذا كانت المدخلات صالحة
    element.classList.add("lighting");
    element.classList.remove("lighting-re");
    return true;
  } else {  // إذا كانت المدخلات غير صالحة
    element.classList.add("lighting-re");
    element.classList.remove("lighting");
    return false;
  }
}
// دالة لإضافة المستخدم إلى localStorage إذا كانت المدخلات صحيحة
function getUser() {
  // إعادة تعيين الرسالة قبل التحقق من صحة الحقول
  let cartona = "";

  let isValidName = valdtions(nameinp);  // تحقق من صحة الاسم
  let isValidEmail = valdtions(emileinp);  // تحقق من صحة البريد الإلكتروني
  let isValidPass = valdtions(passinp);  // تحقق من صحة كلمة المرور

  // تحقق من أن جميع الحقول ممتلئة
  if (nameinp.value === "" || emileinp.value === "" || passinp.value === "") {
    cartona = `
      <h4 class="text-danger">All inputs are required. Please fill in all fields.</h4>
    `;
  } else if (isValidName && isValidEmail && isValidPass) {  // إذا كانت جميع المدخلات صالحة
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
      localStorage.setItem('user', JSON.stringify(arr));  // إضافة المستخدم إلى localStorage
    }
  } else {  // إذا كانت أي من المدخلات غير صالحة
    cartona = `
      <h4 class="text-danger">Some inputs are not valid. Please check your inputs.</h4>
    `;
  }
  document.getElementById("exit").innerHTML = cartona;  // عرض الرسالة للمستخدم
}

clicksignbtn.addEventListener("click", getUser);  // ربط الزر بدالة getUser
