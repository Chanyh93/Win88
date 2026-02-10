import { getCoin, setCoin, doCheckin } from "./progress.js";

let coin = getCoin();
update();

function update(){
  const el = document.getElementById("coin");
  if(el) el.innerText = coin;
  setCoin(coin);
}

window.addCoin = function(){
  coin += 500;
  update();
  alert("充值成功 +500（娱乐币）");
}

window.checkin = function(){
  const r = doCheckin();
  coin = getCoin();
  update();
  alert(r.ok ? `✅ 签到成功 +${r.bonus}` : r.msg);
}

window.openGame = function(type){
  if(type==="baccarat") location.href="baccarat.html";
  if(type==="slot") location.href="slot.html";
  if(type==="crash") location.href="crash.html";
}
