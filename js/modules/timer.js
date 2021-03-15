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