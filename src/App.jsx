import { useState, useRef, useEffect } from "react";

// â”€â”€â”€ SVG Icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const I = {
  // New logo: overlapping S lettermark with orbit ring
  logo: () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="1" y="1" width="26" height="26" rx="8" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M9 10.5C9 8.567 10.567 7 12.5 7H15C17.209 7 19 8.791 19 11C19 13.209 17.209 15 15 15H13C10.791 15 9 16.791 9 19C9 21.209 10.791 23 13 23H15.5C17.433 23 19 21.433 19 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  feed:      ({active:s}) => <svg width="18" height="18" viewBox="0 0 24 24" fill={s?"currentColor":"none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fillOpacity={s?0.15:0}/></svg>,
  rooms:     ({active:s}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1.5" fill={s?"currentColor":"none"} fillOpacity={s?0.2:0}/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill={s?"currentColor":"none"} fillOpacity={s?0.2:0}/></svg>,
  account:   ({active:s}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill={s?"currentColor":"none"} fillOpacity={s?0.15:0}/><circle cx="12" cy="7" r="4"/></svg>,
  friends:   ({active:s}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill={s?"currentColor":"none"} fillOpacity={s?0.15:0}/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  sun:       () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon:      () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  plus:      () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  close:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  heart:     (f) => <svg width="14" height="14" viewBox="0 0 24 24" fill={f?"currentColor":"none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  comment:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  send:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  shield:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  hash:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  lock:      () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  globe:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  eye:       () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  chevR:     () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
  trending:  () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  goldCheck: () => (
    <svg title="SecretSpace Premium" width="16" height="16" viewBox="0 0 24 24" style={{display:"inline-block",flexShrink:0,filter:"drop-shadow(0 1px 3px rgba(214,166,32,0.35))"}}>
      <circle cx="12" cy="12" r="10" fill="#d6a620"/>
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="#ffe58a" strokeWidth="1.2" opacity="0.9"/>
      <path d="M7.2 12.2l3 3 6.5-7" fill="none" stroke="#1b1200" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  settings:  () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  search:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  back:      () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
  menu:      () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  share:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  trash:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  myspace:   ({active:s}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill={s?"currentColor":"none"} fillOpacity={s?0.12:0}/><polyline points="14 2 14 8 20 8"/><rect x="8" y="12" width="3" height="3" rx="0.5" fill={s?"currentColor":"none"} fillOpacity={s?0.3:0}/><rect x="13" y="12" width="3" height="3" rx="0.5"/></svg>,
  encrypt:   () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>,
};

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ADJS  = ["Cosmic","Stellar","Nebula","Velvet","Shadow","Lunar","Mystic","Astral","Nova","Cipher","Photon","Quasar"];
const NOUNS = ["Wanderer","Phantom","Observer","Pilgrim","Nomad","Specter","Drifter","Watcher","Echo","Signal","Voyager","Pulse"];
const uid   = () => Math.random().toString(36).slice(2,9);
const genId = () => `${ADJS[Math.floor(Math.random()*ADJS.length)]}_${NOUNS[Math.floor(Math.random()*NOUNS.length)]}_${Math.floor(1000+Math.random()*9000)}`;
const ago   = ts => { const s=Math.floor((Date.now()-ts)/1000); if(s<60)return`${s}s`; if(s<3600)return`${Math.floor(s/60)}m`; if(s<86400)return`${Math.floor(s/3600)}h`; return`${Math.floor(s/86400)}d`; };

const CATS = ["All","Life","Work","Hobby","Film","Love","Other"];
const APP_BASE = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "https://secretspace.app";
const MAX_PREMIUM_ROOMS = 1;

// ─── E2E Encryption (Web Crypto AES-GCM) ───────────────────────────────────
let _e2eKey = null;
async function getE2EKey() {
  if (_e2eKey) return _e2eKey;
  const stored = sessionStorage.getItem("ss_e2e_key");
  if (stored) {
    _e2eKey = await crypto.subtle.importKey("raw", Uint8Array.from(atob(stored), c => c.charCodeAt(0)), { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
    return _e2eKey;
  }
  _e2eKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const raw = await crypto.subtle.exportKey("raw", _e2eKey);
  sessionStorage.setItem("ss_e2e_key", btoa(String.fromCharCode(...new Uint8Array(raw))));
  return _e2eKey;
}
async function encryptText(plain) {
  if (!plain || !crypto?.subtle) return plain;
  try {
    const key = await getE2EKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plain));
    const combined = new Uint8Array(iv.length + enc.byteLength);
    combined.set(iv); combined.set(new Uint8Array(enc), iv.length);
    return "e2e:" + btoa(String.fromCharCode(...combined));
  } catch { return plain; }
}
async function decryptText(cipher) {
  if (!cipher || !cipher.startsWith("e2e:") || !crypto?.subtle) return cipher;
  try {
    const key = await getE2EKey();
    const data = Uint8Array.from(atob(cipher.slice(4)), c => c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const dec = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data.slice(12));
    return new TextDecoder().decode(dec);
  } catch { return "[Encrypted content]"; }
}

function shareLink(type, id, label) {
  const url = `${APP_BASE}?${type}=${encodeURIComponent(id)}`;
  const text = type === "room"
    ? `Join "${label}" on SecretSpace — anonymous rooms, end-to-end encrypted.`
    : `Check out this confession on SecretSpace — fully anonymous & encrypted.`;
  if (navigator.share) {
    navigator.share({ title: "SecretSpace", text, url }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(`${text}\n${url}`).then(() => alert("Link copied to clipboard!")).catch(() => prompt("Copy this link:", url));
  }
}

function Toast({T,msg,onDone}) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{position:"fixed",bottom:90,left:"50%",transform:"translateX(-50%)",zIndex:10000,background:T.surface,border:`1px solid ${T.border2}`,borderRadius:10,padding:"10px 18px",fontSize:"0.8rem",color:T.text,boxShadow:"0 8px 32px rgba(0,0,0,0.35)",animation:"fadeUp 0.2s ease"}}>
      {msg}
    </div>
  );
}

// â”€â”€â”€ Seed Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SEED_POSTS = [
  {id:uid(),author:"Cosmic_Wanderer_4829",text:"I still sleep with a stuffed animal and I'm 27. Zero regrets.",cat:"Life",hearts:142,liked:false,ts:Date.now()-3600000,comments:3},
  {id:uid(),author:"Shadow_Echo_7231",text:"I pretend to be busy on video calls so people think I'm important. Works every time.",cat:"Work",hearts:89,liked:false,ts:Date.now()-7200000,comments:1},
  {id:uid(),author:"Nebula_Drifter_3341",text:"Been learning guitar for 3 years. Still haven't finished a single song.",cat:"Hobby",hearts:204,liked:false,ts:Date.now()-86400000,comments:7},
  {id:uid(),author:"Lunar_Specter_9910",text:"Traffic alone is my therapy. It's the only silence I get all day.",cat:"Life",hearts:317,liked:false,ts:Date.now()-172800000,comments:12},
  {id:uid(),author:"Astral_Signal_2284",text:"Watched The Office 7 times. Cried at the exact same scenes every single time.",cat:"Film",hearts:451,liked:false,ts:Date.now()-259200000,comments:24},
  {id:uid(),author:"Quasar_Nomad_5571",text:"I rehearse arguments in the shower that will never happen. I always win them though.",cat:"Life",hearts:388,liked:false,ts:Date.now()-320000000,comments:9},
];

const SEED_ROOMS = [
  {id:"global",    name:"Global",       desc:"Everyone, everywhere",       members:1240, type:"public",  active:true },
  {id:"latenight", name:"Late Night",   desc:"For the 3am thinkers",       members:892,  type:"public",  active:true },
  {id:"seniors",   name:"Silver Lounge",desc:"Wisdom & warm conversations",members:380,  type:"public",  active:false},
  {id:"students",  name:"Study Hall",   desc:"Students helping students",  members:634,  type:"public",  active:true },
  {id:"healing",   name:"Healing",      desc:"Vent, be heard, heal",       members:271,  type:"private", active:true },
  {id:"random",    name:"Random",       desc:"Anything goes",              members:503,  type:"public",  active:false},
];

const SEED_MSGS = {
  global:    [{id:uid(),from:"Stellar_Nomad_3821",text:"Hello everyone!",ts:Date.now()-600000},{id:uid(),from:"Nova_Echo_7734",text:"Good to be here.",ts:Date.now()-300000}],
  latenight: [{id:uid(),from:"Mystic_Pulse_2209",text:"3am thoughts: do fish ever get thirsty?",ts:Date.now()-900000}],
  seniors:   [{id:uid(),from:"Cosmic_Voyager_1188",text:"Good morning! Coffee anyone?",ts:Date.now()-1800000}],
  students:  [{id:uid(),from:"Astral_Observer_4421",text:"Anyone else studying for finals?",ts:Date.now()-1200000}],
  healing:   [{id:uid(),from:"Velvet_Signal_8810",text:"It gets better. Truly.",ts:Date.now()-2400000}],
  random:    [{id:uid(),from:"Shadow_Pilgrim_6634",text:"What is everyone up to tonight?",ts:Date.now()-450000}],
};

const SEED_FRIENDS = [
  {id:1,name:"Stellar_Phantom_3821",status:"online", mutual:3,req:false},
  {id:2,name:"Nova_Observer_7734",  status:"offline",mutual:1,req:false},
  {id:3,name:"Mystic_Nomad_5519",   status:"online", mutual:5,req:true },
  {id:4,name:"Velvet_Watcher_2204", status:"away",   mutual:2,req:false},
];

// â”€â”€â”€ Themes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DARK = {
  bg:"#080808", sidebar:"#0d0d0d", surface:"#111111", surface2:"#181818", surface3:"#1e1e1e",
  border:"#1e1e1e", border2:"#2a2a2a", text:"#efefef", sub:"#666", muted:"#2e2e2e",
  accent:"#fff", accentText:"#000", pill:"#181818", pillBorder:"#252525",
  nav:"rgba(14,15,26,0.96)", navSolid:"#0e0f1a", navBorder:"#1c1e30",
  input:"#141414", online:"#22c55e", away:"#f59e0b",
  tag:"#181818", tagText:"#777", red:"#ef4444", searchBg:"#161828", searchBorder:"#252840",
};
const LIGHT = {
  bg:"#f5f5f3", sidebar:"#fefefe", surface:"#ffffff", surface2:"#f0f0ee", surface3:"#ebebea",
  border:"#e6e6e4", border2:"#d8d8d6", text:"#0a0a0a", sub:"#888", muted:"#c8c8c8",
  accent:"#0a0a0a", accentText:"#fff", pill:"#eeeeec", pillBorder:"#e0e0de",
  nav:"rgba(240,237,232,0.96)", navSolid:"#f0ede8", navBorder:"#e2ddd8",
  input:"#f0f0ee", online:"#16a34a", away:"#d97706",
  tag:"#eeeeec", tagText:"#777", red:"#dc2626", searchBg:"#e8e4df", searchBorder:"#d8d3ce",
};

// â”€â”€â”€ Global CSS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function globalCss(T, dark) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body{margin:0;padding:0;width:100%;height:100%;}
    #root,#app{margin:0;padding:0;width:100%;min-height:100vh;}
    button{cursor:pointer;font-family:'Sora',sans-serif;transition:opacity 0.15s,background 0.15s;}
    input,textarea{font-family:'Sora',sans-serif;}
    input::placeholder,textarea::placeholder{color:${T.muted};}
    input:focus,textarea:focus{outline:none;border-color:${T.border2} !important;}
    ::-webkit-scrollbar{width:3px;height:3px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:${T.border2};border-radius:99px;}
    .ib:hover{opacity:0.55;}
    .ni:hover{background:${T.surface2} !important;color:${T.text} !important;}
    .card{transition:border-color 0.15s,box-shadow 0.15s;}
    .card:hover{border-color:${T.border2} !important;box-shadow:0 2px 16px rgba(0,0,0,${dark?0.25:0.06});}
    .pb:hover{opacity:0.75;}
    .rr:hover{background:${T.surface2} !important;border-color:${T.border2} !important;}
    .fr:hover{background:${T.surface2} !important;}
    .privacy-lock{user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-user-drag:none;}
    .privacy-lock *{-webkit-user-select:none;user-select:none;}
    .sensitive-content{-webkit-user-drag:none;pointer-events:auto;}
    @media print{body *{visibility:hidden !important;}}
    @media print{body::after{content:"SecretSpace content is protected and cannot be printed.";visibility:visible;display:block;text-align:center;padding:40px;}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
    .card{animation:fadeUp 0.22s ease forwards;opacity:0;}
    @keyframes mIn{from{opacity:0;transform:scale(0.98) translateY(4px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .min{animation:mIn 0.22s cubic-bezier(0.34,1.2,0.64,1) forwards;}
    @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
    .sd{animation:slideDown 0.2s ease forwards;}

    /* â”€â”€ Mobile bottom sheet â”€â”€ */
    @keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
    .sheet{animation:sheetUp 0.28s cubic-bezier(0.34,1.1,0.64,1) forwards;}

    /* â”€â”€ Responsive layout â”€â”€ */
    .desktop-only{display:none !important;}
    .mobile-only{display:flex !important;}
    .mobile-nav{display:flex !important;}
    .desktop-sidebar{display:none !important;}
    .desktop-right{display:none !important;}
    .desktop-search{display:none !important;}
    .mobile-search-btn{display:flex !important;}
    .main-pad{padding:14px 16px calc(80px + env(safe-area-inset-bottom)) !important;width:100% !important;min-width:0 !important;overflow-x:hidden !important;}
    .header-h{height:52px !important;}
    .desktop-main-margins{margin-left:0 !important;margin-right:0 !important;}
    .mobile-fab{display:flex !important;}

    @media(min-width:768px){
      .desktop-only{display:flex !important;}
      .mobile-only{display:none !important;}
      .mobile-nav{display:none !important;}
      .desktop-sidebar{display:flex !important;}
      .desktop-right{display:flex !important;}
      .desktop-search{display:flex !important;}
      .mobile-search-btn{display:none !important;}
      .main-pad{padding:20px 24px 24px !important;}
      .header-h{height:56px !important;}
      .desktop-main-margins{margin-left:220px !important;margin-right:240px !important;height:calc(100vh - 56px) !important;overflow-y:auto !important;overflow-x:hidden !important;}
      .mobile-fab{display:none !important;}
      html,body,#root,#app{height:100vh !important;overflow:hidden !important;}
    }

    @media(max-width:767px){
      html,body{overflow-x:hidden !important;max-width:100vw;}
      body{overflow-y:auto;}
    }
  `;
}

// â”€â”€â”€ App â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function App() {
  const [dark,setDark]             = useState(true);
  const [tab,setTab]               = useState("feed");
  const [posts,setPosts]           = useState(SEED_POSTS);
  const [rooms,setRooms]           = useState(SEED_ROOMS);
  const [msgs,setMsgs]             = useState(SEED_MSGS);
  const [modal,setModal]           = useState(null);
  const [user,setUser]             = useState(null);
  const [guestId]                  = useState(genId);
  const [activeRoom,setActiveRoom] = useState(null);
  const [mobileSearch,setMobileSearch] = useState(false);
  const [searchVal,setSearchVal]   = useState("");
  const [privacyScreen,setPrivacyScreen] = useState(false);
  const [captureWarning,setCaptureWarning] = useState(false);
  const [toast,setToast] = useState(null);
  const T = dark ? DARK : LIGHT;
  const me = user?.name || guestId;

  const showToast = msg => setToast(msg);

  const toggleHeart = id => setPosts(p=>p.map(c=>c.id===id?{...c,hearts:c.hearts+(c.liked?-1:1),liked:!c.liked}:c));
  const addPost     = async (text,cat)=>{
    const enc = await encryptText(text);
    setPosts(p=>[{id:uid(),author:me,owner:me,text:enc,plain:text,cat,hearts:0,liked:false,ts:Date.now(),comments:0,encrypted:true},...p]);
    setModal(null);
    showToast("Confession posted — end-to-end encrypted");
  };
  const deletePost  = id => { setPosts(p=>p.filter(c=>c.id!==id)); showToast("Confession deleted"); };
  const addRoom     = (r)=>{
    const owned = rooms.filter(x=>x.owner===me).length;
    if (owned >= MAX_PREMIUM_ROOMS) { showToast("Premium limit: 1 room per account"); return; }
    setRooms(p=>[{...r,owner:me},...p]);
    setMsgs(m=>({...m,[r.id]:[]}));
    setModal(null);
    showToast("Room created!");
  };
  const deleteRoom  = id => {
    setRooms(p=>p.filter(r=>r.id!==id));
    setMsgs(m=>{ const n={...m}; delete n[id]; return n; });
    if (activeRoom?.id===id) setActiveRoom(null);
    showToast("Room deleted");
  };
  const sendMsg     = async (roomId,text)=>{
    const enc = await encryptText(text);
    setMsgs(p=>({...p,[roomId]:[...(p[roomId]||[]),{id:uid(),from:me,text:enc,plain:text,ts:Date.now(),encrypted:true}]}));
  };
  const signUp      = (name)=>{ setUser({name,id:genId(),joined:Date.now(),subscribed:false}); setModal(null); };
  const signIn      = (name)=>{ setUser({name,id:genId(),joined:Date.now(),subscribed:false}); setModal(null); };
  const upgradeUser = ()=>setUser(u=>u?{...u,subscribed:true}:u);
  const ownedRooms  = rooms.filter(r=>r.owner===me);
  const myPosts     = posts.filter(p=>p.owner===me);

  useEffect(()=>{
    const hide = () => setPrivacyScreen(true);
    const show = () => { setPrivacyScreen(false); setCaptureWarning(false); };
    const onVisibility = () => setPrivacyScreen(document.hidden);
    const blockCopy = e => e.preventDefault();
    const blockDrag = e => e.preventDefault();
    const onKey = e => {
      if (e.key === "PrintScreen" || (e.metaKey && e.shiftKey && ["3","4","5"].includes(e.key))) {
        setCaptureWarning(true);
        setPrivacyScreen(true);
        setTimeout(() => setCaptureWarning(false), 3000);
      }
    };
    window.addEventListener("blur",hide);
    window.addEventListener("focus",show);
    document.addEventListener("visibilitychange",onVisibility);
    document.addEventListener("copy",blockCopy);
    document.addEventListener("cut",blockCopy);
    document.addEventListener("dragstart",blockDrag);
    document.addEventListener("keydown",onKey);
    document.addEventListener("contextmenu",e=>e.preventDefault());
    return ()=>{
      window.removeEventListener("blur",hide);
      window.removeEventListener("focus",show);
      document.removeEventListener("visibilitychange",onVisibility);
      document.removeEventListener("copy",blockCopy);
      document.removeEventListener("cut",blockCopy);
      document.removeEventListener("dragstart",blockDrag);
      document.removeEventListener("keydown",onKey);
    };
  },[]);

  // Deep-link: open shared confession or room from URL
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get("room");
    const postId = params.get("confession");
    if (roomId) {
      const r = rooms.find(x=>x.id===roomId);
      if (r) { setActiveRoom(r); setTab("rooms"); }
    }
    if (postId) setTab("feed");
  },[]);

  const NAV_ITEMS = [
    {id:"feed",    label:"Confessions", Icon:I.feed   },
    {id:"rooms",   label:"Rooms",       Icon:I.rooms  },
    {id:"myspace", label:"My Space",    Icon:I.myspace},
    {id:"friends", label:"Friends",     Icon:I.friends},
    {id:"account", label:"Account",     Icon:I.account},
  ];

  return (
    <div className="privacy-lock" onContextMenu={e=>e.preventDefault()} style={{display:"flex",flexDirection:"column",minHeight:"100vh",width:"100%",maxWidth:"100vw",overflowX:"hidden",background:T.bg,color:T.text,fontFamily:"'Sora',sans-serif"}}>
      <style>{globalCss(T,dark)}</style>
      {privacyScreen&&(
        <div style={{position:"fixed",inset:0,zIndex:9999,background:T.bg,color:T.text,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:24}}>
          <div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:12,color:T.sub}}><I.lock/></div>
            <div style={{fontSize:"1rem",fontWeight:700,marginBottom:6}}>{captureWarning?"Screenshot blocked":"SecretSpace is protected"}</div>
            <div style={{fontSize:"0.82rem",color:T.sub,lineHeight:1.5}}>
              {captureWarning
                ? "Screen capture is not allowed. Content is hidden for your privacy."
                : "End-to-end encrypted content is hidden while the app is out of focus or being captured."}
            </div>
          </div>
        </div>
      )}
      {toast&&<Toast T={T} msg={toast} onDone={()=>setToast(null)}/>}

      {/* â”€â”€ Header â”€â”€ */}
      <header className="header-h" style={{position:"sticky",top:0,zIndex:50,borderBottom:`1px solid ${T.border}`,background:T.bg,backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",display:"flex",alignItems:"center",padding:"0 14px",gap:8,flexShrink:0,width:"100%",maxWidth:"100vw",overflow:"hidden"}}>

        {/* â”€â”€ Desktop: wordmark left â”€â”€ */}
        <div className="desktop-only" style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <div style={{fontFamily:"'Sora',sans-serif",fontSize:"0.92rem",fontWeight:700,letterSpacing:"-0.02em",color:T.text,lineHeight:1}}>secretspace</div>
          <div style={{fontSize:"0.48rem",letterSpacing:"0.18em",textTransform:"uppercase",color:T.sub,marginTop:2,display:"block"}}>anonymous network</div>
        </div>

        {/* â”€â”€ Desktop: search bar centered â”€â”€ */}
        <div className="desktop-search" style={{position:"absolute",left:"50%",transform:"translateX(-50%)",width:380,display:"flex",alignItems:"center"}}>
          <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:T.sub,display:"flex",pointerEvents:"none"}}><I.search/></div>
          <input value={searchVal} onChange={e=>setSearchVal(e.target.value)} placeholder="Search anything..."
            style={{width:"100%",background:T.surface2,border:`1.5px solid ${T.border2}`,borderRadius:99,padding:"7px 14px 7px 36px",fontSize:"0.8rem",color:T.text,transition:"border-color 0.15s"}}/>
          {searchVal&&<button onClick={()=>setSearchVal("")} className="ib" style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:T.sub,display:"flex",padding:2}}><I.close/></button>}
        </div>

        {/* â”€â”€ Desktop: right controls â”€â”€ */}
        <div className="desktop-only" style={{display:"flex",alignItems:"center",gap:6,marginLeft:"auto"}}>
          <button onClick={()=>setDark(d=>!d)} className="ib" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",color:T.text}}>
            {dark?<I.sun/>:<I.moon/>}
          </button>
          {user?(
            <button onClick={()=>setModal("account")} style={{display:"flex",alignItems:"center",gap:7,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,padding:"0 12px",height:32,fontSize:"0.78rem",fontWeight:500,color:T.text}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:T.online,flexShrink:0}}/>{user.name.split("_")[0]}
            </button>
          ):(
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setModal("signin")} style={{background:T.accent,border:"none",borderRadius:8,padding:"0 14px",height:32,fontSize:"0.78rem",fontWeight:600,color:T.accentText}}>Sign in</button>
              <button onClick={()=>setModal("signup")} style={{background:T.accent,border:"none",borderRadius:8,padding:"0 14px",height:32,fontSize:"0.78rem",fontWeight:600,color:T.accentText}}>Join free</button>
            </div>
          )}
        </div>

        {/* â”€â”€ Mobile: search icon (left) â”€â”€ */}
        <button className="mobile-search-btn ib" onClick={()=>setMobileSearch(s=>!s)}
          style={{background:"none",border:"none",color:T.text,display:"none",padding:6,flexShrink:0}}>
          <I.search/>
        </button>

        {/* â”€â”€ Mobile: wordmark (center, flex-based, no absolute) â”€â”€ */}
        <div className="mobile-only" style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",pointerEvents:"none"}}>
          <span style={{fontFamily:"'Sora',sans-serif",fontSize:"0.95rem",fontWeight:700,letterSpacing:"-0.02em",color:T.text}}>secretspace</span>
        </div>

        {/* â”€â”€ Mobile: theme toggle (right) â”€â”€ */}
        <div className="mobile-only" style={{alignItems:"center",flexShrink:0}}>
          <button onClick={()=>setDark(d=>!d)} className="ib"
            style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",color:T.text}}>
            {dark?<I.sun/>:<I.moon/>}
          </button>
        </div>
      </header>

      {/* Mobile search bar expandable */}
      {mobileSearch&&(
        <div className="sd mobile-only" style={{background:T.bg,borderBottom:`1px solid ${T.border}`,padding:"8px 14px",alignItems:"center",gap:8,width:"100%"}}>
          <div style={{flex:1,position:"relative",display:"flex",alignItems:"center"}}>
            <div style={{position:"absolute",left:11,color:T.sub,display:"flex",pointerEvents:"none"}}><I.search/></div>
            <input autoFocus value={searchVal} onChange={e=>setSearchVal(e.target.value)} placeholder="Search anything..."
              style={{width:"100%",background:T.surface2,border:`1.5px solid ${T.border2}`,borderRadius:99,padding:"9px 14px 9px 34px",fontSize:"0.85rem",color:T.text}}/>
          </div>
          <button onClick={()=>{setMobileSearch(false);setSearchVal("");}}
            style={{background:"none",border:"none",color:T.sub,fontSize:"0.78rem",fontWeight:500,flexShrink:0,padding:"4px 0"}}>Cancel</button>
        </div>
      )}

      {/* â”€â”€ Body â”€â”€ */}
      <div style={{display:"flex",flex:1,position:"relative",minWidth:0,overflow:"hidden"}}>

        {/* Desktop Left Sidebar â€” fixed, always visible */}
        <aside className="desktop-sidebar" style={{width:220,borderRight:`1px solid ${T.border}`,background:T.sidebar,flexDirection:"column",flexShrink:0,overflow:"hidden",height:"calc(100vh - 56px)",position:"fixed",top:56,left:0,zIndex:40}}>
          <nav style={{padding:"12px 8px",display:"flex",flexDirection:"column",gap:1}}>
            {NAV_ITEMS.map(({id,label,Icon})=>(
              <button key={id} onClick={()=>setTab(id)} className="ni" style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,border:"none",background:tab===id?T.surface2:"none",color:tab===id?T.text:T.sub,fontSize:"0.83rem",fontWeight:tab===id?600:400,textAlign:"left",transition:"all 0.15s"}}>
                <Icon active={tab===id}/>
                {label}
              </button>
            ))}
          </nav>

          <div style={{padding:"0 8px",marginTop:4}}>
            <div style={{fontSize:"0.6rem",letterSpacing:"0.12em",textTransform:"uppercase",color:T.muted,fontWeight:600,padding:"0 12px",marginBottom:6}}>Live Rooms</div>
            {rooms.filter(r=>r.active).slice(0,4).map(r=>(
              <button key={r.id} onClick={()=>{setActiveRoom(r);setTab("rooms");}} className="ni" style={{display:"flex",alignItems:"center",gap:8,padding:"6px 12px",borderRadius:7,border:"none",background:"none",color:T.sub,fontSize:"0.78rem",width:"100%",textAlign:"left",cursor:"pointer"}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:T.online,flexShrink:0}}/>
                <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{r.name}</span>
                <span style={{fontSize:"0.65rem",color:T.muted,flexShrink:0}}>{r.members>999?`${(r.members/1000).toFixed(1)}k`:r.members}</span>
              </button>
            ))}
          </div>

          {tab==="feed"&&<div style={{marginTop:"auto",padding:"10px 8px",borderTop:`1px solid ${T.border}`}}>
            <button onClick={()=>setModal("confess")} style={{width:"100%",background:T.accent,border:"none",borderRadius:8,padding:"9px 0",fontSize:"0.8rem",fontWeight:600,color:T.accentText,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <I.plus/> New Confession
            </button>
          </div>}
        </aside>

        {/* Center â€” offset by sidebar widths so it doesn't go under fixed panels */}
        <main className="desktop-main-margins" style={{flex:1,minWidth:0,display:"flex",WebkitOverflowScrolling:"touch"}}>
          <div className="main-pad" style={{flex:1,width:"100%",boxSizing:"border-box"}}>
            {tab==="feed"    && <FeedView    T={T} posts={posts} toggleHeart={toggleHeart} setModal={setModal} user={user} guestId={guestId} me={me} onDelete={deletePost} onShare={(id,label)=>shareLink("confession",id,label)}/>}
            {tab==="rooms"   && <RoomsView   T={T} rooms={rooms} msgs={msgs} sendMsg={sendMsg} user={user} guestId={guestId} me={me} setModal={setModal} activeRoom={activeRoom} setActiveRoom={setActiveRoom} onDeleteRoom={deleteRoom} onShareRoom={(id,name)=>shareLink("room",id,name)} ownedCount={ownedRooms.length} maxRooms={MAX_PREMIUM_ROOMS}/>}
            {tab==="myspace" && <MySpaceView T={T} posts={myPosts} rooms={ownedRooms} me={me} setTab={setTab} setActiveRoom={setActiveRoom} onDeletePost={deletePost} onDeleteRoom={deleteRoom} onSharePost={(id)=>shareLink("confession",id,"")} onShareRoom={(id,name)=>shareLink("room",id,name)} setModal={setModal} user={user} maxRooms={MAX_PREMIUM_ROOMS}/>}
            {tab==="account" && <AccountView T={T} user={user} guestId={guestId} setModal={setModal} onUpgrade={upgradeUser}/>}
            {tab==="friends" && <FriendsView T={T}/>}
          </div>
        </main>

        {/* Desktop Right Panel â€” fixed, always visible */}
        <aside className="desktop-right" style={{width:240,borderLeft:`1px solid ${T.border}`,padding:"20px 14px",flexDirection:"column",gap:16,flexShrink:0,overflowY:"auto",height:"calc(100vh - 56px)",position:"fixed",top:56,right:0,zIndex:40,background:T.sidebar}}>
          <RightStats T={T} posts={posts} rooms={rooms}/>
          <TrendingPanel T={T} posts={posts} toggleHeart={toggleHeart}/>
        </aside>
      </div>

      {/* â”€â”€ Mobile Bottom Nav â”€â”€ */}
      <nav className="mobile-nav" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,background:T.bg,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,justifyContent:"space-around",alignItems:"center",padding:`8px 0 calc(8px + env(safe-area-inset-bottom))`,flexShrink:0}}>
        {NAV_ITEMS.map(({id,label,Icon})=>(
          <button key={id} onClick={()=>setTab(id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",color:tab===id?T.text:T.sub,padding:"4px 0",flex:1,minWidth:0,borderRadius:10}}>
            <Icon active={tab===id}/>
            <span style={{fontSize:"0.52rem",fontWeight:tab===id?600:400,letterSpacing:"0.02em"}}>{label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile FAB â€” new confession */}
      {tab==="feed"&&<button className="mobile-fab" onClick={()=>setModal("confess")}
        style={{position:"fixed",bottom:`calc(72px + env(safe-area-inset-bottom))`,right:18,zIndex:49,
          background:T.accent,border:"none",borderRadius:16,width:50,height:50,
          alignItems:"center",justifyContent:"center",color:T.accentText,
          boxShadow:`0 4px 24px rgba(0,0,0,${dark?0.55:0.2})`}}>
        <I.plus/>
      </button>}

      {/* â”€â”€ Modals â”€â”€ */}
      {modal && (
        <>
          {/* Desktop: centered modal */}
          <div className="desktop-only" onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",zIndex:100,alignItems:"center",justifyContent:"center",padding:16}}>
            <div onClick={e=>e.stopPropagation()} className="min" style={{background:T.surface,border:`1px solid ${T.border2}`,borderRadius:14,width:"100%",maxWidth:420,padding:"24px",boxShadow:`0 20px 60px rgba(0,0,0,0.35)`}}>
              <ModalContent modal={modal} T={T} setModal={setModal} user={user} guestId={guestId} addPost={addPost} addRoom={addRoom} signUp={signUp} signIn={signIn} onSignOut={()=>{setUser(null);setModal(null);}} ownedRooms={ownedRooms.length} maxRooms={MAX_PREMIUM_ROOMS}/>
            </div>
          </div>
          {/* Mobile: bottom sheet */}
          <div className="mobile-only" onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:100,alignItems:"flex-end",justifyContent:"center"}}>
            <div onClick={e=>e.stopPropagation()} className="sheet" style={{width:"100%",background:T.surface,borderRadius:"18px 18px 0 0",padding:"20px 18px calc(28px + env(safe-area-inset-bottom))",boxShadow:"0 -8px 40px rgba(0,0,0,0.3)"}}>
              <div style={{width:34,height:3,background:T.border2,borderRadius:99,margin:"0 auto 18px"}}/>
              <ModalContent modal={modal} T={T} setModal={setModal} user={user} guestId={guestId} addPost={addPost} addRoom={addRoom} signUp={signUp} signIn={signIn} onSignOut={()=>{setUser(null);setModal(null);}} ownedRooms={ownedRooms.length} maxRooms={MAX_PREMIUM_ROOMS}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// â”€â”€â”€ Modal Router â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ModalContent({modal,T,setModal,user,guestId,addPost,addRoom,signUp,signIn,onSignOut,ownedRooms,maxRooms}) {
  if(modal==="confess")  return <ConfessModal  T={T} onSubmit={addPost} onClose={()=>setModal(null)} user={user} guestId={guestId}/>;
  if(modal==="signup")   return <SignUpModal   T={T} onSubmit={signUp}  onClose={()=>setModal(null)} setModal={setModal}/>;
  if(modal==="signin")   return <SignInModal   T={T} onSubmit={signIn}  onClose={()=>setModal(null)} setModal={setModal}/>;
  if(modal==="account")  return <AccountModal  T={T} user={user}        onClose={()=>setModal(null)} onSignOut={onSignOut}/>;
  if(modal==="newroom")  return <NewRoomModal  T={T} onSubmit={addRoom} onClose={()=>setModal(null)} user={user} ownedRooms={ownedRooms} maxRooms={maxRooms}/>;
  return null;
}

function EncryptedText({text,plain,T,style}) {
  const [display,setDisplay] = useState(plain || text || "");
  useEffect(()=>{
    if (plain) { setDisplay(plain); return; }
    if (text?.startsWith("e2e:")) decryptText(text).then(setDisplay);
    else setDisplay(text || "");
  },[text,plain]);
  return <span className="sensitive-content" style={style}>{display}</span>;
}

function ActionBtn({T,onClick,children,title,danger}) {
  return (
    <button onClick={onClick} title={title} className="ib" style={{display:"flex",alignItems:"center",gap:4,background:"none",border:"none",color:danger?T.red:T.sub,fontSize:"0.77rem",padding:0}}>
      {children}
    </button>
  );
}

// â”€â”€â”€ Feed View â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FeedView({T,posts,toggleHeart,setModal,user,guestId,me,onDelete,onShare}) {
  const [cat,setCat] = useState("All");
  const filtered = cat==="All"?posts:posts.filter(p=>p.cat===cat);
  return (
    <div style={{width:"100%",minWidth:0}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:8}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45rem",fontWeight:600,color:T.text,flexShrink:0}}>Confessions</h2>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:"0.68rem",color:T.sub,display:"flex",alignItems:"center",gap:4}}><I.encrypt/> E2E encrypted</span>
          <button className="desktop-only" onClick={()=>setModal("confess")} style={{display:"flex",alignItems:"center",gap:5,background:T.accent,border:"none",borderRadius:8,padding:"6px 14px",fontSize:"0.78rem",fontWeight:600,color:T.accentText,flexShrink:0,whiteSpace:"nowrap"}}>
            <I.plus/> Confess
          </button>
        </div>
      </div>

      {/* Compose prompt */}
      <div onClick={()=>setModal("confess")} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10,cursor:"pointer",transition:"border-color 0.15s"}} className="rr">
        <div style={{width:28,height:28,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,fontSize:"0.62rem",fontWeight:700,flexShrink:0}}>{(user?.name||guestId).slice(0,2).toUpperCase()}</div>
        <span style={{color:T.muted,fontSize:"0.85rem",flex:1}}>Share something anonymously...</span>
        <div style={{color:T.sub}}><I.plus/></div>
      </div>

      {/* Category filter */}
      <div style={{display:"flex",gap:5,overflowX:"auto",scrollbarWidth:"none",marginBottom:14,paddingBottom:2}}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>setCat(c)} className="pb" style={{background:cat===c?T.accent:T.pill,color:cat===c?T.accentText:T.sub,border:`1px solid ${cat===c?"transparent":T.pillBorder}`,borderRadius:99,padding:"5px 14px",fontSize:"0.73rem",fontWeight:cat===c?600:400,whiteSpace:"nowrap",flexShrink:0}}>
            {c}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map((p,i)=>(
          <div key={p.id} className="card" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px",animationDelay:`${i*0.04}s`,minWidth:0,overflow:"hidden"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:7,minWidth:0,flex:1,overflow:"hidden"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,fontSize:"0.58rem",fontWeight:700,flexShrink:0}}>{p.author.slice(0,2).toUpperCase()}</div>
                <span style={{fontSize:"0.74rem",fontWeight:500,color:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.author}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0,marginLeft:8}}>
                <span style={{fontSize:"0.65rem",background:T.tag,color:T.tagText,padding:"2px 7px",borderRadius:4,border:`1px solid ${T.border}`,whiteSpace:"nowrap"}}>{p.cat}</span>
                <span style={{fontSize:"0.65rem",color:T.muted,whiteSpace:"nowrap"}}>{ago(p.ts)}</span>
              </div>
            </div>
            <p style={{fontSize:"0.9rem",lineHeight:1.68,color:T.text,marginBottom:11,textAlign:"left",wordBreak:"break-word"}}>
              <EncryptedText text={p.text} plain={p.plain} T={T}/>
            </p>
            <div style={{display:"flex",gap:14,alignItems:"center",paddingTop:9,borderTop:`1px solid ${T.border}`,flexWrap:"wrap"}}>
              <button onClick={()=>toggleHeart(p.id)} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",color:p.liked?T.red:T.sub,fontSize:"0.77rem",fontWeight:500,padding:0,transition:"color 0.15s"}}>
                <I.heart filled={p.liked}/> {p.hearts}
              </button>
              <button style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",color:T.sub,fontSize:"0.77rem",padding:0}}>
                <I.comment/> {p.comments}
              </button>
              <ActionBtn T={T} title="Share confession" onClick={()=>onShare(p.id, p.plain || p.text?.slice(0,40))}><I.share/> Share</ActionBtn>
              {(p.owner===me)&&(
                <ActionBtn T={T} title="Delete confession" danger onClick={()=>{ if(window.confirm("Delete this confession permanently?")) onDelete(p.id); }}><I.trash/> Delete</ActionBtn>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Rooms View â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function RoomsView({T,rooms,msgs,sendMsg,user,guestId,me,setModal,activeRoom,setActiveRoom,onDeleteRoom,onShareRoom,ownedCount,maxRooms}) {
  const [msg,setMsg] = useState("");
  const bottomRef    = useRef(null);
  const canCreateRoom = !!user?.subscribed && ownedCount < maxRooms;
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,activeRoom]);

  if(activeRoom) {
    const roomMsgs = msgs[activeRoom.id]||[];
    const isAdmin = activeRoom.owner === me;
    return (
      <div style={{display:"flex",flexDirection:"column",height:"calc(100dvh - 88px)"}}>
        <style>{`@media(max-width:767px){.mobile-nav{display:none !important;}.main-pad{padding-bottom:14px !important;}}`}</style>
        <div style={{display:"flex",alignItems:"center",gap:10,paddingBottom:12,marginBottom:12,borderBottom:`1px solid ${T.border}`,flexShrink:0}}>
          <button onClick={()=>setActiveRoom(null)} className="ib" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,flexShrink:0}}>
            <I.back/>
          </button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontWeight:600,fontSize:"0.92rem",color:T.text}}>{activeRoom.name}</span>
              {activeRoom.type==="private"&&<span style={{color:T.sub}}><I.lock/></span>}
              {activeRoom.active&&<span style={{fontSize:"0.62rem",background:"rgba(34,197,94,0.12)",color:T.online,padding:"1px 6px",borderRadius:4,fontWeight:600}}>Live</span>}
              <span style={{fontSize:"0.62rem",color:T.sub,display:"flex",alignItems:"center",gap:3}}><I.encrypt/> E2E</span>
            </div>
            <div style={{fontSize:"0.7rem",color:T.sub,marginTop:1}}>{activeRoom.members.toLocaleString()} members</div>
          </div>
          <div style={{display:"flex",gap:6,flexShrink:0}}>
            <button onClick={()=>onShareRoom(activeRoom.id, activeRoom.name)} className="ib" title="Share room" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub}}><I.share/></button>
            {isAdmin&&(
              <button onClick={()=>{ if(window.confirm("Delete this room permanently? All messages will be lost.")) { onDeleteRoom(activeRoom.id); setActiveRoom(null); }}} className="ib" title="Delete room (admin)" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:T.red}}><I.trash/></button>
            )}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:10}}>
          {roomMsgs.map(m=>{
            const isMe=m.from===me;
            return (
              <div key={m.id} style={{display:"flex",gap:7,alignItems:"flex-start",flexDirection:isMe?"row-reverse":"row"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,fontSize:"0.58rem",fontWeight:700,flexShrink:0}}>{m.from.slice(0,2).toUpperCase()}</div>
                <div style={{maxWidth:"70%"}}>
                  {!isMe&&<div style={{fontSize:"0.65rem",fontWeight:600,color:T.sub,marginBottom:3}}>{m.from}</div>}
                  <div className="sensitive-content" style={{background:isMe?T.accent:T.surface2,color:isMe?T.accentText:T.text,padding:"8px 12px",borderRadius:isMe?"10px 10px 2px 10px":"10px 10px 10px 2px",fontSize:"0.86rem",lineHeight:1.55,border:`1px solid ${T.border}`}}>
                    <EncryptedText text={m.text} plain={m.plain} T={T}/>
                  </div>
                  <div style={{fontSize:"0.6rem",color:T.muted,marginTop:3,textAlign:isMe?"right":"left"}}>{ago(m.ts)}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef}/>
        </div>
        <div style={{display:"flex",gap:8,marginTop:12,paddingTop:12,borderTop:`1px solid ${T.border}`,flexShrink:0}}>
          <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&msg.trim()){sendMsg(activeRoom.id,msg.trim());setMsg("");}}} placeholder={`Message ${activeRoom.name}...`} style={{flex:1,background:T.input,border:`1px solid ${T.border}`,borderRadius:99,padding:"9px 16px",fontSize:"0.85rem",color:T.text}}/>
          <button onClick={()=>{if(msg.trim()){sendMsg(activeRoom.id,msg.trim());setMsg("");}}} style={{width:38,height:38,background:T.accent,border:"none",borderRadius:10,color:T.accentText,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <I.send/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45rem",fontWeight:600,color:T.text}}>Rooms</h2>
        <button onClick={()=>canCreateRoom&&setModal("newroom")} disabled={!canCreateRoom}
          title={!user?.subscribed?"Upgrade to create rooms":ownedCount>=maxRooms?`Premium limit: ${maxRooms} room per account`:"Create a room"}
          style={{display:"flex",alignItems:"center",gap:5,background:canCreateRoom?T.accent:T.surface2,border:canCreateRoom?"none":`1px solid ${T.border}`,borderRadius:8,padding:"6px 14px",fontSize:"0.78rem",fontWeight:600,color:canCreateRoom?T.accentText:T.sub,opacity:canCreateRoom?1:0.72,cursor:canCreateRoom?"pointer":"not-allowed"}}>
          {!user?.subscribed?"Premium Only":ownedCount>=maxRooms?"Room Limit Reached":"Create Room"}
        </button>
      </div>
      {user?.subscribed&&ownedCount>=maxRooms&&(
        <div style={{fontSize:"0.72rem",color:T.sub,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,padding:"8px 12px",marginBottom:12}}>
          Premium accounts can create {maxRooms} room. Delete your existing room to create a new one, or manage it in My Space.
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {rooms.map(r=>(
          <div key={r.id} className="card rr" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"13px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
            <div onClick={()=>setActiveRoom(r)} style={{display:"flex",alignItems:"center",gap:12,flex:1,minWidth:0}}>
              <div style={{width:36,height:36,borderRadius:10,background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,flexShrink:0}}>
                <I.hash/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                  <span style={{fontWeight:600,fontSize:"0.88rem",color:T.text}}>{r.name}</span>
                  {r.type==="private"&&<span style={{color:T.sub}}><I.lock/></span>}
                  {r.active&&<span style={{fontSize:"0.6rem",background:"rgba(34,197,94,0.1)",color:T.online,padding:"1px 6px",borderRadius:4,fontWeight:600}}>Live</span>}
                  {r.owner===me&&<span style={{fontSize:"0.6rem",background:T.tag,color:T.tagText,padding:"1px 6px",borderRadius:4}}>Admin</span>}
                </div>
                <div style={{fontSize:"0.75rem",color:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.desc}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <span style={{fontSize:"0.72rem",color:T.sub}}>{r.members.toLocaleString()}</span>
                <div style={{color:T.muted}}><I.chevR/></div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0}} onClick={e=>e.stopPropagation()}>
              <button onClick={()=>onShareRoom(r.id,r.name)} className="ib" title="Share room" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:6,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub}}><I.share/></button>
              {r.owner===me&&(
                <button onClick={()=>{ if(window.confirm(`Delete "${r.name}" permanently?`)) onDeleteRoom(r.id); }} className="ib" title="Delete room" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:6,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",color:T.red}}><I.trash/></button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── My Space View (Posts + Rooms) ───────────────────────────────────────────
function MySpaceView({T,posts,rooms,me,setTab,setActiveRoom,onDeletePost,onDeleteRoom,onSharePost,onShareRoom,setModal,user,maxRooms}) {
  const [section,setSection] = useState("posts");
  const canCreateRoom = !!user?.subscribed && rooms.length < maxRooms;

  return (
    <div style={{width:"100%",minWidth:0}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,gap:8}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45rem",fontWeight:600,color:T.text}}>My Space</h2>
        <span style={{fontSize:"0.68rem",color:T.sub}}>{me.split("_")[0]}</span>
      </div>

      <div style={{display:"flex",gap:6,marginBottom:16,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,padding:4}}>
        {[{id:"posts",label:"My Posts",count:posts.length},{id:"rooms",label:"My Rooms",count:rooms.length}].map(s=>(
          <button key={s.id} onClick={()=>setSection(s.id)} style={{flex:1,background:section===s.id?T.accent:"transparent",border:"none",borderRadius:7,padding:"9px 0",fontSize:"0.78rem",fontWeight:section===s.id?600:400,color:section===s.id?T.accentText:T.sub,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
            {s.label}
            <span style={{fontSize:"0.65rem",opacity:0.8,background:section===s.id?"rgba(0,0,0,0.15)":T.pill,padding:"1px 7px",borderRadius:99}}>{s.count}</span>
          </button>
        ))}
      </div>

      {section==="posts" && (
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <p style={{fontSize:"0.78rem",color:T.sub}}>Confessions you've posted</p>
            <button onClick={()=>setModal("confess")} style={{display:"flex",alignItems:"center",gap:4,background:T.accent,border:"none",borderRadius:7,padding:"5px 12px",fontSize:"0.72rem",fontWeight:600,color:T.accentText}}><I.plus/> New</button>
          </div>
          {posts.length===0 ? (
            <div style={{textAlign:"center",padding:"40px 20px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:10}}>
              <p style={{fontSize:"0.85rem",color:T.sub,marginBottom:12}}>No confessions yet</p>
              <button onClick={()=>setModal("confess")} style={{background:T.accent,border:"none",borderRadius:8,padding:"8px 18px",fontSize:"0.8rem",fontWeight:600,color:T.accentText}}>Share your first confession</button>
            </div>
          ) : posts.map(p=>(
            <div key={p.id} className="card" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px",marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8,gap:8}}>
                <span style={{fontSize:"0.65rem",background:T.tag,color:T.tagText,padding:"2px 7px",borderRadius:4,border:`1px solid ${T.border}`}}>{p.cat}</span>
                <span style={{fontSize:"0.65rem",color:T.muted}}>{ago(p.ts)}</span>
              </div>
              <p style={{fontSize:"0.88rem",lineHeight:1.6,color:T.text,marginBottom:10,wordBreak:"break-word"}}>
                <EncryptedText text={p.text} plain={p.plain} T={T}/>
              </p>
              <div style={{display:"flex",gap:12,alignItems:"center",paddingTop:9,borderTop:`1px solid ${T.border}`}}>
                <span style={{fontSize:"0.72rem",color:T.sub}}><I.heart filled={false}/> {p.hearts}</span>
                <ActionBtn T={T} title="Share" onClick={()=>onSharePost(p.id)}><I.share/> Share</ActionBtn>
                <ActionBtn T={T} title="Delete" danger onClick={()=>{ if(window.confirm("Delete this confession?")) onDeletePost(p.id); }}><I.trash/> Delete</ActionBtn>
              </div>
            </div>
          ))}
        </>
      )}

      {section==="rooms" && (
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <p style={{fontSize:"0.78rem",color:T.sub}}>
              Rooms you've created {user?.subscribed ? `(${rooms.length}/${maxRooms})` : ""}
            </p>
            {canCreateRoom && (
              <button onClick={()=>setModal("newroom")} style={{display:"flex",alignItems:"center",gap:4,background:T.accent,border:"none",borderRadius:7,padding:"5px 12px",fontSize:"0.72rem",fontWeight:600,color:T.accentText}}><I.plus/> Create</button>
            )}
          </div>
          {!user?.subscribed && (
            <div style={{fontSize:"0.78rem",color:T.sub,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 14px",marginBottom:12}}>
              Upgrade to Premium to create your own room (limit: {maxRooms} room per account).
            </div>
          )}
          {user?.subscribed && rooms.length>=maxRooms && (
            <div style={{fontSize:"0.78rem",color:T.sub,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 14px",marginBottom:12}}>
              You've reached the premium limit of {maxRooms} room. Delete your room to create a new one.
            </div>
          )}
          {rooms.length===0 ? (
            <div style={{textAlign:"center",padding:"40px 20px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:10}}>
              <p style={{fontSize:"0.85rem",color:T.sub,marginBottom:12}}>{user?.subscribed ? "No rooms created yet" : "Premium required to create rooms"}</p>
              {canCreateRoom && (
                <button onClick={()=>setModal("newroom")} style={{background:T.accent,border:"none",borderRadius:8,padding:"8px 18px",fontSize:"0.8rem",fontWeight:600,color:T.accentText}}>Create your room</button>
              )}
            </div>
          ) : rooms.map(r=>(
            <div key={r.id} className="card" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
              <div onClick={()=>{ setActiveRoom(r); setTab("rooms"); }} style={{display:"flex",alignItems:"center",gap:12,flex:1,minWidth:0,cursor:"pointer"}}>
                <div style={{width:36,height:36,borderRadius:10,background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,flexShrink:0}}><I.hash/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:"0.88rem",color:T.text,display:"flex",alignItems:"center",gap:6}}>
                    {r.name}
                    <span style={{fontSize:"0.6rem",background:"rgba(214,166,32,0.15)",color:"#d6a620",padding:"1px 6px",borderRadius:4}}>Admin</span>
                  </div>
                  <div style={{fontSize:"0.75rem",color:T.sub,marginTop:2}}>{r.desc} · {r.members} members</div>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0}}>
                <button onClick={()=>onShareRoom(r.id,r.name)} className="ib" title="Share room" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:6,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub}}><I.share/></button>
                <button onClick={()=>{ if(window.confirm(`Delete "${r.name}"?`)) onDeleteRoom(r.id); }} className="ib" title="Delete room" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:6,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",color:T.red}}><I.trash/></button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// â”€â”€â”€ Account View â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AccountView({T,user,guestId,setModal,onUpgrade}) {
  const isPremium = !!user?.subscribed;
  return (
    <div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45rem",fontWeight:600,color:T.text,marginBottom:16}}>Account</h2>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:18,marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:50,height:50,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,fontSize:"0.95rem",fontWeight:700,flexShrink:0}}>{(user?.name||guestId).slice(0,2).toUpperCase()}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:600,fontSize:"0.93rem",color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}>
            <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.name||guestId}</span>{isPremium&&<I.goldCheck/>}
          </div>
          <div style={{fontSize:"0.72rem",color:T.sub,marginTop:3,display:"flex",alignItems:"center",gap:5}}><I.shield/> {user?(isPremium?"Premium Member - Anonymous":"Member - Anonymous"):"Guest - Anonymous"}</div>
        </div>
        {user&&<button onClick={()=>setModal("account")} style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,flexShrink:0}}><I.settings/></button>}
      </div>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
        {[{label:"Privacy mode",val:"Anonymous by default"},{label:"End-to-end encryption",val:"AES-256-GCM active"},{label:"Screen privacy",val:"Capture deterrents active"},{label:"Network",val:"Global - Decentralised"}].map((row,i)=>(
          <div key={row.label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",borderBottom:i<3?`1px solid ${T.border}`:"none"}}>
            <span style={{fontSize:"0.82rem",color:T.sub}}>{row.label}</span>
            <span style={{fontSize:"0.8rem",fontWeight:500,color:T.text}}>{row.val}</span>
          </div>
        ))}
      </div>
      {!user&&(
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <button onClick={()=>setModal("signup")} style={{flex:1,background:T.accent,border:"none",borderRadius:9,padding:"11px 0",fontSize:"0.86rem",fontWeight:600,color:T.accentText}}>Create Virtual Account</button>
          <button onClick={()=>setModal("signin")} style={{flex:1,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:9,padding:"11px 0",fontSize:"0.86rem",fontWeight:500,color:T.text}}>Sign In</button>
        </div>
      )}
      <div style={{background:T.surface,border:`1px solid ${isPremium?"#d6a620":T.border}`,borderRadius:12,padding:16,boxShadow:isPremium?"0 0 0 1px rgba(214,166,32,0.18)":"none"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:9}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:7,fontSize:"0.94rem",fontWeight:700,color:T.text}}>Upgrade <I.goldCheck/></div>
            <div style={{fontSize:"0.72rem",color:T.sub,marginTop:3}}>SecretSpace Premium</div>
          </div>
          <div style={{fontSize:"1rem",fontWeight:800,color:"#d6a620"}}>49/month</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6,margin:"10px 0 14px"}}>
          {["Golden tickmark on your account name","Create 1 premium room (admin controls)","Confessions get priority and up to 2x views"].map(x=>(
            <div key={x} style={{fontSize:"0.76rem",color:T.sub,display:"flex",alignItems:"center",gap:7}}><span style={{color:"#d6a620",fontWeight:900}}>•</span>{x}</div>
          ))}
        </div>
        <button onClick={user?onUpgrade:()=>setModal("signup")} disabled={isPremium} style={{width:"100%",background:isPremium?T.surface2:"#d6a620",border:isPremium?`1px solid ${T.border}`:"none",borderRadius:9,padding:"10px 0",fontSize:"0.84rem",fontWeight:700,color:isPremium?T.sub:"#1b1200",cursor:isPremium?"default":"pointer"}}>
          {isPremium?"Premium Active":"Upgrade"}
        </button>
      </div>
    </div>
  );
}
function FriendsView({T}) {
  const [friends,setFriends] = useState(SEED_FRIENDS);
  const [search,setSearch]   = useState("");
  const [addVal,setAddVal]   = useState("");
  const [activeFriend,setActiveFriend] = useState(null);
  const [draft,setDraft] = useState("");
  const [friendMsgs,setFriendMsgs] = useState(()=>Object.fromEntries(SEED_FRIENDS.map(f=>[f.id,[{id:uid(),from:f.name,text:"Hey, you can message me here now.",ts:Date.now()-300000}]])));
  const filtered = friends.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()));

  function addFriend() {
    if(!addVal.trim()) return;
    const friend={id:Date.now(),name:addVal.trim(),status:"offline",mutual:0,req:false};
    setFriends(f=>[...f,friend]);
    setFriendMsgs(m=>({...m,[friend.id]:[]}));
    setAddVal("");
  }

  function sendFriendMsg() {
    if(!activeFriend||!draft.trim()) return;
    setFriendMsgs(m=>({...m,[activeFriend.id]:[...(m[activeFriend.id]||[]),{id:uid(),from:"me",text:draft.trim(),ts:Date.now()}]}));
    setDraft("");
  }

  const statusColor = s => s==="online"?T.online:s==="away"?T.away:T.muted;

  if(activeFriend) {
    const msgs = friendMsgs[activeFriend.id]||[];
    return (
      <div style={{display:"flex",flexDirection:"column",height:"calc(100dvh - 88px)"}}>
        <style>{`@media(max-width:767px){.mobile-nav{display:none !important;}.main-pad{padding-bottom:14px !important;}}`}</style>
        <div style={{display:"flex",alignItems:"center",gap:10,paddingBottom:12,marginBottom:12,borderBottom:`1px solid ${T.border}`,flexShrink:0}}>
          <button onClick={()=>setActiveFriend(null)} className="ib" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,flexShrink:0}}><I.back/></button>
          <div style={{position:"relative",flexShrink:0}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.62rem",fontWeight:700,color:T.sub}}>{activeFriend.name.slice(0,2).toUpperCase()}</div>
            <div style={{position:"absolute",bottom:0,right:0,width:9,height:9,borderRadius:"50%",border:`2px solid ${T.surface}`,background:statusColor(activeFriend.status)}}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:600,fontSize:"0.92rem",color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{activeFriend.name}</div>
            <div style={{fontSize:"0.7rem",color:T.sub,marginTop:1}}>Private message - {activeFriend.status}</div>
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:10}}>
          {msgs.map(m=>{
            const isMe=m.from==="me";
            return (
              <div key={m.id} style={{display:"flex",justifyContent:isMe?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"76%",background:isMe?T.accent:T.surface2,color:isMe?T.accentText:T.text,padding:"8px 12px",borderRadius:isMe?"10px 10px 2px 10px":"10px 10px 10px 2px",fontSize:"0.86rem",lineHeight:1.55,border:`1px solid ${T.border}`}}>{m.text}</div>
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",gap:8,marginTop:12,paddingTop:12,borderTop:`1px solid ${T.border}`,flexShrink:0}}>
          <input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendFriendMsg();}} placeholder={`Message ${activeFriend.name}...`} style={{flex:1,background:T.input,border:`1px solid ${T.border}`,borderRadius:99,padding:"9px 16px",fontSize:"0.85rem",color:T.text}}/>
          <button onClick={sendFriendMsg} style={{width:38,height:38,background:T.accent,border:"none",borderRadius:10,color:T.accentText,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><I.send/></button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45rem",fontWeight:600,color:T.text}}>Friends</h2>
        <span style={{fontSize:"0.75rem",color:T.sub}}>{friends.filter(f=>f.status==="online").length} online</span>
      </div>

      {friends.filter(f=>f.req).length>0&&(
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
          <div style={{fontSize:"0.68rem",color:T.sub,letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:600,marginBottom:8}}>Requests</div>
          {friends.filter(f=>f.req).map(f=>(
            <div key={f.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.6rem",fontWeight:700,color:T.sub,flexShrink:0}}>{f.name.slice(0,2).toUpperCase()}</div>
              <span style={{fontSize:"0.82rem",color:T.text,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name}</span>
              <div style={{display:"flex",gap:5,flexShrink:0}}>
                <button onClick={()=>setFriends(p=>p.map(x=>x.id===f.id?{...x,req:false,status:"online"}:x))} style={{background:T.accent,border:"none",borderRadius:6,padding:"4px 10px",fontSize:"0.72rem",fontWeight:600,color:T.accentText}}>Accept</button>
                <button onClick={()=>setFriends(p=>p.filter(x=>x.id!==f.id))} style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:6,padding:"4px 10px",fontSize:"0.72rem",color:T.sub}}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{display:"flex",gap:7,marginBottom:10}}>
        <div style={{flex:1,position:"relative",display:"flex",alignItems:"center"}}>
          <div style={{position:"absolute",left:11,color:T.sub,pointerEvents:"none",display:"flex"}}><I.search/></div>
          <input value={addVal} onChange={e=>setAddVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addFriend()} placeholder="Add by Virtual ID..." style={{width:"100%",background:T.input,border:`1px solid ${T.border}`,borderRadius:99,padding:"8px 14px 8px 34px",fontSize:"0.82rem",color:T.text}}/>
        </div>
        <button onClick={addFriend} style={{background:T.accent,border:"none",borderRadius:10,width:46,height:36,display:"flex",alignItems:"center",justifyContent:"center",color:T.accentText,flexShrink:0,fontSize:"0.72rem",fontWeight:700}}>Add</button>
      </div>

      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search friends..." style={{width:"100%",background:T.input,border:`1px solid ${T.border}`,borderRadius:99,padding:"8px 16px",fontSize:"0.82rem",color:T.text,marginBottom:10,boxSizing:"border-box"}}/>

      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {filtered.map(f=>(
          <div key={f.id} className="fr" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,transition:"background 0.15s"}}>
            <div style={{position:"relative",flexShrink:0}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.62rem",fontWeight:700,color:T.sub}}>{f.name.slice(0,2).toUpperCase()}</div>
              <div style={{position:"absolute",bottom:0,right:0,width:9,height:9,borderRadius:"50%",border:`2px solid ${T.surface}`,background:statusColor(f.status)}}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:500,fontSize:"0.84rem",color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name}</div>
              <div style={{fontSize:"0.68rem",color:T.sub,marginTop:1}}>{f.mutual} mutual - {f.status}</div>
            </div>
            <button onClick={()=>setActiveFriend(f)} style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,padding:"5px 12px",fontSize:"0.7rem",fontWeight:500,color:T.text,flexShrink:0}}>Message</button>
          </div>
        ))}
        {filtered.length===0&&<p style={{textAlign:"center",color:T.muted,fontSize:"0.8rem",padding:"24px 0"}}>No friends found</p>}
      </div>
    </div>
  );
}
// â”€â”€â”€ Right Panels â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function RightStats({T,posts,rooms}) {
  return (
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px"}}>
      <div style={{fontSize:"0.62rem",letterSpacing:"0.12em",textTransform:"uppercase",color:T.sub,fontWeight:600,marginBottom:10}}>Network</div>
      {[{label:"Confessions",val:posts.length+1204},{label:"Active Rooms",val:rooms.filter(r=>r.active).length},{label:"Online Now",val:"2,841"}].map((s,i)=>(
        <div key={s.label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 0",borderBottom:i<2?`1px solid ${T.border}`:"none"}}>
          <span style={{fontSize:"0.76rem",color:T.sub}}>{s.label}</span>
          <span style={{fontSize:"0.82rem",fontWeight:600,color:T.text}}>{typeof s.val==="number"?s.val.toLocaleString():s.val}</span>
        </div>
      ))}
    </div>
  );
}

function TrendingPanel({T,posts,toggleHeart}) {
  const top=[...posts].sort((a,b)=>b.hearts-a.hearts).slice(0,3);
  return (
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
        <I.trending/>
        <span style={{fontSize:"0.62rem",letterSpacing:"0.12em",textTransform:"uppercase",color:T.sub,fontWeight:600}}>Trending</span>
      </div>
      {top.map((p,i)=>(
        <div key={p.id} style={{paddingBottom:10,marginBottom:10,borderBottom:i<2?`1px solid ${T.border}`:"none"}}>
          <p style={{fontSize:"0.78rem",color:T.text,lineHeight:1.55,margin:"0 0 6px",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}><EncryptedText text={p.text} plain={p.plain} T={T}/></p>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>toggleHeart(p.id)} style={{display:"flex",alignItems:"center",gap:4,background:"none",border:"none",color:p.liked?T.red:T.sub,fontSize:"0.7rem",padding:0,cursor:"pointer"}}>
              <I.heart filled={p.liked}/> {p.hearts}
            </button>
            <span style={{fontSize:"0.65rem",color:T.muted}}>{ago(p.ts)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// â”€â”€â”€ Modals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MH({T,title,onClose}) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.15rem",fontWeight:600,color:T.text}}>{title}</h3>
      <button onClick={onClose} className="ib" style={{background:"none",border:"none",color:T.sub,display:"flex",padding:3}}><I.close/></button>
    </div>
  );
}

function PBtn({T,label,onClick,disabled}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{width:"100%",background:T.accent,border:"none",borderRadius:8,padding:"11px 0",fontSize:"0.86rem",fontWeight:600,color:T.accentText,opacity:disabled?0.38:1,cursor:disabled?"not-allowed":"pointer",transition:"opacity 0.15s"}}>
      {label}
    </button>
  );
}

function inp(T) { return {background:T.input,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 13px",fontSize:"0.86rem",color:T.text,outline:"none",width:"100%",boxSizing:"border-box"}; }

function ConfessModal({T,onSubmit,onClose,user,guestId}) {
  const [text,setText]=useState(""); const [cat,setCat]=useState("Life");
  return <>
    <MH T={T} title="New Confession" onClose={onClose}/>
    <div style={{fontSize:"0.72rem",color:T.sub,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,padding:"7px 11px",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
      <I.shield/> Posting as <b style={{color:T.text,marginLeft:2}}>{user?.name||guestId}</b> · <I.encrypt/> Encrypted before posting
    </div>
    <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="What's on your mind? No one knows it's you." rows={4} style={{...inp(T),resize:"none",lineHeight:1.6,marginBottom:10}}/>
    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
      {CATS.filter(c=>c!=="All").map(c=>(
        <button key={c} onClick={()=>setCat(c)} className="pb" style={{background:cat===c?T.accent:T.pill,color:cat===c?T.accentText:T.sub,border:`1px solid ${cat===c?"transparent":T.pillBorder}`,borderRadius:99,padding:"4px 13px",fontSize:"0.72rem",fontWeight:cat===c?600:400}}>{c}</button>
      ))}
    </div>
    <PBtn T={T} label="Post Anonymously" onClick={()=>text.trim()&&onSubmit(text.trim(),cat)} disabled={!text.trim()}/>
  </>;
}

function NewRoomModal({T,onSubmit,onClose,ownedRooms,maxRooms}) {
  const [name,setName]=useState(""); const [desc,setDesc]=useState(""); const [type,setType]=useState("public");
  const atLimit = ownedRooms >= maxRooms;
  return <>
    <MH T={T} title="Create a Room" onClose={onClose}/>
    {atLimit ? (
      <div style={{fontSize:"0.82rem",color:T.sub,lineHeight:1.6,marginBottom:14}}>
        You already have {ownedRooms} room (premium limit: {maxRooms}). Delete your existing room in My Space to create a new one.
      </div>
    ) : (
    <>
    <div style={{fontSize:"0.72rem",color:T.sub,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,padding:"7px 11px",marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
      <I.encrypt/> Room messages are end-to-end encrypted
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:14}}>
      <div>
        <label style={{fontSize:"0.68rem",color:T.sub,display:"block",marginBottom:5,letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600}}>Room Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Late Night Vibes" style={inp(T)}/>
      </div>
      <div>
        <label style={{fontSize:"0.68rem",color:T.sub,display:"block",marginBottom:5,letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600}}>Description</label>
        <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="What's this room about?" style={inp(T)}/>
      </div>
      <div>
        <label style={{fontSize:"0.68rem",color:T.sub,display:"block",marginBottom:7,letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600}}>Privacy</label>
        <div style={{display:"flex",gap:6}}>
          {["public","private"].map(t=>(
            <button key={t} onClick={()=>setType(t)} style={{flex:1,background:type===t?T.accent:T.surface2,border:`1px solid ${type===t?"transparent":T.border}`,borderRadius:8,padding:"9px 0",fontSize:"0.8rem",fontWeight:type===t?600:400,color:type===t?T.accentText:T.sub,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
              {t==="private"?<I.lock/>:<I.globe/>} {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
    <PBtn T={T} label="Create Room" onClick={()=>name.trim()&&onSubmit({id:uid(),name:name.trim(),desc:desc.trim()||"A new room",members:1,type,active:true})} disabled={!name.trim()}/>
    </>)}
  </>;
}

function SignUpModal({T,onSubmit,onClose,setModal}) {
  const [name,setName]=useState(""); const [pass,setPass]=useState(""); const [show,setShow]=useState(false);
  const suggested=useState(genId)[0];
  return <>
    <MH T={T} title="Create Account" onClose={onClose}/>
    <div style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 13px",marginBottom:12}}>
      <div style={{fontSize:"0.6rem",color:T.muted,marginBottom:2,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600}}>Your Virtual ID</div>
      <div style={{fontWeight:600,fontSize:"0.86rem",color:T.text}}>{suggested}</div>
      <div style={{fontSize:"0.68rem",color:T.sub,marginTop:2}}>Auto-generated Â· Anonymous Â· No real name needed</div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder={`Username (default: ${suggested.split("_")[0]})`} style={inp(T)}/>
      <div style={{position:"relative"}}>
        <input value={pass} onChange={e=>setPass(e.target.value)} type={show?"text":"password"} placeholder="Password" style={{...inp(T),paddingRight:40}}/>
        <button onClick={()=>setShow(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:T.sub,display:"flex",padding:2}}>{show?<I.eyeOff/>:<I.eye/>}</button>
      </div>
    </div>
    <PBtn T={T} label="Create Virtual Account" onClick={()=>(name.trim()||suggested)&&pass&&onSubmit(name.trim()||suggested)} disabled={!pass}/>
    <p style={{textAlign:"center",fontSize:"0.68rem",color:T.muted,marginTop:8}}>No email required Â· Fully anonymous</p>
    <p style={{textAlign:"center",fontSize:"0.76rem",color:T.sub,marginTop:6}}>Already have an account? <button onClick={()=>setModal("signin")} style={{background:"none",border:"none",color:T.text,fontWeight:600,cursor:"pointer",textDecoration:"underline",fontSize:"inherit"}}>Sign in</button></p>
  </>;
}

function SignInModal({T,onSubmit,onClose,setModal}) {
  const [name,setName]=useState(""); const [pass,setPass]=useState("");
  return <>
    <MH T={T} title="Sign In" onClose={onClose}/>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your username or Virtual ID" style={inp(T)}/>
      <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" style={inp(T)}/>
    </div>
    <PBtn T={T} label="Sign In" onClick={()=>name.trim()&&onSubmit(name.trim())} disabled={!name.trim()}/>
    <p style={{textAlign:"center",fontSize:"0.76rem",color:T.sub,marginTop:10}}>No account? <button onClick={()=>setModal("signup")} style={{background:"none",border:"none",color:T.text,fontWeight:600,cursor:"pointer",textDecoration:"underline",fontSize:"inherit"}}>Create one free</button></p>
  </>;
}

function AccountModal({T,user,onClose,onSignOut}) {
  return <>
    <MH T={T} title="My Account" onClose={onClose}/>
    <div style={{display:"flex",alignItems:"center",gap:12,padding:14,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,marginBottom:14}}>
      <div style={{width:42,height:42,borderRadius:"50%",background:T.surface,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.82rem",fontWeight:700,color:T.sub,flexShrink:0}}>{user?.name.slice(0,2).toUpperCase()}</div>
      <div>
        <div style={{fontWeight:600,fontSize:"0.88rem",color:T.text}}>{user?.name}</div>
        <div style={{fontSize:"0.7rem",color:T.sub,marginTop:2,display:"flex",alignItems:"center",gap:4}}><I.shield/> Virtual Account Â· Anonymous</div>
      </div>
    </div>
    <button onClick={onSignOut} style={{width:"100%",background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 0",fontSize:"0.86rem",fontWeight:500,color:T.red,cursor:"pointer"}}>Sign Out</button>
  </>;
}



