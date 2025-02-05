var select=document.querySelectorAll(".first-select, .sec-select");
var btn=document.getElementById("b-t-n");
var input=document.querySelector(".first-input");
fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
.then(res=>displayDropDown(res));

function displayDropDown(res){
    let curr=Object.entries(res)  //res json object convert into array of key value pair
    //we get array
    for(let i=0;i<curr.length;i++){
        let opt=`<option value="${curr[i][0]}">${curr[i][0]}</option>`
        // console.log(opt)
        select[0].innerHTML+=opt;
        select[1].innerHTML+=opt;
    }
}
btn.addEventListener("click",()=>{
    let curr1=select[0].value;
    let curr2=select[1].value;
    let inputval=input.value;
    if(curr1===curr2){
        alert("Choose different currencies");
    }
    else{
        convert(curr1,curr2,inputval);
    }
});
function convert(curr1,curr2,inputval){
    const host = 'api.frankfurter.app';
   fetch(`https://${host}/latest?amount=${inputval}&from=${curr1}&to=${curr2}`)
  .then(resp => resp.json())
  .then((data) => {
    document.querySelector(".sec-input2").value=Object.values(data.rates)[0]
  });
}