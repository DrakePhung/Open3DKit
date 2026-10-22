/** React host wiring the reusable core and registered tool extensions. */
import { useEffect, useRef, useState } from 'react';
import { SceneDocument, Viewport, disposeObjects } from './core';
import { createTools } from './tools';
const tools = createTools();
export default function Workspace({ initialTool }: { initialTool: string }) {
  const host = useRef<HTMLDivElement>(null);
  const runtime = useRef<{ document: SceneDocument; viewport: Viewport } | null>(null);
  const [objects, setObjects] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const document = new SceneDocument();
    const unsubscribe = document.subscribe(() => setObjects(document.objects.map(item => ({ id: item.uuid, name: item.name || item.type }))));
    let viewport: Viewport;
    try { viewport = new Viewport(host.current!, document); }
    catch { unsubscribe(); setError('Không thể khởi tạo WebGL. Hãy bật tăng tốc đồ họa trong trình duyệt.'); return; }
    runtime.current = { document, viewport };
    tools.execute(initialTool, { document });
    return () => {
      runtime.current = null;
      unsubscribe();
      viewport.dispose();
      disposeObjects(document.objects);
    };
  }, [initialTool]);
  function execute(id: string) {
    if (!runtime.current) return;
    try { tools.execute(id, { document: runtime.current.document }); setError(''); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Không thể chạy công cụ.'); }
  }
  return <main className="editor">
    <header className="editor-header"><div><a href="#tools" className="brand"><span className="brand-mark">O<span>3</span></span>Open3DKit<span className="brand-tag">LAB</span></a><a className="editor-home" href="#tools">← Thư viện tool</a><span className="editor-title">Không gian làm việc 3D</span></div><button onClick={() => runtime.current?.viewport.resetCamera()}>Đặt lại góc nhìn</button></header>
    <section className="workspace"><aside><h2>Công cụ</h2><div className="tool-buttons">{tools.entries.map(tool => <button key={tool.id} onClick={() => execute(tool.id)}>＋ {tool.label}</button>)}</div><h2>Đối tượng ({objects.length})</h2>{objects.map(item => <div className="object" key={item.id}>◇ {item.name}</div>)}<h2>Điều khiển</h2><p>Kéo chuột trái: xoay<br/>Cuộn: phóng to / thu nhỏ<br/>Kéo chuột phải: di chuyển</p><p><a href="#contribute">Hướng dẫn đóng góp tool ↗</a></p></aside><div className="viewport" ref={host} aria-label="Khung nhìn 3D">{error && <p role="alert">{error}</p>}</div></section>
    <footer className="editor-footer"><span className="editor-status">Chạy cục bộ</span><span>TypeScript · React · Three.js</span><span>Rời workspace sẽ bỏ scene chưa lưu</span></footer>
  </main>;
}
