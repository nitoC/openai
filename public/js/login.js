let id = document.getElementById('no-status')
let child = id.firstElementChild
let form = document.getElementById('form')
let valid = document.getElementById('valid')
let formElement = document.getElementById('form-element')

if (formElement.value === true || formElement.value ==='true'){
    valid.click();
}


window.addEventListener('DOMContentLoaded',()=>{
    console.log("loaded")
    setTimeout(() => {
        child.innerHTML = ''
    }, 2000);
})