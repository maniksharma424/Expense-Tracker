let IncCard = document.getElementById('inc-card')
let ExpCard = document.getElementById('exp-card')
let IncInputAmount = document.getElementById("INC-input-amount")
let IncInputDescription = document.getElementById("INC-input-description")
let ExpInputAmount = document.getElementById("EXP-input-amount")
let ExpInputDescription = document.getElementById("EXP-input-description")
let IncomeValue = document.getElementById("income-value")
let ExpenseValue = document.getElementById("expense-value")
let UlEl = document.getElementById("ul-el")
let ClearBtn = document.getElementById('clear-button')
let NewMonthBtn = document.getElementById('new-month-btn')
let arr=[]
const date = new Date()
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()


function RotateINC(){
    IncCard.style.transform = 'rotateY(180deg)'
}
function RotateEXP(){
    ExpCard.style.transform = 'rotateY(180deg)'
}
function AddIncome(){

    
    if(IncInputDescription.value === '' ){
        IncInputDescription.placeholder = "Please add description"
    }
    if(IncInputAmount.value === '' ){
        IncInputAmount.placeholder = "Please add amount"
    }
    else{
    arr.push({'amount':`${IncInputAmount.value}`,
    'description':`${IncInputDescription.value}`,
'type':`income`})
    renderlist(arr)
    
    localStorage.setItem('listitems',JSON.stringify(arr))
    

    updateAdd(IncomeValue,parseInt(IncInputAmount.value))

    IncCard.style.transform = 'rotateY(0deg)'
    IncInputAmount.value = ''
    IncInputDescription.value = ''

}}

function AddExpense(){
    if(ExpInputAmount.value ==='' && ExpInputDescription.value === '' ){
        ExpInputAmount.placeholder = "Please add amount"
        ExpInputDescription.placeholder = "Please add description"
    }
    if(ExpInputAmount.value === ''){
        ExpInputAmount.placeholder = "Please add amount"
        
    }
    if(ExpInputDescription.value === ''){
        ExpInputDescription.placeholder = "Please add description"
    }
   else{arr.push({'amount':`${ExpInputAmount.value}`,
    'description':`${ExpInputDescription.value}`,
'type':`expense`})

    renderlist(arr)

    localStorage.setItem('listitems',JSON.stringify(arr))

    updateAdd(ExpenseValue,parseInt(ExpInputAmount.value))
    

    ExpCard.style.transform = 'rotateY(0deg)'
    ExpInputDescription.value = ''
    ExpInputAmount.value = ''
}}
function updateAdd(obj,number){
   let PrintValue =  parseInt(obj.textContent) + number
    if(obj.id === 'expense-value'){
        localStorage.setItem('moneyexpense',JSON.stringify(PrintValue))
    }
    if(obj.id === 'income-value'){
   localStorage.setItem('moneyincome',JSON.stringify(PrintValue))}
   renderValue(obj,PrintValue);
}
/*function updateDelete(obj,number){
    let PrintValue = parseInt(obj.textContent) - number
    localStorage.setItem('moneyexpense',JSON.stringify(PrintValue))
    
    renderValue(obj,PrintValue)
}*/

let ItemFromLocalStorage = JSON.parse(localStorage.getItem('listitems'))

if(ItemFromLocalStorage){
    arr = ItemFromLocalStorage
    renderlist(arr)
}
let IncomeMoneyLocalStorage = JSON.parse(localStorage.getItem('moneyincome'))
let ExpenseMoneyLocalStorage = JSON.parse(localStorage.getItem('moneyexpense'))
if(IncomeMoneyLocalStorage){
    renderValue(IncomeValue,IncomeMoneyLocalStorage)
}
if(ExpenseMoneyLocalStorage){
    renderValue(ExpenseValue,ExpenseMoneyLocalStorage)
}
function renderValue(obj,aray){
    
    obj.innerHTML = `${aray}`
}

function renderlist(array){
    let addhtml = ''
    for(let i=0; i<array.length; i++){
        if(array[i].type === 'income'){
    addhtml = addhtml+ `
    <li id="li-el">
        <div class="ulel-discription">${array[i].description}<h6 style="color: hsl(31, 77%, 52%);" >(${day} - ${month} - ${year})</h6></div>
        <div class="ulel-amount">$${array[i].amount}</div>
        <div style="background-color: hsl(31, 77%, 52%);" class="ulel-color"></div>
    </li>`
    }
    if(array[i].type === 'expense'){
        addhtml = addhtml+ `
    <li id="li-el">
        <div class="ulel-discription">${array[i].description}<h6 style="color: hsl(184, 100%, 22%);">(${day} - ${month} - ${year})</h6></div>
        <div class="ulel-amount">$${array[i].amount}</div>
        <div style="background-color: hsl(184, 100%, 22%);" class="ulel-color"></div>
    </li>`
    }
    }
    UlEl.innerHTML = addhtml
}
ClearBtn.addEventListener('click',()=>{
    UlEl.innerHTML = ''
    localStorage.removeItem('listitems')
})
NewMonthBtn.addEventListener('click',()=>{
    localStorage.removeItem('moneyincome')
    localStorage.removeItem('moneyexpense')
    IncomeValue.innerHTML = '0'
    ExpenseValue.innerHTML = '0'
})
