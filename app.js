const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeNavigation(restoreFocus=false){const wasOpen=toggle?.getAttribute('aria-expanded')==='true';toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open navigation');nav?.classList.remove('open');if(wasOpen&&restoreFocus)toggle?.focus()}
toggle?.setAttribute('aria-label','Open navigation');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav?.classList.toggle('open',open)});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeNavigation()});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeNavigation()});
matchMedia('(min-width:1025px)').addEventListener('change',()=>closeNavigation());
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNavigation(true)});
document.querySelector('[data-top]')?.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});
const form=document.querySelector('#enquiry-form');
if(form){
  const service=new URLSearchParams(location.search).get('service');
  if(service&&[...form.elements.service.options].some(option=>option.value===service))form.elements.service.value=service;
  form.addEventListener('submit',event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));
    const body=`Hello Kreox Growth Solution, I would like to make an enquiry.\n\nName: ${data.name}\nEmail: ${data.email}\nBusiness: ${data.business||'Not provided'}\nPhone: ${data.phone||'Not provided'}\nService: ${data.service}\n\nProject details: ${data.message}`;
    const url='https://wa.me/918734839513?text='+encodeURIComponent(body);
    document.querySelector('#form-fallback')?.remove();
    const status=document.querySelector('#form-status');status.textContent='WhatsApp will open with your enquiry. Review the message and press Send there.';
    const link=document.createElement('a');link.id='form-fallback';link.className='outline-button';link.textContent='Open WhatsApp';link.href=url;link.target='_blank';link.rel='noopener noreferrer';status.after(link);
    window.open(url,'_blank','noopener,noreferrer');
  });
}
