export default {
  nav: {
    home: "Startseite",
    internal: "Intern",
    external: "Extern",
    prevent: "Blockieren",
    analytics: "Analytik",
    confirm: "Bestätigen",
    formGuard: "Form Guard",
    security: "Sicherheit",
  },
  home: {
    title: "link-interceptor",
    description:
      "Fängt alle Klicks auf {tag}-Tags in Ihrer SPA ab. Framework-unabhängiger Kern mit Vue-, React- und Svelte-Wrappern. Erfasst in der Capture-Phase und bietet Callbacks für interne/externe Links.",
    install: "Installation",
    basic: "Interaktive Demos",
    useCases: "Anwendungsfälle",
    console: "Konsole",
    consoleDescription:
      "Interceptor-Logs erscheinen im Konsolenpanel unten. Klicken Sie auf einen Link, um sie zu sehen.",
    internalDesc: "Interne Links in router.push() umwandeln",
    externalDesc: "URLs externer Links umschreiben",
    preventDesc: "Link-Navigation blockieren",
    analyticsDesc: "Link-Klicks verfolgen",
    confirmDesc: "Bestätigungsdialog für externe Navigation",
    formGuardDesc: "Navigation bei ungespeicherten Formularänderungen verhindern",
    securityDesc: "Domain-Erlaubnisliste + automatisches rel-Attribut",
  },
  internal: {
    title: "Interne Links",
    description:
      "Erfasst Klicks auf gleichherkunfts-{tag}-Tags mit onInternalLink und wandelt sie über router.push() in SPA-Routing um.",
    normalLinks: "Normale HTML-Links (vom Plugin abgefangen)",
    toHome: "Zur Startseite",
    toExternal: "Zu Externen Links",
    toPrevent: "Zu Blockieren",
    vhtml: "Links in v-html (dynamisch generiertes HTML wird ebenfalls abgefangen)",
    vhtmlContent:
      'Dies ist Inhalt, der mit v-html gerendert wurde: <a href="/">Zurück zur Startseite</a> | <a href="/prevent">Blockieren ansehen</a>',
    nested: "Verschachtelte Elemente",
    nestedDesc: "Klicks auf Kindelemente innerhalb von {tag} werden ebenfalls erkannt",
    nestedLink: "Dekorierter Link",
    routerLink: "Koexistenz mit Router Link",
    routerLinkDesc:
      "<router-link> und einfache <a>-Tags funktionieren nebeneinander. Der Interceptor erfasst beide in der Capture-Phase. RouterLink prüft event.defaultPrevented und überspringt seine eigene Navigation, wenn der Interceptor sie bereits behandelt hat.",
    routerLinkToHome: "router-link zur Startseite",
    plainLinkToExternal: "einfaches <a> zu Externen Links",
    routerLinkNote:
      "Beide Links erscheinen in der Konsole — der Interceptor behandelt alle <a>-Klicks, unabhängig davon, ob sie von <router-link> oder einfachem HTML stammen.",
    routerLinkGotcha: "Fallstrick: router-link replace",
    routerLinkGotchaDesc:
      "Der Interceptor erfasst auch Klicks auf <router-link replace>. Wenn der Callback ctx.preventDefault() und router.push() aufruft, wird die replace-Prop stillschweigend ignoriert — ein Verlaufseintrag wird hinzugefügt statt ersetzt.",
    routerLinkReplaceBroken: "ohne Workaround — replace wird ignoriert (klicken, dann Zurück drücken zum Prüfen)",
    routerLinkReplaceFixed: "mit data-no-intercept — replace funktioniert (klicken, dann Zurück drücken zum Vergleichen)",
    routerLinkGotchaNote:
      "Der erste Link hat keinen Workaround: Der Interceptor ruft preventDefault() + router.push() auf, daher geht replace verloren und ein Verlaufseintrag wird hinzugefügt. Der zweite Link hat data-no-intercept: Der Callback überspringt preventDefault(), sodass RouterLink die Navigation mit replace durchführt.",
    routerLinkWorkaround:
      "Workaround: Fügen Sie ein data-no-intercept-Attribut zu <router-link>-Elementen hinzu, die Props wie replace beibehalten müssen. Im Callback ctx.anchor.hasAttribute('data-no-intercept') prüfen und ctx.preventDefault() überspringen, damit RouterLink die Navigation selbst durchführt. Siehe main.ts für die Implementierung.",
  },
  external: {
    title: "Externe Links",
    description:
      "Erfasst Klicks auf externe Links (andere Herkunft) mit onExternalLink. Diese Demo fügt automatisch den Parameter ?from=playground hinzu.",
    externalLinks: "Externe Links (URL wird beim Klick umgeschrieben)",
    note: 'Prüfen Sie die umgeschriebene URL in der Konsole. Links mit target="_blank" werden ebenfalls erfasst.',
    modifierTest: "Modifikatortasten-Test",
    modifierDesc:
      "Versuchen Sie Strg/Cmd + Klick. Klicks mit Modifikatortasten werden übersprungen, das Verhalten des Browsers für neue Tabs wird respektiert.",
    thisLink: "diesen Link",
  },
  prevent: {
    title: "Navigation blockieren",
    description:
      "Rufen Sie ctx.preventDefault() im Callback auf, um die Link-Navigation abzubrechen.",
    normalLink: "Normaler interner Link (navigiert)",
    toHome: "Zur Startseite navigieren",
    blockedLinks: "Blockierte Links (keine Navigation)",
    blockedDesc:
      "Die folgenden Links haben ein data-block-Attribut. Die Demo blockiert die Navigation in main.ts.",
    blockedLink: "blocked.example.com (Klick navigiert nicht)",
    blockedToast: "Navigation zu {url} blockiert",
  },
  analytics: {
    title: "Analytik / Tracking",
    description:
      "Beispiel für das Auslösen von Analyse-Events bei Link-Klicks. Stellen Sie sich das Senden an GA4 oder Mixpanel vor.",
    tryClick: "Versuchen Sie, auf diese Links zu klicken",
    internalLink: "Interner Link (Seitennavigation)",
    anotherDemo: "Zu einer anderen Demo-Seite",
    collectedEvents: "Gesammelte Events",
    time: "Zeit",
    type: "Typ",
    url: "URL",
    noEvents: "Noch keine Events",
  },
  confirm: {
    title: "Bestätigungsdialog",
    description:
      'Zeigt einen Bestätigungsdialog beim Klick auf einen externen Link. "Abbrechen" blockiert die Navigation, "OK" erlaubt sie.',
    withConfirm: "Links mit Bestätigungsdialog",
    withConfirmDesc: "Die folgenden Links haben ein data-confirm-Attribut.",
    confirmSuffix: " (mit Bestätigung)",
    withoutConfirm: "Links ohne Bestätigung (normales Verhalten)",
    withoutConfirmSuffix: " (ohne Bestätigung)",
    internalLink: "Interner Link (ohne Bestätigung)",
    implementation: "Implementierungsbeispiel",
    confirmPrompt: "Zu {hostname} navigieren?",
  },
  formGuard: {
    title: "Form Guard",
    description:
      'Zeigt eine Warnung „Änderungen gehen verloren" beim Klick auf einen Link während der Formularbearbeitung. Der Dialog erscheint nur bei ungespeicherten Eingaben.',
    formSection: "Formular (geben Sie etwas ein und klicken Sie dann auf einen Link)",
    name: "Name",
    namePlaceholder: "Max Mustermann",
    email: "E-Mail",
    emailPlaceholder: "max{'@'}example.com",
    dirty: "Ungespeicherte Änderungen",
    clean: "Keine Änderungen",
    navLinks: "Navigationslinks",
    navDesc: "Ein Bestätigungsdialog erscheint beim Klick mit ungespeicherten Formulareingaben.",
    implementation: "Implementierungsbeispiel",
    confirmLeave: "Änderungen gehen verloren. Trotzdem navigieren?",
  },
  security: {
    title: "Sicherheit",
    description:
      "Sicherheitskontrollen für externe Links. Kombiniert eine Domain-Erlaubnisliste mit einem automatischen rel-Attribut.",
    allowlist: "Erlaubnisliste",
    allowlistDesc: "Erlaubte Domains: {domains}. Alle anderen sind blockiert.",
    allowed: "Erlaubt",
    blocked: "Blockiert",
    relSection: "Automatisches rel-Attribut",
    relDesc:
      'Alle externen Links erhalten automatisch rel="noopener noreferrer". Prüfen Sie im Elements-Panel der DevTools.',
    implementation: "Implementierungsbeispiel",
    blockedAlert: "{hostname} ist blockiert",
  },
  console: {
    title: "Konsole",
    empty: "Klicken Sie auf einen Link, um Interceptor-Logs hier zu sehen",
  },
};
