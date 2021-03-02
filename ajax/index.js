const xhr =new XMLHttpRequest()
const container = document.querySelector('.container')
container.style.cursor = 'pointer'
xhr.open('get','https://jsonplaceholder.typicode.com/users')
xhr.send()
xhr.addEventListener('load',renderUsers)
let div
function renderUsers(){
    let fragment = document.createDocumentFragment()
    let response = JSON.parse(xhr.responseText)
    console.log(response)
    response.forEach(user=>{
         div = document.createElement('div')
        div.textContent = user.name
        div.classList.add('card')
        div.id = user.id
        fragment.appendChild(div)
        container.appendChild(fragment)
       
    })
    container.addEventListener('click',({target})=>{
        if(target.classList.contains('card')){
            id = target.id
            let takeUser = response.filter((item)=>{
               return item.id == id
            })
            
           div.style.marginTop = '20px'
           div.innerHTML = `
           <div>Name: ${takeUser[0].name}</div>
           <div>Id: ${takeUser[0].id}</div>
           <div>username: ${takeUser[0].username}</div>
           <div>email: ${takeUser[0].email}</div>
           <div>${takeUser[0].address.street}</div>
           `;
        }
    })
}