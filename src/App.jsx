import { useState, useRef, useEffect } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────
const I = {
  // New logo: overlapping S lettermark with orbit ring
  logo: () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="1" y="1" width="26" height="26" rx="8" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M9 10.5C9 8.567 10.567 7 12.5 7H15C17.209 7 19 8.791 19 11C19 13.209 17.209 15 15 15H13C10.791 15 9 16.791 9 19C9 21.209 10.791 23 13 23H15.5C17.433 23 19 21.433 19 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  feed:      (s) => <svg width="18" height="18" viewBox="0 0 24 24" fill={s?"currentColor":"none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fillOpacity={s?0.15:0}/></svg>,
  rooms:     (s) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1.5" fill={s?"currentColor":"none"} fillOpacity={s?0.2:0}/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill={s?"currentColor":"none"} fillOpacity={s?0.2:0}/></svg>,
  account:   (s) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill={s?"currentColor":"none"} fillOpacity={s?0.15:0}/><circle cx="12" cy="7" r="4"/></svg>,
  friends:   (s) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill={s?"currentColor":"none"} fillOpacity={s?0.15:0}/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
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
  settings:  () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  search:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  back:      () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
  menu:      () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

// ─── Helpers ──────────────────────────────────────────────────────────────
const ADJS  = ["Cosmic","Stellar","Nebula","Velvet","Shadow","Lunar","Mystic","Astral","Nova","Cipher","Photon","Quasar"];
const NOUNS = ["Wanderer","Phantom","Observer","Pilgrim","Nomad","Specter","Drifter","Watcher","Echo","Signal","Voyager","Pulse"];
const uid   = () => Math.random().toString(36).slice(2,9);
const genId = () => `${ADJS[Math.floor(Math.random()*ADJS.length)]}_${NOUNS[Math.floor(Math.random()*NOUNS.length)]}_${Math.floor(1000+Math.random()*9000)}`;
const ago   = ts => { const s=Math.floor((Date.now()-ts)/1000); if(s<60)return`${s}s`; if(s<3600)return`${Math.floor(s/60)}m`; if(s<86400)return`${Math.floor(s/3600)}h`; return`${Math.floor(s/86400)}d`; };

const CATS = ["All","Life","Work","Hobby","Film","Love","Other"];

// ─── Seed Data ────────────────────────────────────────────────────────────
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

// ─── Themes ───────────────────────────────────────────────────────────────
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

// ─── Global CSS ───────────────────────────────────────────────────────────
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
    @keyframes fadeUp{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
    .card{animation:fadeUp 0.22s ease forwards;opacity:0;}
    @keyframes mIn{from{opacity:0;transform:scale(0.98) translateY(4px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .min{animation:mIn 0.22s cubic-bezier(0.34,1.2,0.64,1) forwards;}
    @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
    .sd{animation:slideDown 0.2s ease forwards;}

    /* ── Mobile bottom sheet ── */
    @keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
    .sheet{animation:sheetUp 0.28s cubic-bezier(0.34,1.1,0.64,1) forwards;}

    /* ── Responsive layout ── */
    .desktop-only{display:none !important;}
    .mobile-only{display:flex !important;}
    .mobile-nav{display:flex !important;}
    .desktop-sidebar{display:none !important;}
    .desktop-right{display:none !important;}
    .desktop-search{display:none !important;}
    .mobile-search-btn{display:flex !important;}
    .main-pad{padding:12px 14px 90px !important;}
    .header-h{height:52px !important;}
    .desktop-main-margins{margin-left:0 !important;margin-right:0 !important;}

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
      .desktop-main-margins{margin-left:220px !important;margin-right:240px !important;}
      body{overflow:auto;}
    }

    @media(max-width:767px){
      body{overflow:auto;}
    }
  `;
}

// ─── App ──────────────────────────────────────────────────────────────────
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
  const T = dark ? DARK : LIGHT;

  const toggleHeart = id => setPosts(p=>p.map(c=>c.id===id?{...c,hearts:c.hearts+(c.liked?-1:1),liked:!c.liked}:c));
  const addPost     = (text,cat)=>{ setPosts(p=>[{id:uid(),author:user?.name||guestId,text,cat,hearts:0,liked:false,ts:Date.now(),comments:0},...p]); setModal(null); };
  const addRoom     = (r)=>{ setRooms(p=>[r,...p]); setMsgs(m=>({...m,[r.id]:[]})); setModal(null); };
  const sendMsg     = (roomId,text)=>setMsgs(p=>({...p,[roomId]:[...(p[roomId]||[]),{id:uid(),from:user?.name||guestId,text,ts:Date.now()}]}));
  const signUp      = (name)=>{ setUser({name,id:genId(),joined:Date.now()}); setModal(null); };
  const signIn      = (name)=>{ setUser({name,id:genId(),joined:Date.now()}); setModal(null); };

  const NAV_ITEMS = [
    {id:"feed",    label:"Confessions", Icon:I.feed   },
    {id:"rooms",   label:"Rooms",       Icon:I.rooms  },
    {id:"friends", label:"Friends",     Icon:I.friends},
    {id:"account", label:"Account",     Icon:I.account},
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",width:"100%",background:T.bg,color:T.text,fontFamily:"'Sora',sans-serif"}}>
      <style>{globalCss(T,dark)}</style>

      {/* ── Header ── */}
      <header className="header-h" style={{position:"sticky",top:0,zIndex:50,borderBottom:`1px solid ${T.border}`,background:T.bg,backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",display:"flex",alignItems:"center",padding:"0 16px",gap:12,flexShrink:0}}>

        {/* Desktop: wordmark only (no S logo), left side */}
        <div className="desktop-only" style={{display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <div>
            <div style={{fontFamily:"'Sora',sans-serif",fontSize:"0.92rem",fontWeight:700,letterSpacing:"-0.02em",color:T.text,lineHeight:1}}>secretspace</div>
            <div style={{fontSize:"0.48rem",letterSpacing:"0.18em",textTransform:"uppercase",color:T.sub,marginTop:2}}>anonymous network</div>
          </div>
        </div>

        {/* Desktop search — centered absolutely so it's always in the middle */}
        <div className="desktop-search" style={{position:"absolute",left:"50%",transform:"translateX(-50%)",width:380,display:"flex",alignItems:"center"}}>
          <div style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:T.sub,display:"flex",pointerEvents:"none"}}>
            <I.search/>
          </div>
          <input
            value={searchVal} onChange={e=>setSearchVal(e.target.value)}
            placeholder="Search anything..."
            style={{width:"100%",background:T.surface2,border:`1.5px solid ${T.border2}`,borderRadius:99,padding:"7px 14px 7px 36px",fontSize:"0.8rem",color:T.text,transition:"border-color 0.15s"}}
          />
          {searchVal && (
            <button onClick={()=>setSearchVal("")} className="ib" style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:T.sub,display:"flex",padding:2}}>
              <I.close/>
            </button>
          )}
        </div>

        {/* Mobile: centered wordmark only */}
        <div className="mobile-only" style={{position:"absolute",left:0,right:0,display:"flex",justifyContent:"center",alignItems:"center",pointerEvents:"none"}}>
          <div style={{fontFamily:"'Sora',sans-serif",fontSize:"0.95rem",fontWeight:700,letterSpacing:"-0.02em",color:T.text,lineHeight:1}}>secretspace</div>
        </div>

        {/* Mobile search icon */}
        <button className="mobile-search-btn ib" onClick={()=>setMobileSearch(s=>!s)} style={{background:"none",border:"none",color:T.sub,display:"none",marginLeft:"auto",padding:4}}>
          <I.search/>
        </button>

        {/* Desktop right controls */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginLeft:"auto"}} className="desktop-only">
          <button onClick={()=>setDark(d=>!d)} className="ib" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",color:T.text}}>
            {dark?<I.sun/>:<I.moon/>}
          </button>
          {user ? (
            <button onClick={()=>setModal("account")} style={{display:"flex",alignItems:"center",gap:7,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,padding:"0 12px",height:32,fontSize:"0.78rem",fontWeight:500,color:T.text}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:T.online,flexShrink:0}}/>
              {user.name.split("_")[0]}
            </button>
          ) : (
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setModal("signin")} style={{background:T.accent,border:"none",borderRadius:8,padding:"0 14px",height:32,fontSize:"0.78rem",fontWeight:600,color:T.accentText}}>Sign in</button>
              <button onClick={()=>setModal("signup")} style={{background:T.accent,border:"none",borderRadius:8,padding:"0 14px",height:32,fontSize:"0.78rem",fontWeight:600,color:T.accentText}}>Join free</button>
            </div>
          )}
        </div>

        {/* Mobile: theme toggle — always visible in both modes */}
        <div className="mobile-only" style={{alignItems:"center",gap:6,flexShrink:0,marginLeft:"auto"}}>
          <button onClick={()=>setDark(d=>!d)} className="ib" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:T.text}}>
            {dark?<I.sun/>:<I.moon/>}
          </button>
        </div>
      </header>

      {/* Mobile search bar expandable */}
      {mobileSearch && (
        <div className="sd mobile-only" style={{background:T.nav,borderBottom:`1px solid ${T.navBorder}`,padding:"8px 14px",alignItems:"center",gap:8}}>
          <div style={{flex:1,position:"relative",display:"flex",alignItems:"center"}}>
            <div style={{position:"absolute",left:11,color:T.sub,display:"flex",pointerEvents:"none"}}><I.search/></div>
            <input autoFocus value={searchVal} onChange={e=>setSearchVal(e.target.value)} placeholder="Search anything..." style={{width:"100%",background:T.surface2,border:`1.5px solid ${T.border2}`,borderRadius:99,padding:"8px 14px 8px 34px",fontSize:"0.83rem",color:T.text}}/>
          </div>
          <button onClick={()=>{setMobileSearch(false);setSearchVal("");}} style={{background:"none",border:"none",color:T.sub,fontSize:"0.78rem",fontWeight:500,flexShrink:0}}>Cancel</button>
        </div>
      )}

      {/* ── Body ── */}
      <div style={{display:"flex",flex:1,position:"relative"}}>

        {/* Desktop Left Sidebar — fixed, always visible */}
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

          <div style={{marginTop:"auto",padding:"10px 8px",borderTop:`1px solid ${T.border}`}}>
            <button onClick={()=>setModal("confess")} style={{width:"100%",background:T.accent,border:"none",borderRadius:8,padding:"9px 0",fontSize:"0.8rem",fontWeight:600,color:T.accentText,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <I.plus/> New Confession
            </button>
          </div>
        </aside>

        {/* Center — offset by sidebar widths so it doesn't go under fixed panels */}
        <main className="desktop-main-margins" style={{flex:1,display:"flex",WebkitOverflowScrolling:"touch"}}>
          <div className="main-pad" style={{flex:1,width:"100%",boxSizing:"border-box"}}>
            {tab==="feed"    && <FeedView    T={T} posts={posts} toggleHeart={toggleHeart} setModal={setModal} user={user} guestId={guestId}/>}
            {tab==="rooms"   && <RoomsView   T={T} rooms={rooms} msgs={msgs} sendMsg={sendMsg} user={user} guestId={guestId} setModal={setModal} activeRoom={activeRoom} setActiveRoom={setActiveRoom}/>}
            {tab==="account" && <AccountView T={T} user={user} guestId={guestId} setModal={setModal}/>}
            {tab==="friends" && <FriendsView T={T}/>}
          </div>
        </main>

        {/* Desktop Right Panel — fixed, always visible */}
        <aside className="desktop-right" style={{width:240,borderLeft:`1px solid ${T.border}`,padding:"20px 14px",flexDirection:"column",gap:16,flexShrink:0,overflowY:"auto",height:"calc(100vh - 56px)",position:"fixed",top:56,right:0,zIndex:40,background:T.sidebar}}>
          <RightStats T={T} posts={posts} rooms={rooms}/>
          <TrendingPanel T={T} posts={posts} toggleHeart={toggleHeart}/>
        </aside>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="mobile-nav" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,background:T.nav,backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",borderTop:`1px solid ${T.navBorder}`,justifyContent:"space-around",padding:"6px 0 calc(6px + env(safe-area-inset-bottom))",flexShrink:0}}>
        {NAV_ITEMS.map(({id,label,Icon})=>(
          <button key={id} onClick={()=>setTab(id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"none",border:"none",color:tab===id?T.text:T.sub,padding:"4px 12px",borderRadius:8,minWidth:60}}>
            <Icon active={tab===id}/>
            <span style={{fontSize:"0.6rem",fontWeight:tab===id?600:400,letterSpacing:"0.01em"}}>{label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile FAB */}
      <button className="mobile-only" onClick={()=>setModal("confess")} style={{position:"fixed",bottom:70,right:16,zIndex:49,background:T.accent,border:"none",borderRadius:14,width:46,height:46,display:"none",alignItems:"center",justifyContent:"center",color:T.accentText,boxShadow:`0 4px 20px rgba(0,0,0,${dark?0.5:0.18})`}}>
        <I.plus/>
      </button>

      {/* ── Modals ── */}
      {modal && (
        <>
          {/* Desktop: centered modal */}
          <div className="desktop-only" onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",zIndex:100,alignItems:"center",justifyContent:"center",padding:16}}>
            <div onClick={e=>e.stopPropagation()} className="min" style={{background:T.surface,border:`1px solid ${T.border2}`,borderRadius:14,width:"100%",maxWidth:420,padding:"24px",boxShadow:`0 20px 60px rgba(0,0,0,0.35)`}}>
              <ModalContent modal={modal} T={T} setModal={setModal} user={user} guestId={guestId} addPost={addPost} addRoom={addRoom} signUp={signUp} signIn={signIn} onSignOut={()=>{setUser(null);setModal(null);}}/>
            </div>
          </div>
          {/* Mobile: bottom sheet */}
          <div className="mobile-only" onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:100,alignItems:"flex-end",justifyContent:"center"}}>
            <div onClick={e=>e.stopPropagation()} className="sheet" style={{width:"100%",background:T.surface,borderRadius:"18px 18px 0 0",padding:"20px 18px calc(28px + env(safe-area-inset-bottom))",boxShadow:"0 -8px 40px rgba(0,0,0,0.3)"}}>
              <div style={{width:34,height:3,background:T.border2,borderRadius:99,margin:"0 auto 18px"}}/>
              <ModalContent modal={modal} T={T} setModal={setModal} user={user} guestId={guestId} addPost={addPost} addRoom={addRoom} signUp={signUp} signIn={signIn} onSignOut={()=>{setUser(null);setModal(null);}}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Modal Router ─────────────────────────────────────────────────────────
function ModalContent({modal,T,setModal,user,guestId,addPost,addRoom,signUp,signIn,onSignOut}) {
  if(modal==="confess")  return <ConfessModal  T={T} onSubmit={addPost} onClose={()=>setModal(null)} user={user} guestId={guestId}/>;
  if(modal==="signup")   return <SignUpModal   T={T} onSubmit={signUp}  onClose={()=>setModal(null)} setModal={setModal}/>;
  if(modal==="signin")   return <SignInModal   T={T} onSubmit={signIn}  onClose={()=>setModal(null)} setModal={setModal}/>;
  if(modal==="account")  return <AccountModal  T={T} user={user}        onClose={()=>setModal(null)} onSignOut={onSignOut}/>;
  if(modal==="newroom")  return <NewRoomModal  T={T} onSubmit={addRoom} onClose={()=>setModal(null)} user={user} guestId={guestId}/>;
  return null;
}

// ─── Feed View ────────────────────────────────────────────────────────────
function FeedView({T,posts,toggleHeart,setModal,user,guestId}) {
  const [cat,setCat] = useState("All");
  const filtered = cat==="All"?posts:posts.filter(p=>p.cat===cat);
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45rem",fontWeight:600,color:T.text}}>Confessions</h2>
        <button onClick={()=>setModal("confess")} style={{display:"flex",alignItems:"center",gap:5,background:T.accent,border:"none",borderRadius:8,padding:"6px 14px",fontSize:"0.78rem",fontWeight:600,color:T.accentText}}>
          <I.plus/> Confess
        </button>
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
          <div key={p.id} className="card" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px",animationDelay:`${i*0.04}s`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,fontSize:"0.58rem",fontWeight:700,flexShrink:0}}>{p.author.slice(0,2).toUpperCase()}</div>
                <span style={{fontSize:"0.74rem",fontWeight:500,color:T.sub}}>{p.author}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:"0.65rem",background:T.tag,color:T.tagText,padding:"2px 7px",borderRadius:4,border:`1px solid ${T.border}`}}>{p.cat}</span>
                <span style={{fontSize:"0.65rem",color:T.muted}}>{ago(p.ts)}</span>
              </div>
            </div>
            <p style={{fontSize:"0.9rem",lineHeight:1.68,color:T.text,marginBottom:11}}>{p.text}</p>
            <div style={{display:"flex",gap:14,alignItems:"center",paddingTop:9,borderTop:`1px solid ${T.border}`}}>
              <button onClick={()=>toggleHeart(p.id)} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",color:p.liked?T.red:T.sub,fontSize:"0.77rem",fontWeight:500,padding:0,transition:"color 0.15s"}}>
                <I.heart filled={p.liked}/> {p.hearts}
              </button>
              <button style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",color:T.sub,fontSize:"0.77rem",padding:0}}>
                <I.comment/> {p.comments}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Rooms View ───────────────────────────────────────────────────────────
function RoomsView({T,rooms,msgs,sendMsg,user,guestId,setModal,activeRoom,setActiveRoom}) {
  const [msg,setMsg] = useState("");
  const bottomRef    = useRef(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,activeRoom]);

  if(activeRoom) {
    const roomMsgs = msgs[activeRoom.id]||[];
    const me = user?.name||guestId;
    return (
      <div style={{display:"flex",flexDirection:"column",height:"calc(100dvh - 120px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,paddingBottom:12,marginBottom:12,borderBottom:`1px solid ${T.border}`,flexShrink:0}}>
          <button onClick={()=>setActiveRoom(null)} className="ib" style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,flexShrink:0}}>
            <I.back/>
          </button>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontWeight:600,fontSize:"0.92rem",color:T.text}}>{activeRoom.name}</span>
              {activeRoom.type==="private"&&<span style={{color:T.sub}}><I.lock/></span>}
              {activeRoom.active&&<span style={{fontSize:"0.62rem",background:"rgba(34,197,94,0.12)",color:T.online,padding:"1px 6px",borderRadius:4,fontWeight:600}}>Live</span>}
            </div>
            <div style={{fontSize:"0.7rem",color:T.sub,marginTop:1}}>{activeRoom.members.toLocaleString()} members</div>
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
                  <div style={{background:isMe?T.accent:T.surface2,color:isMe?T.accentText:T.text,padding:"8px 12px",borderRadius:isMe?"10px 10px 2px 10px":"10px 10px 10px 2px",fontSize:"0.86rem",lineHeight:1.55,border:`1px solid ${T.border}`}}>{m.text}</div>
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
        <button onClick={()=>setModal("newroom")} style={{display:"flex",alignItems:"center",gap:5,background:T.accent,border:"none",borderRadius:8,padding:"6px 14px",fontSize:"0.78rem",fontWeight:600,color:T.accentText}}>
          <I.plus/> Create Room
        </button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {rooms.map(r=>(
          <div key={r.id} onClick={()=>setActiveRoom(r)} className="card rr" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"13px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,flexShrink:0}}>
              <I.hash/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                <span style={{fontWeight:600,fontSize:"0.88rem",color:T.text}}>{r.name}</span>
                {r.type==="private"&&<span style={{color:T.sub}}><I.lock/></span>}
                {r.active&&<span style={{fontSize:"0.6rem",background:"rgba(34,197,94,0.1)",color:T.online,padding:"1px 6px",borderRadius:4,fontWeight:600}}>Live</span>}
              </div>
              <div style={{fontSize:"0.75rem",color:T.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.desc}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
              <span style={{fontSize:"0.72rem",color:T.sub}}>{r.members.toLocaleString()}</span>
              <div style={{color:T.muted}}><I.chevR/></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Account View ─────────────────────────────────────────────────────────
function AccountView({T,user,guestId,setModal}) {
  return (
    <div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45rem",fontWeight:600,color:T.text,marginBottom:16}}>Account</h2>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:18,marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:50,height:50,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,fontSize:"0.95rem",fontWeight:700,flexShrink:0}}>{(user?.name||guestId).slice(0,2).toUpperCase()}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:600,fontSize:"0.93rem",color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.name||guestId}</div>
          <div style={{fontSize:"0.72rem",color:T.sub,marginTop:3,display:"flex",alignItems:"center",gap:5}}><I.shield/> {user?"Member · Anonymous":"Guest · Anonymous"}</div>
        </div>
        {user&&<button onClick={()=>setModal("account")} style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",color:T.sub,flexShrink:0}}><I.settings/></button>}
      </div>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",marginBottom:12}}>
        {[{label:"Privacy mode",val:"Anonymous by default"},{label:"Data stored",val:"Nothing identifiable"},{label:"Network",val:"Global · Decentralised"}].map((row,i)=>(
          <div key={row.label} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 14px",borderBottom:i<2?`1px solid ${T.border}`:"none"}}>
            <span style={{fontSize:"0.82rem",color:T.sub}}>{row.label}</span>
            <span style={{fontSize:"0.8rem",fontWeight:500,color:T.text}}>{row.val}</span>
          </div>
        ))}
      </div>
      {!user&&(
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setModal("signup")} style={{flex:1,background:T.accent,border:"none",borderRadius:9,padding:"11px 0",fontSize:"0.86rem",fontWeight:600,color:T.accentText}}>Create Virtual Account</button>
          <button onClick={()=>setModal("signin")} style={{flex:1,background:T.surface2,border:`1px solid ${T.border}`,borderRadius:9,padding:"11px 0",fontSize:"0.86rem",fontWeight:500,color:T.text}}>Sign In</button>
        </div>
      )}
    </div>
  );
}

// ─── Friends View ─────────────────────────────────────────────────────────
function FriendsView({T}) {
  const [friends,setFriends] = useState(SEED_FRIENDS);
  const [search,setSearch]   = useState("");
  const [addVal,setAddVal]   = useState("");
  const filtered = friends.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()));

  function addFriend() {
    if(!addVal.trim()) return;
    setFriends(f=>[...f,{id:Date.now(),name:addVal.trim(),status:"offline",mutual:0,req:false}]);
    setAddVal("");
  }

  const statusColor = s => s==="online"?T.online:s==="away"?T.away:T.muted;

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.45rem",fontWeight:600,color:T.text}}>Friends</h2>
        <span style={{fontSize:"0.75rem",color:T.sub}}>{friends.filter(f=>f.status==="online").length} online</span>
      </div>

      {/* Friend requests */}
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

      {/* Add friend */}
      <div style={{display:"flex",gap:7,marginBottom:10}}>
        <div style={{flex:1,position:"relative",display:"flex",alignItems:"center"}}>
          <div style={{position:"absolute",left:11,color:T.sub,pointerEvents:"none",display:"flex"}}><I.search/></div>
          <input value={addVal} onChange={e=>setAddVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addFriend()} placeholder="Add by Virtual ID..." style={{width:"100%",background:T.input,border:`1px solid ${T.border}`,borderRadius:99,padding:"8px 14px 8px 34px",fontSize:"0.82rem",color:T.text}}/>
        </div>
        <button onClick={addFriend} style={{background:T.accent,border:"none",borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",color:T.accentText,flexShrink:0}}>
          <I.plus/>
        </button>
      </div>

      {/* Search existing */}
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search friends..." style={{width:"100%",background:T.input,border:`1px solid ${T.border}`,borderRadius:99,padding:"8px 16px",fontSize:"0.82rem",color:T.text,marginBottom:10,boxSizing:"border-box"}}/>

      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {filtered.map(f=>(
          <div key={f.id} className="fr" style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,cursor:"pointer",transition:"background 0.15s"}}>
            <div style={{position:"relative",flexShrink:0}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:T.surface2,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.62rem",fontWeight:700,color:T.sub}}>{f.name.slice(0,2).toUpperCase()}</div>
              <div style={{position:"absolute",bottom:0,right:0,width:9,height:9,borderRadius:"50%",border:`2px solid ${T.surface}`,background:statusColor(f.status)}}/>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:500,fontSize:"0.84rem",color:T.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name}</div>
              <div style={{fontSize:"0.68rem",color:T.sub,marginTop:1}}>{f.mutual} mutual · {f.status}</div>
            </div>
            <button style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:7,padding:"5px 12px",fontSize:"0.7rem",fontWeight:500,color:T.sub,flexShrink:0}}>Message</button>
          </div>
        ))}
        {filtered.length===0&&<p style={{textAlign:"center",color:T.muted,fontSize:"0.8rem",padding:"24px 0"}}>No friends found</p>}
      </div>
    </div>
  );
}

// ─── Right Panels ─────────────────────────────────────────────────────────
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
          <p style={{fontSize:"0.78rem",color:T.text,lineHeight:1.55,margin:"0 0 6px",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{p.text}</p>
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

// ─── Modals ───────────────────────────────────────────────────────────────
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
      <I.shield/> Posting as <b style={{color:T.text,marginLeft:2}}>{user?.name||guestId}</b>
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

function NewRoomModal({T,onSubmit,onClose}) {
  const [name,setName]=useState(""); const [desc,setDesc]=useState(""); const [type,setType]=useState("public");
  return <>
    <MH T={T} title="Create a Room" onClose={onClose}/>
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
      <div style={{fontSize:"0.68rem",color:T.sub,marginTop:2}}>Auto-generated · Anonymous · No real name needed</div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder={`Username (default: ${suggested.split("_")[0]})`} style={inp(T)}/>
      <div style={{position:"relative"}}>
        <input value={pass} onChange={e=>setPass(e.target.value)} type={show?"text":"password"} placeholder="Password" style={{...inp(T),paddingRight:40}}/>
        <button onClick={()=>setShow(s=>!s)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:T.sub,display:"flex",padding:2}}>{show?<I.eyeOff/>:<I.eye/>}</button>
      </div>
    </div>
    <PBtn T={T} label="Create Virtual Account" onClick={()=>(name.trim()||suggested)&&pass&&onSubmit(name.trim()||suggested)} disabled={!pass}/>
    <p style={{textAlign:"center",fontSize:"0.68rem",color:T.muted,marginTop:8}}>No email required · Fully anonymous</p>
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
        <div style={{fontSize:"0.7rem",color:T.sub,marginTop:2,display:"flex",alignItems:"center",gap:4}}><I.shield/> Virtual Account · Anonymous</div>
      </div>
    </div>
    <button onClick={onSignOut} style={{width:"100%",background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 0",fontSize:"0.86rem",fontWeight:500,color:T.red,cursor:"pointer"}}>Sign Out</button>
  </>;
}
