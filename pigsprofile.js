function toggleDrawer() {
  var drawer = document.querySelector(".drawer");
  drawer.classList.toggle("active");
}

/* Join Button */
// Function to open the popup and blur the background
function showRegister() {
  closeaddpigpopup();
  document.getElementById("registerPopup").style.display = "block";
  document.getElementById("blurBackground").classList.add("blur");
}

document
  .querySelector("#joinButton, #joinBtn")
  .addEventListener("click", showRegister);

function showLogin() {
  closeaddpigpopup();
  closePopup();
  document.getElementById("loginPopup").style.display = "block";
  document.getElementById("blurBackground").classList.add("blur");
}

document
  .querySelector("#loginButton, #loginbtn")
  .addEventListener("click", function () {
    showLogin();
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
  document.getElementById("emailTaken").style.display = "none";
  document.getElementById("usernameTaken").style.display = "none";

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

  // Validate password
  if (!validatePassword(formData.password)) {
    return;
  }

  // Check if passwords match
  if (formData.password !== formData.repeatPassword) {
    document.getElementById("passwordMismatch").style.display = "block"; // Show the password mismatch message
    return; // Exit function early if passwords don't match
  } else {
    document.getElementById("passwordMismatch").style.display = "none"; // Hide the password mismatch message if passwords match
  }

  // Send POST request using Fetch API
  const fetchUrl =
    "https://script.google.com/macros/s/AKfycbyh3SCrMuqb7U24KyiEuf8G8lACexAJct3h1Q6Awm3Itv-hZrer7xcgByi1uT6WLZm-Zg/exec"; // Replace with your API endpoint
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
      if (data.includes("errorEmailAndUsername")) {
        document.getElementById("usernameTaken").style.display = "block";
        document.getElementById("emailTaken").style.display = "block";
      } else if (data.includes("Username")) {
        document.getElementById("usernameTaken").style.display = "block";
      } else if (data.includes("Email")) {
        document.getElementById("emailTaken").style.display = "block";
      } else if (data.includes("Success")) {
        console.log("Success:");
        console.log("Token:", data);
        localStorage.setItem("token", data); // Store the token in local storage
        window.location.href = "Pigs-Profile.html"; // Redirect after successful registration
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
    "https://script.google.com/macros/s/AKfycbyh3SCrMuqb7U24KyiEuf8G8lACexAJct3h1Q6Awm3Itv-hZrer7xcgByi1uT6WLZm-Zg/exec"; // Replace with your API endpoint
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
      if (data.includes("Invalid email or password")) {
        console.log("Data is not present");
        document.getElementById("invalidLogin").style.display = "block";
        // Handle case when data is not present
      } else {
        // Token is received
        console.log("Token:", data);
        localStorage.setItem("token", data);
        document.getElementById("loginPopup").style.display = "none";
        document.getElementById("blurBackground").classList.remove("blur");
        window.location.href = "Pigs-Profile.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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

function validatePassword(password) {
  // Regular expressions for password validation
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const letterRegex = /[A-Za-z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  let errorMessage = ""; // Initialize an empty error message

  // Check for minimum length
  if (password.length < 7) {
    errorMessage += "Password must be at least 7 characters long. ";
  }

  // Check for presence of at least one uppercase letter
  if (!uppercaseRegex.test(password)) {
    errorMessage += "Include at least one uppercase letter. ";
  }

  // Check for presence of at least one lowercase letter
  if (!lowercaseRegex.test(password)) {
    errorMessage += "Include at least one lowercase letter. ";
  }

  // Check for presence of at least one number
  if (!numberRegex.test(password)) {
    errorMessage += "Include at least one number. ";
  }

  // Check for presence of at least one letter
  if (!letterRegex.test(password)) {
    errorMessage += "Include at least one letter. ";
  }

  // Check for absence of special characters
  if (specialCharRegex.test(password)) {
    errorMessage += "Special characters are not allowed. ";
  }

  // If no errors were found, return true
  if (errorMessage === "") {
    return true;
  } else {
    // If errors were found, show an alert with the error message
    alert(errorMessage);
    return false;
  }

  // Check for absence of special characters
  if (specialCharRegex.test(password)) {
    return false;
  }

  return true;
}

function addPig(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect form data
 const formData = {
    action: "addpigs",
    pigName: document.querySelector('input[placeholder="Pig Name"]').value,
    pigWeight: document.querySelector('input[placeholder="Weight"]').value,
    pigAge: document.querySelector('input[placeholder="Age"]').value,
    pigGender: document.getElementById('pigGender').value
};

// Accessing offspring count if displayed
var offspringCount = document.querySelector('input[placeholder="Offspring Count"]');
if (offspringCount.style.display !== 'none') {
    formData.offspringCount = offspringCount.value;
}

// Accessing birth count if displayed
var birthCount = document.querySelector('input[placeholder="Number of Births"]');
if (birthCount.style.display !== 'none') {
    formData.birthCount = birthCount.value;
}

// Get the file input element
var pigImageInput = document.getElementById('pigImage');

// Check if a file is selected
if (pigImageInput.files.length > 0) {
    // Get the selected file
    var pigImageFile = pigImageInput.files[0];
    formData.pigImage = pigImageFile; // Add the file to the formData object
}

  const fetchUrl = "https://script.google.com/macros/s/AKfycbyh3SCrMuqb7U24KyiEuf8G8lACexAJct3h1Q6Awm3Itv-hZrer7xcgByi1uT6WLZm-Zg/exec"; // Replace with your API endpoint
  fetch(fetchUrl, {
    redirect: "follow",
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
        "Content-Type": "text/plain;charset=utf-8"
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text(); // assuming server returns JSON response
})
.then(data => {
    // Handle the response data here
    console.log('Response from server:', data);
})
.catch(error => {
    // Handle any errors here
    console.error('Error:', error);
});
}
