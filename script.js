const $ = (s) => document.querySelector(s);

const yearEl = $("#year");
yearEl.textContent = new Date().getFullYear();

// ===== Theme =====
const themeBtn = $("#themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

themeBtn.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ===== Fake stats (local) =====
const todayKey = new Date().toISOString().slice(0,10);
const baseKey = `funhub_${todayKey}`;
const visitsKey = `${baseKey}_visits`;
const playsKey  = `${baseKey}_plays`;

function bump(key, inc=1){
  const v = Number(localStorage.getItem(key) || 0) + inc;
  localStorage.setItem(key, String(v));
  return v;
}
function get(key){ return Number(localStorage.getItem(key) || 0); }

$("#visits").textContent = bump(visitsKey, 1);
$("#plays").textContent  = get(playsKey);

// ===== Flip cards mini game =====
let score = 0;
const scoreEl = $("#score");
const cardsEl = $("#cards");
const flipBtn = $("#flipBtn");

function renderCards(){
  cardsEl.innerHTML = "";
  for(let i=0;i<5;i++){
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = "ï¼";
    div.addEventListener("click", () => flipOne(div));
    cardsEl.appendChild(div);
  }
}
function flipOne(div){
  const gold = Math.random() < 0.18;
  div.textContent = gold ? "G" : "Â·";
  div.classList.toggle("gold", gold);
  score += gold ? 3 : 1;
  scoreEl.textContent = String(score);
  $("#plays").textContent = bump(playsKey, 1);
}
flipBtn.addEventListener("click", () => {
  renderCards();
});
renderCards();

// ===== AI caption generator (simple local template) =====
const genBtn = $("#genBtn");
genBtn.addEventListener("click", () => {
  const kw = ($("#kw").value || "").trim();
  const seeds = [
    "ä»å¤©ä¸èµ¶è·¯ï¼åªæå¿æ¾æ¢ä¸ç¹ã",
    "æç­ç±èå¨ç»èéï¼é£ä¼æ¿æè¯´ã",
    "å¤è²å¾æ¸©æï¼åå¥½éååºåã",
    "å«æ¥ï¼ç­æ¡å¨è·¯ä¸ã",
    "æä¸çè°æéé³ï¼å¬è§èªå·±ã"
  ];
  const pick = seeds[Math.floor(Math.random()*seeds.length)];
  const out = kw
    ? `å³é®è¯ã${kw}ãï½${pick} #çæ´»è®°å½ #æ°å´æ`
    : `${pick} #çæ´»è®°å½ #æ°å´æ`;
  $("#out").textContent = out;
});

// ===== Reaction time demo =====
let rtTimer = null;
let rtStartAt = 0;
let rtState = "idle";
const rtStart = $("#rtStart");
const rtBox = $("#rtBox");

rtStart.addEventListener("click", () => {
  if(rtState === "wait" || rtState === "go") return;
  rtState = "wait";
  rtBox.textContent = "åå¤â¦çå° GO ç«å»ç¹è¿éï¼";
  rtBox.style.borderStyle = "dashed";
  const delay = 800 + Math.random() * 2000;
  rtTimer = setTimeout(() => {
    rtState = "go";
    rtStartAt = performance.now();
    rtBox.textContent = "GO!";
    rtBox.style.borderStyle = "solid";
  }, delay);
});

rtBox.addEventListener("click", () => {
  if(rtState === "wait"){
    clearTimeout(rtTimer);
    rtState = "idle";
    rtBox.textContent = "å¤ªæ©äºð åè¯ä¸æ¬¡";
    return;
  }
  if(rtState === "go"){
    const ms = Math.round(performance.now() - rtStartAt);
    rtState = "idle";
    rtBox.textContent = `ååºï¼${ms} msï¼è¶å°è¶å¼ºï¼`;
    $("#plays").textContent = bump(playsKey, 1);
  }
});

// ===== Modal + mock purchase =====
const modal = $("#modal");
const openModal = $("#openModal");
const closeModal = $("#closeModal");
const modalBuy = $("#modalBuy");
const buyBtn = $("#buyBtn");

function showModal(){
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}
function hideModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}
openModal.addEventListener("click", showModal);
closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", (e) => { if(e.target === modal) hideModal(); });

function mockBuy(){
  localStorage.setItem("isPro","1");
  alert("â æ¨¡æå¼éæåï¼(æ¬å°) ä½ ç°å¨å¯ä»¥æâProå¥å£/å»å¹¿åâåæçå®åè½ã");
  hideModal();
}
modalBuy.addEventListener("click", mockBuy);
buyBtn.addEventListener("click", mockBuy);

$("#contactBtn").addEventListener("click", () => {
  alert("ä½ å¯ä»¥å¨ footer æ¾ Telegram/WhatsApp èç³»æ¹å¼ï¼åè§åä¼å/åä½ï¼ã");
});
