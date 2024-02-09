if(!self.define){let i,e={};const s=(s,a)=>(s=new URL(s+".js",a).href,e[s]||new Promise((e=>{if("document"in self){const i=document.createElement("script");i.src=s,i.onload=e,document.head.appendChild(i)}else i=s,importScripts(s),e()})).then((()=>{let i=e[s];if(!i)throw new Error(`Module ${s} didn’t register its module`);return i})));self.define=(a,r)=>{const c=i||("document"in self?document.currentScript.src:"")||location.href;if(e[c])return;let t={};const n=i=>s(i,c),d={module:{uri:c},exports:t,require:n};e[c]=Promise.all(a.map((i=>d[i]||n(i)))).then((i=>(r(...i),t)))}}define(["./workbox-d131083f"],(function(i){"use strict";self.addEventListener("message",(i=>{i.data&&"SKIP_WAITING"===i.data.type&&self.skipWaiting()})),i.precacheAndRoute([{url:"favicon-res.ico",revision:"c3cd93b256e0d460b68f0c931affff0f"},{url:"favicon.ico",revision:"46305c18b2b31b7445f30a4030663857"},{url:"index.html",revision:"408178314104f0398aa328004c66a070"},{url:"logo-ais.png",revision:"efc6c65c2ce26eccfdb37bdde41020f0"},{url:"manifest.json",revision:"17be8e1cc37c380738561678974a869e"},{url:"static/img/avatars/avatar.png",revision:"f8a9bb24f24816a1a88e60105ab5629c"},{url:"static/img/avatars/logoAviation.png",revision:"2c30d3c57aec89995c9ece6d8348e0fc"},{url:"static/img/brands/android.png",revision:"46fb66bc6c12537f9164d912fc3c0cf8"},{url:"static/img/brands/appleinc.png",revision:"ba53e06065ab10570962fcc76dd5369d"},{url:"static/img/brands/auth0.svg",revision:"44753d8e6e7c64bb5361b5f56112b547"},{url:"static/img/brands/chrome.png",revision:"ec673538cf1d3df2a5ccc8f3234fd5a0"},{url:"static/img/brands/cognito.svg",revision:"4d81ae16d5ed9a129679622c9e5b128c"},{url:"static/img/brands/eslint.svg",revision:"484ca6fbc1bb97800e5ae99f4c30bcc0"},{url:"static/img/brands/figma.svg",revision:"810a96e7ac9e0eee9e1a0649e6197962"},{url:"static/img/brands/firebase.svg",revision:"10b0719343408095f5a9b369e0787115"},{url:"static/img/brands/javascript.svg",revision:"ed64a4400623186fd9918440b20fcd12"},{url:"static/img/brands/jwt.svg",revision:"362b45593578db931d94010902212321"},{url:"static/img/brands/material-ui.svg",revision:"aa40456038fb69a7c464872be1f40d4a"},{url:"static/img/brands/react-router.svg",revision:"4fbd15d81e69dcf3fa843ba586582f4f"},{url:"static/img/brands/react.svg",revision:"c1b3f5da8fbcef41a87ee27bc3e25d3f"},{url:"static/img/brands/redux.svg",revision:"aa0a337603611296524a666b62a9ff23"},{url:"static/img/brands/sketch.svg",revision:"6aeae8728c6b34e6ce5f1dd6af93017b"},{url:"static/img/brands/typescript.svg",revision:"a43516ed1c54d40a3274588d32650ee9"},{url:"static/img/illustrations/checklist.png",revision:"1af1d03e80fd813e73fc121e0153bbb4"},{url:"static/img/illustrations/subject.png",revision:"db9de20b9370d5182132389aa967bf5a"},{url:"static/img/illustrations/waiting.png",revision:"325e4c2a29f138759b0106a1fe7c46a1"},{url:"static/img/illustrations/working.png",revision:"107f32f595480fb1880e5d454620a305"},{url:"static/img/screenshots/temp-app.png",revision:"76014e7a69362c138fc9cef68d20de7f"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('app-cache').then(function(cache) {
        return cache.addAll([
            '/static/js/118.4dfa0acd.chunk.js',
            '/static/js/118.a4e1e104.chunk.js',
            '/static/js/118.bd4bd2dc.chunk.js',
            '/static/js/144.d426c3e4.chunk.js',
            '/static/js/190.19bbf9c2.chunk.js',
            '/static/js/190.478dd41b.chunk.js',
            '/static/js/272.4298292f.chunk.js',
            '/static/js/3.2824088f.chunk.js',
            '/static/js/319.de26bda1.chunk.js',
            '/static/js/328.d59c1a19.chunk.js',
            '/static/js/337.b192afcf.chunk.js',
            '/static/js/374.7c6f9fa8.chunk.js',
            '/static/js/374.a2312b7f.chunk.js',
            '/static/js/380.0aff80ba.chunk.js',
            '/static/js/401.34c00ed1.chunk.js',
            '/static/js/486.d74b90a0.chunk.js',
            '/static/js/496.4dc82b60.chunk.js',
            '/static/js/543.81062044.chunk.js',
            '/static/js/574.b97d20e8.chunk.js',
            '/static/js/574.cb1f5ba3.chunk.js',
            '/static/js/583.dbd8e2d3.chunk.js',
            '/static/js/614.3b240050.chunk.js',
            '/static/js/683.4eec73d4.chunk.js',
            '/static/js/686.3965d418.chunk.js',
            '/static/js/686.a257eac4.chunk.js',
            '/static/js/696.17c52a70.chunk.js',
            '/static/js/769.ee09ff22.chunk.js',
            '/static/js/770.bf22e9d7.chunk.js',
            '/static/js/812.2b4a2700.chunk.js',
            '/static/js/826.f038031b.chunk.js',
            '/static/js/940.110794b5.chunk.js',
            '/static/js/942.03e09423.chunk.js',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });