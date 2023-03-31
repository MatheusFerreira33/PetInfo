
export async function requestLogin(valorEmail, valorSenha) {
    const button = document.getElementById("acessar");

    const data = {
        email: valorEmail,
        password: valorSenha
    }
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    const responseJSON = await fetch("http://localhost:3333/login", settings)
    const response = await responseJSON.json();

    if (responseJSON.status == 200) {
        localStorage.setItem("JTW", JSON.stringify(response));
        window.location.href = "src/pages/home/index.html";
        return response;
    } else {
        button.innerText = "Acessar";
        const response = await responseJSON.json();
        if (response.message == "A senha está incorreta") {
            const inputSenha = document.getElementById("senha");
            const confere = document.querySelector(".senhaHide");

            confere.classList.toggle("senhaHide");
            confere.classList.add("alert");
            inputSenha.style.borderColor = "#C73650";


        } else if (response.message == "O email está incorreto") {
            const inputEmail = document.getElementById("email");
            const confere = document.querySelector(".emailHide");

            confere.classList.toggle("emailHide");
            confere.classList.add("alert");
            inputEmail.style.borderColor = "#C73650";

        }
    }

    //return await response;
}

export async function requestCreateUser(object) {
    const button = document.getElementById("cadastrar");

    const data = {
        username: object.username,
        email: object.email,
        password: object.password,
        avatar: object.avatar
    }
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    const responseJSON = await fetch("http://localhost:3333/users/create", settings)

    if (responseJSON.status == 201) {

        //const response = await responseJSON.json();
        const sucess = document.querySelector(".hideSucesso");
        sucess.classList.toggle("sucess");
        setTimeout(window.location = ("http://localhost:5500/entregasKenzie/M2/Entregas_Sprint6/petinfobase_MatheusFerreira33/index.html"), 3000);

    } else {
        const response = await responseJSON.json();
        button.innerText = "Cadastrar";

        if (response.message == "Email já cadastrado, favor informar um email que não pertença a um usuário já cadastrado") {
            const inputEmail = document.getElementById("email");
            const confere = document.querySelector(".emailHide");

            confere.classList.toggle("emailHide");
            confere.classList.add("alert");
            inputEmail.style.borderColor = "#C73650";

        } else if (response.message == "Username já cadastrado, favor informar um username que não pertença a um usuário já cadastrado") {
            const inputUser = document.getElementById("user");
            const confere = document.querySelector(".usuarioHide");

            confere.classList.toggle("usuarioHide");
            confere.classList.add("alert");
            inputUser.style.borderColor = "#C73650";
        }
    }

}

export async function getUsersProfile(token) {

    const settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }
    const responseJSON = await fetch("http://localhost:3333/users/profile", settings)
    const response = await responseJSON.json();
    return response;
}

export async function requestCreatePost(titulo, conteudo) {
    const { token } = JSON.parse(localStorage.getItem("JTW"));

    const data = {
        title: titulo,
        content: conteudo
    }
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }

    const responseJSON = await fetch("http://localhost:3333/posts/create", settings)
    const response = await responseJSON.json();

    //console.log(response);
}

export async function requestAllPost() {
    const { token } = JSON.parse(localStorage.getItem("JTW"));

    const settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }

    const responseJSON = await fetch("http://localhost:3333/posts", settings)
    const response = await responseJSON.json();

    return response;
}

export async function requestGetPost(idPost) {
    const post = await requestAllPost();
    return post.find(Element => Element.id == idPost);
}

export async function updatePost(title,content,valorId){
    const {token} = JSON.parse(localStorage.getItem("JTW"));
    console.log(token);

    const data = {
        title:title,
        content:content
    }
    const settings = {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }
    const responseJSON = await fetch(`http://localhost:3333/posts/${valorId}`,settings)
    const response = await responseJSON.json();

    console.log(response);
}

export async function deletarPost(id){
   const {token} = JSON.parse(localStorage.getItem("JTW"));
    const settings = {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }
    const responseJSON = await fetch(`http://localhost:3333/posts/${id}`,settings)
    const response = await responseJSON.json();
    console.log(response);
}