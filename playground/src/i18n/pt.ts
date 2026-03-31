export default {
  nav: {
    home: "Início",
    internal: "Internos",
    external: "Externos",
    prevent: "Prevenir",
    analytics: "Análise",
    confirm: "Confirmar",
    formGuard: "Form Guard",
    security: "Segurança",
  },
  home: {
    title: "link-interceptor",
    description:
      "Intercepta todos os cliques em tags {tag} na sua SPA. Núcleo independente de framework com wrappers para Vue, React e Svelte. Captura na fase de captura e fornece callbacks para links internos/externos.",
    install: "Instalação",
    basic: "Demos interativas",
    useCases: "Casos de uso",
    console: "Console",
    consoleDescription:
      "Os logs do interceptor aparecem no painel do console na parte inferior. Clique em um link para vê-los.",
    internalDesc: "Converter links internos em router.push()",
    externalDesc: "Reescrever URLs de links externos",
    preventDesc: "Bloquear navegação de links",
    analyticsDesc: "Rastrear cliques em links",
    confirmDesc: "Diálogo de confirmação para navegação externa",
    formGuardDesc: "Prevenir navegação com alterações não salvas no formulário",
    securityDesc: "Lista de domínios permitidos + atributo rel automático",
  },
  internal: {
    title: "Links internos",
    description:
      "Captura cliques em tags {tag} da mesma origem com onInternalLink e os converte em roteamento SPA via router.push().",
    normalLinks: "Links HTML normais (interceptados pelo plugin)",
    toHome: "Ir para Início",
    toExternal: "Ir para Links externos",
    toPrevent: "Ir para Prevenir",
    vhtml: "Links em v-html (HTML gerado dinamicamente também é interceptado)",
    vhtmlContent:
      'Este é conteúdo renderizado com v-html: <a href="/">Voltar ao Início</a> | <a href="/prevent">Ver Prevenir</a>',
    nested: "Elementos aninhados",
    nestedDesc: "Cliques em elementos filhos dentro de {tag} também são detectados",
    nestedLink: "Link decorado",
    routerLink: "Coexistência com Router Link",
    routerLinkDesc:
      "<router-link> e tags <a> simples funcionam lado a lado. O interceptor captura ambos na fase de captura. RouterLink verifica event.defaultPrevented e pula sua própria navegação quando o interceptor já a tratou.",
    routerLinkToHome: "router-link para Início",
    plainLinkToExternal: "<a> simples para Links externos",
    routerLinkNote:
      "Ambos os links aparecem no console — o interceptor trata todos os cliques em <a>, independentemente de virem de <router-link> ou HTML simples.",
    routerLinkGotcha: "Armadilha: router-link replace",
    routerLinkGotchaDesc:
      "O interceptor também captura cliques de <router-link replace>. Se o callback chamar ctx.preventDefault() e router.push(), a prop replace é silenciosamente ignorada — uma entrada é adicionada ao histórico em vez de substituída.",
    routerLinkReplaceBroken: "sem solução — replace é ignorado (clique, depois pressione Voltar para ver)",
    routerLinkReplaceFixed: "com data-no-intercept — replace funciona (clique, depois pressione Voltar para comparar)",
    routerLinkGotchaNote:
      "O primeiro link não tem solução: o interceptor chama preventDefault() + router.push(), então replace é perdido e uma entrada de histórico é adicionada. O segundo link tem data-no-intercept: o callback pula preventDefault(), deixando RouterLink tratar a navegação com replace intacto.",
    routerLinkWorkaround:
      "Solução: adicione um atributo data-no-intercept aos elementos <router-link> que precisam preservar props como replace. No callback, verifique ctx.anchor.hasAttribute('data-no-intercept') e pule ctx.preventDefault() para que RouterLink trate a navegação. Veja main.ts para a implementação.",
  },
  external: {
    title: "Links externos",
    description:
      "Captura cliques de links externos (origem diferente) com onExternalLink. Esta demo adiciona automaticamente o parâmetro ?from=playground.",
    externalLinks: "Links externos (a URL é reescrita ao clicar)",
    note: 'Verifique a URL reescrita no console. Links com target="_blank" também são interceptados.',
    modifierTest: "Teste de teclas modificadoras",
    modifierDesc:
      "Tente Ctrl/Cmd + Clique. Cliques com teclas modificadoras são pulados, respeitando o comportamento de nova aba do navegador.",
    thisLink: "este link",
  },
  prevent: {
    title: "Prevenir navegação",
    description:
      "Chame ctx.preventDefault() no callback para cancelar a navegação do link.",
    normalLink: "Link interno normal (navega)",
    toHome: "Navegar para Início",
    blockedLinks: "Links bloqueados (sem navegação)",
    blockedDesc:
      "Os links a seguir têm um atributo data-block. A demo bloqueia a navegação em main.ts.",
    blockedLink: "blocked.example.com (clique não navega)",
    blockedToast: "Navegação para {url} bloqueada",
  },
  analytics: {
    title: "Análise / Rastreamento",
    description:
      "Exemplo de disparo de eventos de análise ao clicar em links. Imagine enviando para GA4 ou Mixpanel.",
    tryClick: "Tente clicar nestes links",
    internalLink: "Link interno (navegação de página)",
    anotherDemo: "Ir para outra página de demo",
    collectedEvents: "Eventos coletados",
    time: "Hora",
    type: "Tipo",
    url: "URL",
    noEvents: "Nenhum evento ainda",
  },
  confirm: {
    title: "Diálogo de confirmação",
    description:
      'Mostra um diálogo de confirmação ao clicar em um link externo. "Cancelar" bloqueia a navegação, "OK" permite.',
    withConfirm: "Links com diálogo de confirmação",
    withConfirmDesc: "Os links a seguir têm um atributo data-confirm.",
    confirmSuffix: " (com confirmação)",
    withoutConfirm: "Links sem confirmação (comportamento normal)",
    withoutConfirmSuffix: " (sem confirmação)",
    internalLink: "Link interno (sem confirmação)",
    implementation: "Exemplo de implementação",
    confirmPrompt: "Navegar para {hostname}?",
  },
  formGuard: {
    title: "Form Guard",
    description:
      'Mostra um aviso de "alterações serão perdidas" ao clicar em um link durante a edição de um formulário. O diálogo só aparece quando há entradas não salvas.',
    formSection: "Formulário (digite algo e depois clique em um link)",
    name: "Nome",
    namePlaceholder: "João Silva",
    email: "E-mail",
    emailPlaceholder: "joao{'@'}example.com",
    dirty: "Alterações não salvas",
    clean: "Sem alterações",
    navLinks: "Links de navegação",
    navDesc: "Um diálogo de confirmação aparece ao clicar com entradas de formulário não salvas.",
    implementation: "Exemplo de implementação",
    confirmLeave: "As alterações serão perdidas. Navegar mesmo assim?",
  },
  security: {
    title: "Segurança",
    description:
      "Controles de segurança para links externos. Combina lista de domínios permitidos com atributo rel automático.",
    allowlist: "Lista de permitidos",
    allowlistDesc: "Domínios permitidos: {domains}. Todos os outros estão bloqueados.",
    allowed: "Permitido",
    blocked: "Bloqueado",
    relSection: "Atributo rel automático",
    relDesc:
      'Todos os links externos recebem automaticamente rel="noopener noreferrer". Verifique no painel Elements do DevTools.',
    implementation: "Exemplo de implementação",
    blockedAlert: "{hostname} está bloqueado",
  },
  console: {
    title: "Console",
    empty: "Clique em um link para ver os logs do interceptor aqui",
  },
};
