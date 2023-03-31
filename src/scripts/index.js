import {requestLogin} from "./api.js";

export async function login() {
    const senha = document.getElementById("senha");
    const email = document.getElementById("email");
    const button = document.getElementById("acessar");
    
        button.addEventListener("click",async (event)=>{
        event.preventDefault();
        let result = {};

    if(email.value && senha.value){
        const img = document.createElement("img");
        img.src = "./src/assets/img/spinner.gif";
        button.innerText = "";
        button.appendChild(img);
        setTimeout(async()=>{ await requestLogin(email.value,senha.value)},3000);
        

    }else if(!email.value){
        console.log("email");
    }else{
        console.log("senha");
    }
   })

}

login();

