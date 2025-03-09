const apiUrl = "https://gorest.co.in/public/v2/users";
const apiKey = "82f4d73fa765388185b3027e7f187483292d417c044ce1f7f064b9f35049232e";

document.getElementById("fetchUsers").addEventListener("click", async () => {
    try {
        const response = await fetch(apiUrl, {
            headers: { Authorization: `Bearer ${apiKey}` }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar usuários.");
        }

        const users = await response.json();
        const userList = document.getElementById("userList");
        userList.innerHTML = "";

        users.forEach(user => {
            // avatar dinâmico baseado no nome
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=50`;

            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${avatarUrl}" alt="Avatar">
                <strong>${user.name}</strong> - ${user.email}
            `;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        alert("Falha ao carregar usuários.");
    }
});

document.getElementById("createUser").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                gender: "male",
                status: "active"
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao criar usuário.");
        }

        alert("Usuário criado com sucesso!");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        alert("Falha ao criar usuário.");
    }
});
