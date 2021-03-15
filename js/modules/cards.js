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