import{a as S,S as q,i as n}from"./assets/vendor-CrlV4O_2.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const P="https://pixabay.com/api/",R="50047920-024bf2fadca75537663b51516";async function p(s,e=1,r=15){const i={key:R,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:r};try{return(await S.get(P,{params:i})).data}catch{throw new Error("Failed to fetch images")}}const y=document.querySelector(".gallery"),g=document.querySelector(".loader"),b=document.querySelector(".load-more-btn");let B=new q(".gallery a",{captionsData:"alt",captionDelay:250});function w(s){const e=s.map(r=>{const i=r.tags.split(",")[0];return`
        <li class="gallery-item">
          <a class="gallery-link" href="${r.largeImageURL}">
            <img
              class="gallery-image"
              src="${r.webformatURL}"
              alt="${i}"
              loading="lazy"
            />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${r.likes}</p>
            <p><b>Views:</b> ${r.views}</p>
            <p><b>Comments:</b> ${r.comments}</p>
            <p><b>Downloads:</b> ${r.downloads}</p>
           
          </div>
      
        </li>
      `}).join("");y.insertAdjacentHTML("beforeend",e),B.refresh()}function M(){y.innerHTML=""}function L(){g.classList.remove("is-hidden")}function v(){g.classList.add("is-hidden")}function $(){b.classList.remove("is-hidden")}function l(){b.classList.add("is-hidden")}const h=document.querySelector(".form");document.querySelector(".gallery");const f=document.querySelector(".load-more-btn");let d=0,c="",a=1;const A=15;let m=0;l();h.addEventListener("submit",async s=>{if(s.preventDefault(),c=s.target.elements["search-text"].value.trim(),!c){n.warning({message:"Please enter a search query",position:"topRight"});return}a=1,M(),l(),L();try{const e=await p(c,a);if(m=e.totalHits,d=Math.ceil(m/A),e.hits.length===0){n.info({message:"Sorry, there are no images matching<br> your search query. Please try again!",position:"topRight",backgroundColor:"#ff6b6b",color:"white"});return}w(e.hits),d>1?$():l(),h.reset()}catch(e){n.error({message:"An error occurred while fetching data. Try again later.",position:"topRight"}),console.error(e)}finally{await new Promise(e=>setTimeout(e,1e3)),v()}});f.addEventListener("click",async()=>{var s;f.classList.add("is-hidden"),L(),a+=1;try{const e=await p(c,a);w(e.hits),a>=d&&(l(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3}));const r=((s=document.querySelector(".gallery-item"))==null?void 0:s.getBoundingClientRect().height)||0;window.scrollBy({top:r*2,behavior:"smooth"})}catch(e){n.error({message:"An error occurred while loading more images.",position:"topRight"}),console.error(e)}finally{await new Promise(e=>setTimeout(e,1e3)),v(),a<d&&f.classList.remove("is-hidden")}});
//# sourceMappingURL=index.js.map
