 var menuToggle = document.querySelector('.menu-toggle');
  var drawer = document.querySelector('.drawer');
  var pigsContainer = document.querySelector(".pigs-content");  // Moved here

  function toggleDrawer() {
    drawer.classList.toggle('active');
  }

  function closeDrawer(event) {
    var isClickedInsideDrawer = drawer.contains(event.target) || menuToggle.contains(event.target) || event.target.closest('.drawer');
    if (!isClickedInsideDrawer) {
      drawer.classList.remove('active');
    }
  }

  menuToggle.addEventListener('click', toggleDrawer);
  document.addEventListener('click', closeDrawer);

  function openMenu() {
    var drawers = document.getElementById('menuburger');
    drawers.style.display = drawers.style.display === 'none' ? 'block' : 'none'; 
  }

function logout() {
    localStorage.setItem('token', '');
    window.location.href = 'index.html';
  }

document.addEventListener('DOMContentLoaded', function() {
  function sendPostRequest() {
    var token = localStorage.getItem('token');
    var data = {
      action: "verify",
      token: token
    };
    fetch('https://script.google.com/macros/s/AKfycbyh3SCrMuqb7U24KyiEuf8G8lACexAJct3h1Q6Awm3Itv-hZrer7xcgByi1uT6WLZm-Zg/exec', {
            redirect: 'follow',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => { 
            if (data.includes("NMSFFU")) {
               //alert("You don't belong here, why don't you just login or register.");
               //window.location.href = "index.html";
            } else {
}

sendPostRequest();
})

const xmarks = document.querySelectorAll(".xmark-box");

xmarks.forEach(x =>{
  x.addEventListener("click", ()=>{
    const parent = x.closest(".box");
    parent.style.opacity = "0"
    setTimeout(()=>{
        parent.style.opacity ="1";
    },2000)
  })
})

