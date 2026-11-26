/**
 * Controlador principal do App Cartão Nossa Família.
 * Arquitetura organizada em: Estado -> Utilitários -> Renderização -> Navegação -> Eventos.
 */

const state = {
  view: "home", // 'home' | 'categories' | 'explore' | 'detail' | 'how'
  previousView: "home",
  category: "todos",
  search: "",
  sort: "desconto-desc",
  selectedId: null,
};

// ================= UTILITÁRIOS =================

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function calcularDesconto(particular, cartao) {
  if (!particular || particular <= 0 || cartao >= particular) {
    return { economia: 0, percentual: 0 };
  }
  const economia = particular - cartao;
  const percentual = Math.round((economia / particular) * 100);
  return { economia, percentual };
}

function getCategoriaNome(id) {
  const found = CATEGORIAS.find((c) => c.id === id);
  return found ? found.nome : "Serviço";
}

// ================= INJEÇÃO DE ÍCONES FIXOS =================

function montarIconesFixos() {
  document.getElementById("icon-bell-slot").innerHTML = ICONS.bell;
  document.getElementById("icon-home-search").innerHTML = ICONS.search;
  document.getElementById("icon-explore-search").innerHTML = ICONS.search;
  document.getElementById("icon-chevron-cat").innerHTML = ICONS.chevronRight;
  document.getElementById("icon-chevron-serv").innerHTML = ICONS.chevronRight;
  document.getElementById("icon-back-arrow").innerHTML = ICONS.arrowLeft;

  document.getElementById("tab-icon-home").innerHTML = ICONS.home;
  document.getElementById("tab-icon-categories").innerHTML = ICONS.grid;
  document.getElementById("tab-icon-explore").innerHTML = ICONS.searchTab;
  document.getElementById("tab-icon-how").innerHTML = ICONS.help;
}

// ================= NAVEGAÇÃO =================

function irParaTela(viewName) {
  if (viewName === "detail") {
    state.previousView = state.view;
  }
  state.view = viewName;

  document
    .querySelectorAll(".view")
    .forEach((el) => el.classList.remove("active"));
  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.add("active");

  // Sincroniza barra inferior
  const activeTab = viewName === "detail" ? state.previousView : viewName;
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === activeTab);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function abrirExplorar(categoria = "todos", busca = "") {
  state.category = categoria;
  state.search = busca;
  document.getElementById("explore-search-input").value = busca;
  renderizarChipsExplorar();
  renderizarListaExplorar();
  irParaTela("explore");
}

function abrirDetalhes(serviceId) {
  const item = SERVICOS.find((s) => s.id === serviceId);
  if (!item) return;
  state.selectedId = serviceId;
  renderizarDetalhes(item);
  irParaTela("detail");
}

// ================= COMPONENTES DE RENDERIZAÇÃO =================

function criarCardServicoHTML(servico) {
  // Se for parceiro com desconto percentual (sem preço fixo)
  if (servico.resumoDesconto) {
    return `
      <article class="service-card" data-service-id="${servico.id}" role="button" tabindex="0">
        <div class="service-card-head">
          <div>
            <h3 class="service-card-title">${servico.nome}</h3>
            <p class="service-card-sub">${servico.parceiro} • ${servico.especialidade}</p>
          </div>
          <span class="service-card-chevron">${ICONS.chevronRight}</span>
        </div>

        <div class="savings-bar">
          <span>Clique aqui para ver seus descontos</span>
          <span class="savings-bar-pct">${servico.resumoDesconto}</span>
        </div>
      </article>
    `;
  }

  // Padrão normal (com preço particular e com cartão)
  const { economia, percentual } = calcularDesconto(
    servico.precoParticular,
    servico.precoCartao,
  );

  return `
    <article class="service-card" data-service-id="${servico.id}" role="button" tabindex="0">
      <div class="service-card-head">
        <div>
          <h3 class="service-card-title">${servico.nome}</h3>
          <p class="service-card-sub">${servico.parceiro} • ${servico.especialidade}</p>
        </div>
        <span class="service-card-chevron">${ICONS.chevronRight}</span>
      </div>

      <div class="service-card-prices">
        <div class="price-item">
          <span class="p-label">Particular</span>
          <span class="p-old">${formatarMoeda(servico.precoParticular)}</span>
        </div>
        <span class="price-arrow-muted">${ICONS.arrowDownRight}</span>
        <div class="price-item">
          <span class="p-label">Com o cartão</span>
          <span class="p-card">${formatarMoeda(servico.precoCartao)}</span>
        </div>
      </div>

      <div class="savings-bar">
        <span>Você economiza ${formatarMoeda(economia)}</span>
        <span class="savings-bar-pct">-${percentual}% OFF</span>
      </div>
    </article>
  `;
}

function renderizarHome() {
  // 1. Grid de 4 categorias (exatamente como no print)
  const catGrid = document.getElementById("home-categories-grid");
  catGrid.innerHTML = CATEGORIAS.map(
    (cat) => `
    <button class="cat-tile" data-open-cat="${cat.id}">
      <div class="cat-icon-box">${ICONS[cat.icone]}</div>
      <span>${cat.nome}</span>
    </button>
  `,
  ).join("");

  // 2. Card azul "Exemplo de economia"
  const featured = SERVICOS.find((s) => s.destaque) || SERVICOS[0];
  const { economia, percentual } = calcularDesconto(
    featured.precoParticular,
    featured.precoCartao,
  );

  document.getElementById("home-featured-card").innerHTML = `
    <article class="featured-savings-card" data-service-id="${featured.id}" role="button" tabindex="0">
      <div class="featured-pill">
        ${ICONS.sparkles}
        <span>Exemplo de economia</span>
      </div>
      <h3 class="featured-name">${featured.nome}</h3>

      <div class="featured-prices">
        <div class="featured-price-col">
          <span class="label">Particular</span>
          <span class="old-val">${formatarMoeda(featured.precoParticular)}</span>
        </div>
        <span class="featured-arrow">${ICONS.arrowDownRight}</span>
        <div class="featured-price-col">
          <span class="label">Com o cartão</span>
          <span class="new-val">${formatarMoeda(featured.precoCartao)}</span>
        </div>
      </div>

      <div class="featured-footer">
        <span class="featured-savings-text">Você economiza ${formatarMoeda(economia)}</span>
        <span class="featured-discount-pill">-${percentual}%</span>
      </div>
    </article>
  `;

  // 3. Top 3 maiores descontos abaixo
  const topServicos = [...SERVICOS]
    .filter((s) => s.id !== featured.id)
    .sort((a, b) => {
      const pA = calcularDesconto(a.precoParticular, a.precoCartao).percentual;
      const pB = calcularDesconto(b.precoParticular, b.precoCartao).percentual;
      return pB - pA;
    })
    .slice(0, 3);

  document.getElementById("home-top-list").innerHTML = topServicos
    .map(criarCardServicoHTML)
    .join("");
}

function renderizarTelaCategorias() {
  const container = document.getElementById("categories-full-list");
  container.innerHTML = CATEGORIAS.map((cat) => {
    const qtd = SERVICOS.filter((s) => s.categoria === cat.id).length;
    return `
      <button class="cat-row-card" data-open-cat="${cat.id}">
        <div class="cat-icon-box">${ICONS[cat.icone]}</div>
        <div class="cat-row-info">
          <h3>${cat.nome}</h3>
          <p>${cat.descricao}</p>
        </div>
        <span class="cat-row-count">${qtd} ${qtd === 1 ? "item" : "itens"}</span>
      </button>
    `;
  }).join("");
}

function renderizarChipsExplorar() {
  const chips = [{ id: "todos", nome: "Todos" }, ...CATEGORIAS];
  document.getElementById("explore-chips").innerHTML = chips
    .map(
      (c) => `
    <button class="chip-btn ${state.category === c.id ? "active" : ""}" data-chip="${c.id}">
      ${c.nome}
    </button>
  `,
    )
    .join("");
}

function renderizarListaExplorar() {
  const titleEl = document.getElementById("explore-title");
  const countEl = document.getElementById("explore-count");
  const listEl = document.getElementById("explore-results");

  titleEl.textContent =
    state.category === "todos"
      ? "Explorar serviços"
      : getCategoriaNome(state.category);

  const q = state.search.trim().toLowerCase();

  const filtrados = SERVICOS.filter((item) => {
    const matchCat =
      state.category === "todos" || item.categoria === state.category;
    const matchSearch =
      !q ||
      item.nome.toLowerCase().includes(q) ||
      item.especialidade.toLowerCase().includes(q) ||
      item.parceiro.toLowerCase().includes(q) ||
      item.descricao.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  filtrados.sort((a, b) => {
    const dA = calcularDesconto(a.precoParticular, a.precoCartao);
    const dB = calcularDesconto(b.precoParticular, b.precoCartao);
    switch (state.sort) {
      case "desconto-desc":
        return dB.percentual - dA.percentual;
      case "economia-desc":
        return dB.economia - dA.economia;
      case "preco-asc":
        return a.precoCartao - b.precoCartao;
      case "nome-asc":
        return a.nome.localeCompare(b.nome, "pt-BR");
      default:
        return 0;
    }
  });

  countEl.textContent = `${filtrados.length} ${filtrados.length === 1 ? "opção encontrada" : "opções encontradas"}`;

  if (filtrados.length === 0) {
    listEl.innerHTML = `
      <div class="empty-box">
        Nenhum serviço encontrado para sua busca. Tente outro termo ou toque em "Todos".
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtrados.map(criarCardServicoHTML).join("");
}

function renderizarDetalhes(item) {
  const isPercentual = Boolean(item.resumoDesconto);
  const { economia, percentual } = isPercentual
    ? { economia: 0, percentual: 0 }
    : calcularDesconto(item.precoParticular, item.precoCartao);

  const proporcaoPaga = isPercentual
    ? 0
    : Math.max(10, Math.round((item.precoCartao / item.precoParticular) * 100));

  const blocoValores = isPercentual
    ? `
      <div class="detail-compare-card">
        <div class="detail-savings-banner">
          <span>Benefício exclusivo com o Cartão Nossa Família</span>
          <strong>${item.resumoDesconto}</strong>
        </div>
      </div>
    `
    : `
      <div class="detail-compare-card">
        <div class="detail-price-grid">
          <div class="price-item">
            <span class="p-label">Valor particular</span>
            <span class="p-old">${formatarMoeda(item.precoParticular)}</span>
          </div>
          <span class="price-arrow-muted">${ICONS.arrowDownRight}</span>
          <div class="price-item" style="text-align: right;">
            <span class="p-label">Valor com o cartão</span>
            <span class="p-card" style="font-size: 1.45rem;">${formatarMoeda(item.precoCartao)}</span>
          </div>
        </div>

        <div class="progress-row">
          <div class="progress-track">
            <div class="progress-fill" style="width: ${proporcaoPaga}%"></div>
          </div>
          <span class="progress-badge">-${percentual}% OFF</span>
        </div>

        <div class="detail-savings-banner">
          <span>Sua economia real neste atendimento</span>
          <strong>${formatarMoeda(economia)}</strong>
        </div>
      </div>
    `;

  document.getElementById("detail-container").innerHTML = `
    <span class="detail-tag">${getCategoriaNome(item.categoria)}</span>
    <h1 class="detail-title">${item.nome}</h1>
    <p class="detail-partner">${item.parceiro}</p>
    <p class="detail-location">${ICONS.mapPin} <span>${item.local}</span></p>
    <p class="detail-description">${item.descricao}</p>

    <div class="detail-prep-box">
      <h3>Orientações para atendimento</h3>
      <p>${item.preparo}</p>
    </div>

    ${blocoValores}

    <button class="btn-primary-cta" id="btn-agendar-detalhe">
      ${isPercentual ? "Falar com atendimento" : "Agendar com desconto"}
    </button>
  `;

  document
    .getElementById("btn-agendar-detalhe")
    .addEventListener("click", () => {
      const resumoMsg = isPercentual
        ? `${item.nome} (${item.resumoDesconto}). Apresente seu Cartão Nossa Família ativo para garantir o benefício.`
        : `${item.nome} (${item.parceiro}) por ${formatarMoeda(item.precoCartao)} — economia de ${formatarMoeda(economia)} (${percentual}% OFF). Informe seu CPF no agendamento para garantir o valor.`;

      abrirSheet(
        isPercentual ? "Usar benefício" : "Agendar atendimento",
        resumoMsg,
        [
          {
            label: "Confirmar via WhatsApp",
            primary: true,
            onClick: () => {
              const textoZap = isPercentual
                ? `Olá! Sou cliente do Cartão Nossa Família e gostaria de informações sobre o benefício em: ${item.nome} (${item.resumoDesconto}).`
                : `Olá! Sou cliente do Cartão Nossa Família e gostaria de agendar: ${item.nome} (${formatarMoeda(item.precoCartao)}).`;
              window.open(
                `https://wa.me/5535999840544?text=${encodeURIComponent(textoZap)}`,
                "_blank",
              );
              fecharSheet();
            },
          },
          { label: "Fechar", primary: false, onClick: fecharSheet },
        ],
      );
    });
}
function renderizarComoFunciona() {
  document.getElementById("how-steps-list").innerHTML =
    COMO_FUNCIONA_PASSOS.map(
      (passo, i) => `
    <div class="step-card">
      <div class="step-number">${i + 1}</div>
      <div>
        <h3>${passo.titulo}</h3>
        <p>${passo.texto}</p>
      </div>
    </div>
  `,
    ).join("");
}

// ================= BOTTOM SHEET =================

function abrirSheet(titulo, mensagem, botoes = []) {
  document.getElementById("sheet-title").textContent = titulo;
  document.getElementById("sheet-body").textContent = mensagem;

  const actionsEl = document.getElementById("sheet-actions");
  actionsEl.innerHTML = "";

  botoes.forEach((cfg) => {
    const btn = document.createElement("button");
    btn.className = cfg.primary ? "btn-primary-cta" : "btn-secondary-cta";
    btn.textContent = cfg.label;
    btn.addEventListener("click", cfg.onClick);
    actionsEl.appendChild(btn);
  });

  const backdrop = document.getElementById("sheet-backdrop");
  backdrop.classList.add("open");
  backdrop.setAttribute("aria-hidden", "false");
}

function fecharSheet() {
  const backdrop = document.getElementById("sheet-backdrop");
  backdrop.classList.remove("open");
  backdrop.setAttribute("aria-hidden", "true");
}

// ================= EVENTOS =================

function registrarEventos() {
  document
    .getElementById("btn-logo-home")
    .addEventListener("click", () => irParaTela("home"));

  document.getElementById("btn-notifications").addEventListener("click", () => {
    // Esconde a bolinha indicadora depois que o usuário abre os avisos
    const dot = document.querySelector(".notif-dot");
    if (dot) dot.style.display = "none";

    const listaHTML =
      typeof AVISOS !== "undefined" && AVISOS.length > 0
        ? `<div class="avisos-list">
          ${AVISOS.map(
            (aviso) => `
            <div class="aviso-item">
              <div class="aviso-item-head">
                <strong>${aviso.titulo}</strong>
                ${aviso.data ? `<span class="aviso-tag">${aviso.data}</span>` : ""}
              </div>
              <p>${aviso.texto}</p>
            </div>
          `,
          ).join("")}
        </div>`
        : "<p>Nenhum aviso no momento.</p>";

    abrirSheet("Avisos e Novidades", "", [
      { label: "Entendi", primary: true, onClick: fecharSheet },
    ]);

    // Injeta a lista formatada dentro do corpo do Bottom Sheet
    document.getElementById("sheet-body").innerHTML = listaHTML;
  });
  // Busca na Home
  document
    .getElementById("home-search-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const termo = document.getElementById("home-search-input").value;
      abrirExplorar("todos", termo);
    });

  // Atalhos da Home
  document
    .getElementById("btn-see-all-categories")
    .addEventListener("click", () => irParaTela("categories"));
  document
    .getElementById("btn-see-all-services")
    .addEventListener("click", () => abrirExplorar("todos"));

  // Botão Voltar dos Detalhes
  document.getElementById("btn-detail-back").addEventListener("click", () => {
    irParaTela(state.previousView || "home");
  });

  // Tab bar inferior
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      if (tab === "explore") {
        abrirExplorar(state.category, state.search);
      } else {
        irParaTela(tab);
      }
    });
  });

  // Busca e ordenação em Explorar
  document
    .getElementById("explore-search-input")
    .addEventListener("input", (e) => {
      state.search = e.target.value;
      renderizarListaExplorar();
    });

  document
    .getElementById("explore-sort-select")
    .addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderizarListaExplorar();
    });

  // Delegação de cliques (categorias, chips e cards de serviços)
  document.addEventListener("click", (e) => {
    const openCat = e.target.closest("[data-open-cat]");
    if (openCat) {
      abrirExplorar(openCat.dataset.openCat, "");
      return;
    }

    const chip = e.target.closest("[data-chip]");
    if (chip) {
      state.category = chip.dataset.chip;
      renderizarChipsExplorar();
      renderizarListaExplorar();
      return;
    }

    const card = e.target.closest("[data-service-id]");
    if (card) {
      abrirDetalhes(card.dataset.serviceId);
    }
  });

  // Fecha o Bottom Sheet clicando fora
  document.getElementById("sheet-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "sheet-backdrop") fecharSheet();
  });
}

// ================= BOOTSTRAP =================

document.addEventListener("DOMContentLoaded", () => {
  montarIconesFixos();
  renderizarHome();
  renderizarTelaCategorias();
  renderizarComoFunciona();
  registrarEventos();
});
