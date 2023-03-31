import { requestCreateUser } from "../../scripts/api.js";

function createUser() {
    const user = document.getElementById("user");
    const email = document.getElementById("email");
    const avatar = document.getElementById("foto");
    const password = document.getElementById("senha");
    const button = document.getElementById("cadastrar");

    button.addEventListener("click", (event) => {
        event.preventDefault();

        const data = {
            username: user.value,
            email: email.value,
            password: password.value,
            avatar: avatar.value
        }
        const img = document.createElement("img");
        img.src = "../../assets/img/spinner.gif";
        button.innerText = "";
        button.appendChild(img);
        setTimeout(()=>{requestCreateUser(data)},3000);
    })
}
createUser();