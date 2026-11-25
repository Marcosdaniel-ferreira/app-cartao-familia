/**
 * Central de ícones vetoriais (SVG puro, zero emojis),
 * categorias e catálogo de serviços do Cartão Nossa Família.
 */

const ICONS = {
  bell: `<svg class="ico" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  search: `<svg class="ico ico-sm" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  searchTab: `<svg class="ico" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  home: `<svg class="ico" viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  grid: `<svg class="ico" viewBox="0 0 24 24"><rect width="7" height="7" x="3" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="3" rx="1.5"/><rect width="7" height="7" x="14" y="14" rx="1.5"/><rect width="7" height="7" x="3" y="14" rx="1.5"/></svg>`,
  help: `<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`,
  chevronRight: `<svg class="ico ico-sm" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>`,
  arrowLeft: `<svg class="ico ico-sm" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  arrowDownRight: `<svg class="ico ico-sm" viewBox="0 0 24 24"><path d="m7 7 10 10"/><path d="M17 7v10H7"/></svg>`,
  sparkles: `<svg class="ico ico-sm" viewBox="0 0 24 24"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/></svg>`,
  mapPin: `<svg class="ico ico-sm" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,

  // Ícones das 4 categorias (fiéis ao print)
  stethoscope: `<svg class="ico" viewBox="0 0 24 24"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`,
  testTube: `<svg class="ico" viewBox="0 0 24 24"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/></svg>`,
  building: `<svg class="ico" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
  heartPulse: `<svg class="ico" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>`,
};

const CATEGORIAS = [
  {
    id: "consultas",
    nome: "Consultas",
    icone: "stethoscope",
    descricao: "Clínico geral e médicos especialistas com desconto direto.",
  },
  {
    id: "exames",
    nome: "Exames",
    icone: "testTube",
    descricao: "Análises clínicas, ultrassom e diagnósticos por imagem.",
  },
  {
    id: "parceiros",
    nome: "Parceiros",
    icone: "building",
    descricao: "Clínicas, laboratórios e pacotes credenciados.",
  },
  {
    id: "procedimentos",
    nome: "Procedimentos",
    icone: "heartPulse",
    descricao: "Odontologia, fisioterapia, vacinas e pequenos procedimentos.",
  },
];

const SERVICOS = [
  // Destaque principal (igual ao card azul do print)
  {
    id: "cons-01",
    destaque: true,
    categoria: "consultas",
    nome: "Dr. Jorge Anzai Neto",
    especialidade: "Consulta Médica Especializada",
    parceiro: "Clínica Nossa Família",
    local: "Centro — Nepomuceno, MG",
    precoParticular: 450.0,
    precoCartao: 350.0,
    descricao:
      "Atendimento médico especializado com avaliação completa, orientações clínicas e acompanhamento dedicado.",
    preparo:
      "Apresente seu CPF e documento com foto na recepção para ativar o valor do cartão.",
  },
  {
    id: "cons-02",
    categoria: "consultas",
    nome: "Consulta com Clínico Geral",
    especialidade: "Clínica Médica",
    parceiro: "Clínica Nossa Família",
    local: "Centro — Atendimento presencial",
    precoParticular: 220.0,
    precoCartao: 85.0,
    descricao:
      "Consulta para avaliação preventiva, solicitação de exames de rotina e acompanhamento geral da saúde.",
    preparo: "Levar documento com foto e exames recentes, se tiver.",
  },
  {
    id: "cons-03",
    categoria: "consultas",
    nome: "Consulta Pediátrica",
    especialidade: "Pediatria",
    parceiro: "Clínica Nossa Família",
    local: "Centro — Nepomuceno, MG",
    precoParticular: 290.0,
    precoCartao: 110.0,
    descricao:
      "Acompanhamento completo do crescimento e desenvolvimento infantil.",
    preparo: "Trazer a caderneta de vacinação da criança.",
  },
  {
    id: "cons-04",
    categoria: "consultas",
    nome: "Consulta Cardiológica",
    especialidade: "Cardiologia",
    parceiro: "Centro Médico Parceiro",
    local: "Centro — Nepomuceno, MG",
    precoParticular: 380.0,
    precoCartao: 160.0,
    descricao:
      "Avaliação da saúde cardiovascular, controle de pressão e prevenção.",
    preparo: "Levar lista de medicamentos em uso e exames anteriores.",
  },

  // Exames
  {
    id: "exam-01",
    categoria: "exames",
    nome: "Hemograma Completo",
    especialidade: "Exame Laboratorial",
    parceiro: "Laboratório Credenciado",
    local: "Unidade Centro",
    precoParticular: 68.0,
    precoCartao: 22.0,
    descricao:
      "Avaliação completa das células sanguíneas para check-up e investigação clínica.",
    preparo: "Jejum leve de 4 horas recomendado conforme pedido médico.",
  },
  {
    id: "exam-02",
    categoria: "exames",
    nome: "Ultrassonografia Abdominal Total",
    especialidade: "Diagnóstico por Imagem",
    parceiro: "Centro de Imagem Parceiro",
    local: "Centro — Nepomuceno, MG",
    precoParticular: 260.0,
    precoCartao: 115.0,
    descricao: "Exame de imagem para avaliação detalhada de órgãos abdominais.",
    preparo: "Jejum de 6 horas e ingestão de água antes do exame.",
  },
  {
    id: "exam-03",
    categoria: "exames",
    nome: "Eletrocardiograma (ECG)",
    especialidade: "Exame Cardíaco",
    parceiro: "Clínica Nossa Família",
    local: "Centro — Nepomuceno, MG",
    precoParticular: 140.0,
    precoCartao: 55.0,
    descricao:
      "Avaliação rápida e segura da atividade elétrica do coração com laudo.",
    preparo: "Não aplicar cremes ou óleos na região do tórax no dia.",
  },

  // Parceiros
  {
    id: "parc-01",
    categoria: "parceiros",
    nome: "Check-up Saúde Completo",
    especialidade: "Pacote Preventivo",
    parceiro: "Clínica Nossa Família",
    local: "Centro — Nepomuceno, MG",
    precoParticular: 620.0,
    precoCartao: 279.0,
    descricao:
      "Combo com consulta clínica + hemograma + glicemia + perfil lipídico.",
    preparo: "Jejum de 8 a 12 horas para coleta dos exames laboratoriais.",
  },
  {
    id: "parc-02",
    categoria: "parceiros",
    nome: "Avaliação Oftalmológica Completa",
    especialidade: "Oftalmologia",
    parceiro: "Instituto da Visão Parceiro",
    local: "Região Central",
    precoParticular: 360.0,
    precoCartao: 150.0,
    descricao:
      "Consulta de vista completa com exame de refração e avaliação ocular.",
    preparo: "Levar óculos ou lentes atuais, caso utilize.",
  },

  // Procedimentos
  {
    id: "proc-01",
    categoria: "procedimentos",
    nome: "Sessão de Fisioterapia",
    especialidade: "Reabilitação Motora",
    parceiro: "Espaço Fisio Parceiro",
    local: "Centro — Nepomuceno, MG",
    precoParticular: 150.0,
    precoCartao: 70.0,
    descricao: "Sessão individual de fisioterapia ortopédica e funcional.",
    preparo: "Comparecer com roupas confortáveis.",
  },
  {
    id: "proc-02",
    categoria: "procedimentos",
    nome: "Profilaxia Dentária (Limpeza)",
    especialidade: "Odontologia",
    parceiro: "Odonto Parceira Credenciada",
    local: "Centro — Nepomuceno, MG",
    precoParticular: 220.0,
    precoCartao: 95.0,
    descricao:
      "Limpeza odontológica completa com remoção de tártaro e polimento.",
    preparo: "Higienização habitual antes do atendimento.",
  },
];

const COMO_FUNCIONA_PASSOS = [
  {
    titulo: "Escolha o cuidado no app",
    texto:
      "Navegue por consultas, exames, parceiros ou procedimentos e compare o valor particular com o desconto do cartão.",
  },
  {
    titulo: "Agende direto na clínica ou parceiro",
    texto:
      "Solicite seu horário pelo atendimento oficial informando que você é titular ou dependente do Cartão Nossa Família.",
  },
  {
    titulo: "Informe seu CPF na recepção",
    texto:
      "No dia do atendimento, basta apresentar seu CPF para que o valor com desconto seja aplicado automaticamente.",
  },
  {
    titulo: "Economize sem burocracia",
    texto:
      "Sem guias complexas ou surpresas: você sabe exatamente quanto vai pagar e quanto economiza antes mesmo de agendar.",
  },
];
