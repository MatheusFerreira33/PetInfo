import { getUsersProfile, requestCreatePost, requestAllPost, requestGetPost, updatePost,deletarPost } from "../../scripts/api.js"

if(localStorage.getItem("JTW")){

const buttons = document.querySelectorAll("[data-modal-control]");
const ul = document.querySelector(" main > ul");
//console.log(buttons);

buttons.forEach((Element => {
    Element.addEventListener("click", (event) => {
        //event.preventDefault();
        const valueModal = Element.getAttribute("data-modal-control");
        document.getElementById(valueModal).classList.toggle("show-modal");

    })
}))

async function renderAvatar() {
    const img = document.createElement("img");
    const li = document.querySelector(".avatar");

    const { token } = JSON.parse(localStorage.getItem("JTW"));
    const avatar = await getUsersProfile(token);

    img.src = avatar.avatar;
    img.alt = avatar.username;
    li.appendChild(img);

    li.addEventListener("click",()=>{
       logout();
    })
    return avatar.username;
}

const name = document.createElement("span");

async function logout(){
    const {token} = JSON.parse(localStorage.getItem("JTW"));
    const result = await getUsersProfile(token);
    
    name.innerText = result.username;
    
    const logout = document.querySelector(".logout");
    logout.classList.toggle("show-logout");

    logout.appendChild(name);

    const button = document.querySelector(".out");
    button.innerHTML = "Sair da conta";
    button.addEventListener("click",()=>{
        console.log("click botao");
        localStorage.removeItem("JTW");
        window.location = ("http://127.0.0.1:5500/entregasKenzie/M2/Entregas_Sprint6/petinfobase_MatheusFerreira33/index.html");
    })
}

async function createPost() {
    const buttonPublic = document.getElementById("publicar");
    //console.log(buttonPublic);

    buttonPublic.addEventListener("click", (event) => {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const conteudo = document.getElementById("conteudo").value;

        if (titulo && conteudo) {
            requestCreatePost(titulo, conteudo);

        } else if (!titulo) {
            const inputTitulo = document.getElementById("titulo");
            const confere = document.querySelector(".tituloHide");

            confere.classList.toggle("tituloHide");
            confere.classList.add("alert");

            inputTitulo.style.borderColor = "#C73650";

        } else if (!conteudo) {
            const inputConteudo = document.getElementById("conteudo");
            const confere = document.querySelector(".conteudoHide");

            confere.classList.toggle("conteudoHide");
            confere.classList.add("alert");

            inputConteudo.style.borderColor = "#C73650";
        }
    })
}

async function renderAllPost() {
    const result = await requestAllPost();
    const nomeUser = await renderAvatar();


    result.map((Element => {
        const li = document.createElement("li");
        const header = document.createElement("div");
        const box1 = document.createElement("div");
        const box2 = document.createElement("div");
        const avatar = document.createElement("img");
        const nameUser = document.createElement("span");

        box2.className = "box2";
        if (Element.user.username == nomeUser) {
            console.log("caiu aqui");
            const buttonEdit = document.createElement("button");
            const buttonExcluir = document.createElement("button");

            buttonEdit.innerText = "Editar";
            buttonEdit.className = "editar";
            buttonEdit.setAttribute("data-modal-control", "editarModal");
            buttonEdit.setAttribute("id", Element.id);

            buttonEdit.addEventListener("click", (event) => {
                const containerEditarPost = document.querySelector(".containerEditarPost");
                containerEditarPost.classList.toggle("show-modal-edit");

                const headerModal = document.querySelector(".modalEditarPost > .headerModal")
                const titulo = document.createElement("h1");
                const closeModal = document.createElement("button");

                const mainModal = document.querySelector(".modalEditarPost > .mainModal");
                const form = document.createElement("form");
                const inputTitulo = document.createElement("input");
                const tituloPost = document.createElement("label");
                const tituloTextarea = document.createElement("label");
                const content = document.createElement("textarea");
                const buttonsModal = document.createElement("div");
                const buttonSave = document.createElement("button");
                const buttonCancel = document.createElement("button");

                titulo.innerText = "Edição";
                closeModal.innerText = "X";

                tituloPost.innerText = "Titulo do post";
                inputTitulo.type = "text";
                inputTitulo.value = Element.title;
                tituloTextarea.innerText = "Conteúdo do post";
                tituloTextarea.className = "conteudo";
                content.value = Element.content;
                buttonSave.innerText = "Salva Alterações";
                buttonSave.className = "buttonSave";

                buttonCancel.innerText = "Cancelar";
                buttonCancel.className = "buttonCancel";
                buttonsModal.className = "buttonsModal";

                buttonCancel.addEventListener("click",()=>{
                    containerEditarPost.classList.toggle("show-modal-edit");
                    headerModal.removeChild(titulo);
                    headerModal.removeChild(closeModal);

                    mainModal.removeChild(form);
                    mainModal.removeChild(buttonsModal);
                })

                closeModal.addEventListener("click",()=>{
                    containerEditarPost.classList.toggle("show-modal-edit");
                    headerModal.removeChild(titulo);
                    headerModal.removeChild(closeModal);

                    mainModal.removeChild(form);
                    mainModal.removeChild(buttonsModal);
                })

                buttonSave.addEventListener("click",(event)=>{
                    event.preventDefault();
                    updatePost(inputTitulo.value,content.value,Element.id);

                })

                buttonsModal.append(buttonCancel,buttonSave);
                form.append(tituloPost,inputTitulo,tituloTextarea,content,buttonsModal);

                headerModal.append(titulo,closeModal);
                mainModal.append(form);
            })

            buttonExcluir.innerText = "Excluir";
            buttonExcluir.className = "excluir";
            buttonExcluir.setAttribute("data-modal-control", "excluirPost");
            buttonExcluir.setAttribute("id", Element.id);

            buttonExcluir.addEventListener("click",()=>{
                const containerExcluirPost = document.querySelector(".containerExcluirPost");
                containerExcluirPost.classList.toggle("show-modal-excluir");
                const closeModal = document.querySelector(".modalExcluirPost > ul > button");
                const buttonCancel = document.querySelector(".modalExcluirPost > .mainModal > .cancelar");
                const buttonDeletar = document.querySelector(".deletar");

                closeModal.addEventListener("click",()=>{
                    containerExcluirPost.classList.remove("show-modal-excluir");
                })
                buttonCancel.addEventListener("click",()=>{
                    containerExcluirPost.classList.remove("show-modal-excluir");
                })
                buttonDeletar.addEventListener("click",()=>{
                    deletarPost(Element.id);
                })


            })

            box2.append(buttonEdit, buttonExcluir);
        }

        const main = document.createElement("div");
        const titulo = document.createElement("h3");
        const text = document.createElement("p");
        const buttonAcessar = document.createElement("button");

        avatar.src = Element.user.avatar;
        nameUser.innerText = Element.user.username;

        header.className = "header";
        box1.className = "box1";

        main.className = "main";
        titulo.innerText = Element.title;
        text.innerText = Element.content;


        buttonAcessar.innerText = "Acessar publicação";
        buttonAcessar.className = "buttonAcessar";

        buttonAcessar.setAttribute("id", Element.id);
        buttonAcessar.setAttribute("data-modal-control", "acessarPost");

        main.append(titulo, text, buttonAcessar);

        box1.append(avatar, nameUser);

        header.append(box1, box2);
        li.append(header, main);

        ul.appendChild(li);
    }))

    const buttonsAcessar = document.querySelectorAll("[data-modal-control]");

    buttonsAcessar.forEach((Element => {
        Element.addEventListener("click", async (event) => {
            let valorData = Element.getAttribute("data-modal-control");
            let valorId = Element.getAttribute("id");
            document.getElementById(valorData).classList.toggle("show-modal-post");

            const result = await requestGetPost(valorId);
            renderInfoModal(result);

        })
    }))
}

async function renderInfoModal(object) {
    const containerAcessarPost = document.querySelectorAll(".containerAcessarPost");
    const headerModal = document.querySelector(".modalAcessarPost > .headerModal");
    const mainModal = document.querySelector(".modalAcessarPost > .mainModal");
    const box1 = document.createElement("div");
    const box2 = document.createElement("div");
    const avatar = document.createElement("img");
    const closeModal = document.createElement("button");
    const title = document.createElement("h1");
    const content = document.createElement("p");
    const username = document.createElement("span");

    box1.className = "box1";
    box2.className = "box2";

    avatar.src = object.user.avatar;
    avatar.alt = object.user.username;
    username.innerText = object.user.username;

    closeModal.innerText = "X";
    title.innerText = object.title;
    content.innerText = object.content;

    closeModal.addEventListener("click", () => {
        headerModal.removeChild(box1);
        headerModal.removeChild(box2);
        mainModal.removeChild(title);
        mainModal.removeChild(content);
        containerAcessarPost.forEach((Element => {
            Element.classList.toggle("show-modal-post");
        }))

    })

    box1.append(avatar, username);
    box2.appendChild(closeModal);
    headerModal.append(box1, box2);
    mainModal.append(title, content);
}

renderAllPost();
//renderAvatar();
createPost();

}else{
    window.location = ("http://127.0.0.1:5500/entregasKenzie/M2/Entregas_Sprint6/petinfobase_MatheusFerreira33/index.html");
}