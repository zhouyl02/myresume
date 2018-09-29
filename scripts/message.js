var APP_ID = '0VAuKp3wsXq2JjOyGI2HP1ur-gzGzoHsz';
var APP_KEY = '3Jl6NxSS5n1J9auG6cbz6CMJ';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message');
query.find().then(function (messages) {
    let array = messages.map((item) => item.attributes)    
    array.forEach((item) => {
        let li = document.createElement('li')
        li.innerText = `${item.name}: ${item.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
    })
}, function (error) {
    console.log('提交失败, 请改天再留言')
});

let myForm = document.querySelector('#postMessageForm')
myForm.addEventListener('submit', function (e){
    e.preventDefault()
    let content=myForm.querySelector('input[name=content]').value
    let name=myForm.querySelector('input[name=name]').value
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'name': name ,
        'content': content
      }).then(function(object) {
        let li = document.createElement('li')
        if(object.attributes.name !== '' && object.attributes.content !== '') {
            li.innerText = `${object.attributes.name}: ${object.attributes.content}`
            let messageList = document.querySelector('#messageList')
            messageList.appendChild(li)
            myForm.querySelector('input[name=content]').value = ''
            myForm.querySelector('input[name=name]').value = ''
        }
    })
})

