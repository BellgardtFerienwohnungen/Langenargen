// Smooth scroll for anchor links on older browsers
// Smooth scroll for anchor links on older browsers
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth'});
    }
  });
});


// === Simple Lightbox für .gallery ===
(function(){
  const thumbs = Array.from(document.querySelectorAll('.gallery img'));
  if(!thumbs.length) return;

  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('.lb-img');
  const btnClose = lb.querySelector('.lb-close');
  const btnPrev = lb.querySelector('.lb-prev');
  const btnNext = lb.querySelector('.lb-next');

  let index = 0;

  function open(i){
    index = i;
    const src = thumbs[index].getAttribute('src');
    const alt = thumbs[index].getAttribute('alt') || '';
    lbImg.src = src;
    lbImg.alt = alt;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
    lbImg.alt = '';
  }

  function prev(){ open((index - 1 + thumbs.length) % thumbs.length); }
  function next(){ open((index + 1) % thumbs.length); }

  thumbs.forEach((img, i)=>{
    img.addEventListener('click', ()=>open(i));
    img.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') open(i); });
    img.setAttribute('tabindex','0'); // Tastaturzugänglichkeit
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  lb.addEventListener('click', (e)=>{
    // Klick außerhalb des Bilds schließt die Lightbox
    if(e.target === lb) close();
  });

  // Tastatursteuerung
  document.addEventListener('keydown', (e)=>{
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });
})();
