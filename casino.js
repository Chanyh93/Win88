import { getCoin, setCoin, doCheckin, getVIP } from "./progress.js";

let coin = getCoin();
let showBalance = true;

function fmtMYR(v){
  // 这里是“娱乐币”显示成 MYR 样式，仅 UI（不是真钱）
  // 你想更像截图就保留 2 位小数
  return (v / 1000).toFixed(2);
}

function update(){
  const bal = document.getElementById("balanceText");
  if(bal){
    bal.textContent = showBalance ? fmtMYR(coin) : "•••";
  }
  const sheetBal = document.getElementById("sheetBalance");
  if(sheetBal) sheetBal.textContent = showBalance ? `MYR ${fmtMYrLabel()}` : "Hidden";

  const sheetVip = document.getElementById("sheetVip");
  if(sheetVip) sheetVip.textContent = getVIP() ? `VIP ${getVIP()}` : "Normal";

  const sheetDay = document.getElementById("sheetDay");
  if(sheetDay) sheetDay.textContent = new Date().toLocaleDateString();
  setCoin(coin);
}
function fmtMYrLabel(){ return fmtMYR(coin); }

update();

// ===== 供 HTML onclick 调用 =====
window.openGame = function(type){
  if(type==="baccarat") location.href="baccarat.html";
  if(type==="slot") location.href="slot.html";
  if(type==="crash") location.href="crash.html";
}

window.topup = function(){
  // 娱乐币 Top Up（不是真钱）
  coin += 500;
  update();
  alert("Top Up +500（娱乐币）");
}

window.restore = function(){
  // 恢复到初始值（演示）
  coin = 1000;
  update();
  alert("已 Restore（演示）");
}

window.sync = function(){
  coin = getCoin();
  update();
  alert("Sync OK");
}

window.toggleBalance = function(){
  showBalance = !showBalance;
  update();
}

window.checkin = function(){
  const r = doCheckin();
  coin = getCoin();
  update();
  alert(r.ok ? `✅ Check-in +${r.bonus}` : r.msg);
}
