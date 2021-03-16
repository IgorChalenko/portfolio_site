/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function calc() {
    // Clac
  
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    function setLocalSetting(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });  

    }
    setLocalSetting('#gender div', 'calculating__choose-item_active');
    setLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcResult () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_______';
            return;
        }
        if (sex === 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }

    calcResult();

    function getStaticInformation (parentSelector, activClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                
                elements.forEach(elem => {
                    elem.classList.remove(activClass);
                });
                e.target.classList.add(activClass);

                calcResult();
            });
        });

                    
    }
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    
    
    function getDynamicInformation (selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case 'height':
                    height = input.value;
                    break;
                case 'weight':
                    weight = input.value;
                    break;
                case 'age':
                    age = input.value;
                    break;
            }
            calcResult();
        });
        
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}
module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function cards() {
     // Create menuCards

     class MenuCards {
        constructor (src, alt, title, text, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
        }

        changeToUAH () {
            this.price = this.price * this.transfer;
        }

        render () {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add("menu__item");
            } else {
                this.classes.forEach(classList => element.classList.add(classList));
            }
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        
            `;
            this.parent.append(element);
        }
    }

    const getResource = async function (url) {         // создаём функцию-экспрессию для отправки поста
        const res = await fetch (url);                 // в перменную результата записываем фетч 

        if (!res.ok) {                                 // проеряем что если промис пришел с ошибкой
            throw new Error(`Could not be fetch ${url}, status: ${res.status}`);    // выводим мессадж ошибки и статус запроса
        }
        return await res.json();                       // возвращаем результат в формате джейсон

    
    };
    

    getResource('http://localhost:3000/menu')                           // вызываем фетч 
    .then(data => {                                                     // обрабатываем вернувшийся промис
        data.forEach(({img, altimg, title, descr, price}) => {          // в дб находится массив мы его деструктурируем и разбиваем на объекты
            new MenuCards(img, altimg, title, descr, price, ".menu .container").render();   // вызываем новый класс менюкардс и передаём в него параметры, вызываем рендер
        });
    });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function forms() {
    // Forms 

    const forms = document.querySelectorAll('form');
    const message = {
        loading: "icons/spinner.svg",
        success: "Спасибо мы скоро с вами свяжемся",
        failure: "Что-то пошло не так"
    };

        forms.forEach(item => {
            bindPostData(item);
        });
    
    const postData = async function (url, data) {         // создаём функцию-экспрессию для отправки поста
        const res = await fetch(url, {              // в перменную результата записываем фетч и настраеваем его поля
            method: 'POST',                         // функция поста асинхронна и будет ждать выполнения фетча
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();                    // возвращаем результат в формате джсон

    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Отменяем действие перезагрузки

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            
            `;

            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form); // Создаём даные формы

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showModalThanks(message.success);
                statusMessage.remove();
            }).catch(() => {
                showModalThanks(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
}

    function showModalThanks(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal();

        const modalThanks = document.createElement('div');
        modalThanks.classList.add('modal__dialog');
        modalThanks.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">&times;<?div>
                <div class="modal__title">${message}</div>
            </div>
        `;

    document.querySelector('.modal').append(modalThanks);
    setTimeout(() => {
        modalThanks.remove();
        prevModal.classList.add('show');
        prevModal.classList.remove('hide');
        closeModal();
    }, 4000);
}
}
module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function modal() {
    // Modal

    const modalTrigget = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    modalTrigget.forEach(trigger  => {
        trigger.addEventListener('click', openModal);
    });



    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == "") {
            closeModal();

        }
    });
    document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
    });

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    const modalTimerId = setTimeout(openModal, 40000);
    }
    module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 106:0-14 */
/***/ ((module) => {

function slider() {
     // Slider

     const slides = document.querySelectorAll(".offer__slide"),
     prev = document.querySelector(".offer__slider-prev"),
     next = document.querySelector(".offer__slider-next"),
     currentSlide = document.querySelector('#current'),
     totalSlide = document.querySelector('#total'),
     slidesIner = document.querySelector(".offer___slider-inner"),
     slidesWrapper = document.querySelector(".offer__slider-wrapper"),
     width = window.getComputedStyle(slidesWrapper).width;
let sliderNumber = 1;
let ofset = 0;

slidesIner.style.width = 100 * slides.length + '%';
slides.forEach(slide => {
   slide.style.width = width;
});
function notZero (num) {
   if (num >= 0 && num < 10) {
       return `0${num}`;
   } else {
       return num;
   }
}

slidesIner.style.display = 'flex';
slidesWrapper.style.overflow = 'hidden';
slidesIner.style.transition = '0.5s all';
totalSlide.textContent = notZero(slides.length);

function deletNoDiggits (str) {
     return +str.replace(/\D/g, "");
  
} 


function sliderChaner () {
   slidesIner.style.transform = `translateX(-${ofset}px)`;
   currentSlide.textContent = notZero(sliderNumber);
   dotsArray.forEach(dot => dot.style.opacity = '.5');
   dotsArray[sliderNumber - 1].style.opacity = '1';
}

next.addEventListener('click', () => {
   if (ofset == deletNoDiggits(width) * (slides.length - 1)) {
       ofset = 0;
       sliderNumber = 1;
   } else {
       ofset += deletNoDiggits(width);
       sliderNumber++;
   }
   
   sliderChaner();

});
prev.addEventListener('click', () => {
   if (ofset == 0) {
       ofset = deletNoDiggits(width) * (slides.length - 1);
       sliderNumber = slides.length;
   } else {
       ofset -= deletNoDiggits(width);
       sliderNumber--;
   }
   sliderChaner();
   
  
   
});

const offerSlides = document.querySelector('.offer__slider');
const dotsArray = [];
offerSlides.style.position = 'relative';
const dot = document.createElement('ol');
dot.classList.add('carousel-indicators');

offerSlides.append(dot);



   for (let i = 0; i < slides.length; i++) {
      const dots = document.createElement('li');
      dots.setAttribute('current', i + 1);
      dots.classList.add('dot');
      if (i == 0) {
          dots.style.opacity = '1';
      }
      dotsArray.push(dots);
      dot.append(dots);
   }

   dotsArray.forEach(dot => {
       dot.addEventListener('click', (e) => {
          currentDot = e.target.getAttribute('current');
          sliderNumber = currentDot;

          ofset = deletNoDiggits(width) * (currentDot - 1);

          sliderChaner();


       });
   });

}
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function tabs() {
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsPerent = document.querySelector('.tabheader__items');

    function hideTabsContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

            
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabsContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

        
    }

    hideTabsContent();
    showTabsContent();

    tabsPerent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => { 
                if (target == tab) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
    }
    module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

function timer() {
     // Timer

     const dedline = '2020-11-06';

     function getTimeRemaning (endtime) {
         const t = Date.parse(endtime) - Date.parse(new Date()),
             days = Math.floor(t / (1000 * 60 * 60 * 24)),
             hours = Math.floor((t / 1000 * 60 * 60 ) % 24),
             minutes = Math.floor((t / 1000 / 60) % 60),
             seconds = Math.floor((t / 1000) % 60);

             return {
                 'time' : t,
                 "days" : days,
                 'hours' : hours,
                 'minutes' : minutes,
                 'seconds' : seconds
             };

     }

     function notZero (num) {
         if (num >= 0 && num < 10) {
             return `0${num}`;
         } else {
             return num;
         }
     }

     function setClock (selector, endtime) {
         const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             hours = timer.querySelector('#hours'),
             minutes = timer.querySelector('#minutes'),
             seconds = timer.querySelector('#seconds'),
             timerInterval = setInterval(updateTimer, 1000);
         updateTimer();

         function updateTimer () {
             const t = getTimeRemaning(endtime);

             days.innerHTML = notZero(t.days);
             hours.innerHTML = notZero(t.hours);
             minutes.innerHTML = notZero(t.minutes);
             seconds.innerHTML = notZero(t.seconds);

             if (t.time <= 0) {
                 clearInterval(timerInterval);
                 days.innerHTML = notZero(0);
                 hours.innerHTML = notZero(0);
                 minutes.innerHTML = notZero(0);
                 seconds.innerHTML = notZero(0);
             }
         }
     }
     
     setClock('.timer', dedline);
}
module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
window.addEventListener('DOMContentLoaded', () => {
    const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
          

    tabs();
    timer();
    cards();
    forms();
    modal();
    calc();   
    slider();
    
    


    

   
    
        
        
        

    
});




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map