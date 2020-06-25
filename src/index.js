let addToy = false;

document.addEventListener("DOMContentLoaded", (e) => {
  fetch ("http://localhost:3000/toys")
  .then (function (resp){
    return resp.json()
  }) 
  .then (function(json){
    console.log(json)
    toyList(json)
  })
  

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", (e) => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    
  
    
  });

});

document.addEventListener("submit", (e) => {
  e.preventDefault()
  if (e.target.className === "add-toy-form"){
    formHandler()

  
  }
  function formHandler(){
    const addToyForm = e.target
    let newToy = {name: `${addToyForm.name.value}`, image: `${addToyForm.image.value}`, likes: `0`}
  
     postToy(newToy)
    console.log(newToy)
  }

  function postToy(toyObject){
    fetch ("http://localhost:3000/toys",{
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       Accept: "application/json"
      },

      body: JSON.stringify(toyObject)
    })
  }

})

function toyList(json){
  json.forEach(toyObject => {
    addToys(toyObject)
  })
}
function addToys(toyObj){
  const addDiv = document.createElement("div")
  addDiv.className = "card"
  addDiv.innerHTML = `<h2> ${toyObj.name}</h2><br><img class="toy-avatar" src="${toyObj.image}"/><p> ${toyObj.likes}</p><button class="like-btn">Like <3 </button>`

  document.getElementById('toy-collection').append(addDiv)

}

addLike()

function addLike(){
  document.addEventListener("click", (e) => {

    if (e.target.className === "like-btn"){
    let div = e.target.closest("div")
    let p = div.childNodes[3]
    
    let likes = p.textContent

    let likeCount = parseInt(likes) +1

    p.innerHTML = likeCount
  

    console.log()
    }
  })
}
 

