window.onload = () => {
    // pomodoro
    let workTimeInput = document.getElementById("input-worktime");
    let shortBreakInput = document.getElementById("input-shortbreak");
    let longBreakInput = document.getElementById("input-longbreak");
    let goalInput = document.getElementById("input-ciclos");
    let timesCompleted = 0;
    let completedCycles = 0;

    let workTime;
    let shortBreak;
    let longBreak;
    let goal;


    const populateVariables = () => {
        workTime = workTimeInput.value;
        shortBreak = shortBreakInput.value;
        longBreak = longBreakInput.value;
        goal = goalInput.value;
    }



    const pomodoroController = () => {
        if (timesCompleted === 7) {
            completedCycles++;
            if (completedCycles == goal) {
                updateFeedback("Good job! You complete your goal!");
                console.log("Good job! You complete your goal!");
            } else {
                currentTime = longBreak;
                increment = longBreak;
                timesCompleted = 0;
                timer();
                updateFeedback("Take a rest! You completed the cycle.");
                console.log("Take a rest! You completed the cycle.");
            }
            return;
        }
        if (timesCompleted % 2 === 0) {
            currentTime = workTime;
            increment = workTime;
            timesCompleted++;
            timer();
            updateFeedback("Time to work!");
            console.log("Time to work!");

        } else {
            currentTime = shortBreak;
            increment = shortBreak;
            timesCompleted++;
            updateFeedback("Short break!")
            console.log("Short break!")
            timer();
        }
    }


    // timer


    let currentTime = 0;
    let seconds = 0;
    let increment = 0;



    function timer() {
        if (currentTime > 0 || seconds > 0) {
            if (seconds === 0) {
                seconds = 59;
                currentTime--;
            } else {
                seconds--;
            }
            updateClock();
            updateBarra();
            interval = setTimeout(timer, 1000);
        } else {
            confirm("Etapa terminada. Aceptá cuando estés listo para continuar con la siguiente");
            pomodoroController();
        }
    }

    const boton = document.getElementById("btn-start");
    boton.onclick = () => {
            populateVariables();
            pomodoroController();
            boton.textContent = ("STOP");
            boton.onclick = () => {
                kill();
            }
        }
        // esto está mal, deberia poder refrescar el pomodoro sin refrescar la página

    const kill = () => {
        window.location.reload();
    }

    // clock


    let clock = document.querySelector(".reloj");
    const updateClock = () => {
        let formatedMinute = format(currentTime);
        let formatedSecond = format(seconds);
        clock.textContent = (`${formatedMinute}:${formatedSecond}`);
    }
    const format = time => {
        if (time < 10) {
            return ("0" + time);
        } else return time;
    }

    let feedback = document.querySelector(".feedback");
    let parrafo = document.querySelector(".tutorial");
    let barra = document.getElementById("progressStatus");
    const updateFeedback = msg => {
        feedback.textContent = msg;
        parrafo.classList.add("ocultar");
        barra.classList.remove("ocultar");
    }

    let barraInterna = document.getElementById("progressBar");
    let porcentaje = document.querySelector(".porcentaje");
    let width = 0;

    const updateBarra = () => {
        if (width < 100) {
            width += 100 / (increment * 59.8);
            porcentaje.textContent = ` ${parseInt(width)} % `;
            barraInterna.style.width = width + '%';
        } else {
            width = 0;
        }
    }
}