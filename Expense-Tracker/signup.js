const emailInput = document.getElementById('email');
const form = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const submit = document.getElementById('submit');
const togglePassword = document.getElementById('togglePassword');
const checkLogin = document.getElementById('login');


togglePassword.addEventListener('click',()=>{
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.innerHTML = isPassword
    ? `<i class="fa-solid fa-eye"></i>`
    : `<i class="fa-solid fa-eye-slash"></i>`;
})

submit.addEventListener('click',(e)=>{
    e.preventDefault()
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if(!email || !password){
        alert("input Feilds");
        return;
    }

    const userData = {
        email,
        password,
    };

    localStorage.setItem(`user_${email}`,JSON.stringify(userData));

    alert('Account created successfully!');
    window.location.href = "Login.html";
    form.reset();
});