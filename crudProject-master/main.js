
const update = document.querySelector('#update-button');
const deletebutton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message'); 


update.addEventListener('click' ,_ =>{


    fetch('quotes'
    ,{
        method :'put' ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'gharib',
            quote: 'hello people'
          })
        })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        console.log(response)
      })
}) 

deletebutton.addEventListener('click' , _ => {
    
    fetch('quotes'
    ,{
        method :'delete' ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'mohamed',
            
          })
        })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
        messageDiv.textContent = 'No mohamed quote to delete'
        } else {
        window.location.reload(true)
}})
        .catch({})
        })
