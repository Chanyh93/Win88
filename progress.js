// progress.js — 留存 & VIP 公用逻辑（本地版）
function todayKey(){
  return new Date().toISOString().slice(0,10);
}

export function getCoin(){
  return Number(localStorage.getItem("coin") || 1000);
}
export function setCoin(v){
  localStorage.setItem("coin", String(v));
}
export function addCoin(n){
  const v = getCoin() + n;
  setCoin(v);
  return v;
}

export function getVIP(){
  return Number(localStorage.getItem("vip") || 0);
}

// ===== 每日签到 =====
export function canCheckin(){
  return localStorage.getItem("last_checkin") !== todayKey();
}
export function doCheckin(){
  if(!canCheckin()) return { ok:false, msg:"今天已经签到过了" };
  const vip = getVIP();
  const bonus = vip===3 ? 1500 : vip===2 ? 900 : vip===1 ? 500 : 300;
  addCoin(bonus);
  localStorage.setItem("last_checkin", todayKey());
  return { ok:true, bonus };
}

// ===== 每日任务（按“今日次数”发奖励）=====
function getDailyCount(key){
  const k = `${key}_${todayKey()}`;
  return Number(localStorage.getItem(k) || 0);
}
function incDailyCount(key, n=1){
  const k = `${key}_${todayKey()}`;
  const v = getDailyCount(key) + n;
  localStorage.setItem(k, String(v));
  return v;
}

export function onPlay(gameKey){
  // 记录今日游玩次数
  const plays = incDailyCount(`plays_${gameKey}`, 1);

  // 任务：每日玩满 10 次（任意游戏各自算）
  const vip = getVIP();
  const target = 10;
  const reward = vip===3 ? 1200 : vip===2 ? 700 : vip===1 ? 400 : 250;

  const claimedKey = `claimed_${gameKey}_${todayKey()}`;
  const claimed = localStorage.getItem(claimedKey) === "1";

  let task = { plays, target, claimed, reward, got:0 };

  if(plays >= target && !claimed){
    addCoin(reward);
    localStorage.setItem(claimedKey, "1");
    task.claimed = true;
    task.got = reward;
  }
  return task;
}

// ===== VIP 权益参数（用来影响“更爽体验”）=====
export function vipParams(){
  const vip = getVIP();
  // costFactor：VIP 越高，每局“成本”越低（更爽）
  // winBoost：VIP 越高，派彩略提高（娱乐体验）
  if(vip===3) return { costFactor:0.7, winBoost:1.15 };
  if(vip===2) return { costFactor:0.8, winBoost:1.10 };
  if(vip===1) return { costFactor:0.9, winBoost:1.05 };
  return { costFactor:1.0, winBoost:1.00 };
}
