
let logout = document.querySelector(".logout");
let x = JSON.parse(localStorage.getItem('user'));
let car = "";
function welcome(){
    for(let i =0; i < x.length; i++) {
        car = `
    <h1 class="text-info fs-1">Welcome ${x[i].name}</h1>
    `
    }
    document.getElementById("welc").innerHTML= car;
    localStorage.setItem("sessions",JSON.stringify(x[x.length - 1].name));
}
welcome();
logout.addEventListener('click', function(){
   localStorage.removeItem('sessions');
   window.location.href = 'index.html';
})