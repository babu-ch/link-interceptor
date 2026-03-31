export default {
  nav: {
    home: "홈",
    internal: "내부 링크",
    external: "외부 링크",
    prevent: "차단",
    analytics: "분석",
    confirm: "확인",
    formGuard: "폼 가드",
    security: "보안",
  },
  home: {
    title: "link-interceptor",
    description:
      "SPA 내 모든 {tag} 태그 클릭을 인터셉트합니다. 프레임워크에 독립적인 코어와 Vue, React, Svelte 래퍼를 제공합니다. 캡처 단계에서 포착하며, 내부/외부 링크에 대한 콜백을 제공합니다.",
    install: "설치",
    basic: "인터랙티브 데모",
    useCases: "사용 사례",
    console: "콘솔",
    consoleDescription:
      "인터셉터 로그가 하단의 콘솔 패널에 표시됩니다. 링크를 클릭하여 확인하세요.",
    internalDesc: "내부 링크를 router.push()로 변환",
    externalDesc: "외부 링크 URL 재작성",
    preventDesc: "링크 이동 차단",
    analyticsDesc: "링크 클릭 추적",
    confirmDesc: "외부 이동 시 확인 대화상자",
    formGuardDesc: "미저장 폼 변경사항이 있을 때 이동 방지",
    securityDesc: "도메인 허용 목록 + 자동 rel 속성",
  },
  internal: {
    title: "내부 링크",
    description:
      "onInternalLink로 동일 출처의 {tag} 태그 클릭을 캡처하고, router.push()를 통해 SPA 라우팅으로 변환합니다.",
    normalLinks: "일반 HTML 링크 (플러그인이 인터셉트)",
    toHome: "홈으로 이동",
    toExternal: "외부 링크로 이동",
    toPrevent: "차단 페이지로 이동",
    vhtml: "v-html 내 링크 (동적으로 생성된 HTML도 인터셉트)",
    vhtmlContent:
      'v-html로 렌더링된 콘텐츠입니다: <a href="/">홈으로 돌아가기</a> | <a href="/prevent">차단 페이지 보기</a>',
    nested: "중첩된 요소",
    nestedDesc: "{tag} 내부의 자식 요소를 클릭해도 감지됩니다",
    nestedLink: "꾸며진 링크",
    routerLink: "Router Link 공존",
    routerLinkDesc:
      "<router-link>와 일반 <a> 태그가 함께 동작합니다. 인터셉터는 캡처 단계에서 둘 다 포착합니다. RouterLink는 event.defaultPrevented를 확인하고, 인터셉터가 이미 처리한 경우 자체 네비게이션을 건너뜁니다.",
    routerLinkToHome: "router-link로 홈으로",
    plainLinkToExternal: "일반 <a>로 외부 링크로",
    routerLinkNote:
      "두 링크 모두 콘솔에 표시됩니다 — 인터셉터는 <router-link>에서 왔든 일반 HTML에서 왔든 모든 <a> 클릭을 처리합니다.",
    routerLinkGotcha: "주의: router-link replace",
    routerLinkGotchaDesc:
      "인터셉터는 <router-link replace> 클릭도 캡처합니다. 콜백이 ctx.preventDefault()와 router.push()를 호출하면, replace 속성이 무시되어 — 대체 대신 히스토리 항목이 추가됩니다.",
    routerLinkReplaceBroken: "해결 방법 없음 — replace가 무시됨 (클릭 후 뒤로 가기로 확인)",
    routerLinkReplaceFixed: "data-no-intercept 사용 — replace가 정상 동작 (클릭 후 뒤로 가기로 비교)",
    routerLinkGotchaNote:
      "첫 번째 링크는 해결 방법이 없습니다: 인터셉터가 preventDefault() + router.push()를 호출하므로 replace가 손실되고 히스토리 항목이 추가됩니다. 두 번째 링크는 data-no-intercept가 있습니다: 콜백이 preventDefault()를 건너뛰어 RouterLink가 replace로 네비게이션합니다.",
    routerLinkWorkaround:
      "해결 방법: replace 같은 속성을 유지해야 하는 <router-link>에 data-no-intercept 속성을 추가하세요. 콜백에서 ctx.anchor.hasAttribute('data-no-intercept')를 확인하고 ctx.preventDefault()를 건너뛰어 RouterLink가 자체적으로 네비게이션하도록 합니다. 구현은 main.ts를 참조하세요.",
  },
  external: {
    title: "외부 링크",
    description:
      "onExternalLink로 외부 링크(다른 출처) 클릭을 캡처합니다. 이 데모에서는 ?from=playground 파라미터를 자동으로 추가합니다.",
    externalLinks: "외부 링크 (클릭 시 URL이 재작성됨)",
    note: '콘솔에서 재작성된 URL을 확인하세요. target="_blank" 링크도 후킹됩니다.',
    modifierTest: "수정 키 테스트",
    modifierDesc:
      "Ctrl/Cmd + 클릭을 시도해보세요. 수정 키 클릭은 건너뛰어 브라우저의 새 탭 동작이 유지됩니다.",
    thisLink: "이 링크",
  },
  prevent: {
    title: "기본 동작 차단",
    description:
      "콜백에서 ctx.preventDefault()를 호출하여 링크 이동을 취소합니다.",
    normalLink: "일반 내부 링크 (이동함)",
    toHome: "홈으로 이동",
    blockedLinks: "차단된 링크 (이동하지 않음)",
    blockedDesc:
      "다음 링크에는 data-block 속성이 있습니다. 데모에서는 main.ts에서 이동을 차단합니다.",
    blockedLink: "blocked.example.com (클릭해도 이동하지 않음)",
    blockedToast: "{url}로의 이동이 차단되었습니다",
  },
  analytics: {
    title: "분석 / 추적",
    description:
      "링크 클릭 시 분석 이벤트를 발생시키는 예제입니다. GA4나 Mixpanel로 전송하는 것을 상상해보세요.",
    tryClick: "이 링크들을 클릭해보세요",
    internalLink: "내부 링크 (페이지 이동)",
    anotherDemo: "다른 데모 페이지로 이동",
    collectedEvents: "수집된 이벤트",
    time: "시간",
    type: "유형",
    url: "URL",
    noEvents: "아직 이벤트가 없습니다",
  },
  confirm: {
    title: "확인 대화상자",
    description:
      '외부 링크 클릭 시 확인 대화상자를 표시합니다. "취소"로 이동을 차단하고, "확인"으로 이동을 허용합니다.',
    withConfirm: "확인 대화상자가 있는 링크",
    withConfirmDesc: "다음 링크에는 data-confirm 속성이 있습니다.",
    confirmSuffix: " (확인 있음)",
    withoutConfirm: "확인 없는 링크 (일반 동작)",
    withoutConfirmSuffix: " (확인 없음)",
    internalLink: "내부 링크 (확인 없음)",
    implementation: "구현 예제",
    confirmPrompt: "{hostname}(으)로 이동하시겠습니까?",
  },
  formGuard: {
    title: "폼 가드",
    description:
      '폼 편집 중 링크를 클릭하면 "변경사항이 손실됩니다" 경고를 표시합니다. 미저장 입력이 있을 때만 대화상자가 나타납니다.',
    formSection: "폼 (무언가 입력한 후 링크를 클릭하세요)",
    name: "이름",
    namePlaceholder: "홍길동",
    email: "이메일",
    emailPlaceholder: "gildong{'@'}example.com",
    dirty: "미저장 변경사항",
    clean: "변경사항 없음",
    navLinks: "네비게이션 링크",
    navDesc: "미저장 폼 입력이 있는 상태에서 클릭하면 확인 대화상자가 나타납니다.",
    implementation: "구현 예제",
    confirmLeave: "변경사항이 손실됩니다. 그래도 이동하시겠습니까?",
  },
  security: {
    title: "보안",
    description:
      "외부 링크에 대한 보안 제어입니다. 도메인 허용 목록과 자동 rel 속성을 결합합니다.",
    allowlist: "허용 목록",
    allowlistDesc: "허용된 도메인: {domains}. 그 외에는 차단됩니다.",
    allowed: "허용",
    blocked: "차단",
    relSection: "자동 rel 속성",
    relDesc:
      '모든 외부 링크에 rel="noopener noreferrer"가 자동으로 추가됩니다. DevTools의 Elements 패널에서 확인하세요.',
    implementation: "구현 예제",
    blockedAlert: "{hostname}이(가) 차단되었습니다",
  },
  console: {
    title: "콘솔",
    empty: "링크를 클릭하면 인터셉터 로그가 여기에 표시됩니다",
  },
};
