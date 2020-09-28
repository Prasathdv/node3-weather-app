// console.log('This is client side js');

const formInput = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// add event listner
formInput.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    // fetch weather data from the /weather url and dump it into client side console using fetch function(js fucntion)
        const weatherUrl = 'http://localhost:3000/weather?address='+ location
        fetch(weatherUrl).then((response)=>{
            
            response.json().then((data)=>{
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.result
                }
                
            })
        })
})