// Este arquivo cria o menu automaticamente em qualquer página!
const menuHTML = `
<nav style="background: #6C5CE7; padding: 10px 5%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000;">
    <div style="display: flex; align-items: center; gap: 20px;">
        <h1 style="font-family: 'Plus Jakarta Sans'; color: white; margin: 0; font-size: 1.4rem; cursor: pointer;" onclick="window.location.href='comunidades.html'">Líberi</h1>
        <a href="comunidades.html" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem; font-weight: 500;">Comunidades</a>
    </div>
    
    <div style="display: flex; align-items: center; gap: 15px;">
        <a href="perfil.html" style="background: rgba(255,255,255,0.15); color: white; padding: 8px 18px; border-radius: 12px; text-decoration: none; font-size: 0.85rem; font-weight: 600; transition: 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">👤 Meu Perfil</a>
        <button id="btnSair" style="background: none; border: 1px solid rgba(255,255,255,0.4); color: white; padding: 7px 12px; border-radius: 10px; cursor: pointer; font-size: 0.8rem;">Sair</button>
    </div>
</nav>
`;

// Insere o menu no topo do <body>
document.body.insertAdjacentHTML("afterbegin", menuHTML);

// Lógica do botão Sair (Logout)
import { auth } from "./liberi.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById("btnSair").onclick = () => {
  if (confirm("Deseja sair da Líberi?")) {
    signOut(auth).then(() => (window.location.href = "index.html"));
  }
};
