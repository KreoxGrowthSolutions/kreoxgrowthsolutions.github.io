import {uiIcon} from './icons.mjs';
// Owner-supplied video showcase.
export const serviceVideos = [
  {title:'Silver',category:'VIDEO SHOWCASE',src:'assets/videos/silver.mp4'},
  {title:'AI Tool',category:'VIDEO SHOWCASE',src:'assets/videos/ai-tool.mp4'},
  {title:'DRHP Video',category:'VIDEO SHOWCASE',src:'assets/videos/drhp-video.mp4'},
  {"title":"Creative Reel","category":"VIDEO SHOWCASE","src":"assets/videos/whatsapp-showcase-web.mp4"},
  {"title":"New Year Inspiration","category":"VIDEO SHOWCASE","src":"assets/videos/new-year-inspiration.mp4"},
  {"title":"Creative Showcase","category":"VIDEO SHOWCASE","src":"assets/videos/1025-web.mp4"},
  {"title":"Apex Orthopedic Reel","category":"VIDEO SHOWCASE","src":"assets/videos/apex-orthopedic-reel-3-web.mp4"},
  {"title":"Sahyog Physio Fit 3","category":"VIDEO SHOWCASE","src":"assets/videos/sahyog-physio-fit-3-web.mp4"},
  {"title":"Sahyog Physio Fit 2","category":"VIDEO SHOWCASE","src":"assets/videos/sahyog-physio-fit-2-web.mp4"},
  {"title":"Dr. Shreya Physio Reel","category":"VIDEO SHOWCASE","src":"assets/videos/dr-shreya-physio-reel-web.mp4"},
  {"title":"Curetherapist Reel","category":"VIDEO SHOWCASE","src":"assets/videos/curetherapist-reel-6-web.mp4"},
  {"title":"Firstcry Reel 7","category":"VIDEO SHOWCASE","src":"assets/videos/firstcry-reel-7.mp4"},
  {"title":"Apex Orthopedic Reel 4","category":"VIDEO SHOWCASE","src":"assets/videos/apex-orthopedic-reel-4.mp4"},
  {"title":"Blackjack Blue","category":"VIDEO SHOWCASE","src":"assets/videos/blackjack-blue.mp4"},
  {"title":"Blackjack Dialogue","category":"VIDEO SHOWCASE","src":"assets/videos/blackjack-dialogue.mp4"},
  {"title":"Domino Video","category":"VIDEO SHOWCASE","src":"assets/videos/domino-comp-11.mp4"},
  {"title":"Domino Creative","category":"VIDEO SHOWCASE","src":"assets/videos/domino-comp-4.mp4"},
  {"title":"Raveon Academy Reel 6","category":"VIDEO SHOWCASE","src":"assets/videos/raveon-reel-6.mp4"},
  {"title":"Ludocash","category":"VIDEO SHOWCASE","src":"assets/videos/ludocash.mp4"},
  {"title":"Ludocash Creative","category":"VIDEO SHOWCASE","src":"assets/videos/ludocash-1009.mp4"},
  {"title":"Meta Ads Video 05","category":"VIDEO SHOWCASE","src":"assets/videos/meta-ads-video-05.mp4"},
  {"title":"Jewellery AI Design","category":"VIDEO SHOWCASE","src":"assets/videos/jewellery-ai-design.mp4"},
  {"title":"Real Estate Project 04","category":"VIDEO SHOWCASE","src":"assets/videos/real-estate-project-04.mp4"},
  {"title":"Real Estate Project 01","category":"VIDEO SHOWCASE","src":"assets/videos/real-estate-project-01.mp4"},
  {"title":"Podcast Edit 02","category":"VIDEO SHOWCASE","src":"assets/videos/podcast-edit-02.mp4"},
  {"title":"MG 03","category":"VIDEO SHOWCASE","src":"assets/videos/mg-03.mp4"},
  {"title":"MG 02","category":"VIDEO SHOWCASE","src":"assets/videos/mg-02.mp4"},
  {"title":"Meta Ads Video 04","category":"VIDEO SHOWCASE","src":"assets/videos/meta-ads-video-04.mp4"},
  {"title":"Meta Ads Video 01","category":"VIDEO SHOWCASE","src":"assets/videos/meta-ads-video-01.mp4"}
];
export function renderServices(services){return `<div class="gv-services"><div class="wrap">
<section class="gv-services-intro"><div class="gv-kicker">WHAT WE DO</div><h1>MARKETING THAT<br><em>BUILDS YOUR BRAND.</em></h1><p>Creative design, engaging content, and focused digital marketing. Kreox Growth Solution brings your brand’s story to life with services shaped around your audience and business goals.</p></section>
<section class="gv-showcase" aria-labelledby="gv-showcase-title"><div class="gv-showcase-copy"><span class="gv-badge">🏆 CLIENT SUCCESS STORIES</span><h2 id="gv-showcase-title">Real Client Reviews. Real Business Growth.</h2><p>Businesses choose Kreox Growth Solution for one reason — performance. Hear genuine testimonials from clients who trusted us with their brand growth.</p></div><div class="gv-reels gv-reels-three">${serviceVideos.map((v,i)=>`<article class="gv-reel"><div class="gv-reel-media">${v.src?`<video controls playsinline preload="metadata" poster="${v.src.replace(/\.mp4$/,'.jpg')}" aria-label="${v.title}"><source src="${v.src}" type="video/mp4"></video>`:`<div class="gv-video-placeholder"><span class="gv-reel-category">${v.category}</span><span class="gv-reel-mark" aria-hidden="true">${uiIcon('video')}</span><strong>${v.title}</strong><span class="gv-coming-soon">Video coming soon</span><span class="gv-reel-index" aria-hidden="true">0${i+1} / KREOX</span></div>`}</div></article>`).join('')}</div></section>


</div></div>`}
