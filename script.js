const saldoElement = document.getElementById("saldo");
const entradasElement = document.getElementById("entradas");
const saidasElement = document.getElementById("saidas");

const pixArea = document.getElementById("pix-area");
const transactionsArea = document.getElementById("transactions")
const areaPixButton = document.getElementById("area-pix");
const tabReceberButton = document.getElementById("tab-receber");
const tabTransferirButton = document.getElementById("tab-transferir");
const formReceber = document.getElementById("form-receber");
const formTransferir = document.getElementById("form-transferir");

const receberCnpjInput = document.getElementById("receber-cnpj");
const receberValorInput = document.getElementById("receber-valor");
const transferirChaveInput = document.getElementById("transferir-chave");
const transferirValorInput = document.getElementById("transferir-valor");

const receberSubmitButton = document.getElementById("receber-submit");
const transferirSubmitButton = document.getElementById("transferir-submit");
const pagarButton = document.getElementById("pagar");
const investirButton = document.getElementById("investir");

const listaTransacoes = document.getElementById("lista-transacoes");

let saldo = 0.00; // Saldo inicial
let entradas = 0.00;
let saidas = 0.00;

function atualizarResumo() {
  saldoElement.textContent = saldo.toFixed(2);
  entradasElement.textContent = entradas.toFixed(2);
  saidasElement.textContent = saidas.toFixed(2);
}

function gerarIdTransacao() {
  const now = new Date();
  const ano = now.getFullYear();
  const mes = String(now.getMonth() + 1).padStart(2, "0");
  const dia = String(now.getDate()).padStart(2, "0");
  const hora = String(now.getHours()).padStart(2, "0");
  const minuto = String(now.getMinutes()).padStart(2, "0");
  const segundo = String(now.getSeconds()).padStart(2, "0");
  return `${ano}${mes}${dia}${hora}${minuto}${segundo}`;
}

function adicionarTransacao(titulo, tipo, valor) {
  document.getElementById("nao").style.display = "none";
  const id = gerarIdTransacao();
  const data = new Date();
  const dataFormatada = data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="transacao-titulo">${titulo}</span> 
    <span class="transacao-tipo">${tipo}</span>
    <span class="transacao-data">${dataFormatada}</span>
    <span class="transacao-valor">R$ ${valor.toFixed(2)}</span>
    <span class="transacao-id">ID: ${id}</span>
  `;

  listaTransacoes.appendChild(li);
}

function alternarPixTab(aba) {
  if (aba === "receber") {
    formReceber.style.display = "flex";
    formTransferir.style.display = "none";
  } else if (aba === "transferir") {
    formReceber.style.display = "none";
    formTransferir.style.display = "flex";
  }
}

areaPixButton.addEventListener("click", () => {
  pixArea.style.display = pixArea.style.display === "none" ? "block" : "none";
  transactionsArea.style.display = transactionsArea.style.display === "none" ? "block" : "none";
});

function transactions(){
  pixArea.style.display = pixArea.style.display === "none" ? "block" : "none";
  transactionsArea.style.display = transactionsArea.style.display === "none" ? "block" : "none";
}


tabReceberButton.addEventListener("click", () => alternarPixTab("receber"));
tabTransferirButton.addEventListener("click", () => alternarPixTab("transferir"));

receberSubmitButton.addEventListener("click", () => {
  const valor = parseFloat(receberValorInput.value);

  if (!isNaN(valor) && valor > 0) {
    entradas += valor;
    saldo += valor;

    atualizarResumo();

    adicionarTransacao("Entrada", "Transferência recebida", valor);

    alert(`Você recebeu R$ ${valor.toFixed(2)} via PIX!`);
  } else {
    alert("Por favor, insira um valor válido para receber.");
  }

  receberCnpjInput.value = "";
  receberValorInput.value = "";
});

transferirSubmitButton.addEventListener("click", () => {
  const valor = parseFloat(transferirValorInput.value);

  if (!isNaN(valor) && valor > 0 && valor <= saldo) {
    saidas += valor;
    saldo -= valor;

    atualizarResumo();

    adicionarTransacao("Saída", "Transferência enviada", valor);

    alert(`Você transferiu R$ ${valor.toFixed(2)} via PIX!`);
  } else if (valor > saldo) {
    alert("Saldo insuficiente para realizar a transferência.");
  } else {
    alert("Por favor, insira um valor válido para transferir.");
  }

  transferirChaveInput.value = "";
  transferirValorInput.value = "";
});

pagarButton.addEventListener("click", () => {
  alert("Sistema indisponível. Tente novamente mais tarde.");
});

investirButton.addEventListener("click", () => {
  alert("Sistema indisponível. Tente novamente mais tarde.");
});

atualizarResumo();
