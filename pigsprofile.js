function toggleDrawer() {
  var drawer = document.querySelector(".drawer");
  drawer.classList.toggle("active");
}

function closeaddpigpopup() {
  document.getElementById("addPigPopup").style.display = "none";
  document.getElementById("blurBackground").classList.remove("blur");
}
function showAddPigPopup() {
  document.getElementById("addPigPopup").style.display = "block";
  document.getElementById("blurBackground").classList.add("blur");
}
function closeAddPigPopup() {
  document.getElementById("addPigPopup").style.display = "none";
  document.getElementById("blurBackground").classList.remove("blur");
}

// Function to validate the add pig form
function validateAddPigForm() {
  // Add your form validation logic here
  // For example, check if all required fields are filled
  return true; // Return true if the form is valid and should be submitted, false otherwise
}

// Function to toggle the display of the Offspring and Birth Count fields based on the selected gender
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
  // Retrieve input values
  var pigName = document.getElementById("pigName").value;
  var pigWeight = document.getElementById("pigWeight").value;
  var pigAge = document.getElementById("pigAge").value;
  var pigGender = document.getElementById("pigGender").value;
  var offspringCount = document.getElementById("offspringCount").value;

  // Create a new card div
  var card = document.createElement("div");
  card.classList.add("card");

  // Create left side of the card
  var left = document.createElement("div");
  left.classList.add("left");
  var imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  var pigImage = document.createElement("img");
  pigImage.src = "path_to_default_image"; // Set default image path here
  pigImage.alt = "Pig Image";
  imageContainer.appendChild(pigImage);
  left.appendChild(imageContainer);

  // Create right side of the card
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

  // Append left and right sides to the card
  card.appendChild(left);
  card.appendChild(right);

  // Append the new card to the pigs content section
  var pigsContent = document.querySelector(".pigs-content");
  pigsContent.appendChild(card);

  // Clear form fields
  document.getElementById("pigName").value = "";
  document.getElementById("pigWeight").value = "";
  document.getElementById("pigAge").value = "";
  document.getElementById("pigGender").value = "male";
  document.getElementById("offspringCount").value = "";

  // Close the form
  document.getElementById("addPigPopup").style.display = "none";
  document.getElementById("blurBackground").classList.remove("blur");
}
