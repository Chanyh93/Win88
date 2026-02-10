let coin = Number(localStorage.getItem("coin") || 1000);
update();

function update(){
  document.getElementById("coin").innerText = coin;
  localStorage.setItem("coin", coin);
}

function addCoin(){
  coin += 500;
  update();
  alert("充值成功 +500（娱乐币）");
}

function openGame(type){
  if(type === "baccarat"){
    window.location.href = "baccarat.html";
  }
  if(type === "slot"){
    window.location.href = "slot.html";
  }
  if(type === "crash"){
    window.location.href = "crash.html";
  }
}

function goReal(){
  alert("这里将放 BK8 / WE1WIN 联盟链接（STEP 4）");
}
