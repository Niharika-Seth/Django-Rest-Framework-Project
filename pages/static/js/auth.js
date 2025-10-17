const API_BASE = "http://localhost:8000/api/users/";

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(API_BASE + "login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      alert("Login successful!");
      window.location.href = "/todos/";
    } else {
      const data = await res.json();
      alert(data.error || "Invalid credentials!");
    }
  };
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(API_BASE + "signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (res.ok) {
      alert("Signup successful! You can now login.");
      window.location.href = "/";
    } else {
      alert("Error during signup!");
    }
  };
}
