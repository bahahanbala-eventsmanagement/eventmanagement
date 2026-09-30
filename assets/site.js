
function switchLangNoop(){} // language now via real URLs
const header = document.getElementById('siteHeader');
if(header){ window.addEventListener('scroll', ()=>{ header.classList.toggle('scrolled', window.scrollY > 40); }); }
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if(navToggle){
  navToggle.addEventListener('click', ()=> navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> navLinks.classList.remove('open')));
}
function openLightbox(src){ document.getElementById('lightbox').style.display='flex'; document.getElementById('lightbox-img').src=src; }
function closeLightbox(){ document.getElementById('lightbox').style.display='none'; }
const lb = document.getElementById('lightbox');
if(lb){
  lb.addEventListener('click', (e)=>{ if(e.target.id==='lightbox') closeLightbox(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeLightbox(); });
}
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-block').forEach(block=>{
      block.classList.toggle('hide', !(filter==='all' || block.dataset.category===filter));
    });
  });
});
function animateStats(){
  document.querySelectorAll('.stat-number').forEach(stat=>{
    if(stat.dataset.done==='true') return; stat.dataset.done='true';
    const target=parseInt(stat.getAttribute('data-target'));
    if(isNaN(target)||target===0) return;
    let count=0; const speed=Math.max(1,target/60);
    const upd=()=>{ count+=speed; if(count<target){ stat.innerText=Math.floor(count); requestAnimationFrame(upd);} else { stat.innerText=target; } };
    upd();
  });
}
const statsSection = document.querySelector('.stats-grid');
if(statsSection){
  const so = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ animateStats(); so.disconnect(); } }); }, {threshold:.35});
  so.observe(statsSection);
}
const ro = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); ro.unobserve(e.target);} }); }, {threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
