// slider
const slider = tns({
    container: '.carousel__slider',
    items: 1,
    center: true,
    controls: false,
    nav: false,
    mouseDrag: true,
    autoHeight: true
});

document.querySelector('.carousel__left').addEventListener('click', ()=>{
    slider.goTo('prev');
});
document.querySelector('.carousel__right').addEventListener('click', ()=>{
    slider.goTo('next');
});

// Tabs 
const tabs = document.querySelectorAll('.catalog__tab');
const contents = document.querySelectorAll('.catalog__content');
tabs.forEach((item, i)=>{
    item.addEventListener('click', ()=>{
        tabs.forEach(item=>{
            item.classList.remove('catalog__tab_active');
        });
        contents.forEach(item=>{
            item.classList.add('catalog__content_hiden');
        });
        tabs[i].classList.add('catalog__tab_active');
        contents[i].classList.remove('catalog__content_hiden');
    });
});

const cartMain =  document.querySelectorAll('.cart__main');
const cartBack = document.querySelectorAll('.cart__wrapper-list');

function toggleCart(triger){
    document.querySelectorAll(triger).forEach((item, i)=>{
        item.addEventListener('click', (e)=>{
            e.preventDefault();
            cartMain[i].classList.toggle('cart__main_active');
            cartBack[i].classList.toggle('cart__wrapper-list_active');
            })
        
    });
}
toggleCart('.cart__link');
toggleCart('.cart__link-back');

//modal

const btnsConsultation = document.querySelectorAll("button[data-modal='consultation']");
const btnMini = document.querySelectorAll('.button_mini');
const cartTitles = document.querySelectorAll('.cart__title');
function openModal(trigger, popupID, mini=false){
    trigger.forEach((item, i)=>{
        item.addEventListener('click', (e)=>{
            e.preventDefault();
            if (mini) {
                (document.querySelectorAll('.popup__subtitle'))[1].textContent=cartTitles[i].textContent;
                
            }
            document.querySelector(popupID).classList.remove('popup_hidden');
            document.body.style.overflow = 'hidden';
        })
    });
}

openModal(btnsConsultation, '#consultation');
openModal(btnMini, '#order', true);

const btnClose = document.querySelectorAll('.popup__close');
const overlay = document.querySelectorAll('.popup');
   
    btnClose.forEach(item=>{
        item.addEventListener('click', ()=>{
            overlay.forEach(modal=>{
                modal.classList.add('popup_hidden');
            });
            document.body.style.overflow = '';
        })
    })

    overlay.forEach(item=>{
        item.addEventListener('click', (e)=>{
            if (e.target.classList.contains('popup')){
                item.classList.add('popup_hidden');
                document.body.style.overflow = '';
            }
        })
    });


    // server 

    const form = document.querySelectorAll('form');
    form.forEach((item, i)=>{
        item.addEventListener('submit', (e)=>{
            e.preventDefault();
            const formData = new FormData(item);
            const spiner = document.querySelectorAll('.lds-dual-ring');
            spiner[i].classList.remove('lds-dual-ring_hidden');
            postForm('php/server.php', formData)
            .then(res=>{
                spiner[i].classList.add('lds-dual-ring_hidden');
                item.reset();
                document.querySelectorAll('.popup').forEach(pop=>{
                    pop.classList.add('popup_hidden');
                })
                if(res=='success'){
                    document.querySelector('#thanks .popup__form').innerHTML='<div class="popup__title">Спасибо за вашу заявку!</div> <div class="popup__subtitle">Наш менеджер свяжется с вами в ближайшее время!</div>';
                    document.querySelector('#thanks').classList.remove('popup_hidden');
                    document.body.style.overflow = 'hidden';
                }else{
                    document.querySelector('#thanks .popup__form').innerHTML='<div class="popup__title">Сервер не роботает</div>';
                    document.querySelector('#thanks').classList.remove('popup_hidden');
                    document.body.style.overflow = 'hidden';
                }
            })
            .catch(er=>{
                spiner[i].classList.add('lds-dual-ring_hidden');
                item.reset();
                document.querySelectorAll('.popup').forEach(pop=>{
                    pop.classList.add('popup_hidden');
                })
                document.querySelector('#thanks').classList.remove('popup_hidden');
                document.querySelector('#thanks .popup__form').innerHTML='<div class="popup__title">Сервер не роботает</div>';
                document.body.style.overflow = 'hidden';
            })
        })
    })

    async function postForm(url='', data={}){
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });
    
        return await response.text();
    }
 
