document.addEventListener("DOMContentLoaded", function () {

    const tipo = document.getElementById("tipo");
    const quantidade = document.getElementById("quantidade");
    const resultado = document.getElementById("resultado");
    const btnWhats = document.getElementById("btn-whats");
    const btnToggle = document.getElementById("toggleExtras");
    const extras = document.getElementById("extras");
    const sugestao = document.getElementById("sugestao");

    function calcularPreco() {

        if (!tipo || !resultado) return;

        const valorBase = parseInt(tipo.value) || 0;
        const qtd = quantidade ? parseInt(quantidade.value) || 1 : 1;

        let total = valorBase * qtd;
        let extrasSelecionados = [];

        document.querySelectorAll(".extras input:checked").forEach(item => {
            total += parseInt(item.value);
            extrasSelecionados.push(item.parentElement.innerText.trim());
        });

        resultado.innerHTML =
            `💰 Valor estimado:<br><strong class="valor">R$ ${total.toLocaleString('pt-BR')}</strong>`;

        if (sugestao) {
            if (total <= 1500) {
                sugestao.innerText = "💡 Ideal para quem está começando.";
            } else if (total <= 3000) {
                sugestao.innerText = "🚀 Perfeito para crescer no digital.";
            } else if (total <= 5000) {
                sugestao.innerText = "🔥 Excelente escolha para escalar seu negócio.";
            } else {
                sugestao.innerText = "🏆 Projeto avançado — nível profissional completo.";
            }
        }

        if (btnWhats) {
            btnWhats.style.display = "block";

            let mensagem = `Olá! Fiz um orçamento:%0A%0A`;
            mensagem += `📌 Projeto: ${tipo.options[tipo.selectedIndex].text}%0A`;

            if (quantidade) {
                mensagem += `📄 Páginas: ${qtd}%0A`;
            }

            if (extrasSelecionados.length > 0) {
                mensagem += `⚙️ Extras:%0A- ${extrasSelecionados.join('%0A- ')}%0A`;
            }

            mensagem += `%0A💰 Total: R$ ${total.toLocaleString('pt-BR')}`;

            const numero = "5547992765584";
            btnWhats.href = `https://wa.me/${numero}?text=${mensagem}`;
        }
    }

    if (tipo) tipo.addEventListener("change", calcularPreco);
    if (quantidade) quantidade.addEventListener("input", calcularPreco);

    document.querySelectorAll(".extra-item input").forEach(input => {
        input.addEventListener("change", function () {
            this.parentElement.classList.toggle("active", this.checked);
            calcularPreco();
        });
    });

    if (btnToggle && extras) {

        extras.style.maxHeight = "0px";
        extras.style.overflow = "hidden";

        btnToggle.addEventListener("click", () => {

            if (extras.style.maxHeight === "0px") {
                extras.style.maxHeight = extras.scrollHeight + "px";
                btnToggle.innerText = "Ocultar opções";
            } else {
                extras.style.maxHeight = "0px";
                btnToggle.innerText = "Ver opções adicionais";
            }

        });
    }

    calcularPreco();

});

function analisarProjeto(total, tipoSelecionado, extrasSelecionados) {

    const sugestao = document.getElementById("sugestao");
    if (!sugestao) return;

    sugestao.innerHTML = "🤖 Analisando seu projeto...";
    sugestao.classList.add("analisando");

    setTimeout(() => {

        sugestao.classList.remove("analisando");

        let texto = "";

        if (tipoSelecionado.includes("Landing")) {
            texto = "💡 Ideal para capturar leads e validar sua ideia rapidamente.";
        }

        if (tipoSelecionado.includes("Institucional")) {
            texto = "🏢 Perfeito para fortalecer sua presença profissional online.";
        }

        if (tipoSelecionado.includes("Loja")) {
            texto = "🛒 Estrutura pronta para vender todos os dias no automático.";
        }

        if (tipoSelecionado.includes("Sistema")) {
            texto = "⚙️ Excelente escolha para automatizar e escalar seu negócio.";
        }

        if (tipoSelecionado.includes("Aplicação")) {
            texto = "🚀 Projeto mais robusto, ideal para crescimento acelerado.";
        }

        if (total > 4000) {
            texto += "<br>🔥 Projeto de alto nível — foco em escala.";
        }

        if (extrasSelecionados.length > 0) {
            texto += "<br>✨ Extras aumentam muito seu potencial de resultado.";
        }

        sugestao.innerHTML = texto;
        sugestao.classList.add("show");

    }, 1200);
}

document.querySelectorAll(".faq .box").forEach(item => {
    item.addEventListener("click", () => {

        document.querySelectorAll(".faq .box").forEach(el => {
            if (el !== item) el.classList.remove("ativo");
        });

        item.classList.toggle("ativo");
    });
});

const formulario = document.getElementById("form-contato");
const statusMsg = document.getElementById("form-status");

if (formulario) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        if (statusMsg) {
            statusMsg.innerText = "Enviando...";
            statusMsg.style.color = "inherit";
        }

        const dados = new FormData(formulario);

        fetch(formulario.action, {
            method: "POST",
            body: dados,
            headers: { "Accept": "application/json" }
        })
        .then(response => {
            if (response.ok) {
                if (statusMsg) {
                    statusMsg.innerText = "✅ Mensagem enviada com sucesso! Retornaremos em breve.";
                    statusMsg.style.color = "green";
                }
                formulario.reset();
            } else {
                response.json().then(data => {
                    const erro = (data.errors && data.errors.length)
                        ? data.errors.map(e => e.message).join(", ")
                        : "Erro ao enviar. Tente novamente.";
                    if (statusMsg) {
                        statusMsg.innerText = "❌ " + erro;
                        statusMsg.style.color = "red";
                    }
                });
            }
        })
        .catch(() => {
            if (statusMsg) {
                statusMsg.innerText = "❌ Erro de conexão. Tente novamente.";
                statusMsg.style.color = "red";
            }
        });
    });
}

const track = document.getElementById('projetosTrack');
const prevBtn = document.querySelector('.seta-prev');
const nextBtn = document.querySelector('.seta-next');

let index = 0;

function getCardsPerView() {
    return window.innerWidth <= 768 ? 1 : 3;
}

function updateCarrossel() {
    const cards = track.children;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 24;
    const offset = index * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    const maxIndex = cards.length - getCardsPerView();
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;
}

nextBtn.addEventListener('click', () => {
    const maxIndex = track.children.length - getCardsPerView();
    if (index < maxIndex) {
        index++;
        updateCarrossel();
    }
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        updateCarrossel();
    }
});

window.addEventListener('resize', () => {
    index = 0;
    updateCarrossel();
});

updateCarrossel();