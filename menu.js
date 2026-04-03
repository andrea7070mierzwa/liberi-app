// NeurUp - Menu de Navegação Global
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("nav");
  nav.style.cssText = `
        background: #5848d0; 
        padding: 15px 5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        font-family: 'Poppins', sans-serif;
        position: sticky;
        top: 0;
        z-index: 1000;
    `;

  const logo = document.createElement("div");
  logo.innerHTML = `<span style="font-family: 'Plus Jakarta Sans'; font-weight: 800; font-size: 1.5rem; cursor:pointer;">Neur<span style="color:#FF8C00;">Up</span></span>`;
  logo.onclick = () => (window.location.href = "dashboard.html");

  const links = document.createElement("div");
  links.style.cssText = `display: flex; gap: 20px; align-items: center;`;

  const menuItens = [
    { nome: "Início", link: "dashboard.html" },
    { nome: "Comunidades", link: "comunidades.html" },
    { nome: "Amigos", link: "amigos.html" },
    { nome: "Perfil", link: "perfil.html" },
  ];

  menuItens.forEach((item) => {
    const a = document.createElement("a");
    a.innerText = item.nome;
    a.href = item.link;
    a.style.cssText = `color: white; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: 0.3s; opacity: 0.9;`;
    a.onmouseover = () => (a.style.opacity = "1");
    a.onmouseout = () => (a.style.opacity = "0.9");
    links.appendChild(a);
  });

  // Botão de Logout rápido
  const btnSair = document.createElement("button");
  btnSair.innerText = "Sair";
  btnSair.style.cssText = `
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 5px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.8rem;
    `;
  btnSair.onclick = () => {
    if (confirm("Deseja sair da rede NeurUp?")) {
      window.location.href = "index.html";
    }
  };

  links.appendChild(btnSair);
  nav.appendChild(logo);
  nav.appendChild(links);

  // Injeta o menu no topo do body
  document.body.prepend(nav);
});
