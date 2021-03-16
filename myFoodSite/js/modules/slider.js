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