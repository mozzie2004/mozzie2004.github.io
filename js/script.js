window.addEventListener('DOMContentLoaded', ()=>{
    'use strict';

    const hamburger = document.querySelector('.hamburger'),
    close = document.querySelector('.menu__close'),
    menu = document.querySelector('.menu'),
    overley = document.querySelector('.menu__overlay');

    hamburger.addEventListener('click', ()=>{
        menu.classList.add('active');
    });

    close.addEventListener('click', ()=>{
        menu.classList.remove('active');
    });

    overley.addEventListener('click', ()=>{
        menu.classList.remove('active');
    });

    
    // form 

    

    async function postForm(url='', data={}){
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });
    
        return await response.text();
    }

    const form = document.querySelector('form'),
        spinner = document.querySelector('.lds-ellipsis'),
        content = document.querySelector('.contacts__content');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let path = 'php/server.php';
        if (window.navigator.language.slice(0, 2) === 'ru') {
             path = '../php/server.php';
        } 
        spinner.classList.remove('lds-ellipsis_hidden');
        const formData = new FormData(form);
        postForm(path, formData)
        .then(res=>{
            spinner.classList.add('lds-ellipsis_hidden');
            const div = document.createElement('div');
            if(res==='success') {
               div.classList.add('message_ok');
               content.append(div);
               div.textContent = 'Ваше повідомлення відправлене';
               setTimeout(()=>{
                    div.remove();
               }, 3000);
               
            }else {
                div.classList.add('message_er');
                content.append(div);
                div.textContent = 'Спробуйте пізніше';
               setTimeout(()=>{
                    div.remove();
               }, 3000);
            }
        })
        .catch(err=>{
            spinner.classList.add('lds-ellipsis_hidden');
            const divEr = document.createElement('div');
            divEr.classList.add('message_er');
                content.append(divEr);
                divEr.textContent = 'Спробуйте пізніше1';
               setTimeout(()=>{
                    divEr.remove();
               }, 3000);
        })
    })

})

