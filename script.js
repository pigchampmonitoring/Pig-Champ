function toggleDrawer() {
  var drawer = document.querySelector(".drawer");
  drawer.classList.toggle("active");
}

/* Join Button */
// Function to open the popup and blur the background
document.getElementById("joinButton").addEventListener("click", function () {
  document.getElementById("registerPopup").style.display = "block";
  document.getElementById("blurBackground").classList.add("blur");
});

// JS for Popup
function closePopup() {
  document.getElementById("registerPopup").style.display = "none";
  document.getElementById("blurBackground").classList.remove("blur");
}
function closeLoginPopup() {
  document.getElementById("loginPopup").style.display = "none";
  document.getElementById("blurBackground").classList.remove("blur");
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

// Toggle password visibility
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordInput");
  const togglePassword = document.getElementById("togglePassword");

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });
});

document.getElementById("loginButton").addEventListener("click", function () {
  document.getElementById("loginPopup").style.display = "block";
  document.getElementById("blurBackground").classList.add("blur");
});

document.addEventListener("DOMContentLoaded", function () {
  const loginPasswordInput = document.getElementById("loginPasswordInput");
  const toggleLoginPassword = document.getElementById("toggleLoginPassword");

  toggleLoginPassword.addEventListener("click", function () {
    const type =
      loginPasswordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    loginPasswordInput.setAttribute("type", type);
  });
});

function registerUser(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect form data
  const formData = {
    action: "register",
    username: document.querySelector(
      '.registration-form input[name="username"]'
    ).value,
    email: document.querySelector('.registration-form input[name="email"]')
      .value,
    password: document.querySelector(
      '.registration-form input[name="password"]'
    ).value,
    repeatPassword: document.querySelector(
      '.registration-form input[name="repeatPassword"]'
    ).value
    // Add other form fields as needed
  };

  if (formData.password !== formData.repeatPassword) {
    document.getElementById("passwordMismatch").style.display = "block"; // Show the password mismatch message
    return; // Exit function early if passwords don't match
  } else {
    document.getElementById("passwordMismatch").style.display = "none"; // Hide the password mismatch message if passwords match
  }

  // Send POST request using Fetch API
  const fetchUrl =
    "https://script.google.com/macros/s/AKfycbx2ZOj9vsAVA2wkh8TGIwsybro26Sq9lpm5VIZDRaUitJOR8jG5hLltt3OmucSdxfXj/exec"; // Replace with your API endpoint
  fetch(fetchUrl, {
    redirect: "follow",
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:");
      console.log("Token:", data);
        localStorage.setItem("token", data);
        window.location.href = "Pigs-Profile.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
// Clear input fields immediately after form submission
  document.querySelector(
    '.registration-form input[name="username"]'
  ).value = "";
  document.querySelector('.registration-form input[name="email"]').value = "";
  document.querySelector(
    '.registration-form input[name="password"]'
  ).value = "";
  document.querySelector(
    '.registration-form input[name="repeatPassword"]'
  ).value = "";
  document.getElementById("registerPopup").style.display = "none";
  document.getElementById("blurBackground").classList.remove("blur");
}

function loginUser(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect form data
  const formData = {
    action: "login",
    email: document.querySelector('.login-form input[name="email"]').value,
    password: document.querySelector('.login-form input[name="pass"]').value
  };
  // Send POST request using Fetch API
  const fetchUrl =
    "https://script.google.com/macros/s/AKfycbx2ZOj9vsAVA2wkh8TGIwsybro26Sq9lpm5VIZDRaUitJOR8jG5hLltt3OmucSdxfXj/exec"; // Replace with your API endpoint
  fetch(fetchUrl, {
    redirect: "follow",
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Parse response as text
    })
    .then((data) => {
      console.log("Response from server:");
      if (data !== "Data is not present") {
        // Token is received
        console.log("Token:", data);
        localStorage.setItem("token", data);
        window.location.href = "Pigs-Profile.html";
      } else { 
        console.log("Data is not present");
        // Handle case when data is not present
      }
      document.querySelector('.login-form input[name="email"]').value = "";
      document.querySelector('.login-form input[name="pass"]').value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  document.getElementById("loginPopup").style.display = "none";
  document.getElementById("blurBackground").classList.remove("blur");
}


function toggleRepeatPasswordVisibility() {
  var repeatPasswordInput = document.getElementById("repeatPasswordInput");
  var toggleRepeatPassword = document.getElementById("toggleRepeatPassword");

  if (repeatPasswordInput.type === "password") {
    repeatPasswordInput.type = "text";
    toggleRepeatPassword.src =
      "https://github.com/nthnlgmz/imgs/assets/143614589/71ac831f-0fb7-414a-a0ad-2be00d8d7698";
  } else {
    repeatPasswordInput.type = "password";
    toggleRepeatPassword.src =
      "https://github.com/nthnlgmz/imgs/assets/143614589/71ac831f-0fb7-414a-a0ad-2be00d8d7698";
  }
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
