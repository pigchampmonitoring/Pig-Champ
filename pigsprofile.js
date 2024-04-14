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

  function showAddPigPopup() {
    document.getElementById("addPigPopup").style.display = "block";
    document.getElementById("blurBackground").classList.add("blur");
  }

  function closeaddpigpopup() {
    document.getElementById("addPigPopup").style.display = "none";
    document.getElementById("blurBackground").classList.remove("blur");
  }

  function logout() {
    localStorage.setItem('token', '');
    window.location.href = 'index.html';
  }

  function toggleOffspringField() {
    var gender = document.getElementById("pigGender").value;
    var offspringField = document.getElementById("offspringField");
    var birthCountField = document.getElementById("birthCount");
    if (gender === "female") {
      offspringField.style.display = "block";
      birthCountField.style.display = "block";
    } else {
      offspringField.style.display = "none";
      birthCountField.style.display = "none";
    }
  }

function calculateAge(birthdate) {
    var today = new Date();
    var years = today.getFullYear() - birthdate.getFullYear();
    var months = today.getMonth() - birthdate.getMonth();
    var days = today.getDate() - birthdate.getDate();

    if (months < 0 || (months === 0 && today.getDate() < birthdate.getDate())) {
        years--;
        months += 12;
    }

    if (days < 0) {
        months--;
        var tempDate = new Date(birthdate.getFullYear(), birthdate.getMonth() + 1, 0);
        days += tempDate.getDate();
    }

    return {
        years: years,
        months: months,
        days: days
    };
}

function formatAge(age) {
    if (age.years > 0) {
        return age.years + (age.years === 1 ? " year" : " years") + " old";
    } else if (age.months > 0) {
        return age.months + (age.months === 1 ? " month" : " months") + " old";
    } else {
        return age.days + (age.days === 1 ? " day" : " days") + " old";
    }
}

function sendPigs2Hell(name, weight, birthdate, gender, offspringCount, imageData) {
    var token = localStorage.getItem('token');
    
    var data = {
        action: "addpig",
        token: token,
        name: name,
        weight: weight,
        birthdate: birthdate,
        gender: gender,
        offspringCount: offspringCount,
        imageData: imageData
    };

    return fetch('https://script.google.com/macros/s/AKfycbyh3SCrMuqb7U24KyiEuf8G8lACexAJct3h1Q6Awm3Itv-hZrer7xcgByi1uT6WLZm-Zg/exec', {
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
        // Handle the response if needed
        console.log('Pig added successfully:', data);
    })
    .catch(error => {
        console.error('There was a problem with the POST request:', error);
    });
}

function addPig() {
    var pigName = document.getElementById("pigName").value;
    var pigWeight = document.getElementById("pigWeight").value;
    var pigBirthdate = new Date(document.getElementById("pigBirthdate").value).toISOString();
    var pigGender = document.getElementById("pigGender").value;
    var offspringCount = document.getElementById("offspringCount").value;

    // Get the image data
    var pigImageInput = document.getElementById("pigImageInput");
    var pigImageFile = pigImageInput.files[0];
    var defaultImageURL = "https://github.com/pigchampmonitoring/Pig-Champ/assets/166279981/99f91bd4-6981-4ba6-9d10-1075b540b446";

    var imageData = "";
    if (pigImageFile) {
        var reader = new FileReader();

        reader.onloadend = function() {
            // Convert image to Base64
            imageData = reader.result.split(",")[1];
            sendPigs2Hell(pigName, pigWeight, pigBirthdate, pigGender, offspringCount, imageData)
        };

        reader.readAsDataURL(pigImageFile);
    } else {
        // Use default image
        sendPigs2Hell(pigName, pigWeight, pigBirthdate, pigGender, offspringCount, "")
    }

    document.getElementById("pigName").value = "";
    document.getElementById("pigWeight").value = "";
    document.getElementById("pigBirthdate").value = ""; // Clear birthdate input
    document.getElementById("pigGender").value = "male";
    document.getElementById("offspringCount").value = "";

    document.getElementById("addPigPopup").style.display = "none";
    document.getElementById("blurBackground").classList.remove("blur");
 sendPostRequest();
}



function previewImage(event) {
    var input = event.target;
    var reader = new FileReader();
    
    reader.onload = function() {
        var dataURL = reader.result;
        var img = document.createElement("img");
        img.src = dataURL;
        
        // Display the image preview
        var imageContainer = document.querySelector(".image-container");
        imageContainer.innerHTML = ""; // Clear previous image
        imageContainer.appendChild(img);
    };

    reader.readAsDataURL(input.files[0]);
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
               alert("You don't belong here, why don't you just login or register.");
               window.location.href = "index.html";
            } else {
                var jsonData = JSON.parse(data);
                jsonData.forEach(function(pig) {
                    var pigCard = document.createElement("div");
                    pigCard.className = "card";

                    var imageContainer = document.createElement("div");
                    imageContainer.className = "left";

                    var pigImage = document.createElement("img");
                    pigImage.src = pig["Image Link"];
                    pigImage.alt = pig["Pig Name"];
                    imageContainer.appendChild(pigImage);

                    var detailsContainer = document.createElement("div");
                    detailsContainer.className = "right";

                    var pigName = document.createElement("h2");
                    pigName.textContent = pig["Pig Name"];

                    var pigWeight = document.createElement("p");
                    pigWeight.textContent = "Weight: " + pig["Weight"] + " kg";

                    var pigAgeGender = document.createElement("p");
                    pigAgeGender.textContent = "Age: " + pig["Age"] + " years, Gender: " + pig["Gender"];

                    var pigOffspringBirths = document.createElement("p");
                    pigOffspringBirths.textContent = "Offspring Count: " + pig["Offspring Count"] + ", Number of Births: " + pig["Number of Births"];

                    detailsContainer.appendChild(pigName);
                    detailsContainer.appendChild(pigWeight);
                    detailsContainer.appendChild(pigAgeGender);
                    detailsContainer.appendChild(pigOffspringBirths);

                    // Add "More Info" button only for female pigs
                    if (pig["Gender"] === "female") {
                        var moreInfoButton = document.createElement("button");
                        moreInfoButton.textContent = "More Info";
                        detailsContainer.appendChild(moreInfoButton);
                    }

                    pigCard.appendChild(imageContainer);
                    pigCard.appendChild(detailsContainer);

                    pigsContainer.appendChild(pigCard);
                });
            }
        })
        .catch(error => {
            console.error('There was a problem with the POST request:', error);
        });
}

sendPostRequest();
})
