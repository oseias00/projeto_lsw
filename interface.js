//imports
import CryptoJS from "crypto-js";
const chaveSecreta = 'minhaChaveSuperSecreta';
document.addEventListener("DOMContentLoaded", () => {
    const passwordForm = document.getElementById("passwordForm");
    const passwordList = document.getElementById("passwordList");
    const generatePasswordBtn = document.getElementById("generatePassword");
    const generatedPassword = document.getElementById("generatedPassword");
    const logoutButton = document.querySelector("button[onclick='logout()']");

    // Obtém o usuário logado
    const userLoggedIn = localStorage.getItem("Sessão");

    if (!userLoggedIn) {
        window.location.href = "login.html"; // Redireciona se não estiver logado
    }

    generatePasswordBtn.addEventListener("click", () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < 10; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        generatedPassword.innerHTML = `Senha gerada: <strong>${password}</strong> 
            <button onclick='copyPassword("${password}")' style='font-size: 14px; padding: 3px 6px;'>📋</button>`;
    });

    window.copyPassword = (password) => {
        navigator.clipboard.writeText(password);
        alert("Senha copiada!");
    };

    passwordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const site = document.getElementById("site").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (site && username && password) {
            const userPasswords = JSON.parse(localStorage.getItem(`passwords_${userLoggedIn}`)) || [];
            const senhaCriptografada = CryptoJS.AES.encrypt(password,chaveSecreta).toString()


            userPasswords.push({ site, username, senhaCriptografada });
            localStorage.setItem(`passwords_${userLoggedIn}`, JSON.stringify(userPasswords));
            displayPasswords();
            passwordForm.reset();
        }
    });

    // Função de logout
    logoutButton.addEventListener("click", () => {
        if (localStorage.getItem("Sessão")) {
            localStorage.removeItem("Sessão");
        }
        window.location.href = "login.html";
    });

    function displayPasswords() {
        passwordList.innerHTML = "";
        const userPasswords = JSON.parse(localStorage.getItem(`passwords_${userLoggedIn}`)) || [];

        userPasswords.forEach((entry, index) => {
            console.log(entry.password)
            const bytes = CryptoJS.AES.decrypt(entry.senhaCriptografada, chaveSecreta);
            const senhaDescriptografada = bytes.toString(CryptoJS.enc.Utf8)
            const li = document.createElement("li");
            li.classList.add("password-item");
            li.innerHTML = `<strong>${entry.site}</strong> - ${entry.username} 
                <div style='display: flex; align-items: center;'>
                    <input type='password' value='${senhaDescriptografada}' readonly style='flex: 1; margin-right: 5px;'>
                    <button onclick='togglePassword(this)' style='font-size: 12px; padding: 3px 5px;'>👁️</button>
                    <button onclick='deletePassword(${index})' style='font-size: 12px; padding: 3px 5px;'>❌</button>
                </div>`;
            passwordList.appendChild(li);
        });
    }

    window.togglePassword = (button) => {
        const input = button.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
    };

    window.deletePassword = (index) => {
        const userPasswords = JSON.parse(localStorage.getItem(`passwords_${userLoggedIn}`)) || [];
        userPasswords.splice(index, 1);
        localStorage.setItem(`passwords_${userLoggedIn}`, JSON.stringify(userPasswords));
        displayPasswords();
    };

    displayPasswords();
});
