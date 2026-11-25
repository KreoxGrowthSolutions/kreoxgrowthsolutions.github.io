// Letter entrances inspired by Webflowtips animations 1 and 3.
// Native Web Animations avoids an additional runtime dependency.
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduced.matches||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
 const running=new Set();
 const selector='main h1,main h2,main h3,main p';
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(!entry.isIntersecting)continue;
   const el=entry.target;observer.unobserve(el);
   const heading=/^H[123]$/.test(el.tagName);
   const letters=[...el.querySelectorAll('.kreox-letter')];
   const parentDelay=el.closest('.home-scroll-reveal')?200:0;
   for(let i=0;i<letters.length;i++){
    const letter=letters[i];
    const anim=letter.animate([
     {opacity:0,transform:heading?'translateY(100%)':'translateX(40px)'},
     {opacity:1,transform:'translate(0,0)'}
    ],{duration:heading?1100:850,delay:parentDelay+Math.min(i*(heading?25:12),heading?650:420),easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
    running.add(anim);anim.onfinish=()=>{anim.cancel();running.delete(anim)};
   }
  }
 },{threshold:0,rootMargin:'0px 0px -15px 0px'});
 for(const el of document.querySelectorAll(selector)){
  if(el.closest('form,video,summary,[aria-live],.agency-process')||el.querySelector('a,button,input,select,textarea,[aria-live],#speciality-text')||el.id==='form-status'||!el.textContent.trim())continue;
  const original=el.textContent;
  // Preserve one complete accessible reading, including existing emphasis and line breaks visually.
  const visual=document.createElement('span');visual.className='kreox-animated-copy';visual.setAttribute('aria-hidden','true');
  while(el.firstChild)visual.append(el.firstChild);
  const reader=document.createTreeWalker(visual,NodeFilter.SHOW_TEXT);const nodes=[];
  while(reader.nextNode())nodes.push(reader.currentNode);
  for(const node of nodes){
   const fragment=document.createDocumentFragment();
   for(const token of node.textContent.split(/(\s+)/)){
    if(!token)continue;
    if(/^\s+$/.test(token)){fragment.append(document.createTextNode(token));continue}
    const word=document.createElement('span');word.className='kreox-word';
    for(const char of Array.from(token)){const span=document.createElement('span');span.className='kreox-letter';span.textContent=char;word.append(span)}
    fragment.append(word);
   }
   node.replaceWith(fragment);
  }
  const accessible=document.createElement('span');accessible.className='kreox-text-accessible';accessible.textContent=original;
  el.append(accessible,visual);observer.observe(el);
 }
 reduced.addEventListener('change',()=>{observer.disconnect();for(const anim of running)anim.cancel();running.clear()},{once:true});
})();
