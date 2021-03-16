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