// const alarmTime=[];
let alarms=[];
const selectMenu = document.querySelectorAll("select");
const currTime = document.querySelector("h1");
const setAlarmBtm =document.querySelector("button");
const content= document.querySelector('.content');
const alarmList = document.getElementById('list');
const alarmCounter= document.getElementById('alarms-counter');
const trash=document.querySelectorAll('.trash i');



let ringer=true;
let isAlarmSet=false,
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
    for(let i=0;i<alarms.length;i++){
        if(alarms[i].text== `${h}:${m} ${ampm}` && ringer){
            ring.play();
            ring.loop=true;
            content.classList.add("disabled");
            setAlarmBtm.innerText="Clear Alarm";
            isAlarmSet=true;
            // console.log("ringing")
        }
    }

},1000);


setAlarmBtm.addEventListener('click', ()=>{
    if(isAlarmSet){
        // alarmTime="";
        let date =new Date();
        ringer=false;
        let s=(60 - date.getSeconds())*1000;
        console.log(s);
        setInterval(()=>{
            ringer= true;
        },s);
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
    const alarm={
        text:time,
        id:Date.now().toString(),
        done:false
        
    }
    // alarmTime.push(alarm);
    addAlarm(alarm);
   
});
function addAlarm(alarm){
    console.log(alarm);
    alarms.push(alarm);
    renderList();
}

function addAlarmToDOM(alarm){
    const li=document.createElement('li');
    li.innerHTML=`
            <div>
                <h4>Alarm</h4>
                <p>${alarm.text}</p>
            </div>
            <div class="trash">
            <i class="fa-solid fa-trash" data-id="${alarm.id}"></i></div>
    `;
 alarmList.append(li);
}

function renderList() {
    alarmList.innerHTML='';


    for(let i=0;i<alarms.length;i++){
        console.log(alarms[i],'renderlist');
        addAlarmToDOM(alarms[i]);
    }
    alarmCounter.innerHTML=alarms.length;
}

// for(let i=0;i<trash.length;i++){
//     trash[i].style.color='red';
    document.addEventListener('click',(e)=>{
        const target= e.target;
        console.log(target);
        if(target.className == 'fa-solid fa-trash' ){
        const alarmId= target.dataset.id;
        console.log(`alarmId:${alarmId}`);
        deleteAlarm(alarmId);
        }
    });
// }

function deleteAlarm(alarmId){
    console.log(alarmId);
    const newAlarms = alarms.filter((alarm)=>{
        // console.log(alarm.id!==alarmId);
        
        return alarm.id!==alarmId;
    });
    alarms=newAlarms;
    renderList();
}