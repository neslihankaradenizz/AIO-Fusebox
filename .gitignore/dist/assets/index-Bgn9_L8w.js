(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();async function ry(e,t={}){const r={video:{width:{ideal:t.width??640},height:{ideal:t.height??480},facingMode:t.facingMode??"environment"},audio:!1};let i;try{i=await navigator.mediaDevices.getUserMedia(r)}catch{i=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1})}return e.srcObject=i,await new Promise((a,n)=>{e.onloadedmetadata=a,e.onerror=n}),await e.play(),i}/*!
 * ONNX Runtime Web v1.24.3
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Ka=Object.defineProperty,iy=Object.getOwnPropertyDescriptor,ay=Object.getOwnPropertyNames,ny=Object.prototype.hasOwnProperty,sy=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),U=(e,t)=>()=>(e&&(t=e(e=0)),t),Kt=(e,t)=>{for(var r in t)Ka(e,r,{get:t[r],enumerable:!0})},oy=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of ay(t))!ny.call(e,a)&&a!==r&&Ka(e,a,{get:()=>t[a],enumerable:!(i=iy(t,a))||i.enumerable});return e},gr=e=>oy(Ka({},"__esModule",{value:!0}),e),Jt,ft,Lt,xo,ip,ap=U(()=>{Jt=new Map,ft=[],Lt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=Jt.get(e);if(i===void 0)Jt.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=ft.indexOf(e);a!==-1&&ft.splice(a,1);for(let n=0;n<ft.length;n++)if(Jt.get(ft[n]).priority<=r){ft.splice(n,0,e);return}ft.push(e)}return}throw new TypeError("not a valid backend")},xo=async e=>{let t=Jt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},ip=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?ft:r,a,n=[],s=new Set;for(let l of i){let p=await xo(l);typeof p=="string"?n.push({name:l,err:p}):(a||(a=p),a===p&&s.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${n.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of n)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,p)=>p==="executionProviders"?u:Reflect.get(l,p)})]}}),uy=U(()=>{ap()}),np,ly=U(()=>{np="1.24.3"}),Ai,Te,sp=U(()=>{ly(),Ai="warning",Te={wasm:{},webgl:{},webgpu:{},versions:{common:np},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ai=e}},get logLevel(){return Ai}},Object.defineProperty(Te,"logLevel",{enumerable:!0})}),me,dy=U(()=>{sp(),me=Te}),op,up,py=U(()=>{op=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let f=n*a,h=0,g=f,y=f*2,_=-1;s==="RGBA"?(h=0,g=f,y=f*2,_=f*3):s==="RGB"?(h=0,g=f,y=f*2):s==="RBG"&&(h=0,y=f,g=f*2);for(let b=0;b<n;b++)for(let k=0;k<a;k++){let x=(e.data[h++]-p[0])*l[0],w=(e.data[g++]-p[1])*l[1],I=(e.data[y++]-p[2])*l[2],S=_===-1?255:(e.data[_++]-p[3])*l[3];i.fillStyle="rgba("+x+","+w+","+I+","+S+")",i.fillRect(k,b,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},up=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,f;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?f=[0,0,0,0]:typeof l.bias=="number"?f=[l.bias,l.bias,l.bias,l.bias]:(f=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(f[3]=l.bias[3]));let h=n*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,y=0,_=1,b=2,k=3,x=0,w=h,I=h*2,S=-1;u==="RGBA"?(x=0,w=h,I=h*2,S=h*3):u==="RGB"?(x=0,w=h,I=h*2):u==="RBG"&&(x=0,I=h,w=h*2),i=r.createImageData(a,n);for(let E=0;E<n*a;y+=g,_+=g,b+=g,k+=g,E++)i.data[y]=(e.data[x++]-f[0])*p[0],i.data[_]=(e.data[w++]-f[1])*p[1],i.data[b]=(e.data[I++]-f[2])*p[2],i.data[k]=S===-1?255:(e.data[S++]-f[3])*p[3]}else throw new Error("Can not access image data");return i}}),Or,lp,dp,pp,cp,hp,cy=U(()=>{Za(),Or=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},n,s;typeof a.mean=="number"?n=[a.mean,a.mean,a.mean,a.mean]:n=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*i,f=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),h=4,g=0,y=1,_=2,b=3,k=0,x=p,w=p*2,I=-1;u==="RGB"&&(h=3,g=0,y=1,_=2,b=-1),l==="RGBA"?I=p*3:l==="RBG"?(k=0,w=p,x=p*2):l==="BGR"&&(w=0,x=p,k=p*2);for(let S=0;S<p;S++,g+=h,_+=h,y+=h,b+=h)f[k++]=(e[g]+s[0])/n[0],f[x++]=(e[y]+s[1])/n[1],f[w++]=(e[_]+s[2])/n[2],I!==-1&&b!==-1&&(f[I++]=(e[b]+s[3])/n[3]);return l==="RGBA"?new Ne("float32",f,[1,4,r,i]):new Ne("float32",f,[1,3,r,i])},lp=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let g=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=y}else u.tensorFormat="RGBA",u.height=g,u.width=y;h.drawImage(e,0,0),s=h.getImageData(0,0,y,g).data}else throw new Error("Can not access image data")}else if(i){let f,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,h=t.resizedWidth):(f=e.height,h=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=f,u.width=h,t!==void 0){let g=l();g.width=h,g.height=f;let y=p(g);if(y!=null)y.putImageData(e,0,0),s=y.getImageData(0,0,h,f).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let g=e.height,y=e.width;return h.drawImage(e,0,0,y,g),s=h.getImageData(0,0,y,g).data,u.height=g,u.width=y,Or(s,u)}else throw new Error("Can not access image data")}else{if(n)return new Promise((f,h)=>{let g=l(),y=p(g);if(!e||!y)return h();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{g.width=_.width,g.height=_.height,y.drawImage(_,0,0,g.width,g.height);let b=y.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,f(Or(b.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Or(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},dp=(e,t)=>{let{width:r,height:i,download:a,dispose:n}=t,s=[1,i,r,4];return new Ne({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:n})},pp=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Ne({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:n})},cp=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Ne({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:n})},hp=(e,t,r)=>new Ne({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Tt,dr,Oi,fp,hy=U(()=>{Tt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),dr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Oi=!1,fp=()=>{if(!Oi){Oi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Tt.set("int64",BigInt64Array),dr.set(BigInt64Array,"int64")),t&&(Tt.set("uint64",BigUint64Array),dr.set(BigUint64Array,"uint64")),i?(Tt.set("float16",r),dr.set(r,"float16")):Tt.set("float16",Uint16Array)}}}),mp,gp,fy=U(()=>{Za(),mp=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},gp=(e,t)=>{switch(e.location){case"cpu":return new Ne(e.type,e.data,t);case"cpu-pinned":return new Ne({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ne({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ne({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ne({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ne,Za=U(()=>{py(),cy(),hy(),fy(),Ne=class{constructor(e,t,r){fp();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=Tt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=Tt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",s=e;else if(l==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let l=dr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=s,this.dataLocation="cpu"}let n=mp(a);if(this.cpuData&&n!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(n/2)===this.cpuData.length))throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=n}static async fromImage(e,t){return lp(e,t)}static fromTexture(e,t){return dp(e,t)}static fromGpuBuffer(e,t){return pp(e,t)}static fromMLTensor(e,t){return cp(e,t)}static fromPinnedBuffer(e,t,r){return hp(e,t,r)}toDataURL(e){return op(this,e)}toImageData(e){return up(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return gp(this,e)}}}),tt,yp=U(()=>{Za(),tt=Ne}),Xr,Ri,rt,Ze,Ct,At,_p=U(()=>{sp(),Xr=(e,t)=>{(typeof Te.trace>"u"?!Te.wasm.trace:!Te.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ri=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let n=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(n+=`::${t}`),Xr("CPU",n);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},rt=e=>{(typeof Te.trace>"u"?!Te.wasm.trace:!Te.trace)||Ri("BEGIN",e)},Ze=e=>{(typeof Te.trace>"u"?!Te.wasm.trace:!Te.trace)||Ri("END",e)},Ct=e=>{(typeof Te.trace>"u"?!Te.wasm.trace:!Te.trace)||console.time(`ORT::${e}`)},At=e=>{(typeof Te.trace>"u"?!Te.wasm.trace:!Te.trace)||console.timeEnd(`ORT::${e}`)}}),wp,my=U(()=>{ap(),yp(),_p(),wp=class bp{constructor(t){this.handler=t}async run(t,r,i){rt(),Ct("InferenceSession.run");let a={},n={};if(typeof t!="object"||t===null||t instanceof tt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof tt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);a[p]=null}if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,f=Object.getOwnPropertyNames(r);for(let h of this.outputNames)if(f.indexOf(h)!==-1){let g=r[h];(g===null||g instanceof tt)&&(p=!0,s=!1,a[h]=g)}if(p){if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else n=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)a[p]=null;let u=await this.handler.run(t,a,n),l={};for(let p in u)if(Object.hasOwnProperty.call(u,p)){let f=u[p];f instanceof tt?l[p]=f:l[p]=new tt(f.type,f.data,f.dims)}return At("InferenceSession.run"),Ze(),l}async release(){return this.handler.dispose()}static async create(t,r,i,a){rt(),Ct("InferenceSession.create");let n,s={};if(typeof t=="string"){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,h=0,g=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(h=r,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(g=t.byteLength-h,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||h+g>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-h}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(f,h,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await ip(s),p=await u.createInferenceSessionHandler(n,l);return At("InferenceSession.create"),Ze(),new bp(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Qa,gy=U(()=>{my(),Qa=wp}),yy=U(()=>{}),_y=U(()=>{}),wy=U(()=>{}),by=U(()=>{}),$y={};Kt($y,{InferenceSession:()=>Qa,TRACE:()=>Xr,TRACE_EVENT_BEGIN:()=>Ct,TRACE_EVENT_END:()=>At,TRACE_FUNC_BEGIN:()=>rt,TRACE_FUNC_END:()=>Ze,Tensor:()=>tt,env:()=>me,registerBackend:()=>Lt});var We=U(()=>{uy(),dy(),gy(),yp(),yy(),_y(),_p(),wy(),by()}),Ya=U(()=>{}),$p={};Kt($p,{default:()=>vp});var Bi,Ni,vp,vy=U(()=>{Ef(),Dt(),Xa(),Bi="ort-wasm-proxy-worker",Ni=globalThis.self?.name===Bi,Ni&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Ja(r.wasm).then(()=>{yn(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;_n(a,i).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})});break}case"copy-from":{let{buffer:i}=r,a=ni(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;wn(i,a).then(n=>{postMessage({type:t,out:n})},n=>{postMessage({type:t,err:n})});break}case"release":bn(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:n,outputIndices:s,options:u}=r;$n(i,a,n,s,new Array(s.length).fill(null),u).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},xn([...n,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":vn(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),vp=Ni?null:e=>new Worker(e??Be,{type:"module",name:Bi})}),xp={};Kt(xp,{default:()=>Sp});async function So(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,a=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(o,d)=>{o.startsWith("./")&&(o=o.substring(2)),(t.Zc||(t.Zc=new Map)).set(o,d)},t.unmountExternalData=()=>{delete t.Zc},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,ae:!0}).buffer.constructor;let n=o=>async(...d)=>{try{if(t.$c)throw Error("Session already started");let m=t.$c={Nd:d[0],errors:[]},c=await o(...d);if(t.$c!==m)throw Error("Session mismatch");t.gd?.flush();let $=m.errors;if(0<$.length){let T=await Promise.all($);if(T=T.filter(z=>z),0<T.length)throw Error(T.join(`
`))}return c}finally{t.$c=null}};t.jsepInit=(o,d)=>{if(o==="webgpu"){[t.gd,t.Dd,t.Hd,t.jd,t.Gd,t.ac,t.Id,t.Kd,t.Ed,t.Fd,t.Jd]=d;let m=t.gd;t.jsepRegisterBuffer=(c,$,T,z)=>m.registerBuffer(c,$,T,z),t.jsepGetBuffer=c=>m.getBuffer(c),t.jsepCreateDownloader=(c,$,T)=>m.createDownloader(c,$,T),t.jsepOnCreateSession=c=>{m.onCreateSession(c)},t.jsepOnReleaseSession=c=>{m.onReleaseSession(c)},t.jsepOnRunStart=c=>m.onRunStart(c),t.Ld=(c,$)=>{m.upload(c,$)}}else if(o==="webnn"){let m=d[0];[t.Zd,t.vd,t.webnnEnsureTensor,t.xd,t.webnnDownloadTensor,t.Yd,t.webnnEnableTraceEvent]=d.slice(1),t.webnnReleaseTensorId=t.vd,t.webnnUploadTensor=t.xd,t.webnnRegisterMLContext=t.Yd,t.webnnOnRunStart=c=>m.onRunStart(c),t.webnnOnRunEnd=m.onRunEnd.bind(m),t.webnnOnReleaseSession=c=>{m.onReleaseSession(c)},t.webnnCreateMLTensorDownloader=(c,$)=>m.createMLTensorDownloader(c,$),t.webnnRegisterMLTensor=(c,$,T,z)=>m.registerMLTensor(c,$,T,z),t.webnnCreateMLContext=c=>m.createMLContext(c),t.webnnRegisterMLConstant=(c,$,T,z,B,W)=>m.registerMLConstant(c,$,T,z,B,t.Zc,W),t.webnnRegisterGraphInput=m.registerGraphInput.bind(m),t.webnnIsGraphInput=m.isGraphInput.bind(m),t.webnnRegisterGraphOutput=m.registerGraphOutput.bind(m),t.webnnIsGraphOutput=m.isGraphOutput.bind(m),t.webnnCreateTemporaryTensor=m.createTemporaryTensor.bind(m),t.webnnIsGraphInputOutputTypeSupported=m.isGraphInputOutputTypeSupported.bind(m)}};let s=()=>{let o=d=>(...m)=>{let c=Xe;return m=d(...m),Xe!=c?new Promise(($,T)=>{_i={resolve:$,reject:T}}):m};(()=>{for(let d of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[d]=o(t[d])})(),n!==void 0&&(t._OrtRun=n(t._OrtRun),t._OrtRunWithBinding=n(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var u,l,p=(o,d)=>{throw d},f=import.meta.url,h="";if(r||i){try{h=new URL(".",f).href}catch{}i&&(l=o=>{var d=new XMLHttpRequest;return d.open("GET",o,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),u=async o=>{if(A(o))return new Promise((m,c)=>{var $=new XMLHttpRequest;$.open("GET",o,!0),$.responseType="arraybuffer",$.onload=()=>{$.status==200||$.status==0&&$.response?m($.response):c($.status)},$.onerror=c,$.send(null)});var d=await fetch(o,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var g,y,_,b,k,x,w=console.log.bind(console),I=console.error.bind(console),S=w,E=I,C=!1,A=o=>o.startsWith("file://");function v(){dt.buffer!=q.buffer&&L()}if(a){let o=function(d){try{var m=d.data,c=m.Uc;if(c==="load"){let $=[];self.onmessage=T=>$.push(T),x=()=>{postMessage({Uc:"loaded"});for(let T of $)o(T);self.onmessage=o};for(let T of m.Ad)t[T]&&!t[T].proxy||(t[T]=(...z)=>{postMessage({Uc:"callHandler",zd:T,args:z})},T=="print"&&(S=t[T]),T=="printErr"&&(E=t[T]));dt=m.Vd,L(),y=m.Wd,Re(),Ar()}else if(c==="run"){(function($){var T=(v(),D)[$+52>>>2>>>0];$=(v(),D)[$+56>>>2>>>0],As(T,T-$),ne(T)})(m.Tc),xi(m.Tc,0,0,1,0,0),On(),mi(m.Tc),P||(ks(),P=!0);try{jf(m.Pd,m.dd)}catch($){if($!="unwind")throw $}}else m.target!=="setimmediate"&&(c==="checkMailbox"?P&&Sr():c&&(E(`worker: received unknown command ${c}`),E(m)))}catch($){throw Ts(),$}};var P=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=o}var q,Y,H,Z,R,D,G,ee,Q,X,de,M=!1;function L(){var o=dt.buffer;t.HEAP8=q=new Int8Array(o),H=new Int16Array(o),t.HEAPU8=Y=new Uint8Array(o),Z=new Uint16Array(o),t.HEAP32=R=new Int32Array(o),t.HEAPU32=D=new Uint32Array(o),G=new Float32Array(o),ee=new Float64Array(o),Q=new BigInt64Array(o),X=new BigUint64Array(o)}function te(){M=!0,a?x():at.tb()}function oe(o){throw E(o="Aborted("+o+")"),C=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),k?.(o),o}function Ae(){return{a:{ma:gg,hb:mg,g:Kf,J:Zf,f:Qf,o:Yf,h:Xf,ha:Jf,b:em,T:tm,Ia:Pn,n:rm,_:Ln,Ya:Vn,Ea:Gn,Ga:Hn,Za:Fn,Wa:jn,Pa:Kn,Va:Zn,ka:Qn,Fa:Yn,Ca:Xn,Xa:Jn,Da:es,cb:im,ea:am,xa:nm,va:om,da:lm,O:dm,H:pm,wa:cm,Z:wm,ya:bm,Sa:$m,Aa:xm,Ja:Sm,ta:km,fa:Tm,Ra:mi,$a:Im,R:Am,s:Mm,c:hi,ib:Dm,y:Pm,M:Um,D:qm,m:Wm,t:us,jb:Lm,I:Vm,S:Gm,j:Hm,v:Fm,r:jm,l:Km,Ma:Zm,Na:Qm,Oa:Ym,Ka:cs,La:hs,ua:fs,eb:Jm,bb:tg,u:rg,aa:ig,ga:ag,ab:eg,V:ng,_a:sg,Ba:og,F:Xm,U:ug,la:zr,za:dg,gb:lg,fb:pg,Ta:_s,Ua:ws,Ha:ui,$:bs,ja:$s,Qa:vs,ia:xs,lb:Jg,na:Fg,mb:Xg,oa:Hg,G:Mg,d:bg,q:_g,w:yg,B:Cg,pb:Lg,K:Rg,x:vg,pa:Vg,X:jg,ba:Wg,nb:Yg,ob:Qg,ra:Dg,qa:qg,qb:Pg,N:Bg,Y:Gg,e:$g,A:xg,k:wg,kb:ey,p:kg,z:Tg,C:Sg,E:Ig,L:Ag,rb:Ng,Q:Kg,ca:Og,W:Zg,sb:zg,sa:Eg,P:Ug,i:hg,a:dt,db:oi}}}async function Re(){function o(c,$){var T=at=c.exports;c={};for(let[z,B]of Object.entries(T))typeof B=="function"?(T=Em(B),c[z]=T):c[z]=B;return at=c,at=function(){var z=at,B=V=>ae=>V(ae)>>>0,W=V=>()=>V()>>>0;return(z=Object.assign({},z)).ub=B(z.ub),z.Yb=W(z.Yb),z._b=B(z._b),z.mc=B(z.mc),z.nc=W(z.nc),z.rc=B(z.rc),z}(),Cn.push(at.$b),Ss=(c=at).ub,ks=c.vb,t._OrtInit=c.wb,t._OrtGetLastError=c.xb,t._OrtCreateSessionOptions=c.yb,t._OrtAppendExecutionProvider=c.zb,t._OrtAddFreeDimensionOverride=c.Ab,t._OrtAddSessionConfigEntry=c.Bb,t._OrtReleaseSessionOptions=c.Cb,t._OrtCreateSession=c.Db,t._OrtReleaseSession=c.Eb,t._OrtGetInputOutputCount=c.Fb,t._OrtGetInputOutputMetadata=c.Gb,t._OrtFree=c.Hb,t._OrtCreateTensor=c.Ib,t._OrtGetTensorData=c.Jb,t._OrtReleaseTensor=c.Kb,t._OrtCreateRunOptions=c.Lb,t._OrtAddRunConfigEntry=c.Mb,t._OrtReleaseRunOptions=c.Nb,t._OrtCreateBinding=c.Ob,t._OrtBindInput=c.Pb,t._OrtBindOutput=c.Qb,t._OrtClearBoundOutputs=c.Rb,t._OrtReleaseBinding=c.Sb,t._OrtRunWithBinding=c.Tb,t._OrtRun=c.Ub,t._OrtEndProfiling=c.Vb,t._JsepOutput=c.Wb,t._JsepGetNodeName=c.Xb,Cr=c.Yb,Je=t._free=c.Zb,Yt=t._malloc=c._b,xi=c.bc,Ts=c.cc,Is=c.dc,Es=c.ec,Si=c.fc,zs=c.gc,Cs=c.hc,ue=c.ic,Xt=c.jc,As=c.kc,ne=c.lc,ki=c.mc,se=c.nc,Os=c.oc,Ti=c.pc,Rs=c.qc,Bs=c.rc,Ns=c.sc,Ii=c.tc,Ms=c.uc,Ds=c.vc,Ps=c.wc,Us=c.xc,qs=c.yc,Ws=c.zc,Ls=c.Ac,Vs=c.Bc,Gs=c.Cc,Hs=c.Dc,Fs=c.Ec,js=c.Fc,Ks=c.Gc,Zs=c.Hc,Qs=c.Ic,Ys=c.Jc,Xs=c.Kc,Js=c.Lc,eo=c.Mc,to=c.Nc,ro=c.Oc,io=c.Pc,ao=c.Rc,no=c.Sc,so=c.bd,oo=c.cd,uo=c.hd,lo=c.kd,po=c.ld,co=c.md,ho=c.nd,fo=c.od,mo=c.pd,go=c.qd,yo=c.rd,_o=c.wd,wo=c.Rd,bo=c.Sd,$o=c.Td,vo=c.Ud,y=$,at}var d,m=Ae();return t.instantiateWasm?new Promise(c=>{t.instantiateWasm(m,($,T)=>{c(o($,T))})}):a?o(new WebAssembly.Instance(y,Ae()),y):(de??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",h):h+"ort-wasm-simd-threaded.jsep.wasm":new URL("/assets/ort-wasm-simd-threaded.jsep-C887KxcQ.wasm",import.meta.url).href,d=await async function(c){var $=de;if(!g&&!A($))try{var T=fetch($,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(T,c)}catch(z){E(`wasm streaming compile failed: ${z}`),E("falling back to ArrayBuffer instantiation")}return async function(z,B){try{var W=await async function(V){if(!g)try{var ae=await u(V);return new Uint8Array(ae)}catch{}if(V==de&&g)V=new Uint8Array(g);else{if(!l)throw"both async and sync fetching of the wasm failed";V=l(V)}return V}(z);return await WebAssembly.instantiate(W,B)}catch(V){E(`failed to asynchronously prepare wasm: ${V}`),oe(V)}}($,c)}(m),o(d.instance,d.module))}class Pe{name="ExitStatus";constructor(d){this.message=`Program terminated with exit(${d})`,this.status=d}}var ut=o=>{o.terminate(),o.onmessage=()=>{}},xe=[],we=0,ze=null,wr=o=>{lt.length==0&&(Bn(),Rn(lt[0]));var d=lt.pop();if(!d)return 6;Zt.push(d),wt[o.Tc]=d,d.Tc=o.Tc;var m={Uc:"run",Pd:o.Od,dd:o.dd,Tc:o.Tc};return d.postMessage(m,o.ud),0},Qe=0,be=(o,d,...m)=>{var c,$=16*m.length,T=se(),z=ki($),B=z>>>3;for(c of m)typeof c=="bigint"?((v(),Q)[B++>>>0]=1n,(v(),Q)[B++>>>0]=c):((v(),Q)[B++>>>0]=0n,(v(),ee)[B++>>>0]=c);return o=Is(o,0,$,z,d),ne(T),o};function oi(o){if(a)return be(0,1,o);if(_=o,!(0<Qe)){for(var d of Zt)ut(d);for(d of lt)ut(d);lt=[],Zt=[],wt={},C=!0}p(0,new Pe(o))}function zn(o){if(a)return be(1,0,o);ui(o)}var ui=o=>{if(_=o,a)throw zn(o),"unwind";oi(o)},lt=[],Zt=[],Cn=[],wt={},An=o=>{var d=o.Tc;delete wt[d],lt.push(o),Zt.splice(Zt.indexOf(o),1),o.Tc=0,Es(d)};function On(){Cn.forEach(o=>o())}var Rn=o=>new Promise(d=>{o.onmessage=$=>{var T=$.data;if($=T.Uc,T.ad&&T.ad!=Cr()){var z=wt[T.ad];z?z.postMessage(T,T.ud):E(`Internal error! Worker sent a message "${$}" to target pthread ${T.ad}, but that thread no longer exists!`)}else $==="checkMailbox"?Sr():$==="spawnThread"?wr(T):$==="cleanupThread"?xr(()=>{An(wt[T.Qd])}):$==="loaded"?(o.loaded=!0,d(o)):T.target==="setimmediate"?o.postMessage(T):$==="uncaughtException"?o.onerror(T.error):$==="callHandler"?t[T.zd](...T.args):$&&E(`worker sent an unknown command ${$}`)},o.onerror=$=>{throw E(`worker sent an error! ${$.filename}:${$.lineno}: ${$.message}`),$};var m,c=[];for(m of[])t.propertyIsEnumerable(m)&&c.push(m);o.postMessage({Uc:"load",Ad:c,Vd:dt,Wd:y})});function Bn(){var o=new Worker((()=>{let d=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new d("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});lt.push(o)}var dt,jf=(o,d)=>{Qe=0,o=Ii(o,d),0<Qe?_=o:Si(o)},br=[],$r=0;function Kf(o){var d=new li(o>>>=0);return(v(),q)[d.Vc+12>>>0]==0&&(Nn(d,!0),$r--),Mn(d,!1),br.push(d),Bs(o)}var Ut=0,Zf=()=>{ue(0,0);var o=br.pop();Os(o.ed),Ut=0};function Nn(o,d){d=d?1:0,(v(),q)[o.Vc+12>>>0]=d}function Mn(o,d){d=d?1:0,(v(),q)[o.Vc+13>>>0]=d}class li{constructor(d){this.ed=d,this.Vc=d-24}}var di=o=>{var d=Ut;if(!d)return Xt(0),0;var m=new li(d);(v(),D)[m.Vc+16>>>2>>>0]=d;var c=(v(),D)[m.Vc+4>>>2>>>0];if(!c)return Xt(0),d;for(var $ of o){if($===0||$===c)break;if(Rs($,c,m.Vc+16))return Xt($),d}return Xt(c),d};function Qf(){return di([])}function Yf(o){return di([o>>>0])}function Xf(o,d,m,c){return di([o>>>0,d>>>0,m>>>0,c>>>0])}var Jf=()=>{var o=br.pop();o||oe("no exception to throw");var d=o.ed;throw(v(),q)[o.Vc+13>>>0]==0&&(br.push(o),Mn(o,!0),Nn(o,!1),$r++),Ti(d),Ut=d};function em(o,d,m){var c=new li(o>>>=0);throw d>>>=0,m>>>=0,(v(),D)[c.Vc+16>>>2>>>0]=0,(v(),D)[c.Vc+4>>>2>>>0]=d,(v(),D)[c.Vc+8>>>2>>>0]=m,Ti(o),$r++,Ut=o}var tm=()=>$r;function Dn(o,d,m,c){return a?be(2,1,o,d,m,c):Pn(o,d,m,c)}function Pn(o,d,m,c){if(o>>>=0,d>>>=0,m>>>=0,c>>>=0,!globalThis.SharedArrayBuffer)return 6;var $=[];return a&&$.length===0?Dn(o,d,m,c):(o={Od:m,Tc:o,dd:c,ud:$},a?(o.Uc="spawnThread",postMessage(o,$),0):wr(o))}function rm(o){throw Ut||=o>>>0,Ut}var Un=globalThis.TextDecoder&&new TextDecoder,qn=(o,d,m,c)=>{if(m=d+m,c)return m;for(;o[d]&&!(d>=m);)++d;return d},Wn=(o,d=0,m,c)=>{if(16<(m=qn(o,d>>>=0,m,c))-d&&o.buffer&&Un)return Un.decode(o.buffer instanceof ArrayBuffer?o.subarray(d,m):o.slice(d,m));for(c="";d<m;){var $=o[d++];if(128&$){var T=63&o[d++];if((224&$)==192)c+=String.fromCharCode((31&$)<<6|T);else{var z=63&o[d++];65536>($=(240&$)==224?(15&$)<<12|T<<6|z:(7&$)<<18|T<<12|z<<6|63&o[d++])?c+=String.fromCharCode($):($-=65536,c+=String.fromCharCode(55296|$>>10,56320|1023&$))}}else c+=String.fromCharCode($)}return c},Se=(o,d,m)=>(o>>>=0)?Wn((v(),Y),o,d,m):"";function Ln(o,d,m){return a?be(3,1,o,d,m):0}function Vn(o,d){if(a)return be(4,1,o,d)}function Gn(o,d){if(a)return be(5,1,o,d)}function Hn(o,d,m){if(a)return be(6,1,o,d,m)}function Fn(o,d,m){return a?be(7,1,o,d,m):0}function jn(o,d){if(a)return be(8,1,o,d)}function Kn(o,d,m){if(a)return be(9,1,o,d,m)}function Zn(o,d,m,c){if(a)return be(10,1,o,d,m,c)}function Qn(o,d,m,c){if(a)return be(11,1,o,d,m,c)}function Yn(o,d,m,c){if(a)return be(12,1,o,d,m,c)}function Xn(o){if(a)return be(13,1,o)}function Jn(o,d){if(a)return be(14,1,o,d)}function es(o,d,m){if(a)return be(15,1,o,d,m)}var im=()=>oe(""),Ye=o=>{o>>>=0;for(var d="";;){var m=(v(),Y)[o++>>>0];if(!m)return d;d+=String.fromCharCode(m)}},pi={},ci={},qt=class extends Error{constructor(o){super(o),this.name="BindingError"}};function it(o,d,m={}){return function(c,$,T={}){var z=$.name;if(!c)throw new qt(`type "${z}" must have a positive integer typeid pointer`);if(ci.hasOwnProperty(c)){if(T.Bd)return;throw new qt(`Cannot register type '${z}' twice`)}ci[c]=$,pi.hasOwnProperty(c)&&($=pi[c],delete pi[c],$.forEach(B=>B()))}(o,d,m)}var ts=(o,d,m)=>{switch(d){case 1:return m?c=>(v(),q)[c>>>0]:c=>(v(),Y)[c>>>0];case 2:return m?c=>(v(),H)[c>>>1>>>0]:c=>(v(),Z)[c>>>1>>>0];case 4:return m?c=>(v(),R)[c>>>2>>>0]:c=>(v(),D)[c>>>2>>>0];case 8:return m?c=>(v(),Q)[c>>>3>>>0]:c=>(v(),X)[c>>>3>>>0];default:throw new TypeError(`invalid integer width (${d}): ${o}`)}};function am(o,d,m,c,$){o>>>=0,m>>>=0,d=Ye(d>>>0);let T=z=>z;if(c=c===0n){let z=8*m;T=B=>BigInt.asUintN(z,B),$=T($)}it(o,{name:d,Qc:T,Xc:(z,B)=>(typeof B=="number"&&(B=BigInt(B)),B),Wc:ts(d,m,!c),Yc:null})}function nm(o,d,m,c){it(o>>>=0,{name:d=Ye(d>>>0),Qc:function($){return!!$},Xc:function($,T){return T?m:c},Wc:function($){return this.Qc((v(),Y)[$>>>0])},Yc:null})}var rs=[],bt=[0,1,,1,null,1,!0,1,!1,1];function hi(o){9<(o>>>=0)&&--bt[o+1]==0&&(bt[o]=void 0,rs.push(o))}var Ue=o=>{if(!o)throw new qt(`Cannot use deleted val. handle = ${o}`);return bt[o]},Le=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=rs.pop()||bt.length;return bt[d]=o,bt[d+1]=1,d}};function fi(o){return this.Qc((v(),D)[o>>>2>>>0])}var sm={name:"emscripten::val",Qc:o=>{var d=Ue(o);return hi(o),d},Xc:(o,d)=>Le(d),Wc:fi,Yc:null};function om(o){return it(o>>>0,sm)}var um=(o,d)=>{switch(d){case 4:return function(m){return this.Qc((v(),G)[m>>>2>>>0])};case 8:return function(m){return this.Qc((v(),ee)[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${o}`)}};function lm(o,d,m){m>>>=0,it(o>>>=0,{name:d=Ye(d>>>0),Qc:c=>c,Xc:(c,$)=>$,Wc:um(d,m),Yc:null})}function dm(o,d,m,c,$){o>>>=0,m>>>=0,d=Ye(d>>>0);let T=B=>B;if(c===0){var z=32-8*m;T=B=>B<<z>>>z,$=T($)}it(o,{name:d,Qc:T,Xc:(B,W)=>W,Wc:ts(d,m,c!==0),Yc:null})}function pm(o,d,m){function c(T){var z=(v(),D)[T>>>2>>>0];return T=(v(),D)[T+4>>>2>>>0],new $((v(),q).buffer,T,z)}var $=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];it(o>>>=0,{name:m=Ye(m>>>0),Qc:c,Wc:c},{Bd:!0})}var pt=(o,d,m)=>{var c=(v(),Y);if(d>>>=0,0<m){var $=d;m=d+m-1;for(var T=0;T<o.length;++T){var z=o.codePointAt(T);if(127>=z){if(d>=m)break;c[d++>>>0]=z}else if(2047>=z){if(d+1>=m)break;c[d++>>>0]=192|z>>6,c[d++>>>0]=128|63&z}else if(65535>=z){if(d+2>=m)break;c[d++>>>0]=224|z>>12,c[d++>>>0]=128|z>>6&63,c[d++>>>0]=128|63&z}else{if(d+3>=m)break;c[d++>>>0]=240|z>>18,c[d++>>>0]=128|z>>12&63,c[d++>>>0]=128|z>>6&63,c[d++>>>0]=128|63&z,T++}}c[d>>>0]=0,o=d-$}else o=0;return o},vr=o=>{for(var d=0,m=0;m<o.length;++m){var c=o.charCodeAt(m);127>=c?d++:2047>=c?d+=2:55296<=c&&57343>=c?(d+=4,++m):d+=3}return d};function cm(o,d){it(o>>>=0,{name:d=Ye(d>>>0),Qc(m){var c=(v(),D)[m>>>2>>>0];return c=Se(m+4,c,!0),Je(m),c},Xc(m,c){c instanceof ArrayBuffer&&(c=new Uint8Array(c));var $=typeof c=="string";if(!($||ArrayBuffer.isView(c)&&c.BYTES_PER_ELEMENT==1))throw new qt("Cannot pass non-string to std::string");var T=$?vr(c):c.length,z=Yt(4+T+1),B=z+4;return(v(),D)[z>>>2>>>0]=T,$?pt(c,B,T+1):(v(),Y).set(c,B>>>0),m!==null&&m.push(Je,z),z},Wc:fi,Yc(m){Je(m)}})}var is=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,hm=(o,d,m)=>{if(o>>>=1,16<(d=qn((v(),Z),o,d/2,m))-o&&is)return is.decode((v(),Z).slice(o,d));for(m="";o<d;++o){var c=(v(),Z)[o>>>0];m+=String.fromCharCode(c)}return m},fm=(o,d,m)=>{if(m??=2147483647,2>m)return 0;var c=d;m=(m-=2)<2*o.length?m/2:o.length;for(var $=0;$<m;++$){var T=o.charCodeAt($);(v(),H)[d>>>1>>>0]=T,d+=2}return(v(),H)[d>>>1>>>0]=0,d-c},mm=o=>2*o.length,gm=(o,d,m)=>{var c="";o>>>=2;for(var $=0;!($>=d/4);$++){var T=(v(),D)[o+$>>>0];if(!T&&!m)break;c+=String.fromCodePoint(T)}return c},ym=(o,d,m)=>{if(d>>>=0,m??=2147483647,4>m)return 0;var c=d;m=c+m-4;for(var $=0;$<o.length;++$){var T=o.codePointAt($);if(65535<T&&$++,(v(),R)[d>>>2>>>0]=T,(d+=4)+4>m)break}return(v(),R)[d>>>2>>>0]=0,d-c},_m=o=>{for(var d=0,m=0;m<o.length;++m)65535<o.codePointAt(m)&&m++,d+=4;return d};function wm(o,d,m){if(o>>>=0,d>>>=0,m=Ye(m>>>=0),d===2)var c=hm,$=fm,T=mm;else c=gm,$=ym,T=_m;it(o,{name:m,Qc:z=>{var B=(v(),D)[z>>>2>>>0];return B=c(z+4,B*d,!0),Je(z),B},Xc:(z,B)=>{if(typeof B!="string")throw new qt(`Cannot pass non-string to C++ string type ${m}`);var W=T(B),V=Yt(4+W+d);return(v(),D)[V>>>2>>>0]=W/d,$(B,V+4,W+d),z!==null&&z.push(Je,V),V},Wc:fi,Yc(z){Je(z)}})}function bm(o,d){it(o>>>=0,{Cd:!0,name:d=Ye(d>>>0),Qc:()=>{},Xc:()=>{}})}function $m(o){xi(o>>>0,!i,1,!r,131072,!1),On()}var xr=o=>{if(!C)try{if(o(),!(0<Qe))try{a?Cr()&&Si(_):ui(_)}catch(d){d instanceof Pe||d=="unwind"||p(0,d)}}catch(d){d instanceof Pe||d=="unwind"||p(0,d)}},vm=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function mi(o){o>>>=0,vm||(Atomics.waitAsync((v(),R),o>>>2,o).value.then(Sr),o+=128,Atomics.store((v(),R),o>>>2,1))}var Sr=()=>xr(()=>{var o=Cr();o&&(mi(o),Cs())});function xm(o,d){(o>>>=0)==d>>>0?setTimeout(Sr):a?postMessage({ad:o,Uc:"checkMailbox"}):(o=wt[o])&&o.postMessage({Uc:"checkMailbox"})}var gi=[];function Sm(o,d,m,c,$){for(d>>>=0,$>>>=0,gi.length=0,m=$>>>3,c=$+c>>>3;m<c;){var T;T=(v(),Q)[m++>>>0]?(v(),Q)[m++>>>0]:(v(),ee)[m++>>>0],gi.push(T)}return(d?Ei[d]:fg[o])(...gi)}var km=()=>{Qe=0};function Tm(o){o>>>=0,a?postMessage({Uc:"cleanupThread",Qd:o}):An(wt[o])}function Im(o){}var kr=o=>{try{o()}catch(d){oe(d)}};function Em(o){var d=(...m)=>{Tr.push(o);try{return o(...m)}finally{C||(Tr.pop(),Xe&&ct===1&&Tr.length===0&&(ct=0,Qe+=1,kr(bo),typeof Fibers<"u"&&Fibers.ce()))}};return ss.set(o,d),d}var ct=0,Xe=null,as=0,Tr=[],yi=new Map,ns=new Map,ss=new Map,zm=0,_i=null,Cm=[],os=o=>function(d){if(!C){if(ct===0){var m=!1,c=!1;d(($=0)=>{if(!C&&(as=$,m=!0,c)){ct=2,kr(()=>$o(Xe)),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.resume(),$=!1;try{var T=function(){var W=(v(),R)[Xe+8>>>2>>>0];return W=ns.get(W),W=ss.get(W),--Qe,W()}()}catch(W){T=W,$=!0}var z=!1;if(!Xe){var B=_i;B&&(_i=null,($?B.reject:B.resolve)(T),z=!0)}if($&&!z)throw T}}),c=!0,m||(ct=1,Xe=function(){var $=Yt(65548),T=$+12;if((v(),D)[$>>>2>>>0]=T,(v(),D)[$+4>>>2>>>0]=T+65536,T=Tr[0],!yi.has(T)){var z=zm++;yi.set(T,z),ns.set(z,T)}return T=yi.get(T),(v(),R)[$+8>>>2>>>0]=T,$}(),typeof MainLoop<"u"&&MainLoop.yd&&MainLoop.pause(),kr(()=>wo(Xe)))}else ct===2?(ct=0,kr(vo),Je(Xe),Xe=null,Cm.forEach(xr)):oe(`invalid state: ${ct}`);return as}}(d=>{o().then(d)});function Am(o){return o>>>=0,os(async()=>{var d=await Ue(o);return Le(d)})}var wi=[],Om=o=>{var d=wi.length;return wi.push(o),d},Rm=(o,d)=>{for(var m=Array(o),c=0;c<o;++c){var $=c,T=(v(),D)[d+4*c>>>2>>>0],z=ci[T];if(z===void 0)throw o=`parameter ${c}`,T=Ss(T),d=Ye(T),Je(T),new qt(`${o} has unknown type ${d}`);m[$]=z}return m},Bm=(o,d,m)=>{var c=[];return o=o(c,m),c.length&&((v(),D)[d>>>2>>>0]=Le(c)),o},Nm={},Ir=o=>{var d=Nm[o];return d===void 0?Ye(o):d};function Mm(o,d,m){var[c,...$]=Rm(o,d>>>0);d=c.Xc.bind(c);var T=$.map(W=>W.Wc.bind(W));o--;var z={toValue:Ue};switch(o=T.map((W,V)=>{var ae=`argFromPtr${V}`;return z[ae]=W,`${ae}(args${V?"+"+8*V:""})`}),m){case 0:var B="toValue(handle)";break;case 2:B="new (toValue(handle))";break;case 3:B="";break;case 1:z.getStringOrSymbol=Ir,B="toValue(handle)[getStringOrSymbol(methodName)]"}return B+=`(${o})`,c.Cd||(z.toReturnWire=d,z.emval_returnValue=Bm,B=`return emval_returnValue(toReturnWire, destructorsRef, ${B})`),B=`return function (handle, methodName, destructorsRef, args) {
  ${B}
  }`,m=new Function(Object.keys(z),B)(...Object.values(z)),B=`methodCaller<(${$.map(W=>W.name)}) => ${c.name}>`,Om(Object.defineProperty(m,"name",{value:B}))}function Dm(o,d){return d>>>=0,(o=Ue(o>>>0))==Ue(d)}function Pm(o){return(o>>>=0)?(o=Ir(o),Le(globalThis[o])):Le(globalThis)}function Um(o){return o=Ir(o>>>0),Le(t[o])}function qm(o,d){return d>>>=0,o=Ue(o>>>0),d=Ue(d),Le(o[d])}function Wm(o){9<(o>>>=0)&&(bt[o+1]+=1)}function us(o,d,m,c,$){return wi[o>>>0](d>>>0,m>>>0,c>>>0,$>>>0)}function Lm(o,d,m,c,$){return us(o>>>0,d>>>0,m>>>0,c>>>0,$>>>0)}function Vm(){return Le([])}function Gm(o){o=Ue(o>>>0);for(var d=Array(o.length),m=0;m<o.length;m++)d[m]=o[m];return Le(d)}function Hm(o){return Le(Ir(o>>>0))}function Fm(){return Le({})}function jm(o){for(var d=Ue(o>>>=0);d.length;){var m=d.pop();d.pop()(m)}hi(o)}function Km(o,d,m){d>>>=0,m>>>=0,o=Ue(o>>>0),d=Ue(d),m=Ue(m),o[d]=m}function Zm(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(v(),R)[d>>>2>>>0]=o.getUTCSeconds(),(v(),R)[d+4>>>2>>>0]=o.getUTCMinutes(),(v(),R)[d+8>>>2>>>0]=o.getUTCHours(),(v(),R)[d+12>>>2>>>0]=o.getUTCDate(),(v(),R)[d+16>>>2>>>0]=o.getUTCMonth(),(v(),R)[d+20>>>2>>>0]=o.getUTCFullYear()-1900,(v(),R)[d+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(v(),R)[d+28>>>2>>>0]=o}var ls=o=>o%4==0&&(o%100!=0||o%400==0),ds=[0,31,60,91,121,152,182,213,244,274,305,335],ps=[0,31,59,90,120,151,181,212,243,273,304,334];function Qm(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(v(),R)[d>>>2>>>0]=o.getSeconds(),(v(),R)[d+4>>>2>>>0]=o.getMinutes(),(v(),R)[d+8>>>2>>>0]=o.getHours(),(v(),R)[d+12>>>2>>>0]=o.getDate(),(v(),R)[d+16>>>2>>>0]=o.getMonth(),(v(),R)[d+20>>>2>>>0]=o.getFullYear()-1900,(v(),R)[d+24>>>2>>>0]=o.getDay();var m=(ls(o.getFullYear())?ds:ps)[o.getMonth()]+o.getDate()-1|0;(v(),R)[d+28>>>2>>>0]=m,(v(),R)[d+36>>>2>>>0]=-60*o.getTimezoneOffset(),m=new Date(o.getFullYear(),6,1).getTimezoneOffset();var c=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(m!=c&&o.getTimezoneOffset()==Math.min(c,m)),(v(),R)[d+32>>>2>>>0]=o}function Ym(o){o>>>=0;var d=new Date((v(),R)[o+20>>>2>>>0]+1900,(v(),R)[o+16>>>2>>>0],(v(),R)[o+12>>>2>>>0],(v(),R)[o+8>>>2>>>0],(v(),R)[o+4>>>2>>>0],(v(),R)[o>>>2>>>0],0),m=(v(),R)[o+32>>>2>>>0],c=d.getTimezoneOffset(),$=new Date(d.getFullYear(),6,1).getTimezoneOffset(),T=new Date(d.getFullYear(),0,1).getTimezoneOffset(),z=Math.min(T,$);return 0>m?(v(),R)[o+32>>>2>>>0]=+($!=T&&z==c):0<m!=(z==c)&&($=Math.max(T,$),d.setTime(d.getTime()+6e4*((0<m?z:$)-c))),(v(),R)[o+24>>>2>>>0]=d.getDay(),m=(ls(d.getFullYear())?ds:ps)[d.getMonth()]+d.getDate()-1|0,(v(),R)[o+28>>>2>>>0]=m,(v(),R)[o>>>2>>>0]=d.getSeconds(),(v(),R)[o+4>>>2>>>0]=d.getMinutes(),(v(),R)[o+8>>>2>>>0]=d.getHours(),(v(),R)[o+12>>>2>>>0]=d.getDate(),(v(),R)[o+16>>>2>>>0]=d.getMonth(),(v(),R)[o+20>>>2>>>0]=d.getYear(),o=d.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function cs(o,d,m,c,$,T,z){return a?be(16,1,o,d,m,c,$,T,z):-52}function hs(o,d,m,c,$,T){if(a)return be(17,1,o,d,m,c,$,T)}var Qt={},Xm=()=>performance.timeOrigin+performance.now();function fs(o,d){if(a)return be(18,1,o,d);if(Qt[o]&&(clearTimeout(Qt[o].id),delete Qt[o]),!d)return 0;var m=setTimeout(()=>{delete Qt[o],xr(()=>zs(o,performance.timeOrigin+performance.now()))},d);return Qt[o]={id:m,be:d},0}function Jm(o,d,m,c){o>>>=0,d>>>=0,m>>>=0,c>>>=0;var $=new Date().getFullYear(),T=new Date($,0,1).getTimezoneOffset();$=new Date($,6,1).getTimezoneOffset();var z=Math.max(T,$);(v(),D)[o>>>2>>>0]=60*z,(v(),R)[d>>>2>>>0]=+(T!=$),o=(d=B=>{var W=Math.abs(B);return`UTC${0<=B?"-":"+"}${String(Math.floor(W/60)).padStart(2,"0")}${String(W%60).padStart(2,"0")}`})(T),d=d($),$<T?(pt(o,m,17),pt(d,c,17)):(pt(o,c,17),pt(d,m,17))}var eg=()=>Date.now();function tg(o,d,m){return m>>>=0,0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),o=Math.round(1e6*o),(v(),Q)[m>>>3>>>0]=BigInt(o),0):28}var bi=[],ms=(o,d)=>{bi.length=0;for(var m;m=(v(),Y)[o++>>>0];){var c=m!=105;d+=(c&=m!=112)&&d%8?4:0,bi.push(m==112?(v(),D)[d>>>2>>>0]:m==106?(v(),Q)[d>>>3>>>0]:m==105?(v(),R)[d>>>2>>>0]:(v(),ee)[d>>>3>>>0]),d+=c?8:4}return bi};function rg(o,d,m){return o>>>=0,d=ms(d>>>0,m>>>0),Ei[o](...d)}function ig(o,d,m){return o>>>=0,d=ms(d>>>0,m>>>0),Ei[o](...d)}var ag=()=>{};function ng(o,d){return E(Se(o>>>0,d>>>0))}var sg=()=>{throw Qe+=1,"unwind"};function og(){return 4294901760}var ug=()=>navigator.hardwareConcurrency,$t={},Er=o=>{var d;return(d=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+d[1]:(d=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+d[1]:0},gs=o=>{for(var d of o)(o=Er(d))&&($t[o]=d)};function lg(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),gs(o),$t.sd=Er(o[3]),$t.Md=o,$t.sd}function zr(o){if(!(o=$t[o>>>0]))return 0;var d;if(d=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=d[1];else if(d=/^\s+at (.*) \(.*\)$/.exec(o))o=d[1];else{if(!(d=/^(.+?)@/.exec(o)))return 0;o=d[1]}Je(zr.td??0),d=vr(o)+1;var m=Yt(d);return m&&pt(o,m,d),zr.td=m,zr.td}function dg(o){o>>>=0;var d=(v(),Y).length;if(o<=d||4294901760<o)return!1;for(var m=1;4>=m;m*=2){var c=d*(1+.2/m);c=Math.min(c,o+100663296);e:{c=(Math.min(4294901760,65536*Math.ceil(Math.max(o,c)/65536))-dt.buffer.byteLength+65535)/65536|0;try{dt.grow(c),L();var $=1;break e}catch{}$=void 0}if($)return!0}return!1}function pg(o,d,m){if(o>>>=0,d>>>=0,$t.sd==o)var c=$t.Md;else(c=Error().stack.toString().split(`
`))[0]=="Error"&&c.shift(),gs(c);for(var $=3;c[$]&&Er(c[$])!=o;)++$;for(o=0;o<m&&c[o+$];++o)(v(),R)[d+4*o>>>2>>>0]=Er(c[o+$]);return o}var $i,vi={},ys=()=>{if(!$i){var o,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in vi)vi[o]===void 0?delete d[o]:d[o]=vi[o];var m=[];for(o in d)m.push(`${o}=${d[o]}`);$i=m}return $i};function _s(o,d){if(a)return be(19,1,o,d);o>>>=0,d>>>=0;var m,c=0,$=0;for(m of ys()){var T=d+c;(v(),D)[o+$>>>2>>>0]=T,c+=pt(m,T,1/0)+1,$+=4}return 0}function ws(o,d){if(a)return be(20,1,o,d);o>>>=0,d>>>=0;var m=ys();for(var c of((v(),D)[o>>>2>>>0]=m.length,o=0,m))o+=vr(c)+1;return(v(),D)[d>>>2>>>0]=o,0}function bs(o){return a?be(21,1,o):52}function $s(o,d,m,c){return a?be(22,1,o,d,m,c):52}function vs(o,d,m,c){return a?be(23,1,o,d,m,c):70}var cg=[null,[],[]];function xs(o,d,m,c){if(a)return be(24,1,o,d,m,c);d>>>=0,m>>>=0,c>>>=0;for(var $=0,T=0;T<m;T++){var z=(v(),D)[d>>>2>>>0],B=(v(),D)[d+4>>>2>>>0];d+=8;for(var W=0;W<B;W++){var V=o,ae=(v(),Y)[z+W>>>0],pe=cg[V];ae===0||ae===10?((V===1?S:E)(Wn(pe)),pe.length=0):pe.push(ae)}$+=B}return(v(),D)[c>>>2>>>0]=$,0}function hg(o){return o>>>0}a||function(){for(var o=t.numThreads-1;o--;)Bn();xe.push(async()=>{var d=async function(){if(!a)return Promise.all(lt.map(Rn))}();we++,await d,--we==0&&ze&&(d=ze,ze=null,d())})}(),a||(dt=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),L()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>se(),t.stackRestore=o=>ne(o),t.stackAlloc=o=>ki(o),t.setValue=function(o,d,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":(v(),q)[o>>>0]=d;break;case"i16":(v(),H)[o>>>1>>>0]=d;break;case"i32":(v(),R)[o>>>2>>>0]=d;break;case"i64":(v(),Q)[o>>>3>>>0]=BigInt(d);break;case"float":(v(),G)[o>>>2>>>0]=d;break;case"double":(v(),ee)[o>>>3>>>0]=d;break;case"*":(v(),D)[o>>>2>>>0]=d;break;default:oe(`invalid type for setValue: ${m}`)}},t.getValue=function(o,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return(v(),q)[o>>>0];case"i16":return(v(),H)[o>>>1>>>0];case"i32":return(v(),R)[o>>>2>>>0];case"i64":return(v(),Q)[o>>>3>>>0];case"float":return(v(),G)[o>>>2>>>0];case"double":return(v(),ee)[o>>>3>>>0];case"*":return(v(),D)[o>>>2>>>0];default:oe(`invalid type for getValue: ${d}`)}},t.UTF8ToString=Se,t.stringToUTF8=pt,t.lengthBytesUTF8=vr;var Ss,ks,Cr,Je,Yt,xi,Ts,Is,Es,Si,zs,Cs,ue,Xt,As,ne,ki,se,Os,Ti,Rs,Bs,Ns,Ii,Ms,Ds,Ps,Us,qs,Ws,Ls,Vs,Gs,Hs,Fs,js,Ks,Zs,Qs,Ys,Xs,Js,eo,to,ro,io,ao,no,so,oo,uo,lo,po,co,ho,fo,mo,go,yo,_o,wo,bo,$o,vo,at,fg=[oi,zn,Dn,Ln,Vn,Gn,Hn,Fn,jn,Kn,Zn,Qn,Yn,Xn,Jn,es,cs,hs,fs,_s,ws,bs,$s,vs,xs],Ei={929356:(o,d,m,c,$)=>{if(t===void 0||!t.Zc)return 1;if((o=Se(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.Zc.get(o)))return 2;if(d=Number(d>>>0),m=Number(m>>>0),c=Number(c>>>0),d+m>o.byteLength)return 3;try{let T=o.subarray(d,d+m);switch($){case 0:(v(),Y).set(T,c>>>0);break;case 1:t.Xd?t.Xd(c,T):t.Ld(c,T);break;default:return 4}return 0}catch{return 4}},930180:(o,d,m)=>{t.xd(o,(v(),Y).subarray(d>>>0,d+m>>>0))},930244:()=>t.Zd(),930286:o=>{t.vd(o)},930323:()=>{t.Ed()},930354:()=>{t.Fd()},930383:()=>{t.Jd()},930408:o=>t.Dd(o),930441:o=>t.Hd(o),930473:(o,d,m)=>{t.jd(Number(o),Number(d),Number(m),!0)},930536:(o,d,m)=>{t.jd(Number(o),Number(d),Number(m))},930593:()=>typeof wasmOffsetConverter<"u",930650:o=>{t.ac("Abs",o,void 0)},930701:o=>{t.ac("Neg",o,void 0)},930752:o=>{t.ac("Floor",o,void 0)},930805:o=>{t.ac("Ceil",o,void 0)},930857:o=>{t.ac("Reciprocal",o,void 0)},930915:o=>{t.ac("Sqrt",o,void 0)},930967:o=>{t.ac("Exp",o,void 0)},931018:o=>{t.ac("Erf",o,void 0)},931069:o=>{t.ac("Sigmoid",o,void 0)},931124:(o,d,m)=>{t.ac("HardSigmoid",o,{alpha:d,beta:m})},931203:o=>{t.ac("Log",o,void 0)},931254:o=>{t.ac("Sin",o,void 0)},931305:o=>{t.ac("Cos",o,void 0)},931356:o=>{t.ac("Tan",o,void 0)},931407:o=>{t.ac("Asin",o,void 0)},931459:o=>{t.ac("Acos",o,void 0)},931511:o=>{t.ac("Atan",o,void 0)},931563:o=>{t.ac("Sinh",o,void 0)},931615:o=>{t.ac("Cosh",o,void 0)},931667:o=>{t.ac("Asinh",o,void 0)},931720:o=>{t.ac("Acosh",o,void 0)},931773:o=>{t.ac("Atanh",o,void 0)},931826:o=>{t.ac("Tanh",o,void 0)},931878:o=>{t.ac("Not",o,void 0)},931929:(o,d,m)=>{t.ac("Clip",o,{min:d,max:m})},931998:o=>{t.ac("Clip",o,void 0)},932050:(o,d)=>{t.ac("Elu",o,{alpha:d})},932108:o=>{t.ac("Gelu",o,void 0)},932160:o=>{t.ac("Relu",o,void 0)},932212:(o,d)=>{t.ac("LeakyRelu",o,{alpha:d})},932276:(o,d)=>{t.ac("ThresholdedRelu",o,{alpha:d})},932346:(o,d)=>{t.ac("Cast",o,{to:d})},932404:o=>{t.ac("Add",o,void 0)},932455:o=>{t.ac("Sub",o,void 0)},932506:o=>{t.ac("Mul",o,void 0)},932557:o=>{t.ac("Div",o,void 0)},932608:o=>{t.ac("Pow",o,void 0)},932659:o=>{t.ac("Equal",o,void 0)},932712:o=>{t.ac("Greater",o,void 0)},932767:o=>{t.ac("GreaterOrEqual",o,void 0)},932829:o=>{t.ac("Less",o,void 0)},932881:o=>{t.ac("LessOrEqual",o,void 0)},932940:(o,d,m,c,$)=>{t.ac("ReduceMean",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},933115:(o,d,m,c,$)=>{t.ac("ReduceMax",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},933289:(o,d,m,c,$)=>{t.ac("ReduceMin",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},933463:(o,d,m,c,$)=>{t.ac("ReduceProd",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},933638:(o,d,m,c,$)=>{t.ac("ReduceSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},933812:(o,d,m,c,$)=>{t.ac("ReduceL1",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},933985:(o,d,m,c,$)=>{t.ac("ReduceL2",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},934158:(o,d,m,c,$)=>{t.ac("ReduceLogSum",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},934335:(o,d,m,c,$)=>{t.ac("ReduceSumSquare",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},934515:(o,d,m,c,$)=>{t.ac("ReduceLogSumExp",o,{keepDims:!!d,noopWithEmptyAxes:!!m,axes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},934695:o=>{t.ac("Where",o,void 0)},934748:(o,d,m)=>{t.ac("Transpose",o,{perm:d?Array.from((v(),R).subarray(Number(d)>>>0,Number(m)>>>0)):[]})},934872:(o,d,m,c)=>{t.ac("DepthToSpace",o,{blocksize:d,mode:Se(m),format:c?"NHWC":"NCHW"})},935005:(o,d,m,c)=>{t.ac("DepthToSpace",o,{blocksize:d,mode:Se(m),format:c?"NHWC":"NCHW"})},935138:(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e,ht)=>{t.ac("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:d,dilations:[m],group:c,kernelShape:[$],pads:[T,z],strides:[B],wIsConst:()=>!!(v(),q)[V>>>0],outputPadding:ae?Array.from((v(),R).subarray(Number(ae)>>>0,Number(pe)>>>0)):[],outputShape:ge?Array.from((v(),R).subarray(Number(ge)>>>0,Number(_e)>>>0)):[],activation:Se(ht)})},935571:(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e)=>{t.ac("ConvTranspose",o,{format:B?"NHWC":"NCHW",autoPad:d,dilations:Array.from((v(),R).subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:c,kernelShape:Array.from((v(),R).subarray(Number($)>>>0,2+(Number($)>>>0)>>>0)),pads:Array.from((v(),R).subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from((v(),R).subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!(v(),q)[W>>>0],outputPadding:V?Array.from((v(),R).subarray(Number(V)>>>0,Number(ae)>>>0)):[],outputShape:pe?Array.from((v(),R).subarray(Number(pe)>>>0,Number(ge)>>>0)):[],activation:Se(_e)})},936232:(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e,ht)=>{t.ac("ConvTranspose",o,{format:W?"NHWC":"NCHW",autoPad:d,dilations:[m],group:c,kernelShape:[$],pads:[T,z],strides:[B],wIsConst:()=>!!(v(),q)[V>>>0],outputPadding:ae?Array.from((v(),R).subarray(Number(ae)>>>0,Number(pe)>>>0)):[],outputShape:ge?Array.from((v(),R).subarray(Number(ge)>>>0,Number(_e)>>>0)):[],activation:Se(ht)})},936665:(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e)=>{t.ac("ConvTranspose",o,{format:B?"NHWC":"NCHW",autoPad:d,dilations:Array.from((v(),R).subarray(Number(m)>>>0,2+(Number(m)>>>0)>>>0)),group:c,kernelShape:Array.from((v(),R).subarray(Number($)>>>0,2+(Number($)>>>0)>>>0)),pads:Array.from((v(),R).subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from((v(),R).subarray(Number(z)>>>0,2+(Number(z)>>>0)>>>0)),wIsConst:()=>!!(v(),q)[W>>>0],outputPadding:V?Array.from((v(),R).subarray(Number(V)>>>0,Number(ae)>>>0)):[],outputShape:pe?Array.from((v(),R).subarray(Number(pe)>>>0,Number(ge)>>>0)):[],activation:Se(_e)})},937326:(o,d)=>{t.ac("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},937417:(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e)=>{t.ac("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:$,dilations:T?Array.from((v(),R).subarray(Number(T)>>>0,Number(z)>>>0)):[],kernel_shape:B?Array.from((v(),R).subarray(Number(B)>>>0,Number(W)>>>0)):[],pads:V?Array.from((v(),R).subarray(Number(V)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((v(),R).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},937896:(o,d)=>{t.ac("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},937987:(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e)=>{t.ac("AveragePool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:$,dilations:T?Array.from((v(),R).subarray(Number(T)>>>0,Number(z)>>>0)):[],kernel_shape:B?Array.from((v(),R).subarray(Number(B)>>>0,Number(W)>>>0)):[],pads:V?Array.from((v(),R).subarray(Number(V)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((v(),R).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},938466:(o,d)=>{t.ac("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},938553:(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e)=>{t.ac("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:$,dilations:T?Array.from((v(),R).subarray(Number(T)>>>0,Number(z)>>>0)):[],kernel_shape:B?Array.from((v(),R).subarray(Number(B)>>>0,Number(W)>>>0)):[],pads:V?Array.from((v(),R).subarray(Number(V)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((v(),R).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},939028:(o,d)=>{t.ac("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},939115:(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e)=>{t.ac("MaxPool",o,{format:_e?"NHWC":"NCHW",auto_pad:d,ceil_mode:m,count_include_pad:c,storage_order:$,dilations:T?Array.from((v(),R).subarray(Number(T)>>>0,Number(z)>>>0)):[],kernel_shape:B?Array.from((v(),R).subarray(Number(B)>>>0,Number(W)>>>0)):[],pads:V?Array.from((v(),R).subarray(Number(V)>>>0,Number(ae)>>>0)):[],strides:pe?Array.from((v(),R).subarray(Number(pe)>>>0,Number(ge)>>>0)):[]})},939590:(o,d,m,c,$)=>{t.ac("Gemm",o,{alpha:d,beta:m,transA:c,transB:$})},939694:o=>{t.ac("MatMul",o,void 0)},939748:(o,d,m,c)=>{t.ac("ArgMax",o,{keepDims:!!d,selectLastIndex:!!m,axis:c})},939856:(o,d,m,c)=>{t.ac("ArgMin",o,{keepDims:!!d,selectLastIndex:!!m,axis:c})},939964:(o,d)=>{t.ac("Softmax",o,{axis:d})},940027:(o,d)=>{t.ac("Concat",o,{axis:d})},940087:(o,d,m,c,$)=>{t.ac("Split",o,{axis:d,numOutputs:m,splitSizes:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},940243:o=>{t.ac("Expand",o,void 0)},940297:(o,d)=>{t.ac("Gather",o,{axis:Number(d)})},940368:(o,d)=>{t.ac("GatherElements",o,{axis:Number(d)})},940447:(o,d)=>{t.ac("GatherND",o,{batch_dims:Number(d)})},940526:(o,d,m,c,$,T,z,B,W,V,ae)=>{t.ac("Resize",o,{antialias:d,axes:m?Array.from((v(),R).subarray(Number(m)>>>0,Number(c)>>>0)):[],coordinateTransformMode:Se($),cubicCoeffA:T,excludeOutside:z,extrapolationValue:B,keepAspectRatioPolicy:Se(W),mode:Se(V),nearestMode:Se(ae)})},940888:(o,d,m,c,$,T,z)=>{t.ac("Slice",o,{starts:d?Array.from((v(),R).subarray(Number(d)>>>0,Number(m)>>>0)):[],ends:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[],axes:T?Array.from((v(),R).subarray(Number(T)>>>0,Number(z)>>>0)):[]})},941152:o=>{t.ac("Tile",o,void 0)},941204:(o,d,m)=>{t.ac("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},941318:(o,d,m)=>{t.ac("InstanceNormalization",o,{epsilon:d,format:m?"NHWC":"NCHW"})},941432:o=>{t.ac("Range",o,void 0)},941485:(o,d)=>{t.ac("Einsum",o,{equation:Se(d)})},941566:(o,d,m,c,$)=>{t.ac("Pad",o,{mode:d,value:m,pads:c?Array.from((v(),R).subarray(Number(c)>>>0,Number($)>>>0)):[]})},941709:(o,d,m,c,$,T)=>{t.ac("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!$,trainingMode:!!c,format:T?"NHWC":"NCHW"})},941878:(o,d,m,c,$,T)=>{t.ac("BatchNormalization",o,{epsilon:d,momentum:m,spatial:!!$,trainingMode:!!c,format:T?"NHWC":"NCHW"})},942047:(o,d,m)=>{t.ac("CumSum",o,{exclusive:Number(d),reverse:Number(m)})},942144:(o,d,m)=>{t.ac("DequantizeLinear",o,{axis:d,blockSize:m})},942234:(o,d,m,c,$)=>{t.ac("GridSample",o,{align_corners:d,mode:Se(m),padding_mode:Se(c),format:$?"NHWC":"NCHW"})},942404:(o,d,m,c,$)=>{t.ac("GridSample",o,{align_corners:d,mode:Se(m),padding_mode:Se(c),format:$?"NHWC":"NCHW"})},942574:(o,d)=>{t.ac("ScatterND",o,{reduction:Se(d)})},942659:(o,d,m,c,$,T,z,B,W)=>{t.ac("Attention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:c,scale:$,doRotary:T,qkvHiddenSizes:z?Array.from((v(),R).subarray(Number(B)>>>0,Number(B)+z>>>0)):[],pastPresentShareBuffer:!!W})},942931:o=>{t.ac("BiasAdd",o,void 0)},942986:o=>{t.ac("BiasSplitGelu",o,void 0)},943047:o=>{t.ac("FastGelu",o,void 0)},943103:(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e,ht,zi)=>{t.ac("Conv",o,{format:pe?"NHWC":"NCHW",auto_pad:d,dilations:m?Array.from((v(),R).subarray(Number(m)>>>0,Number(c)>>>0)):[],group:$,kernel_shape:T?Array.from((v(),R).subarray(Number(T)>>>0,Number(z)>>>0)):[],pads:B?Array.from((v(),R).subarray(Number(B)>>>0,Number(W)>>>0)):[],strides:V?Array.from((v(),R).subarray(Number(V)>>>0,Number(ae)>>>0)):[],w_is_const:()=>!!(v(),q)[Number(ge)>>>0],activation:Se(_e),activation_params:ht?Array.from((v(),G).subarray(Number(ht)>>>0,Number(zi)>>>0)):[]})},943687:o=>{t.ac("Gelu",o,void 0)},943739:(o,d,m,c,$,T,z,B,W)=>{t.ac("GroupQueryAttention",o,{numHeads:d,kvNumHeads:m,scale:c,softcap:$,doRotary:T,rotaryInterleaved:z,smoothSoftmax:B,localWindowSize:W})},943956:(o,d,m,c)=>{t.ac("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!c})},944067:(o,d,m,c)=>{t.ac("LayerNormalization",o,{axis:d,epsilon:m,simplified:!!c})},944178:(o,d,m,c,$,T)=>{t.ac("MatMulNBits",o,{k:d,n:m,accuracyLevel:c,bits:$,blockSize:T})},944305:(o,d,m,c,$,T)=>{t.ac("MultiHeadAttention",o,{numHeads:d,isUnidirectional:m,maskFilterValue:c,scale:$,doRotary:T})},944464:(o,d)=>{t.ac("QuickGelu",o,{alpha:d})},944528:(o,d,m,c,$)=>{t.ac("RotaryEmbedding",o,{interleaved:!!d,numHeads:m,rotaryEmbeddingDim:c,scale:$})},944667:(o,d,m)=>{t.ac("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},944769:(o,d,m)=>{t.ac("SkipLayerNormalization",o,{epsilon:d,simplified:!!m})},944871:(o,d,m,c)=>{t.ac("GatherBlockQuantized",o,{gatherAxis:d,quantizeAxis:m,blockSize:c})},944992:o=>{t.Id(o)},945026:(o,d)=>t.Kd(Number(o),Number(d),t.$c.Nd,t.$c.errors)};function mg(o,d,m){return os(async()=>{await t.Gd(Number(o),Number(d),Number(m))})}function gg(){return typeof wasmOffsetConverter<"u"}function yg(o,d,m,c){var $=se();try{return Vs(o,d,m,c)}catch(T){if(ne($),T!==T+0)throw T;ue(1,0)}}function _g(o,d,m){var c=se();try{return Us(o,d,m)}catch($){if(ne(c),$!==$+0)throw $;ue(1,0)}}function wg(o,d,m){var c=se();try{Ns(o,d,m)}catch($){if(ne(c),$!==$+0)throw $;ue(1,0)}}function bg(o,d){var m=se();try{return Ii(o,d)}catch(c){if(ne(m),c!==c+0)throw c;ue(1,0)}}function $g(o){var d=se();try{Ms(o)}catch(m){if(ne(d),m!==m+0)throw m;ue(1,0)}}function vg(o,d,m,c,$,T,z){var B=se();try{return Ws(o,d,m,c,$,T,z)}catch(W){if(ne(B),W!==W+0)throw W;ue(1,0)}}function xg(o,d){var m=se();try{Gs(o,d)}catch(c){if(ne(m),c!==c+0)throw c;ue(1,0)}}function Sg(o,d,m,c,$,T){var z=se();try{Ds(o,d,m,c,$,T)}catch(B){if(ne(z),B!==B+0)throw B;ue(1,0)}}function kg(o,d,m,c){var $=se();try{Ls(o,d,m,c)}catch(T){if(ne($),T!==T+0)throw T;ue(1,0)}}function Tg(o,d,m,c,$){var T=se();try{Ps(o,d,m,c,$)}catch(z){if(ne(T),z!==z+0)throw z;ue(1,0)}}function Ig(o,d,m,c,$,T,z){var B=se();try{Fs(o,d,m,c,$,T,z)}catch(W){if(ne(B),W!==W+0)throw W;ue(1,0)}}function Eg(o,d,m,c,$,T,z){var B=se();try{js(o,d,m,c,$,T,z)}catch(W){if(ne(B),W!==W+0)throw W;ue(1,0)}}function zg(o,d,m,c,$,T,z,B){var W=se();try{Ys(o,d,m,c,$,T,z,B)}catch(V){if(ne(W),V!==V+0)throw V;ue(1,0)}}function Cg(o,d,m,c,$){var T=se();try{return Hs(o,d,m,c,$)}catch(z){if(ne(T),z!==z+0)throw z;ue(1,0)}}function Ag(o,d,m,c,$,T,z,B){var W=se();try{Xs(o,d,m,c,$,T,z,B)}catch(V){if(ne(W),V!==V+0)throw V;ue(1,0)}}function Og(o,d,m,c,$,T,z,B,W,V,ae,pe){var ge=se();try{Ks(o,d,m,c,$,T,z,B,W,V,ae,pe)}catch(_e){if(ne(ge),_e!==_e+0)throw _e;ue(1,0)}}function Rg(o,d,m,c,$,T){var z=se();try{return Zs(o,d,m,c,$,T)}catch(B){if(ne(z),B!==B+0)throw B;ue(1,0)}}function Bg(o,d,m){var c=se();try{return Js(o,d,m)}catch($){if(ne(c),$!==$+0)throw $;return ue(1,0),0n}}function Ng(o,d,m,c,$,T,z,B,W){var V=se();try{qs(o,d,m,c,$,T,z,B,W)}catch(ae){if(ne(V),ae!==ae+0)throw ae;ue(1,0)}}function Mg(o){var d=se();try{return eo(o)}catch(m){if(ne(d),m!==m+0)throw m;ue(1,0)}}function Dg(o,d,m){var c=se();try{return to(o,d,m)}catch($){if(ne(c),$!==$+0)throw $;ue(1,0)}}function Pg(o,d){var m=se();try{return _o(o,d)}catch(c){if(ne(m),c!==c+0)throw c;return ue(1,0),0n}}function Ug(o,d,m,c,$){var T=se();try{ro(o,d,m,c,$)}catch(z){if(ne(T),z!==z+0)throw z;ue(1,0)}}function qg(o){var d=se();try{return io(o)}catch(m){if(ne(d),m!==m+0)throw m;return ue(1,0),0n}}function Wg(o,d,m,c,$,T){var z=se();try{return lo(o,d,m,c,$,T)}catch(B){if(ne(z),B!==B+0)throw B;ue(1,0)}}function Lg(o,d,m,c,$,T){var z=se();try{return po(o,d,m,c,$,T)}catch(B){if(ne(z),B!==B+0)throw B;ue(1,0)}}function Vg(o,d,m,c,$,T,z,B){var W=se();try{return Qs(o,d,m,c,$,T,z,B)}catch(V){if(ne(W),V!==V+0)throw V;ue(1,0)}}function Gg(o,d,m,c,$){var T=se();try{return co(o,d,m,c,$)}catch(z){if(ne(T),z!==z+0)throw z;return ue(1,0),0n}}function Hg(o,d,m,c){var $=se();try{return ho(o,d,m,c)}catch(T){if(ne($),T!==T+0)throw T;ue(1,0)}}function Fg(o,d,m,c){var $=se();try{return fo(o,d,m,c)}catch(T){if(ne($),T!==T+0)throw T;ue(1,0)}}function jg(o,d,m,c,$,T,z,B,W,V,ae,pe){var ge=se();try{return mo(o,d,m,c,$,T,z,B,W,V,ae,pe)}catch(_e){if(ne(ge),_e!==_e+0)throw _e;ue(1,0)}}function Kg(o,d,m,c,$,T,z,B,W,V,ae){var pe=se();try{oo(o,d,m,c,$,T,z,B,W,V,ae)}catch(ge){if(ne(pe),ge!==ge+0)throw ge;ue(1,0)}}function Zg(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e,ht,zi){var ty=se();try{uo(o,d,m,c,$,T,z,B,W,V,ae,pe,ge,_e,ht,zi)}catch(Ci){if(ne(ty),Ci!==Ci+0)throw Ci;ue(1,0)}}function Qg(o,d,m,c){var $=se();try{return go(o,d,m,c)}catch(T){if(ne($),T!==T+0)throw T;ue(1,0)}}function Yg(o,d,m,c,$){var T=se();try{return yo(o,d,m,c,$)}catch(z){if(ne(T),z!==z+0)throw z;ue(1,0)}}function Xg(o,d,m){var c=se();try{return ao(o,d,m)}catch($){if(ne(c),$!==$+0)throw $;ue(1,0)}}function Jg(o,d,m){var c=se();try{return no(o,d,m)}catch($){if(ne(c),$!==$+0)throw $;ue(1,0)}}function ey(o,d,m,c){var $=se();try{so(o,d,m,c)}catch(T){if(ne($),T!==T+0)throw T;ue(1,0)}}function Ar(){if(0<we)ze=Ar;else if(a)b?.(t),te();else{for(var o=xe;0<o.length;)o.shift()(t);0<we?ze=Ar:(t.calledRun=!0,C||(te(),b?.(t)))}}return a||(at=await Re(),Ar()),t.PTR_SIZE=4,M?t:new Promise((o,d)=>{b=o,k=d})}var Sp,ko,xy=U(()=>{Sp=So,ko=globalThis.self?.name?.startsWith("em-pthread"),ko&&So()}),Mi,Ea,To,Be,kp,Rr,Io,Eo,Di,zo,Pi,Tp,Ui,Ip,Xa=U(()=>{Ya(),Mi=typeof location>"u"?void 0:location.origin,Ea=import.meta.url>"file:"&&import.meta.url<"file;",To=()=>{{if(Ea){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Mi).href}return import.meta.url}},Be=To(),kp=()=>{if(Be&&!Be.startsWith("blob:"))return Be.substring(0,Be.lastIndexOf("/")+1)},Rr=(e,t)=>{try{let r=t??Be;return(r?new URL(e,r):new URL(e)).origin===Mi}catch{return!1}},Io=(e,t)=>{let r=t??Be;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Eo=(e,t)=>`${t??"./"}${e}`,Di=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},zo=async e=>(await import(e)).default,Pi=(vy(),gr($p)).default,Tp=async()=>{if(!Be)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Rr(Be))return[void 0,Pi()];let e=await Di(Be);return[e,Pi(e)]},Ui=(xy(),gr(xp)).default,Ip=async(e,t,r,i)=>{let a=Ui&&!(e||t);if(a)if(Be)a=Rr(Be)||i&&!r;else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,Ui];{let n="ort-wasm-simd-threaded.jsep.mjs",s=e??Io(n,t),u=r&&s&&!Rr(s,t),l=u?await Di(s):s??Eo(n,t);return[u?l:void 0,await zo(l)]}}}),qi,Br,er,Wi,Co,Ao,Oo,Ja,ye,Dt=U(()=>{Xa(),Br=!1,er=!1,Wi=!1,Co=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ao=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Oo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ja=async e=>{if(Br)return Promise.resolve();if(er)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Wi)throw new Error("previous call to 'initializeWebAssembly()' failed.");er=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Oo())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Ao())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Co();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,n=typeof a=="string"?a:void 0,s=a?.mjs,u=s?.href??s,l=a?.wasm,p=l?.href??l,f=e.wasmBinary,[h,g]=await Ip(u,n,r>1,!!f||!!p),y=!1,_=[];if(t>0&&_.push(new Promise(b=>{setTimeout(()=>{y=!0,b()},t)})),_.push(new Promise((b,k)=>{let x={numThreads:r};if(f)x.wasmBinary=f,x.locateFile=w=>w;else if(p||n)x.locateFile=w=>p??n+w;else if(u&&u.indexOf("blob:")!==0)x.locateFile=w=>new URL(w,u).href;else if(h){let w=kp();w&&(x.locateFile=I=>w+I)}g(x).then(w=>{er=!1,Br=!0,qi=w,b(),h&&URL.revokeObjectURL(h)},w=>{er=!1,Wi=!0,k(w)})})),await Promise.race(_),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ye=()=>{if(Br&&qi)return qi;throw new Error("WebAssembly is not initialized yet.")}}),Ke,Jr,fe,en=U(()=>{Dt(),Ke=(e,t)=>{let r=ye(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},Jr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,n])=>{let s=t?t+a:a;if(typeof n=="object")Jr(n,s+".",r,i);else if(typeof n=="string"||typeof n=="number")i(s,n.toString());else if(typeof n=="boolean")i(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},fe=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let n=Number(t.getValue(a,i===4?"i32":"i64")),s=t.getValue(a+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),Ep,Sy=U(()=>{Dt(),en(),Ep=e=>{let t=ye(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let n=0;return e?.tag!==void 0&&(n=Ke(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),r===0&&fe("Can't create run options."),e?.extra!==void 0&&Jr(e.extra,"",new WeakSet,(s,u)=>{let l=Ke(s,i),p=Ke(u,i);t._OrtAddRunConfigEntry(r,l,p)!==0&&fe(`Can't set a run config entry: ${s} - ${u}.`)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),n}}}),Ro,Bo,No,tr,Mo,zp,ky=U(()=>{Dt(),en(),Ro=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Bo=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},No=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},tr=(e,t,r,i)=>{let a=Ke(t,i),n=Ke(r,i);ye()._OrtAddSessionConfigEntry(e,a,n)!==0&&fe(`Can't set a session config entry: ${t} - ${r}.`)},Mo=async(e,t,r)=>{let i=t.executionProviders;for(let a of i){let n=typeof a=="string"?a:a.name,s=[];switch(n){case"webnn":if(n="WEBNN",typeof a!="string"){let h=a?.deviceType;h&&tr(e,"deviceType",h,r)}break;case"webgpu":if(n="JS",typeof a!="string"){let h=a;if(h?.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`);tr(e,"preferredLayout",h.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let u=Ke(n,r),l=s.length,p=0,f=0;if(l>0){p=ye()._malloc(l*ye().PTR_SIZE),r.push(p),f=ye()._malloc(l*ye().PTR_SIZE),r.push(f);for(let h=0;h<l;h++)ye().setValue(p+h*ye().PTR_SIZE,s[h][0],"*"),ye().setValue(f+h*ye().PTR_SIZE,s[h][1],"*")}await ye()._OrtAppendExecutionProvider(e,u,p,f,l)!==0&&fe(`Can't append execution provider: ${n}.`)}},zp=async e=>{let t=ye(),r=0,i=[],a=e||{};No(a);try{let n=Ro(a.graphOptimizationLevel??"all"),s=Bo(a.executionMode??"sequential"),u=typeof a.logId=="string"?Ke(a.logId,i):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let p=a.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let f=typeof a.optimizedModelFilePath=="string"?Ke(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(n,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,u,l,p,f),r===0&&fe("Can't create session options."),a.executionProviders&&await Mo(r,a,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);tr(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[h,g]of Object.entries(a.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let y=Ke(h,i);t._OrtAddFreeDimensionOverride(r,y,g)!==0&&fe(`Can't set a free dimension override: ${h} - ${g}.`)}return a.extra!==void 0&&Jr(a.extra,"",new WeakSet,(h,g)=>{tr(r,h,g,i)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),i.forEach(s=>t._free(s)),n}}}),It,st,Et,si,ei,tn,rn,za,J=U(()=>{It=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},st=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Et=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,n)=>a*n,1);return r>0?Math.ceil(i*r):void 0},si=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},ei=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},tn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",rn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",za=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),an,Cp=U(()=>{Ya(),an=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),n;try{n=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);n=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await a.read();if(u)break;let p=l.byteLength;new Uint8Array(n,s,p).set(l),s+=p}return new Uint8Array(n,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Do,Po,Uo,qo,nn,Wo,le,ot=U(()=>{J(),Do=["V","I","W","E","F"],Po=(e,t)=>{console.log(`[${Do[e]},${new Date().toISOString()}]${t}`)},nn=(e,t)=>{Uo=e,qo=t},Wo=(e,t)=>{let r=ei(e),i=ei(Uo);r>=i&&Po(r,typeof t=="function"?t():t)},le=(...e)=>{qo&&Wo(...e)}}),Lo,Ft,O,ti,Ap,Op,Rp,re=U(()=>{Lo=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ft=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(r){if(i<2||a<2)return;let u=Lo.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[s[n-2],s[n-1]]=u}for(let u=r?3:1;u<=n;u++){let l=i-u<0?1:e[i-u],p=a-u<0?1:t[a-u];if(l!==p&&l>1&&p>1)return;let f=Math.max(l,p);if(l&&p)s[n-u]=Math.max(l,p);else{if(f>1)return;s[n-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},O=class Zr{static size(t){return Zr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),n=i-1;for(;n>=0;){if(t[n]%r===0){a[n]=t[n]/r;break}if(r%t[n]!==0)throw new Error("cannot convert shape");a[n]=1,r/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Zr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Zr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let n=r;n<i;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,n)=>a+r[n]+r[n+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},ti=class pr{static adjustPoolAttributes(t,r,i,a,n,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,n,s,u){if(u){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)pr.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],i[l],a[l],n,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,a,n,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return pr.computeShapeHelper(t,r,l,i,a,n,s,u),l}static computeConvOutputShape(t,r,i,a,n,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return pr.computeShapeHelper(!1,t,l,i,a,n,s,u),l}static computeShapeHelper(t,r,i,a,n,s,u,l){if(t)for(let p=0;p<r.length-2;p++)i.push(1);else for(let p=0;p<r.length-2;p++)i.push(pr.adjustPadAndReturnShape(r[p+2],a[p],n[p],s[p],u,p,p+r.length-2,l))}static adjustPadAndReturnShape(t,r,i,a,n,s,u,l){let p=i*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return n[s]=0,n[u]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((t+r-1)/r-1)*r+a-t;return n[s]=Math.floor(l==="SAME_LOWER"?(f+1)/2:f/2),n[u]=f-n[s],Math.floor((t+f-a)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[u]-p)/r+1)}},Ap=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let n,s,u;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(n<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(a&&!Ft.isValidBroadcast(a,[n,u]))throw new Error("gemm: invalid bias shape for broadcast");return[n,u,s]}},Op=-34028234663852886e22,Rp=34028234663852886e22}),sn,Bp=U(()=>{J(),sn=(e,t)=>new(si(t))(e)}),Li,Ca,Vi,Vo,Gi,Go,Hi,Fi,ji,Ho,Np,Ty=U(()=>{J(),ot(),Li=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Ca=(e,t)=>{if(t==="int32")return e;let r=Li.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,n=new(si(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let s=new Int32Array(a);for(let u=0;u<a;u++){let l=n[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&n.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(n,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Vi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(n=>n<-128||n>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(n=>n<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Vo=1,Gi=()=>Vo++,Go=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Hi=(e,t)=>{let r=Li.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},Fi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:n,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=n,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Hi(this.dataType,this.tensorShape)}destroy(){le("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Vi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},ji=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e),n=this.tensorManager.getMLOpSupportLimits(e),s;if(!n?.input.dataTypes.includes(t)){if(s=Go.get(t),!s||n?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);le("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Hi(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Ca(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else le("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Vi(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Ho=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Gi();return this.tensorTrackersById.set(e,new ji(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){le("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){le("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),n=Gi(),s=new Fi({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(n,new ji(this,s)),this.externalTensors.add(s),n}async getCachedTensor(e,t,r,i,a,n,s){let u=this.getMLContext(e);for(let[p,f]of this.freeTensors.entries())if(f.canReuseTensor(u,t,r)){le("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let h=this.freeTensors.splice(p,1)[0];return h.sessionId=e,h}le("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:a,readable:n});return new Fi({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Np=(...e)=>new Ho(...e)}),rr,Fo,Mp,Iy=U(()=>{J(),Dt(),Bp(),Ty(),ot(),rr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Fo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,n)=>a===i[n]&&e[a]===t[a])},Mp=class{constructor(e){this.tensorManager=Np(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,nn(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){le("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){le("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)le("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Fo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){le("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let n=rr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,i,a)}async createTemporaryTensor(e,t,r){le("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=rr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!ye().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");le("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return sn(r,t)}}registerMLTensor(e,t,r,i){let a=rr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.registerTensor(e,t,a,i);return le("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`),n}registerMLConstant(e,t,r,i,a,n,s=!1){if(!n)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=n.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=l.slice(t,t+r).buffer,f;switch(a.dataType){case"float32":f=new Float32Array(p);break;case"float16":f=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":f=new Int32Array(p);break;case"uint32":f=new Uint32Array(p);break;case"int64":if(s){let h=Ca(new Uint8Array(p),"int64");f=new Int32Array(h.buffer),a.dataType="int32"}else f=new BigInt64Array(p);break;case"uint64":f=new BigUint64Array(p);break;case"int8":f=new Int8Array(p);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return le("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(a,f)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=rr.get(It(t)),a=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!a?.input.dataTypes.includes(i):!!a?.output.dataTypes.includes(i)}flush(){}}}),on=U(()=>{}),Ki,Nr,Mr,jo,Ko,Zi,Aa,Zo,Dp,Ey=U(()=>{ot(),on(),Ki=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Nr=[],Mr=e=>Math.ceil(Number(e)/16)*16,jo=e=>{for(let t=0;t<Nr.length;t++){let r=Nr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Ko=1,Zi=()=>Ko++,Aa=async(e,t,r,i)=>{let a=Mr(r),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),await n.mapAsync(GPUMapMode.READ);let u=n.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{n.destroy()}},Zo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Ki)Nr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,n=Mr(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,i,a)),u.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(u,0,s.gpuData.buffer,0,n),this.backend.device.queue.submit([p.finish()]),u.destroy(),le("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Mr(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return le("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Zi();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),le("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),le("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=jo(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:Zi(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),le("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return le("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Aa(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Ki.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(le("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Dp=(...e)=>new Zo(...e)}),Qo,he,ve=U(()=>{Qo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},he=e=>new Qo(e)}),jt,Dr,ke,Ee,K,$e,Oa,Vt,yt,j,ir,N,F,Pp,un,Yo,Up,ie=U(()=>{J(),re(),jt=64,Dr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ke=(e,t=1)=>{let r=Dr(e,t);return typeof r=="string"?r:r[0]},Ee=(e,t=1)=>{let r=Dr(e,t);return typeof r=="string"?r:r[1]},K=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:O.computeStrides(r)})}),t},$e=e=>e%4===0?4:e%2===0?2:1,Oa=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Vt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,yt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,j=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,ir=(e,t,r,i,a)=>{let n=typeof r=="number",s=n?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=Dr(t,a),f=typeof p=="string"?p:p[1],h=typeof p=="string"?p:p[0],g={indices:l,value:f,storage:h,tensor:t},y=M=>typeof M=="string"?M:`${M}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=n?"uniforms.":"",k=`${b}${e}_shape`,x=`${b}${e}_strides`,w="";for(let M=0;M<s-1;M++)w+=`
    let dim${M} = current / ${j(x,M,s)};
    let rest${M} = current % ${j(x,M,s)};
    indices[${M}] = dim${M};
    current = rest${M};
    `;w+=`indices[${s-1}] = current;`;let I=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,S=M=>(_.offsetToIndices=!0,s<2?M:`o2i_${e}(${M})`),E=[];if(s>=2)for(let M=s-1;M>=0;M--)E.push(`${j(x,M,s)} * (indices[${M}])`);let C=s<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${E.join("+")};
  }`,A=M=>(_.indicesToOffset=!0,s<2?M:`i2o_${e}(${M})`),v=(...M)=>s===0?"0u":`${g.indices}(${M.map(y).join(",")})`,P=(M,L)=>s<2?`${M}`:`${j(M,L,s)}`,q=(M,L,te)=>s<2?`${M}=${te};`:`${j(M,L,s)}=${te};`,Y={},H=(M,L)=>{_.broadcastedIndicesToOffset=!0;let te=`${L.name}broadcastedIndicesTo${e}Offset`;if(te in Y)return`${te}(${M})`;let oe=[];for(let Ae=s-1;Ae>=0;Ae--){let Re=L.indicesGet("outputIndices",Ae+L.rank-s);oe.push(`${P(x,Ae)} * (${Re} % ${P(k,Ae)})`)}return Y[te]=`fn ${te}(outputIndices: ${L.type.indices}) -> u32 {
             return ${oe.length>0?oe.join("+"):"0u"};
           }`,`${te}(${M})`},Z=(M,L)=>(()=>{if(g.storage===g.value)return`${e}[${M}]=${L};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${M}]=vec2<u32>(u32(${L}), select(0u, 0xFFFFFFFFu, ${L} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${M}]=vec2<u32>(u32(${L}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${M}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${L}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),R=M=>(()=>{if(g.storage===g.value)return`${e}[${M}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${M}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${M}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${M}] & 0xFFu), bool(${e}[${M}] & 0xFF00u), bool(${e}[${M}] & 0xFF0000u), bool(${e}[${M}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),D=s<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${f} {
    return ${R(`i2o_${e}(indices)`)};
  }`,G=s<2?"":(()=>{let M=u.map(te=>`d${te}: u32`).join(", "),L=u.map(te=>`d${te}`).join(", ");return`
  fn get_${e}(${M}) -> ${f} {
    return get_${e}ByIndices(${v(L)});
  }`})(),ee=(...M)=>{if(M.length!==s)throw new Error(`indices length must be ${s}`);let L=M.map(y).join(",");return s===0?R("0u"):s===1?R(L[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${L})`)},Q=M=>s<2?R(M):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${M})`),X=s<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${f}) {
    ${Z(`i2o_${e}(indices)`,"value")}
  }`,de=s<2?"":(()=>{let M=u.map(te=>`d${te}: u32`).join(", "),L=u.map(te=>`d${te}`).join(", ");return`
  fn set_${e}(${M}, value: ${f}) {
    set_${e}ByIndices(${v(L)}, value);
  }`})();return{impl:()=>{let M=[],L=!1;return _.offsetToIndices&&(M.push(I),L=!0),_.indicesToOffset&&(M.push(C),L=!0),_.broadcastedIndicesToOffset&&(Object.values(Y).forEach(te=>M.push(te)),L=!0),_.set&&(M.push(de),L=!0),_.setByIndices&&(M.push(X),L=!0),_.get&&(M.push(G),L=!0),_.getByIndices&&(M.push(D),L=!0),!n&&L&&M.unshift(`const ${k} = ${g.indices}(${r.join(",")});`,`const ${x} = ${g.indices}(${O.computeStrides(r).join(",")});`),M.join(`
`)},type:g,offsetToIndices:S,indicesToOffset:A,broadcastedIndicesToOffset:H,indices:v,indicesGet:P,indicesSet:q,set:(...M)=>{if(M.length!==s+1)throw new Error(`indices length must be ${s}`);let L=M[s];if(typeof L!="string")throw new Error("value must be string");let te=M.slice(0,s).map(y).join(",");return s===0?Z("0u",L):s===1?Z(te[0],L):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${te}, ${L})`)},setByOffset:Z,setByIndices:(M,L)=>s<2?Z(M,L):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${M}, ${L});`),get:ee,getByOffset:R,getByIndices:Q,usage:i,name:e,strides:x,shape:k,rank:s}},N=(e,t,r,i=1)=>ir(e,t,r,"input",i),F=(e,t,r,i=1)=>ir(e,t,r,"output",i),Pp=(e,t,r)=>ir(e,t,r,"atomicOutput",1),un=(e,t,r,i=1)=>ir(e,t,r,"internal",i),Yo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=jt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Up=(e,t)=>new Yo(e,t)}),Xo,Qi,Jo,eu,tu,ru,De,qp,Wp,_t=U(()=>{J(),re(),ve(),ie(),Xo=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Qi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Jo=(e,t)=>O.sortBasedOnPerm(e,Qi(e.length,t)),eu=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let n=0;n<t;++n)a+=`a[${e[n]}]=i[${n}];`;return a+="return a;}"},tu=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},ru=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},De=(e,t)=>{let r=e.dataType,i=e.dims.length,a=Qi(i,t),n=Jo(e.dims,a),s=e.dims,u=n,l=i<2||ru(a,e.dims),p;if(l)return p=_=>{let b=N("input",r,s,4),k=F("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(b,k)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=O.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:p};let{newShape:f,newPerm:h}=tu(e.dims,a),g=O.areEqual(h,[2,3,1]),y=O.areEqual(h,[3,1,2]);if(f.length===2||g||y){s=g?[f[0],f[1]*f[2]]:y?[f[0]*f[1],f[2]]:f,u=[s[1],s[0]];let _=16;return p=b=>{let k=N("a",r,s.length),x=F("output",r,u.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(k,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${_+1}>, ${_}>;
  ${b.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${k.getByIndices(`${k.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=O.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:b},...K(s,u)]}},getShaderSource:p}}return p=_=>{let b=N("a",r,s.length),k=F("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(b,k)}

  ${eu(a,i,b,k)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${k.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${k.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=O.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...K(s,u)]}},getShaderSource:p}},qp=(e,t)=>{Xo(e.inputs,t.perm),e.compute(De(e.inputs[0],t.perm))},Wp=e=>he({perm:e.perm})}),iu,au,nu,su,ou,uu,lu,du,pu,cu,Ve,Lp,Vp,Gp,Hp,Fp,jp,Kp,Zp,Qp,Yp,zy=U(()=>{J(),re(),ie(),ln(),_t(),iu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},au={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},nu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},su={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},ou=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},uu=(e,t)=>{let r=[],i=e.length;for(let n=0;n<i;n++)t.indexOf(n)===-1&&r.push(e[n]);let a=t.map(n=>e[n]);return[r,a]},lu=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let n=0;n<r;n++)t.indexOf(n)===-1?i.push(e[a++]):i.push(1);return i},du=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},pu=(e,t)=>{let r=[];if(!du(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},cu=(e,t,r,i,a,n,s)=>{let u=r[0].dims,l=O.size(n),p=O.size(s),f=N("_A",r[0].dataType,u),h=F("output",a,n),g=64;l===1&&(g=256);let y=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,_=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(f,h)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${nu[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${iu[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${au[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${i==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${su[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},Ve=(e,t,r,i)=>{let a=e.inputs.length===1?r:Ra(e.inputs,r),n=a.axes;n.length===0&&!a.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((y,_)=>_));let s=O.normalizeAxes(n,e.inputs[0].dims.length),u=s,l=e.inputs[0],p=pu(u,e.inputs[0].dims.length);p.length>0&&(l=e.compute(De(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=ou(u.length,l.dims.length));let[f,h]=uu(l.dims,u),g=f;a.keepDims&&(g=lu(f,s)),e.compute(cu(t,a.cacheKey,[l],i,e.inputs[0].dataType,g,h),{inputs:[l]})},Lp=(e,t)=>{Ve(e,"ReduceMeanShared",t,"mean")},Vp=(e,t)=>{Ve(e,"ReduceL1Shared",t,"l1")},Gp=(e,t)=>{Ve(e,"ReduceL2Shared",t,"l2")},Hp=(e,t)=>{Ve(e,"ReduceLogSumExpShared",t,"logSumExp")},Fp=(e,t)=>{Ve(e,"ReduceMaxShared",t,"max")},jp=(e,t)=>{Ve(e,"ReduceMinShared",t,"min")},Kp=(e,t)=>{Ve(e,"ReduceProdShared",t,"prod")},Zp=(e,t)=>{Ve(e,"ReduceSumShared",t,"sum")},Qp=(e,t)=>{Ve(e,"ReduceSumSquareShared",t,"sumSquare")},Yp=(e,t)=>{Ve(e,"ReduceLogSumShared",t,"logSum")}}),Ge,hu,ri,Ra,He,fu,mu,gu,yu,_u,wu,bu,$u,vu,xu,Fe,Xp,Jp,ec,tc,rc,ic,ac,nc,sc,oc,ln=U(()=>{J(),re(),ve(),ie(),zy(),Ge=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},hu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],ri=(e,t,r,i,a,n,s=!1,u=!1)=>{let l=[],p=r[0].dims,f=p.length,h=O.normalizeAxes(a,f),g=!u&&h.length===0;p.forEach((b,k)=>{g||h.indexOf(k)>=0?s&&l.push(1):l.push(b)});let y=l.length,_=O.size(l);return{name:e,shaderCache:t,getShaderSource:b=>{let k=[],x=N("_A",r[0].dataType,f),w=F("output",n,y),I=i(x,w,h),S=I[2];for(let E=0,C=0;E<f;E++)g||h.indexOf(E)>=0?(s&&C++,S=`for(var j${E}: u32 = 0; j${E} < ${p[E]}; j${E}++) {
                  ${I[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${x.indicesSet("input_indices",E,`j${E}`)}
                  ${S}
                }`):(k.push(`${x.indicesSet("input_indices",E,w.indicesGet("output_indices",C))};`),C++);return`

        ${b.registerUniform("output_size","u32").declareVariables(x,w)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${k.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${S}
          ${I[3]}
          ${I.length===4?w.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...K(p,l)]})}},Ra=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),he({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},He=(e,t,r,i)=>{let a=e.inputs,n=a.length===1?r:Ra(a,r);e.compute(ri(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&n.axes.length===0?hu:i,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},fu=(e,t)=>{Ge(e.inputs),He(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},mu=(e,t)=>{Ge(e.inputs),He(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},gu=(e,t)=>{Ge(e.inputs),He(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},yu=(e,t)=>{Ge(e.inputs),He(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},_u=(e,t)=>{Ge(e.inputs),He(e,"ReduceMax",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(r.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},wu=(e,t)=>{Ge(e.inputs),He(e,"ReduceMean",t,(r,i,a)=>{let n=1;for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${n});`]})},bu=(e,t)=>{Ge(e.inputs),He(e,"ReduceMin",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},$u=(e,t)=>{Ge(e.inputs),He(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},vu=(e,t)=>{Ge(e.inputs),He(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},xu=(e,t)=>{Ge(e.inputs),He(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Fe=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?i*=e[n]:a*=e[n];return a<32&&i>1024},Xp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wu(e,t):Lp(e,t)},Jp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mu(e,t):Vp(e,t)},ec=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gu(e,t):Gp(e,t)},tc=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yu(e,t):Hp(e,t)},rc=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_u(e,t):Fp(e,t)},ic=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bu(e,t):jp(e,t)},ac=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$u(e,t):Kp(e,t)},nc=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vu(e,t):Zp(e,t)},sc=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xu(e,t):Qp(e,t)},oc=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fu(e,t):Yp(e,t)}}),Yi,uc,lc,Ba,Cy=U(()=>{J(),ve(),ln(),Yi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},uc=(e,t)=>{Yi(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(ri("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},lc=(e,t)=>{Yi(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(ri("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ba=e=>he(e)}),Su,Pr,ku,Tu,Iu,yr,Eu,dc,dn=U(()=>{J(),re(),on(),ie(),Su=(e,t)=>{let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],f=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=a.dims[0]/3,g=h,y=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of t.qkvHiddenSizes)if(I%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let _=p;if(h!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==h+g+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(s){if(g!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=s.dims[3])}let k=_+b,x=-1,w=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==k)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:b,kvSequenceLength:_,totalSequenceLength:k,maxSequenceLength:x,inputHiddenSize:f,hiddenSize:h,vHiddenSize:y,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Pr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,ku=(e,t,r,i,a,n,s,u)=>{let l=$e(s?1:n),p=64,f=n/l;f<p&&(p=32);let h=Math.ceil(n/l/p),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:f},{type:12,data:h}],y=ke(e.dataType,l),_=Ee(1,l),b=["type"];s&&b.push("type"),u&&b.push("type");let k=x=>{let w=F("x",e.dataType,e.dims,l),I=[w],S=s?N("seq_lens",s.dataType,s.dims):void 0;S&&I.push(S);let E=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;E&&I.push(E);let C=Ee(e.dataType),A=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${x.registerUniforms(A).declareVariables(...I)}
  ${x.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Pr(S,E,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${y};${l}`,inputDependencies:b},getShaderSource:k,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:g})}},Tu=(e,t,r,i,a,n,s,u,l)=>{let p=s+n.kvSequenceLength,f=[n.batchSize,n.numHeads,n.sequenceLength,p],h=e>1&&i,g=n.kvNumHeads?n.kvNumHeads:n.numHeads,y=h?[n.batchSize,g,p,n.headSize]:void 0,_=n.nReps?n.nReps:1,b=n.scale===0?1/Math.sqrt(n.headSize):n.scale,k=$e(n.headSize),x=n.headSize/k,w=12,I={x:Math.ceil(p/w),y:Math.ceil(n.sequenceLength/w),z:n.batchSize*n.numHeads},S=[{type:12,data:n.sequenceLength},{type:12,data:x},{type:12,data:p},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:1,data:b},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:_}],E=h&&i&&O.size(i.dims)>0,C=["type","type"];E&&C.push("type"),a&&C.push("type"),u&&C.push("type"),l&&C.push("type");let A=[{dims:f,dataType:t.dataType,gpuDataType:0}];h&&A.push({dims:y,dataType:t.dataType,gpuDataType:0});let v=P=>{let q=N("q",t.dataType,t.dims,k),Y=N("key",r.dataType,r.dims,k),H=[q,Y];if(E){let X=N("past_key",i.dataType,i.dims,k);H.push(X)}a&&H.push(N("attention_bias",a.dataType,a.dims));let Z=u?N("seq_lens",u.dataType,u.dims):void 0;Z&&H.push(Z);let R=l?N("total_sequence_length_input",l.dataType,l.dims):void 0;R&&H.push(R);let D=F("output",t.dataType,f),G=[D];h&&G.push(F("present_key",t.dataType,y,k));let ee=Ee(1,k),Q=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${q.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${q.type.storage}, ${w*w}>;
  ${P.registerUniforms(Q).declareVariables(...H,...G)}
  ${P.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Pr(Z,R,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${E&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ee}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${E&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ee}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(k){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${k}`)}})()};
        output[outputIdx] = ${D.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${k};${a!==void 0};${i!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:A,dispatchGroup:I,programUniforms:S}),getShaderSource:v}},Iu=(e,t,r,i,a,n,s=void 0,u=void 0)=>{let l=n+a.kvSequenceLength,p=a.nReps?a.nReps:1,f=a.vHiddenSize*p,h=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,y=h?[a.batchSize,g,l,a.headSize]:void 0,_=[a.batchSize,a.sequenceLength,f],b=12,k={x:Math.ceil(a.vHeadSize/b),y:Math.ceil(a.sequenceLength/b),z:a.batchSize*a.numHeads},x=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:f},{type:12,data:n},{type:12,data:a.kvSequenceLength},{type:12,data:p}],w=h&&i&&O.size(i.dims)>0,I=["type","type"];w&&I.push("type"),s&&I.push("type"),u&&I.push("type");let S=[{dims:_,dataType:t.dataType,gpuDataType:0}];h&&S.push({dims:y,dataType:t.dataType,gpuDataType:0});let E=C=>{let A=N("probs",t.dataType,t.dims),v=N("v",r.dataType,r.dims),P=[A,v];w&&P.push(N("past_value",i.dataType,i.dims));let q=s?N("seq_lens",s.dataType,s.dims):void 0;s&&P.push(q);let Y=u?N("total_sequence_length_input",u.dataType,u.dims):void 0;u&&P.push(Y);let H=[F("output",t.dataType,_)];h&&H.push(F("present_value",t.dataType,y));let Z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${A.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${A.type.value}, ${b*b}>;
  ${C.registerUniforms(Z).declareVariables(...P,...H)}
  ${C.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Pr(q,Y,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${A.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:S,dispatchGroup:k,programUniforms:x}),getShaderSource:E}},yr=(e,t,r,i,a,n,s,u,l,p,f=void 0,h=void 0)=>{let g=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),y=g>1?p.pastSequenceLength:0,_=y+p.kvSequenceLength,b=l&&O.size(l.dims)>0?l:void 0,k=[t,r];g>1&&s&&O.size(s.dims)>0&&k.push(s),b&&k.push(b),f&&k.push(f),h&&k.push(h);let x=e.compute(Tu(g,t,r,s,b,p,y,f,h),{inputs:k,outputs:g>1?[-1,1]:[-1]})[0];e.compute(ku(x,p.batchSize,p.numHeads,y,p.sequenceLength,_,f,h),{inputs:f&&h?[x,f,h]:[x],outputs:[]});let w=[x,i];g>1&&u&&O.size(u.dims)>0&&w.push(u),f&&w.push(f),h&&w.push(h),e.compute(Iu(g,x,i,u,p,y,f,h),{inputs:w,outputs:g>1?[0,2]:[0]})},Eu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,n=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:i},{type:12,data:a},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=h=>{let g=F("output_q",l[0].dataType,r),y=F("output_k",l[0].dataType,r),_=F("output_v",l[0].dataType,r),b=N("input",l[0].dataType,l[0].dims),k=N("weight",l[1].dataType,l[1].dims),x=N("bias",l[2].dataType,l[2].dims),w=b.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${w}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${w}, ${s*s}>;
  var<workgroup> tileWeightK: array<${w}, ${s*s}>;
  var<workgroup> tileWeightV: array<${w}, ${s*s}>;
  ${h.registerUniforms(I).declareVariables(b,k,x,g,y,_)}
  ${h.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:f},{inputs:l,outputs:[-1,-1,-1]})},dc=(e,t)=>{let r=Su(e.inputs,t),[i,a,n]=Eu(e,r);return yr(e,i,a,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),zu,Cu,Au,pc,Ay=U(()=>{We(),J(),re(),ve(),ie(),zu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,n)=>{let s=a.length;if(s!==i.length)throw new Error(`${n}: num dimensions != ${s}`);a.forEach((u,l)=>{if(u!==i[l])throw new Error(`${n}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Cu=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,n=e[0].dims,s=i?$e(n[n.length-1]):1,u=a==="NHWC"&&n.length>1?s:1,l=O.size(n)/s,p=i,f=p?n.length:n,h=N("x",e[0].dataType,e[0].dims,s),g=N("scale",e[1].dataType,e[1].dims,u),y=N("bias",e[2].dataType,e[2].dims,u),_=N("inputMean",e[3].dataType,e[3].dims,u),b=N("inputVar",e[4].dataType,e[4].dims,u),k=F("y",e[0].dataType,f,s),x=()=>{let I="";if(i)I=`let cOffset = ${n.length===1?"0u":a==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")I=`
            ${k.indicesSet("outputIndices","0","0")}
            let cOffset = ${k.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let S=1;S<g.rank;S++)I+=`cIndices[${S}] = outputIndices[${S}];`;I+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return I},w=I=>`
  const epsilon = ${r};
  ${I.registerUniform("outputSize","u32").declareVariables(h,g,y,_,b,k)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${k.offsetToIndices(`global_idx * ${s}`)};
    ${x()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${k.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...K(n)]:[{type:12,data:l}]})}},Au=e=>he(e),pc=(e,t)=>{let{inputs:r,outputCount:i}=e,a=Au({...t,outputCount:i});if(me.webgpu.validateInputContent&&zu(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Cu(r,a))}}),Ou,Ru,cc,Oy=U(()=>{re(),ie(),Ou=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Ru=e=>{let t=e[0].dims,r=e[0].dims[2],i=O.size(t)/4,a=e[0].dataType,n=N("input",a,t,4),s=N("bias",a,[r],4),u=N("residual",a,t,4),l=F("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(n,s,u,l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},cc=e=>{Ou(e.inputs),e.compute(Ru(e.inputs))}}),Bu,ce,hc,fc,mc,gc,yc,_c,wc,bc,$c,Nu,vc,xc,Sc,kc,cr,Tc,Qr,Ic,Ec,zc,Cc,Ac,Oc,Rc,Bc,Nc,Mc,Dc,Pc,Uc,qc,Wc,Lc,Xi,Vc,Na,Ma,Gc,Hc,Fc,Mu,Du,jc,pn=U(()=>{J(),re(),ve(),ie(),Bu=(e,t,r,i,a,n,s)=>{let u=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let p=N("inputData",r,[u],4),f=F("outputData",i,[u],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(p,f)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",l)}
  }`},ce=(e,t,r,i,a,n=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(O.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:p=>Bu(p,O.size(e.dims),e.dataType,n,r,i,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(O.size(p[0].dims)/64/4)},programUniforms:l})}},hc=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},fc=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},mc=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},gc=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},yc=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},_c=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},wc=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},bc=e=>he(e),$c=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Nu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return he({min:t,max:r})},vc=(e,t)=>{let r=t||Nu(e.inputs),i=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},xc=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},Sc=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},kc=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},cr=e=>he(e),Tc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Qr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Ic=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Qr(t)))},Ec=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},zc=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},Cc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Qr(t)))},Ac=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Oc=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},Rc=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},Bc=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Nc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Mc=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Dc=e=>he(e),Pc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Uc=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},qc=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},Wc=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},Lc=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},Xi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Vc=e=>{e.compute(ce(e.inputs[0],"Tanh",Xi))},Na=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Xi("v")};
}
`,Ma=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Gc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",Ma,Na(t),void 0,e.inputs[0].dataType))},Hc=(e,t)=>{let r=Ee(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Fc=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Mu=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Du=e=>`quick_gelu_impl(${e})`,jc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",Du,Mu(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Pu,Uu,Kc,Ry=U(()=>{re(),ie(),pn(),Pu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Uu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=N("input",e[0].dataType,e[0].dims,4),i=N("bias",e[0].dataType,[e[0].dims[2]],4),a=F("output",e[0].dataType,t,4),n=O.size(t)/4,s=ke(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,a)}

  ${Qr(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Kc=e=>{Pu(e.inputs),e.compute(Uu(e.inputs))}}),qu,Wu,je,Zc,Qc,Yc,Xc,Jc,eh,th,rh,ih,ah,By=U(()=>{J(),re(),ie(),qu=(e,t,r,i,a,n,s,u,l,p,f,h)=>{let g,y;typeof u=="string"?g=y=(w,I)=>`${u}((${w}),(${I}))`:typeof u=="function"?g=y=u:(g=u.scalar,y=u.vector);let _=F("outputData",f,i.length,4),b=N("aData",l,t.length,4),k=N("bData",p,r.length,4),x;if(a)if(n){let w=O.size(t)===1,I=O.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,E=r.length>0&&r[r.length-1]%4===0;w||I?x=_.setByOffset("global_idx",y(w?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),I?`${k.type.value}(${k.getByOffset("0")}.x)`:k.getByOffset("global_idx"))):x=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${k.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",y(s||S?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||E?k.getByOffset("offsetB / 4u"):`${k.type.value}(${k.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else x=_.setByOffset("global_idx",y(b.getByOffset("global_idx"),k.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(I,S,E="")=>{let C=`aData[indexA${S}][componentA${S}]`,A=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${_.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${b.broadcastedIndicesToOffset(`outputIndices${S}`,_)};
            let offsetB${S} = ${k.broadcastedIndicesToOffset(`outputIndices${S}`,_)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${I}[${S}] = ${E}(${g(C,A)});
          `};f===9?x=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:x=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,k,_)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${x}
      }`},Wu=(e,t,r,i,a,n,s=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),p=!O.areEqual(u,l),f=u,h=O.size(u),g=!1,y=!1,_=[p];if(p){let b=Ft.calcShape(u,l,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");f=b.slice(),h=O.size(f);let k=O.size(u)===1,x=O.size(l)===1,w=u.length>0&&u[u.length-1]%4===0,I=l.length>0&&l[l.length-1]%4===0;_.push(k),_.push(x),_.push(w),_.push(I);let S=1;for(let E=1;E<f.length;E++){let C=u[u.length-E],A=l[l.length-E];if(C===A)S*=C;else break}S%4===0?(y=!0,g=!0):(k||x||w||I)&&(g=!0)}else g=!0;return _.push(g),{name:e,shaderCache:{hint:t+_.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>qu(b,u,l,f,g,p,y,a,r.dataType,i.dataType,s,n),getRunData:()=>({outputs:[{dims:f,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(O.size(f)/4)},...K(u,l,f)]})}},je=(e,t,r,i,a,n)=>{e.compute(Wu(t,a??"",e.inputs[0],e.inputs[1],r,i,n))},Zc=e=>{je(e,"Add",(t,r)=>`${t}+${r}`)},Qc=e=>{je(e,"Div",(t,r)=>`${t}/${r}`)},Yc=e=>{je(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Xc=e=>{je(e,"Mul",(t,r)=>`${t}*${r}`)},Jc=e=>{let t=N("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;je(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},eh=e=>{je(e,"Sub",(t,r)=>`${t}-${r}`)},th=e=>{je(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},rh=e=>{je(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},ih=e=>{je(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},ah=e=>{je(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Lu,Vu,Gu,Hu,nh,sh,Ny=U(()=>{J(),re(),ve(),ie(),Lu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,n=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==i.dims[p])throw new Error("non concat dimensions must match")})}})},Vu=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Gu=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(n):a===0?i.push(`if (inputIndex == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (inputIndex == ${a}) { ${n} }`)}return i.join(`
`)},Hu=(e,t,r,i)=>{let a=O.size(r),n=new Array(e.length),s=new Array(e.length),u=0,l=[],p=[],f=[{type:12,data:a}];for(let b=0;b<e.length;++b)u+=e[b].dims[t],n[b]=u,p.push(e[b].dims.length),s[b]=N(`input${b}`,i,p[b]),l.push("rank"),f.push({type:12,data:n[b]});for(let b=0;b<e.length;++b)f.push(...K(e[b].dims));f.push(...K(r));let h=F("output",i,r.length),g=h.indicesGet("indices",t),y=Array.from(Array(n.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),_=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let k=0;k<e.length;k++)b.registerUniform(`sizeInConcatAxis${k}`,"u32");return b.declareVariables(...s,h)})()}

  ${Vu(n.length,y)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${y});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Gu(s,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}),getShaderSource:_}},nh=(e,t)=>{let r=e.inputs,i=r[0].dims,a=O.normalizeAxis(t.axis,i.length);Lu(r,a);let n=i.slice();n[a]=r.reduce((u,l)=>u+(l.dims.length>a?l.dims[a]:0),0);let s=r.filter(u=>O.size(u.dims)>0);e.compute(Hu(s,a,n,r[0].dataType),{inputs:s})},sh=e=>he({axis:e.axis})}),Bt,Nt,Mt,cn,Pt=U(()=>{J(),re(),Bt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Nt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Mt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},cn=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Op,Rp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Ie,oh,hn=U(()=>{Ie=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},oh=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),uh,My=U(()=>{uh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),fr,fn,mn=U(()=>{J(),re(),ie(),Pt(),fr=(e,t,r,i,a)=>{let n=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${j(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,j(a,u+n,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},fn=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],p=u[u.length-1],f=s[s.length-1],h=$e(p),g=$e(f),y=$e(l),_=O.size(r)/h/y,b=e.length>2,k=i?i.slice(0,-2):r.slice(0,-2),x=[O.size(k),l,p],w=[{type:12,data:_},{type:12,data:l},{type:12,data:p},{type:12,data:f}];Nt(t,w),w.push(...K(k,s,u)),b&&w.push(...K(e[2].dims)),w.push(...K(x));let I=S=>{let E=un("batch_dims",e[0].dataType,k.length),C=N("a",e[0].dataType,s.length,g),A=N("b",e[1].dataType,u.length,h),v=F("output",e[0].dataType,x.length,h),P=ke(v.type.tensor),q=Bt(t,v.type.value,P),Y=[C,A],H="";if(b){let D=a?h:1;Y.push(N("bias",e[2].dataType,e[2].dims.length,D)),H=`${a?`value += bias[col / ${D}];`:`value += ${v.type.value}(bias[row + i]);`}`}let Z=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Mt(t,Z);let R=()=>{let D=`var a_data: ${C.type.value};`;for(let G=0;G<g;G++)D+=`
              let b_data${G} = b[(b_offset + (k + ${G}) * uniforms.N + col) / ${h}];`;for(let G=0;G<y;G++){D+=`a_data = a[(a_offset + (row + ${G}) * uniforms.K + k) / ${g}];`;for(let ee=0;ee<g;ee++)D+=`
            values[${G}] = fma(${A.type.value}(a_data${g===1?"":`[${ee}]`}), b_data${ee}, values[${G}]);
`}return D};return`
  ${S.registerUniforms(Z).registerInternalVariables(E).declareVariables(...Y,v)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${fr("a_indices",C,C.rank-2,E.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${A.type.indices};
    ${fr("b_indices",A,A.rank-2,E.rank,"batch_indices")}
    ${A.indicesSet("b_indices",A.rank-2,0)}
    ${A.indicesSet("b_indices",A.rank-1,0)}
    let b_offset = ${A.indicesToOffset("b_indices")};
    var values: array<${v.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${R()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${H}
      ${q}
      let cur_indices = ${v.type.indices}(batch, row + i, col);
      let offset = ${v.indicesToOffset("cur_indices")};
      ${v.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${g};${y};${a}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:w}),getShaderSource:I}}}),Fu,ju,Da,Ji,Ku,Pa,Zu,ii,gn=U(()=>{J(),re(),ie(),Pt(),mn(),hn(),Fu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,ju=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Da=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32)=>{let l=t[1]*e[1],p=t[0]*e[0],f=a?l:n,h=a?n:l,g=f/t[0],y=n/t[1];if(!((a&&g===4&&e[1]===4||!a&&(g===3||g===4))&&f%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${f/g}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Fu(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${ju(a,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ji=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Ku=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Pa=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32,l=!1)=>{let p=e[1]*t[1],f=e[0]*t[0],h=a?p:n,g=a?n:p;if(!(g%t[1]===0&&h%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let y=g/t[1],_=h/t[0],b=n/t[1],k=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Ji(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ji(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Ku(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${h}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${k}
  }
`},Zu=(e,t,r,i,a=!1)=>{let[n,s,u,l]=i,p=ke(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Ie(e,p)} {
      var value = ${Ie(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${fr("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Ie(e,p)} {
      var value = ${Ie(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${fr("bIndices",u,u.rank-2,n.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ie(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Ie(e,p)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ii=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),p=u.slice(0,-2),f=i?i.slice(0,-2):r.slice(0,-2),h=O.size(f),g=s[s.length-2],y=s[s.length-1],_=u[u.length-1],b=y%4===0&&_%4===0,k=g<=8?[4,1,1]:[4,4,1],x=[8,8,1],w=[Math.ceil(_/x[0]/k[0]),Math.ceil(g/x[1]/k[1]),Math.ceil(h/x[2]/k[2])],I=b?4:1,S=[...l,g,y/I],E=S.length,C=[...p,y,_/I],A=C.length,v=[h,g,_/I],P=[{type:6,data:g},{type:6,data:_},{type:6,data:y}];Nt(t,P),P.push(...K(f,S,C));let q=["rank","rank"],Y=e.length>2;Y&&(P.push(...K(e[2].dims)),q.push("rank")),P.push(...K(v));let H=Z=>{let R=f.length,D=un("batchDims",e[0].dataType,R,1),G=ke(e[0].dataType),ee=N("a",e[0].dataType,E,I),Q=N("b",e[1].dataType,A,I),X=F("result",e[0].dataType,v.length,I),de=[ee,Q];if(Y){let Ae=a?I:1;de.push(N("bias",e[2].dataType,e[2].dims.length,Ae))}let M=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Mt(t,M);let L=ke(X.type.tensor),te=Bt(t,X.type.value,L),oe=Zu(I,Y,te,[D,ee,Q,X],a);return`
  ${Z.registerUniforms(M).registerInternalVariables(D).declareVariables(...de,X)}
  ${oe}
  ${b?Da(k,x,G,D):Pa(k,x,G,D)}
                   `};return{name:"MatMul",shaderCache:{hint:`${k};${t.activation};${b};${a}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:P}),getShaderSource:H}}}),Qu,lh,Dy=U(()=>{J(),ot(),ie(),Pt(),hn(),My(),gn(),Qu=(e,t,r,i,a=!1,n,s=4,u=4,l=4,p="f32")=>{let f=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},h=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,y=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",k=e?"row":"col",x=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${k} / outWidth;
    let outCol = ${k} % outWidth;

    let WRow = ${x} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${x} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${x} % inChannels;
    var resData = ${Ie(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${b}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`,I=e?t&&i?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Ie(s,p)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${w}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Ie(s,p)}(0.0);`,S=e?i&&r?h(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(u)}
    }
    return ${Ie(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(u)}
    }
    return ${Ie(u,p)}(0.0);`,E=Ie(l,p),C=Ie(e?s:u,p),A=Ie(e?u:s,p),v=Bt(n,E,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?I:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${E}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${oh(a)}
      ${v}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},lh=(e,t,r,i,a,n,s,u,l)=>{let p=t.format==="NHWC",f=p?e[0].dims[3]:e[0].dims[1],h=r[0],g=p?r[2]:r[3],y=p?r[1]:r[2],_=p?r[3]:r[1],b=p&&(f%4===0||f%3===0)&&_%4===0,k=p?_:g*y,x=p?g*y:_,w=[8,8,1],I=i<=8?[4,1,1]:[4,4,1],S=[Math.ceil(k/w[0]/I[0]),Math.ceil(x/w[1]/I[1]),Math.ceil(h/w[2]/I[2])];le("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let E=b?p&&f%4!==0?3:4:1,C=w[1]*I[1],A=w[0]*I[0],v=Math.max(w[0]*E,w[1]),P=i%C===0,q=a%A===0,Y=n%v===0,H=b?[E,4,4]:[1,1,1],Z=[{type:6,data:i},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Nt(t,Z),Z.push(...K(e[0].dims,e[1].dims));let R=["rank","rank"];s&&(Z.push(...K(e[2].dims)),R.push("rank")),Z.push(...K(r));let D=G=>{let ee=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Mt(t,ee);let Q=b?4:1,X=ke(e[0].dataType),de=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${X}>`:X}) {
        result[flatIndex] = ${b?`vec4<${X}>`:X}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${X}>`:X}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,M=N("x",e[0].dataType,e[0].dims.length,E===3?1:E),L=N("w",e[1].dataType,e[1].dims.length,Q),te=[M,L],oe=F("result",e[0].dataType,r.length,Q);if(s){let Ae=N("bias",e[2].dataType,e[2].dims.length,Q);te.push(Ae),de+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${X}>`:X} {
          return bias[coords.${p?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${uh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${G.registerUniforms(ee).declareVariables(...te,oe)}
        ${de}
        ${Qu(p,P,q,Y,s,t,H[0],H[1],H[2],X)}
        ${b?Da(I,w,X,void 0,!p,v):Pa(I,w,X,void 0,!p,v,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${E};${b};${P};${q};${Y};${C};${A};${v}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:Z}),getShaderSource:D}}}),Yu,ea,ar,Xu,ta,Ju,dh,ph,Py=U(()=>{J(),ot(),re(),ie(),Pt(),hn(),Yu=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},ea=e=>typeof e=="number"?[e,e,e]:e,ar=(e,t)=>t<=1?e:e+(e-1)*(t-1),Xu=(e,t,r,i=1)=>{let a=ar(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},ta=(e,t,r,i,a)=>{a==null&&(a=Xu(e,t[0],i[0]));let n=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*a)/i[s]+1));return n},Ju=(e,t,r,i,a,n,s,u,l,p)=>{let f,h,g,y;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=ta([t,r,i,1],[u,l,p],1,[a,n,s],e);h=_[0],g=_[1],y=_[2]}else if(Array.isArray(e)){if(!e.every((b,k,x)=>b===x[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=ta([t,r,i,1],[u,l,p],1,[a,n,s],e[0]);h=_[0],g=_[1],y=_[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/a),g=Math.ceil(r/n),y=Math.ceil(i/s);let _=(h-1)*a+u-t,b=(g-1)*n+l-r,k=(y-1)*s+p-i,x=Math.floor(_/2),w=_-x,I=Math.floor(b/2),S=b-I,E=Math.floor(k/2),C=k-E;f={top:I,bottom:S,left:E,right:C,front:x,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:h,outHeight:g,outWidth:y}},dh=(e,t,r,i,a,n=!1,s="channelsLast")=>{let u,l,p,f,h;if(s==="channelsLast")[u,l,p,f,h]=e;else if(s==="channelsFirst")[u,h,l,p,f]=e;else throw new Error(`Unknown dataFormat ${s}`);let[g,,y,_,b]=t,[k,x,w]=ea(r),[I,S,E]=ea(i),C=ar(y,I),A=ar(_,S),v=ar(b,E),{padInfo:P,outDepth:q,outHeight:Y,outWidth:H}=Ju(a,l,p,f,k,x,w,C,A,v),Z=n?g*h:g,R=[0,0,0,0,0];return s==="channelsFirst"?R=[u,Z,q,Y,H]:s==="channelsLast"&&(R=[u,q,Y,H,Z]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:p,inWidth:f,inChannels:h,outDepth:q,outHeight:Y,outWidth:H,outChannels:Z,padInfo:P,strideDepth:k,strideHeight:x,strideWidth:w,filterDepth:y,filterHeight:_,filterWidth:b,effectiveFilterDepth:C,effectiveFilterHeight:A,effectiveFilterWidth:v,dilationDepth:I,dilationHeight:S,dilationWidth:E,inShape:e,outShape:R,filterShape:t}},ph=(e,t,r,i,a,n)=>{let s=n==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let u=[64,1,1],l={x:r.map((k,x)=>x)},p=[Math.ceil(Yu(l.x.map(k=>r[k]))/u[0]),1,1];le("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let f=1,h=O.size(r),g=[{type:12,data:h},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Nt(t,g),g.push(...K(e[0].dims,e[1].dims));let y=["rank","rank"],_=e.length===3;_&&(g.push(...K(e[2].dims)),y.push("rank")),g.push(...K(r));let b=k=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Mt(t,x);let w=1,I=ke(e[0].dataType),S=N("x",e[0].dataType,e[0].dims.length,f),E=N("W",e[1].dataType,e[1].dims.length,w),C=[S,E],A=F("result",e[0].dataType,r.length,w),v="";if(_){let Y=N("bias",e[2].dataType,e[2].dims.length,w);C.push(Y),v+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${I} {
          return bias[${s?j("coords",4,5):j("coords",1,5)}];
        }`}let P=Ie(f,I),q=Bt(t,P,I);return`
            ${v}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
          ${k.registerUniforms(x).declareVariables(...C,A)}
          ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${A.offsetToIndices("global_idx")};
              let batch = ${j("coords",0,S.rank)};
              let d2 = ${s?j("coords",S.rank-1,S.rank):j("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${s?j("coords",1,S.rank):j("coords",2,S.rank)},
              ${s?j("coords",2,S.rank):j("coords",3,S.rank)},
              ${s?j("coords",3,S.rank):j("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?j("uniforms.x_shape",1,S.rank):j("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${s?j("uniforms.x_shape",2,S.rank):j("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${s?j("uniforms.x_shape",3,S.rank):j("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${s?j("uniforms.x_shape",4,S.rank):j("uniforms.x_shape",1,S.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${_?"value = value + getBiasByOutputCoords(coords)":""};
              ${q}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${f};${_}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:g}),getShaderSource:b}}}),ch,hh,Uy=U(()=>{J(),re(),ie(),Pt(),ch=(e,t,r,i)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],f=p/t.group,h=l&&f>=4?$e(p):1,g=O.size(r)/h,y=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Nt(t,y),y.push(...K(s,[u[0],u[1],u[2],u[3]/h]));let _=a?["rank","rank","rank"]:["rank","rank"];y.push(...K([r[0],r[1],r[2],r[3]/h]));let b=k=>{let x=F("output",e[0].dataType,r.length,h),w=ke(x.type.tensor),I=Bt(t,x.type.value,w),S=N("x",e[0].dataType,s.length),E=N("w",e[1].dataType,u.length,h),C=[S,E];a&&C.push(N("b",e[2].dataType,e[2].dims,h));let A=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Mt(t,A);let v=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${S.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${E.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${S.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${E.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${k.registerUniforms(A).declareVariables(...C,x)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${x.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${x.type.value} = ${x.type.value}(0);
    ${v}
    ${n}
    ${I}
    ${x.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:b}},hh=(e,t,r,i)=>{let a=e.length>2,n=$e(r[3]),s=$e(r[2]),u=O.size(r)/n/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],f=[r[0],r[1],r[2],r[3]/n],h=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Nt(t,h),h.push(...K(l,p,f));let g=(s-1)*t.strides[1]+p[1],y=_=>{let b=F("output",e[0].dataType,f.length,n),k=ke(b.type.tensor),x=Bt(t,b.type.value,k),w=N("x",e[0].dataType,l.length,n),I=N("w",e[1].dataType,p.length,n),S=[w,I];a&&S.push(N("b",e[2].dataType,e[2].dims,n));let E=a?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Mt(t,C),`
  ${_.registerUniforms(C).declareVariables(...S,b)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${g}>;
    var values: array<${b.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${E}
      ${x}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${g};${p[0]};${p[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:y}}}),el,Ur,tl,qr,Ua,ra,rl,il,qa,qy=U(()=>{re(),Dy(),Py(),gn(),Uy(),Pt(),mn(),_t(),el=(e,t,r,i,a,n)=>{let s=e[0],u=e.slice(n?1:2,n?3:4),l=u.length,p=t[0],f=t.slice(2).map((g,y)=>g+(g-1)*(r[y]-1)),h=u.map((g,y)=>g+i[y]+i[y+l]).map((g,y)=>Math.floor((g-f[y]+a[y])/a[y]));return h.splice(0,0,s),h.splice(n?3:1,0,p),h},Ur=[2,3,1,0],tl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},qr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let n=2;n<t[1].dims.length;++n)r[n-2]===0&&(r[n-2]=t[1].dims[n]);let i=e.pads.slice();ti.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},Ua=e=>{let t=cn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,n=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},ra=(e,t,r,i)=>{let a=r.format==="NHWC",n=el(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let C=[t[0]];if(a){let A=e.kernelCustomData.wT??e.compute(De(t[1],Ur),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=A),C.push(A)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(hh(C,r,n,i),{inputs:C}):e.compute(ch(C,r,n,i),{inputs:C});return}let s=t.length===3,u=t[0].dims[a?1:2],l=t[0].dims[a?2:3],p=t[0].dims[a?3:1],f=t[1].dims[2],h=t[1].dims[3],g=n[a?1:2],y=n[a?2:3],_=n[a?3:1],b=a&&f===u&&h===l&&r.pads[0]===0&&r.pads[1]===0;if(b||f===1&&h===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=n[0],A,v,P,q=[];if(a){let Z=e.kernelCustomData.wT??e.compute(De(t[1],Ur),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=Z),b){let R=u*l*p;A=t[0].reshape([1,C,R]),v=Z.reshape([1,R,_]),P=[1,C,_]}else A=t[0].reshape([C,u*l,p]),v=Z.reshape([1,p,_]),P=[C,g*y,_];q.push(A),q.push(v)}else A=t[0].reshape([C,p,u*l]),v=t[1].reshape([1,_,p]),P=[C,_,g*y],q.push(v),q.push(A);s&&q.push(t[2]);let Y=P[2],H=q[0].dims[q[0].dims.length-1];Y<8&&H<8?e.compute(fn(q,r,n,P,a,i),{inputs:q}):e.compute(ii(q,r,n,P,a,i),{inputs:q});return}let k=!0,x=e.kernelCustomData.wT??e.compute(De(t[1],Ur),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let w=[t[0],x];s&&w.push(t[2]);let I=a?g*y:_,S=a?_:g*y,E=f*h*p;e.compute(lh(w,r,n,I,S,E,s,k,i),{inputs:w})},rl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=qr({...t,pads:a,strides:n,dilations:s,kernelShape:u},i);ra(e,i,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},il=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=qr(r,t),n=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=dh(t[0].dims,t[1].dims,r.strides,r.dilations,n,!1,i);e.compute(ph(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},qa=(e,t)=>{if(tl(e.inputs,t),e.inputs[0].dims.length===3)rl(e,t);else if(e.inputs[0].dims.length===5)il(e,e.inputs,t);else{let r=qr(t,e.inputs);ra(e,e.inputs,r)}}}),fh,Wy=U(()=>{J(),ot(),re(),ie(),fh=(e,t,r)=>{let i=e.length>2,a=t.outputShape,n=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,p=u[3],f=n?$e(l):1,h=n&&p===1&&l>=4,g=h?Math.floor(l/4)*4:Math.floor(l/f)*f,y=l-g,_=n?$e(p):1,b=n?p===1?f:_:1,k=O.size(a)/_,x=[Math.ceil(k/64),1,1];le("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${x}`);let w=["rank","rank"],I=[t.strides[0],t.strides[1]],S=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],E=[t.dilations[0],t.dilations[1]],C=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],A=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],v=[{type:12,data:k},{type:12,data:I},{type:12,data:S},{type:12,data:E},{type:12,data:C},{type:6,data:A},{type:12,data:g},{type:12,data:l},{type:12,data:p},...K(e[0].dims,e[1].dims)];i&&(v.push(...K(e[2].dims)),w.push("rank")),v.push(...K(a));let P=q=>{let Y=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],H=ke(e[0].dataType),Z=n?1:2,R=n?2:3,D=n?3:1,G=N("W",e[1].dataType,e[1].dims.length,b),ee=N("Dy",e[0].dataType,e[0].dims.length,f),Q=[ee,G];i&&Q.push(N("bias",e[2].dataType,[a[D]].length,_));let X=F("result",e[0].dataType,a.length,_),de=()=>{let te="";if(h)f===4?te+=`
        let xValue = ${ee.getByOffset("x_offset")};
        let wValue = ${G.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:f===2?te+=`
          dotProd = dotProd + dot(vec4<${H}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}), vec4<${H}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:f===1&&(te+=`
          dotProd = dotProd + dot(vec4<${H}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}, ${ee.getByOffset("x_offset + 2u")}, ${ee.getByOffset("x_offset + 3u")}), vec4<${H}>(${G.getByOffset("w_offset")}, ${G.getByOffset("w_offset + 1u")}, ${G.getByOffset("w_offset + 2u")}, ${G.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(te+=`
                  let xValue = ${n?ee.getByOffset(`${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):ee.get("batch","inputChannel","idyR","idyC")};
        `,f===1)te+=`
          let w_offset = ${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${G.getByOffset(`w_offset / ${b}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let oe=0;oe<f;oe++)te+=`
            let wValue${oe} = ${G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${oe}, wOutChannel)`)} / ${b}`)};
            dotProd = dotProd + xValue[${oe}] * wValue${oe};`;return te},M=()=>{if(y===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let te="";if(f===1){te+="dotProd = dotProd";for(let oe=0;oe<y;oe++)te+=`
            + ${ee.getByOffset(`x_offset + ${oe}`)} * ${G.getByOffset(`w_offset + ${oe}`)}`;te+=";"}else if(f===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);te+=`
          let xValue = ${ee.getByOffset("x_offset")};
          let wValue = ${G.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return te},L=`
            let outputIndices = ${X.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${X.indicesGet("outputIndices",0)};
            let d1 = ${X.indicesGet("outputIndices",D)};
            let r = ${X.indicesGet("outputIndices",Z)};
            let c = ${X.indicesGet("outputIndices",R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${X.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${H}(dyRCorner) + ${H}(wR)) / ${H}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${H}(uniforms.Dy_shape[${Z}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${H}(dyCCorner) + ${H}(wC)) / ${H}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${H}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h?`
                var x_offset = ${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${G.indicesToOffset(`${G.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${b};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:f}) {
                  ${de()}
                  inputChannel = inputChannel + ${h?4:f};
                }
                ${M()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${_}]`:""};
            ${X.setByOffset("global_idx","value")};
          `;return`
    ${q.registerUniforms(Y).declareVariables(...Q,X)}
      ${q.mainStart()}
      ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${L}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${b}${_}${h}${y}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:x[0],y:x[1],z:x[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:v}),getShaderSource:P}}}),al,nl,sl,ia,mh,ol,aa,ul,gh,Ly=U(()=>{Wy(),Pt(),_t(),al=(e,t,r,i,a,n)=>(e-1)*t+r+(i-1)*a+1-n,nl=(e,t,r,i,a)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=n,r[a]=e-n):t==="SAME_LOWER"&&(r[i]=e-n,r[a]=n)},sl=(e,t,r,i,a,n,s,u,l,p)=>{let f=e.length-2,h=p.length===0;l.length<f&&l.push(...Array(f-l.length).fill(0));let g=e[0],y=t[u?3:1]*a;for(let _=0,b=e.length-f-(u?1:0);_<f;++_,++b){let k=e[b],x=h?k*s[_]:p[_],w=al(k,s[_],n[_],t[b],r[_],x);nl(w,i,n,_,_+f),h&&p.push(s[_]*(k-1)+l[_]+(t[b]-1)*r[_]+1-n[_]-n[_+f])}p.splice(0,0,g),p.splice(u?3:1,0,y)},ia=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,g)=>h*g,1)===0){r.length=0;for(let h=2;h<t[1].dims.length;++h)r.push(t[1].dims[h])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((h,g)=>h+g,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let p=e.strides.slice();if(p.reduce((h,g)=>h+g,0)===0){let h=t[0].dims.length-2;p=new Array(h).fill(1)}sl(u,r,l,e.autoPad,e.group,a,p,i,s,n);let f=Object.assign({},e);return Object.assign(f,{kernelShape:r,pads:a,outputPadding:s,outputShape:n,dilations:l,strides:p}),f},mh=e=>{let t=cn(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group??1,s=e.kernelShape,u=e.pads,l=e.strides,p=e.wIsConst(),f=e.outputPadding,h=e.outputShape;return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,outputPadding:f,outputShape:h,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},ol=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},aa=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(De(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];t.length===3&&n.push(t[2]),e.compute(fh(n,r,i),{inputs:n})},ul=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),n=[1].concat(n),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let p=ia({...t,pads:u,strides:s,dilations:n,kernelShape:a,outputPadding:l},i);aa(e,i,p,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},gh=(e,t)=>{if(ol(e.inputs,t),e.inputs[0].dims.length===3)ul(e,t);else{let r=ia(t,e.inputs);aa(e,e.inputs,r)}}}),ll,yh,_h,Vy=U(()=>{J(),re(),ve(),ie(),ll=(e,t,r,i)=>{let a=O.size(t),n=t.length,s=N("input",e,n),u=F("output",e,n),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=O.normalizeAxis(l,n),f=h=>{let g=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,y=j("uniforms.input_shape","uniforms.axis",n),_=i.reverse?g+(i.exclusive?" + 1":""):"0",b=i.reverse?y:g+(i.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:p},...K(t,t)]}),getShaderSource:f}},yh=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(ll(i,r,a,t),{inputs:[0]})},_h=e=>{let t=e.exclusive===1,r=e.reverse===1;return he({exclusive:t,reverse:r})}}),dl,pl,cl,wh,bh,Gy=U(()=>{J(),re(),ve(),ie(),dl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},pl=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)a.push(r.indicesSet("a",e[n],`i[${n}]`));return a.push("return a;}"),a.join(`
`)},cl=(e,t)=>{let r,i,a,n,s,u,l=t.format==="NHWC",p=t.blocksize,f=t.mode==="DCR";l?([r,i,a,n]=e.dims,s=f?[r,i,a,p,p,n/p**2]:[r,i,a,n/p**2,p,p],u=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=f?[r,p,p,n/p**2,i,a]:[r,n/p**2,p,p,i,a],u=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),g=h.dims.length,y=e.dataType,_=N("a",y,g),b=F("output",y,g),k=x=>`
  ${x.registerUniform("output_size","u32").declareVariables(_,b)}

  ${pl(u,g,_,b)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:x=>{let w=l?[r,i*p,a*p,n/p**2]:[r,n/p**2,i*p,a*p],I=O.size(w),S=h.dims,E=O.sortBasedOnPerm(S,u);return{outputs:[{dims:w,dataType:x[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...K(S,E)]}},getShaderSource:k}},wh=(e,t)=>{dl(e.inputs),e.compute(cl(e.inputs[0],t))},bh=e=>he({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Wr,nr,na,hl,fl,ml,gl,sa,yl,$h,vh,Hy=U(()=>{J(),re(),ve(),ie(),Wr="[a-zA-Z]|\\.\\.\\.",nr="("+Wr+")+",na="^"+nr+"$",hl="("+nr+",)*"+nr,fl="^"+hl+"$",ml=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},gl=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(fl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,n)=>{let s=e[n].dims.slice();if(!a.match(RegExp(na)))throw new Error("Invalid LHS term");let u=this.processTerm(a,!0,s,n);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,n])=>n.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(nr)))throw new Error("Invalid RHS");i.match(RegExp(Wr,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let n=this.symbolToInfo.get(a);if(n===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(n.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,n=!1,s=[],u=0;if(!e.match(RegExp(na))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Wr,"g")),p=new ml(i);return l?.forEach((f,h)=>{if(f==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let g=a-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<s.length;y++){let _=String.fromCharCode(48+y);p.addSymbol(_,h+y),this.addSymbol(_,r[u++],i)}}else p.addSymbol(f,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,r[u++],i)}),p}},sa=e=>e+"_max",yl=(e,t,r,i)=>{let a=e.map(p=>p.length).map((p,f)=>N(`input${f}`,t,p)),n=O.size(i),s=F("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),l=p=>{let f=[],h="var prod = 1.0;",g="var sum = 0.0;",y="sum += prod;",_=[],b=[],k=[],x=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((S,E)=>{if(r.rhs.symbolToIndices.has(E)){let C=r.rhs.symbolToIndices.get(E)?.[0];C!==void 0&&r.lhs.forEach((A,v)=>{if(S.inputIndices.includes(v)){let P=A.symbolToIndices.get(E);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(q=>{f.push(`${a[v].indicesSet(`input${v}Indices`,q,s.indicesGet("outputIndices",C))}`)})}})}else r.lhs.forEach((C,A)=>{if(S.inputIndices.includes(A)){let v=C.symbolToIndices.get(E);if(v===void 0)throw new Error("Invalid symbol error");v.forEach(P=>{_.push(`${a[A].indicesSet(`input${A}Indices`,P,`${E}`)}`)}),x.push(`prod *= ${a[A].getByIndices(`input${A}Indices`)};`)}}),b.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${sa(E)}; ${E}++) {`),k.push("}")});let I=w?[...f,`let sum = ${a.map((S,E)=>S.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...f,g,...b,..._,h,...x,y,...k];return`
            ${p.registerUniforms(u.map(S=>({name:`${sa(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((S,E)=>`var input${E}Indices: ${a[E].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));p.push({type:12,data:n});let f=e.map((h,g)=>[...K(h)]).reduce((h,g)=>h.concat(g),p);return f.push(...K(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:f}},getShaderSource:l}},$h=(e,t)=>{let r=new gl(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((n,s)=>n.dims);e.compute(yl(a,e.inputs[0].dataType,r,i))},vh=e=>{let t=e.equation.replace(/\s+/g,"");return he({equation:t})}}),_l,oa,wl,bl,xh,Fy=U(()=>{J(),re(),ie(),_l=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},oa=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},wl=(e,t)=>e.length>t.length?oa(e,t):oa(t,e),bl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=wl(t,r),a=e[0].dataType,n=a===9||O.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=n||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(O.size(i)/u),p=h=>{let g=N("input",a,t.length,s),y=F("output",a,i.length,u),_;if(a===9){let b=(k,x,w="")=>`
          let outputIndices${x} = ${y.offsetToIndices(`outputOffset + ${x}u`)};
          let offset${x} = ${g.broadcastedIndicesToOffset(`outputIndices${x}`,y)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${k}[${x}] = ${w}(${g.getByOffset(`index${x}`)}[component${x}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(g,y)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},f=[{type:12,data:l},...K(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f})}},xh=e=>{_l(e.inputs),e.compute(bl(e.inputs),{inputs:[0]})}}),$l,Sh,jy=U(()=>{J(),re(),ie(),pn(),$l=e=>{let t=e[0].dataType,r=O.size(e[0].dims),i=O.size(e[1].dims),a=i%4===0,n=s=>{let u=N("x",t,[1],4),l=N("bias",t,[1],4),p=F("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${l.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,g=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(u,l,p)}

    ${Na(Ee(t))}

    ${s.mainStart(jt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",Ma("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/jt/4)}})}},Sh=e=>{e.inputs.length<2||O.size(e.inputs[1].dims)===0?Gc(e):e.compute($l(e.inputs))}}),vl,xl,kh,Th,Ky=U(()=>{J(),re(),ve(),ie(),vl=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},xl=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=O.normalizeAxis(t.axis,a),s=r.slice(0);s.splice(n,1,...i);let u=r[n],l=e[0].dataType===9?4:1,p=Math.ceil(O.size(s)/l),f=[{type:12,data:p},{type:6,data:u},{type:12,data:n},...K(e[0].dims,e[1].dims,s)],h=g=>{let y=N("data",e[0].dataType,e[0].dims.length,l),_=N("inputIndices",e[1].dataType,e[1].dims.length),b=F("output",e[0].dataType,s.length,l),k=w=>{let I=i.length,S=`var indicesIndices${w}  = ${_.type.indices}(0);`;for(let E=0;E<I;E++)S+=`${I>1?`indicesIndices${w}[${E}]`:`indicesIndices${w}`} = ${s.length>1?`outputIndices${w}[uniforms.axis + ${E}]`:`outputIndices${w}`};`;S+=`
          var idx${w} = ${_.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${y.type.indices};
        `;for(let E=0,C=0;E<a;E++)E===n?(S+=`${a>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = u32(idx${w});`,C+=I):(S+=`${a>1?`dataIndices${w}[${E}]`:`dataIndices${w}`} = ${s.length>1?`outputIndices${w}[${C}]`:`outputIndices${w}`};`,C++);return S},x;if(e[0].dataType===9){let w=(I,S,E="")=>`
          let outputIndices${S} = ${b.offsetToIndices(`outputOffset + ${S}u`)};
          ${k(S)};
          let offset${S} = ${y.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${I}[${S}] = ${E}(${y.getByOffset(`index${S}`)}[component${S}]);
        `;x=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else x=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${k("")};
      let value = ${y.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,_,b)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${x}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:h}},kh=e=>he({axis:e.axis}),Th=(e,t)=>{let r=e.inputs;vl(r),e.compute(xl(e.inputs,t))}}),Sl,Ih,Eh,Zy=U(()=>{J(),re(),ie(),Sl=(e,t,r,i,a,n,s,u,l)=>{let p=[{type:12,data:n},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],f=[n];p.push(...K(t.dims,f));let h=g=>{let y=N("indices_data",t.dataType,t.dims.length),_=F("input_slice_offsets_data",12,1,1),b=[y,_],k=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(k).declareVariables(...b)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},Ih=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,n=r[1].dims,s=n[n.length-1],u=O.sizeToDimension(n,n.length-1),l=O.sizeFromDimension(i,t.batchDims+s),p=O.sizeToDimension(i,t.batchDims),f=O.sizeFromDimension(i,t.batchDims),h=u/p,g=new Array(s),y=l;for(let S=0;S<s;++S)g[s-1-S]=y,y*=i[t.batchDims+s-1-S];let _=Sl(e,r[1],g,t.batchDims,i,u,h,f,s),b=t.batchDims+s;if(b>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let k=n.slice(0,-1).concat(i.slice(b)),x=O.size(k),w=[{type:12,data:x},{type:12,data:l},...K(r[0].dims,_.dims,k)],I=S=>{let E=N("data",r[0].dataType,r[0].dims.length),C=N("slice_offsets",12,_.dims.length),A=F("output",r[0].dataType,k.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(E,C,A)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:k,dataType:a}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:w}),getShaderSource:I},{inputs:[r[0],_]})},Eh=e=>({batchDims:e.batch_dims,cacheKey:""})}),kl,Tl,zh,Ch,Qy=U(()=>{J(),re(),ve(),ie(),kl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=O.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],n=e[2],s=e.length===4?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((u,l)=>l===r?Math.ceil(u/i)===n.dims[l]:u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((u,l)=>u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Tl=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=O.normalizeAxis(t.gatherAxis,a),s=O.normalizeAxis(t.quantizeAxis,a),u=r.slice(0);u.splice(n,1,...i);let l=O.size(u),p=e[2].dataType,f=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:s},{type:12,data:n},{type:12,data:t.blockSize},...K(...e.map((y,_)=>y.dims),u)],g=y=>{let _=N("data",e[0].dataType,e[0].dims.length),b=N("inputIndices",e[1].dataType,e[1].dims.length),k=N("scales",e[2].dataType,e[2].dims.length),x=e.length>3?N("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=F("output",p,u.length),I=[_,b,k];x&&I.push(x);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(S).declareVariables(...I,w)}
        ${y.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${k.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${k.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${k.getByIndices("scale_indices")};
        ${x?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ee(p)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,_)=>_!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:g}},zh=(e,t)=>{let r=e.inputs;kl(r,t),e.compute(Tl(e.inputs,t))},Ch=e=>he({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Il,El,Ah,Oh,Yy=U(()=>{J(),re(),ve(),ie(),Il=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},El=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,n=e[1].dims,s=e[1].dataType,u=O.normalizeAxis(t.axis,a),l=r[u],p=n.slice(0),f=O.size(p),h=N("input",i,a),g=N("indicesInput",s,n.length),y=F("output",i,p.length),_=[{type:12,data:f},{type:6,data:l},{type:12,data:u}];return _.push(...K(r,n,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:_}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,g,y)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},Ah=e=>he({axis:e.axis}),Oh=(e,t)=>{let r=e.inputs;Il(r),e.compute(El(e.inputs,t))}}),zl,Cl,Rh,Bh,Xy=U(()=>{J(),re(),ie(),zl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Cl=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,n,s]=Ap.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[a,n];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(n/l),f=Math.ceil(a/l),h=!0,g=O.size(u),y=[{type:12,data:h?p:g},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(y.push(...K(e[2].dims)),_.push("rank")),y.push(...K(u));let b=x=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=t.alpha===1?"":"value *= uniforms.alpha;",S=N("a",e[0].dataType,e[0].dims),E=N("b",e[1].dataType,e[1].dims),C=S.type.value,A=null,v=[S,E];e.length===3&&(A=N("c",e[2].dataType,e[2].dims.length),v.push(A));let P=F("output",e[0].dataType,u.length);v.push(P);let q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${x.registerUniforms(q).declareVariables(...v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${I}
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${C}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},k=x=>{let w=N("a",e[0].dataType,e[0].dims),I=N("b",e[1].dataType,e[1].dims),S=null,E=[w,I];e.length===3&&(S=N("c",e[2].dataType,e[2].dims.length),E.push(S));let C=F("output",e[0].dataType,u.length);E.push(C);let A=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],v="",P="";t.transA&&t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,v="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(P=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,v="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,v="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(P=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,v="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let q=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${x.registerUniforms(A).declareVariables(...E)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${l}>, ${l}>;
  ${x.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${P}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${v}
      }
      workgroupBarrier();
    }

    ${q}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*f},programUniforms:y}),getShaderSource:k}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:b}},Rh=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Bh=(e,t)=>{zl(e.inputs),e.compute(Cl(e.inputs,t))}}),et,nt,vt,xt,Al,Ol,Rl,Bl,Nl,Ml,Dl,Pl,Nh,Mh,Jy=U(()=>{J(),re(),ve(),ie(),[et,nt,vt,xt]=[0,1,2,3],Al=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Ol=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Rl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Bl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Nl=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Ml=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${et}] = batch;
     indices[${nt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${vt}] = u32(r);
            indices[${xt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${vt}] = u32(clamp(r, 0, H - 1));
          indices[${xt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${vt}] = gs_reflect(r, border[1], border[3]);
          indices[${xt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Dl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${et}], indices[${nt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${et}], indices[${nt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${et}], indices[${nt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${et}], indices[${nt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${et}], indices[${nt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${et}], indices[${nt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Pl=(e,t)=>{let r=N("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=N("grid",e[1].dataType,i.length,2),n=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(n=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[et,nt,vt,xt]=[0,3,1,2]);let s=F("output",e[0].dataType,n.length),u=r.type.value,l=O.size(n),p=[{type:12,data:l},...K(e[0].dims,i,n)],f=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(r,a,s)}
  ${Ol}
  ${Rl(u)}
  ${Bl(t)}
  ${Nl(t)}
  ${Ml(r,u,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${vt}]);
      let W_in = i32(uniforms.x_shape[${xt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${et}], indices[${vt}], indices[${xt}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Dl(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let g=O.size(n);return{outputs:[{dims:n,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:p}},getShaderSource:f}},Nh=(e,t)=>{Al(e.inputs),e.compute(Pl(e.inputs,t))},Mh=e=>he({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ce,Ul,Dh,ua,ql,hr,Ph,Uh=U(()=>{J(),re(),ve(),on(),dn(),ie(),_t(),Ce=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Ul=(e,t)=>{let r=e[0],i=Ce(e,1),a=Ce(e,2),n=Ce(e,3),s=Ce(e,4),u=Ce(e,5),l=Ce(e,6),p=Ce(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],h=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],y=h,_=0,b=0,k=Math.floor(g/t.numHeads);if(l&&p&&O.size(l.dims)&&O.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[3]!==k)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==f||p.dims[1]!==t.numHeads||p.dims[3]!==k)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=l.dims[2],b=l.dims[2]}else if(l&&O.size(l.dims)||p&&O.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x;if(i&&O.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');x=2,y=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==k)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');x=5,y=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==k)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');x=0,y=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}if(n&&O.size(n.dims)>0){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=_+y,I=0;if(s&&O.size(s.dims)>0){I=8;let A=s.dims;throw A.length===1?A[0]===f?I=1:A[0]===3*f+2&&(I=3):A.length===2&&A[0]===f&&A[1]===w&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,E=g;if(a&&O.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(y!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');E=a.dims[2]}else{if(y!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');E=a.dims[1]*a.dims[3],S=!0}}let C=!1;if(s&&O.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&O.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==t.numHeads||u.dims[2]!==h||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:h,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:w,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:g,vHiddenSize:E,headSize:k,vHeadSize:Math.floor(E/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:I,scale:t.scale,broadcastResPosBias:C,passPastInKv:S,qkvFormat:x}},Dh=e=>he({...e}),ua=he({perm:[0,2,1,3]}),ql=(e,t,r,i,a,n,s)=>{let u=[i,a,n],l=O.size(u),p=[{type:12,data:l},{type:12,data:s},{type:12,data:n}],f=h=>{let g=F("qkv_with_bias",t.dataType,u),y=N("qkv",t.dataType,u),_=N("bias",r.dataType,u),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(b).declareVariables(y,_,g)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:f},{inputs:[t,r],outputs:[-1]})[0]},hr=(e,t,r,i,a,n,s,u)=>{let l=n;if(s&&O.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=ql(e,n,s,t,i,r*a,u),l=l.reshape([t,i,r,a]),r===1||i===1?l:e.compute(De(l,ua.perm),{inputs:[l],outputs:[-1]})[0]}else return n.dims.length===3&&(l=n.reshape([t,i,r,a])),r===1||i===1?l:e.compute(De(l,ua.perm),{inputs:[l],outputs:[-1]})[0]},Ph=(e,t)=>{let r=Ul(e.inputs,t),i=e.inputs[0],a=Ce(e.inputs,1),n=Ce(e.inputs,2),s=Ce(e.inputs,3),u=Ce(e.inputs,4),l=Ce(e.inputs,5),p=Ce(e.inputs,6),f=Ce(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let h=a&&n&&a.dims.length===4&&n.dims.length===4,g=hr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(h)return yr(e,g,a,n,u,void 0,p,f,l,r);if(!a||!n)throw new Error("key and value must be provided");let y=hr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,s,r.hiddenSize),_=hr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,s,2*r.hiddenSize);yr(e,g,y,_,u,void 0,p,f,l,r)}}),Wl,Ll,Vl,Gl,Wa,qh,Wh,Lh=U(()=>{J(),re(),ve(),ie(),Wl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ll=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),he({numOutputs:i,axis:t.axis,splitSizes:r})},Vl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${j("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Gl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Wa=(e,t)=>{let r=e[0].dims,i=O.size(r),a=e[0].dataType,n=O.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=N("input",a,r.length),l=new Array(t.numOutputs),p=[],f=[],h=0,g=[{type:12,data:i}];for(let _=0;_<t.numOutputs;_++){h+=t.splitSizes[_],l[_]=h;let b=r.slice();b[n]=t.splitSizes[_],f.push(b),s[_]=F(`output${_}`,a,b.length),p.push({dims:f[_],dataType:e[0].dataType})}g.push({type:12,data:l},...K(r,...f));let y=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${Vl(l.length)}
  ${Gl(s)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${j("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},qh=(e,t)=>{Wl(e.inputs);let r=e.inputs.length===1?t:Ll(e.inputs,t);e.compute(Wa(e.inputs,r),{inputs:[0]})},Wh=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return he({axis:t,numOutputs:i,splitSizes:r})}}),Hl,ai,Vh,Gh=U(()=>{J(),re(),ve(),ie(),Hl=(e,t)=>{let[r,i,a,n]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!O.areEqual(i.dims,[])&&!O.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!O.areEqual(a.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],f=a.dims[0],h=O.sizeFromDimension(r.dims,1)/p,g=u===0?a.dims[1]*2:h/s;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(p!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(g/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(p>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},ai=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],u=O.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=u/l,f=e[2].dims[1],h=a===0?f*2:p/i,g=new Array(s,l,p/h,h-f),y=O.computeStrides(g),_=[{type:1,data:n},{type:12,data:g},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[u,p,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,h,l*h,1]}):[],...K(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=k=>{let x=N("input",e[0].dataType,e[0].dims.length),w=N("position_ids",e[1].dataType,e[1].dims.length),I=N("cos_cache",e[2].dataType,e[2].dims.length),S=N("sin_cache",e[3].dataType,e[3].dims.length),E=F("output",e[0].dataType,e[0].dims.length);return k.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${k.declareVariables(x,w,I,S,E)}

        ${k.mainStart(jt)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",F("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${x.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${x.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${E.setByOffset("i","re")}
            let im = ${x.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${x.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${E.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${E.setByOffset("k",x.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:he({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(g)/jt)},programUniforms:_})}},Vh=(e,t)=>{Hl(e.inputs,t),e.compute(ai(e.inputs,t))}}),Fl,jl,la,Kl,Hh,e0=U(()=>{ve(),J(),dn(),Uh(),Lh(),_t(),Gh(),ie(),Fl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],p=r.dims[1],f=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],h=p,g=0,y=!i||i.dims.length===0,_=Math.floor(y?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);y&&(f=_*t.numHeads);let b=n&&n.dims.length!==0,k=s&&s.dims.length!==0;if(b&&n.dims.length===4&&n.dims[0]===l&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&k){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=n.dims[2]}else if(b||k)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');h=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let w=0,I=!1,S=t.kvNumHeads?_*t.kvNumHeads:f;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(h!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=a.dims[2]}else{if(h!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=a.dims[1]*a.dims[3],I=!0}}let E=e.length>4?e[5]:void 0;if(E&&E.dims.length!==1&&E.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:S,headSize:_,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:x}},jl=he({perm:[0,2,1,3]}),la=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(De(i,jl.perm),{inputs:[i],outputs:[-1]})[0]),i},Kl=(e,t,r,i)=>{let a=7,n=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=f=>{let h=N("seq_lens",r.dataType,r.dims),g=N("total_seq_lens",i.dataType,i.dims),y=F("pos_ids",a,s),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${f.registerUniforms(_).declareVariables(h,g,y)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${y.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:n},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p}},Hh=(e,t)=>{let r=Fl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,h=he({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[g,y,_]=!a&&!n?e.compute(Wa([i],h),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,n],b,k;if(t.doRotary){let S=e.compute(Kl(r.batchSize,r.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],E=e.inputs[7],C=e.inputs[8],A=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),v=[g,S,E,C],P=[-1];b=e.compute(ai(v,A),{inputs:v,outputs:P})[0],v.splice(0,1,y);let q=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});k=e.compute(ai(v,q),{inputs:v,outputs:P})[0]}let x=hr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?b:g,void 0,0),w=la(e,t.doRotary?k:y,r),I=la(e,_,r);yr(e,x,w,I,void 0,void 0,s,u,void 0,r,l,p)}}),da,Zl,Ql,Fh,t0=U(()=>{J(),re(),_t(),ie(),da=(e,t,r,i,a,n,s,u)=>{let l=$e(n),p=l===1?"f32":`vec${l}f`,f=l===1?"vec2f":`mat2x${l}f`,h=a*s,g=64;h===1&&(g=256);let y=[a,s,n/l],_=[a,s,2],b=["rank","type","type"],k=[];k.push(...K(y,_));let x=w=>{let I=N("x",t.dataType,3,l),S=N("scale",r.dataType,r.dims),E=N("bias",i.dataType,i.dims),C=F("output",1,3,2),A=[I,S,E,C];return`
  var<workgroup> workgroup_shared : array<${f}, ${g}>;
  const workgroup_size = ${g}u;
  ${w.declareVariables(...A)}
  ${w.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${I.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${yt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${yt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${g}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:h},programUniforms:k}),getShaderSource:x},{inputs:[t,r,i],outputs:[-1]})[0]},Zl=(e,t,r)=>{let i=t[0].dims,a=i,n=2,s=i[0],u=i[1],l=O.sizeFromDimension(i,n),p=$e(l),f=O.size(a)/p,h=da(e,t[0],t[1],t[2],s,l,u,r.epsilon),g=[s,u,l/p],y=[s,u],_=["type","none"],b=k=>{let x=N("x",t[0].dataType,g.length,p),w=N("scale_shift",1,y.length,2),I=F("output",t[0].dataType,g.length,p),S=[x,w,I];return`
  ${k.registerUniform("output_size","u32").declareVariables(...S)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${x.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...K(g,y,g)]}),getShaderSource:b},{inputs:[t[0],h]})},Ql=(e,t,r)=>{let i=t[0].dims,a=i,n=i[0],s=i[i.length-1],u=O.sizeFromDimension(i,1)/s,l=$e(s),p=O.size(a)/l,f=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],h=["type","type"],g=!1,y=[0,i.length-1];for(let x=0;x<i.length-2;x++)g=g||i[x+1]!==1,y.push(x+1);g=g&&i[i.length-1]!==1;let _=g?e.compute(De(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(x,w)=>i[y[w]])),b=da(e,_,t[1],t[2],n,u,s,r.epsilon),k=x=>{let w=ke(t[0].dataType),I=l===1?"vec2f":`mat${l}x2f`,S=A=>{let v=A===0?"x":"y",P=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${w}(${P}(scale.${v}))`;case 2:return`vec2<${w}>(${P}(scale[0].${v}, scale[1].${v}))`;case 4:return`vec4<${w}>(${P}(scale[0].${v}, scale[1].${v}, scale[2].${v}, scale[3].${v}))`;default:throw new Error(`Not supported compoents ${l}`)}},E=N("input",t[0].dataType,t[0].dims,l),C=F("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${E.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${x.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:k},{inputs:[t[0],b]})},Fh=(e,t)=>{t.format==="NHWC"?Ql(e,e.inputs,t):Zl(e,e.inputs,t)}}),Yl,Xl,jh,r0=U(()=>{J(),re(),ie(),Yl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Xl=(e,t,r)=>{let i=t.simplified,a=e[0].dims,n=e[1],s=!i&&e[2],u=a,l=O.normalizeAxis(t.axis,a.length),p=O.sizeToDimension(a,l),f=O.sizeFromDimension(a,l),h=O.size(n.dims),g=s?O.size(s.dims):0;if(h!==f||s&&g!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${g}`);let y=[];for(let E=0;E<a.length;++E)E<l?y.push(a[E]):y.push(1);let _=$e(f),b=["type","type"],k=[{type:12,data:p},{type:1,data:f},{type:12,data:Math.floor(f/_)},{type:1,data:t.epsilon}];s&&b.push("type");let x=r>1,w=r>2,I=E=>{let C=ke(e[0].dataType),A=[N("x",e[0].dataType,e[0].dims,_),N("scale",n.dataType,n.dims,_)];s&&A.push(N("bias",s.dataType,s.dims,_)),A.push(F("output",e[0].dataType,u,_)),x&&A.push(F("mean_data_output",1,y)),w&&A.push(F("inv_std_output",1,y));let v=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${E.registerUniforms(v).declareVariables(...A)}
  ${E.mainStart()}
    ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Oa("f32",_)};
    var mean_square_vector = ${Oa("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Vt(C,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${yt("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${yt("mean_square_vector",_)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Vt(C,_,"x[j + offset]")};
      let f32scale = ${Vt(C,_,"scale[j]")};
      output[j + offset] = ${A[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Vt(C,_,"bias[j]")}`:""}
      );
    }

    ${x?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:u,dataType:e[0].dataType}];return x&&S.push({dims:y,dataType:1}),w&&S.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${r};${i}`,inputDependencies:b},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:k}),getShaderSource:I}},jh=(e,t)=>{Yl(e.inputs),e.compute(Xl(e.inputs,t,e.outputCount))}}),Jl,Kh,i0=U(()=>{re(),mn(),gn(),Jl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Kh=e=>{Jl(e.inputs);let t=Ft.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(fn(e.inputs,{activation:""},t));else{let a=t[t.length-2],n=O.size(e.inputs[0].dims.slice(0,-2)),s=O.size(e.inputs[1].dims.slice(0,-2));if(n!==1&&a===1&&s===1){let u=e.inputs[0].reshape([1,n,i]),l=e.inputs[1].reshape([1,i,r]),p=[1,n,r],f=[u,l];e.compute(ii(f,{activation:""},t,p),{inputs:f})}else e.compute(ii(e.inputs,{activation:""},t))}}}),ed,td,rd,Zh,Qh,a0=U(()=>{J(),re(),ve(),ie(),ed=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!O.areEqual(s.dims,[t.n,a,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(O.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,p=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(O.size(l)!==p)throw new Error("zeroPoints input size error.")}},td=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=O.size(u),p=e[1].dims[2]/4,f=e[0].dataType,h=$e(t.k),g=$e(p),y=$e(s),_=u.concat([a,s]),b=a>1&&s/y%2===0?2:1,k=O.size(_)/y/b,x=64,w=[],I=[l,a,n/h],S=O.convertShape(e[1].dims).slice();S.splice(-1,1,p/g),w.push(...K(I)),w.push(...K(S)),w.push(...K(e[2].dims)),e.length===4&&w.push(...K(O.convertShape(e[3].dims)));let E=[l,a,s/y];w.push(...K(E));let C=A=>{let v=I.length,P=N("a",e[0].dataType,v,h),q=N("b",12,S.length,g),Y=N("scales",e[2].dataType,e[2].dims.length),H=[P,q,Y],Z=e.length===4?N("zero_points",12,e[3].dims.length):void 0;Z&&H.push(Z);let R=E.length,D=F("output",e[0].dataType,R,y),G=ke(e[0].dataType),ee=(()=>{switch(h){case 1:return`array<${G}, 8>`;case 2:return`mat4x2<${G}>`;case 4:return`mat2x4<${G}>`;default:throw new Error(`${h}-component is not supported.`)}})(),Q=()=>{let M=`
          // reuse a data
            var input_offset = ${P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ee};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${P.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let L=0;L<y*b;L++)M+=`
            b_value = ${g===1?`b${L}_data`:`b${L}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ee}(${Array.from({length:4},(te,oe)=>`${G}(b_value_lower[${oe}]), ${G}(b_value_upper[${oe}])`).join(", ")});
            b_dequantized_values = ${h===1?`${ee}(${Array.from({length:8},(te,oe)=>`(b_quantized_values[${oe}] - ${Z?`zero_point${L}`:"zero_point"}) * scale${L}`).join(", ")});`:`(b_quantized_values - ${ee}(${Array(8).fill(`${Z?`zero_point${L}`:"zero_point"}`).join(",")})) * scale${L};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(L/y)}]${y>1?`[${L%y}]`:""} += ${Array.from({length:8/h},(te,oe)=>`${h===1?`a_data[${oe}] * b_dequantized_values[${oe}]`:`dot(a_data[${oe}], b_dequantized_values[${oe}])`}`).join(" + ")};
          `;return M},X=()=>{let M=`
            var col_index = col * ${y};
            ${Z?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${G}(8);`}
            `;for(let L=0;L<y*b;L++)M+=`
            let scale${L} = ${Y.getByOffset("col_index * nBlocksPerCol + block")};
            ${Z?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${L} = ${G}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return M},de=()=>{let M=`col_index = col * ${y};`;for(let L=0;L<y*b;L++)M+=`
            let b${L}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return M+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ee};
            var b_dequantized_values: ${ee};`,M};return`
        var<workgroup> workgroup_shared: array<${D.type.value}, ${b*x}>;
        ${A.declareVariables(...H,D)}
        ${A.mainStart([x,1,1])}
          let output_indices = ${D.offsetToIndices(`(global_idx / ${x}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${X()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${de()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${Q()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${D.type.value} = ${D.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${D.setByIndices(`${D.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${g};${y};${b};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:f}],dispatchGroup:{x:k},programUniforms:w}),getShaderSource:C}},rd=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=O.size(u),p=e[1].dims[2]/4,f=e[0].dataType,h=$e(t.k),g=$e(p),y=u.concat([a,s]),_=128,b=s%8===0?8:s%4===0?4:1,k=_/b,x=k*g*8,w=x/h,I=x/t.blockSize,S=O.size(y)/b,E=[],C=[l,a,n/h],A=O.convertShape(e[1].dims).slice();A.splice(-1,1,p/g),E.push(...K(C)),E.push(...K(A)),E.push(...K(e[2].dims)),e.length===4&&E.push(...K(O.convertShape(e[3].dims)));let v=[l,a,s];E.push(...K(v));let P=q=>{let Y=C.length,H=N("a",e[0].dataType,Y,h),Z=N("b",12,A.length,g),R=N("scales",e[2].dataType,e[2].dims.length),D=[H,Z,R],G=e.length===4?N("zero_points",12,e[3].dims.length):void 0;G&&D.push(G);let ee=v.length,Q=F("output",e[0].dataType,ee),X=ke(e[0].dataType),de=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${X}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${X}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${X}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${X}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${H.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${Q.type.value}, ${k}>, ${b}>;
        ${q.declareVariables(...D,Q)}
        ${q.mainStart([k,b,1])}
          let output_indices = ${Q.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${H.getByIndices(`${H.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${H.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${G?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${G.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${X}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${X}(8);`}
            let scale = ${R.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Z.getByIndices(`${Z.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${de()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${X}>(${Array.from({length:4},(M,L)=>`${X}(b_value_lower[${L}]), ${X}(b_value_upper[${L}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${X}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(M,L)=>`${`dot(a_data${L}, b_dequantized_values[${L}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${Q.type.value} = ${Q.type.value}(0);
            for (var b = 0u; b < ${k}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Q.setByIndices(`${Q.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${g};${k};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:f}],dispatchGroup:{x:S},programUniforms:E}),getShaderSource:P}},Zh=(e,t)=>{ed(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(rd(e.inputs,t)):e.compute(td(e.inputs,t))},Qh=e=>he(e)}),id,ad,nd,sd,od,ud,ld,dd,Yh,n0=U(()=>{J(),re(),ie(),id=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ad=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${j("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${j("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},nd=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${j("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${j("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},sd=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${j("uniforms.x_shape",a,t)})) {
                  k = i32(${j("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},od=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${j("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${j("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${j("uniforms.x_shape",a,t)})) {
                  k -= i32(${j("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${j("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ud=(e,t,r)=>{switch(r.mode){case 0:return ad(e,t,r.pads.length);case 1:return nd(e,t,r.pads.length);case 2:return sd(e,t,r.pads.length);case 3:return od(e,t,r.pads.length);default:throw new Error("Invalid mode")}},ld=(e,t)=>{let r=O.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=O.size(r),n=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&n.push({type:s?e[2].dataType:1,data:t.value}),n.push(...K(e[0].dims,r));let u=["rank"],l=p=>{let f=F("output",e[0].dataType,r.length),h=N("x",e[0].dataType,i.length),g=h.type.value,y=ud(f,i.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:s?g:"f32"}),`
            ${p.registerUniforms(_).declareVariables(h,f)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(r)/64)},programUniforms:n}),getShaderSource:l}},dd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)n[Number(u[l])]=Number(r[l]),n[Number(u[l])+a]=Number(r[l+u.length])}else r.forEach((u,l)=>n[Number(l)]=Number(u));let s=[];return n.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},Yh=(e,t)=>{id(e.inputs);let r=dd(e.inputs,t);e.compute(ld(e.inputs,r),{inputs:[0]})}}),sr,pa,ca,ha,fa,pd,cd,ma,ga,Xh,Jh,ya,ef,tf,_a,rf,af,nf,sf,s0=U(()=>{We(),J(),re(),ie(),sr=e=>{if(me.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},pa=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=n?t.dilations.slice():[],p=t.pads.slice();ti.adjustPoolAttributes(r,a,s,u,l,p);let f=ti.computePoolOutputShape(r,a,u,l,s,p,t.autoPad),h=Object.assign({},t);n?Object.assign(h,{kernelShape:s,strides:u,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:u,pads:p,cacheKey:t.cacheKey});let g=f.slice();return g.push(g.splice(1,1)[0]),[h,i?g:f]},ca=(e,t)=>{let r=t.format==="NHWC",i=O.size(e),a=O.size(t.kernelShape),n=[{type:12,data:i},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],h=!!(p+f);n.push({type:12,data:u},{type:12,data:l},{type:12,data:p},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],k=t.pads[t.pads.length-2];g=!!(b+k),n.push({type:12,data:y},{type:12,data:_},{type:12,data:b},{type:12,data:k}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,h,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=O.computeStrides(t.kernelShape);n.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,f)=>p+f);return[n,s,!!l,!1,!1]}},ha=(e,t,r,i,a,n,s,u,l,p,f,h)=>{let g=a.format==="NHWC",y=t.type.value,_=F("output",t.type.tensor,i);if(a.kernelShape.length<=2){let b="",k="",x="",w=r-(g?2:1);if(f?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,a.kernelShape.length===2){let I=r-(g?3:2);h?k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:k=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `,x=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${y}(${u});
              var pad = 0;
              ${k}
              ${b}
              ${x}
              ${s}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=a.kernelShape.length,k=a.pads.length,x="";return p?x=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:x=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${y}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${j("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${j("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${r-b}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${j("uniforms.strides",`j - ${r-b}u`,b)}
                    + offsets[j - ${r-b}u] - ${j("uniforms.pads","j - 2u",k)};
                  ${x}
              }
              ${s}

              output[global_idx] = value;
            }`}},fa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,pd=e=>`${fa(e)};${e.countIncludePad}`,cd=e=>`${fa(e)};${e.storageOrder};${e.dilations}`,ma=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ga=(e,t,r,i)=>{let[a,n]=pa(t,i,r),s=N("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",p="";a.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[f,h,g,y,_]=ca(n,a);f.push(...K(t.dims,n));let b=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${_}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(n)/64)},programUniforms:f}),getShaderSource:k=>ha(k,s,t.dims.length,n.length,a,l,p,0,h,g,y,_)}},Xh=e=>{let t=e.count_include_pad!==0,r=ma(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:pd(i)}},Jh=(e,t)=>{sr(e.inputs),e.compute(ga("AveragePool",e.inputs[0],!1,t))},ya={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ef=e=>{let t=e.format;return{format:t,...ya,cacheKey:t}},tf=(e,t)=>{sr(e.inputs),e.compute(ga("GlobalAveragePool",e.inputs[0],!0,t))},_a=(e,t,r,i)=>{let[a,n]=pa(t,i,r),s=`
      value = max(x_val, value);
    `,u="",l=N("x",t.dataType,t.dims.length),p=["rank"],[f,h,g,y,_]=ca(n,a);return f.push(...K(t.dims,n)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${_}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(n)/64)},programUniforms:f}),getShaderSource:b=>ha(b,l,t.dims.length,n.length,a,s,u,t.dataType===10?-65504:-1e5,h,g,y,_)}},rf=(e,t)=>{sr(e.inputs),e.compute(_a("MaxPool",e.inputs[0],!1,t))},af=e=>{let t=e.storage_order,r=e.dilations,i=ma(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:cd(a)}},nf=e=>{let t=e.format;return{format:t,...ya,cacheKey:t}},sf=(e,t)=>{sr(e.inputs),e.compute(_a("GlobalMaxPool",e.inputs[0],!0,t))}}),hd,fd,of,uf,o0=U(()=>{J(),re(),ve(),ie(),hd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,n)=>n===t.axis||a===e[0].dims[n]).reduce((a,n)=>a&&n,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},fd=(e,t)=>{let r=O.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,n=e[0].dims,s=e[1].dataType,u=O.size(n),l=i===3||i===2,p=l?[Math.ceil(O.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,h=e.length>2?e[2]:void 0,g=h?l?[Math.ceil(O.size(h.dims)/4)]:h.dims:void 0,y=f.length===0||f.length===1&&f[0]===1,_=y===!1&&f.length===1,b=$e(u),k=y&&(!l||b===4),x=k?b:1,w=k&&!l?b:1,I=N("input",l?12:i,p.length,w),S=N("scale",s,f.length),E=h?N("zero_point",l?12:i,g.length):void 0,C=F("output",s,n.length,x),A=[I,S];E&&A.push(E);let v=[p,f];h&&v.push(g);let P=[{type:12,data:u/x},{type:12,data:r},{type:12,data:t.blockSize},...K(...v,n)],q=Y=>{let H=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Y.registerUniforms(H).declareVariables(...A,C)}
      ${Y.mainStart()}
          ${Y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${x===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${S.getByOffset("0")}`:_?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${E?y?l?`
                let zero_point_input = ${E.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${E.getByOffset("0")}`:_?l?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${E.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${E.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${E.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${E.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:E?["rank","rank","rank"]:["rank","rank"]},getShaderSource:q,getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(u/x/64),y:1,z:1},programUniforms:P})}},of=(e,t)=>{hd(e.inputs,t),e.compute(fd(e.inputs,t))},uf=e=>he({axis:e.axis,blockSize:e.blockSize})}),md,gd,lf,u0=U(()=>{We(),J(),ie(),md=(e,t,r)=>{let i=e===t,a=e<t&&r<0,n=e>t&&r>0;if(i||a||n)throw new Error("Range these inputs' contents are invalid.")},gd=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),n=[a],s=a,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...K(n)],l=p=>{let f=F("output",i,n.length),h=f.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${p.registerUniforms(g).declareVariables(f)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},lf=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),me.webgpu.validateInputContent&&md(t,r,i),e.compute(gd(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),yd,_d,df,pf,l0=U(()=>{J(),re(),ve(),ie(),yd=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${n}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${n}`;default:throw new Error(`Reduction ${e} is not supported.`)}},_d=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,n=1,s=Math.ceil(O.sizeToDimension(i,i.length-1)/n),u=i[i.length-1],l=O.sizeFromDimension(r,u),p=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...K(e[1].dims,e[2].dims,a)],f=h=>{let g=N("indices",e[1].dataType,e[1].dims.length),y=N("updates",e[2].dataType,e[2].dims.length,n),_=t.reduction!=="none"&&t.reduction!==""?Pp("output",e[0].dataType,a.length):F("output",e[0].dataType,a.length,n);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,y,_)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${yd(t.reduction,"output[data_offset + i]","value",_.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:f}},df=e=>he({reduction:e.reduction}),pf=(e,t)=>{e.compute(_d(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),wd,bd,$d,wa,vd,xd,Sd,kd,Td,Id,Ed,zd,ba,Cd,Ad,Od,Rd,Bd,cf,hf,d0=U(()=>{J(),re(),ve(),ie(),wd=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},bd=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,n)=>i[a]=e[n]),i},$d=(e,t,r,i,a,n)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(f=>n.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(f=>i.push(f)),i.length!==0&&i.length!==p&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");wd(i,t),t.axes.length>0&&bd(i,t.axes,p).forEach((f,h)=>i[h]=f)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(f=>a.push(Number(f))),a.length!==0&&a.length!==p&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},wa=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,vd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${wa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${wa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",xd=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Sd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((n,s)=>{i[n]=a[s],i[s+r]=a[t.length+s]}),i):a},kd=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(n=>a.push(n)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((n,s)=>a[n]=r[s])}else r.forEach(n=>a.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((n,s)=>Math.round(n*t[s]))}return a},Td=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(n=>t[n]=i),r.axes.forEach(n=>a[n]=Math.round(e[n]*t[n]))):(t.fill(i,0,t.length),a.forEach((n,s)=>a[s]=Math.round(n*t[s]))),a},Id=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${j("uniforms.scales","i",i)};
        var roi_low = ${j("uniforms.roi","i",a)};
        var roi_hi = ${j("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${j("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Ed=(e,t,r,i,a,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${j("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${j("uniforms.roi","i",n)};
          var roi_hi = ${j("uniforms.roi",`i + ${r.length}`,n)};
          var input_shape_i = ${j("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${j("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,zd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${j("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ba=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Cd=(e,t,r,i,a)=>{let[n,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${ba(e,l,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Ad=(e,t,r,i,a,n,s,u,l,p)=>{let f=r.length===2,[h,g]=f?[0,1]:[2,3],y=e.type.value,_=b=>{let k=b===h?"row":"col";return`
      fn ${k}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[b]},
        ${i[b]}, ${r[b]}, ${n[b]}, ${n[b]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[b]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${k}: ${y} = originalIdx + ${y}(i);
          if (${k} < 0 || ${k} >= ${r[b]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${k} = max(0, min(${k}, ${r[b]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${k})`)};
          data[i + 1] = ${b===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(h)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Od=(e,t,r,i,a)=>{let[n,s,u,l,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${ba(e,p,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${s}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Rd=(e,t,r,i,a,n)=>{let s=e.dims,u=Sd(n,t.axes,s.length),l=kd(s,i,a,t.axes),p=i.slice();i.length===0&&(p=s.map((w,I)=>w===0?1:l[I]/w),t.keepAspectRatioPolicy!=="stretch"&&(l=Td(s,p,t)));let f=F("output",e.dataType,l.length),h=N("input",e.dataType,s.length),g=O.size(l),y=s.length===l.length&&s.every((w,I)=>w===l[I]),_=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,k=h.type.value,x=w=>`
      ${y?"":`
      ${vd(t.coordinateTransformMode,k)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${zd(h,s)};
              ${xd(t.nearestMode,r,k)};
              ${Ed(h,f,s,l,p.length,u.length,_)};
              `;case"linear":return`
              ${Id(f,s,l,p.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Cd(h,f,s,_,b)}`;if(s.length===3||s.length===5)return`${Od(h,f,s,_,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Ad(h,f,s,l,p,u,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(h,f)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${y}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:p},{type:1,data:u},...K(s,l)]})}},Bd=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},cf=(e,t)=>{let r=[],i=[],a=[],n=Bd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");$d(e.inputs,t,n,r,i,a),e.compute(Rd(e.inputs[0],t,n,r,i,a),{inputs:[0]})},hf=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return he({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:p})}}),Nd,Md,ff,p0=U(()=>{J(),re(),ie(),Nd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Md=(e,t,r,i)=>{let a=t.simplified,n=e[0].dims,s=O.size(n),u=n,l=s,p=n.slice(-1)[0],f=i?n.slice(0,-1).concat(1):[],h=!a&&e.length>3,g=e.length>4,y=i&&r>1,_=i&&r>2,b=r>3,k=64,x=$e(p),w=[{type:12,data:l},{type:12,data:x},{type:12,data:p},{type:1,data:t.epsilon}],I=E=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],A=[N("x",e[0].dataType,e[0].dims,x),N("skip",e[1].dataType,e[1].dims,x),N("gamma",e[2].dataType,e[2].dims,x)];h&&A.push(N("beta",e[3].dataType,e[3].dims,x)),g&&A.push(N("bias",e[4].dataType,e[4].dims,x)),A.push(F("output",e[0].dataType,u,x)),y&&A.push(F("mean_output",1,f)),_&&A.push(F("inv_std_output",1,f)),b&&A.push(F("input_skip_bias_sum",e[0].dataType,u,x));let v=ke(e[0].dataType),P=ke(1,x);return`

      ${E.registerUniforms(C).declareVariables(...A)}
      var<workgroup> sum_shared : array<${P}, ${k}>;
      var<workgroup> sum_squared_shared : array<${P}, ${k}>;

      ${E.mainStart([k,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${k};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${k};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${k-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":v+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Vt(v,x,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${k};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${yt("sum",x)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${yt("square_sum",x)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${v}(mean)`}) *
            ${v}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:u,dataType:e[0].dataType}];return r>1&&S.push({dims:f,dataType:1}),r>2&&S.push({dims:f,dataType:1}),r>3&&S.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${x};${y};${_};${b}`,inputDependencies:e.map((E,C)=>"type")},getShaderSource:I,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:w})}},ff=(e,t)=>{Nd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Md(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Dd,or,Pd,$a,Ud,qd,mf,gf,c0=U(()=>{J(),re(),ve(),ie(),Dd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},or=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Pd=(e,t)=>{if(e.length>1){let r=or(e,1),i=or(e,2),a=or(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),he({starts:r,ends:i,axes:a})}else return t},$a=(e,t,r,i,a)=>{let n=e;return e<0&&(n+=r[i[t]]),a[t]<0?Math.max(0,Math.min(n,r[i[t]]-1)):Math.max(0,Math.min(n,r[i[t]]))},Ud=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${j("uniforms.input_shape","i",r.length)};
            let steps_i = ${j("uniforms.steps","i",r.length)};
            let signs_i = ${j("uniforms.signs","i",r.length)};
            let starts_i = ${j("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,qd=(e,t)=>{let r=e[0].dims,i=O.size(r),a=t.axes.length>0?O.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],n=or(e,4);n.forEach(x=>x!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(a.length).fill(1));let s=t.starts.map((x,w)=>$a(x,w,r,a,n)),u=t.ends.map((x,w)=>$a(x,w,r,a,n));if(a.length!==s.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let x=0;x<r.length;++x)a.includes(x)||(s.splice(x,0,0),u.splice(x,0,r[x]),n.splice(x,0,1));let l=n.map(x=>Math.sign(x));n.forEach((x,w,I)=>{if(x<0){let S=(u[w]-s[w])/x,E=s[w],C=E+S*n[w];s[w]=C,u[w]=E,I[w]=-x}});let p=r.slice(0);a.forEach((x,w)=>{p[x]=Math.ceil((u[x]-s[x])/n[x])});let f={dims:p,dataType:e[0].dataType},h=F("output",e[0].dataType,p.length),g=N("input",e[0].dataType,e[0].dims.length),y=O.size(p),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:n.length}],b=[{type:12,data:y},{type:12,data:s},{type:6,data:l},{type:12,data:n},...K(e[0].dims,p)],k=x=>`
      ${x.registerUniforms(_).declareVariables(g,h)}
        ${Ud(g,h,r)}
        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:b})}},mf=(e,t)=>{Dd(e.inputs,t);let r=Pd(e.inputs,t);e.compute(qd(e.inputs,r),{inputs:[0]})},gf=e=>{let t=e.starts,r=e.ends,i=e.axes;return he({starts:t,ends:r,axes:i})}}),Wd,Ld,yf,_f,h0=U(()=>{J(),re(),ve(),_t(),ie(),Wd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Ld=(e,t)=>{let r=e.inputs[0],i=r.dims,a=O.size(i),n=i.length,s=O.normalizeAxis(t.axis,n),u=s<i.length-1,l,p=[];u?(p=Array.from({length:n},(A,v)=>v),p[s]=n-1,p[n-1]=s,l=e.compute(De(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let f=l.dims,h=f[n-1],g=a/h,y=$e(h),_=h/y,b=64;g===1&&(b=256);let k=(A,v)=>v===4?`max(max(${A}.x, ${A}.y), max(${A}.z, ${A}.w))`:v===2?`max(${A}.x, ${A}.y)`:v===3?`max(max(${A}.x, ${A}.y), ${A}.z)`:A,x=N("x",l.dataType,l.dims,y),w=F("result",l.dataType,l.dims,y),I=x.type.value,S=ke(l.dataType)==="f32"?`var threadMax = ${I}(-3.4028234663852886e+38f);`:`var threadMax = ${I}(-65504.0h);`,E=A=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${A.registerUniform("packedCols","i32").declareVariables(x,w)}
      ${A.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${S}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${I}(${k("threadShared[0]",y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${I}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${I}(${yt("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${y};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:_}]}),getShaderSource:E},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(De(C,p),{inputs:[C]})},yf=(e,t)=>{Wd(e.inputs),Ld(e,t)},_f=e=>he({axis:e.axis})}),va,Vd,Gd,Hd,wf,f0=U(()=>{J(),re(),ie(),va=e=>Array.from(e.getBigInt64Array(),Number),Vd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(va(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Gd=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Hd=(e,t)=>{let r=e[0].dims,i=t??va(e[1]),a=Gd(r,i),n=O.size(a),s=e[0].dataType,u=N("input",s,r.length),l=F("output",s,a.length),p=f=>`
      const inputShape = ${u.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(u,l)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...K(e[0].dims,a)]}),getShaderSource:p}},wf=e=>{Vd(e.inputs),e.compute(Hd(e.inputs),{inputs:[0]})}}),Fd,jd,bf,m0=U(()=>{J(),re(),ie(),Fd=(e,t,r,i,a)=>{let n=F("output_data",a,r.length,4),s=N("a_data",t[1].dataType,t[1].dims.length,4),u=N("b_data",t[2].dataType,t[2].dims.length,4),l=N("c_data",t[0].dataType,t[0].dims.length,4),p,f=(h,g,y)=>`select(${g}, ${h}, ${y})`;if(!i)p=n.setByOffset("global_idx",f(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(g,y,_="")=>{let b=`a_data[index_a${y}][component_a${y}]`,k=`b_data[index_b${y}][component_b${y}]`,x=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${n.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${s.broadcastedIndicesToOffset(`output_indices${y}`,n)};
            let offset_b${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`,n)};
            let offset_c${y} = ${l.broadcastedIndicesToOffset(`output_indices${y}`,n)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${g}[${y}] = ${_}(${f(b,k,x)});
          `};a===9?p=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},jd=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,n=!(O.areEqual(t,r)&&O.areEqual(r,i)),s=t,u=O.size(t);if(n){let p=Ft.calcShape(Ft.calcShape(t,r,!1),i,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,u=O.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Fd(p,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...K(i,t,r,s)]})}},bf=e=>{e.compute(jd(e.inputs))}}),$f,g0=U(()=>{Cy(),dn(),Ay(),Oy(),Ry(),By(),Ny(),qy(),Ly(),Vy(),Gy(),Hy(),Fy(),jy(),Ky(),Zy(),Qy(),Yy(),Xy(),Jy(),e0(),t0(),r0(),i0(),a0(),Uh(),n0(),s0(),o0(),u0(),l0(),ln(),d0(),Gh(),p0(),c0(),h0(),Lh(),f0(),_t(),pn(),m0(),$f=new Map([["Abs",[hc]],["Acos",[fc]],["Acosh",[mc]],["Add",[Zc]],["ArgMax",[lc,Ba]],["ArgMin",[uc,Ba]],["Asin",[gc]],["Asinh",[yc]],["Atan",[_c]],["Atanh",[wc]],["Attention",[dc]],["AveragePool",[Jh,Xh]],["BatchNormalization",[pc]],["BiasAdd",[cc]],["BiasSplitGelu",[Kc]],["Cast",[$c,bc]],["Ceil",[xc]],["Clip",[vc]],["Concat",[nh,sh]],["Conv",[qa,Ua]],["ConvTranspose",[gh,mh]],["Cos",[Sc]],["Cosh",[kc]],["CumSum",[yh,_h]],["DepthToSpace",[wh,bh]],["DequantizeLinear",[of,uf]],["Div",[Qc]],["Einsum",[$h,vh]],["Elu",[Tc,cr]],["Equal",[Yc]],["Erf",[Ic]],["Exp",[Ec]],["Expand",[xh]],["FastGelu",[Sh]],["Floor",[zc]],["FusedConv",[qa,Ua]],["Gather",[Th,kh]],["GatherElements",[Oh,Ah]],["GatherBlockQuantized",[zh,Ch]],["GatherND",[Ih,Eh]],["Gelu",[Cc]],["Gemm",[Bh,Rh]],["GlobalAveragePool",[tf,ef]],["GlobalMaxPool",[sf,nf]],["Greater",[th]],["GreaterOrEqual",[ih]],["GridSample",[Nh,Mh]],["GroupQueryAttention",[Hh]],["HardSigmoid",[Pc,Dc]],["InstanceNormalization",[Fh]],["LayerNormalization",[jh]],["LeakyRelu",[Ac,cr]],["Less",[rh]],["LessOrEqual",[ah]],["Log",[Fc]],["MatMul",[Kh]],["MatMulNBits",[Zh,Qh]],["MaxPool",[rf,af]],["Mul",[Xc]],["MultiHeadAttention",[Ph,Dh]],["Neg",[Rc]],["Not",[Oc]],["Pad",[Yh]],["Pow",[Jc]],["QuickGelu",[jc,cr]],["Range",[lf]],["Reciprocal",[Bc]],["ReduceMin",[ic]],["ReduceMean",[Xp]],["ReduceMax",[rc]],["ReduceSum",[nc]],["ReduceProd",[ac]],["ReduceL1",[Jp]],["ReduceL2",[ec]],["ReduceLogSum",[oc]],["ReduceLogSumExp",[tc]],["ReduceSumSquare",[sc]],["Relu",[Nc]],["Resize",[cf,hf]],["RotaryEmbedding",[Vh]],["ScatterND",[pf,df]],["Sigmoid",[Mc]],["Sin",[Uc]],["Sinh",[qc]],["Slice",[mf,gf]],["SkipLayerNormalization",[ff]],["Split",[qh,Wh]],["Sqrt",[Wc]],["Softmax",[yf,_f]],["Sub",[eh]],["Tan",[Lc]],["Tanh",[Vc]],["ThresholdedRelu",[Hc,cr]],["Tile",[wf]],["Transpose",[qp,Wp]],["Where",[bf]]])}),vf,y0=U(()=>{We(),ot(),ie(),vf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){rt(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});a&&u.push({binding:u.length,resource:a});let l=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ze(e.programInfo.name)}dispose(){}build(e,t){rt(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{r.features.has(p.feature)&&i.push(`enable ${p.extension};`)});let a=Up(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${i.join(`
`)}
${a.additionalImplementations}
${n}`,u=r.createShaderModule({code:s,label:e.name});le("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Ze(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let n=t*r*i,s=Math.ceil(Math.sqrt(n));if(s>a){if(s=Math.ceil(Math.cbrt(n)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),xf={};Kt(xf,{WebGpuBackend:()=>Sf});var Kd,Zd,Qd,Sf,_0=U(()=>{We(),J(),ot(),Bp(),Ey(),g0(),y0(),Kd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let n=e[i].dims.length;r.push(`${a};${n}`);break}case"dims":{let n=e[i].dims.join(",");r.push(`${a};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Zd=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Kd(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Qd=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Sf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=n=>t.features.has(n)&&r.push(n)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Qd(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Dp(this),this.programManager=new vf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,nn(e.logLevel,!!e.debug),this.device.onuncapturederror=n=>{n.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${n.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;rt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],n=a.kernelId,s=this.kernels.get(n),u=s.kernelType,l=s.kernelName,p=a.programName,f=a.inputTensorViews,h=a.outputTensorViews,g=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),b=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(b))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(k=>({dims:k.dims,dataType:st(k.dataType)})),outputsMetadata:h.map(k=>({dims:k.dims,dataType:st(k.dataType)})),kernelId:n,kernelType:u,kernelName:l,programName:p,startTime:_,endTime:b});else{let k="";f.forEach((w,I)=>{k+=`input[${I}]: [${w.dims}] | ${st(w.dataType)}, `});let x="";h.forEach((w,I)=>{x+=`output[${I}]: [${w.dims}] | ${st(w.dataType)}, `}),console.log(`[profiling] kernel "${n}|${u}|${l}|${p}" ${k}${x}start time: ${_} ns, execution time: ${b-_} ns`)}Xr("GPU",`${p}::${g}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),Ze()}run(e,t,r,i,a,n){rt(e.name);let s=[];for(let w=0;w<t.length;++w){let I=t[w].data;if(I===0)continue;let S=this.gpuDataManager.get(I);if(!S)throw new Error(`no GPU data for input: ${I}`);s.push(S)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(t),f=r.length===0?u.map((w,I)=>I):r;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let h=[],g=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(f[w])||f[w]<-3||f[w]>=n)throw new Error(`Invalid output index: ${f[w]}`);if(f[w]===-3)continue;let I=f[w]===-1,S=f[w]===-2,E=I||S?a(u[w].dataType,u[w].dims):i(f[w],u[w].dataType,u[w].dims);if(h.push(E),E.data===0)continue;let C=this.gpuDataManager.get(E.data);if(!C)throw new Error(`no GPU data for output: ${E.data}`);if(I&&this.temporaryData.push(C),S){let A=this.kernelPersistentData.get(this.currentKernelId);A||(A=[],this.kernelPersistentData.set(this.currentKernelId,A)),A.push(C)}g.push(C)}if(s.length!==t.length||g.length!==h.length){if(g.length===0)return Ze(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(p){let w=0,I=[];p.forEach(A=>{let v=typeof A.data=="number"?[A.data]:A.data;if(v.length===0)return;let P=A.type===10?2:4,q,Y;A.type===10?(Y=v.length>4?16:v.length>2?8:v.length*P,q=v.length>4?16:P*v.length):(Y=v.length<=2?v.length*P:16,q=16),w=Math.ceil(w/Y)*Y,I.push(w);let H=A.type===10?8:4;w+=v.length>4?Math.ceil(v.length/H)*q:v.length*P});let S=16;w=Math.ceil(w/S)*S;let E=new ArrayBuffer(w);p.forEach((A,v)=>{let P=I[v],q=typeof A.data=="number"?[A.data]:A.data;if(A.type===6)new Int32Array(E,P,q.length).set(q);else if(A.type===12)new Uint32Array(E,P,q.length).set(q);else if(A.type===10)new Uint16Array(E,P,q.length).set(q);else if(A.type===1)new Float32Array(E,P,q.length).set(q);else throw new Error(`Unsupported uniform type: ${st(A.type)}`)});let C=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,E,0,w),this.gpuDataManager.release(C.id),y={offset:0,size:w,buffer:C.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),b=_[1]===1&&_[2]===1,k=Zd(e,t,b),x=this.programManager.getArtifact(k);if(x||(x=this.programManager.build(e,_),this.programManager.setArtifact(k,x),le("info",()=>`[artifact] key: ${k}, programName: ${e.name}`)),p&&x.uniformVariablesInfo){if(p.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${p.length} in program "${x.programInfo.name}".`);for(let w=0;w<p.length;w++){let I=p[w],S=I.type,E=typeof I.data=="number"?1:I.data.length,[C,A]=x.uniformVariablesInfo[w];if(S!==C||E!==A)throw new Error(`Uniform variable ${w} mismatch: expect type ${C} with size ${A}, got type ${S} with size ${E} in program "${x.programInfo.name}".`)}}if(le("info",()=>`[ProgramManager] run "${e.name}" (key=${k}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(x,s,g,_,y),Ze(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=$f.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,n=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),le("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${p}`)),1}finally{l&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${a}] ${n}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,n);return a.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Aa(this,e,t);return sn(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){le("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){le("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){le("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),n=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),kf={};Kt(kf,{init:()=>Tf});var Lr,Yd,Tf,w0=U(()=>{J(),ot(),re(),Iy(),Lr=class If{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(O.size(t)!==O.size(this.dims))throw new Error("Invalid new shape");return new If(this.module,this.dataType,this.data,t)}},Yd=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,n=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,n));let s=Number(e.getValue(i*a++,n));this.outputCount=Number(e.getValue(i*a++,n)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,n));let u=[];for(let l=0;l<s;l++){let p=Number(e.getValue(i*a++,n)),f=Number(e.getValue(i*a++,"*")),h=Number(e.getValue(i*a++,n)),g=[];for(let y=0;y<h;y++)g.push(Number(e.getValue(i*a++,n)));u.push(new Lr(e,p,f,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],a=(s,u,l)=>new Lr(this.module,u,this.output(s,l),l),n=(s,u)=>{let l=Et(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new Lr(this.module,s,p,u)};return this.backend.run(e,r,i,a,n,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",n=this.module.stackAlloc((1+t.length)*i);this.module.setValue(n,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(n+i*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Tf=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=(_0(),gr(xf)).WebGpuBackend,s=new n;await s.initialize(r,i),a("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,p,f=!1)=>{if(f)le("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`),s.memcpy(Number(u),Number(l));else{le("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let h=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));s.upload(Number(l),h)}},async(u,l,p)=>{le("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(u,l,p)=>s.createKernel(u,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,p,f)=>{le("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`);let h=new Yd(t,s,Number(l));return s.computeKernel(Number(u),h,f)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let n=new Mp(r);a("webnn",[n,()=>n.reserveTensorId(),s=>n.releaseTensorId(s),async(s,u,l,p,f)=>n.ensureTensor(s,u,l,p,f),(s,u)=>{n.uploadTensor(s,u)},async(s,u)=>n.downloadTensor(s,u),(s,u)=>n.registerMLContext(s,u),!!r.trace])}}}),Xd,yn,_n,mt,Jd,xa,ni,wn,bn,Sa,$n,vn,xn,Ef=U(()=>{We(),Sy(),ky(),J(),Dt(),en(),Cp(),Xd=(e,t)=>{ye()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},yn=async e=>{Xd(e.wasm.numThreads,ei(e.logLevel))},_n=async(e,t)=>{ye().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(w0(),gr(kf)).init;t==="webgpu"&&await i("webgpu",ye(),e,r),t==="webnn"&&await i("webnn",ye(),e)}},mt=new Map,Jd=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&fe("Can't get session input/output count.");let n=i===4?"i32":"i64";return[Number(t.getValue(a,n)),Number(t.getValue(a+i,n))]}finally{t.stackRestore(r)}},xa=(e,t)=>{let r=ye(),i=r.stackSave(),a=0;try{let n=r.PTR_SIZE,s=r.stackAlloc(2*n);r._OrtGetInputOutputMetadata(e,t,s,s+n)!==0&&fe("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));a=Number(r.getValue(s+n,"*"));let l=r.HEAP32[a/4];if(l===0)return[u,0];let p=r.HEAPU32[a/4+1],f=[];for(let h=0;h<p;h++){let g=Number(r.getValue(a+8+h*n,"*"));f.push(g!==0?r.UTF8ToString(g):Number(r.getValue(a+8+(h+p)*n,"*")))}return[u,l,f]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},ni=e=>{let t=ye(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},wn=async(e,t)=>{let r,i,a=ye();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=ni(e);let n=0,s=0,u=0,l=[],p=[],f=[];try{if([s,l]=await zp(t),t?.externalData&&a.mountExternalData){let S=[];for(let E of t.externalData){let C=typeof E=="string"?E:E.path;S.push(an(typeof E=="string"?E:E.data).then(A=>{a.mountExternalData(C,A)}))}await Promise.all(S)}for(let S of t?.executionProviders??[])if((typeof S=="string"?S:S.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof S!="string"){let E=S,C=E?.context,A=E?.gpuDevice,v=E?.deviceType,P=E?.powerPreference;C?a.currentContext=C:A?a.currentContext=await a.webnnCreateMLContext(A):a.currentContext=await a.webnnCreateMLContext({deviceType:v,powerPreference:P})}else a.currentContext=await a.webnnCreateMLContext();break}n=await a._OrtCreateSession(r,i,s),a.webgpuOnCreateSession?.(n),n===0&&fe("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[h,g]=Jd(n),y=!!t?.enableGraphCapture,_=[],b=[],k=[],x=[],w=[];for(let S=0;S<h;S++){let[E,C,A]=xa(n,S);E===0&&fe("Can't get an input name."),p.push(E);let v=a.UTF8ToString(E);_.push(v),k.push(C===0?{name:v,isTensor:!1}:{name:v,isTensor:!0,type:st(C),shape:A})}for(let S=0;S<g;S++){let[E,C,A]=xa(n,S+h);E===0&&fe("Can't get an output name."),f.push(E);let v=a.UTF8ToString(E);b.push(v),x.push(C===0?{name:v,isTensor:!1}:{name:v,isTensor:!0,type:st(C),shape:A});{if(y&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let P=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[v]??"cpu",q=a.webnnIsGraphOutput;if(P==="cpu"&&q&&q(n,v)){w.push("ml-tensor-cpu-output");continue}if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(y&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(P)}}let I=null;return w.some(S=>S==="gpu-buffer"||S==="ml-tensor"||S==="ml-tensor-cpu-output")&&(u=a._OrtCreateBinding(n),u===0&&fe("Can't create IO binding."),I={handle:u,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(S=>S==="ml-tensor-cpu-output"?"ml-tensor":S).map(S=>za(S))}),mt.set(n,[n,p,f,I,y,!1]),[n,_,b,k,x]}catch(h){throw p.forEach(g=>a._OrtFree(g)),f.forEach(g=>a._OrtFree(g)),u!==0&&a._OrtReleaseBinding(u)!==0&&fe("Can't release IO binding."),n!==0&&a._OrtReleaseSession(n)!==0&&fe("Can't release session."),h}finally{a._free(r),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&fe("Can't release session options."),l.forEach(h=>a._free(h)),a.unmountExternalData?.()}},bn=e=>{let t=ye(),r=mt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,n,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&fe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),n.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&fe("Can't release session."),mt.delete(e)},Sa=async(e,t,r,i,a,n,s=!1)=>{if(!e){t.push(0);return}let u=ye(),l=u.PTR_SIZE,p=e[0],f=e[1],h=e[3],g=h,y,_;if(p==="string"&&(h==="gpu-buffer"||h==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&h!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(h==="gpu-buffer"){let x=e[2].gpuBuffer;_=Et(It(p),f);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=w(i,n,x,_)}}else if(h==="ml-tensor"){let x=e[2].mlTensor;_=Et(It(p),f);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=w(i,x,It(p),f)}else{let x=e[2];if(Array.isArray(x)){_=l*x.length,y=u._malloc(_),r.push(y);for(let w=0;w<x.length;w++){if(typeof x[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(y+w*l,Ke(x[w],r),"*")}}else{let w=u.webnnIsGraphInput,I=u.webnnIsGraphOutput;if(p!=="string"&&w&&I){let S=u.UTF8ToString(a);if(w(i,S)||I(i,S)){let E=It(p);_=Et(E,f),g="ml-tensor";let C=u.webnnCreateTemporaryTensor,A=u.webnnUploadTensor;if(!C||!A)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let v=await C(i,E,f);A(v,new Uint8Array(x.buffer,x.byteOffset,x.byteLength)),y=v}else _=x.byteLength,y=u._malloc(_),r.push(y),u.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,_),y)}else _=x.byteLength,y=u._malloc(_),r.push(y),u.HEAPU8.set(new Uint8Array(x.buffer,x.byteOffset,_),y)}}let b=u.stackSave(),k=u.stackAlloc(4*f.length);try{f.forEach((w,I)=>u.setValue(k+I*l,w,l===4?"i32":"i64"));let x=u._OrtCreateTensor(It(p),y,_,k,f.length,za(g));x===0&&fe(`Can't create tensor for input/output. session=${i}, index=${n}.`),t.push(x)}finally{u.stackRestore(b)}},$n=async(e,t,r,i,a,n)=>{let s=ye(),u=s.PTR_SIZE,l=mt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],f=l[1],h=l[2],g=l[3],y=l[4],_=l[5],b=t.length,k=i.length,x=0,w=[],I=[],S=[],E=[],C=[],A=s.stackSave(),v=s.stackAlloc(b*u),P=s.stackAlloc(b*u),q=s.stackAlloc(k*u),Y=s.stackAlloc(k*u);try{[x,w]=Ep(n),Ct("wasm prepareInputOutputTensor");for(let D=0;D<b;D++)await Sa(r[D],I,E,e,f[t[D]],t[D],y);for(let D=0;D<k;D++)await Sa(a[D],S,E,e,h[i[D]],b+i[D],y);At("wasm prepareInputOutputTensor");for(let D=0;D<b;D++)s.setValue(v+D*u,I[D],"*"),s.setValue(P+D*u,f[t[D]],"*");for(let D=0;D<k;D++)s.setValue(q+D*u,S[D],"*"),s.setValue(Y+D*u,h[i[D]],"*");if(g&&!_){let{handle:D,outputPreferredLocations:G,outputPreferredLocationsEncoded:ee}=g;if(f.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${f.length}).`);Ct("wasm bindInputsOutputs");for(let Q=0;Q<b;Q++){let X=t[Q];await s._OrtBindInput(D,f[X],I[Q])!==0&&fe(`Can't bind input[${Q}] for session=${e}.`)}for(let Q=0;Q<k;Q++){let X=i[Q];a[Q]?.[3]?(C.push(S[Q]),s._OrtBindOutput(D,h[X],S[Q],0)!==0&&fe(`Can't bind pre-allocated output[${Q}] for session=${e}.`)):s._OrtBindOutput(D,h[X],0,ee[X])!==0&&fe(`Can't bind output[${Q}] to ${G[Q]} for session=${e}.`)}At("wasm bindInputsOutputs"),mt.set(e,[p,f,h,g,y,!0])}s.jsepOnRunStart?.(p),s.webnnOnRunStart?.(p);let H;g?H=await s._OrtRunWithBinding(p,g.handle,k,q,x):H=await s._OrtRun(p,P,v,b,Y,k,q,x),H!==0&&fe("failed to call OrtRun().");let Z=[],R=[];Ct("wasm ProcessOutputTensor");for(let D=0;D<k;D++){let G=Number(s.getValue(q+D*u,"*"));if(G===S[D]||C.includes(S[D])){Z.push(a[D]),G!==S[D]&&s._OrtReleaseTensor(G)!==0&&fe("Can't release tensor.");continue}let ee=s.stackSave(),Q=s.stackAlloc(4*u),X=!1,de,M=0;try{s._OrtGetTensorData(G,Q,Q+u,Q+2*u,Q+3*u)!==0&&fe(`Can't access output tensor data on index ${D}.`);let L=u===4?"i32":"i64",te=Number(s.getValue(Q,L));M=s.getValue(Q+u,"*");let oe=s.getValue(Q+u*2,"*"),Ae=Number(s.getValue(Q+u*3,L)),Re=[];for(let xe=0;xe<Ae;xe++)Re.push(Number(s.getValue(oe+xe*u,L)));s._OrtFree(oe)!==0&&fe("Can't free memory for tensor dims.");let Pe=Re.reduce((xe,we)=>xe*we,1);de=st(te);let ut=g?.outputPreferredLocations[i[D]];if(de==="string"){if(ut==="gpu-buffer"||ut==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let we=0;we<Pe;we++){let ze=s.getValue(M+we*u,"*"),wr=s.getValue(M+(we+1)*u,"*"),Qe=we===Pe-1?void 0:wr-ze;xe.push(s.UTF8ToString(ze,Qe))}Z.push([de,Re,xe,"cpu"])}else if(ut==="gpu-buffer"&&Pe>0){let xe=s.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let we=xe(M),ze=Et(te,Pe);if(ze===void 0||!tn(de))throw new Error(`Unsupported data type: ${de}`);X=!0,Z.push([de,Re,{gpuBuffer:we,download:s.jsepCreateDownloader(we,ze,de),dispose:()=>{s._OrtReleaseTensor(G)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(ut==="ml-tensor"&&Pe>0){let xe=s.webnnEnsureTensor,we=s.webnnIsGraphInputOutputTypeSupported;if(!xe||!we)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Et(te,Pe)===void 0||!rn(de))throw new Error(`Unsupported data type: ${de}`);if(!we(e,de,!1))throw new Error(`preferredLocation "ml-tensor" for ${de} output is not supported by current WebNN Context.`);let ze=await xe(e,M,te,Re,!1);X=!0,Z.push([de,Re,{mlTensor:ze,download:s.webnnCreateMLTensorDownloader(M,de),dispose:()=>{s.webnnReleaseTensorId(M),s._OrtReleaseTensor(G)}},"ml-tensor"])}else if(ut==="ml-tensor-cpu-output"&&Pe>0){let xe=s.webnnCreateMLTensorDownloader(M,de)(),we=Z.length;X=!0,R.push((async()=>{let ze=[we,await xe];return s.webnnReleaseTensorId(M),s._OrtReleaseTensor(G),ze})()),Z.push([de,Re,[],"cpu"])}else{let xe=si(de),we=new xe(Pe);new Uint8Array(we.buffer,we.byteOffset,we.byteLength).set(s.HEAPU8.subarray(M,M+we.byteLength)),Z.push([de,Re,we,"cpu"])}}finally{s.stackRestore(ee),de==="string"&&M&&s._free(M),X||s._OrtReleaseTensor(G)}}g&&!y&&(s._OrtClearBoundOutputs(g.handle)!==0&&fe("Can't clear bound outputs."),mt.set(e,[p,f,h,g,y,!1]));for(let[D,G]of await Promise.all(R))Z[D][2]=G;return At("wasm ProcessOutputTensor"),Z}finally{s.webnnOnRunEnd?.(p),s.stackRestore(A),I.forEach(H=>s._OrtReleaseTensor(H)),S.forEach(H=>s._OrtReleaseTensor(H)),E.forEach(H=>s._free(H)),x!==0&&s._OrtReleaseRunOptions(x),w.forEach(H=>s._free(H))}},vn=e=>{let t=ye(),r=mt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&fe("Can't get an profile file name."),t._OrtFree(a)},xn=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),gt,qe,Wt,ur,lr,Vr,ka,Gr,St,kt,ep,zf,Cf,Af,Of,Rf,Bf,Nf,Mf=U(()=>{We(),Ef(),Dt(),Xa(),gt=()=>!!me.wasm.proxy&&typeof document<"u",Wt=!1,ur=!1,lr=!1,Gr=new Map,St=(e,t)=>{let r=Gr.get(e);r?r.push(t):Gr.set(e,[t])},kt=()=>{if(Wt||!ur||lr||!qe)throw new Error("worker not ready")},ep=e=>{switch(e.data.type){case"init-wasm":Wt=!1,e.data.err?(lr=!0,ka[1](e.data.err)):(ur=!0,ka[0]()),Vr&&(URL.revokeObjectURL(Vr),Vr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Gr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},zf=async()=>{if(!ur){if(Wt)throw new Error("multiple calls to 'initWasm()' detected.");if(lr)throw new Error("previous call to 'initWasm()' failed.");if(Wt=!0,gt())return new Promise((e,t)=>{qe?.terminate(),Tp().then(([r,i])=>{try{qe=i,qe.onerror=n=>t(n),qe.onmessage=ep,ka=[e,t];let a={type:"init-wasm",in:me};!a.in.wasm.wasmPaths&&(r||Ea)&&(a.in.wasm.wasmPaths={wasm:new URL("/assets/ort-wasm-simd-threaded.jsep-C887KxcQ.wasm",import.meta.url).href}),qe.postMessage(a),Vr=r}catch(a){t(a)}},t)});try{await Ja(me.wasm),await yn(me),ur=!0}catch(e){throw lr=!0,e}finally{Wt=!1}}},Cf=async e=>{if(gt())return kt(),new Promise((t,r)=>{St("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:me}};qe.postMessage(i)});await _n(me,e)},Af=async e=>gt()?(kt(),new Promise((t,r)=>{St("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};qe.postMessage(i,[e.buffer])})):ni(e),Of=async(e,t)=>{if(gt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return kt(),new Promise((r,i)=>{St("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),qe.postMessage(a,n)})}else return wn(e,t)},Rf=async e=>{if(gt())return kt(),new Promise((t,r)=>{St("release",[t,r]);let i={type:"release",in:e};qe.postMessage(i)});bn(e)},Bf=async(e,t,r,i,a,n)=>{if(gt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return kt(),new Promise((s,u)=>{St("run",[s,u]);let l=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:n}};qe.postMessage(p,xn(l))})}else return $n(e,t,r,i,a,n)},Nf=async e=>{if(gt())return kt(),new Promise((t,r)=>{St("end-profiling",[t,r]);let i={type:"end-profiling",in:e};qe.postMessage(i)});vn(e)}}),Ta,tp,Df,b0=U(()=>{We(),Mf(),J(),Ya(),Cp(),Ta=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},tp=e=>{switch(e[3]){case"cpu":return new tt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!tn(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return tt.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!rn(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return tt.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Df=class{async fetchModelAndCopyToWasmMemory(e){return Af(await an(e))}async loadModel(e,t){rt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Of(r,t),Ze()}async dispose(){return Rf(this.sessionId)}async run(e,t,r){rt();let i=[],a=[];Object.entries(e).forEach(h=>{let g=h[0],y=h[1],_=this.inputNames.indexOf(g);if(_===-1)throw new Error(`invalid input '${g}'`);i.push(y),a.push(_)});let n=[],s=[];Object.entries(t).forEach(h=>{let g=h[0],y=h[1],_=this.outputNames.indexOf(g);if(_===-1)throw new Error(`invalid output '${g}'`);n.push(y),s.push(_)});let u=i.map((h,g)=>Ta(h,()=>`input "${this.inputNames[a[g]]}"`)),l=n.map((h,g)=>h?Ta(h,()=>`output "${this.outputNames[s[g]]}"`):null),p=await Bf(this.sessionId,a,u,s,l,r),f={};for(let h=0;h<p.length;h++)f[this.outputNames[s[h]]]=n[h]??tp(p[h]);return Ze(),f}startProfiling(){}endProfiling(){Nf(this.sessionId)}}}),Pf={};Kt(Pf,{OnnxruntimeWebAssemblyBackend:()=>Va,initializeFlags:()=>La,wasmBackend:()=>Uf});var La,Va,Uf,$0=U(()=>{We(),Mf(),b0(),La=()=>{(typeof me.wasm.initTimeout!="number"||me.wasm.initTimeout<0)&&(me.wasm.initTimeout=0);let e=me.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),me.wasm.simd=!1),typeof me.wasm.proxy!="boolean"&&(me.wasm.proxy=!1),typeof me.wasm.trace!="boolean"&&(me.wasm.trace=!1),typeof me.wasm.numThreads!="number"||!Number.isInteger(me.wasm.numThreads)||me.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)me.wasm.numThreads=1;else{let t=typeof navigator>"u"?sy("node:os").cpus().length:navigator.hardwareConcurrency;me.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Va=class{async init(e){La(),await zf(),await Cf(e)}async createInferenceSessionHandler(e,t){let r=new Df;return await r.loadModel(e,t),r}},Uf=new Va});We();We();We();var v0="1.24.3";{let e=($0(),gr(Pf)).wasmBackend;Lt("webgpu",e,5),Lt("webnn",e,5),Lt("cpu",e,10),Lt("wasm",e,10)}Object.defineProperty(me.versions,"web",{value:v0,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const x0=.5,S0=.45;let Gt=null;async function k0(e="/model.onnx"){return me.wasm.wasmPaths="/",me.wasm.simd=!0,me.wasm.numThreads=1,me.wasm.proxy=!1,Gt=await Qa.create(e,{executionProviders:["wasm"]}),Gt}async function qf(e){if(!Gt)throw new Error("Model not loaded. Call loadModel() first.");const r={[Gt.inputNames[0]]:e};return(await Gt.run(r))[Gt.outputNames[0]]}function Wf(e,t,r,i){const a=e.data,n=e.dims;let s,u;n[1]<n[2]?(s=n[1],u=n[2]):(s=n[2],u=n[1]);const l=s-4,p=[],{scale:f,offsetX:h,offsetY:g}=i;for(let y=0;y<u;y++){let _=-1/0,b=-1;for(let v=0;v<l;v++){const P=a[(4+v)*u+y];P>_&&(_=P,b=v)}if(_<x0)continue;const k=a[0*u+y],x=a[1*u+y],w=a[2*u+y],I=a[3*u+y],S=(k-h)/f-w/f/2,E=(x-g)/f-I/f/2,C=w/f,A=I/f;p.push({classId:b,x:S,y:E,width:C,height:A,confidence:_})}return I0(p,S0)}function T0(e,t){const r=Math.max(e.x,t.x),i=Math.max(e.y,t.y),a=Math.min(e.x+e.width,t.x+t.width),n=Math.min(e.y+e.height,t.y+t.height),s=Math.max(0,a-r)*Math.max(0,n-i),u=e.width*e.height,l=t.width*t.height;return s/(u+l-s+1e-6)}function I0(e,t){e.sort((a,n)=>n.confidence-a.confidence);const r=[],i=new Uint8Array(e.length);for(let a=0;a<e.length;a++)if(!i[a]){r.push(e[a]);for(let n=a+1;n<e.length;n++)i[n]||T0(e[a],e[n])>t&&(i[n]=1)}return r}const Hr={x:.1,y:.2,w:.8,h:.6},rp=22,E0=4,Lf={0:{color:"#ef4444",label:"10A"},1:{color:"#3b82f6",label:"15A"},2:{color:"#eab308",label:"20A"},3:{color:"#000000",label:"25A"},4:{color:"#868484",label:"2A"},5:{color:"#22c55e",label:"30A"},6:{color:"#f97316",label:"5A"},7:{color:"#6b3a3a",label:"7.5A"},8:{color:"#b81ede",label:"BOŞ"}},z0={color:"#f59e0b"};function C0(e){return{x:Math.round(e.width*Hr.x),y:Math.round(e.height*Hr.y),w:Math.round(e.width*Hr.w),h:Math.round(e.height*Hr.h)}}function _r(e,t){e.width=t.clientWidth||t.offsetWidth,e.height=t.clientHeight||t.offsetHeight}function Sn(e){e.getContext("2d").clearRect(0,0,e.width,e.height)}function kn(e,t){const r=e.getContext("2d"),{x:i,y:a,w:n,h:s}=C0(e),u=t?"#ef4444":"#ffffff";r.fillStyle="rgba(0,0,0,0.55)",r.fillRect(0,0,e.width,e.height),r.clearRect(i,a,n,s),r.strokeStyle=u,r.lineWidth=E0,r.lineCap="round";const l=[[i,a,1,1],[i+n,a,-1,1],[i,a+s,1,-1],[i+n,a+s,-1,-1]];for(const[p,f,h,g]of l)r.beginPath(),r.moveTo(p+h*rp,f),r.lineTo(p,f),r.lineTo(p,f+g*rp),r.stroke()}function A0(e,t,r,i={x:0,y:0}){const a=e.getContext("2d"),n=e.width,s=e.height,u=t.videoWidth||t.naturalWidth||t.width,l=t.videoHeight||t.naturalHeight||t.height,p=n/u,f=s/l;for(const h of r){const g=(h.x+i.x)*p,y=(h.y+i.y)*f,_=h.width*p,b=h.height*f,k=Lf[h.classId]??z0;a.strokeStyle=k.color,a.lineWidth=2.5,a.strokeRect(g,y,_,b)}O0(e,a)}function O0(e,t){const r=Object.entries(Lf),i=2,a=Math.ceil(r.length/i),n=12,s=11,u=6,l=58,p=n+5,f=i*l+u*2,h=a*p+u*2,g=8,y=e.height-h-8;t.fillStyle="rgba(0,0,0,0.65)",t.beginPath(),t.roundRect?t.roundRect(g,y,f,h,6):t.rect(g,y,f,h),t.fill(),t.font=`bold ${s}px sans-serif`,r.forEach(([_,b],k)=>{const x=k%i,w=Math.floor(k/i),I=g+u+x*l,S=y+u+w*p;t.fillStyle=b.color,t.fillRect(I,S,n,n),t.strokeStyle="rgba(255,255,255,0.3)",t.lineWidth=.5,t.strokeRect(I,S,n,n),t.fillStyle="#ffffff",t.fillText(b.label,I+n+4,S+n-1)})}let Vf=[];async function R0(e="/valid.json"){const t=await fetch(e,{headers:{"ngrok-skip-browser-warning":"true"}});if(!t.ok)throw new Error(`valid.json yüklenemedi: ${t.status}`);Vf=(await t.json()).combinations}function B0(e){if(e.length===0)return[];const t=e.map(u=>({...u,cx:u.x+u.width/2,cy:u.y+u.height/2})),r=t.map(u=>u.cx).sort((u,l)=>u-l),i=r[0],n=r[r.length-1]-i||1,s=t.map(u=>({...u,colIndex:Math.round((u.cx-i)/n*8)}));return s.sort((u,l)=>u.colIndex!==l.colIndex?u.colIndex-l.colIndex:u.cy-l.cy),s}function N0(e,t=null){if(!e||e.length===0)return"unknown";for(const r of Vf){const i=r.expected;let a;if(t&&t.length>0?a=B0(t).map(l=>l.classId):a=e,a.length!==i.length)return console.warn(`[Combination] "${r.id}": Beklenen ${i.length} pozisyon, tespit edilen ${a.length}`),"nok";let n=!0;const s=[];for(let u=0;u<i.length;u++){const l=i[u],p=a[u];l.classId!==p&&(n=!1,s.push({position:l.position,block:l.block,column:l.column,col_pos:l.col_pos,expectedLabel:l.label,expectedId:l.classId,detectedId:p}))}return n?(console.log(`[Combination] "${r.id}" → ✅ OK`),"ok"):(console.warn(`[Combination] "${r.id}" → ❌ NOK — ${s.length} hatalı pozisyon:`,s),"nok")}return console.warn("[Combination] Hiçbir kombinasyonla eşleşmedi → NOK"),"nok"}const M0="fusebox-v3",Me=document.getElementById("video"),Ot=document.getElementById("snapshot"),Oe=document.getElementById("canvas"),D0=document.getElementById("loading-overlay"),Fr=document.getElementById("loading-message"),Rt=document.getElementById("status-text"),Tn=document.getElementById("bottom-bar"),In=document.getElementById("result-label"),En=document.getElementById("detected-ids"),Ga=document.getElementById("btn-capture"),zt=document.getElementById("btn-match"),Ha=document.getElementById("btn-retake");let Ht=null,Fa=!1;const jr=document.createElement("canvas"),Kr=document.createElement("canvas"),Ia=document.createElement("canvas"),ja=(navigator.hardwareConcurrency??4)<=4||(navigator.deviceMemory??4)<=2,P0=ja?1e3/4:1e3/8;console.log(`[Perf] ${ja?"Düşük uçlu":"Yüksek uçlu"} cihaz — ${ja?4:8} FPS`);function U0(){const e=Me.style.display!=="none"?Me:Ot;_r(Oe,e)}window.addEventListener("resize",U0);let Yr=!1,mr=null;async function Gf(){Fa=!0;async function e(){if(Fa){Sn(Oe),kn(Oe,Yr);try{if(Me.readyState>=Me.HAVE_ENOUGH_DATA){const{cropped:t}=Hf(Me),r=Ff(t),i=await qf(r.tensor);Yr=Wf(i,t.width,t.height,r).length>0}}catch{Yr=!1}mr=setTimeout(e,P0)}}mr=setTimeout(e,0)}function q0(){Fa=!1,mr!==null&&(clearTimeout(mr),mr=null)}function Hf(e){const t=e instanceof HTMLVideoElement,r=t?e.videoWidth:e.width,i=t?e.videoHeight:e.height,a={x:Math.round(r*.1),y:Math.round(i*.2),w:Math.round(r*.8),h:Math.round(i*.6)};let n;return t?(jr.width=r,jr.height=i,jr.getContext("2d").drawImage(e,0,0),n=jr):n=e,Kr.width=a.w,Kr.height=a.h,Kr.getContext("2d").drawImage(n,a.x,a.y,a.w,a.h,0,0,a.w,a.h),{cropped:Kr,roi:a}}function Ff(e){Ia.width=640,Ia.height=640;const r=Ia.getContext("2d"),i=e.width,a=e.height,n=Math.min(640/i,640/a),s=Math.round(i*n),u=Math.round(a*n),l=(640-s)/2,p=(640-u)/2;r.fillStyle="#808080",r.fillRect(0,0,640,640),r.drawImage(e,l,p,s,u);const{data:f}=r.getImageData(0,0,640,640),h=640*640,g=new Float32Array(3*h);for(let _=0;_<h;_++)g[_]=f[_*4]/255,g[_+h]=f[_*4+1]/255,g[_+h*2]=f[_*4+2]/255;return{tensor:new window.ort.Tensor("float32",g,[1,3,640,640]),scale:n,offsetX:l,offsetY:p,scaleX:i/s,scaleY:a/u}}Ga.addEventListener("click",()=>{q0();const e=document.createElement("canvas");e.width=Me.videoWidth,e.height=Me.videoHeight,e.getContext("2d").drawImage(Me,0,0),Ht=e,Ot.src=e.toDataURL("image/jpeg"),Ot.style.display="block",Me.style.display="none",_r(Oe,Ot),Sn(Oe),kn(Oe,!1),Ga.classList.add("hidden"),zt.classList.remove("hidden"),Ha.classList.remove("hidden"),In.textContent="",En.textContent="Eşleştirmek için butona bas",Tn.className="",Rt.textContent="Fotoğraf hazır"});zt.addEventListener("click",async()=>{if(Ht){zt.disabled=!0,zt.textContent="⏳ Analiz ediliyor…",Rt.textContent="Analiz ediliyor…";try{_r(Oe,Ot);const{cropped:e,roi:t}=Hf(Ht),r=Ff(e),i=await qf(r.tensor),a=Wf(i,e.width,e.height,r);a.sort((l,p)=>l.x+l.width/2-(p.x+p.width/2));const n=a.length>0;Sn(Oe),kn(Oe,n),A0(Oe,Ot,a,{x:t.x/(Ht.width/Oe.width),y:t.y/(Ht.height/Oe.height)});const s=a.map(l=>l.classId),u=N0(s,a);Tn.className=u==="ok"?"ok":u==="nok"?"nok":"",In.textContent=u==="ok"?"OK":u==="nok"?"NOK":"—",En.textContent=s.length>0?`IDs: [${s.join(", ")}]`:"Nesne bulunamadı",Rt.textContent=u==="ok"?"Eşleşme bulundu ✓":"Eşleşme yok"}catch(e){Rt.textContent="Hata: "+e.message,console.error(e)}zt.disabled=!1,zt.textContent="🔍 Görüntü Eşleştir"}});Ha.addEventListener("click",()=>{Ot.style.display="none",Me.style.display="block",Ht=null,Yr=!1,_r(Oe,Me),Ga.classList.remove("hidden"),zt.classList.add("hidden"),Ha.classList.add("hidden"),In.textContent="",En.textContent="",Tn.className="",Rt.textContent="Kamera aktif",Gf()});async function W0(e){try{const t=await caches.open(M0),r="model.onnx",i=await t.match(r);if(i)return console.log("[Cache] Cache'den yüklendi"),i;console.log("[Cache] İndiriliyor...");const a=await fetch(e,{headers:{"ngrok-skip-browser-warning":"true"}});return a.ok&&t.put(r,a.clone()),a}catch(t){return console.warn("[Cache] Hata:",t.message),fetch(e,{headers:{"ngrok-skip-browser-warning":"true"}})}}async function L0(){try{Fr.textContent="Kombinasyonlar yükleniyor…",await R0("/valid.json"),Fr.textContent="Kamera başlatılıyor…",await ry(Me),_r(Oe,Me),Fr.textContent="Model yükleniyor…";const t=await(await W0("/model.onnx")).arrayBuffer();await k0(t),D0.classList.add("hidden"),Rt.textContent="Hazır",Gf()}catch(e){Fr.textContent=`Hata: ${e.message}`,Rt.textContent="Hata",console.error(e)}}L0();
