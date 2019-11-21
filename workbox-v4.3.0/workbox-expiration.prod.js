this.workbox=this.workbox||{},this.workbox.expiration=function(t,e,s,i,a,n){"use strict";try{self["workbox:expiration:4.3.0"]&&_()}catch(t){}const h="workbox-expiration",c="cache-entries",r=t=>{const e=new URL(t,location);return e.hash="",e.href};class o{constructor(t){this.t=t,this.s=new e.DBWrapper(h,1,{onupgradeneeded:t=>this.i(t)})}i(t){const e=t.target.result.createObjectStore(c,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1}),s.deleteDatabase(this.t)}async setTimestamp(t,e){t=r(t),await this.s.put(c,{url:t,timestamp:e,cacheName:this.t,id:this.h(t)})}async getTimestamp(t){return(await this.s.get(c,this.h(t))).timestamp}async expireEntries(t,e){const s=await this.s.transaction(c,"readwrite",(s,i)=>{const a=s.objectStore(c),n=[];let h=0;a.index("timestamp").openCursor(null,"prev").onsuccess=(({target:s})=>{const a=s.result;if(a){const s=a.value;s.cacheName===this.t&&(t&&s.timestamp<t||e&&h>=e?n.push(a.value):h++),a.continue()}else i(n)})}),i=[];for(const t of s)await this.s.delete(c,t.id),i.push(t.url);return i}h(t){return this.t+"|"+r(t)}}class u{constructor(t,e={}){this.o=!1,this.u=!1,this.l=e.maxEntries,this.p=e.maxAgeSeconds,this.t=t,this.m=new o(t)}async expireEntries(){if(this.o)return void(this.u=!0);this.o=!0;const t=this.p?Date.now()-1e3*this.p:void 0,e=await this.m.expireEntries(t,this.l),s=await caches.open(this.t);for(const t of e)await s.delete(t);this.o=!1,this.u&&(this.u=!1,this.expireEntries())}async updateTimestamp(t){await this.m.setTimestamp(t,Date.now())}async isURLExpired(t){return await this.m.getTimestamp(t)<Date.now()-1e3*this.p}async delete(){this.u=!1,await this.m.expireEntries(1/0)}}return t.CacheExpiration=u,t.Plugin=class{constructor(t={}){this.D=t,this.p=t.maxAgeSeconds,this.g=new Map,t.purgeOnQuotaError&&n.registerQuotaErrorCallback(()=>this.deleteCacheAndMetadata())}k(t){if(t===a.cacheNames.getRuntimeName())throw new i.WorkboxError("expire-custom-caches-only");let e=this.g.get(t);return e||(e=new u(t,this.D),this.g.set(t,e)),e}cachedResponseWillBeUsed({event:t,request:e,cacheName:s,cachedResponse:i}){if(!i)return null;let a=this.N(i);const n=this.k(s);n.expireEntries();const h=n.updateTimestamp(e.url);if(t)try{t.waitUntil(h)}catch(t){}return a?i:null}N(t){if(!this.p)return!0;const e=this._(t);return null===e||e>=Date.now()-1e3*this.p}_(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async cacheDidUpdate({cacheName:t,request:e}){const s=this.k(t);await s.updateTimestamp(e.url),await s.expireEntries()}async deleteCacheAndMetadata(){for(const[t,e]of this.g)await caches.delete(t),await e.delete();this.g=new Map}},t}({},workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core);
//# sourceMappingURL=workbox-expiration.prod.js.map