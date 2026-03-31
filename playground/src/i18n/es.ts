export default {
  nav: {
    home: "Inicio",
    internal: "Internos",
    external: "Externos",
    prevent: "Prevenir",
    analytics: "Analítica",
    confirm: "Confirmar",
    formGuard: "Form Guard",
    security: "Seguridad",
  },
  home: {
    title: "link-interceptor",
    description:
      "Intercepta todos los clics en etiquetas {tag} en tu SPA. Núcleo independiente del framework con wrappers para Vue, React y Svelte. Captura en la fase de captura y proporciona callbacks para enlaces internos/externos.",
    install: "Instalación",
    basic: "Demos interactivas",
    useCases: "Casos de uso",
    console: "Consola",
    consoleDescription:
      "Los registros del interceptor aparecen en el panel de consola en la parte inferior. Haz clic en un enlace para verlos.",
    internalDesc: "Convertir enlaces internos a router.push()",
    externalDesc: "Reescribir URLs de enlaces externos",
    preventDesc: "Bloquear la navegación de enlaces",
    analyticsDesc: "Rastrear clics en enlaces",
    confirmDesc: "Diálogo de confirmación para navegación externa",
    formGuardDesc: "Prevenir la navegación con cambios no guardados",
    securityDesc: "Lista de dominios permitidos + atributo rel automático",
  },
  internal: {
    title: "Enlaces internos",
    description:
      "Captura clics en etiquetas {tag} del mismo origen con onInternalLink y los convierte en enrutamiento SPA mediante router.push().",
    normalLinks: "Enlaces HTML normales (interceptados por el plugin)",
    toHome: "Ir a Inicio",
    toExternal: "Ir a Enlaces externos",
    toPrevent: "Ir a Prevenir",
    vhtml: "Enlaces en v-html (el HTML generado dinámicamente también es interceptado)",
    vhtmlContent:
      'Este es contenido renderizado con v-html: <a href="/">Volver a Inicio</a> | <a href="/prevent">Ver Prevenir</a>',
    nested: "Elementos anidados",
    nestedDesc: "Los clics en elementos hijos dentro de {tag} también son detectados",
    nestedLink: "Enlace decorado",
    routerLink: "Coexistencia con Router Link",
    routerLinkDesc:
      "<router-link> y las etiquetas <a> simples funcionan lado a lado. El interceptor captura ambos en la fase de captura. RouterLink verifica event.defaultPrevented y omite su propia navegación cuando el interceptor ya lo ha gestionado.",
    routerLinkToHome: "router-link a Inicio",
    plainLinkToExternal: "<a> simple a Enlaces externos",
    routerLinkNote:
      "Ambos enlaces aparecen en la consola — el interceptor maneja todos los clics en <a> independientemente de si provienen de <router-link> o HTML simple.",
    routerLinkGotcha: "Trampa: router-link replace",
    routerLinkGotchaDesc:
      "El interceptor también captura clics de <router-link replace>. Si el callback llama a ctx.preventDefault() y router.push(), la prop replace se ignora silenciosamente — se añade una entrada al historial en lugar de reemplazar.",
    routerLinkReplaceBroken: "sin solución — replace se ignora (haz clic, luego presiona Atrás para ver)",
    routerLinkReplaceFixed: "con data-no-intercept — replace funciona (haz clic, luego presiona Atrás para comparar)",
    routerLinkGotchaNote:
      "El primer enlace no tiene solución: el interceptor llama a preventDefault() + router.push(), así que replace se pierde y se añade una entrada al historial. El segundo enlace tiene data-no-intercept: el callback omite preventDefault(), dejando que RouterLink maneje la navegación con replace intacto.",
    routerLinkWorkaround:
      "Solución: añadir un atributo data-no-intercept a los elementos <router-link> que necesiten preservar props como replace. En el callback, verificar ctx.anchor.hasAttribute('data-no-intercept') y omitir ctx.preventDefault() para que RouterLink maneje la navegación. Ver main.ts para la implementación.",
  },
  external: {
    title: "Enlaces externos",
    description:
      "Captura clics de enlaces externos (diferente origen) con onExternalLink. Esta demo añade automáticamente el parámetro ?from=playground.",
    externalLinks: "Enlaces externos (la URL se reescribe al hacer clic)",
    note: 'Verifica la URL reescrita en la consola. Los enlaces con target="_blank" también son interceptados.',
    modifierTest: "Prueba de teclas modificadoras",
    modifierDesc:
      "Prueba Ctrl/Cmd + Clic. Los clics con teclas modificadoras se omiten, respetando el comportamiento de nueva pestaña del navegador.",
    thisLink: "este enlace",
  },
  prevent: {
    title: "Prevenir navegación",
    description:
      "Llama a ctx.preventDefault() en el callback para cancelar la navegación del enlace.",
    normalLink: "Enlace interno normal (navega)",
    toHome: "Navegar a Inicio",
    blockedLinks: "Enlaces bloqueados (sin navegación)",
    blockedDesc:
      "Los siguientes enlaces tienen un atributo data-block. La demo bloquea la navegación en main.ts.",
    blockedLink: "blocked.example.com (el clic no navega)",
    blockedToast: "Navegación bloqueada a {url}",
  },
  analytics: {
    title: "Analítica / Seguimiento",
    description:
      "Ejemplo de disparo de eventos de analítica al hacer clic en enlaces. Imagina enviando a GA4 o Mixpanel.",
    tryClick: "Prueba hacer clic en estos enlaces",
    internalLink: "Enlace interno (navegación de página)",
    anotherDemo: "Ir a otra página de demo",
    collectedEvents: "Eventos recopilados",
    time: "Hora",
    type: "Tipo",
    url: "URL",
    noEvents: "Aún no hay eventos",
  },
  confirm: {
    title: "Diálogo de confirmación",
    description:
      'Muestra un diálogo de confirmación al hacer clic en un enlace externo. "Cancelar" bloquea la navegación, "Aceptar" la permite.',
    withConfirm: "Enlaces con diálogo de confirmación",
    withConfirmDesc: "Los siguientes enlaces tienen un atributo data-confirm.",
    confirmSuffix: " (con confirmación)",
    withoutConfirm: "Enlaces sin confirmación (comportamiento normal)",
    withoutConfirmSuffix: " (sin confirmación)",
    internalLink: "Enlace interno (sin confirmación)",
    implementation: "Ejemplo de implementación",
    confirmPrompt: "¿Navegar a {hostname}?",
  },
  formGuard: {
    title: "Form Guard",
    description:
      'Muestra una advertencia de "los cambios se perderán" al hacer clic en un enlace mientras se edita un formulario. El diálogo solo aparece cuando hay entradas no guardadas.',
    formSection: "Formulario (escribe algo y luego haz clic en un enlace)",
    name: "Nombre",
    namePlaceholder: "Juan García",
    email: "Correo electrónico",
    emailPlaceholder: "juan{'@'}example.com",
    dirty: "Cambios no guardados",
    clean: "Sin cambios",
    navLinks: "Enlaces de navegación",
    navDesc: "Aparece un diálogo de confirmación al hacer clic con entradas de formulario no guardadas.",
    implementation: "Ejemplo de implementación",
    confirmLeave: "Los cambios se perderán. ¿Navegar de todos modos?",
  },
  security: {
    title: "Seguridad",
    description:
      "Controles de seguridad para enlaces externos. Combina lista de dominios permitidos con atributo rel automático.",
    allowlist: "Lista de permitidos",
    allowlistDesc: "Dominios permitidos: {domains}. Todos los demás están bloqueados.",
    allowed: "Permitido",
    blocked: "Bloqueado",
    relSection: "Atributo rel automático",
    relDesc:
      'Todos los enlaces externos obtienen automáticamente rel="noopener noreferrer". Verifica en el panel Elements de DevTools.',
    implementation: "Ejemplo de implementación",
    blockedAlert: "{hostname} está bloqueado",
  },
  console: {
    title: "Consola",
    empty: "Haz clic en un enlace para ver los registros del interceptor aquí",
  },
};
