(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const y=119,w=`
  <div class="after-site after-site-demo" id="afterSite">
    <nav class="as-nav">
      <a class="as-logo" href="#" tabindex="-1">
        <svg width="16" height="20" viewBox="0 0 22 28" fill="none" aria-hidden="true">
          <path d="M11 0C11 0 0 10.5 0 17.5C0 23.299 4.925 28 11 28C17.075 28 22 23.299 22 17.5C22 10.5 11 0 11 0Z" fill="#C67C4E"/>
          <path d="M11 7C11 7 4 13.5 4 17.5C4 21.09 7.134 24 11 24C14.866 24 18 21.09 18 17.5C18 13.5 11 7 11 7Z" fill="#FAF7F2" opacity="0.45"/>
        </svg>
        Toronto DeckCraft
      </a>
      <ul class="as-nav-links">
        <li>Services</li><li>Gallery</li><li>About</li><li>Contact</li>
      </ul>
      <span class="as-nav-cta">Get a Free Quote</span>
    </nav>
    <div class="as-hero">
      <canvas id="demoCanvas" class="as-canvas"></canvas>
      <div id="demoOverlay" class="as-hero-overlay" aria-hidden="true"></div>
      <div id="demoScrollHint" class="as-scroll-hint">
        <div class="as-scroll-copy">
          <span class="as-scroll-kicker">Interactive build reveal</span>
          <span class="as-scroll-title">
            <span>Scroll Down</span>
            <span>To See The Transformation</span>
          </span>
        </div>
        <div class="as-scroll-cue" aria-hidden="true">
          <span class="as-scroll-line"></span>
          <div class="as-chevrons">
            <div class="as-chevron"></div>
            <div class="as-chevron"></div>
            <div class="as-chevron"></div>
          </div>
        </div>
      </div>
      <div class="as-hero-content" id="demoHeroContent">
        <span class="as-label">Premium Deck &amp; Patio Builds</span>
        <h2 class="as-headline">From Empty Yard<br>to Outdoor Oasis.</h2>
        <p class="as-sub">We build outdoor spaces homeowners brag about.<br>Resort-quality craftsmanship, every single time.</p>
        <span class="as-cta-btn">Get a Free Quote &nbsp;&rarr;</span>
      </div>
    </div>
  </div>`;function v({canvas:t,imgs:a,progress:n,overlay:i,hint:e,content:s}){if(!t||!t._ctx)return;const d=t._ctx,f=t._w,l=t._h,g=Math.min(y-1,Math.floor(n*y)),o=a[g];if(o&&o.complete&&o.naturalWidth){const u=Math.max(f/o.naturalWidth,l/o.naturalHeight),p=o.naturalWidth*u,h=o.naturalHeight*u;d.clearRect(0,0,f,l),d.drawImage(o,(f-p)/2,(l-h)/2,p,h)}e&&(e.style.opacity=n>.03?"0":"1",e.style.transform=n>.03?"translateY(-14px) scale(0.985)":"none");const c=.8;if(n>=c){const u=(n-c)/(1-c);i&&(i.style.background=`rgba(6,30,51,${(u*.55).toFixed(3)})`),s&&(s.style.opacity=u.toFixed(3),s.style.transform=`translateY(${((1-u)*14).toFixed(1)}px)`)}else i&&(i.style.background="rgba(6,30,51,0)"),s&&(s.style.opacity="0",s.style.transform="translateY(14px)")}function b(t){const a=window.devicePixelRatio||1,n=t.offsetWidth,i=t.offsetHeight;t.width=n*a,t.height=i*a;const e=t.getContext("2d");e.scale(a,a),t._ctx=e,t._w=n,t._h=i}const x=5500,C=2800,F=600;function O(){const t=document.getElementById("demoCanvas");if(!t)return;const a=document.getElementById("demoOverlay"),n=document.getElementById("demoScrollHint"),i=document.getElementById("demoHeroContent"),e=[];let s=0,d=!1,f=null,l="playing",g=null,o=null,c=0;function u(){b(t),v({canvas:t,imgs:e,progress:c,overlay:a,hint:n,content:i})}window.addEventListener("resize",u);function p(r){if(l==="playing")f||(f=r),c=Math.min(1,(r-f)/x),v({canvas:t,imgs:e,progress:c,overlay:a,hint:n,content:i}),c>=1&&(l="holding",g=r);else if(l==="holding")r-g>=C&&(l="fading",o=r);else if(l==="fading"){const m=Math.min(1,(r-o)/F);i&&(i.style.opacity=(1-m).toFixed(3)),a&&(a.style.background=`rgba(6,30,51,${(.55*(1-m)).toFixed(3)})`),m>=1&&(c=0,l="playing",f=null,v({canvas:t,imgs:e,progress:c,overlay:a,hint:n,content:i}))}requestAnimationFrame(p)}function h(){d||(d=!0,requestAnimationFrame(()=>{b(t),requestAnimationFrame(p)}))}for(let r=1;r<=y;r++){const m=new Image;m.src=`/frames/frame_${String(r).padStart(4,"0")}.jpg`,m.onload=()=>{s++,s===1&&h()},e[r-1]=m}setTimeout(h,1500)}export{w as D,y as F,b as a,O as i,v as r};
