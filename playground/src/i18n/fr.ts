export default {
  nav: {
    home: "Accueil",
    internal: "Internes",
    external: "Externes",
    prevent: "Bloquer",
    analytics: "Analytique",
    confirm: "Confirmer",
    formGuard: "Form Guard",
    security: "Sécurité",
  },
  home: {
    title: "link-interceptor",
    description:
      "Intercepte tous les clics sur les balises {tag} dans votre SPA. Noyau indépendant du framework avec des wrappers Vue, React et Svelte. Capture en phase de capture et fournit des callbacks pour les liens internes/externes.",
    install: "Installation",
    basic: "Démos interactives",
    useCases: "Cas d'utilisation",
    console: "Console",
    consoleDescription:
      "Les logs de l'intercepteur apparaissent dans le panneau console en bas. Cliquez sur un lien pour les voir.",
    internalDesc: "Convertir les liens internes en router.push()",
    externalDesc: "Réécrire les URLs des liens externes",
    preventDesc: "Bloquer la navigation des liens",
    analyticsDesc: "Suivre les clics sur les liens",
    confirmDesc: "Dialogue de confirmation pour la navigation externe",
    formGuardDesc: "Empêcher la navigation avec des modifications non sauvegardées",
    securityDesc: "Liste de domaines autorisés + attribut rel automatique",
  },
  internal: {
    title: "Liens internes",
    description:
      "Capture les clics sur les balises {tag} de même origine avec onInternalLink et les convertit en routage SPA via router.push().",
    normalLinks: "Liens HTML normaux (interceptés par le plugin)",
    toHome: "Aller à l'Accueil",
    toExternal: "Aller aux Liens externes",
    toPrevent: "Aller à Bloquer",
    vhtml: "Liens dans v-html (le HTML généré dynamiquement est aussi intercepté)",
    vhtmlContent:
      'Ceci est du contenu rendu avec v-html : <a href="/">Retour à l\'Accueil</a> | <a href="/prevent">Voir Bloquer</a>',
    nested: "Éléments imbriqués",
    nestedDesc: "Les clics sur les éléments enfants à l'intérieur de {tag} sont aussi détectés",
    nestedLink: "Lien décoré",
    routerLink: "Coexistence avec Router Link",
    routerLinkDesc:
      "<router-link> et les balises <a> simples fonctionnent côte à côte. L'intercepteur capture les deux en phase de capture. RouterLink vérifie event.defaultPrevented et ignore sa propre navigation lorsque l'intercepteur l'a déjà géré.",
    routerLinkToHome: "router-link vers l'Accueil",
    plainLinkToExternal: "<a> simple vers Liens externes",
    routerLinkNote:
      "Les deux liens apparaissent dans la console — l'intercepteur gère tous les clics sur <a>, qu'ils proviennent de <router-link> ou de HTML simple.",
    routerLinkGotcha: "Piège : router-link replace",
    routerLinkGotchaDesc:
      "L'intercepteur capture aussi les clics de <router-link replace>. Si le callback appelle ctx.preventDefault() et router.push(), la prop replace est silencieusement ignorée — une entrée d'historique est ajoutée au lieu d'être remplacée.",
    routerLinkReplaceBroken: "sans solution — replace est ignoré (cliquez, puis appuyez sur Retour pour voir)",
    routerLinkReplaceFixed: "avec data-no-intercept — replace fonctionne (cliquez, puis appuyez sur Retour pour comparer)",
    routerLinkGotchaNote:
      "Le premier lien n'a pas de solution : l'intercepteur appelle preventDefault() + router.push(), donc replace est perdu et une entrée d'historique est ajoutée. Le second lien a data-no-intercept : le callback ignore preventDefault(), laissant RouterLink gérer la navigation avec replace intact.",
    routerLinkWorkaround:
      "Solution : ajouter un attribut data-no-intercept aux éléments <router-link> qui doivent préserver des props comme replace. Dans le callback, vérifier ctx.anchor.hasAttribute('data-no-intercept') et ignorer ctx.preventDefault() pour laisser RouterLink gérer la navigation. Voir main.ts pour l'implémentation.",
  },
  external: {
    title: "Liens externes",
    description:
      "Capture les clics de liens externes (origine différente) avec onExternalLink. Cette démo ajoute automatiquement le paramètre ?from=playground.",
    externalLinks: "Liens externes (l'URL est réécrite au clic)",
    note: 'Vérifiez l\'URL réécrite dans la console. Les liens avec target="_blank" sont aussi interceptés.',
    modifierTest: "Test des touches de modification",
    modifierDesc:
      "Essayez Ctrl/Cmd + Clic. Les clics avec touches de modification sont ignorés, respectant le comportement de nouvel onglet du navigateur.",
    thisLink: "ce lien",
  },
  prevent: {
    title: "Bloquer la navigation",
    description:
      "Appelez ctx.preventDefault() dans le callback pour annuler la navigation du lien.",
    normalLink: "Lien interne normal (navigue)",
    toHome: "Naviguer vers l'Accueil",
    blockedLinks: "Liens bloqués (pas de navigation)",
    blockedDesc:
      "Les liens suivants ont un attribut data-block. La démo bloque la navigation dans main.ts.",
    blockedLink: "blocked.example.com (le clic ne navigue pas)",
    blockedToast: "Navigation vers {url} bloquée",
  },
  analytics: {
    title: "Analytique / Suivi",
    description:
      "Exemple de déclenchement d'événements analytiques lors de clics sur des liens. Imaginez l'envoi vers GA4 ou Mixpanel.",
    tryClick: "Essayez de cliquer sur ces liens",
    internalLink: "Lien interne (navigation de page)",
    anotherDemo: "Aller à une autre page de démo",
    collectedEvents: "Événements collectés",
    time: "Heure",
    type: "Type",
    url: "URL",
    noEvents: "Pas encore d'événements",
  },
  confirm: {
    title: "Dialogue de confirmation",
    description:
      'Affiche un dialogue de confirmation lors du clic sur un lien externe. "Annuler" bloque la navigation, "OK" l\'autorise.',
    withConfirm: "Liens avec dialogue de confirmation",
    withConfirmDesc: "Les liens suivants ont un attribut data-confirm.",
    confirmSuffix: " (avec confirmation)",
    withoutConfirm: "Liens sans confirmation (comportement normal)",
    withoutConfirmSuffix: " (sans confirmation)",
    internalLink: "Lien interne (sans confirmation)",
    implementation: "Exemple d'implémentation",
    confirmPrompt: "Naviguer vers {hostname} ?",
  },
  formGuard: {
    title: "Form Guard",
    description:
      "Affiche un avertissement « les modifications seront perdues » lors du clic sur un lien pendant l'édition d'un formulaire. Le dialogue n'apparaît que lorsqu'il y a des saisies non sauvegardées.",
    formSection: "Formulaire (saisissez quelque chose puis cliquez sur un lien)",
    name: "Nom",
    namePlaceholder: "Jean Dupont",
    email: "E-mail",
    emailPlaceholder: "jean{'@'}example.com",
    dirty: "Modifications non sauvegardées",
    clean: "Aucune modification",
    navLinks: "Liens de navigation",
    navDesc: "Un dialogue de confirmation apparaît lors du clic avec des saisies de formulaire non sauvegardées.",
    implementation: "Exemple d'implémentation",
    confirmLeave: "Les modifications seront perdues. Naviguer quand même ?",
  },
  security: {
    title: "Sécurité",
    description:
      "Contrôles de sécurité pour les liens externes. Combine une liste de domaines autorisés avec un attribut rel automatique.",
    allowlist: "Liste autorisée",
    allowlistDesc: "Domaines autorisés : {domains}. Tous les autres sont bloqués.",
    allowed: "Autorisé",
    blocked: "Bloqué",
    relSection: "Attribut rel automatique",
    relDesc:
      'Tous les liens externes obtiennent automatiquement rel="noopener noreferrer". Vérifiez dans le panneau Elements de DevTools.',
    implementation: "Exemple d'implémentation",
    blockedAlert: "{hostname} est bloqué",
  },
  console: {
    title: "Console",
    empty: "Cliquez sur un lien pour voir les logs de l'intercepteur ici",
  },
};
