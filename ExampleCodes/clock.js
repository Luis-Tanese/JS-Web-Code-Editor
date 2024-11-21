(() => {
    const modal = document.createElement("div");
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #333;
        color: white;
        border-radius: 20px;
        box-shadow: 25px 25px 75px rgba(0, 0, 0, 0.25),
                    10px 10px 70px rgba(0, 0, 0, 0.25),
                    inset -5px -5px 15px rgba(0, 0, 0, 0.5),
                    inset 5px 5px 15px rgba(0, 0, 0, 0.5);
        padding: 20px;
        z-index: 10000;
        min-width: 350px;
    `;

    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: red;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.5em;
        padding: 5px 10px;
    `;
    closeButton.onclick = () => modal.remove();
    modal.appendChild(closeButton);

    const container = document.createElement("div");
    container.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
    `;
    modal.appendChild(container);

    const clockContainer = document.createElement("div");
    clockContainer.className = "clock-container";
    clockContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    `;

    const clock = document.createElement("div");
    clock.className = "clock";
    clock.style.cssText = `
        position: relative;
        width: 200px;
        height: 200px;
    `;

    ["hour", "minute", "second"].forEach((type) => {
        const needle = document.createElement("div");
        needle.className = `needle ${type}`;
        needle.style.cssText = `
            background-color: ${
                type === "second" ? "#e74c3c" : "white"
            };
            position: absolute;
            top: 50%;
            left: 50%;
            ${
                type === "hour"
                    ? "height: 65px;"
                    : "height: 100px;"
            }
            width: 3px;
            transform-origin: bottom center;
        `;
        clock.appendChild(needle);
    });

    const centerPoint = document.createElement("div");
    centerPoint.className = "center-point";
    centerPoint.style.cssText = `
        background-color: white;
        width: 10px;
        height: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid #e74c3c;
        border-radius: 50%;
    `;
    clock.appendChild(centerPoint);

    clockContainer.appendChild(clock);

    const time = document.createElement("div");
    time.className = "time";
    time.style.cssText = `
        font-size: 60px;
        margin-top: 20px;
    `;
    clockContainer.appendChild(time);

    const date = document.createElement("div");
    date.className = "date";
    date.style.cssText = `
        color: #aaa;
        font-size: 14px;
        letter-spacing: 0.3px;
        text-transform: uppercase;
        margin-top: 10px;
    `;
    clockContainer.appendChild(date);

    container.appendChild(clockContainer);

    document.body.appendChild(modal);

    const hourEl = clock.querySelector(".hour");
    const minuteEl = clock.querySelector(".minute");
    const secondEl = clock.querySelector(".second");

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    function setTime() {
        const time = new Date();
        const month = time.getMonth();
        const day = time.getDay();
        const dateNumber = time.getDate();
        const hours = time.getHours();
        const hoursForClock = hours % 12;
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
            hoursForClock,
            0,
            11,
            0,
            360
        )}deg)`;
        minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(
            minutes,
            0,
            59,
            0,
            360
        )}deg)`;
        secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(
            seconds,
            0,
            59,
            0,
            360
        )}deg)`;

        time.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
        date.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${dateNumber}</span>`;
    }

    const scale = (num, in_min, in_max, out_min, out_max) => {
        return (
            ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
    };

    setTime();
    setInterval(setTime, 1000);

    document.documentElement.style.cssText = `
        background: #111;
        color: white;
        transition: all 0.5s ease-in-out;
    `;
})();
