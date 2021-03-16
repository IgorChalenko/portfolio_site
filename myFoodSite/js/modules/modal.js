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