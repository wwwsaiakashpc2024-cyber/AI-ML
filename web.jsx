import { useState, useEffect } from "react";

const MODULES = [
  {
    id: 1, icon: "🧠", title: "What is AI & ML?", duration: "2h", level: "Beginner",
    color: "#00f5d4",
    topics: ["Definition of AI vs ML vs DL", "History of AI", "Real-world applications", "Types of ML: Supervised, Unsupervised, Reinforcement"],
    videos: [
      { title: "AI vs ML vs Deep Learning — Clearly Explained", channel: "Simplilearn", ytId: "k2P_pHQDlp0", duration: "8:11" },
      { title: "Machine Learning in 100 Seconds", channel: "Fireship", ytId: "PeMlggyqz0Y", duration: "2:43" },
      { title: "What is Artificial Intelligence? In 5 minutes", channel: "Simplilearn", ytId: "2ePf9rue1Ao", duration: "5:14" },
    ]
  },
  {
    id: 2, icon: "📐", title: "Math Foundations", duration: "6h", level: "Beginner",
    color: "#fee440",
    topics: ["Linear Algebra: vectors, matrices", "Statistics & Probability", "Calculus basics (derivatives)", "Gradient Descent intuition"],
    videos: [
      { title: "Linear Algebra for Machine Learning — Full Course", channel: "freeCodeCamp", ytId: "LlKAna21fLE", duration: "9:49:55" },
      { title: "Statistics for Machine Learning", channel: "StatQuest", ytId: "qBigTkjLEAY", duration: "15:42" },
      { title: "Gradient Descent, Step-by-Step", channel: "StatQuest", ytId: "sDv4f4s2SB8", duration: "9:27" },
    ]
  },
  {
    id: 3, icon: "🐍", title: "Python for ML", duration: "5h", level: "Beginner",
    color: "#f15bb5",
    topics: ["Python basics", "NumPy & Pandas", "Matplotlib for visualization", "Scikit-learn intro"],
    videos: [
      { title: "Python for Beginners – Full Course", channel: "freeCodeCamp", ytId: "rfscVS0vtbw", duration: "4:26:51" },
      { title: "NumPy Tutorial for Beginners", channel: "Keith Galli", ytId: "QUT1VHiLmmI", duration: "58:41" },
      { title: "Pandas & Python for Data Analysis", channel: "Keith Galli", ytId: "vmEHCJofslg", duration: "1:00:27" },
    ]
  },
  {
    id: 4, icon: "📊", title: "Data Preprocessing", duration: "4h", level: "Beginner",
    color: "#9b5de5",
    topics: ["Handling missing values", "Feature scaling & normalization", "Encoding categorical data", "Train/Test split"],
    videos: [
      { title: "Data Preprocessing in Machine Learning", channel: "Krish Naik", ytId: "pYVScuY-GPk", duration: "34:12" },
      { title: "Feature Engineering Full Tutorial", channel: "Kaggle", ytId: "RtqtM1UJfZc", duration: "45:00" },
      { title: "Scikit-learn Preprocessing Pipeline", channel: "Corey Schafer", ytId: "0B5eIE_1vpU", duration: "22:10" },
    ]
  },
  {
    id: 5, icon: "📈", title: "Supervised Learning", duration: "8h", level: "Intermediate",
    color: "#00bbf9",
    topics: ["Linear & Logistic Regression", "Decision Trees", "Random Forests", "SVM (Support Vector Machines)"],
    videos: [
      { title: "Supervised Learning Crash Course", channel: "Google Developers", ytId: "VieEr0mSgLY", duration: "3:51" },
      { title: "Linear Regression — Clearly Explained", channel: "StatQuest", ytId: "nk2CQITm_eo", duration: "27:26" },
      { title: "Random Forests for Complete Beginners", channel: "Victor Lavrenko", ytId: "J4Wdy0Wc_xQ", duration: "10:51" },
    ]
  },
  {
    id: 6, icon: "🔍", title: "Unsupervised Learning", duration: "5h", level: "Intermediate",
    color: "#00f5d4",
    topics: ["K-Means Clustering", "DBSCAN", "PCA (Dimensionality Reduction)", "Anomaly Detection"],
    videos: [
      { title: "K-Means Clustering — Clearly Explained", channel: "StatQuest", ytId: "4b5d3muPQmA", duration: "9:02" },
      { title: "Principal Component Analysis (PCA)", channel: "StatQuest", ytId: "FgakZw6K1QQ", duration: "21:57" },
      { title: "Unsupervised Learning Full Course", channel: "Simplilearn", ytId: "D6gtZrsYi6c", duration: "1:24:00" },
    ]
  },
  {
    id: 7, icon: "🤖", title: "Neural Networks", duration: "8h", level: "Intermediate",
    color: "#fee440",
    topics: ["Perceptron & MLP", "Activation functions", "Backpropagation", "Intro to TensorFlow/Keras"],
    videos: [
      { title: "But what is a Neural Network? — 3Blue1Brown", channel: "3Blue1Brown", ytId: "aircAruvnKk", duration: "19:13" },
      { title: "Backpropagation Calculus — 3Blue1Brown", channel: "3Blue1Brown", ytId: "tIeHLnjs5U8", duration: "10:17" },
      { title: "TensorFlow 2.0 Full Tutorial", channel: "freeCodeCamp", ytId: "tPYj3fFJGjk", duration: "2:47:55" },
    ]
  },
  {
    id: 8, icon: "🖼️", title: "Deep Learning & CNNs", duration: "7h", level: "Advanced",
    color: "#f15bb5",
    topics: ["Convolutional layers", "Pooling & Dropout", "Transfer Learning", "Image classification project"],
    videos: [
      { title: "Convolutional Neural Networks Explained", channel: "Computerphile", ytId: "py5byOOHZM8", duration: "9:55" },
      { title: "Deep Learning Full Course 2024", channel: "Simplilearn", ytId: "ErnWZxJovaM", duration: "9:27:54" },
      { title: "Transfer Learning with Keras", channel: "Nicholas Renotte", ytId: "LsdxvjLWkIY", duration: "46:39" },
    ]
  },
  {
    id: 9, icon: "💬", title: "NLP Basics", duration: "6h", level: "Advanced",
    color: "#9b5de5",
    topics: ["Tokenization & stemming", "Word embeddings (Word2Vec)", "Sentiment Analysis", "Intro to Transformers"],
    videos: [
      { title: "Natural Language Processing In 10 Minutes", channel: "Simplilearn", ytId: "CMrHM8a3hqw", duration: "10:07" },
      { title: "Word Embeddings — Explained Simply", channel: "StatQuest", ytId: "viZrOnJclY0", duration: "16:31" },
      { title: "Illustrated Guide to Transformers", channel: "The A.I. Hacker", ytId: "4Bdc55j80l8", duration: "15:00" },
    ]
  },
  {
    id: 10, icon: "🚀", title: "Model Deployment", duration: "4h", level: "Advanced",
    color: "#00bbf9",
    topics: ["Model evaluation & tuning", "Flask/FastAPI for ML", "Docker basics", "Deploy to cloud (Heroku/HF)"],
    videos: [
      { title: "Deploy ML Model with Flask", channel: "Krish Naik", ytId: "UbCWoMf80PY", duration: "31:18" },
      { title: "FastAPI Tutorial for ML APIs", channel: "Patrick Loeber", ytId: "0RS9W8MtZe4", duration: "38:49" },
      { title: "Hugging Face Spaces Deployment Guide", channel: "Nicholas Renotte", ytId: "RiXne9YHnhI", duration: "25:12" },
    ]
  }
];

const TODAY = new Date();
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function getLast7Days() { return Array.from({ length: 7 }, (_, i) => { const d = new Date(TODAY); d.setDate(TODAY.getDate() - 6 + i); return d; }); }
function getLast28Days() { return Array.from({ length: 28 }, (_, i) => { const d = new Date(TODAY); d.setDate(TODAY.getDate() - 27 + i); return d; }); }
function dateKey(d) { return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; }
const LEVELS = { Beginner: "#00f5d4", Intermediate: "#fee440", Advanced: "#f15bb5" };
const totalVideos = MODULES.reduce((a, m) => a + m.videos.length, 0);
const totalCourseHours = MODULES.reduce((a, m) => a + parseInt(m.duration), 0);

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [completedModules, setCompletedModules] = useState(() => { try { return JSON.parse(localStorage.getItem("cm") || "[]"); } catch { return []; } });
  const [studyLog, setStudyLog] = useState(() => { try { return JSON.parse(localStorage.getItem("sl") || "{}"); } catch { return {}; } });
  const [watchedVideos, setWatchedVideos] = useState(() => { try { return JSON.parse(localStorage.getItem("wv") || "[]"); } catch { return []; } });
  const [activeModule, setActiveModule] = useState(null);
  const [modSubTab, setModSubTab] = useState({});
  const [playingVideo, setPlayingVideo] = useState(null);
  const [userName, setUserName] = useState(() => localStorage.getItem("un") || "");
  const [nameInput, setNameInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(!localStorage.getItem("un"));
  const [minutesInput, setMinutesInput] = useState(30);
  const [toast, setToast] = useState(null);
  const todayKey = dateKey(TODAY);

  useEffect(() => { try { localStorage.setItem("cm", JSON.stringify(completedModules)); } catch {} }, [completedModules]);
  useEffect(() => { try { localStorage.setItem("sl", JSON.stringify(studyLog)); } catch {} }, [studyLog]);
  useEffect(() => { try { localStorage.setItem("wv", JSON.stringify(watchedVideos)); } catch {} }, [watchedVideos]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };
  const handleWelcome = () => { if (!nameInput.trim()) return; setUserName(nameInput.trim()); localStorage.setItem("un", nameInput.trim()); setShowWelcome(false); };
  const toggleModule = (id) => { setCompletedModules(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); showToast(completedModules.includes(id) ? "Module unmarked" : "🎉 Module completed!"); };
  const toggleVideo = (vid) => { setWatchedVideos(prev => prev.includes(vid) ? prev.filter(x => x !== vid) : [...prev, vid]); };
  const logStudy = () => { const m = parseInt(minutesInput)||30; setStudyLog(prev => ({...prev,[todayKey]:(prev[todayKey]||0)+m})); showToast(`✅ Logged ${m} min!`); };

  const last7 = getLast7Days(), last28 = getLast28Days();
  const streak = (() => { let s=0; for(let i=0;i<60;i++){const d=new Date(TODAY);d.setDate(TODAY.getDate()-i);if(studyLog[dateKey(d)])s++;else break;} return s; })();
  const weekDays = last7.filter(d => studyLog[dateKey(d)]).length;
  const totalMins = Object.values(studyLog).reduce((a,b)=>a+b,0);
  const progress = Math.round((completedModules.length / MODULES.length) * 100);
  const videoProgress = Math.round((watchedVideos.length / totalVideos) * 100);

  if (showWelcome) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#050a14,#0a0f1e)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Courier New',monospace"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 20% 50%,rgba(0,245,212,0.06) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(155,93,229,0.06) 0%,transparent 50%)",pointerEvents:"none"}}/>
      <div style={{textAlign:"center",padding:"3rem 2rem",maxWidth:480,position:"relative"}}>
        <div style={{fontSize:70,marginBottom:"1rem",filter:"drop-shadow(0 0 30px #00f5d4aa)"}}>🤖</div>
        <h1 style={{color:"#00f5d4",fontSize:"2.2rem",fontWeight:900,letterSpacing:3,marginBottom:"0.4rem",textShadow:"0 0 40px #00f5d455"}}>AI/ML ACADEMY</h1>
        <p style={{color:"#4a6580",marginBottom:"0.5rem",fontSize:"0.78rem",letterSpacing:2}}>COMPLETE BEGINNER COURSE + VIDEO LECTURES</p>
        <p style={{color:"#7a8fa6",marginBottom:"2.5rem",fontSize:"0.85rem"}}>10 modules · {totalCourseHours}+ hours · {totalVideos} curated YouTube lectures</p>
        <input value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleWelcome()} placeholder="Enter your name to begin..."
          style={{width:"100%",background:"rgba(0,245,212,0.06)",border:"1.5px solid #00f5d455",borderRadius:12,padding:"0.9rem 1.2rem",color:"#fff",fontSize:"0.95rem",outline:"none",boxSizing:"border-box",marginBottom:"1rem",fontFamily:"'Courier New',monospace"}}/>
        <button onClick={handleWelcome} style={{background:"linear-gradient(135deg,#00f5d4,#00bbf9)",color:"#050a14",border:"none",borderRadius:12,padding:"0.9rem 2.8rem",fontWeight:900,fontSize:"1rem",cursor:"pointer",letterSpacing:2,fontFamily:"'Courier New',monospace",boxShadow:"0 8px 32px #00f5d433"}}>
          START LEARNING →
        </button>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#050a14",color:"#e0e8f0",fontFamily:"'Courier New',monospace"}}>
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#070d1a}::-webkit-scrollbar-thumb{background:#1a3050;border-radius:3px}.hvr:hover{opacity:0.85}`}</style>

      {/* Toast */}
      {toast && <div style={{position:"fixed",top:20,right:20,background:"#00f5d4",color:"#050a14",padding:"0.65rem 1.4rem",borderRadius:10,fontWeight:700,zIndex:9999,fontSize:"0.82rem",boxShadow:"0 4px 24px #00f5d455"}}>{toast}</div>}

      {/* Video Modal */}
      {playingVideo && (
        <div onClick={()=>setPlayingVideo(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.94)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:860,background:"#070d1a",borderRadius:16,overflow:"hidden",border:"1px solid #1a3050",boxShadow:"0 24px 80px #000a"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.85rem 1.2rem",borderBottom:"1px solid #0d1f35"}}>
              <div>
                <div style={{fontWeight:700,fontSize:"0.85rem",color:"#e0e8f0"}}>{playingVideo.title}</div>
                <div style={{color:"#3a5570",fontSize:"0.68rem",marginTop:2}}>📺 {playingVideo.channel} · ⏱ {playingVideo.duration}</div>
              </div>
              <button onClick={()=>setPlayingVideo(null)} style={{background:"#0d1f35",color:"#7a8fa6",border:"none",borderRadius:8,padding:"0.35rem 0.85rem",cursor:"pointer",fontSize:"0.82rem",fontFamily:"'Courier New',monospace"}}>✕ CLOSE</button>
            </div>
            <div style={{position:"relative",paddingBottom:"56.25%",height:0}}>
              <iframe src={`https://www.youtube.com/embed/${playingVideo.ytId}?autoplay=1`} title={playingVideo.title}
                style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
            </div>
            <div style={{padding:"0.85rem 1.2rem",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#3a5570",fontSize:"0.7rem"}}>Module {playingVideo.moduleId}: {MODULES.find(m=>m.id===playingVideo.moduleId)?.title}</span>
              <button onClick={()=>{toggleVideo(`${playingVideo.moduleId}-${playingVideo.ytId}`);setPlayingVideo(null);}}
                style={{background:watchedVideos.includes(`${playingVideo.moduleId}-${playingVideo.ytId}`)?"#0d1f35":"#00f5d4",color:watchedVideos.includes(`${playingVideo.moduleId}-${playingVideo.ytId}`)?"#7a8fa6":"#050a14",border:"none",borderRadius:8,padding:"0.38rem 1.1rem",fontWeight:700,cursor:"pointer",fontSize:"0.72rem",fontFamily:"'Courier New',monospace"}}>
                {watchedVideos.includes(`${playingVideo.moduleId}-${playingVideo.ytId}`)?"✓ MARKED WATCHED":"MARK AS WATCHED"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{borderBottom:"1px solid #0d1f35",padding:"0.9rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#070d1a",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:24,filter:"drop-shadow(0 0 8px #00f5d4)"}}>🤖</span>
          <div>
            <div style={{color:"#00f5d4",fontWeight:900,fontSize:"0.95rem",letterSpacing:3}}>AI/ML ACADEMY</div>
            <div style={{color:"#2a4060",fontSize:"0.58rem",letterSpacing:2}}>BEGINNER TRACK</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{display:"flex",gap:20,alignItems:"center"}}>
            <div style={{textAlign:"center"}}>
              <div style={{color:"#fee440",fontSize:"0.8rem",fontWeight:900}}>{streak}🔥</div>
              <div style={{color:"#2a4060",fontSize:"0.58rem"}}>streak</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{color:"#f15bb5",fontSize:"0.8rem",fontWeight:900}}>{watchedVideos.length}/{totalVideos}</div>
              <div style={{color:"#2a4060",fontSize:"0.58rem"}}>videos</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{color:"#00f5d4",fontSize:"0.8rem",fontWeight:900}}>{progress}%</div>
              <div style={{color:"#2a4060",fontSize:"0.58rem"}}>done</div>
            </div>
          </div>
          <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#00f5d4,#9b5de5)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#050a14",fontSize:"0.9rem"}}>
            {userName[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div style={{display:"flex",gap:0,padding:"0 2rem",borderBottom:"1px solid #0d1f35",background:"#070d1a"}}>
        {[["dashboard","📊 Dashboard"],["curriculum","📚 Curriculum"],["tracker","📅 Tracker"]].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{background:"transparent",color:tab===id?"#00f5d4":"#3a5570",border:"none",borderBottom:tab===id?"2px solid #00f5d4":"2px solid transparent",padding:"0.7rem 1.2rem",fontWeight:700,cursor:"pointer",fontSize:"0.75rem",letterSpacing:1,fontFamily:"'Courier New',monospace",transition:"color 0.2s"}}>
            {label}
          </button>
        ))}
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"1.8rem 1.5rem 80px"}}>

        {/* ══════════ DASHBOARD ══════════ */}
        {tab==="dashboard" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
              {[
                {label:"Course Progress",value:`${progress}%`,sub:`${completedModules.length}/${MODULES.length} modules`,accent:"#00f5d4"},
                {label:"Videos Watched",value:`${watchedVideos.length}/${totalVideos}`,sub:`${videoProgress}% complete`,accent:"#f15bb5"},
                {label:"Study Streak",value:`${streak}d 🔥`,sub:"consecutive days",accent:"#fee440"},
                {label:"Study Time",value:`${(totalMins/60).toFixed(1)}h`,sub:`of ${totalCourseHours}h course`,accent:"#9b5de5"},
              ].map((s,i)=>(
                <div key={i} style={{background:"#070d1a",border:`1px solid ${s.accent}22`,borderRadius:14,padding:"1.1rem",textAlign:"center"}}>
                  <div style={{color:s.accent,fontSize:"1.5rem",fontWeight:900}}>{s.value}</div>
                  <div style={{color:"#c0cfe0",fontSize:"0.7rem",fontWeight:700,marginTop:4}}>{s.label}</div>
                  <div style={{color:"#2a4060",fontSize:"0.62rem",marginTop:2}}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Dual progress bars */}
            <div style={{background:"#070d1a",border:"1px solid #0d1f35",borderRadius:14,padding:"1.3rem",marginBottom:18}}>
              {[{label:"MODULE COMPLETION",v:progress,c:"#00f5d4"},{label:"VIDEO LECTURES WATCHED",v:videoProgress,c:"#f15bb5"}].map((p,i)=>(
                <div key={i} style={{marginBottom:i===0?14:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{color:"#3a5570",fontSize:"0.68rem",letterSpacing:1}}>{p.label}</span>
                    <span style={{color:p.c,fontWeight:900,fontSize:"0.72rem"}}>{p.v}%</span>
                  </div>
                  <div style={{background:"#0d1f35",borderRadius:99,height:9,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${p.v}%`,background:`linear-gradient(90deg,${p.c}88,${p.c})`,borderRadius:99,transition:"width 0.7s ease"}}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Log Session */}
            <div style={{background:"#070d1a",border:`1px solid ${studyLog[todayKey]?"#00f5d433":"#fee44033"}`,borderRadius:14,padding:"1.2rem",marginBottom:18}}>
              <div style={{fontWeight:700,color:studyLog[todayKey]?"#00f5d4":"#fee440",marginBottom:10,fontSize:"0.75rem",letterSpacing:1}}>
                {studyLog[todayKey]?`✅ TODAY: ${studyLog[todayKey]} MIN LOGGED`:"⏰ LOG TODAY'S STUDY SESSION"}
              </div>
              <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{color:"#3a5570",fontSize:"0.72rem"}}>Minutes:</span>
                {[15,30,45,60,90,120].map(m=>(
                  <button key={m} onClick={()=>setMinutesInput(m)} style={{background:minutesInput===m?"#fee440":"#0d1f35",color:minutesInput===m?"#050a14":"#7a8fa6",border:"none",borderRadius:6,padding:"0.26rem 0.6rem",fontSize:"0.72rem",cursor:"pointer",fontWeight:700,fontFamily:"'Courier New',monospace"}}>{m}m</button>
                ))}
                <button onClick={logStudy} style={{background:"#00f5d4",color:"#050a14",border:"none",borderRadius:8,padding:"0.38rem 1.1rem",fontWeight:900,cursor:"pointer",fontSize:"0.72rem",fontFamily:"'Courier New',monospace",marginLeft:"auto"}}>LOG SESSION +</button>
              </div>
            </div>

            {/* Module Grid */}
            <div style={{background:"#070d1a",border:"1px solid #0d1f35",borderRadius:14,padding:"1.3rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <span style={{fontWeight:700,color:"#00f5d4",fontSize:"0.75rem",letterSpacing:1}}>ALL MODULES</span>
                <button onClick={()=>setTab("curriculum")} style={{background:"transparent",color:"#3a5570",border:"none",fontSize:"0.68rem",cursor:"pointer",fontFamily:"'Courier New',monospace"}}>FULL CURRICULUM →</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:9}}>
                {MODULES.map(m=>{
                  const done=completedModules.includes(m.id);
                  const vW=m.videos.filter(v=>watchedVideos.includes(`${m.id}-${v.ytId}`)).length;
                  return (
                    <div key={m.id} onClick={()=>{setTab("curriculum");setActiveModule(m.id);}} style={{background:done?`${m.color}10`:"#050a14",border:`1px solid ${done?m.color+"44":"#0d1f35"}`,borderRadius:11,padding:"0.75rem 0.5rem",cursor:"pointer",textAlign:"center",transition:"transform 0.15s"}}>
                      <div style={{fontSize:20,marginBottom:3}}>{m.icon}</div>
                      <div style={{color:done?m.color:"#7a8fa6",fontSize:"0.6rem",fontWeight:700,lineHeight:1.3,marginBottom:4}}>{m.title}</div>
                      <div style={{background:"#0d1f35",borderRadius:99,height:4,overflow:"hidden",marginBottom:3}}>
                        <div style={{height:"100%",width:`${(vW/m.videos.length)*100}%`,background:m.color,borderRadius:99}}/>
                      </div>
                      <div style={{color:"#2a4060",fontSize:"0.55rem"}}>{vW}/{m.videos.length} 🎬</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ CURRICULUM ══════════ */}
        {tab==="curriculum" && (
          <div>
            <div style={{marginBottom:18}}>
              <div style={{color:"#00f5d4",fontWeight:900,fontSize:"1.05rem",marginBottom:3,letterSpacing:2}}>COMPLETE CURRICULUM</div>
              <div style={{color:"#3a5570",fontSize:"0.72rem"}}>10 modules · {totalCourseHours}h · {totalVideos} YouTube lectures — click any module to expand</div>
            </div>

            {MODULES.map(m=>{
              const done=completedModules.includes(m.id);
              const open=activeModule===m.id;
              const subTab=modSubTab[m.id]||"topics";
              const vW=m.videos.filter(v=>watchedVideos.includes(`${m.id}-${v.ytId}`)).length;

              return (
                <div key={m.id} style={{background:"#070d1a",border:`1.5px solid ${open||done?m.color+"50":"#0d1f35"}`,borderRadius:16,overflow:"hidden",marginBottom:13,transition:"border-color 0.2s"}}>
                  {/* Header row */}
                  <div onClick={()=>setActiveModule(open?null:m.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"0.95rem 1.2rem",cursor:"pointer"}}>
                    <div style={{width:44,height:44,borderRadius:12,background:`${m.color}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0,border:`1px solid ${m.color}28`}}>{m.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                        <span style={{fontWeight:700,fontSize:"0.86rem",color:done?m.color:"#e0e8f0"}}>Module {m.id}: {m.title}</span>
                        <span style={{background:`${LEVELS[m.level]}16`,color:LEVELS[m.level],fontSize:"0.58rem",padding:"2px 8px",borderRadius:99,fontWeight:700}}>{m.level}</span>
                      </div>
                      <div style={{color:"#3a5570",fontSize:"0.65rem",marginTop:3,display:"flex",gap:14}}>
                        <span>⏱ {m.duration}</span>
                        <span>📋 {m.topics.length} topics</span>
                        <span style={{color:vW===m.videos.length&&vW>0?"#00f5d4":"#3a5570"}}>🎬 {vW}/{m.videos.length} watched</span>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                      {/* Circular video progress */}
                      <svg width="36" height="36" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#0d1f35" strokeWidth="3"/>
                        <circle cx="18" cy="18" r="14" fill="none" stroke={m.color} strokeWidth="3"
                          strokeDasharray={`${(vW/m.videos.length)*88} 88`} strokeLinecap="round"
                          transform="rotate(-90 18 18)" style={{transition:"stroke-dasharray 0.5s"}}/>
                        <text x="18" y="22" textAnchor="middle" fill={m.color} fontSize="9" fontWeight="bold">{Math.round((vW/m.videos.length)*100)}%</text>
                      </svg>
                      <button onClick={e=>{e.stopPropagation();toggleModule(m.id);}} style={{background:done?m.color:"transparent",color:done?"#050a14":m.color,border:`1.5px solid ${m.color}`,borderRadius:8,padding:"0.28rem 0.7rem",fontSize:"0.65rem",cursor:"pointer",fontWeight:700,fontFamily:"'Courier New',monospace"}}>
                        {done?"✓ DONE":"MARK DONE"}
                      </button>
                      <span style={{color:"#2a4060",fontSize:14}}>{open?"▲":"▼"}</span>
                    </div>
                  </div>

                  {/* Expanded */}
                  {open && (
                    <div style={{borderTop:`1px solid ${m.color}20`}}>
                      {/* Sub-nav */}
                      <div style={{display:"flex",padding:"0 1.2rem",background:"#050a14",borderBottom:`1px solid ${m.color}14`}}>
                        {[["topics","📋 Topics"],["videos",`🎬 Video Lectures (${m.videos.length})`]].map(([tid,tlabel])=>(
                          <button key={tid} onClick={()=>setModSubTab(prev=>({...prev,[m.id]:tid}))} style={{background:"transparent",color:subTab===tid?m.color:"#3a5570",border:"none",borderBottom:subTab===tid?`2px solid ${m.color}`:"2px solid transparent",padding:"0.58rem 1rem",fontWeight:700,cursor:"pointer",fontSize:"0.68rem",letterSpacing:1,fontFamily:"'Courier New',monospace",transition:"color 0.2s"}}>
                            {tlabel}
                          </button>
                        ))}
                      </div>

                      <div style={{padding:"1.2rem"}}>
                        {subTab==="topics" && (
                          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                            {m.topics.map((t,i)=>(
                              <div key={i} style={{background:"#050a14",border:`1px solid ${m.color}16`,borderRadius:10,padding:"0.6rem 0.9rem",display:"flex",alignItems:"center",gap:8}}>
                                <div style={{width:6,height:6,borderRadius:"50%",background:m.color,flexShrink:0}}/>
                                <span style={{color:"#c0cfe0",fontSize:"0.76rem"}}>{t}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {subTab==="videos" && (
                          <div style={{display:"flex",flexDirection:"column",gap:10}}>
                            {m.videos.map((v,i)=>{
                              const vid=`${m.id}-${v.ytId}`;
                              const watched=watchedVideos.includes(vid);
                              return (
                                <div key={i} style={{background:"#050a14",border:`1px solid ${watched?m.color+"40":"#0d1f35"}`,borderRadius:12,overflow:"hidden",display:"flex",transition:"border-color 0.2s"}}>
                                  {/* YT Thumbnail */}
                                  <div onClick={()=>setPlayingVideo({...v,moduleId:m.id})} style={{width:148,flexShrink:0,background:"#0d1f35",position:"relative",cursor:"pointer",overflow:"hidden"}}>
                                    <img src={`https://img.youtube.com/vi/${v.ytId}/mqdefault.jpg`} alt={v.title}
                                      style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
                                      onError={e=>{e.target.style.background="#0d1f35";e.target.style.display="none";}}/>
                                    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                      <div style={{width:38,height:38,borderRadius:"50%",background:"rgba(255,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:"0 2px 12px #0006"}}>▶</div>
                                    </div>
                                    <div style={{position:"absolute",bottom:5,right:6,background:"rgba(0,0,0,0.82)",color:"#fff",fontSize:"0.58rem",padding:"1px 5px",borderRadius:4}}>{v.duration}</div>
                                    {watched && <div style={{position:"absolute",top:5,left:5,background:m.color,color:"#050a14",fontSize:"0.58rem",padding:"2px 6px",borderRadius:4,fontWeight:700}}>✓ WATCHED</div>}
                                  </div>
                                  {/* Info */}
                                  <div style={{flex:1,padding:"0.85rem 1rem",display:"flex",flexDirection:"column",justifyContent:"space-between",minWidth:0}}>
                                    <div>
                                      <div style={{fontWeight:700,fontSize:"0.8rem",color:watched?m.color:"#e0e8f0",lineHeight:1.4,marginBottom:5}}>{v.title}</div>
                                      <div style={{color:"#3a5570",fontSize:"0.65rem",display:"flex",gap:10}}>
                                        <span>📺 {v.channel}</span>
                                        <span>⏱ {v.duration}</span>
                                      </div>
                                    </div>
                                    <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
                                      <button onClick={()=>setPlayingVideo({...v,moduleId:m.id})} style={{background:"rgba(255,0,0,0.9)",color:"#fff",border:"none",borderRadius:7,padding:"0.3rem 0.9rem",fontSize:"0.65rem",cursor:"pointer",fontWeight:700,fontFamily:"'Courier New',monospace",display:"flex",alignItems:"center",gap:5}}>
                                        ▶ WATCH ON YOUTUBE
                                      </button>
                                      <button onClick={()=>toggleVideo(vid)} style={{background:watched?`${m.color}18`:"#0d1f35",color:watched?m.color:"#3a5570",border:`1px solid ${watched?m.color+"40":"#1a3050"}`,borderRadius:7,padding:"0.3rem 0.85rem",fontSize:"0.65rem",cursor:"pointer",fontWeight:700,fontFamily:"'Courier New',monospace"}}>
                                        {watched?"✓ WATCHED":"MARK WATCHED"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══════════ TRACKER ══════════ */}
        {tab==="tracker" && (
          <div>
            <div style={{marginBottom:18}}>
              <div style={{color:"#00f5d4",fontWeight:900,fontSize:"1.05rem",marginBottom:3,letterSpacing:2}}>PERFORMANCE TRACKER</div>
              <div style={{color:"#3a5570",fontSize:"0.72rem"}}>Study consistency, streaks & learning analytics</div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:20}}>
              {[
                {label:"Streak",value:`${streak}d`,icon:"🔥",color:"#fee440"},
                {label:"This Week",value:`${weekDays}/7`,icon:"📅",color:"#00f5d4"},
                {label:"This Month",value:`${last28.filter(d=>studyLog[dateKey(d)]).length}/28`,icon:"📆",color:"#f15bb5"},
                {label:"Videos Done",value:`${watchedVideos.length}/${totalVideos}`,icon:"🎬",color:"#9b5de5"},
              ].map((c,i)=>(
                <div key={i} style={{background:"#070d1a",border:`1px solid ${c.color}22`,borderRadius:14,padding:"1.1rem",textAlign:"center"}}>
                  <div style={{fontSize:24,marginBottom:4}}>{c.icon}</div>
                  <div style={{color:c.color,fontSize:"1.35rem",fontWeight:900}}>{c.value}</div>
                  <div style={{color:"#3a5570",fontSize:"0.65rem",marginTop:3}}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Weekly heatbar */}
            <div style={{background:"#070d1a",border:"1px solid #0d1f35",borderRadius:14,padding:"1.3rem",marginBottom:16}}>
              <div style={{fontWeight:700,color:"#fee440",fontSize:"0.72rem",marginBottom:13,letterSpacing:1}}>THIS WEEK — DAILY STUDY</div>
              <div style={{display:"flex",gap:7}}>
                {last7.map((d,i)=>{
                  const key=dateKey(d);const mins=studyLog[key]||0;const isToday=key===todayKey;
                  const alpha=mins===0?0:mins<30?0.3:mins<60?0.6:1;
                  return (
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                      <div style={{width:"100%",aspectRatio:"1",borderRadius:9,background:mins>0?`rgba(254,228,64,${alpha})`:"#0d1f35",border:isToday?"2px solid #fee440":"2px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>
                        {mins>0?"✓":isToday?"·":""}
                      </div>
                      <div style={{color:isToday?"#fee440":"#2a4060",fontSize:"0.58rem",fontWeight:isToday?700:400}}>{DAYS[d.getDay()]}</div>
                      {mins>0&&<div style={{color:"#fee44099",fontSize:"0.55rem"}}>{mins}m</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 28-day grid */}
            <div style={{background:"#070d1a",border:"1px solid #0d1f35",borderRadius:14,padding:"1.3rem",marginBottom:16}}>
              <div style={{fontWeight:700,color:"#f15bb5",fontSize:"0.72rem",marginBottom:13,letterSpacing:1}}>28-DAY CONSISTENCY HEATMAP</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:5,marginBottom:8}}>
                {DAYS.map(d=><div key={d} style={{color:"#2a4060",fontSize:"0.56rem",textAlign:"center"}}>{d}</div>)}
                {last28.map((d,i)=>{
                  const key=dateKey(d);const mins=studyLog[key]||0;const isToday=key===todayKey;
                  return <div key={i} title={`${d.getDate()} ${MONTHS[d.getMonth()]}: ${mins}min`} style={{aspectRatio:"1",borderRadius:5,background:mins>0?`rgba(241,91,181,${mins<30?0.28:mins<60?0.58:0.95})`:"#0d1f35",border:isToday?"2px solid #f15bb5":"2px solid transparent"}}/>;
                })}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:5}}>
                <span style={{color:"#2a4060",fontSize:"0.58rem"}}>Less</span>
                {[0.14,0.32,0.58,0.9].map((o,i)=><div key={i} style={{width:11,height:11,borderRadius:3,background:`rgba(241,91,181,${o})`}}/>)}
                <span style={{color:"#2a4060",fontSize:"0.58rem"}}>More</span>
              </div>
            </div>

            {/* Per-module progress bars */}
            <div style={{background:"#070d1a",border:"1px solid #0d1f35",borderRadius:14,padding:"1.3rem",marginBottom:16}}>
              <div style={{fontWeight:700,color:"#00bbf9",fontSize:"0.72rem",marginBottom:13,letterSpacing:1}}>VIDEO PROGRESS PER MODULE</div>
              {MODULES.map(m=>{
                const vW=m.videos.filter(v=>watchedVideos.includes(`${m.id}-${v.ytId}`)).length;
                const done=completedModules.includes(m.id);
                return (
                  <div key={m.id} style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
                    <span style={{fontSize:14,width:20,flexShrink:0}}>{m.icon}</span>
                    <span style={{color:"#7a8fa6",fontSize:"0.64rem",width:150,flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.title}</span>
                    <div style={{flex:1,background:"#0d1f35",borderRadius:99,height:6}}>
                      <div style={{height:"100%",width:`${(vW/m.videos.length)*100}%`,background:m.color,borderRadius:99,transition:"width 0.5s"}}/>
                    </div>
                    <span style={{color:m.color,fontSize:"0.62rem",fontWeight:700,width:40,textAlign:"right",flexShrink:0}}>{vW}/{m.videos.length}</span>
                    <span style={{color:done?m.color:"#1a3050",fontSize:"0.6rem",width:36,flexShrink:0}}>{done?"✓done":""}</span>
                  </div>
                );
              })}
            </div>

            {/* Insights */}
            <div style={{background:"#070d1a",border:"1px solid #9b5de530",borderRadius:14,padding:"1.3rem"}}>
              <div style={{fontWeight:700,color:"#9b5de5",fontSize:"0.72rem",marginBottom:12,letterSpacing:1}}>🧠 PERFORMANCE INSIGHTS</div>
              {[
                {label:"Consistency (28 days)",v:Math.round((last28.filter(d=>studyLog[dateKey(d)]).length/28)*100),c:"#9b5de5"},
                {label:"Course Completion",v:progress,c:"#00f5d4"},
                {label:"Video Progress",v:videoProgress,c:"#f15bb5"},
                {label:"Weekly Goal (5/7 days)",v:Math.min(100,Math.round((weekDays/5)*100)),c:"#fee440"},
              ].map((item,i)=>(
                <div key={i} style={{marginBottom:11}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{color:"#7a8fa6",fontSize:"0.68rem"}}>{item.label}</span>
                    <span style={{color:item.c,fontWeight:700,fontSize:"0.68rem"}}>{item.v}%</span>
                  </div>
                  <div style={{background:"#0d1f35",borderRadius:99,height:7}}>
                    <div style={{height:"100%",width:`${item.v}%`,background:item.c,borderRadius:99,transition:"width 0.6s"}}/>
                  </div>
                </div>
              ))}
              <div style={{marginTop:12,padding:"0.85rem",background:"#050a14",borderRadius:10,border:"1px solid #0d1f35",color:"#c0cfe0",fontSize:"0.76rem",lineHeight:1.7}}>
                {streak>=7?"🏆 Amazing streak! You're building real ML expertise. Keep watching those lectures!":
                 streak>=3?"🔥 Strong habit forming! Try to watch at least 1 lecture video per day.":
                 watchedVideos.length>0?"📺 Good start on videos! Consistency beats intensity — study a little every day.":
                 "💡 Start with Module 1 — click 'Curriculum', open a video, and learn something new today!"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}