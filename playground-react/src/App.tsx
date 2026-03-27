import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLinkInterceptor } from "react-link-interceptor";

function Home() {
  return (
    <div className="page">
      <h2>Home</h2>
      <p>React playground for react-link-interceptor.</p>
      <ul>
        <li><a href="/about">About (internal)</a></li>
        <li><a href="https://example.com">example.com (external)</a></li>
        <li><a href="https://vuejs.org">vuejs.org (external)</a></li>
      </ul>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h2>About</h2>
      <p>This page was navigated via <code>useLinkInterceptor</code> + react-router.</p>
      <a href="/">Back to Home</a>
    </div>
  );
}

export function App() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-19), msg]);
  };

  useLinkInterceptor({
    onInternalLink(ctx) {
      if (ctx.isModifierClick) return;
      ctx.preventDefault();
      addLog(`[Internal] ${ctx.path}`);
      navigate(ctx.path);
    },
    onExternalLink(ctx) {
      addLog(`[External] ${ctx.url.href}`);
      ctx.url.searchParams.set("from", "react-playground");
      addLog(`[External] rewritten → ${ctx.url.href}`);
      ctx.anchor.target = "_blank";
    },
  });

  return (
    <div className="layout">
      <header>
        <h1>react-link-interceptor</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <div className="console">
        <h3>Console</h3>
        <div className="log-entries">
          {logs.map((log, i) => (
            <div key={i} className="log-entry">{log}</div>
          ))}
          {logs.length === 0 && (
            <div className="log-empty">Click a link to see interceptor logs</div>
          )}
        </div>
      </div>
    </div>
  );
}
