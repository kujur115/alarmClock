const selectMenu = document.querySelectorAll("select");
const currTime = document.querySelector("h1");
const setAlarmBtm =document.querySelector("button");
const content= document.querySelector('.content');

let alarmTime,isAlarmSet=false,
ring =new Audio("./assets/Alarm.mp3");

for(let i=12;i>0;i--){
    i= i<10 ? "0"+i : i;
    let option =`<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59;i>=0;i--){
    i= i<10 ? "0"+i : i;
    let option =`<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=2;i>0;i--){
    let ampm= i==1 ? "AM": "PM";
    let option =`<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(()=>{
    let date =new Date(),
    h=date.getHours(),
    m=date.getMinutes(),
    s=date.getSeconds(),
    ampm="AM";

    if(h>=12){
        h=h-12;
        ampm ="PM"
    }

    h= h==0 ? 12 : h;

    h= h<10 ? "0"+h : h;
    m= m<10 ? "0"+m : m;
    s= s<10 ? "0"+s : s;

    currTime.innerText =`${h}:${m}:${s} ${ampm}`;
    if(alarmTime== `${h}:${m} ${ampm}` ){
        ring.play();
        ring.loop=true;
        // console.log("ringing")
    }

},1000);


setAlarmBtm.addEventListener('click', ()=>{
    if(isAlarmSet){
        alarmTime="";
        ring.pause();
        content.classList.remove("disabled");
        setAlarmBtm.innerText="Set Alarm";
        return isAlarmSet=false;
    }


    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    console.log(`${time}`);

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please,select a valid time to set Alarm!");
    }
    alarmTime =time;
    content.classList.add("disabled");
    setAlarmBtm.innerText="Clear Alarm";
    isAlarmSet=true;
});