let alarms=[];
const selectMenu = document.querySelectorAll("select");
const currTime = document.querySelector("h1");
const setAlarmBtm =document.querySelector("button");
const content= document.querySelector('.content');
const alarmList = document.getElementById('list');
const alarmCounter= document.getElementById('alarms-counter');



let ringer=true;
let isAlarmSet=false,
ring =new Audio("./assets/Alarm.mp3");

//options for the dropdown
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

// clock checks time every second
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

    //alarm time 
    currTime.innerText =`${h}:${m}:${s} ${ampm}`;
    for(let i=0;i<alarms.length;i++){
        if(alarms[i].text== `${h}:${m} ${ampm}` && ringer){
            ring.play();
            ring.loop=true;
            content.classList.add("disabled");
            setAlarmBtm.innerText="Clear Alarm";
            isAlarmSet=true;
            setAlarmBtm.style.backgroundColor='red';
        }
    }

},1000);

// function to set alarm
function setAlarm(){
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
        
    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please, select a valid time to set Alarm!");
    }
    const alarm={
        text:time,
        id:Date.now().toString()   
    }
    addAlarm(alarm);

}
// adds alarm to the alarms list
function addAlarm(alarm){
    alarms.push(alarm);
    renderList();
}

// function to add the list of alarms to DOM
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

// function to render the list of alarms
function renderList() {
    alarmList.innerHTML='';

    for(let i=0;i<alarms.length;i++){
        addAlarmToDOM(alarms[i]);
    }
    alarmCounter.innerHTML=alarms.length;
}

// function to clear alarm/ disable alarm
function disableAlarm(){
    let date =new Date();
    ringer=false;
    let s=(60 - date.getSeconds())*1000;
    setInterval(()=>{
        ringer= true;
    },s);
    ring.pause();
    content.classList.remove("disabled");
    setAlarmBtm.innerText="Set Alarm";
    setAlarmBtm.style.backgroundColor='#4a98f7';
    return isAlarmSet=false;
}

// function to delete the alarm from the list
function deleteAlarm(alarmId){
    console.log(alarmId);
    const newAlarms = alarms.filter((alarm)=>{
        return alarm.id!==alarmId;
    });
    alarms=newAlarms;
    renderList();
}

// event listener added to the document...
document.addEventListener('click',(e)=>{
    const target= e.target;
    if(target.className == 'fa-solid fa-trash' ){
        const alarmId= target.dataset.id;
        deleteAlarm(alarmId);
    }else if(target.className == 'button'){

        if(isAlarmSet){
            disableAlarm(); 
            return;  
        }
        setAlarm();
    }
});