// Mission, vision and values with keyboard-accessible tabs.
const approachTabs=[...document.querySelectorAll('.about-tabs [role="tab"]')];
function activateApproachTab(tab){for(const item of approachTabs){const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;const panel=document.getElementById(item.getAttribute('aria-controls'));if(panel)panel.hidden=!active}}
for(const [index,tab] of approachTabs.entries()){tab.addEventListener('click',()=>activateApproachTab(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%approachTabs.length;else if(event.key==='ArrowLeft')next=(index+approachTabs.length-1)%approachTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=approachTabs.length-1;else return;event.preventDefault();activateApproachTab(approachTabs[next]);approachTabs[next].focus()})}
// Showcase filters are progressive enhancements: every concept is visible without JavaScript.
const filters=[...document.querySelectorAll('[data-filter]')];
for(const button of filters)button.addEventListener('click',()=>{const category=button.dataset.filter;for(const item of document.querySelectorAll('[data-category]'))item.hidden=category!=='all'&&item.dataset.category!==category;for(const filter of filters){const active=filter===button;filter.classList.toggle('active',active);filter.setAttribute('aria-pressed',String(active))}});
const enquiry=document.querySelector('#enquiry-form');
const plan=new URLSearchParams(location.search).get('plan');
const planRates={'Basic Boost':25000,'Advanced Growth':35000,'Premium Impact':65000};
const billingPeriods={monthly:{months:1,label:'Monthly',unit:'/month'},quarterly:{months:3,label:'Quarterly',unit:'/quarter'},annual:{months:12,label:'Annual',unit:'/year'}};
const currency=value=>'₹'+value.toLocaleString('en-IN');
if(enquiry&&plan&&Object.hasOwn(planRates,plan)){const selected=new URLSearchParams(location.search).get('billing');const period=billingPeriods[selected]||billingPeriods.monthly;enquiry.elements.service.value='Not sure — let’s discuss';enquiry.elements.message.value=`I’m interested in the ${plan} plan.\nBilling: ${period.label}\nPlan fee: ${currency(planRates[plan]*period.months)}${period.unit}\n18% GST additional. Meta Ads budget: ₹500/day, paid separately by the client.\nMinimum term: 3 months.\n\nHere is a little about my business and goals:\n\n`}
for(const card of document.querySelectorAll('[data-package]')){for(const button of card.querySelectorAll('[data-billing]'))button.addEventListener('click',()=>{const key=button.dataset.billing,period=billingPeriods[key];const monthly=Number(card.dataset.monthly);if(!period||!Number.isFinite(monthly))return;for(const choice of card.querySelectorAll('[data-billing]')){const active=choice===button;choice.classList.toggle('active',active);choice.setAttribute('aria-pressed',String(active))}card.querySelector('[data-plan-price]').textContent=currency(monthly*period.months);card.querySelector('[data-plan-period]').textContent=period.unit;card.querySelector('[data-plan-months]').textContent=period.months;card.querySelector('[data-plan-month-label]').textContent=period.months===1?'MONTH':'MONTHS';card.querySelector('[data-billing-note]').textContent=key==='monthly'?'Monthly rate · Minimum 3-month term.':`${period.months} × ${currency(monthly)} monthly rate. No discount applied.`;card.querySelector('[data-plan-enquiry]').href=`contact.html?plan=${encodeURIComponent(card.dataset.plan)}&billing=${key}`})}
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const speciality=document.querySelector('#speciality-text');
if(speciality){const words=['Social Media Marketing','Reels & Video Editing','Graphic Design','Digital Branding'];let index=0,position=0,deleting=false,timer;speciality.setAttribute('aria-label',words.join(', '));function schedule(delay){clearTimeout(timer);if(!document.hidden&&!reducedMotion.matches)timer=setTimeout(tick,delay)}function tick(){const word=words[index];position+=deleting?-1:1;speciality.textContent=word.slice(0,position);if(!deleting&&position===word.length){deleting=true;schedule(1800)}else if(deleting&&position===0){deleting=false;index=(index+1)%words.length;schedule(350)}else schedule(deleting?40:85)}function syncTyping(){clearTimeout(timer);if(reducedMotion.matches){speciality.textContent=words[0];index=0;position=0;deleting=false}else if(!document.hidden)schedule(150)}document.addEventListener('visibilitychange',syncTyping);reducedMotion.addEventListener('change',syncTyping);if(!reducedMotion.matches)speciality.textContent='';syncTyping()}
// Lightweight original 3D projection; no WebGL or external runtime needed.
const canvas=document.querySelector('#growth-canvas');
if(canvas){const context=canvas.getContext('2d');if(context){let width=0,height=0,ratio=1,angle=.3,animation=0,visible=true,lastTime=0;function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);context.setTransform(ratio,0,0,ratio,0,0);draw()}
function project(x,y,z){const c=Math.cos(angle),s=Math.sin(angle),nx=x*c-z*s,nz=x*s+z*c,ty=y*.94-nz*.34,tz=y*.34+nz*.94;const perspective=3.4/(3.4-tz*.35);const radius=Math.min(width,height)*.37;return [width/2+nx*radius*perspective,height/2+ty*radius*perspective,tz]}
function draw(){if(!width||!height)return;context.clearRect(0,0,width,height);const glow=context.createRadialGradient(width/2,height/2,0,width/2,height/2,Math.min(width,height)*.46);glow.addColorStop(0,'rgba(49,92,76,0.045)');glow.addColorStop(1,'rgba(49,92,76,0)');context.fillStyle=glow;context.fillRect(0,0,width,height);for(let lat=-7;lat<=7;lat++){const phi=lat*Math.PI/16;for(let lon=0;lon<64;lon++){const theta=lon*Math.PI/32;const [x,y,z]=project(Math.cos(phi)*Math.cos(theta),Math.sin(phi),Math.cos(phi)*Math.sin(theta));const alpha=(z+1.5)/3.2;context.fillStyle=`rgba(49,92,76,${Math.max(.08,alpha*.6)})`;context.beginPath();context.arc(x,y,z>0?1.35:.7,0,Math.PI*2);context.fill();if(lon<63){const next=project(Math.cos(phi)*Math.cos(theta+Math.PI/32),Math.sin(phi),Math.cos(phi)*Math.sin(theta+Math.PI/32));context.strokeStyle=`rgba(49,92,76,${Math.max(.02,alpha*.13)})`;context.lineWidth=.7;context.beginPath();context.moveTo(x,y);context.lineTo(next[0],next[1]);context.stroke()}}}for(let ring=0;ring<3;ring++){context.beginPath();for(let i=0;i<=100;i++){const t=i*Math.PI/50;const k=ring*Math.PI/3;const [x,y]=project(Math.cos(t)*1.13,Math.sin(t)*Math.sin(k)*1.13,Math.sin(t)*Math.cos(k)*1.13);i?context.lineTo(x,y):context.moveTo(x,y)}context.strokeStyle='rgba(49,92,76,0.16)';context.lineWidth=.7;context.stroke()}}
function frame(time){animation=0;if(!visible||document.hidden||reducedMotion.matches)return;if(time-lastTime>33){angle+=.003;draw();lastTime=time}animation=requestAnimationFrame(frame)}
function updateAnimation(){if(animation)cancelAnimationFrame(animation);animation=0;if(visible&&!document.hidden&&!reducedMotion.matches)animation=requestAnimationFrame(frame);else draw()}
new ResizeObserver(resize).observe(canvas);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;updateAnimation()}).observe(canvas);document.addEventListener('visibilitychange',updateAnimation);reducedMotion.addEventListener('change',updateAnimation);resize();updateAnimation()}}


for(const video of document.querySelectorAll('.ab-timeline-video')){
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!reduced.matches&&!document.hidden)video.play().catch(()=>{});else video.pause()},{threshold:.3}).observe(video);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause()});
}


// Mobile carousel controls follow the same card spacing as swipe navigation.
for(const carousel of document.querySelectorAll('.gv-showcase')){
 const track=carousel.querySelector('.gv-reels');
 const previous=carousel.querySelector('.gv-reel-prev');
 const next=carousel.querySelector('.gv-reel-next');
 if(!track||!previous||!next)continue;
 const update=()=>{previous.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2};
 const move=direction=>{const card=track.querySelector('.gv-reel');if(!card)return;const step=card.getBoundingClientRect().width+(parseFloat(getComputedStyle(track).columnGap)||16);track.scrollBy({left:direction*step,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
 previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 track.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(track);update();
}

// Reveal each home FAQ as it enters the viewport, keeping content available without JS.
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const faqObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');faqObserver.unobserve(entry.target)}}},{threshold:.12,rootMargin:'0px 0px -15px 0px'});
 for(const row of document.querySelectorAll('.agency-faq .faq details')){row.classList.add('faq-enter');faqObserver.observe(row)}
}

// Reveal home content once when scrolled into view; no layout changes or card rotation overrides.
if(document.body.dataset.page==='index.html'&&'IntersectionObserver' in window){
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 if(!preference.matches){
  const targets=document.querySelectorAll('.agency-stats, .agency-services>.agency-section-head, .marketing-service-grid, .all-services-action, .home-capabilities .ab-section-head, .home-capabilities .ab-feature, .founder-copy, #our-story>.founder-visual, .agency-method .agency-section-head, .agency-plans>.agency-section-head, .agency-plans .fixed-package, #creative-connection>div, .agency-faq>.agency-section-head, .agency-contact-layout>div, main>.agency-closing');
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target)}}},{threshold:0,rootMargin:'0px 0px -25px 0px'});
  for(const element of targets){
   if(element.getBoundingClientRect().top<innerHeight){continue}
   element.classList.add('home-scroll-reveal');observer.observe(element);
  }
  const revealAll=()=>{observer.disconnect();for(const element of targets)element.classList.add('is-revealed')};
  preference.addEventListener('change',revealAll,{once:true});
  document.addEventListener('focusin',event=>{const element=event.target.closest('.home-scroll-reveal');if(element){element.classList.add('is-revealed');observer.unobserve(element)}});
 }
}

const backTop=document.querySelector('.back-to-top');
if(backTop){
 const ring=backTop.querySelector('.back-top-progress');let queued=false;
 const update=()=>{queued=false;const distance=document.documentElement.scrollHeight-innerHeight;const progress=distance>0?Math.min(1,Math.max(0,scrollY/distance)):0;backTop.hidden=scrollY<250;ring.style.strokeDashoffset=String(100-progress*100)};
 const requestUpdate=()=>{if(!queued){queued=true;requestAnimationFrame(update)}};
 addEventListener('scroll',requestUpdate,{passive:true});addEventListener('resize',requestUpdate);addEventListener('load',requestUpdate);
 new ResizeObserver(requestUpdate).observe(document.body);
 backTop.addEventListener('click',()=>{window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});document.querySelector('.skip')?.focus({preventScroll:true})});
 update();
}

// One ordered sequence: number + text, then the line, then the following step.
for(const process of document.querySelectorAll('.agency-process')){
 if(!('IntersectionObserver' in window))continue;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduced.matches)continue;
 const steps=[...process.querySelectorAll('article')];const timers=[];
 process.classList.add('process-sequence');
 const finish=()=>{timers.forEach(clearTimeout);steps.forEach(step=>step.classList.add('step-visible','line-visible'))};
 const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)return;observer.disconnect();steps.forEach((step,i)=>{
  timers.push(setTimeout(()=>step.classList.add('step-visible'),i*1000));
  if(i<steps.length-1)timers.push(setTimeout(()=>step.classList.add('line-visible'),i*1000+480));
 })},{threshold:.12});observer.observe(process);
 reduced.addEventListener('change',()=>{observer.disconnect();finish()},{once:true});
 process.addEventListener('focusin',finish);
}

// Observe the stationary layout, then animate the form from the right.
const slidingContact=document.querySelector('#enquiry-form');
if(slidingContact&&'IntersectionObserver' in window&&Element.prototype.animate){
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 if(!preference.matches){
  let animation,started=false;
  const layout=slidingContact.closest('.contact-grid,.agency-contact-layout')||slidingContact;
  const play=()=>{
   if(started)return;started=true;
   const offset=Math.min(220,innerWidth*.4);
   animation=slidingContact.animate([
    {opacity:0,transform:'translateX('+offset+'px)'},
    {opacity:1,transform:'translateX(0)'}
   ],{duration:1250,delay:180,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'});
   animation.onfinish=()=>animation.cancel();
  };
  const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){observer.disconnect();play()}},{threshold:0,rootMargin:'0px 0px -40px 0px'});
  observer.observe(layout);
  const finish=()=>{observer.disconnect();started=true;if(animation)animation.cancel()};
  slidingContact.addEventListener('focusin',finish);
  preference.addEventListener('change',finish,{once:true});
 }
}

// Reveal each terms card once as it enters view.
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const cards=[...document.querySelectorAll('.terms-card')];
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}},{threshold:0,rootMargin:'0px 0px -20px 0px'});
 for(const card of cards){card.classList.add('terms-reveal');observer.observe(card);card.addEventListener('focusin',()=>{card.classList.add('is-visible');observer.unobserve(card)})}
 matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>{observer.disconnect();cards.forEach(card=>card.classList.add('is-visible'))},{once:true});
}

/* Draggable service carousel */
(()=>{
 const track=document.querySelector('.showcase-cards'); if(!track)return;
 const cards=[...track.querySelectorAll('.showcase-card')]; let active=2, startX=null, moved=false;
 track.setAttribute('aria-label','Service carousel. Drag or use the buttons to browse services.');
 const controls=document.createElement('div'); controls.className='showcase-controls';
 controls.innerHTML='<button type="button" aria-label="Previous service">&#8592;</button><span aria-live="polite"></span><button type="button" aria-label="Next service">&#8594;</button>';
 track.after(controls); const label=controls.querySelector('span');
 function render(){cards.forEach((card,i)=>{let offset=(i-active+cards.length)%cards.length;if(offset>2)offset-=cards.length;card.style.setProperty('--offset',offset);card.style.setProperty('--distance',Math.abs(offset));card.style.zIndex=String(5-Math.abs(offset));card.classList.toggle('is-active',offset===0)});label.textContent=cards[active].querySelector('h3').textContent.trim().replace(/\s+/g,' ')}
 function go(step){active=(active+step+cards.length)%cards.length;render()}
 controls.children[0].addEventListener('click',()=>go(-1));controls.children[2].addEventListener('click',()=>go(1));
 track.addEventListener('pointerdown',e=>{startX=e.clientX;moved=false});
 track.addEventListener('pointermove',e=>{if(startX!==null&&Math.abs(e.clientX-startX)>12)moved=true});
 window.addEventListener('pointerup',e=>{if(startX===null)return;const delta=e.clientX-startX;startX=null;if(Math.abs(delta)>35){go(delta<0?1:-1);setTimeout(()=>{moved=false},100)}});
 cards.forEach((card,i)=>card.addEventListener('click',e=>{if(moved){e.preventDefault();return}if(i!==active){e.preventDefault();active=i;render()}}));
 render();
})();

/* Count About page statistics when they enter view. */
(()=>{
 const section=document.querySelector('.ab-stats');
 if(!section||window.matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
 const values=[...section.querySelectorAll('strong')];
 const observer=new IntersectionObserver(entries=>{
  if(!entries.some(entry=>entry.isIntersecting))return;
  observer.disconnect();
  values.forEach(el=>{
   const final=el.textContent.trim(), match=final.match(/^(\d+)(.*)$/); if(!match)return;
   const target=Number(match[1]), suffix=match[2]; el.setAttribute('aria-label',final);
   let started;
   function tick(time){if(started===undefined)started=time;const progress=Math.min((time-started)/1400,1);const eased=1-Math.pow(1-progress,3);el.textContent=Math.round(target*eased)+suffix;if(progress<1)requestAnimationFrame(tick);else el.textContent=final}
   requestAnimationFrame(tick);
  });
 },{threshold:.3});
 observer.observe(section);
})();
/* Count homepage statistics once as they enter the viewport. */
(()=>{
 const section=document.querySelector('.agency-stats');
 if(!section||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
 const observer=new IntersectionObserver(entries=>{
  if(!entries.some(entry=>entry.isIntersecting))return;
  observer.disconnect();
  section.querySelectorAll('.agency-stat > strong').forEach(el=>{
   const final=el.textContent.trim(), match=final.match(/^(\d+)(\+|%)$/);if(!match)return;
   const target=Number(match[1]), suffix=match[2];el.setAttribute('aria-label',final);let start;
   function tick(time){if(start===undefined)start=time;const p=Math.min((time-start)/1400,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(tick);else el.textContent=final}
   requestAnimationFrame(tick);
  });
 },{threshold:.3});observer.observe(section);
})();
