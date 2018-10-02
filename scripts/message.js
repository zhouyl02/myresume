! function (){
    var view = document.querySelector('section.message')

    var model ={
        //初始化数据
        init: function(){
            var APP_ID = '0VAuKp3wsXq2JjOyGI2HP1ur-gzGzoHsz';
            var APP_KEY = '3Jl6NxSS5n1J9auG6cbz6CMJ';    
            AV.init({ appId: APP_ID, appKey: APP_KEY });            
        },
        // 获取数据
        fetch: function(){
            var query = new AV.Query('Message')
            return query.find()  // Promise 对象
        },
        // 新建数据
        save: function(name, content){
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({  // Promise 对象
                'name': name ,
                'content': content
            })
        }
    }

    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function(view,model){
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')
            this.form = myForm = view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },        
        loadMessages: function(){
            this.model.fetch().then( (messages) => {
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
        },
        bindEvents: function(){            
            this.form.addEventListener('submit', function (e){
                e.preventDefault()
                this.saveMessage()               
            }.bind(this))   // 用bind将this绑定到 funtion 里面
        },
        saveMessage: function(){
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            this.model.save(name, content).then(function(object) {
                let li = document.createElement('li')
                if(object.attributes.name !== '' && object.attributes.content !== '') {
                    li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                    let messageList = document.querySelector('#messageList')
                    messageList.appendChild(li)
                    myForm.querySelector('input[name=content]').value = ''
                    myForm.querySelector('input[name=name]').value = ''
                }
            })
        }
    }
    
    controller.init(view, model) 

}.call()

