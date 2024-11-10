// auth.js

// Sign-up function with confirm password check
function signUp() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (username && password && confirmPassword) {
      if (password === confirmPassword) {
          // Save user data in local storage
          const userData = { username, password };
          localStorage.setItem("user", JSON.stringify(userData));
          alert("Sign-up successful! You can now log in.");
          window.location.href = "login.html";
      } else {
          document.getElementById("error-message").textContent = "Passwords do not match.";
      }
  } else {
      document.getElementById("error-message").textContent = "Please fill all fields.";
  }
}

// Login function
function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData && username === userData.username && password === userData.password) {
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "index.html";
  } else {
      document.getElementById("error-message").textContent = "Invalid credentials.";
  }
}

// Logout function
function logout() {
  localStorage.removeItem("isAuthenticated");
  window.location.href = "login.html";
}

// Check if user is logged in
function checkAuth() {
  if (!localStorage.getItem("isAuthenticated")) {
      window.location.href = "login.html";
  }
}

// Run checkAuth on the main page
if (window.location.pathname.endsWith("index.html")) {
  checkAuth();
}
// auth.js

// Delete Account function
function deleteAccount() {
  if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Remove user data and authentication status from local storage
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");

      alert("Your account has been deleted.");
      window.location.href = "signup.html"; // Redirect to the sign-up page after deletion
  }
}

// Sign-up, login, logout, and checkAuth functions remain the same
