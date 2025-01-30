let friends = [];
let secretSantaPairs = {};
let author = "";

// Define o autor da brincadeira
function setAuthor() {
    const input = document.getElementById("author");
    const name = input.value.trim();

    if (name === "") {
        alert("Digite o nome do autor da brincadeira!");
        return;
    }

    author = name;
    input.value = "";

    // Oculta a seção do autor e mostra a seção de adicionar amigos
    document.getElementById("authorSection").classList.add("hidden");
    document.getElementById("addFriendsSection").classList.remove("hidden");

    // Verifica se a lista de amigos é válida para o sorteio
    checkIfListIsValid();
}

// Adiciona amigo à lista
function addFriend() {
    const input = document.getElementById("friend");
    const name = input.value.trim();

    if (name === "" || friends.includes(name)) {
        alert("Digite um nome válido e que não esteja na lista!");
        return;
    }

    friends.push(name);
    input.value = "";

    // Atualiza a lista de amigos na tela
    updateFriendList();

    // Verifica se a lista de amigos é válida para o sorteio
    checkIfListIsValid();
}

// Atualiza a lista de amigos na tela
function updateFriendList() {
    let friendListElement = document.getElementById("friendList");
    friendListElement.innerHTML = "";
    friends.forEach(friend => {
        let li = document.createElement("li");
        li.textContent = friend;
        friendListElement.appendChild(li);
    });

    // Mostra a lista de amigos
    friendListElement.classList.remove("hidden");
}

// Verifica se a quantidade de amigos é válida para o sorteio
// Verifica se a quantidade de amigos é válida para o sorteio
function checkIfListIsValid() {
    const drawButtonContainer = document.getElementById("drawButtonContainer");

    // Verifica se a quantidade total de participantes (amigos + autor) é no mínimo 3
    const totalParticipants = friends.length + 1;  // Inclui o autor
    if (totalParticipants >= 3) {
        drawButtonContainer.classList.remove("hidden");  // Mostra o botão de sorteio
    } else {
        drawButtonContainer.classList.add("hidden");  // Oculta o botão de sorteio
    }
}


// Sorteia os amigos secretos
function secretSantaDraw() {
    if (friends.length < 2) {
        alert("Adicione pelo menos dois amigos para o sorteio!");
        return;
    }

    // Adiciona o autor à lista de amigos
    friends.push(author);

    // Embaralha a lista de amigos
    let shuffled = [...friends].sort(() => Math.random() - 0.5);
    secretSantaPairs = {};

    let alreadyPaired = new Set();

    // Garante que o autor não sorteará a si mesmo
    for (let i = 0; i < shuffled.length; i++) {
        let nextIndex = (i + 1) % shuffled.length;

        // Verifica se o próximo já foi sorteado
        while (alreadyPaired.has(shuffled[nextIndex]) || shuffled[i] === shuffled[nextIndex]) {
            nextIndex = (nextIndex + 1) % shuffled.length;
        }

        secretSantaPairs[shuffled[i]] = shuffled[nextIndex];
        alreadyPaired.add(shuffled[nextIndex]);  // Marca esse amigo como sorteado
    }

    // Mostra apenas o autor e seu amigo secreto
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = `<li>${author}, seu amigo secreto é: ${secretSantaPairs[author]}</li>`;
    resultElement.classList.remove("hidden");

    // Oculta a seção de adicionar amigos e mostra a seção de busca
    document.getElementById("addFriendsSection").classList.add("hidden");
    document.getElementById("drawButtonContainer").classList.add("hidden");
    document.getElementById("searchFriendSection").classList.remove("hidden");
}

// Revela o amigo secreto de um participante
function revealSecretSanta() {
    const searchName = document.getElementById("searchFriend").value.trim();
    const resultElement = document.getElementById("result");

    if (!secretSantaPairs[searchName]) {
        resultElement.innerHTML = `<li>Nome não encontrado! Verifique e tente novamente.</li>`;
        resultElement.style.color = "red";
    } else {
        resultElement.innerHTML = `<li>${searchName}, seu amigo secreto é: ${secretSantaPairs[searchName]}!</li>`;
        resultElement.style.color = "#05DF05";
    }
}
