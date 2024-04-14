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

  function addPig() {
    var pigName = document.getElementById("pigName").value;
    var pigWeight = document.getElementById("pigWeight").value;
    var pigAge = document.getElementById("pigAge").value;
    var pigGender = document.getElementById("pigGender").value;
    var offspringCount = document.getElementById("offspringCount").value;

    var card = document.createElement("div");
    card.classList.add("card");

    var left = document.createElement("div");
    left.classList.add("left");
    var imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    var pigImage = document.createElement("img");
    pigImage.src = "path_to_default_image"; 
    pigImage.alt = "Pig Image";
    imageContainer.appendChild(pigImage);
    left.appendChild(imageContainer);

    var right = document.createElement("div");
    right.classList.add("right");
    var pigHeader = document.createElement("h2");
    pigHeader.textContent = pigName;
    var pigWeightParagraph = document.createElement("p");
    pigWeightParagraph.textContent = "Weight: " + pigWeight + " kg";
    var pigAgeOffspringParagraph = document.createElement("p");
    pigAgeOffspringParagraph.classList.add("age-offspring");
    pigAgeOffspringParagraph.textContent = "Age: " + pigAge + " years";
    if (pigGender === "female") {
      pigAgeOffspringParagraph.textContent += ", Offspring: " + offspringCount;
    }
    var moreInfoButton = document.createElement("button");
    moreInfoButton.textContent = "More Info";
    right.appendChild(pigHeader);
    right.appendChild(pigWeightParagraph);
    right.appendChild(pigAgeOffspringParagraph);
    if (pigGender === "female") {
      right.appendChild(moreInfoButton);
    }

    card.appendChild(left);
    card.appendChild(right);

    pigsContainer.appendChild(card);

    document.getElementById("pigName").value = "";
    document.getElementById("pigWeight").value = "";
    document.getElementById("pigAge").value = "";
    document.getElementById("pigGender").value = "male";
    document.getElementById("offspringCount").value = "";

    document.getElementById("addPigPopup").style.display = "none";
    document.getElementById("blurBackground").classList.remove("blur");
  }


document.addEventListener('DOMContentLoaded', function() {
  // This code will run when the page finishes loading
  
  // Function to send a POST request to the API script
  function sendPostRequest() {
    // Retrieve the token from local storage
    var token = localStorage.getItem('token');

    // Prepare the data to be sent in the request body
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
