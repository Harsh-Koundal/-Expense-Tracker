const emailInput = document.getElementById('email');
const form = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const submit = document.getElementById('submit');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.innerHTML = isPassword
    ? `<i class="fa-solid fa-eye-slash"></i>`
    : `<i class="fa-solid fa-eye"></i>`;
});

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const data = localStorage.getItem(`user_${email}`);
  if (!data) {
    alert("No account found. Please sign up first.");
    return;
  }

  const savedData = JSON.parse(data);
  if (savedData.password === password) {
    alert('Login successful!');
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = "Home.html";
  } else {
    alert('Incorrect password.');
  }
});
