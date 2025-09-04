 // Import Firebase SDK
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
    import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

    // 🔹 Your Firebase Config (replace with your config)
   const firebaseConfig = {
  apiKey: "AIzaSyD3J5ChecRfxtJRe2R0_YaYQvjIcweomNc",
  authDomain: "login-cfb4a.firebaseapp.com",
  projectId: "login-cfb4a",
  storageBucket: "login-cfb4a.firebasestorage.app",
  messagingSenderId: "1013663441021",
  appId: "1:1013663441021:web:a89633ff1d5a9b0d95d114"
};

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);

    // UI Elements
    let signUpBtn = document.querySelector('.signupbtn');
    let signInBtn = document.querySelector('.signinbtn');
    let namefield = document.querySelector('.namefield');
    let title = document.querySelector('.title');
    let underline = document.querySelector('.underline');
    let text = document.querySelector('.text');

    // Toggle UI
    signInBtn.addEventListener('click', () => {
      namefield.style.maxHeight = '0';
      title.innerHTML = 'Sign In';
      text.innerHTML = 'Forget Password';
      signUpBtn.classList.remove('disable');
      signInBtn.classList.add('disable');
      underline.style.transform = 'translateX(35px)';
    });

    signUpBtn.addEventListener('click', () => {
      namefield.style.maxHeight = '60px';
      title.innerHTML = 'Sign Up';
      text.innerHTML = 'Password Suggestion';
      signUpBtn.classList.add('disable');
      signInBtn.classList.remove('disable');
      underline.style.transform = 'translateX(0px)';
    });

    // Auth Actions
    document.querySelector('.signupbtn').addEventListener('click', async () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data in Realtime Database
        await set(ref(db, 'users/' + user.uid), {
          name: name,
          email: email
        });

        alert("Signup successful!");
        window.location.href = "https://google.com"; // redirect
      } catch (error) {
        alert(error.message);
      }
    });

    document.querySelector('.signinbtn').addEventListener('click', async () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Signin successful!");
        window.location.href = "https://google.com"; // redirect
      } catch (error) {
        alert(error.message);
      }
    });