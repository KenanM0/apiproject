let write1=document.querySelectorAll('.containersol .selection label');
let write2=document.querySelectorAll('.containersag .selection label');
let posting=document.getElementById('posting');
let getting=document.getElementById('getting');
let textGetting = document.querySelector(".text_getting");
let textPosting = document.querySelector(".text_posting");
var main1=document.getElementById('EUR1').value;
var main2=document.getElementById('USD2').value;
eventListeners();
function eventListeners() {
  getting.addEventListener("keyup", checkDataByFrom);
  posting.addEventListener("keyup", checkDataByTo);
}

write1.forEach((select) => {
    select.addEventListener('click',(e)=>{
        main1=event.target.innerText
        console.log(main1)
        checkDataByTo()
    })
})
write2.forEach((select) => {
    select.addEventListener('click',(e)=>{
        main2=event.target.innerText
        console.log(main2)
        checkDataByFrom()
    })
})
async function checkDataByFrom() {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${main1}&symbols=${main2}`);
  const data = await res.json();
  posting.value =( Object.values(data.rates)[0] * getting.value).toFixed(2);
  if (main1&&main2){
 textGetting.innerHTML = `1 ${data.base} = ${Object.values(data.rates)[0].toFixed(5)} ${Object.keys(data.rates)}`;
 textPosting.innerHTML= `1 ${Object.keys(data.rates)} = ${(1/Object.values(data.rates)[0]).toFixed(5)} ${data.base}`;
}
}
async function checkDataByTo() {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${main1}&symbols=${main2}`);
  const data = await res.json();
  getting.value = (posting.value / Object.values(data.rates)[0]).toFixed(4);
}