// ======================================================================
// HELPDESK WEB - SPA COM JAVASCRIPT PURO
// ======================================================================

// Array com as prioridades disponíveis.
// O <select> do formulário é montado a partir dele.
const prioridades = ["Baixa", "Média", "Alta"];

// Array com dados temporários.
// Eles existem apenas enquanto a página está aberta.
const chamados = [
    {
        id: 1,
        titulo: "Computador não liga",
        descricao: "O computador não apresenta sinal de energia.",
        prioridade: "Alta",
        status: "Aberto"
    },
    {
        id: 2,
        titulo: "Senha bloqueada",
        descricao: "Usuário não consegue acessar o sistema.",
        prioridade: "Média",
        status: "Em atendimento"
    },
    {
        id: 3,
        titulo: "notebook não liga",
        descricao: "O computador não apresenta sinal de energia.",
        prioridade: "Alta",
        status: "Encerrado",
        solucao: "Foi trocado o carregador do notebook."
    }
];

// Procura o elemento <div id="app">.
const app = document.getElementById("app");

// Retorna a badge colorida da prioridade.
function badgePrioridade(prioridade) {
    if (prioridade === "Alta") {
        return `<span class="badge bg-danger piscando">ALTA</span>`;
    }
    if (prioridade === "Média") {
        return `<span class="badge bg-warning text-dark">MÉDIA</span>`;
    }
    return `<span class="badge bg-success">BAIXA</span>`;
}

// Retorna a badge colorida do status.
function badgeStatus(status) {
    if (status === "Aberto") {
        return `<span class="badge bg-primary">Aberto</span>`;
    }
    if (status === "Em atendimento") {
        return `<span class="badge bg-info text-dark">Em atendimento</span>`;
    }
    return `<span class="badge bg-secondary">Encerrado</span>`;
}

// Procura um chamado pelo id.
function buscarChamado(id) {
    return chamados.find(chamado => chamado.id === id);
}

// Função que desenha o Dashboard.
function mostrarDashboard() {

    // filter cria um novo array com os chamados de cada situação.
    // length conta quantos existem.
    const abertos = chamados.filter(c => c.status === "Aberto").length;
    const emAtendimento = chamados.filter(c => c.status === "Em atendimento").length;
    const encerrados = chamados.filter(c => c.status === "Encerrado").length;
    const alta = chamados.filter(c => c.prioridade === "Alta").length;

    app.innerHTML = `
        <h1 class="mb-4">Dashboard</h1>

        <div class="row g-3">
            <div class="col-md-4">
                <div class="card"><div class="card-body">
                    <h2 class="h5">Total de chamados</h2>
                    <p class="display-6">${chamados.length}</p>
                </div></div>
            </div>

            <div class="col-md-4">
                <div class="card"><div class="card-body">
                    <h2 class="h5">Abertos</h2>
                    <p class="display-6">${abertos}</p>
                </div></div>
            </div>

            <div class="col-md-4">
                <div class="card"><div class="card-body">
                    <h2 class="h5">Em atendimento</h2>
                    <p class="display-6">${emAtendimento}</p>
                </div></div>
            </div>

            <div class="col-md-6">
                <div class="card"><div class="card-body">
                    <h2 class="h5">Encerrados</h2>
                    <p class="display-6">${encerrados}</p>
                </div></div>
            </div>

            <div class="col-md-6">
                <div class="card"><div class="card-body">
                    <h2 class="h5">Prioridade Alta</h2>
                    <p class="display-6">${alta}</p>
                </div></div>
            </div>
        </div>
    `;
}

// Função que desenha a listagem.
function mostrarChamados() {

    app.innerHTML = `
        <h1 class="mb-4">Chamados</h1>

        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    ${
                        // map transforma cada objeto em uma linha HTML.
                        chamados.map(chamado => `
                            <tr>
                                <td>${chamado.id}</td>
                                <td>${chamado.titulo}</td>
                                <td>${badgePrioridade(chamado.prioridade)}</td>
                                <td>${badgeStatus(chamado.status)}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary"
                                        onclick="mostrarDetalhes(${chamado.id})">
                                        Visualizar
                                    </button>

                                    ${
                                        // Só mostra "Encerrar" se ainda não foi encerrado.
                                        chamado.status !== "Encerrado"
                                            ? `<button class="btn btn-sm btn-danger"
                                                   onclick="mostrarEncerramento(${chamado.id})">
                                                   Encerrar chamado
                                               </button>`
                                            : ""
                                    }
                                </td>
                            </tr>
                        `)
                        // join une todas as linhas sem vírgula.
                        .join("")
                    }
                </tbody>
            </table>
        </div>
    `;
}

// Função que desenha a tela de detalhes do chamado.
function mostrarDetalhes(id) {

    const chamado = buscarChamado(id);

    app.innerHTML = `
        <h1 class="mb-4">Detalhes do chamado</h1>

        <div class="card mb-3">
            <div class="card-body">
                <p><strong>Chamado:</strong> #${chamado.id}</p>
                <p><strong>Problema:</strong> ${chamado.titulo}</p>
                <p><strong>Descrição:</strong> ${chamado.descricao}</p>
                <p><strong>Prioridade:</strong> ${badgePrioridade(chamado.prioridade)}</p>
                <p><strong>Status:</strong> ${badgeStatus(chamado.status)}</p>

                ${
                    // Se estiver encerrado, mostra o que foi feito.
                    chamado.status === "Encerrado"
                        ? `<p><strong>Solução:</strong> ${chamado.solucao}</p>`
                        : ""
                }
            </div>
        </div>

        <button class="btn btn-secondary" onclick="mostrarChamados()">
            Voltar
        </button>
    `;
}

// Função que desenha a tela de encerramento do chamado.
function mostrarEncerramento(id) {

    const chamado = buscarChamado(id);

    app.innerHTML = `
        <h1 class="mb-4">Encerrar chamado</h1>

        <div class="card mb-3">
            <div class="card-body">
                <p><strong>Chamado:</strong> #${chamado.id}</p>
                <p><strong>Problema:</strong> ${chamado.titulo}</p>
                <p><strong>Descrição:</strong> ${chamado.descricao}</p>
                <p><strong>Prioridade:</strong> ${badgePrioridade(chamado.prioridade)}</p>
                <p><strong>Status atual:</strong> ${badgeStatus(chamado.status)}</p>
            </div>
        </div>

        <form id="formEncerrar">
            <div class="mb-3">
                <label class="form-label" for="solucao">
                    O que foi feito?
                </label>

                <textarea class="form-control" id="solucao" rows="4"></textarea>
            </div>

            <!-- Mensagem de erro (fica escondida até a validação falhar). -->
            <div id="erro" class="alert alert-danger d-none">
                O preenchimento do campo "O que foi feito?" é obrigatório.
            </div>

            <button class="btn btn-danger" type="submit">
                Confirmar encerramento
            </button>

            <button class="btn btn-secondary" type="button" onclick="mostrarChamados()">
                Cancelar
            </button>
        </form>
    `;

    const formulario = document.getElementById("formEncerrar");

    formulario.addEventListener("submit", evento => {

        // Impede o navegador de recarregar a página.
        evento.preventDefault();

        // trim remove os espaços do início e do fim.
        const solucao = document.getElementById("solucao").value.trim();

        // Validação: não pode encerrar sem informar o que foi feito.
        if (solucao === "") {
            document.getElementById("erro").classList.remove("d-none");
            return;
        }

        // Altera o próprio objeto do chamado.
        chamado.solucao = solucao;
        chamado.status = "Encerrado";

        // Volta para a lista.
        mostrarChamados();
    });
}

// Função que desenha o formulário.
function mostrarNovoChamado() {

    app.innerHTML = `
        <h1 class="mb-4">Novo chamado</h1>

        <form id="formChamado">
            <div class="mb-3">
                <label class="form-label" for="titulo">
                    Título
                </label>

                <input
                    class="form-control"
                    id="titulo"
                    required>
            </div>

            <div class="mb-3">
                <label class="form-label" for="descricao">
                    Descrição
                </label>

                <textarea
                    class="form-control"
                    id="descricao"
                    rows="4"></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label" for="prioridade">
                    Prioridade
                </label>

                <select class="form-select" id="prioridade" required>
                    <option value="">Selecione</option>
                    ${
                        // map cria uma <option> para cada prioridade do array.
                        prioridades
                            .map(prioridade => `<option>${prioridade}</option>`)
                            .join("")
                    }
                </select>
            </div>

            <button class="btn btn-success" type="submit">
                Cadastrar
            </button>
        </form>
    `;

    // Procura o formulário que acabou de ser criado.
    const formulario = document.getElementById("formChamado");

    // Escuta o envio do formulário.
    formulario.addEventListener("submit", cadastrarChamado);
}

// Função executada no submit.
function cadastrarChamado(evento) {

    // Impede o navegador de recarregar a página.
    evento.preventDefault();

    // push adiciona um novo objeto no array.
    chamados.push({
        // ID simplificado para aula.
        id: chamados.length + 1,

        // Lê o valor do campo título.
        titulo: document.getElementById("titulo").value,

        // Lê o valor da descrição.
        descricao: document.getElementById("descricao").value,

        // Lê o valor selecionado.
        prioridade: document.getElementById("prioridade").value,

        // Novo chamado começa aberto.
        status: "Aberto"
    });

    // Depois do cadastro, mostra a lista.
    mostrarChamados();
}

// Seleciona todos os elementos que têm data-view.
const links = document.querySelectorAll("[data-view]");

// Percorre os links.
links.forEach(link => {

    // Escuta clique.
    link.addEventListener("click", evento => {

        // Impede navegação padrão.
        evento.preventDefault();

        // Lê data-view.
        const view = link.dataset.view;

        // Decide qual "tela" mostrar.
        if (view === "dashboard") {
            mostrarDashboard();
        }

        if (view === "chamados") {
            mostrarChamados();
        }

        if (view === "novo") {
            mostrarNovoChamado();
        }
    });
});

// Primeira tela.
mostrarDashboard();
