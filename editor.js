// editor.js - Versão UPGRADE PRO (sem remover nada existente)
export function criarEditor(idElemento) {
  const areaTexto = document.getElementById(idElemento);
  if (!areaTexto) return;

  const termosProibidos = [
    "política",
    "eleição",
    "religião",
    "ódio",
    "racismo",
    "misoginia",
    "pedofilia",
  ];

  const container = document.createElement("div");
  container.className = "editor-container";

  const toolbar = document.createElement("div");
  toolbar.className = "editor-toolbar";

  toolbar.innerHTML = `
    <button onclick="document.execCommand('bold')"><b>B</b></button>
    <button onclick="document.execCommand('italic')"><i>I</i></button>
    <button onclick="document.execCommand('underline')"><u>U</u></button>

    <input type="color" id="corTexto" title="Cor" />

    <select id="fonteTexto">
      <option value="Arial">Arial</option>
      <option value="Georgia">Georgia</option>
      <option value="Courier New">Courier</option>
      <option value="Poppins">Poppins</option>
    </select>

    <select id="tamanhoTexto">
      <option value="2">Pequeno</option>
      <option value="3" selected>Médio</option>
      <option value="5">Grande</option>
      <option value="7">Gigante</option>
    </select>

    <button onclick="document.execCommand('justifyLeft')">⬅️</button>
    <button onclick="document.execCommand('justifyCenter')">↔️</button>
    <button onclick="document.execCommand('justifyRight')">➡️</button>

    <button onclick="document.execCommand('insertUnorderedList')">• Lista</button>

    <input type="file" id="uploadImagem" accept="image/png, image/jpeg, image/gif" style="display:none">
    <button onclick="document.getElementById('uploadImagem').click()">🖼️</button>

    <button onclick="document.execCommand('undo')">↩️</button>
    <button onclick="document.execCommand('redo')">↪️</button>
  `;

  const divEditavel = document.createElement("div");
  divEditavel.contentEditable = true;
  divEditavel.className = "editor-content";
  divEditavel.setAttribute("data-placeholder", areaTexto.placeholder);

  const alerta = document.createElement("div");
  alerta.className = "alerta-guardiao";
  alerta.style.display = "none";
  alerta.innerHTML = `
    <strong>🤖 Alerta do Guardião:</strong>
    Conteúdo sensível detectado. Este post passará por moderação.
  `;

  // ==========================
  // EVENTOS AVANÇADOS
  // ==========================

  // Cor
  setTimeout(() => {
    const cor = document.getElementById("corTexto");
    if (cor) {
      cor.onchange = () => {
        document.execCommand("foreColor", false, cor.value);
      };
    }

    const fonte = document.getElementById("fonteTexto");
    if (fonte) {
      fonte.onchange = () => {
        document.execCommand("fontName", false, fonte.value);
      };
    }

    const tamanho = document.getElementById("tamanhoTexto");
    if (tamanho) {
      tamanho.onchange = () => {
        document.execCommand("fontSize", false, tamanho.value);
      };
    }

    const inputImagem = document.getElementById("uploadImagem");
    if (inputImagem) {
      inputImagem.onchange = () => {
        const file = inputImagem.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
          document.execCommand("insertImage", false, e.target.result);
        };
        reader.readAsDataURL(file);
      };
    }
  }, 100);

  // Emojis rápidos
  divEditavel.addEventListener("keyup", (e) => {
    if (e.key === ":") {
      document.execCommand("insertText", false, "😊 ");
    }
  });

  // Guardião + sync
  divEditavel.oninput = () => {
    const texto = divEditavel.innerText.toLowerCase();
    areaTexto.value = divEditavel.innerHTML;

    const encontrouSensivel = termosProibidos.some((termo) =>
      texto.includes(termo),
    );

    if (encontrouSensivel) {
      alerta.style.display = "block";
      divEditavel.style.borderColor = "#ff4d4d";
    } else {
      alerta.style.display = "none";
      divEditavel.style.borderColor = "#f0f0f0";
    }
  };

  // Drag & Drop de imagem (🔥 nível avançado)
  divEditavel.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  divEditavel.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = function (ev) {
      document.execCommand("insertImage", false, ev.target.result);
    };
    reader.readAsDataURL(file);
  });

  // Estilo melhorado
  const style = document.createElement("style");
  style.innerHTML = `
    .editor-container {
      border: 2px solid #f0f0f0;
      border-radius: 20px;
      overflow: hidden;
      background: white;
      transition: 0.3s;
    }

    .editor-container:focus-within {
      border-color: #5848d0;
      box-shadow: 0 0 0 3px rgba(88,72,208,0.1);
    }

    .editor-toolbar {
      background: #f8f9fa;
      padding: 10px;
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .editor-toolbar button,
    .editor-toolbar select,
    .editor-toolbar input {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 5px 8px;
      cursor: pointer;
      background: white;
    }

    .editor-toolbar button:hover {
      background: #5848d0;
      color: white;
    }

    .editor-content {
      min-height: 140px;
      padding: 15px;
      outline: none;
      font-family: 'Poppins', sans-serif;
    }

    .editor-content img {
      max-width: 100%;
      border-radius: 10px;
      margin-top: 10px;
    }

    .editor-content:empty:before {
      content: attr(data-placeholder);
      color: #aaa;
    }

    .alerta-guardiao {
      background: #fff1f1;
      color: #d32f2f;
      padding: 10px;
      font-size: 0.8rem;
    }
  `;

  document.head.appendChild(style);
  container.appendChild(toolbar);
  container.appendChild(divEditavel);
  container.appendChild(alerta);

  areaTexto.parentNode.insertBefore(container, areaTexto);
  areaTexto.style.display = "none";
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    deleteDoc,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


// 🔥 CONFIG FIREBASE
const firebaseConfig = {
    // COLE SUA CONFIG AQUI
};

// INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ELEMENTOS
const feed = document.getElementById("feed");

// 🚀 POSTAR
document.getElementById("btnPostar").onclick = async () => {

    const texto = document.getElementById("postContent").value;
    const file = document.getElementById("inputImagem").files[0];

    if (!texto && !file) {
        alert("Escreva algo ou envie uma imagem!");
        return;
    }

    let imagemUrl = "";

    if (file) {
        const storageRef = ref(storage, "posts/" + Date.now());
        await uploadBytes(storageRef, file);
        imagemUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "posts_gerais"), {
        texto,
        imagem: imagemUrl,
        autor: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        data: serverTimestamp()
    });

    document.getElementById("postContent").value = "";
    document.getElementById("inputImagem").value = "";
};


// 🔥 FEED + LIXEIRA
onAuthStateChanged(auth, (user) => {

    if (!user) return;

    const q = query(
        collection(db, "posts_gerais"),
        orderBy("data", "desc")
    );

    onSnapshot(q, (snapshot) => {

        feed.innerHTML = "";

        snapshot.forEach(docSnap => {

            const p = docSnap.data();
            const id = docSnap.id;

            const div = document.createElement("div");
            div.classList.add("feed-item");

            div.innerHTML = `
                <h4>${p.autor}</h4>
                <div>${p.texto}</div>

                ${p.imagem ? `<img src="${p.imagem}">` : ""}

                <div class="post-actions">
                    ${p.uid === user.uid ? `
                        <button onclick="deletarPost('${id}')">🗑️</button>
                    ` : ""}
                </div>
                <hr>
            `;

            feed.appendChild(div);
        });

    });

});


// 🗑️ DELETAR
window.deletarPost = async (id) => {

    if (!confirm("Excluir post?")) return;

    const refDoc = doc(db, "posts_gerais", id);
    const snap = await getDoc(refDoc);

    if (snap.exists()) {

        const p = snap.data();

        if (p.uid !== auth.currentUser.uid) {
            alert("Sem permissão");
            return;
        }

        await deleteDoc(refDoc);
    }
};
