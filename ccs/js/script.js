/* script.js — interactions for MKPS site */
window.MKPS = window.MKPS || {}
const MKPS = window.MKPS

const STORAGE_KEY = 'MKPS_HOME_v1'
const DEFAULT = {
  notices:[{id:'n1',title:'Parent-Teacher Meeting',date:'2025-11-28',time:'4:00 PM',body:'All parents are requested to attend.'}],
  events:[{id:'e1',title:'Annual Sports Day',date:'2025-12-06'}],
  gallery:['https://i.postimg.cc/Zqm9DSvt/erasebg-transformed.png']
}

function loadStore(){ try{ const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT)) }catch(e){ return JSON.parse(JSON.stringify(DEFAULT)) }}
function saveStore(s){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) }
MKPS.store = loadStore()

// Render helpers
function renderGallery(){ const g = MKPS.store.gallery || []; const el = document.getElementById('galleryGrid'); if(!el) return; el.innerHTML = g.map(src=>`<img src="${src}" loading="lazy" alt="gallery"/>`).join(''); document.querySelectorAll('#galleryGrid img').forEach(img=>img.addEventListener('click', ()=>openModal(`<img src='${img.src}' style='width:100%;height:auto;border-radius:8px'/>`))) }

function renderNews(){ const n = MKPS.store.notices || []; const list = document.getElementById('newsList'); const ticker = document.getElementById('newsTicker'); if(ticker) ticker.innerText = n.map(i=>i.title+' • ').join('') + n.map(i=>i.title+' • ').join(''); if(list) list.innerHTML = n.map(i=>`<div class='card'><h4>${i.title}</h4><p class='muted'>${i.date} ${i.time? '|' + i.time : ''}</p><p>${i.body||''}</p></div>`).join('') }

function animateCounters(){ document.querySelectorAll('.counter').forEach(c=>{ const target = +c.dataset.target || 0; let start = 0; const step = Math.max(1, Math.floor(target/80)); const t = setInterval(()=>{ start += step; if(start>=target){ c.textContent = target; clearInterval(t); } else c.textContent = start }, 12) }) }

// Modal
function openModal(html){ const modal = document.getElementById('modal'); const body = document.getElementById('modalCard'); if(!modal || !body) return; body.innerHTML = html; modal.classList.add('open'); }
function closeModal(){ const modal = document.getElementById('modal'); if(modal) modal.classList.remove('open'); }
if(document.getElementById('modal')) document.getElementById('modal').addEventListener('click', e=>{ if(e.target.id==='modal') closeModal() })

// Contact form
const contactForm = document.getElementById('contactForm')
if(contactForm) contactForm.addEventListener('submit', function(e){ e.preventDefault(); const name = document.getElementById('cname').value.trim(); const info = document.getElementById('cinfo').value.trim(); const msg = document.getElementById('cmessage').value.trim(); if(!name || !info){ alert('Please provide name and contact'); return } const enquiries = JSON.parse(localStorage.getItem('MKPS_ENQUIRIES')||'[]'); enquiries.unshift({id:'q'+Math.random().toString(36).slice(2,8),name,info,msg,at:new Date().toISOString()}); localStorage.setItem('MKPS_ENQUIRIES', JSON.stringify(enquiries)); alert('Thank you — your enquiry was received (local demo).'); this.reset(); })

// Floating Admin button -> password -> open admin.html
const adminFab = document.getElementById('adminFloat')
if(adminFab){ adminFab.addEventListener('click', ()=>{ const pwd = prompt('Enter admin password:'); if(!pwd) return; if(MKPS.checkAdminPwd(pwd)){ // open admin.html in new tab
    const adminUrl = 'admin.html'; window.open(adminUrl, '_blank'); } else alert('Access Denied') }) }

// Admin password check (exposed to admin.html as well)
MKPS.checkAdminPwd = function(pwd){ return String(pwd) === 'Abutalha' }

// Export / Import helpers (owner use)
MKPS.exportData = function(){ const blob = new Blob([JSON.stringify(MKPS.store,null,2)], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'mkps-home-data.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }
MKPS.importData = function(){ const input = document.createElement('input'); input.type='file'; input.accept='.json'; input.onchange = ()=>{ const f = input.files[0]; if(!f) return; const r = new FileReader(); r.onload = ()=>{ try{ const parsed = JSON.parse(r.result); MKPS.store = parsed; saveStore(parsed); renderAll(); alert('Data imported (local)') }catch(e){ alert('Invalid JSON') } }; r.readAsText(f); }; input.click(); }

// Render all
function renderAll(){ renderGallery(); renderNews(); animateCounters(); }

document.addEventListener('DOMContentLoaded', ()=>{ renderAll(); // wire hero buttons
  const openNotices = document.getElementById('openNotices'); if(openNotices) openNotices.addEventListener('click', ()=>document.querySelector('a[href="#news"]').scrollIntoView({behavior:'smooth'}));
  // to top button
  const toTop = document.getElementById('toTop'); window.addEventListener('scroll', ()=>{ if(window.scrollY>300) toTop && toTop.classList.add('show'); else toTop && toTop.classList.remove('show') })
});

// expose to window
window.MKPS = MKPS
