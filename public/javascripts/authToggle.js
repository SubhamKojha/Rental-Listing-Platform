document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleAuth = document.getElementById("toggleAuth");
  const authTitle = document.getElementById("authTitle");
  const toggleText = document.getElementById("toggleText");

  if (!toggleAuth) return;

  toggleAuth.addEventListener("click", (e) => {
    e.preventDefault();

    loginForm.classList.toggle("d-none");
    signupForm.classList.toggle("d-none");

    if (loginForm.classList.contains("d-none")) {
      authTitle.innerText = "Sign up";
      toggleText.innerText = "Already have an account?";
      toggleAuth.innerText = "Log in";
    } else {
      authTitle.innerText = "Log in";
      toggleText.innerText = "New here?";
      toggleAuth.innerText = "Create an account";
    }
  });
});
