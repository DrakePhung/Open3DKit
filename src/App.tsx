/** Public tool directory and contributor guide backed by the tool registry. */
import { useEffect, useState } from 'react';
import Workspace from './Workspace';
import { createTools } from './tools';
import { normalizeSearch } from './catalog';
import coreGuide from '../docs/CORE.md?raw';
const tools = createTools().entries;
const categories = ['Tất cả', ...new Set(tools.map(tool => tool.category || 'Khác'))];
const repo = 'https://github.com/open3dkit/Open3DKit';
const sample = `import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';
import type { ToolDefinition } from '../core';

export const myTool: ToolDefinition = {
  id: 'community.my-tool',
  label: 'Tool của bạn',
  category: 'Cộng đồng',
  description: 'Mô tả ngắn về công cụ.',
  run({ document }) {
    const mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ color: '#8bc8ad' }),
    );
    mesh.position.y = 0.5;
    document.add(mesh);
  },
};`;
function Shape({ kind = 'cube' }: { kind?: string }) {
  if (kind.includes('sphere')) return <svg viewBox="0 0 180 140" aria-hidden="true"><ellipse cx="90" cy="121" rx="46" ry="7" fill="currentColor" opacity=".1"/><circle cx="90" cy="67" r="46" fill="currentColor" opacity=".16" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="90" cy="67" rx="20" ry="46" fill="none" stroke="currentColor"/><ellipse cx="90" cy="67" rx="46" ry="17" fill="none" stroke="currentColor"/><path d="M44 67h92M90 21v92" stroke="currentColor" opacity=".4"/></svg>;
  if (kind.includes('cylinder')) return <svg viewBox="0 0 180 140" aria-hidden="true"><ellipse cx="90" cy="125" rx="46" ry="6" fill="currentColor" opacity=".1"/><path d="M49 39v62c0 24 82 24 82 0V39" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="1.5"/><ellipse cx="90" cy="39" rx="41" ry="17" fill="currentColor" fillOpacity=".24" stroke="currentColor" strokeWidth="1.5"/><path d="M69 54v64M111 54v64" stroke="currentColor" opacity=".25"/></svg>;
  return <svg viewBox="0 0 180 140" aria-hidden="true"><ellipse cx="90" cy="126" rx="49" ry="6" fill="currentColor" opacity=".1"/><path d="M90 17l48 28v55l-48 28-48-28V45z" fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="1.5"/><path d="M42 45l48 28 48-28M90 73v55" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M90 17v56" stroke="currentColor" opacity=".3"/></svg>;
}
export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  useEffect(() => { const update = () => setRoute(window.location.hash); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update); }, []);
  const toolId = route.startsWith('#workspace/') ? route.slice('#workspace/'.length) : '';
  const selected = tools.find(tool => tool.id === toolId);
  if (selected) return <Workspace key={selected.id} initialTool={selected.id} />;
  const contribute = route === '#contribute';
  const filtered = tools.filter(tool => (category === 'Tất cả' || tool.category === category) && normalizeSearch(`${tool.label} ${tool.description} ${tool.category}`).includes(normalizeSearch(query)));
  return <div className="portal">
    <nav className="portal-nav" aria-label="Điều hướng chính"><a href="#tools" className="brand"><span className="brand-mark">O<span>3</span></span>Open3DKit<span className="brand-tag">LAB</span></a><div className="nav-links"><a href="#tools" aria-current={!contribute ? 'page' : undefined}>Thư viện tool</a><a href="#contribute" aria-current={contribute ? 'page' : undefined}>Dành cho lập trình viên</a></div><a className="github-link" href={repo} target="_blank" rel="noreferrer">GitHub ↗</a></nav>
    <div className="portal-body">
    {contribute ? <>
      <section className="contribute-intro"><a className="back-link" href="#tools">← Về thư viện tool</a><p className="eyebrow">BUILD WITH OPEN3DKIT</p><h1>Tool tiếp theo.<br/><em>Do bạn tạo nên.</em></h1><p>Viết tính năng bằng TypeScript, đăng ký vào core và chia sẻ với mọi người qua pull request.</p><a className="primary-link" href={repo} target="_blank" rel="noreferrer">Mở repository ↗</a></section>
      <section className="contributor-layout"><div className="steps"><h2>Từ ý tưởng đến thư viện</h2><article><span>01</span><div><h3>Clone và chạy local</h3><code>npm ci &amp;&amp; npm run dev</code><p>Dùng Node.js 24. Core và UI đã được nối sẵn.</p></div></article><article><span>02</span><div><h3>Viết tool của bạn</h3><p>Tạo file trong src/tools, triển khai ToolDefinition như mẫu bên cạnh.</p></div></article><article><span>03</span><div><h3>Đăng ký và kiểm tra</h3><p>Import tool vào src/tools/index.ts rồi gọi registry.register(myTool). Thẻ tool tự xuất hiện khi tải lại trang.</p><code>npm test &amp;&amp; npm run build</code></div></article><article><span>04</span><div><h3>Gửi pull request</h3><p>Mô tả tính năng và kết quả kiểm tra. Sau khi code được merge và triển khai, mọi người có thể dùng tool.</p></div></article><a className="text-link" href={`data:text/markdown;charset=utf-8,${encodeURIComponent(coreGuide)}`} download="Open3DKit-CORE.md">Tải tài liệu core ↓</a></div><div className="code-panel"><div><span>src/tools/myTool.ts</span><a href={`data:text/plain;charset=utf-8,${encodeURIComponent(sample)}`} download="myTool.ts">Tải mẫu ↓</a></div><pre><code>{sample}</code></pre></div></section>
    </> : <>
      <section className="hero"><div><p className="eyebrow"><span className="live-dot"/> OPEN SOURCE · LOCAL FIRST</p><h1>Ý tưởng của bạn.<br/><em>Công cụ của cộng đồng.</em></h1><p className="hero-copy">Không gian công cụ 3D mở. Khám phá, thử nghiệm và cùng xây dựng những công cụ hữu ích cho quy trình sáng tạo của bạn.</p><div className="hero-actions"><a className="primary-link" href="#catalog">Khám phá công cụ <span>↗</span></a><a className="text-link" href="#contribute">Đóng góp một tool →</a></div><div className="hero-facts"><span><b>{tools.length.toString().padStart(2, '0')}</b> công cụ đang có</span><span>Chạy trên trình duyệt</span><span>Mã nguồn mở</span></div></div><div className="hero-art" aria-hidden="true"><div className="art-grid"/><div className="art-orbit"/><div className="hero-cube"><Shape /></div><span className="art-label top">OPEN3DKIT / GEOMETRY</span><span className="art-label bottom">X 0.00 &nbsp; Y 0.00 &nbsp; Z 0.00</span><span className="art-point">+</span></div></section>
      <section id="catalog" className="catalog"><div className="section-title"><div><p className="eyebrow">THE TOOLBOX</p><h2>Thư viện công cụ <span>{tools.length.toString().padStart(2, '0')}</span></h2></div><label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Tìm công cụ…" aria-label="Tìm công cụ"/>{query && <button aria-label="Xóa tìm kiếm" onClick={() => setQuery('')}>×</button>}</label></div>
      <div className="catalog-controls"><div role="group" aria-label="Danh mục công cụ">{categories.map(item => <button key={item} aria-pressed={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><span role="status">{filtered.length} công cụ</span></div>
      <div className="tool-grid">{filtered.map((tool) => <article className={`tool-card tone-${tool.id.includes('sphere') ? 'green' : tool.id.includes('cylinder') ? 'amber' : 'blue'}`} key={tool.id}><a className="tool-visual" href={`#workspace/${tool.id}`} aria-label={`Mở ${tool.label}`}><span className="tool-number">0{tools.indexOf(tool) + 1} / GEOMETRY</span><Shape kind={tool.id}/><span className="visual-arrow">↗</span></a><div className="tool-content"><span className="category-tag">{tool.category}</span><h3>{tool.label}</h3><p>{tool.description}</p><div className="tool-bottom"><span><i/> Sẵn sàng sử dụng</span><a href={`#workspace/${tool.id}`}>Mở công cụ →</a></div></div></article>)}</div>
      {!filtered.length && <div className="empty-state"><h3>Chưa tìm thấy công cụ phù hợp</h3><p>Thử từ khóa khác hoặc xem toàn bộ thư viện.</p><button onClick={() => { setQuery(''); setCategory('Tất cả'); }}>Xem tất cả công cụ</button></div>}
      </section><section className="contribute-banner"><div className="code-symbol" aria-hidden="true">&lt;/&gt;</div><div><p className="eyebrow">BUILT TOGETHER</p><h2>Thư viện tốt hơn khi có bạn.</h2><p>Có một ý tưởng? Dùng core có sẵn để tạo tool và đóng góp vào Open3DKit.</p></div><a href="#contribute" className="primary-link">Bắt đầu đóng góp ↗</a></section>
    </>}
    </div><footer className="portal-footer"><a href="#tools" className="brand">Open3DKit</a><span>Cùng xây dựng. Cùng sáng tạo.</span><a href={repo} target="_blank" rel="noreferrer">Mã nguồn trên GitHub ↗</a></footer>
  </div>;
}
