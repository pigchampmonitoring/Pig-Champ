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

// Function to open the More Info popup
function openMoreInfoPopup() {
    document.getElementById("moreInfoPopup").style.display = "block";
    document.getElementById("blurBackground").classList.add("blur");
}

// Function to close the More Info popup
function closeMoreInfoPopup() {
    document.getElementById("moreInfoPopup").style.display = "none";
    document.getElementById("blurBackground").classList.remove("blur");
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
    var pigBirthdate = document.getElementById("pigBirthdate").value;
    var pigGender = document.getElementById("pigGender").value;
    var offspringCount;
    var numberOfBirths;
    var token = localStorage.getItem('token');

    // Validate if any field is empty
    if (pigName === "" || pigWeight === "" || pigBirthdate === "" || pigGender === "") {
        document.getElementById("incompleteDetails").style.display = "block";
        return; // Exit function if any field is empty
    }

    // Conditionally handle offspringCount and numberOfBirths based on pigGender
    if (pigGender === "female") {
        // For female pigs, get the value of offspring count and number of births
        offspringCount = document.getElementById("offspringCount").value;
        numberOfBirths = document.getElementById("birthCount").value;

        // Validate if offspringCount is filled
        if (offspringCount === "") {
            document.getElementById("incompleteDetails").style.display = "block";
            return; // Exit function if offspring count is empty for female pigs
        }
    }

    // Log the data entered by the user
    console.log("Pig Name:", pigName);
    console.log("Pig Weight:", pigWeight);
    console.log("Pig Birthdate:", pigBirthdate);
    console.log("Pig Gender:", pigGender);

    // Conditionally handle offspringCount and numberOfBirths based on pigGender
    if (pigGender === "male") {
        // For male pigs, there is no need for offspring count or number of births
        offspringCount = "";
        numberOfBirths = "";
    } else {
        // For female pigs, get the value of offspring count and number of births
        offspringCount = document.getElementById("offspringCount").value;
        numberOfBirths = document.getElementById("birthCount").value;
        // Log the additional data
        console.log("Offspring Count:", offspringCount);
        console.log("Number of Births:", numberOfBirths);
    }

    // Retrieve the image data URL
    var input = document.getElementById("pigImageInput");
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function() {
        var dataURL = reader.result;
        // Log the image data URL
        console.log("Image Data:", dataURL);

        // Your existing logic to send data to server or perform other actions
        var data = {
            action: "addpig",
            token: token,
            name: pigName,
            weight: pigWeight,
            birthdate: pigBirthdate,
            gender: pigGender,
            offspringCount: offspringCount,
            numberOfBirths: numberOfBirths,
            imageData: dataURL
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
                // Handle the response if needed
                console.log('Pig added successfully:', data);
                if (data.includes("success")) {
                    window.location.href = "Pigs-Profile.html";
                }
            })
            .catch(error => {
                console.error('There was a problem with the POST request:', error);
            });

        closeaddpigpopup();
    };

    if (file) {
        reader.readAsDataURL(file); // Read the file as a data URL
    }
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
                  var moreInfoButton = document.createElement("button");

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
                     moreInfoButton.onclick = openMoreInfoPopup;
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

// Get references to the date input fields
var firstMateInput = document.getElementById("firstMate");
var secondMateInput = document.getElementById("secondMate");
var thirdMateInput = document.getElementById("thirdMate");
var dueDateInput = document.getElementById("dueDate");

// Add event listener to the firstMateInput field
firstMateInput.addEventListener("change", function() {
  // If the first mate is set, enable the second mate input
  if (firstMateInput.value !== "") {
    secondMateInput.removeAttribute("disabled");
  } else {
    // If the first mate is empty, disable and clear the second mate input
    secondMateInput.setAttribute("disabled", true);
    secondMateInput.value = "";
  }
});

// Add event listener to the secondMateInput field
secondMateInput.addEventListener("change", function() {
  // If the second mate is set, enable the third mate input
  if (secondMateInput.value !== "") {
    thirdMateInput.removeAttribute("disabled");
  } else {
    // If the second mate is empty, disable and clear the third mate input
    thirdMateInput.setAttribute("disabled", true);
    thirdMateInput.value = "";
  }
});

// Add event listener to the thirdMateInput field
thirdMateInput.addEventListener("change", function() {
  // No need for additional logic as the third mate input is not followed by another input
  // Calculate due date based on the third mate input date
  if (thirdMateInput.value !== "") {
    // Parse the date string to a Date object
    var thirdMateDate = new Date(thirdMateInput.value);
    // Add 10 months to the third mate date
    var dueDate = new Date(thirdMateDate.getFullYear(), thirdMateDate.getMonth() + 10, thirdMateDate.getDate());
    // Format the due date as YYYY-MM-DD
    var formattedDueDate = dueDate.toISOString().split('T')[0];
    // Set the due date input value
    dueDateInput.value = formattedDueDate;
  } else {
    // If the third mate date is empty, clear the due date input
    dueDateInput.value = "";
  }
});

var addInfoButton = document.getElementById("addInfoButton");
addInfoButton.addEventListener("click", function() {
  // Clone the mate container
  var mateContainer = document.querySelector(".mate-container");
  var newMateContainer = mateContainer.cloneNode(true);
  
  // Clear the values of date inputs
  var dateInputs = newMateContainer.querySelectorAll("input[type='date']");
  dateInputs.forEach(function(input) {
    input.value = "";
  });
  
  // Append the new mate container to the parent
  mateContainer.parentNode.appendChild(newMateContainer);
});
