export default {
  nav: {
    home: "首页",
    internal: "内部链接",
    external: "外部链接",
    prevent: "阻止跳转",
    analytics: "分析",
    confirm: "确认",
    formGuard: "表单保护",
    security: "安全",
  },
  home: {
    title: "link-interceptor",
    description:
      "拦截 SPA 中所有 {tag} 标签的点击事件。框架无关的核心库，提供 Vue、React 和 Svelte 封装。在捕获阶段拦截，并为内部/外部链接提供回调。",
    install: "安装",
    basic: "交互式演示",
    useCases: "使用场景",
    console: "控制台",
    consoleDescription:
      "拦截器的日志会显示在底部的控制台面板中。点击链接即可查看。",
    internalDesc: "将内部链接转换为 router.push()",
    externalDesc: "重写外部链接的 URL",
    preventDesc: "阻止链接跳转",
    analyticsDesc: "追踪链接点击",
    confirmDesc: "外部跳转时的确认对话框",
    formGuardDesc: "防止在表单有未保存更改时离开",
    securityDesc: "域名白名单 + 自动 rel 属性",
  },
  internal: {
    title: "内部链接",
    description:
      "通过 onInternalLink 捕获同源 {tag} 标签的点击，并通过 router.push() 转换为 SPA 路由。",
    normalLinks: "普通 HTML 链接（被插件拦截）",
    toHome: "前往首页",
    toExternal: "前往外部链接",
    toPrevent: "前往阻止跳转",
    vhtml: "v-html 中的链接（动态生成的 HTML 也会被拦截）",
    vhtmlContent:
      '这是通过 v-html 渲染的内容：<a href="/">返回首页</a> | <a href="/prevent">查看阻止跳转</a>',
    nested: "嵌套元素",
    nestedDesc: "点击 {tag} 内的子元素也会被检测到",
    nestedLink: "装饰过的链接",
    routerLink: "与 Router Link 共存",
    routerLinkDesc:
      "<router-link> 和普通 <a> 标签可以共存。拦截器在捕获阶段同时捕获两者。RouterLink 会检查 event.defaultPrevented，当拦截器已处理时会跳过自身的导航。",
    routerLinkToHome: "router-link 前往首页",
    plainLinkToExternal: "普通 <a> 前往外部链接",
    routerLinkNote:
      "两个链接都会显示在控制台中——拦截器会处理所有 <a> 的点击，无论它们来自 <router-link> 还是普通 HTML。",
    routerLinkGotcha: "注意事项：router-link replace",
    routerLinkGotchaDesc:
      "拦截器也会捕获 <router-link replace> 的点击。如果回调调用了 ctx.preventDefault() 和 router.push()，replace 属性会被忽略——会添加历史记录而不是替换。",
    routerLinkReplaceBroken: "无解决方案——replace 被忽略（点击后按返回键查看）",
    routerLinkReplaceFixed: "使用 data-no-intercept——replace 正常工作（点击后按返回键比较）",
    routerLinkGotchaNote:
      "第一个链接没有解决方案：拦截器调用 preventDefault() + router.push()，所以 replace 丢失，历史记录被添加。第二个链接有 data-no-intercept：回调跳过 preventDefault()，让 RouterLink 保持 replace 进行导航。",
    routerLinkWorkaround:
      "解决方案：为需要保留 replace 等属性的 <router-link> 添加 data-no-intercept 属性。在回调中检查 ctx.anchor.hasAttribute('data-no-intercept')，跳过 ctx.preventDefault() 让 RouterLink 自行处理导航。参见 main.ts 的实现。",
  },
  external: {
    title: "外部链接",
    description:
      "通过 onExternalLink 捕获外部链接（不同源）的点击。此演示会自动添加 ?from=playground 参数。",
    externalLinks: "外部链接（点击后 URL 会被重写）",
    note: '在控制台中查看重写后的 URL。target="_blank" 的链接也会被拦截。',
    modifierTest: "修饰键测试",
    modifierDesc:
      "尝试 Ctrl/Cmd + 点击。修饰键点击会被跳过，尊重浏览器的新标签页行为。",
    thisLink: "这个链接",
  },
  prevent: {
    title: "阻止跳转",
    description:
      "在回调中调用 ctx.preventDefault() 来取消链接导航。",
    normalLink: "普通内部链接（可导航）",
    toHome: "导航到首页",
    blockedLinks: "被阻止的链接（不导航）",
    blockedDesc:
      "以下链接带有 data-block 属性。演示在 main.ts 中阻止导航。",
    blockedLink: "blocked.example.com（点击不会导航）",
    blockedToast: "已阻止导航到 {url}",
  },
  analytics: {
    title: "分析 / 追踪",
    description:
      "链接点击时触发分析事件的示例。模拟发送到 GA4 或 Mixpanel。",
    tryClick: "尝试点击这些链接",
    internalLink: "内部链接（页面导航）",
    anotherDemo: "前往另一个演示页面",
    collectedEvents: "收集的事件",
    time: "时间",
    type: "类型",
    url: "URL",
    noEvents: "暂无事件",
  },
  confirm: {
    title: "确认对话框",
    description:
      '点击外部链接时显示确认对话框。"取消"阻止导航，"确定"允许导航。',
    withConfirm: "带确认对话框的链接",
    withConfirmDesc: "以下链接带有 data-confirm 属性。",
    confirmSuffix: "（需确认）",
    withoutConfirm: "无确认的链接（正常行为）",
    withoutConfirmSuffix: "（无确认）",
    internalLink: "内部链接（无确认）",
    implementation: "实现示例",
    confirmPrompt: "是否导航到 {hostname}？",
  },
  formGuard: {
    title: "表单保护",
    description:
      "在编辑表单时点击链接会显示「更改将丢失」的警告。仅在有未保存输入时才会出现对话框。",
    formSection: "表单（输入内容后点击链接）",
    name: "姓名",
    namePlaceholder: "张三",
    email: "邮箱",
    emailPlaceholder: "zhangsan{'@'}example.com",
    dirty: "有未保存的更改",
    clean: "无更改",
    navLinks: "导航链接",
    navDesc: "在有未保存表单输入时点击会出现确认对话框。",
    implementation: "实现示例",
    confirmLeave: "更改将丢失。是否继续导航？",
  },
  security: {
    title: "安全",
    description:
      "外部链接的安全控制。域名白名单与自动 rel 属性的结合。",
    allowlist: "白名单",
    allowlistDesc: "允许的域名：{domains}。其他域名将被阻止。",
    allowed: "允许",
    blocked: "已阻止",
    relSection: "自动 rel 属性",
    relDesc:
      '所有外部链接会自动添加 rel="noopener noreferrer"。在 DevTools 的 Elements 面板中查看。',
    implementation: "实现示例",
    blockedAlert: "{hostname} 已被阻止",
  },
  console: {
    title: "控制台",
    empty: "点击链接即可在此查看拦截器日志",
  },
};
