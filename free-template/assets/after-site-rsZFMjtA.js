const A=241,w=`
  <div class="after-site after-site-demo" id="afterSite">
    <nav class="as-nav">
      <a class="as-logo" href="#" tabindex="-1">
        <svg width="16" height="20" viewBox="0 0 22 28" fill="none" aria-hidden="true">
          <path d="M11 0C11 0 0 10.5 0 17.5C0 23.299 4.925 28 11 28C17.075 28 22 23.299 22 17.5C22 10.5 11 0 11 0Z" fill="#F5B942"/>
          <path d="M11 7C11 7 4 13.5 4 17.5C4 21.09 7.134 24 11 24C14.866 24 18 21.09 18 17.5C18 13.5 11 7 11 7Z" fill="#FAF7F2" opacity="0.45"/>
        </svg>
        Aqua Elite
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
          <span class="as-scroll-kicker">Interactive clean-up reveal</span>
          <span class="as-scroll-title">
            <span>Scroll Down</span>
            <span>To Clean This Pool</span>
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
        <span class="as-label">Premium Pool Restoration</span>
        <h2 class="as-headline">From Neglected<br>to Immaculate.</h2>
        <p class="as-sub">We restore what others give up on.<br>Resort-quality results, every single time.</p>
        <span class="as-cta-btn">Get Your Free Assessment &nbsp;&rarr;</span>
      </div>
    </div>
  </div>`;function g({canvas:t,imgs:a,progress:s,overlay:e,hint:i,content:c}){if(!t||!t._ctx)return;const u=t._ctx,d=t._w,o=t._h,v=Math.min(240,Math.floor(s*241)),n=a[v];if(n&&n.complete&&n.naturalWidth){const f=Math.max(d/n.naturalWidth,o/n.naturalHeight),h=n.naturalWidth*f,p=n.naturalHeight*f;u.clearRect(0,0,d,o),u.drawImage(n,(d-h)/2,(o-p)/2,h,p)}i&&(i.style.opacity=s>.03?"0":"1",i.style.transform=s>.03?"translateY(-14px) scale(0.985)":"none");const r=.8;if(s>=r){const f=(s-r)/(1-r);e&&(e.style.background=`rgba(6,30,51,${(f*.55).toFixed(3)})`),c&&(c.style.opacity=f.toFixed(3),c.style.transform=`translateY(${((1-f)*14).toFixed(1)}px)`)}else e&&(e.style.background="rgba(6,30,51,0)"),c&&(c.style.opacity="0",c.style.transform="translateY(14px)")}function y(t){const a=window.devicePixelRatio||1,s=t.offsetWidth,e=t.offsetHeight;t.width=s*a,t.height=e*a;const i=t.getContext("2d");i.scale(a,a),t._ctx=i,t._w=s,t._h=e}const F=5500,x=2800,C=600;function _(){const t=document.getElementById("demoCanvas");if(!t)return;const a=document.getElementById("demoOverlay"),s=document.getElementById("demoScrollHint"),e=document.getElementById("demoHeroContent"),i=[];let c=0,u=!1,d=null,o="playing",v=null,n=null,r=0;function f(){y(t),g({canvas:t,imgs:i,progress:r,overlay:a,hint:s,content:e})}window.addEventListener("resize",f);function h(l){if(o==="playing")d||(d=l),r=Math.min(1,(l-d)/F),g({canvas:t,imgs:i,progress:r,overlay:a,hint:s,content:e}),r>=1&&(o="holding",v=l);else if(o==="holding")l-v>=x&&(o="fading",n=l);else if(o==="fading"){const m=Math.min(1,(l-n)/C);e&&(e.style.opacity=(1-m).toFixed(3)),a&&(a.style.background=`rgba(6,30,51,${(.55*(1-m)).toFixed(3)})`),m>=1&&(r=0,o="playing",d=null,g({canvas:t,imgs:i,progress:r,overlay:a,hint:s,content:e}))}requestAnimationFrame(h)}function p(){u||(u=!0,requestAnimationFrame(()=>{y(t),requestAnimationFrame(h)}))}for(let l=1;l<=241;l++){const m=new Image;m.src=`/frames/frame_${String(l).padStart(4,"0")}.jpg`,m.onload=()=>{c++,c===1&&p()},i[l-1]=m}setTimeout(p,1500)}export{w as D,A as F,_ as a,y as i,g as r};
