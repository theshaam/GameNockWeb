(function(){
  // Backend API base URL (Node/Express app on cPanel — see backend/README.md).
  // Empty string = same-origin (only use that if the API is served from this
  // same domain, e.g. gamenock.com/api/...). Set to e.g. 'https://api.gamenock.com'
  // once the backend is deployed.
  const API_BASE='';
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const motion=matchMedia('(prefers-reduced-motion:no-preference)').matches;
  const fine=matchMedia('(pointer:fine)').matches;
  let processProgress=()=>{};
  // reveal state: elements animate in when they enter the screen and play the reverse when they leave
  let gliding=false, scrollDir=1, lastSY=scrollY;
  addEventListener('scroll',()=>{const y=scrollY; if(Math.abs(y-lastSY)>2){scrollDir=y>lastSY?1:-1; lastSY=y}},{passive:true});
  // testimonial tiles follow the scroll direction: enter from the side you scroll towards, leave the way you came
  const dirAware=(el,on)=>{ if(!el.classList.contains('vstage')) return; el.style.setProperty('--dy', ((on?1:-1)*scrollDir*70)+'vh') };
  const setIn=(el,on)=>{ if(on!==el.classList.contains('in')) dirAware(el,on); if(on){ if(!el.classList.contains('in')){el.classList.remove('out'); el.classList.add('in')} }
    else if(el.classList.contains('in')){ el.classList.remove('in'); if(el.id==='stage'||el.classList.contains('vstage')) el.classList.add('out') } };
  $('#yr').textContent=new Date().getFullYear();

  // Loader
  const hideLoader=()=>$('#loader').classList.add('out');
  if(document.readyState!=='loading') setTimeout(hideLoader,150); else addEventListener('DOMContentLoaded',()=>setTimeout(hideLoader,150)); setTimeout(hideLoader,700);

  // Reveal on scroll (with safety fallback so nothing stays hidden)
  // tag more things so they fly in from outside as you scroll down
  if(motion){
    const tag=(sel,kind,stag)=>{const groups=new Map(); document.querySelectorAll(sel).forEach(el=>{if(el.closest('.hero,footer,.pg-hero'))return; if(el.hasAttribute('data-rv')&&!stag)return;
      el.setAttribute('data-rv',kind==='alt'?['left','pop','right'][(groups.get(el.parentElement)||0)%3]:kind==='alt2'?['left','right'][(groups.get(el.parentElement)||0)%2]:kind);
      const i=groups.get(el.parentElement)||0; groups.set(el.parentElement,i+1); if(stag) el.style.transitionDelay=Math.min(i*stag*.35,.18).toFixed(2)+'s'})};
    tag('main section .eyebrow','left',0); tag('main section h2','',0); tag('main section .lede','',0);
    // home: every section enters differently
    tag('.stat','left',.14);                                   // stats ribbon: items slide in from the left
    tag('.sec-head.center','up',.001); tag('.flow-ctrl','up',.001);
    tag('.spot-head > *','alt2',.12); tag('.spot-stats > div','pop',.1); tag('.sp-tab','left',.08); tag('.sp-stage','zoom',.001); tag('.spot-foot','up',.001);
    tag('.vt-intro','left',.001); tag('.vt-stats > div','pop',.12); tag('.vstage','stage',.001);
    tag('.models .intro','left',.001); tag('.model','flip',.16);
    tag('.orbit-wrap > div:first-child','spin',.001); tag('.orbit-wrap > div:last-child','right',.001);
    tag('.exp-grid .card','alt',.1); tag('.process-head','up',.001); tag('.process-art','zoom',.001); tag('.steps li','pop',.1); tag('.step-detail','up',0);
    tag('.tech .marquee','left',.001); tag('.ins-head','up',.001); tag('.ins-grid .card','flip',.14);
    tag('.ct-info','left',.001); tag('.ct-form','right',.001);
    tag('.checks li','left',.1); tag('.score-row > div','pop',.12); tag('.who','right',0); tag('.orbit-note','right',0);
    // inner pages
    tag('.sp .sec-head','up',.001); tag('.g3 > *','alt',.1); tag('.g4 > *','pop',.08); tag('.g2 > :first-child','left',.001); tag('.g2 > :last-child','right',.001);
    tag('.ksteps li','pop',.08); tag('.faq details','up',.07); tag('.fchips','left',.001); tag('.art-banner','zoom',.001); tag('article.prose > *','up',.02);
    // ----- text: every heading gets its own entrance, paragraphs and labels alternate -----
    const splitWords=el=>{let i=0; const walk=n=>[...n.childNodes].forEach(c=>{ if(c.nodeType===3){ const f=document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(t=>{ if(!t) return; if(/^\s+$/.test(t)) f.appendChild(document.createTextNode(t)); else {const w=document.createElement('span'); w.className='w'; w.style.setProperty('--i',i++); w.textContent=t; f.appendChild(w)} }); c.replaceWith(f)}
      else if(c.nodeType===1&&c.tagName!=='BR') walk(c)}); walk(el)};
    const textFx=(el,kind)=>{ if(!el||el.dataset.tx||el.closest('.hero,.pg-hero')) return; el.dataset.tx=kind; el.setAttribute('data-rv','text');
      if(kind!=='wipe'){ splitWords(el); el.querySelectorAll('.grad').forEach(g=>g.classList.add('split')) }};
    const HOME={'#what':'rise','#work':'pop','#why':'wipe','#company':'blur','#models':'rise','#capabilities':'slide','#expertise':'pop','#process':'drop','#insights':'blur','#contact':'pop'};
    Object.entries(HOME).forEach(([q,k])=>textFx(document.querySelector(q+' h2'),k));
    const CYCLE=['pop','blur','rise','slide','wipe','drop']; let ci=0;
    document.querySelectorAll('main h2, .ct-form-title').forEach(h=>{ if(!h.dataset.tx) textFx(h,CYCLE[ci++%CYCLE.length]) });
    let li=0; document.querySelectorAll('main section .lede, main .vt-intro > p, main .spot-head p').forEach(el=>{ if(el.closest('.hero,.pg-hero')) return; el.setAttribute('data-rv',li++%2?'blurin':'up'); el.style.transitionDelay='.15s'});
    let ei=0; document.querySelectorAll('main section .eyebrow').forEach(el=>{ if(el.closest('.hero,.pg-hero')) return; el.setAttribute('data-rv',ei++%2?'spread':'left')});
  }
  if('IntersectionObserver' in window && motion){
    document.documentElement.classList.add('js');
    const rio=new IntersectionObserver(es=>es.forEach(e=>{ if(gliding) return; if(e.isIntersecting&&e.intersectionRatio>=.1) setIn(e.target,true); else if(!e.isIntersecting) setIn(e.target,false) }),{threshold:[0,.1],rootMargin:'0px 0px -6% 0px'});
    $$('[data-rv]').forEach(el=>rio.observe(el));
    // anything stuck below the fold at the very end of the page still gets revealed
    addEventListener('scroll',()=>{if(innerHeight+scrollY>=document.documentElement.scrollHeight-4) $$('[data-rv]:not(.in)').forEach(el=>el.classList.add('in'))},{passive:true});
  }


  // ===== Hero plays its intro in reverse when you scroll away, and again when you come back =====
  function heroWatch(){ const hero=document.querySelector('.hero,.pg-hero'); if(!hero||!('IntersectionObserver' in window)) return;
    const chars=[...hero.querySelectorAll('h1 .ch')]; let out=false, tt=[];
    const retype=()=>{ tt.forEach(clearTimeout); tt=[]; chars.forEach(c=>c.classList.remove('on')); chars.forEach((c,i)=>tt.push(setTimeout(()=>c.classList.add('on'),120+i*7))) };
    new IntersectionObserver(es=>es.forEach(e=>{ const vis=e.intersectionRatio>=.45;
      if(!vis&&!out){ out=true; hero.classList.add('hero-out') }
      else if(vis&&out){ out=false; hero.classList.remove('hero-out'); retype() } }),{threshold:[0,.45,1]}).observe(hero) }
  // ===== Intro: typewriter headline, then the rest of the hero slides in =====
  (()=>{const h1=$('.hero h1')||$('.pg-hero h1'); if(!h1) return; const hero=h1.closest('.hero,.pg-hero');
    const after=[...hero.querySelectorAll('.lede,.hero-ctas,.hero-trust,.ctas,.tags,.pg-hero .case-hero > div > p, .pg-hero p')].filter((e,i,a)=>a.indexOf(e)===i&&!h1.contains(e));
    if(!motion){return}
    const root=document.documentElement; root.classList.add('intro','hero-done'); h1.classList.add('typing'); h1.setAttribute('aria-label',h1.textContent.replace(/\s+/g,' ').trim());
    const chars=[]; const walk=n=>[...n.childNodes].forEach(c=>{ if(c.nodeType===3){ if(!c.textContent.trim()&&!/ /.test(c.textContent)) return; const f=document.createDocumentFragment();
        [...c.textContent].forEach(ch=>{const sp=document.createElement('span'); sp.className='ch'; sp.setAttribute('aria-hidden','true'); sp.textContent=ch; f.appendChild(sp); chars.push(sp)}); c.replaceWith(f)} else walk(c)});
    walk(h1);
    // start in the "scrolled away" pose, then play the same slide-in + quick retype used when coming back
    root.classList.add('snap'); hero.classList.add('hero-out'); void hero.offsetWidth; root.classList.remove('snap');
    const delay=hero.classList.contains('hero')?350:150;
    const go=()=>{ hero.classList.remove('hero-out'); chars.forEach((c,i)=>setTimeout(()=>c.classList.add('on'),120+i*7));
      const st=$('.stats'); if(st) setTimeout(()=>st.classList.add('go'),500); setTimeout(heroWatch,900) };
    const ld=$('#loader'); const t0=performance.now(); (function wait(){ if(!ld||ld.classList.contains('out')||performance.now()-t0>1500) setTimeout(go,delay); else setTimeout(wait,40) })();
  })();
  // ===== Living sky: sunrise -> day -> sunset -> night, driven by scroll =====
  const cv=$('#sky'), cx=cv.getContext('2d'), sky=$('#journey'), veil=$('#veil'), neb=$('.nebula');
  let W,H,stars=[],flies=[],motes=[],clouds=[],shoot=[],mx=-1e4,my=-1e4,dpr=Math.min(devicePixelRatio||1,1.5);
  // sky keyframes: [progress, top, middle, horizon]
  const K=[[0,'#2c3f8f','#c0607e','#ffab5e'],[.07,'#1f2a6e','#8a4585','#f2787a'],[.14,'#141852','#4a2c70','#b04e78'],[.23,'#070d2e','#15195a','#3a2a6e'],
           [.36,'#02061a','#0a1440','#1e2f68'],[.5,'#030819','#0c1648','#2a2f6e'],[.6,'#1a1f55','#4a3580','#b25f80'],[.68,'#2c3f8f','#b8789a','#ffa874'],
           [.76,'#3a5fb0','#e09aa0','#ffcf8f'],[.87,'#2a78d6','#79b8ee','#ffe3b8'],[1,'#1766c9','#3f98e2','#b4e2ff']];
  const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)), mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
  const ss=(e0,e1,x)=>{const t=Math.min(1,Math.max(0,(x-e0)/(e1-e0)));return t*t*(3-2*t)};
  function skyAt(p){let i=0;while(i<K.length-2&&p>K[i+1][0])i++;const A=K[i],B=K[i+1],t=ss(A[0],B[0],p);return [1,2,3].map(j=>mix(hex(A[j]),hex(B[j]),t))}
  function size(){const vw=document.documentElement.clientWidth, vh=document.documentElement.clientHeight; W=cv.width=vw*dpr;H=cv.height=vh*dpr;cv.style.width=vw+'px';cv.style.height=vh+'px';
    stars=Array.from({length:Math.min(420,Math.round(innerWidth*innerHeight/3600))},()=>({x:Math.random()*W,y:Math.random()*H*.85,r:(Math.random()*1.3+.2)*dpr,p:Math.random()*6.28,s:.5+Math.random()*2,c:Math.random()<.15?'#ffd9a8':Math.random()<.3?'#b9c8ff':'#ffffff'}));
    flies=Array.from({length:Math.round(innerWidth/38)},()=>({x:Math.random()*W,y:H*.3+Math.random()*H*.7,vx:(Math.random()-.5)*.3*dpr,vy:(Math.random()-.5)*.3*dpr,r:(Math.random()*2+1)*dpr,h:Math.random()<.6?186:Math.random()<.5?258:48,p:Math.random()*6.28}));
    motes=Array.from({length:Math.round(innerWidth/14)},()=>({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.6+.4)*dpr,v:(.1+Math.random()*.35)*dpr,p:Math.random()*6.28}));
    clouds=[]; if(!cloudImgs.every(c=>c.ready))return; for(let i=0;i<4;i++){const near=i>=2, c=cloudImgs[i%2], w=(near?300+Math.random()*200:170+Math.random()*120)*dpr, h=w*c.day.naturalHeight/c.day.naturalWidth;
      clouds.push({c,w,h,near,x:Math.random()*(W+w)-w,y:near?.15+Math.random()*.55:.05+Math.random()*.45,v:(near?.08+Math.random()*.06:.03+Math.random()*.03)*dpr,a:near?.95:.7})}}
  const cloudImgs=['/img/sc-cloud-soft.webp','/img/sc-cloud-wispy.webp'].map(n=>{const img=new Image(), o={img:null,day:img,ready:false};
    img.onload=()=>{const c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight; const g=c.getContext('2d'); g.filter='brightness(.72) sepia(.4) hue-rotate(205deg) saturate(1.5)'; g.drawImage(img,0,0); o.img=c; o.ready=true; if(cloudImgs.every(k=>k.ready)) size()};
    img.src=n; return o});

  size(); addEventListener('resize',size);
  const T0=performance.now(); const sunEase=()=>{if(!motion) return 1; const k=Math.min(1,Math.max(0,(performance.now()-T0-250)/2400)); return 1-Math.pow(1-k,3)};
  let t=0, sy=0, P=0, Pt=0, lastShoot=0; const flySpr={}; const sunImg=new Image(), moonImg=new Image(); sunImg.src='/img/sun.webp'; moonImg.src='/img/moon.webp';
  // where the sun sits at the very end: centred in the open sky between the closing banner and the footer
  let noonCache=null; addEventListener('resize',()=>noonCache=null);
  function noonY(){ if(noonCache!==null) return noonCache; const cta=document.getElementById('cta'), ft=document.querySelector('footer'); if(!cta||!ft) return innerHeight*.4;
    const end=document.documentElement.scrollHeight-innerHeight, a=cta.getBoundingClientRect().bottom+scrollY-end, b=ft.getBoundingClientRect().top+scrollY-end-40;
    return noonCache=Math.max(innerHeight*.12,(a+b)/2); }
  // sun and moon travel left -> right inside bands 5-7 of 8 counted from the bottom (12.5%-50% down the screen)
  function skyArc(fx){const d=Math.min(1,Math.abs(fx-.5)*2); return .1875+.25*d*d}
  function glow(x,y,r,stops){const g=cx.createRadialGradient(x,y,0,x,y,r);stops.forEach(([o,c])=>g.addColorStop(o,c));cx.fillStyle=g;cx.beginPath();cx.arc(x,y,r,0,6.283);cx.fill()}
  function draw(){t+=.016;
    const m=document.documentElement.scrollHeight-innerHeight; Pt=m>0?Math.min(1,Math.max(0,scrollY/m)):0; P+=(Pt-P)*(motion?.08:1);
    const p=P, [top,mid,hor]=skyAt(p);
    sky.style.background=`linear-gradient(180deg,rgb(${top}) 0%,rgb(${mid}) 55%,rgb(${hor}) 100%)`;
    const night=ss(.07,.22,p)*(1-ss(.55,.68,p)), dawn=(1-ss(0,.1,p))+ss(.6,.7,p)*(1-ss(.72,.84,p)), day=1-night, noon=ss(.78,.96,p);
    veil.style.opacity=(.35+.45*noon+.15*(1-night)).toFixed(3); neb.style.opacity=(.25+.75*night).toFixed(3);
    cx.clearRect(0,0,W,H); const px=(mx>0?(mx/innerWidth-.5):0)*20*dpr, py=(my>0?(my/innerHeight-.5):0)*12*dpr;
    // stars (dawn + night)
    const sa=Math.max(night,dawn*.35);
    if(sa>.01) for(const s of stars){const a=sa*(.45+.55*Math.sin(t*s.s+s.p)); if(a<=0)continue; cx.globalAlpha=a; cx.fillStyle=s.c; const SY=((s.y-py*.3-scrollY*dpr*.04+t*1.2*dpr)%H+H)%H; cx.beginPath(); cx.arc(s.x-px*.3,SY,s.r,0,6.283); cx.fill();
      if(s.r>1.2*dpr&&a>.6){cx.globalAlpha=a*.35;cx.fillRect(s.x-px*.3-s.r*3,SY-.5*dpr,s.r*6,1*dpr);cx.fillRect(s.x-px*.3-.5*dpr,SY-s.r*3,1*dpr,s.r*6)}}
    cx.globalAlpha=1;
    // sun: sets at the top, rises near the bottom and climbs to midday
    const setK=p/.16, riseK=Math.min(1,(p-.64)/.36); if(setK<1||riseK>0){const rs=Math.max(0,riseK), k=setK<1?setK:1-rs, fx=setK<1?.72+.42*setK:-.12+.62*rs, SE=sunEase(), x=W*fx+px+(1-SE)*W*.18, y=skyArc(fx)*H+py+(1-SE)*H*.55;
      cx.globalAlpha=SE;
      const low=setK<1?.55+.45*k:Math.max(0,1-rs*1.15), R=(22+9*low)*dpr;
      const core=low>.55?'255,196,140':'255,251,235', halo=low>.45?'255,140,80':'255,226,170';
      const pulse=1+.06*Math.sin(t*1.6);
      glow(x,y,R*22*pulse,[[0,`rgba(${halo},${.3+.18*low})`],[.25,`rgba(${halo},.12)`],[.6,`rgba(${halo},.03)`],[1,`rgba(${halo},0)`]]);
      glow(x,y,R*6*pulse,[[0,`rgba(${core},.85)`],[.3,`rgba(${core},.35)`],[1,`rgba(${core},0)`]]);
      if(sunImg.complete&&sunImg.naturalWidth){const d=R*3.4; cx.save(); cx.translate(x,y); cx.rotate(t*.02); cx.drawImage(sunImg,-d/2,-d/2,d,d); cx.restore()}
      else{cx.fillStyle=`rgb(${core})`; cx.beginPath(); cx.arc(x,y,R,0,6.283); cx.fill()} cx.globalAlpha=1}
    // moon: rises after sunset, crosses the sky, sets before sunrise
    const v=ss(.08,.62,p); if(v>0&&v<1){const fx=-.12+1.24*v, x=W*fx+px*.6, y=skyArc(fx)*H+py*.6, R=30*dpr, a=1;
      glow(x,y,R*8,[[0,`rgba(170,200,255,${.28*a})`],[.4,`rgba(140,170,255,${.08*a})`],[1,'rgba(140,170,255,0)']]);
      cx.globalAlpha=a; if(moonImg.complete&&moonImg.naturalWidth){const d=R*2.25; cx.drawImage(moonImg,x-d/2,y-d/2,d,d)} else{cx.fillStyle='#e6ecfa'; cx.beginPath(); cx.arc(x,y,R,0,6.283); cx.fill()}
      cx.globalAlpha=1}
    for(const c of clouds){c.x+=c.v; if(c.x>W+20)c.x=-c.w-Math.random()*W*.3; const sx=c.x-px*(c.near?.8:.4);
      const X=((sx%(W+c.w*2))+(W+c.w*2))%(W+c.w*2)-c.w; const span=H+c.h*2, Y=(((c.y*H-scrollY*dpr*(c.near?.14:.08)-py*(c.near?.6:.3))%span)+span)%span-c.h;
      const dayA=noon*(1-night); cx.globalAlpha=c.a*(1-dayA); cx.drawImage(c.c.img,X,Y,c.w,c.h); if(dayA>.01){cx.globalAlpha=c.a*dayA; cx.drawImage(c.c.day,X,Y,c.w,c.h)}}
    cx.globalAlpha=1;
    // day: warm drifting dust motes
    if(day>.02) for(const d of motes){d.p+=.01; d.y-=d.v; d.x+=Math.sin(d.p)*.3*dpr; if(d.y<-10){d.y=H+10;d.x=Math.random()*W}
      cx.globalAlpha=day*(.35+.35*Math.sin(d.p*3)); cx.fillStyle=noon>.5?'#fff6d8':'#ffc98a'; cx.beginPath(); cx.arc(d.x,d.y,d.r,0,6.283); cx.fill()}
    cx.globalAlpha=1;
    // night: fireflies that dodge the cursor
    const fa=Math.max(night,.25*dawn);
    if(fa>.02) for(const f of flies){ const spr=flySpr[f.h]||(flySpr[f.h]=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),rg=g.createRadialGradient(32,32,0,32,32,32);rg.addColorStop(0,`hsla(${f.h},95%,72%,.9)`);rg.addColorStop(1,`hsla(${f.h},95%,60%,0)`);g.fillStyle=rg;g.fillRect(0,0,64,64);return c})());f.p+=.02; f.x+=f.vx+Math.sin(f.p)*.2; f.y+=f.vy+Math.cos(f.p*.8)*.2;
      const dx=f.x-mx*dpr,dy=f.y-my*dpr,d=Math.hypot(dx,dy); if(d<140*dpr){f.x+=dx/d*1.6;f.y+=dy/d*1.6}
      if(f.x<0)f.x=W; if(f.x>W)f.x=0; if(f.y<H*.2)f.y=H; if(f.y>H)f.y=H*.2;
      const a=fa*(.5+.5*Math.sin(f.p*2)); cx.globalAlpha=a; cx.drawImage(spr,f.x-f.r*6,f.y-f.r*6,f.r*12,f.r*12)} cx.globalAlpha=1;
    // night: shooting stars
    if(night>.6&&motion&&t-lastShoot>2.5+Math.random()*4){lastShoot=t;shoot.push({x:Math.random()*W*.8+W*.1,y:Math.random()*H*.35,vx:(6+Math.random()*4)*dpr*(Math.random()<.5?-1:1),vy:(2.5+Math.random()*2)*dpr,l:1})}
    shoot=shoot.filter(s=>(s.l-=.018)>0); for(const s of shoot){s.x+=s.vx;s.y+=s.vy;const g=cx.createLinearGradient(s.x,s.y,s.x-s.vx*14,s.y-s.vy*14);g.addColorStop(0,`rgba(255,255,255,${s.l*night})`);g.addColorStop(1,'rgba(255,255,255,0)');cx.strokeStyle=g;cx.lineWidth=1.6*dpr;cx.beginPath();cx.moveTo(s.x,s.y);cx.lineTo(s.x-s.vx*14,s.y-s.vy*14);cx.stroke()}
    if(motion) requestAnimationFrame(draw);}
  draw(); if(!motion) addEventListener('scroll',()=>draw(),{passive:true});

  // Cursor spotlight + hero parallax + CTA parallax
  const spot=$('#spot'), heroImg=$('#heroBg img'), ctaImg=$('#ctaImg');
  if(fine){addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY; spot.style.transform=`translate3d(${mx}px,${my}px,0)`;
    const nx=e.clientX/innerWidth-.5, ny=e.clientY/innerHeight-.5;
    if(motion){if(heroImg)heroImg.style.transform=`scale(1.08) translate(${nx*-18}px,${ny*-12}px)`;
      $$('.orb').forEach((o,i)=>o.style.translate=`${nx*(i+1)*14}px ${ny*(i+1)*10}px`);}
  },{passive:true});} else spot.style.display='none';
  $('#cta')&&$('#cta').addEventListener('pointermove',e=>{if(!motion)return;const r=e.currentTarget.getBoundingClientRect();ctaImg.style.transform=`translate(${((e.clientX-r.left)/r.width-.5)*-20}px,${((e.clientY-r.top)/r.height-.5)*-14}px)`});

  // Magnetic buttons
  if(fine&&motion) $$('.mag').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});

  // Tilt cards
  if(fine&&motion) $$('[data-tilt]').forEach(c=>{
    c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      c.classList.add('tilting');c.style.setProperty('--rx',((.5-y)*10)+'deg');c.style.setProperty('--ry',((x-.5)*12)+'deg');c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});
    c.addEventListener('pointerleave',()=>{c.classList.remove('tilting');c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
  });

  // Treelines (procedural pine silhouettes)


  // ===== Neon ribbons behind content =====
  const neon=$('#neon');
  function buildNeon(){
    const W=document.documentElement.clientWidth, H=document.querySelector('footer').getBoundingClientRect().top-document.getElementById('top').getBoundingClientRect().top;
    neon.style.height=Math.max(0,H)+'px';
    const mainTop=document.getElementById('top').getBoundingClientRect().top+scrollY;
    const anchors=document.getElementById('hero')?[['.stats-wrap','top','arcT'],['.stats-wrap','bottom','arcB'],['#models','top'],['#capabilities','top'],['#expertise','top'],['#process','top'],['.tech','top','arcT'],['.tech','bottom','arcB']]:[...document.querySelectorAll('main > section')].slice(1).map(el=>[el,'top']);
    const absT=e=>{let y=0;while(e){y+=e.offsetTop;e=e.offsetParent}return y}; const mainAbs=absT(document.getElementById('top'));
    const ys=[]; anchors.forEach(([sel,edge,shape])=>{const el=typeof sel==='string'?document.querySelector(sel):sel; if(el&&el.offsetParent){const r={top:absT(el)-mainAbs,height:el.offsetHeight}; ys.push({Y:r.top+(edge==='mid'?r.height/2:edge==='bottom'?r.height:0)+(sel==='#insights'?-50:0)+(shape==='arcT'?-6:shape==='arcB'?6:0),shape})}});
    let defs=`<defs><filter id="nb" filterUnits="userSpaceOnUse" x="-200" y="-200" width="${W+400}" height="800"><feGaussianBlur stdDeviation="6"/></filter><filter id="nb2" filterUnits="userSpaceOnUse" x="-200" y="-200" width="${W+400}" height="800"><feGaussianBlur stdDeviation="2"/></filter><filter id="nb3" filterUnits="userSpaceOnUse" x="-200" y="-200" width="${W+400}" height="800"><feGaussianBlur stdDeviation="22"/></filter>`;
    defs+='<linearGradient id="ngm" x1="0" x2="1"><stop offset="0" stop-color="#6a4cff" stop-opacity="0"/><stop offset=".12" stop-color="#7b5cff"/><stop offset=".45" stop-color="#3f6bff"/><stop offset=".8" stop-color="#2fb6ff"/><stop offset="1" stop-color="#22e0f5" stop-opacity=".2"/></linearGradient>';
    defs+='<linearGradient id="ngc" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".2" stop-color="#e9f3ff" stop-opacity=".9"/><stop offset=".55" stop-color="#ffffff"/><stop offset=".85" stop-color="#dff8ff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>';
    let out='';
    ys.forEach(({Y,shape},i)=>{ const y=200, top=Y-200; let body='';
      const flip=i%2?-1:1, a=Math.min(70,W*.05)*flip;
      let d;
      if(shape==='arcT') d=`M-40 ${y+34} C ${W*.2} ${y+30}, ${W*.3} ${y-6}, ${W*.5} ${y-8} S ${W*.85} ${y+4}, ${W+40} ${y+30}`;
      else if(shape==='arcB') d=`M-40 ${y-26} C ${W*.2} ${y-24}, ${W*.3} ${y+8}, ${W*.5} ${y+10} S ${W*.85} ${y-2}, ${W+40} ${y-28}`;
      else d=`M-40 ${y+a} C ${W*.28} ${y+a*1.05}, ${W*.42} ${y-a*.15}, ${W*.58} ${y-a*.35} S ${W*.88} ${y-a*1.1}, ${W+40} ${y-a*1.25}`;
      const dur=(7+i%4*1.5)+'s', del=(-i*1.3)+'s';
      body+=`<g><path class="band" d="${d}" stroke="url(#ngm)" filter="url(#nb3)"/><path class="haze" d="${d}" stroke="url(#ngm)" filter="url(#nb)"/><path class="glow" d="${d}" stroke="url(#ngm)" filter="url(#nb2)"/><path class="mid" d="${d}" stroke="url(#ngm)"/><path class="core" d="${d}" stroke="url(#ngc)"/></g>`;
      const runs=`<path class="run" pathLength="1000" d="${d}" style="animation-duration:${dur};animation-delay:${del}"/>`;
      out+=`<svg class="nst" style="top:${top}px;height:400px" viewBox="0 0 ${W} 400" preserveAspectRatio="none">${i===0?defs:''}${body}</svg><svg class="nrun" style="top:${top}px;height:400px" viewBox="0 0 ${W} 400" preserveAspectRatio="none">${runs}</svg>`;
    });
    // dark glass lens between each top/bottom arc pair (stats band, tech strip)
    for(let i=0;i<ys.length-1;i++){ if(ys[i].shape!=='arcT'||ys[i+1].shape!=='arcB') continue;
      const t=ys[i].Y, b=ys[i+1].Y, top=t-20, h=b-t+60, T=20, B=b-t+20;
      const d=`M-40 ${T+34} C ${W*.2} ${T+30}, ${W*.3} ${T-6}, ${W*.5} ${T-8} S ${W*.85} ${T+4}, ${W+40} ${T+30} L ${W+40} ${B-28} C ${W*.85} ${B-2}, ${W*.7} ${B+10}, ${W*.5} ${B+10} S ${W*.2} ${B-24}, -40 ${B-26} Z`;
      out=`<svg class="lens" style="top:${top}px;height:${h}px" viewBox="0 0 ${W} ${h}" preserveAspectRatio="none"><defs><linearGradient id="lg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1747" stop-opacity=".92"/><stop offset=".5" stop-color="#070f33" stop-opacity=".95"/><stop offset="1" stop-color="#0b1747" stop-opacity=".92"/></linearGradient><radialGradient id="lr${i}" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#3a5cff" stop-opacity=".28"/><stop offset="1" stop-color="#3a5cff" stop-opacity="0"/></radialGradient></defs><path d="${d}" fill="url(#lg${i})"/><path d="${d}" fill="url(#lr${i})"/></svg>`+out;
    }
    neon.innerHTML=out;
  }
  let nt; const reNeon=()=>{clearTimeout(nt);nt=setTimeout(buildNeon,150)};
  buildNeon(); addEventListener('resize',reNeon); addEventListener('load',reNeon);
  if('ResizeObserver' in window) new ResizeObserver(reNeon).observe(document.body);


  // ===== Testimonials: vertical coverflow. Loads from the backend if it's
  // reachable; falls back to placeholders otherwise so the section still works
  // before the backend is deployed (see backend/README.md). =====
  const FALLBACK_TESTIMONIALS=[
    {q:"Professional and enthusiastic about getting my vision right.",p:"Game Nock Team had to redesign and iterate a number of times while working me. They stayed professional and enthusiastic about getting my vision right. I'm grateful for their patience and understanding while working with me. Will definitely be hiring again!",name:"Ron Jones",role:"Park Survivor Game"},
    {q:"On point, on time and a really great team to work with.",p:"Hasham and the Game Nock Team have been going above and beyond for team Blast Wheels! What started out as a vision has nearly come full to life in less than 14 weeks! On point, on time and really great team to be working with. Work has been made clean and professional. Problems are solved quickly and effortlessly. Highly recommend.",name:"Kyle Karasz",role:"Blast Wheels"},
    {q:"Communication was clear, delivery was on time.",p:"Great experience working together. Communication was clear, delivery was on time, and the overall quality exceeded expectations. Highly recommended.",name:"Rebel Bees",role:"Country Strike"},
    {q:"Reliable, met every deadline, and took full responsibility for the work.",p:"Hasham and the Game Nock Team did an excellent job on this project. They were always reliable, met every deadline, and took full responsibility for the work. What really stood out was their ability to solve problems quickly and effectively, they can handle complex challenges and code solutions for virtually any project. They also worked very well as a team and kept everything organized. I would highly recommend them.",name:"Shen Deli Bao Fa",role:"VR Breathing Device Simulation"},
    {q:"Reliable, met every deadline, and took full responsibility for the work.",p:"Hasham and the Game Nock Team did an excellent job on this project. They were always reliable, met every deadline, and took full responsibility for the work. What really stood out was their ability to solve problems quickly and effectively, they can handle complex challenges and code solutions for virtually any project. They also worked very well as a team and kept everything organized. I would highly recommend them.",name:"sdliy Bo",role:"Practice Machine Simulation"},
    {q:"Delivered exactly to our requirements, in less time than agreed.",p:"Hasham and the Game Nock Team were a pleasure to work with. They delivered our game exactly to our requirements in less time than we even agreed upon. I can't recommend them enough to anyone looking for game development.",name:"Julia Espona",role:"Puzzle Game Design & Development"},
    {q:"Excellent communicators who resolve problems quickly.",p:"The Game Nock Team are excellent communicators, address concerns effectively, and can resolve problems quickly. I highly recommend them.",name:"Wayne John",role:"Multiplayer Mobile iOS Game Development"},
    {q:"Goes above and beyond in a timely manner.",p:"Amazing Game Nock Team. Goes above and beyond in more than a timely manner.",name:"Daisy Seq",role:"Back to School Board Game"},
    {q:"Quick and precise. Could not ask for better help.",p:"Amazing, quick and precise Game Nock Team. Could not ask for better help.",name:"KukiFun",role:"Convert Cartoon Into Game"},
    {q:"Concise and clear.",p:"Amazing job, the Game Nock Team is concise and clear.",name:"Atul R",role:"Toddler Game"},
    {q:"Timely, and I'll be back for more work.",p:"Great job. Timely and will 100% ask the Game Nock Team for work again.",name:"C Patel",role:"Education Game"},
    {q:"Exceeded my expectations in both design and functionality.",p:"I had an amazing experience working with the Game Nock Team. They delivered a high-quality 2D game with seamless blockchain integration, exceeding my expectations in both design and functionality. The gameplay is smooth, the graphics are polished, and the blockchain features are implemented flawlessly.",name:"Trey Russell",role:"Blockchain Play-to-Earn Game"},
    {q:"Highly skilled, professional, and dedicated to the best results.",p:"Communication was excellent throughout the project, with regular updates and a clear understanding of my requirements. The Game Nock Team was highly skilled, professional, and dedicated to delivering the best results. I highly recommend them to anyone looking for top-notch game development services!",name:"Oliver Harburt",role:"Astronaut Ace"},
    {q:"Would definitely work with them again in the future.",p:"Would definitely work with them again in the future. Thanks for the great work!",name:"Kofi Duah",role:"Web3 Blockchain Tycoon Game"},
    {q:"Top notch, responsive, and willing to go above and beyond.",p:"Hasham and the Game Nock Team are top notch. They're responsive and willing to go above and beyond to deliver on your project. Their strong talent and entrepreneurial spirit make them a great solution. Highly recommend.",name:"Davis Brimer",role:"Gamisodes"},
    {q:"Always in touch, always ready for any complexity.",p:"Hasham and the Game Nock Team are very responsible and active! They are always in touch, always ask questions and are always ready to fulfill any complexity of the project. We have done a lot of cool projects with them and in different directions, and the Game Nock Team always quickly understood the essence of the task and quickly made edits after all our tests. If you are looking for a team who will cope with your task and leave a good impression, contact Hasham and the Game Nock Team! We had experience in developing 3D and 2D action games, logic games and utility applications.",name:"Tim M",role:"Real-Life Quest with Wallet Integration, AR & Geolocation"},
    {q:"Very skilled and coordinated perfectly.",p:"The Game Nock Team is very skilled and coordinated perfectly. They are the best developers if you are looking to make a game.",name:"Rich Brown",role:"Multiplayer Boxing Game"},
    {q:"Done perfectly, on time and without any overlaps.",p:"Hasham and the Game Nock Team have done a lot of cool jobs for me during this contract. They were done perfectly, on time and without any overlaps. I am very glad I had the opportunity to work with them as they have a great understanding of the mechanics of game applications, are not afraid of complex applications and are always trying to develop and grow in results! The applications that were made were both 3D gaming, 2D gaming, and word game utilities. If you haven't worked with them yet, I advise you to give it a try.",name:"Mina T",role:"VR Ambulance Simulation"},
    {q:"Great team, thank you!",p:"Great Team, thank you!",name:"Bucky Soliman",role:"VR VisionPro Simulation"},
    {q:"Smart, efficient, great communication and highly skilled.",p:"Hasham and the Game Nock Team are amazing developers! And a great team! Smart, efficient, great communication and highly skilled. Couldn't have asked for more.",name:"Garth Williams",role:"Multiple 2D Hyper-Casual Games"},
    {q:"Great at handling heavy logic in simple applications.",p:"Thanks to Hasham and the Game Nock Team for their ability to handle heavy logic in simple applications and their correct ability to ask what they want to know. Thanks to their analytical and communication skills, we put together a great application that many others could not put together in months!",name:"Jamie R",role:"Multiple 3D Hyper-Casual Games"},
    {q:"Interesting solutions and clarifying questions from day one.",p:"Thank you Hasham and the Game Nock Team for a great job! They coped with the task quickly, made timely edits and were very responsible to the deadline. It is interesting to work with Hasham and the Game Nock Team: they offer interesting solutions to processes, they immediately ask clarifying questions before the start of the project and help to adjust the basic logic of the application from the development side. I will be glad to work with them again!",name:"Nicholas Hatton",role:"Azuma Game"},
    {q:"Met the deadline and stayed responsive throughout.",p:"Hasham and the Game Nock Team did an excellent job! They met the deadline, corrected a lot of subtleties and helped to rearrange the project to fit the necessary changes. They always kept in touch, asked questions in a timely manner and were very polite.",name:"Chenzeb Faiz",role:"Zombie Fighting Game"},
    {q:"Attentive to detail, quality held up despite the fast turnaround.",p:"Hasham and the Game Nock Team are amazing developers! They handled the task very quickly, were attentive to the work and made my adjustments to the project with quality. And despite the quick completion of the work, its quality remained in excellent condition. The team was always in touch, attentive to details and asked questions. It was a pleasure to communicate and work with them. And I hope that we will have more joint projects!",name:"Iqbal H",role:"2D Fighting Project"},
    {q:"A standout play-to-earn experience, delivered flawlessly.",p:"I'm thoroughly impressed with Hasham and the Game Nock Team's work on our project. They seamlessly integrated blockchain tech and multiplayer features into our 3D game, delivering a standout play-to-earn experience. Their professionalism, skill, and proactive problem-solving were outstanding. I highly recommend Hasham and the Game Nock Team for anyone seeking top-quality game development with a blockchain edge.",name:"Zmagoslava Kuhel",role:"3D Endless Runner"},
    {q:"No repetition needed, and the end product left us extremely happy.",p:"Well the best thing was no repetition needed. As per my past experiences most of the time there were a lot of repetitions and a lot of communication to achieve what I wanted. Attention to detail. Communication. End product extremely happy. Best of luck to the skilled Game Nock Team.",name:"Abdelrahman Nasreldin",role:"Strategy Game"},
    {q:"Incredibly impressed with their work integrating the Phantom wallet.",p:"I recently hired Muhammad online to integrate the Phantom wallet into my C# game, and I must say that I am incredibly impressed with their work. He was able to easily authenticate the user and fetch their NFTs from their wallet, seamlessly integrating it into my game. Throughout the project, the developer communicated effectively and professionally, keeping me updated on their progress and addressing any concerns I had. I highly recommend this developer to anyone looking for a skilled and reliable developer for their project. Thank you for your hard work and dedication to making my game a success!",name:"Hamza T",role:"Cat Doodle Game"},
    {q:"Great team! Thank you.",p:"Great team! Thank you.",name:"Flores",role:"24/7"},
    {q:"A fruitful collaboration, full of excitement and cool projects.",p:"Thanks to the Game Nock team about his developer skills! It was a fruitful collaboration, full of excitement and cool projects. The team did a great job with tasks on various topics, always handled revisions well, and helped find logical solutions to any challenges in the project. Thank you for your work, speed, and responsible approach!",name:"Tbilisi",role:"Rocket Space"},
    {q:"Did everything ahead of schedule and followed all instructions.",p:"The Game Nock Team did an excellent job. They did everything ahead of schedule and followed all instructions. In the process of work they actively helped and offered solutions to any difficulties that arose. They were always in touch and very responsible in their approach to the task.",name:"Guibin Lin",role:"Porting 13 Projects to iOS and Android"}
  ];
  function initTestimonials(TESTIMONIALS){const st=document.getElementById('vstage'); if(!st||!TESTIMONIALS.length) return; const N=TESTIMONIALS.length; let cur=0, vt, hov=false;
    const ini=n=>n.split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase();
    st.innerHTML=TESTIMONIALS.map((d,i)=>`<article class="vcard" data-i="${i}"><span class="vq">\u201C</span><h3></h3><p></p><div class="who"><span class="avatar"></span><div><b></b><small></small></div></div></article>`).join('');
    const cards=[...st.children];
    cards.forEach((c,i)=>{const d=TESTIMONIALS[i]; c.querySelector('h3').textContent=d.q; c.querySelector('p').textContent=d.p; c.querySelector('.avatar').textContent=ini(d.name); c.querySelector('.who b').textContent=d.name; c.querySelector('.who small').textContent=d.role;
      c.addEventListener('click',()=>{if(c.dataset.pos!=='0'){cur=i;lay();rs()}})});
    function lay(){cards.forEach((c,i)=>{let o=((i-cur)%N+N)%N; if(o>N/2)o-=N; c.dataset.pos=Math.max(-3,Math.min(3,o)); c.setAttribute('aria-hidden',o!==0)}); document.getElementById('vtCount').textContent=(cur+1)+' / '+N}
    function go(s){cur=(cur+s+N)%N;lay();rs()}
    function rs(){clearInterval(vt); if(motion) vt=setInterval(()=>{if(!hov)go(1)},5000)}
    st.addEventListener('mouseenter',()=>hov=true); st.addEventListener('mouseleave',()=>hov=false);
    document.getElementById('vtPrev').onclick=()=>go(-1); document.getElementById('vtNext').onclick=()=>go(1);
    lay(); rs();
  }
  if(document.getElementById('vstage')){
    fetch(API_BASE+'/api/testimonials').then(r=>r.ok?r.json():Promise.reject()).then(rows=>{
      if(!Array.isArray(rows)||!rows.length) throw 0;
      initTestimonials(rows.map(r=>({q:r.headline,p:r.quote,name:r.client_name,role:r.client_role||''})));
    }).catch(()=>initTestimonials(FALLBACK_TESTIMONIALS));
  }
  // Nav: scrolled state, progress, active pill, mobile menu, to-top
  const nav=$('#nav'), prog=$('#progress'), toTop=$('#toTop');
  // fill both edges with overlapping cliff/mountain art so something is always there
  // glowing vertical light lines running down both page edges
  function buildRails(){const main=document.getElementById("top"), mTop=main.getBoundingClientRect().top+scrollY, ft=document.querySelector("footer"), H=ft.getBoundingClientRect().bottom+scrollY;
    for(const [id,side] of [['railL',0],['railR',1]]){const rail=document.getElementById(id); rail.style.top=(-mTop)+'px'; rail.style.height=H+'px'; const w=rail.offsetWidth;
      const mk=(x0,amp,per,ph)=>{let d=''; const step=per/8, n=Math.ceil(H/step); for(let k=0;k<=n;k++){const y=Math.min(H+4,k*step); const x=x0+amp*Math.sin((y/per)*Math.PI*2+ph); d+=`${d?' L':'M'}${(side?w-x:x).toFixed(1)} ${y.toFixed(1)}`} return d};
      const a=mk(w*.34,w*.16,900,side*1.7), b=mk(w*.22,w*.1,1300,side*.6+2);
      const g=`vg${id}`; const edge=side?w:0, fill=`M${edge} 0 L${a.slice(1).replace(/^([\d.]+) 0/,'$1 0')} L${edge} ${H} Z`;
      rail.innerHTML=`<svg width="${w}" height="${H}" viewBox="0 0 ${w} ${H}" preserveAspectRatio="none" style="display:block;overflow:visible"><defs>
        <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22e0f5"/><stop offset=".35" stop-color="#3f6bff"/><stop offset=".6" stop-color="#7b5cff"/><stop offset=".85" stop-color="#3aa0ff"/><stop offset="1" stop-color="#22e0f5"/></linearGradient>
        <filter id="${g}b" filterUnits="userSpaceOnUse" x="-100" y="-100" width="${w+200}" height="${H+200}"><feGaussianBlur stdDeviation="7"/></filter></defs>
        </svg>`;}}
  buildRails(); addEventListener('load',buildRails); if(document.fonts) document.fonts.ready.then(buildRails); if('ResizeObserver' in window){let lastH=0; new ResizeObserver(()=>{const h=document.getElementById('top').scrollHeight; if(Math.abs(h-lastH)>2){lastH=h; clearTimeout(rt); rt=setTimeout(buildRails,120)}}).observe(document.getElementById('top'))} let rt; addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(buildRails,200)});
  const heroCut=$('#heroBg'); let hmx=0;
  function heroPar(){const y=Math.min(scrollY,innerHeight*1.2); if(heroCut) heroCut.style.transform=`translate3d(${(-hmx*28).toFixed(1)}px,${(y*.1).toFixed(1)}px,0)`}
  if(fine&&motion) addEventListener('pointermove',e=>{hmx=e.clientX/innerWidth-.5; if(scrollY<innerHeight*1.2) heroPar()},{passive:true});
  function onScroll(){if(motion)heroPar();sy=scrollY; nav.classList.toggle('scrolled',sy>20); const m=document.documentElement.scrollHeight-innerHeight; prog.style.transform=`scaleX(${m>0?sy/m:0})`; toTop.classList.toggle('show',sy>700); processProgress();}
  addEventListener('scroll',onScroll,{passive:true});
  toTop.addEventListener('click',()=>scrollTo({top:0,behavior:motion?'smooth':'auto'}));
  const burger=$('#burger'), mm=$('#mmenu');
  burger.addEventListener('click',()=>{const o=mm.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  mm.querySelectorAll('a,button').forEach(a=>a.addEventListener('click',()=>{mm.classList.remove('open');burger.setAttribute('aria-expanded',false)}));
  const links=$$('#navLinks a'), pill=$('#navPill');
  function movePill(a){if(!a){pill.style.opacity=0;return} pill.style.opacity=1; pill.style.left=a.offsetLeft+'px'; pill.style.width=a.offsetWidth+'px'}
  let activeLink=links.find(a=>a.classList.contains('active'))||null; setTimeout(()=>movePill(activeLink),50);
  links.forEach(a=>{a.addEventListener('mouseenter',()=>movePill(a))}); $('#navLinks').addEventListener('mouseleave',()=>movePill(activeLink));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){activeLink=links.find(a=>a.getAttribute('href')==='#'+e.target.id)||null;links.forEach(a=>a.classList.toggle('active',a===activeLink));movePill(activeLink)}}),{rootMargin:'-45% 0px -50% 0px'});
  ['hero','what','process','work','expertise','insights','company'].forEach(id=>{const el=document.getElementById(id); if(el) io.observe(el)});

  // Count-up
  const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return; cio.unobserve(e.target);
    const el=e.target,end=+el.dataset.count,dec=+(el.dataset.dec||0),suf=el.dataset.suffix||'',t0=performance.now();
    if(!motion)return;
    const tick=t=>{const k=Math.min(1,(t-t0)/1600);el.textContent=(end*(1-Math.pow(1-k,4))).toFixed(dec)+suf; if(k<1)requestAnimationFrame(tick)}; requestAnimationFrame(tick)}),{threshold:.6});
  $$('[data-count]').forEach(el=>cio.observe(el));

  // ===== Modal =====
  const modal=$('#modal'), box=$('#mBox'); let lastFocus;
  function open(html){lastFocus=document.activeElement; box.innerHTML='<button class="x" aria-label="Close" data-close>×</button>'+html; modal.hidden=false; document.body.style.overflow='hidden'; box.scrollTop=0; box.querySelector('input,button').focus();}
  function close(){modal.hidden=true; document.body.style.overflow=''; lastFocus&&lastFocus.focus();}
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-close]'))close()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close(); if(modal.hidden&&(e.key==='ArrowLeft'||e.key==='ArrowRight')&&$('#stage')&&isInView($('#stage')))go(e.key==='ArrowLeft'?-1:1)});
  const esc=s=>String(s).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
  const services=['Complete Development','Co-Development','Specialized Development','Unity Development','Multiplayer','Backend','Mobile','WebGL','Porting & Optimization','Careers','Something else'];
  function contact(pre){
    open(`<span class="eyebrow">Start a conversation</span><h3 id="mTitle">Discuss Your Project</h3><p>Tell us what you're building. A producer will reply within two business days.</p>
    <form id="cf" novalidate>
      <div class="row2"><label for="f-name">Name<input id="f-name" name="name" autocomplete="name" required><span class="err"></span></label>
      <label for="f-email">Work email<input id="f-email" name="email" type="email" autocomplete="email" required><span class="err"></span></label></div>
      <div class="row2"><label for="f-studio">Studio / company<input id="f-studio" name="studio" autocomplete="organization"></label>
      <label for="f-budget">Estimated budget<select id="f-budget" name="budget"><option>Under $50k</option><option>$50k – $250k</option><option>$250k – $1M</option><option>$1M+</option><option>Not sure yet</option></select></label></div>
      <label for="f-msg">Project details<textarea id="f-msg" name="msg" required placeholder="Genre, stage, team size, timeline…"></textarea><span class="err"></span></label>
      <div class="fdrop"><input type="file" id="f-files" name="files" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.key,.txt,.md,.xls,.xlsx,.csv,.zip,.png,.jpg,.jpeg,.gif,.mp4,.mov"><label for="f-files"><svg><use href="#clip"/></svg><span><b>Attach files</b> <small>(optional): brief, GDD, pitch deck, references</small></span></label><ul class="flist"></ul></div>
      <button class="btn btn-primary" type="submit" style="justify-content:center">Send Enquiry <svg><use href="#arrow"/></svg></button>
      <div class="or"><span>or</span></div>
      <a class="btn btn-wa-solid" href="https://wa.me/923184142473" target="_blank" rel="noopener" style="justify-content:center"><svg><use href="#whatsapp"/></svg> Chat on WhatsApp</a>
    </form>`);
    const f=$('#cf');
    f.addEventListener('submit',e=>{e.preventDefault(); let ok=true;
      f.querySelectorAll('[required]').forEach(i=>{const er=i.nextElementSibling; let m='';
        if(!i.value.trim()) m='This field is required.';
        else if(i.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)) m='Enter an email like name@studio.com.';
        er.textContent=m; if(m) ok=false});
      if(!ok){f.querySelector('.err:not(:empty)').previousElementSibling.focus();return}
      const d=Object.fromEntries(new FormData(f)); d.fileNames=[...f.querySelector('input[type=file]').files].map(x=>x.name);
      saveLead(d);
      box.innerHTML='<button class="x" aria-label="Close" data-close>×</button>'+handoffHTML(d);
    });
  }
  document.addEventListener('click',e=>{const t=e.target.closest('[data-contact]'); if(t){e.preventDefault(); contact(t.dataset.contact||'Complete Development')}});

  // ===== Why Game Nock: interactive spotlight =====
  (()=>{if(!document.querySelector('.wspot'))return;const tabs=[...document.querySelectorAll('.sp-tab')],ps=[...document.querySelectorAll('.sp-panel')];let i=0,t,hov=false;
    const show=n=>{i=n;tabs.forEach((x,j)=>x.classList.toggle('on',j===n));ps.forEach((x,j)=>x.classList.toggle('on',j===n));
      const b=tabs[n].querySelector('.bar');b.style.animation='none';void b.offsetWidth;b.style.animation=''};
    const run=()=>{clearInterval(t);t=setInterval(()=>{if(!hov)show((i+1)%tabs.length)},5000)};
    tabs.forEach((x,j)=>x.addEventListener('click',()=>{show(j);run()}));
    document.querySelector('.wspot').addEventListener('mouseenter',()=>hov=true);document.querySelector('.wspot').addEventListener('mouseleave',()=>hov=false);
    run();})();
  addEventListener('load',()=>setTimeout(()=>document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager'),300));
  // ===== Section-to-section scrolling (home page, desktop mouse/trackpad only) =====
  (()=>{const main=document.querySelector('main[data-page="home"]'); if(!main||!motion) return;
    const ok=()=>matchMedia('(pointer:fine)').matches&&innerWidth>=1024&&innerHeight>=620;
    // each stop = one "screen": the section's content is centred vertically in the viewport
    const GROUPS=[['#work'],['#why'],['#company'],['#models'],['#capabilities'],['#expertise'],['#process'],['.tech','#insights'],['#contact']];
    const box=q=>{const s=document.querySelector(q); if(!s||!s.offsetParent) return null; const w=s.querySelector(':scope > .wrap')||s; let y=0,e=w; while(e){y+=e.offsetTop;e=e.offsetParent} return [y, y+w.offsetHeight]};
    const snaps=()=>{const H=innerHeight, end=document.documentElement.scrollHeight-H, pts=[0];
      GROUPS.forEach(g=>{const bs=g.map(box).filter(Boolean); if(!bs.length) return; const t=Math.min(...bs.map(x=>x[0])), btm=Math.max(...bs.map(x=>x[1])), h=btm-t;
        if(h<=H) pts.push(Math.round(t-(H-h)/2)); else {pts.push(Math.round(t-24)); pts.push(Math.round(btm+24-H))}});
      pts.push(end); return [...new Set(pts.map(v=>Math.max(0,Math.min(v,end))))].sort((x,y)=>x-y).filter((v,i,A)=>i===0||v-A[i-1]>60)};
    let busy=false, until=0;
    const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    function glide(to){busy=true; gliding=true; scrollDir=to>scrollY?1:-1; const enter=[]; document.querySelectorAll('main [data-rv]').forEach(el=>{const r=el.getBoundingClientRect(); const top=r.top+scrollY; if(top<to+innerHeight-40&&top+r.height>to+40){ if(!el.classList.contains('in')) enter.push(el) } else setIn(el,false)}); const from=scrollY, d=to-from, dur=Math.min(1000,Math.max(550,Math.abs(d)*.7)), _pre=setTimeout(()=>enter.forEach(el=>setIn(el,true)),dur*.65), t0=performance.now(), html=document.documentElement, sb=html.style.scrollBehavior; html.style.scrollBehavior='auto';
      const step=t=>{const k=Math.min(1,(t-t0)/dur); scrollTo(0,from+d*ease(k)); if(k<1) requestAnimationFrame(step); else {html.style.scrollBehavior=sb; busy=false; gliding=false; enter.forEach(el=>setIn(el,true)); until=performance.now()+450}}; requestAnimationFrame(step)}
    function move(dir){const y=scrollY, P=snaps(), H=innerHeight;
      if(dir>0){const nx=P.find(v=>v>y+4); if(nx===undefined) return false; glide(nx-y>H*1.5? y+Math.round(H*.85) : nx); return true}
      else {const pv=[...P].reverse().find(v=>v<y-4); if(pv===undefined) return false; glide(y-pv>H*1.5? y-Math.round(H*.85) : pv); return true}}
    const blocked=e=>!ok()||!document.getElementById('modal').hidden||(e.target.closest&&e.target.closest('.modal'))||(e.type==='keydown'&&e.target.closest&&e.target.closest('textarea,select,input,button'));
    addEventListener('wheel',e=>{if(blocked(e)||e.ctrlKey||Math.abs(e.deltaY)<Math.abs(e.deltaX)) return; e.preventDefault();
      if(busy||performance.now()<until||Math.abs(e.deltaY)<4) return; move(Math.sign(e.deltaY))},{passive:false});
    addEventListener('keydown',e=>{if(blocked(e)) return; const k=e.key; const dir=(k==='PageDown'||k==='ArrowDown'||(k===' '&&!e.shiftKey))?1:(k==='PageUp'||k==='ArrowUp'||(k===' '&&e.shiftKey))?-1:0;
      if(!dir) return; e.preventDefault(); if(!busy) move(dir)});
  })();
  // ===== Enquiry handoff: save the lead to the backend, then also hand the visitor a pre-filled email / WhatsApp message =====
  const GN_EMAIL='contact@gamenock.com', GN_WA='923184142473';
  function saveLead(d){
    try{ fetch(API_BASE+'/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:d.name,email:d.email,company:d.studio,budget:d.budget,details:d.msg,fileNames:d.fileNames})}).catch(()=>{}) }catch(e){}
  }
  function handoffHTML(d){
    const fl=(d.fileNames||[]); const body=['Name: '+(d.name||''),'Email: '+(d.email||''),'Studio / company: '+(d.studio||'-'),'Budget: '+(d.budget||''),'','Project details:',d.msg||''].concat(fl.length?['','Files to attach: '+fl.join(', ')]:[]).join('\n');
    const subj='Project enquiry - '+(d.studio||d.name||'');
    return `<div class="done"><div class="big"><svg width="30" height="30" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><h3>One last step</h3><p style="color:var(--muted)">Thanks, ${esc((d.name||'').split(' ')[0])}. Your details are ready. Send them to our team by email or WhatsApp and we'll reply within one business day.</p>${fl.length?`<p class="attach-note"><svg><use href="#clip"/></svg> Please attach your ${fl.length>1?fl.length+' files':'file'} (${esc(fl.join(', '))}) to the email or WhatsApp message.</p>`:''}
      <div class="handoff"><a class="btn btn-primary" href="mailto:${GN_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}"><svg><use href="#mail"/></svg> Send by email</a><a class="btn btn-wa-solid" href="https://wa.me/${GN_WA}?text=${encodeURIComponent(body)}" target="_blank" rel="noopener"><svg><use href="#whatsapp"/></svg> Send on WhatsApp</a></div>
      <p style="color:var(--muted);font-size:13px;margin-top:14px">If your email app doesn't open, write to <b>${GN_EMAIL}</b>.</p></div>`;
  }
  function validate(f){let ok=true; f.querySelectorAll('[required]').forEach(i=>{const er=i.nextElementSibling; let m='';
      if(!i.value.trim()) m='This field is required.';
      else if(i.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)) m='Enter an email like name@studio.com.';
      if(er) er.textContent=m; if(m) ok=false}); if(!ok){const e=f.querySelector('.err:not(:empty)'); e&&e.previousElementSibling.focus()} return ok}
  { const cf=document.getElementById('ctForm'); if(cf) cf.addEventListener('submit',e=>{e.preventDefault(); if(!validate(cf)) return; const d=Object.fromEntries(new FormData(cf)); d.fileNames=[...cf.querySelector('input[type=file]').files].map(x=>x.name); saveLead(d); const w=document.createElement('div'); w.className='ct-done'; w.innerHTML=handoffHTML(d); cf.replaceWith(w)}); }
  document.addEventListener('change',e=>{const i=e.target; if(!i.matches||!i.matches('.fdrop input[type=file]')) return; const ul=i.parentElement.querySelector('.flist'); const big=[...i.files].filter(x=>x.size>25*1024*1024);
    ul.innerHTML=[...i.files].map(x=>`<li>${esc(x.name)} <small>${(x.size/1048576).toFixed(1)} MB</small></li>`).join('')+(big.length?'<li class="warn">Files over 25 MB may be too large for email; share a link instead.</li>':'')});
  if(document.getElementById('stage')){
  // ===== Featured coverflow =====
  // Static fallback content (used until/unless the backend has 3+ active projects — see backend/README.md)
  let projects={
    gamisodes:{t:'Gamisodes',k:'Development & Integration',p:'iOS · Android',img:'/img/01-gamisodes.webp',d:'An interactive entertainment app with 50+ mini-games, built in Unity with PlayFab, Tenjin, AppsFlyer, deep links and ATT.'},
    highnoon:{t:'HighNoon',k:'Game Development',p:'Mobile',img:'/img/02-highnoon.webp',d:'A competitive mobile game with real-time 1v1 multiplayer, PlayFab services, in-app purchases and advertising.'},
    azuma:{t:'Azuma Coin',k:'Game Development',p:'Platforms to confirm',img:'/img/04-azuma-coin.webp',d:'A swordsman’s quest across the floating isles. Placeholder case study: replace with the real project summary.'},
    nugget:{t:'Nugget Rush',k:'Game Development',p:'Platforms to confirm',img:'/img/05-nugget-rush.webp',d:'Mine, dig and race for gold in a glowing canyon. Placeholder case study: replace with the real project summary.'},
    cat:{t:'Cat Doodle',k:'Game Development',p:'Platforms to confirm',img:'/img/06-cat-doodle.webp',d:'A playful puzzle adventure with a curious cat. Placeholder case study: replace with the real project summary.'},
    horse:{t:'Horse Run',k:'Game Development',p:'Platforms to confirm',img:'/img/07-horse-run.webp',d:'A high-speed ride through a sunset frontier. Placeholder case study: replace with the real project summary.'},
    blast:{t:'Blast Wheels',k:'Game & Backend Development',p:'Unity · Sui blockchain',img:'/img/03-blast-wheels.webp',d:'A vehicle combat game with PvP and PvE modes, connected to the Sui blockchain with Move contracts and a Node.js backend.'}
  };
  const stage=$('#stage'), dots=$('#dots'); let cards=[], N=0, cur=0, timer, stageHover=false;
  function layout(){cards.forEach((c,i)=>{let o=((i-cur)%N+N)%N; if(o>N/2)o-=N; c.dataset.pos=o; c.setAttribute('aria-hidden',o!==0)}); [...dots.children].forEach((d,i)=>d.classList.toggle('on',i===cur))}
  function go(s){cur=(cur+s+N)%N;layout();restart()}
  function restart(){clearInterval(timer); if(motion) timer=setInterval(()=>{if(modal.hidden&&!stageHover)go(1)},5000)}
  stage.addEventListener('mouseenter',()=>stageHover=true); stage.addEventListener('mouseleave',()=>stageHover=false);
  $('#prev').onclick=()=>go(-1); $('#next').onclick=()=>go(1);
  const CASE_PAGES={gamisodes:'/work/gamisodes/',highnoon:'/work/highnoon/',blast:'/work/blast-wheels/'};
  let sx=null; stage.addEventListener('pointerdown',e=>sx=e.clientX); stage.addEventListener('pointerup',e=>{if(sx!==null&&Math.abs(e.clientX-sx)>50){go(e.clientX<sx?1:-1)} sx=null});
  // (Re)wires dots + click handlers to whatever `.work` cards currently sit in #stage —
  // called once for the static fallback, and again if the backend supplies live projects.
  function wireCards(){
    cards=$$('.work'); N=cards.length; cur=Math.min(3,N-1); dots.innerHTML='';
    cards.forEach((c,i)=>{const d=document.createElement('button');d.setAttribute('aria-label','Show '+(projects[c.dataset.project]?.t||''));d.onclick=()=>{cur=i;layout();restart()};dots.appendChild(d)});
    cards.forEach((c,i)=>c.addEventListener('click',()=>{if(c.dataset.pos!=='0'){cur=i;layout();restart();return} if(CASE_PAGES[c.dataset.project]){location.href=CASE_PAGES[c.dataset.project];return} showProject(c.dataset.project)}));
    layout(); restart();
  }
  // Duplicate the project tiles to 7 so 5 show at once (2 dim at the edges, 2 waiting off-stage)
  { const src=$$('.work'); let i=0; while(document.querySelectorAll('.work').length<7){ stage.appendChild(src[i%src.length].cloneNode(true)); i++; } }
  wireCards();
  function isInView(el){const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0}
  function showProject(k){const p=projects[k]; if(!p) return;
    const desc=/^\s*</.test(p.d||'')?p.d:`<p>${p.d||''}</p>`;
    open(`<img loading="lazy" decoding="async" src="${p.img}" alt="" style="border-radius:14px;width:100%;aspect-ratio:16/9;object-fit:cover;margin-bottom:18px"><span class="eyebrow">${p.k}</span><h3 id="mTitle">${p.t}</h3><p>${p.p}</p><div class="article">${desc}</div><button class="btn btn-primary" data-contact="${p.k}">Start a similar project <svg><use href="#arrow"/></svg></button>`)}
  $('[data-all-projects]').addEventListener('click',()=>{location.href='/work/'});
  function allProjectsPopup(){open(`<span class="eyebrow">Portfolio</span><h3 id="mTitle">All Projects</h3><p>A selection of 50+ shipped titles.</p><div style="display:grid;gap:10px">${Object.entries(projects).map(([k,p])=>`<button class="card hov" style="flex-direction:row;align-items:center;gap:14px;padding:10px" data-open-project="${k}"><img loading="lazy" decoding="async" src="${p.img}" alt="" style="width:92px;height:62px;object-fit:cover;border-radius:10px"><div style="flex:1"><b style="font-family:var(--display)">${p.t}</b><br><small style="color:var(--muted)">${p.k} · ${p.p}</small></div><span class="circle"><svg><use href="#arrow"/></svg></span></button>`).join('')}</div>`);
    box.querySelectorAll('[data-open-project]').forEach(b=>b.addEventListener('click',()=>showProject(b.dataset.openProject)))}
  // Swap in live projects from the backend once loaded, if there are enough to fill the coverflow.
  fetch(API_BASE+'/api/work').then(r=>r.ok?r.json():Promise.reject()).then(rows=>{
    if(!Array.isArray(rows)||rows.length<3) throw 0;
    projects={}; rows.forEach(r=>{projects[r.slug]={t:r.title,k:r.category||'',p:r.platforms||'',img:r.image_path||'',d:r.body||r.summary||''}});
    const tiled=Array.from({length:7},(_,i)=>rows[i%rows.length]);
    stage.innerHTML=tiled.map(r=>`<article class="work hov" data-project="${esc(r.slug)}"><div class="work-img"><img loading="lazy" decoding="async" src="${esc(r.image_path||'')}" alt="${esc(r.title)}" style="width:100%;height:100%;object-fit:cover;object-position:50% 50%"></div><div class="work-body"><h3>${esc(r.title)}</h3><p>${esc(r.summary||'')}</p><div class="work-row"><span class="tag">${esc(r.category||'')}</span><span class="circle"><svg><use href="#arrow"/></svg></span></div><span class="plat">${esc(r.platforms||'')}</span></div></article>`).join('');
    wireCards();
  }).catch(()=>{});
  }
  if(document.getElementById('orbit')){
  // ===== Orbit =====
  const note=$('#orbitNote'), nodes=$$('.node'); let oi=0, otimer;
  function showNode(n){nodes.forEach(x=>x.classList.toggle('on',x===n)); note.innerHTML='<b style="color:var(--text);font-family:var(--display)">'+n.textContent.trim().replace(/\s+/g,' ')+'.</b> <span style="display:inline-block;animation:slideIn .5s var(--ease)">'+n.dataset.note+'</span>'}
  nodes.forEach((n,i)=>{const f=()=>{oi=i;showNode(n);clearInterval(otimer)};n.addEventListener('mouseenter',f);n.addEventListener('focus',f);n.addEventListener('click',f)});
  showNode(nodes[0]); if(motion) otimer=setInterval(()=>{oi=(oi+1)%nodes.length;showNode(nodes[oi])},3500);
  // Revolve the capability nodes around the ring (pauses while hovered)
  { const orbitEl=$('#orbit'), wide=matchMedia('(min-width:641px)'); let ang=-Math.PI/2, paused=false, last=performance.now();
    orbitEl.addEventListener('mouseenter',()=>paused=true); orbitEl.addEventListener('mouseleave',()=>paused=false);
    orbitEl.addEventListener('focusin',()=>paused=true); orbitEl.addEventListener('focusout',()=>paused=false);
    function place(){ const W=orbitEl.clientWidth, H=orbitEl.clientHeight;
      nodes.forEach((n,i)=>{ const a=ang+i*2*Math.PI/nodes.length, x=W*(.5+.30*Math.cos(a)), y=H*(.5+.42*Math.sin(a));
        if(wide.matches){ const left=x<W/2; if(n.classList.contains('left')!==left) n.classList.toggle('left',left);
          const w=n._w||(n._w=n.offsetWidth), h=n._h||(n._h=n.offsetHeight);
          const px=left? x-(w-27) : x-27, py=y-h/2;
          n.style.left='0'; n.style.top='0'; n.style.translate='none'; n.style.transform=`translate3d(${px.toFixed(2)}px,${py.toFixed(2)}px,0)`; }
        else { n.style.left=''; n.style.top=''; n.style.translate=''; n.style.transform=''; } }); }
    addEventListener('resize',()=>nodes.forEach(n=>{n._w=n._h=0}));
    function spin(t){ const dt=Math.min(50,t-last); last=t; if(!paused&&wide.matches) ang+=dt*0.00012; place(); requestAnimationFrame(spin); }
    place(); if(motion) requestAnimationFrame(spin);
    wide.addEventListener&&wide.addEventListener('change',place); }

  }
  if(document.getElementById('stepDetail')){
  // ===== Process =====
  const det=$('#stepDetail'), bar=$('#stepBar'), steps=$$('.step'), fill=$('#fill'); let si=0, stimer, manual=false;
  function setStep(i){si=i; steps.forEach((x,j)=>{x.classList.toggle('on',j===i)}); const s=steps[i];
    det.innerHTML='<span><b>'+s.querySelector('.n').textContent+' · '+s.querySelector('h3').textContent+':</b> '+s.dataset.d+'</span>';
    bar.classList.remove('run'); void bar.offsetWidth; if(!manual&&motion) bar.classList.add('run');}
  steps.forEach((s,i)=>s.addEventListener('click',()=>{manual=true;clearInterval(stimer);setStep(i)}));
  setStep(0); if(motion) stimer=setInterval(()=>{if(!manual)setStep((si+1)%steps.length)},5000);
  processProgress=function(){const r=$('#steps').getBoundingClientRect(); const p=Math.max(0,Math.min(1,(innerHeight*.85-r.top)/(innerHeight*.6)));
    fill.style.setProperty('--p',p); steps.forEach((s,i)=>s.classList.toggle('lit',p>=i/(steps.length-1)-.02));
    if(p>0){clearInterval(stimer); const idx=Math.min(steps.length-1,Math.floor(p*(steps.length-1)+.001)); if(idx!==si||!manual){manual=true;setStep(idx)}}}
  onScroll();

  }
  // Marquee: duplicate content for a seamless loop
  const mq=$('#marquee'); if(mq) mq.innerHTML+=mq.innerHTML;
  onScroll();

  if(document.getElementById('chipPill')){
  // ===== Insights filter with sliding pill =====
  const chipPill=$('#chipPill'), chips=$$('.chip');
  const placePill=c=>{chipPill.style.left=c.offsetLeft+'px';chipPill.style.width=c.offsetWidth+'px'};
  placePill(chips[0]); addEventListener('resize',()=>placePill($('.chip.on'))); document.fonts&&document.fonts.ready.then(()=>{placePill($('.chip.on'));movePill(activeLink)});
  chips.forEach(c=>c.addEventListener('click',()=>{chips.forEach(x=>x.classList.toggle('on',x===c));placePill(c);
    $$('#insGrid .ins').forEach(card=>{const show=c.dataset.f==='all'||card.dataset.cat===c.dataset.f;
      if(!show&&!card.hidden){card.classList.add('leaving');setTimeout(()=>{card.hidden=true;card.classList.remove('leaving')},280)}
      else if(show&&card.hidden){setTimeout(()=>{card.hidden=false;card.classList.add('entering');setTimeout(()=>card.classList.remove('entering'),500)},290)}})}));
  const articles=[
    {k:'Process',t:'A Practical Guide to Multiplayer Architecture',m:'6 min read',img:'/img/multiplayer-architecture.webp',b:['Pick the network model before you write gameplay code. Authoritative servers cost more to run but make cheating much harder; peer-to-peer and relay setups are cheaper and fine for co-op.','Budget for the backend early: accounts, matchmaking, persistence and analytics are usually more work than the netcode itself.','Load-test with bots from the first playable build. Problems at 1,000 concurrent players rarely show up at 10.']},
    {k:'Technical',t:'Optimizing Your Game for Multiple Platforms',m:'7 min read',img:'/img/multiple-platforms.webp',b:['Set a performance budget per platform (frame time, memory, download size) and check it in CI on every build.','Profile on the weakest target device, not your development machine. Most wins come from draw calls, texture memory and garbage collection.','Keep platform differences in data and quality tiers where possible, so one codebase serves mobile, PC, console and WebGL.']},
    {k:'Strategy',t:'From Launch to Live Operations',m:'6 min read',img:'/img/live-operations.webp',b:['Plan the first 90 days of content before launch. Players judge a live game by how fast it changes.','Instrument the funnel: install, tutorial completion, day-1, day-7 and day-30 retention. Decide which number each update is meant to move.','Keep a small, stable live team rather than scaling down to zero after release; knowledge loss is the most expensive bug.']}
  ];
  $$('[data-article]').forEach(b=>b.addEventListener('click',()=>{const a=articles[b.dataset.article];
    open(`<img loading="lazy" decoding="async" src="${a.img}" alt="" style="border-radius:14px;width:100%;aspect-ratio:3/1;object-fit:cover;margin-bottom:18px"><span class="eyebrow">${a.k} · ${a.m}</span><h3 id="mTitle">${a.t}</h3><div class="article" style="margin-top:14px">${a.b.map(p=>'<p>'+p+'</p>').join('')}</div><button class="btn btn-primary" data-contact>Talk to our team <svg><use href="#arrow"/></svg></button>`)}));
  // Swap in live articles from the backend once loaded (each opens in a modal, since
  // admin-created articles don't have a static page yet — see backend/README.md).
  const insGrid=$('#insGrid');
  if(insGrid) fetch(API_BASE+'/api/insights').then(r=>r.ok?r.json():Promise.reject()).then(rows=>{
    if(!Array.isArray(rows)||!rows.length) throw 0;
    insGrid.innerHTML=rows.map((r,i)=>`<button type="button" class="card ins hov" data-cat="${esc((r.category||'').toLowerCase())}" data-live-article="${i}"><div class="card-img"><img loading="lazy" decoding="async" src="${esc(r.cover_image||'')}" alt="" style="width:100%;height:100%;object-fit:cover;object-position:50% 50%"></div><div class="card-body"><div><span class="kicker">${esc(r.category||'')}</span><h3>${esc(r.title)}</h3><span class="meta"><svg><use href="#clock"/></svg>${esc(r.read_minutes||5)} min read</span></div><span class="circle"><svg><use href="#arrow"/></svg></span></div></button>`).join('');
    insGrid.querySelectorAll('[data-live-article]').forEach(b=>b.addEventListener('click',()=>{const r=rows[b.dataset.liveArticle];
      open(`<img loading="lazy" decoding="async" src="${esc(r.cover_image||'')}" alt="" style="border-radius:14px;width:100%;aspect-ratio:3/1;object-fit:cover;margin-bottom:18px"><span class="eyebrow">${esc(r.category||'')} · ${esc(r.read_minutes||5)} min read</span><h3 id="mTitle">${esc(r.title)}</h3><div class="article" style="margin-top:14px">${r.body||('<p>'+esc(r.excerpt||'')+'</p>')}</div><button class="btn btn-primary" data-contact>Talk to our team <svg><use href="#arrow"/></svg></button>`)}));
    const activeChip=$('.chip.on'); if(activeChip) insGrid.querySelectorAll('.ins').forEach(card=>{card.hidden=!(activeChip.dataset.f==='all'||card.dataset.cat===activeChip.dataset.f)});
  }).catch(()=>{});
  }
  // ===== sub-page filters (Work page) =====
  $$('.fchips').forEach(bar=>{const grid=document.getElementById(bar.dataset.for); bar.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b)return;
    bar.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b)); const f=b.dataset.f;
    grid.querySelectorAll('[data-tags]').forEach(c=>c.hidden=!(f==='all'||c.dataset.tags.split(' ').includes(f)))})});
})();
