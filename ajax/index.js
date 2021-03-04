
const xhr =new XMLHttpRequest()
const container = document.querySelector('.container')
container.style.cursor = 'pointer'

xhr.open('get','https://jsonplaceholder.typicode.com/users')
xhr.send()
xhr.addEventListener('load',renderUsers)

function renderUsers(){
    let fragment = document.createDocumentFragment()
    
    text = document.createElement('div')
    let response = JSON.parse(xhr.responseText)
    response.forEach(user=>{
         div = document.createElement('div')
        div.textContent = user.name
        div.classList.add('card')
        div.classList.add('take')
        div.id = user.id
        fragment.appendChild(div)
        container.appendChild(fragment)
    })
    container.addEventListener('click',({target})=>{
        if(target.classList.contains('take')){
            id = target.id
            let takeUser = response.filter(item=>{
               return item.id == id
            })
            
           text.style.marginTop = '20px'
        text.classList.add('card-header')
        container.appendChild(text)

           text.innerHTML = `
           <div>Name: ${takeUser[0].name}</div>
           
           <div>Id: ${takeUser[0].id}</div>

           <div>username: ${takeUser[0].username}</div>
           <div>email: ${takeUser[0].email}</div>
           <div>${takeUser[0].address.street}</div>
           
           `;
          
           const btn = document.createElement('div')
       btn.innerHTML = `<button class="btn">скрыть</button>`
       text.appendChild(btn)
        
            btn.addEventListener('click',()=>{
                text.remove()
            })
        }
    })
}
// Add person
const addBtn = document.querySelector('.btn-success')
let form = document.forms.person

addBtn.addEventListener('click',()=>{
    let namePerson = form.name.value
    let id = form.id.value
    let userName = form.user_name.value
    let email = form.email.value
    let address = form.address.value
    if(!namePerson || !id || !userName || !email || !address){
        alert('введите значения')
    }else{
        text.remove()
        addPerson(namePerson,id,userName,email,address)
        form.name.value = ''
        form.id.value = ''
        form.user_name.value = ''
        form.email.value = ''
        form.address.value = ''
        
    }
 
})
function addPerson(namePerson,id,userName,email,address){
let obj = {
    id:id,
    name:namePerson,
    username:userName,
    email:email,
    address: {
        street: address
    }
  }
  let jsonObj = JSON.stringify(obj)
let xhr = new XMLHttpRequest()
xhr.open('post','https://jsonplaceholder.typicode.com/users')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
xhr.send(jsonObj)
xhr.addEventListener('load',()=>{
    let fragment = document.createDocumentFragment()
    text = document.createElement('div')
    let ObjParse = JSON.parse(jsonObj)
    div = document.createElement('div')
    div.textContent = ObjParse.name
    div.classList.add('card')
    div.classList.add('take')
    div.id = ObjParse.id
    fragment.appendChild(div)
    container.appendChild(fragment)
    container.addEventListener('click',({target})=>{
        if(target.classList.contains('take')){
            id = target.id
            let response = [ObjParse]
            let takeUser = response.filter(item=>{
                return item.id == id
             })
            
           text.style.marginTop = '20px'
        text.classList.add('card-header')
        container.appendChild(text)

           text.innerHTML = `
           <div>Name: ${takeUser[0].name}</div>
           <div>Id: ${takeUser[0].id}</div>
           <div>username: ${takeUser[0].username}</div>
           <div>email: ${takeUser[0].email}</div>
           <div>${takeUser[0].address.street}</div>
           
           `;
           const btn = document.createElement('div')
       btn.innerHTML = `<button class="btn">скрыть</button>`
       text.appendChild(btn)
        
            btn.addEventListener('click',()=>{
                text.remove()
            })
        }
       
        
    })  

})  
}


