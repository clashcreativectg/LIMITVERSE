(() => {
"use strict";

/* LIMITVERSE — cliente ligero. Las respuestas permanecen en el servidor. */
const API_BASE = window.LIMITVERSE_API || "https://limitverse-api.clashcreative123.workers.dev";
let questions = [];
let bossTotal = 0;

let state = {
  screen:"home", world:0, q:0, lives:4, score:0, coins:0, combo:0, bestCombo:0,
  correct:0, total:0, unlocked:1, answered:false, bossPhase:0, bossStarted:false,
  expert:false, timer:45, timerId:null, streak:0, achievements:[]
};
const advancedAchievements = [
  ["first", "🌟 Primer salto", s => s.correct >= 1],
  ["combo5", "🔥 Combo x5", s => s.bestCombo >= 5],
  ["perfect", "🎯 Precisión total", s => s.total >= 5 && s.correct === s.total],
  ["speed", "⚡ Velocista", s => s.expert && s.correct >= 3],
  ["explorer", "🪐 Explorador", s => s.unlocked >= 6]
];

const $ = id => document.getElementById(id);

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}
function updateStats(){
  $("lives").textContent=state.lives;
  $("score").textContent=state.score;
  $("coins").textContent=state.coins;
  $("combo").textContent=state.combo;
  $("streakMini").textContent=state.bestCombo;
  const rank = state.score >= 5000 ? "Maestro" : state.score >= 2500 ? "Experto" : state.score >= 1000 ? "Piloto" : "Cadete";
  $("rankMini").textContent=rank;
}
function toast(message){
  const el=$("toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove("show"),2400);
}

function stopTimer(){
  if(state.timerId){clearInterval(state.timerId);state.timerId=null;}
}
function startTimer(){
  stopTimer();
  state.timer=state.expert?25:45;
  $("timer").textContent=state.timer;
  state.timerId=setInterval(()=>{
    if(state.answered)return;
    state.timer--;
    $("timer").textContent=state.timer;
    if(state.timer<=0){
      stopTimer();
      state.answered=true; state.total++; state.lives--; state.combo=0;
      $("feedback").textContent="⏰ ¡Tiempo agotado! −1 ❤️";
      $("feedback").className="feedback bad";
      updateStats();
      if(state.lives<=0){setTimeout(()=>finish(false),700);}
      else setTimeout(nextQuestion,800);
    }
  },1000);
}
function checkAchievements(){
  advancedAchievements.forEach(([id,label,test])=>{
    if(!state.achievements.includes(id) && test(state)){
      state.achievements.push(id);
      toast("🏆 Logro desbloqueado: "+label);
    }
  });
}
function toggleExpert(){
  state.expert=!state.expert;
  $("modeLabel").textContent=state.expert?"Modo experto":"Modo normal";
  $("challengeBtn").textContent=state.expert?"🛡️ Modo normal":"⚡ Modo experto";
  $("footerStatus").textContent=state.expert?"Modo experto activado":"Sistema listo";
  toast(state.expert?"⚡ Menos tiempo, más recompensa":"🛡️ Has vuelto al modo normal");
}
function renderMap(){
  const map=$("worldMap"); map.innerHTML="";
  questions.forEach((world,i)=>{
    const b=document.createElement("button");
    b.type="button"; b.className="world"; b.disabled=i>=state.unlocked;
    const progress=i<state.unlocked ? "DESBLOQUEADO" : "BLOQUEADO";
    b.innerHTML=`
      <span class="world-number">${String(i+1).padStart(2,"0")}</span>
      <span class="lock">${i>=state.unlocked?"🔒":"✓"}</span>
      <div class="planet">${world.icon}</div>
      <span class="difficulty">${world.difficulty}</span>
      <h3>${world.name}</h3>
      <p>${world.type}</p>
      <p>${i<state.unlocked ? world.description : "Completa el mundo anterior para desbloquearlo."}</p>
      <span class="world-status">${progress}</span>`;
    b.addEventListener("click",()=>startWorld(i)); map.appendChild(b);
  });
}
async function startGame(){
  state={screen:"map",world:0,q:0,lives:4,score:0,coins:0,combo:0,bestCombo:0,correct:0,total:0,unlocked:1,answered:false,bossPhase:0,bossStarted:false,expert:false,timer:45,timerId:null,streak:0,achievements:[]};
  try { const r=await fetch(API_BASE+"/api/worlds"); if(!r.ok) throw new Error("API"); const data=await r.json(); questions=data.worlds.map(w=>({...w,qs:Array.from({length:w.total},()=>null)})); bossTotal=data.bossPhases; updateStats(); renderMap(); showScreen("mapScreen"); }
  catch(e){ toast("⚠️ Conecta la API de LIMITVERSE en API_BASE."); console.error(e); }
}
function startWorld(index){
  if(index>=state.unlocked)return;
  state.world=index; state.q=0; state.combo=0; state.bossStarted=false;
  updateStats(); showScreen("gameScreen"); renderQuestion();
}
async function renderQuestion(){
  const world=questions[state.world];
  try {
    const r=await fetch(`${API_BASE}/api/question?world=${state.world}&q=${state.q}`);
    if(!r.ok) throw new Error("question");
    const data=await r.json(); const q=data.question;
  $("zoneTag").textContent=world.icon+" "+world.type;
  $("zoneTitle").textContent=world.name;
  $("questionCount").textContent=`${state.q+1} / ${world.qs.length}`;
  $("progressBar").style.width=`${((state.q+1)/world.qs.length)*100}%`;
  $("questionLabel").textContent=`${world.difficulty} · ${q[0].toUpperCase()}`;
  $("questionText").textContent="Encuentra el valor del límite";
  $("formula").textContent=q[1];
  $("feedback").textContent=""; $("feedback").className="feedback";
  $("explanation").textContent=""; $("explanation").className="explanation";
  $("answers").innerHTML=""; state.answered=false;
  startTimer();
  q.options.forEach((answer,i)=>{
    const b=document.createElement("button"); b.type="button"; b.className="answer";
    b.innerHTML=`<span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${answer}</span>`;
    b.addEventListener("click",()=>answerQuestion(i,b)); $("answers").appendChild(b);
  });
  } catch(e){ stopTimer(); toast("⚠️ No se pudo cargar el desafío."); console.error(e); }
}
async function answerQuestion(selected,button){
  if(state.answered)return;
  state.answered=true; stopTimer(); state.total++;
  const buttons=[...$("answers").children]; buttons.forEach(b=>b.disabled=true);
  let result;
  try { const r=await fetch(API_BASE+"/api/answer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({world:state.world,q:state.q,selected})}); result=await r.json(); }
  catch(e){ state.answered=false; buttons.forEach(b=>b.disabled=false); toast("⚠️ Error de conexión con la API."); return; }
  const correctIndex=result.correctIndex, explanation=result.explanation;
  buttons[correctIndex].classList.add("correct");
  if(result.correct){
    state.correct++; state.combo++; state.bestCombo=Math.max(state.bestCombo,state.combo);
    const gain=(state.expert?180:120)+(state.combo*(state.expert?50:35)); state.score+=gain; state.coins+=3+Math.min(state.combo,6);
    $("feedback").textContent=`✅ ¡CORRECTO! +${gain} XP`;
    $("feedback").className="feedback good"; button.classList.add("selected");
  }else{
    state.lives--; state.combo=0; button.classList.add("wrong");
    $("feedback").textContent=`❌ Incorrecto · Era ${buttons[correctIndex].querySelector("span:last-child").textContent}`;
    $("feedback").className="feedback bad";
  }
  $("explanation").textContent="📚 "+explanation; $("explanation").classList.add("show");
  updateStats(); checkAchievements();
  if(state.lives<=0){setTimeout(()=>finish(false),1100);return;}
  setTimeout(nextQuestion,1050);
}
function nextQuestion(){
  const world=questions[state.world];
  if(state.q<world.qs.length-1){state.q++; renderQuestion(); return;}
  state.score+=300; state.coins+=12;
  if(state.world+1<questions.length){
    state.unlocked=Math.max(state.unlocked,state.world+2); updateStats(); renderMap();
    toast(`🌟 ${world.name} completado · Mundo ${state.world+2} desbloqueado`);
    setTimeout(()=>showScreen("mapScreen"),550);
  }else{
    showScreen("bossScreen"); renderBossIntro();
  }
}
function renderBossIntro(){
  $("bossLives").textContent=Array.from({length:4},(_,i)=>i<state.lives?"❤️":"🖤").join(" ");
}
function startBoss(){
  state.bossPhase=0; state.bossStarted=true; state.combo=0;
  showScreen("gameScreen"); renderBossQuestion();
}
async function renderBossQuestion(){
  let q;
  try { const r=await fetch(`${API_BASE}/api/boss?phase=${state.bossPhase}`); const data=await r.json(); q=data.question; } catch(e){ toast("⚠️ No se pudo cargar el jefe."); return; }
  $("zoneTag").textContent="👾 JEFE FINAL · FASE "+(state.bossPhase+1);
  $("zoneTitle").textContent="GUARDIÁN DEL INFINITO";
  $("questionCount").textContent=`${state.bossPhase+1} / ${bossTotal}`;
  $("progressBar").style.width=`${((state.bossPhase+1)/bossTotal)*100}%`;
  $("questionLabel").textContent="⚔️ DESAFÍO ÉLITE";
  $("questionText").textContent="Derrota la fase resolviendo el límite";
  $("formula").textContent=q.formula; $("feedback").textContent=""; $("feedback").className="feedback";
  $("explanation").textContent=""; $("explanation").className="explanation"; $("answers").innerHTML="";
  state.answered=false;
  startTimer();
  q.options.forEach((answer,i)=>{
    const b=document.createElement("button"); b.type="button"; b.className="answer";
    b.innerHTML=`<span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${answer}</span>`;
    b.addEventListener("click",()=>bossAnswer(i,b)); $("answers").appendChild(b);
  });
}
async function bossAnswer(selected,button){
  if(state.answered)return;
  state.answered=true; stopTimer(); state.total++;
  const buttons=[...$("answers").children]; buttons.forEach(b=>b.disabled=true);
  let result; try { const r=await fetch(API_BASE+"/api/boss-answer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phase:state.bossPhase,selected})}); result=await r.json(); } catch(e){ state.answered=false; buttons.forEach(b=>b.disabled=false); toast("⚠️ Error de conexión con la API."); return; }
  const correctIndex=result.correctIndex, explanation=result.explanation; buttons[correctIndex].classList.add("correct");
  if(result.correct){
    state.correct++; state.combo++; state.bestCombo=Math.max(state.bestCombo,state.combo);
    state.score+=650; state.coins+=18; button.classList.add("selected");
    $("feedback").textContent="💥 ¡GOLPE CRÍTICO! +650 XP"; $("feedback").className="feedback good";
  }else{
    state.lives--; state.combo=0; button.classList.add("wrong");
    $("feedback").textContent="💔 El Guardián contraataca."; $("feedback").className="feedback bad";
  }
  $("explanation").textContent="📚 "+explanation; $("explanation").classList.add("show"); updateStats();
  if(state.lives<=0){setTimeout(()=>finish(false),1100);return;}
  if(state.bossPhase<bossTotal-1){state.bossPhase++;setTimeout(renderBossQuestion,1100);}
  else setTimeout(()=>finish(true),1200);
}
function finish(victory){
  stopTimer(); checkAchievements();
  showScreen("resultScreen");
  const accuracy=state.total?Math.round(state.correct/state.total*100):0;
  $("finalScore").textContent=state.score.toLocaleString("es-CO"); $("accuracy").textContent=accuracy+"%";
  $("bestCombo").textContent=state.bestCombo+"x"; $("finalCoins").textContent=state.coins;
  $("rank").textContent=victory?(accuracy>=90?"S":accuracy>=75?"A":accuracy>=60?"B":"C"):"F";
  $("resultIcon").textContent=victory?"🏆":"💥";
  $("resultTitle").textContent=victory?"¡LIMITVERSE CONQUISTADO!":"La misión terminó";
  $("resultMessage").textContent=victory
    ?`Has completado todos los mundos y las ${bossTotal} fases del Guardián. Resolviste ${state.correct} de ${state.total} desafíos.`
    :`Te quedaste sin vidas. Resolviste ${state.correct} de ${state.total} desafíos. ¡Vuelve a intentarlo!`;
}
$("startBtn").addEventListener("click",startGame);
$("resetBtn").addEventListener("click",startGame);
$("bossStartBtn").addEventListener("click",startBoss);
$("challengeBtn").addEventListener("click",toggleExpert);
$("playAgainBtn").addEventListener("click",startGame);
$("mapAgainBtn").addEventListener("click",()=>{renderMap();showScreen("mapScreen");});
$("hintBtn").addEventListener("click",()=>{
  if(state.answered)return;
  if(state.coins<5){toast("Necesitas 5 monedas para comprar una pista.");return;}
  state.coins-=5;
  const type=state.bossStarted?"Jefe":questions[state.world].type;
  const hints={
    "Sustitución directa":"💡 Sustituye x por el valor al que se acerca y respeta los paréntesis.",
    "Factorización":"💡 Busca factor común, diferencia de cuadrados o trinomios.",
    "Racionalización":"💡 Multiplica por el conjugado y simplifica antes de sustituir.",
    "Límites al infinito":"💡 Compara primero el grado del numerador y denominador.",
    "Límites por factor común":"💡 Extrae el factor común, cancela el factor que produce 0/0 y sustituye.",
    "Límites con x² + bx + c":"💡 Busca dos números cuyo producto sea c y cuya suma sea b.",
    "Límites con ax² + bx + c":"💡 Descompón el trinomio en dos binomios y simplifica.",
    "Diferencia de cuadrados":"💡 Usa a²−b²=(a−b)(a+b).",
    "Mixto avanzado":"💡 Identifica la indeterminación y el método adecuado.",
    "Jefe":"💡 Revisa la técnica: factorizar, racionalizar, comparar grados o límites al infinito."
  };
  $("feedback").textContent=hints[type]; $("feedback").className="feedback hint"; updateStats();
});
$("skipBtn").addEventListener("click",()=>{
  if(state.answered)return;
  state.answered=true; state.lives--; state.combo=0; updateStats();
  $("feedback").textContent="⏭ Desafío saltado · −1 ❤️"; $("feedback").className="feedback bad";
  if(state.lives<=0){setTimeout(()=>finish(false),650);return;}
  setTimeout(()=>{
    if(state.bossStarted){if(state.bossPhase<bossTotal-1){state.bossPhase++;renderBossQuestion();}else finish(false);}
    else nextQuestion();
  },700);
});
updateStats(); renderMap();
})();
