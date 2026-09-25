(() => {
"use strict";

/* LIMITVERSE 4.0 - factorización aplicada a límites */
const questions = [
  {
    name:"Neo-Sustitución", type:"Sustitución directa", icon:"🌌", difficulty:"NIVEL 1",
    description:"Empieza dominando la sustitución directa con expresiones lineales y cuadráticas.",
    qs:[
      ["Calcula","lim x→2  (x² + 3x − 1)",["9","7","5","11"],0,"Sustituye x=2: 4+6−1=9."],
      ["Calcula","lim x→−1  (2x² − x + 4)",["5","7","3","9"],1,"Sustituye x=−1: 2(1)+1+4=7."],
      ["Calcula","lim x→3  (2x³ − x² + 4)",["49","55","58","61"],0,"2(27)−9+4=49. La respuesta correcta es 49."],
      ["Calcula","lim x→−2  (x³ − 2x² + 5x + 4)",["−22","−18","−14","−12"],0,"−8−8−10+4=−22. La respuesta correcta es −22."],
      ["Calcula","lim x→1  ((x+2)(x²+1))",["3","6","9","12"],1,"Sustituye x=1: (1+2)(1+1)=6."]
    ]
  },
  {
    name:"Factorium", type:"Factorización", icon:"🪐", difficulty:"NIVEL 2",
    description:"Detecta indeterminaciones 0/0 y usa factorización para simplificar.",
    qs:[
      ["Resuelve","lim x→2  (x² − 4)/(x − 2)",["2","4","6","8"],1,"x²−4=(x−2)(x+2). Se cancela x−2 y queda 4."],
      ["Resuelve","lim x→3  (x² − 9)/(x − 3)",["3","6","9","12"],1,"x²−9=(x−3)(x+3). El límite es 3+3=6."],
      ["Resuelve","lim x→1  (x² − 1)/(x − 1)",["0","1","2","3"],2,"x²−1=(x−1)(x+1). Queda x+1 y el límite es 2."],
      ["Resuelve","lim x→2  (x² − 5x + 6)/(x − 2)",["−1","0","1","2"],0,"x²−5x+6=(x−2)(x−3). Queda x−3; en 2 es −1. La opción correcta es −1."],
      ["Resuelve","lim x→−2  (x² + 5x + 6)/(x + 2)",["−1","0","1","2"],2,"x²+5x+6=(x+2)(x+3). Queda x+3; en −2 es 1. La opción correcta es 1."]
    ]
  },
  {
    name:"Radicalia", type:"Racionalización", icon:"🔮", difficulty:"NIVEL 3",
    description:"Usa conjugados y racionalización en límites con raíces.",
    qs:[
      ["Calcula","lim x→0  (√(x+1) − 1)/x",["1/2","1","2","0"],0,"Multiplica por el conjugado. Queda 1/(√(x+1)+1)→1/2."],
      ["Calcula","lim x→3  (√x − √3)/(x − 3)",["1/√3","1/(2√3)","√3","1/3"],1,"Conjugado: 1/(√x+√3). En x=3: 1/(2√3)."],
      ["Calcula","lim x→0  (√(x+4) − 2)/x",["1/4","1/2","2","4"],0,"Conjugado: 1/(√(x+4)+2)→1/4."],
      ["Calcula","lim x→5  (√(x+4) − 3)/(x − 5)",["1/3","1/6","1/9","2/3"],1,"Conjugado: 1/(√(x+4)+3). En 5 queda 1/6."],
      ["Calcula","lim x→4  (√x − 2)/(x − 4)",["1/2","1/4","1/6","1/8"],1,"Racionalizando queda 1/(√x+2). En x=4: 1/4."]
    ]
  },

  {
    name:"Cuadrados Perfectos", type:"Diferencia de cuadrados", icon:"✖️", difficulty:"NIVEL 3",
    description:"Usa a²−b²=(a−b)(a+b), simplifica el límite y elimina la indeterminación 0/0.",
    qs:[
      ["Resuelve","lim x→2  (x² − 4)/(x − 2)",["2","4","6","8"],1,"Diferencia de cuadrados: x²−4=(x−2)(x+2). Cancela x−2 y queda x+2. En x=2: 4."],
      ["Resuelve","lim x→3  (x² − 9)/(x − 3)",["3","6","9","12"],1,"Factoriza x²−9=(x−3)(x+3). Cancela x−3 y evalúa: 6."],
      ["Resuelve","lim x→−2  (x² − 4)/(x + 2)",["−6","−4","0","4"],0,"x²−4=(x−2)(x+2). Cancela x+2 y queda x−2. En x=−2: −4."],
      ["Resuelve","lim x→5  (x² − 25)/(x − 5)",["5","10","15","20"],1,"x²−25=(x−5)(x+5). Cancela x−5. En x=5: 10."],
      ["Resuelve","lim x→1  (x² − 1)/(x − 1)",["0","1","2","3"],2,"x²−1=(x−1)(x+1). Cancela x−1. En x=1: 2."]
    ]
  },

  {
    name:"Infinita", type:"Límites al infinito", icon:"🌠", difficulty:"NIVEL 4",
    description:"Compara grados y coeficientes principales para resolver límites cuando x→∞.",
    qs:[
      ["Calcula","lim x→∞  (3x² + 2)/(x² − 5)",["0","1","2","3"],3,"Los grados son iguales: 3/1=3."],
      ["Calcula","lim x→∞  (5x + 1)/(2x − 7)",["2","2.5","5","0"],1,"Los grados son iguales: 5/2=2.5."],
      ["Calcula","lim x→∞  (7x³ + 1)/(x³ − 4)",["1","3","7","∞"],2,"Los grados son iguales: 7/1=7."],
      ["Calcula","lim x→∞  (2x + 9)/(x² + 1)",["0","1","2","∞"],0,"El denominador tiene mayor grado, por eso el límite es 0."],
      ["Calcula","lim x→∞  (4x³ − 2x + 1)/(2x⁴ + x² − 8)",["0","1/2","2","∞"],0,"El denominador tiene mayor grado: 4<2x⁴ en grado, por tanto el límite es 0."]
    ]
  },
  {
    name:"Hiperespacio", type:"Límites al infinito", icon:"🌀", difficulty:"NIVEL 5",
    description:"Analiza límites al infinito y reconoce cuándo un límite existe o no existe.",
    qs:[
      ["Analiza","lim x→2  (x²−4)/|x−2|",["−4","0","4","No existe"],3,"Al acercarse por la derecha el cociente tiende a 4 y por la izquierda a −4. Como son distintos, el límite no existe."],
      ["Analiza","lim x→0  x/|x|",["−1","0","1","No existe"],3,"Por la derecha x/|x|=1; por la izquierda =−1. Los límites al infinito son distintos."],
      ["Calcula","lim x→0⁺  1/x",["−∞","0","1","∞"],3,"Al acercarse a 0 por la derecha, 1/x crece sin límite: +∞."],
      ["Calcula","lim x→0⁻  1/x",["−∞","0","1","∞"],0,"Al acercarse a 0 por la izquierda, 1/x disminuye sin límite: −∞."],
      ["Analiza","lim x→1  (x−1)/|x−1|",["−1","0","1","No existe"],3,"Por la derecha vale 1 y por la izquierda −1; por eso el límite bilateral no existe."]
    ]
  },

  {
    name:"Factor Común", type:"Límites por factor común", icon:"⚙️", difficulty:"NIVEL 2",
    description:"Extrae el factor común, simplifica la indeterminación 0/0 y evalúa el límite.",
    qs:[
      ["Resuelve","lim x→3  (x² − 3x)/(x − 3)",["1","2","3","6"],2,"Saca factor común: x(x−3). Cancela x−3 y queda x. Al sustituir x=3, el límite es 3."],
      ["Resuelve","lim x→−2  (x² + 2x)/(x + 2)",["−4","−2","0","2"],1,"Factoriza x(x+2). Cancela x+2 y queda x. En x=−2, el límite es −2."],
      ["Resuelve","lim x→4  (2x² − 8x)/(x − 4)",["4","6","8","16"],2,"Extrae 2x: 2x(x−4). Cancela x−4 y queda 2x. En x=4: 8."],
      ["Resuelve","lim x→1  (x³ − x²)/(x − 1)",["0","1","2","3"],1,"Factor común x²: x²(x−1). Cancela x−1 y queda x². En x=1: 1."],
      ["Resuelve","lim x→5  (3x² − 15x)/(x − 5)",["5","10","15","20"],2,"Factor común 3x: 3x(x−5). Cancela x−5 y queda 3x. En x=5: 15."]
    ]
  },
  {
    name:"Trinomio Base", type:"Límites con x² + bx + c", icon:"🔺", difficulty:"NIVEL 3",
    description:"Factoriza trinomios de la forma x² + bx + c buscando dos números que multipliquen c y sumen b.",
    qs:[
      ["Resuelve","lim x→2  (x² − 5x + 6)/(x − 2)",["−2","−1","1","2"],1,"Busca números que multipliquen 6 y sumen −5: −2 y −3. Queda (x−2)(x−3). Cancela y evalúa: 2−3=−1."],
      ["Resuelve","lim x→3  (x² − 7x + 12)/(x − 3)",["−2","−1","1","2"],1,"12 se factoriza con −3 y −4: (x−3)(x−4). Cancela y evalúa en 3: −1."],
      ["Resuelve","lim x→−2  (x² + 5x + 6)/(x + 2)",["−2","−1","1","2"],2,"Los números son 2 y 3: (x+2)(x+3). Cancela x+2. En −2 queda 1."],
      ["Resuelve","lim x→1  (x² − 4x + 3)/(x − 1)",["−3","−2","2","3"],0,"Factoriza (x−1)(x−3). Cancela x−1 y evalúa: 1−3=−2. La opción correcta es −2."],
      ["Resuelve","lim x→4  (x² − 9x + 20)/(x − 4)",["−2","−1","1","2"],1,"Factoriza (x−4)(x−5). Cancela x−4 y en 4 queda −1."]
    ]
  },
  {
    name:"Trinomio Pro", type:"Límites con ax² + bx + c", icon:"🧬", difficulty:"NIVEL 4",
    description:"Factoriza trinomios donde el coeficiente de x² no es 1 y simplifica el límite.",
    qs:[
      ["Resuelve","lim x→2  (2x² − 5x + 2)/(x − 2)",["−1","1","3","5"],2,"Factoriza: 2x²−5x+2=(2x−1)(x−2). Cancela x−2. En x=2: 4−1=3."],
      ["Resuelve","lim x→2  (3x² − 7x + 2)/(x − 2)",["2","3","5","7"],2,"Factoriza: (3x−1)(x−2). Cancela x−2. En x=2: 6−1=5."],
      ["Resuelve","lim x→1  (2x² − 5x + 3)/(x − 1)",["−1","0","1","2"],0,"Factoriza: (2x−3)(x−1). Cancela x−1. En x=1: 2−3=−1."],
      ["Resuelve","lim x→−1  (2x² + 3x + 1)/(x + 1)",["−1","−2","−3","−4"],0,"Factoriza: (2x+1)(x+1). Cancela x+1 y queda 2x+1. En x=−1: −1."],
      ["Resuelve","lim x→3  (2x² − 7x + 3)/(x − 3)",["3","4","5","6"],2,"Factoriza: (2x−1)(x−3). Cancela x−3. En x=3: 6−1=5."]
    ]
  },
  {
    name:"Omega", type:"Mixto avanzado", icon:"🧬", difficulty:"NIVEL 6",
    description:"Combina factorización, racionalización, infinito y límites al infinito.",
    qs:[
      ["Resuelve","lim x→2  (x² − 3x + 2)/(x − 2)",["0","1","2","3"],1,"Factoriza (x−1)(x−2). Se cancela x−2 y queda x−1→1."],
      ["Calcula","lim x→−2  (x² − 4)/(x + 2)",["−4","−2","2","4"],0,"Factoriza (x−2)(x+2). Queda x−2→−4."],
      ["Calcula","lim x→0  (x² + 4x)/x",["0","2","4","∞"],2,"Factoriza x(x+4). Se cancela x y queda x+4→4."],
      ["Calcula","lim x→∞  (3x²−x+7)/(x²+4x−1)",["0","1","2","3"],3,"Los grados son iguales; se dividen coeficientes principales: 3/1=3. La opción correcta es 3."],
      ["Resuelve","lim x→1  (x³−1)/(x−1)",["1","2","3","4"],2,"x³−1=(x−1)(x²+x+1). En x=1: 1+1+1=3."]
    ]
  }
];

const bossQuestions = [
  ["Fase 1","lim x→2  (x³ − 8)/(x − 2)",["4","8","12","16"],2,"Diferencia de cubos: x³−8=(x−2)(x²+2x+4). En 2: 4+4+4=12."],
  ["Fase 2","lim x→∞  (6x³ + x)/(3x³ − 2x² + 1)",["1","2","3","6"],1,"Los grados son iguales. Coeficientes principales: 6/3=2."],
  ["Fase 3","lim x→0  (√(x+9) − 3)/x",["1/3","1/6","1/9","1/12"],1,"Racionalizando queda 1/(√(x+9)+3)→1/6."],
  ["Fase 4","lim x→0  x/|x|",["−1","0","1","No existe"],3,"Por la derecha vale 1 y por la izquierda −1. El límite bilateral no existe."],
  ["Fase 5","lim x→1  (x⁴−1)/(x−1)",["1","2","3","4"],3,"x⁴−1=(x−1)(x³+x²+x+1). En x=1: 4."]
];

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
function startGame(){
  state={screen:"map",world:0,q:0,lives:4,score:0,coins:0,combo:0,bestCombo:0,correct:0,total:0,unlocked:1,answered:false,bossPhase:0,bossStarted:false,expert:false,timer:45,timerId:null,streak:0,achievements:[]};
  updateStats(); renderMap(); showScreen("mapScreen");
}
function startWorld(index){
  if(index>=state.unlocked)return;
  state.world=index; state.q=0; state.combo=0; state.bossStarted=false;
  updateStats(); showScreen("gameScreen"); renderQuestion();
}
function renderQuestion(){
  const world=questions[state.world], q=world.qs[state.q];
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
  q[2].forEach((answer,i)=>{
    const b=document.createElement("button"); b.type="button"; b.className="answer";
    b.innerHTML=`<span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${answer}</span>`;
    b.addEventListener("click",()=>answerQuestion(i,q[3],q[4],b)); $("answers").appendChild(b);
  });
}
function answerQuestion(selected,correctIndex,explanation,button){
  if(state.answered)return;
  state.answered=true; stopTimer(); state.total++;
  const buttons=[...$("answers").children]; buttons[correctIndex].classList.add("correct");
  buttons.forEach(b=>b.disabled=true);
  if(selected===correctIndex){
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
function renderBossQuestion(){
  const q=bossQuestions[state.bossPhase];
  $("zoneTag").textContent="👾 JEFE FINAL · FASE "+(state.bossPhase+1);
  $("zoneTitle").textContent="GUARDIÁN DEL INFINITO";
  $("questionCount").textContent=`${state.bossPhase+1} / ${bossQuestions.length}`;
  $("progressBar").style.width=`${((state.bossPhase+1)/bossQuestions.length)*100}%`;
  $("questionLabel").textContent="⚔️ DESAFÍO ÉLITE";
  $("questionText").textContent="Derrota la fase resolviendo el límite";
  $("formula").textContent=q[1]; $("feedback").textContent=""; $("feedback").className="feedback";
  $("explanation").textContent=""; $("explanation").className="explanation"; $("answers").innerHTML="";
  state.answered=false;
  startTimer();
  q[2].forEach((answer,i)=>{
    const b=document.createElement("button"); b.type="button"; b.className="answer";
    b.innerHTML=`<span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${answer}</span>`;
    b.addEventListener("click",()=>bossAnswer(i,q[3],q[4],b)); $("answers").appendChild(b);
  });
}
function bossAnswer(selected,correctIndex,explanation,button){
  if(state.answered)return;
  state.answered=true; stopTimer(); state.total++;
  const buttons=[...$("answers").children]; buttons[correctIndex].classList.add("correct"); buttons.forEach(b=>b.disabled=true);
  if(selected===correctIndex){
    state.correct++; state.combo++; state.bestCombo=Math.max(state.bestCombo,state.combo);
    state.score+=650; state.coins+=18; button.classList.add("selected");
    $("feedback").textContent="💥 ¡GOLPE CRÍTICO! +650 XP"; $("feedback").className="feedback good";
  }else{
    state.lives--; state.combo=0; button.classList.add("wrong");
    $("feedback").textContent="💔 El Guardián contraataca."; $("feedback").className="feedback bad";
  }
  $("explanation").textContent="📚 "+explanation; $("explanation").classList.add("show"); updateStats();
  if(state.lives<=0){setTimeout(()=>finish(false),1100);return;}
  if(state.bossPhase<bossQuestions.length-1){state.bossPhase++;setTimeout(renderBossQuestion,1100);}
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
    ?`Has completado los 6 mundos y las ${bossQuestions.length} fases del Guardián. Resolviste ${state.correct} de ${state.total} desafíos.`
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
    "Límites al infinito":"💡 Compara qué ocurre por la izquierda y por la derecha.",
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
    if(state.bossStarted){if(state.bossPhase<bossQuestions.length-1){state.bossPhase++;renderBossQuestion();}else finish(false);}
    else nextQuestion();
  },700);
});
updateStats(); renderMap();
})();