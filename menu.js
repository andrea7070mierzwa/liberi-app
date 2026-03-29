import { auth } from "./liberi.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// O SEU E-MAIL DE ADMIN (Ajuste para o seu e-mail real do Google)
const EMAIL_ADMIN = "andrea7070mierzwa@gmail.com";

const menuHTML = `
<nav style="background: white; padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05); font-family: 'Poppins', sans-serif;">
    <div style="font-family: 'Plus Jakarta Sans'; font-weight: 800; color: #6C5CE7; font-size: 1.5rem; cursor:pointer;" onclick="window.location.href='dashboard.html'">Líberi</div>
    
    <div style="display: flex; gap: 20px; align-items: center;">
        <a href="dashboard.html" style="text-decoration: none; color: #666; font-weight: 500;">Início</a>
        <a href="comunidades.html" style="text-decoration: none; color: #666; font-weight: 500;">Comunidades</a>
        <a href="amigos.html" style="text-decoration: none; color: #666; font-weight: 500;">Vila</a>
        <a href="recados.html" style="text-decoration: none; color: #666; font-weight: 500;">Recados</a>
        
        <a href="admin.html" id="linkAdmin" style="display: none; text-decoration: none; background: #ffeaa7; color: #d63031; padding: 5px 12px; border-radius: 8px; font-weight: 700; font-size: 0.8rem;">⚠️ ADM</a>
        
        <button id="btnSair" style="background: #f0eeff; border: none; color: #6C5CE7; padding: 8px 15px; border-radius: 10px; cursor: pointer; font-weight: 600;">Sair</button>
    </div>
</nav>
`;

// Insere o menu no topo da página
document.body.insertAdjacentHTML("afterbegin", menuHTML);

// Lógica de verificação do usuário
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Se o e-mail for o seu, mostra o botão de ADM
    if (user.email === EMAIL_ADMIN) {
      document.getElementById("linkAdmin").style.display = "block";
    }
  }
});

// Botão Sair
document.getElementById("btnSair").onclick = () => {
  signOut(auth).then(() => (window.location.href = "index.html"));
};
