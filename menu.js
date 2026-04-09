import { auth, db } from "./liberi.js";
import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function renderizarMenu() {
  const nav = document.getElementById("menu-principal");
  if (!nav) return;

  // O Menu injeta o cabeçalho em todas as páginas com IDs estratégicos (linkLogo, linkHome, linkAmigos)
  nav.innerHTML = `
        <header style="background: white; padding: 10px 5%; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
            <div style="display: flex; align-items: center; gap: 25px;">
                <img id="linkLogo" src="imagens/logo_com_m.png" alt="NeurUp" width="110" style="cursor:pointer" onclick="window.location.href='dashboard.html'">
                
                <nav style="display: flex; gap: 20px;">
                    <a id="linkHome" href="dashboard.html" style="text-decoration:none; color:#5848d0; font-weight:700; font-size:0.85rem;">HOME</a>
                    <a href="comunidades.html" style="text-decoration:none; color:#666; font-weight:600; font-size:0.85rem;">COMUNIDADES</a>
                    <a href="neura_kids.html" style="text-decoration:none; color:#FF8C00; font-weight:800; font-size:0.85rem;">🧠 PERGUNTE À NEURA</a>
                    <a href="grupos.html" style="text-decoration:none; color:#5848d0; font-weight:700; font-size:0.85rem;">GRUPOS</a>
                    <a id="linkAmigos" href="amigos.html" style="text-decoration:none; color:#5848d0; font-weight:700; font-size:0.85rem;">AMIGOS</a>
                    <a href="recados.html" style="text-decoration:none; color:#5848d0; font-weight:700; font-size:0.85rem;">RECADOS</a>
                    <a href="cadastro.html" style="text-decoration:none; color:#5848d0; font-weight:700; font-size:0.85rem;">PESSOAL</a>
                </nav>
            </div>

            <div style="display: flex; align-items: center; gap: 15px;">
                <div id="userInfo" style="display: flex; align-items: center; gap: 10px;">
                    <img id="avatarMenu" src="imagens/default-avatar.png" width="35" height="35" style="border-radius:50%; border:2px solid #5848d0; object-fit: cover;">
                </div>
                <button onclick="logout()" style="background:none; border:none; color:#ff4d4d; font-weight:700; cursor:pointer; font-size:0.75rem; text-transform: uppercase;">SAIR</button>
            </div>
        </header>
    `;

  // Inteligência do Menu: Troca a foto e as rotas dependendo de quem está logado
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // 1. Atualiza a foto do perfil no menu
      if (user.photoURL) {
        const img = document.getElementById("avatarMenu");
        if (img) img.src = user.photoURL;
      }

      // 2. Verifica a ficha no banco de dados para ajustar o destino dos botões
      try {
        const docSnap = await getDoc(doc(db, "usuarios", user.uid));
        if (docSnap.exists()) {
          const d = docSnap.data();

          // Se quem estiver navegando for um dependente (como a Manu)
          if (d.tipo === "dependente_autonomo") {
            // Muda o destino do botão 'Amigos' para a página blindada
            const btnAmigos = document.getElementById("linkAmigos");
            if (btnAmigos) btnAmigos.href = "amigos_kids.html";

            // Muda o destino do botão 'Home' para o perfil dela
            const btnHome = document.getElementById("linkHome");
            if (btnHome) btnHome.href = "neura_kids.html";

            // Muda o destino do clique na Logomarca para o perfil dela
            const btnLogo = document.getElementById("linkLogo");
            if (btnLogo)
              btnLogo.setAttribute(
                "onclick",
                "window.location.href='neura_kids.html'",
              );
          }
        }
      } catch (error) {
        console.error("Erro ao verificar o tipo de usuário no menu:", error);
      }
    }
  });
}

// Função de Logout centralizada adaptada para funcionar com importações estáticas
window.logout = async function () {
  auth
    .signOut()
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((err) => console.error("Erro ao sair:", err));
};
