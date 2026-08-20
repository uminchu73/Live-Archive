const form = document.querySelector("#event-form");



// 公演を画面に表示する関数
function displayEvent(event, eventList) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span class="date">
            ${event.date}
        </span>
        <span class="title">
            ${event.title}
        </span>
        <span class="location">
            ${event.location}
        </span>
    `;

    eventList.appendChild(li);
}


// 保存されている公演を読み込む
let liveEvents = JSON.parse(localStorage.getItem("liveEvents")) || [];

liveEvents.forEach(function(event) {
    const year = event.year;

    let eventList = document.querySelector(`#events-${year}`);

    if (!eventList) {
        const yearSection = document.createElement("section");
        yearSection.classList.add("year-section");

        const details = document.createElement("details");

        const summary = document.createElement("summary");
        summary.textContent = year;

        details.appendChild(summary);

        eventList = document.createElement("ul");
        eventList.id = `events-${year}`;

        details.appendChild(eventList);
        yearSection.appendChild(details);

        document.querySelector("main").appendChild(yearSection);
    }

    displayEvent(event, eventList);
});


// 新しい公演を追加する
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dateValue = document.querySelector("#event-date").value;
    const year = dateValue.slice(0, 4);

    const yearList = document.querySelector(`#events-${year}`);

    console.log(year);
    console.log(yearList);

    if (!yearList) {
        const yearSection = document.createElement("section");

        yearSection.classList.add("year-section");

        const details = document.createElement("details");

        const summary = document.createElement("summary");
        summary.textContent = year;

        details.appendChild(summary);

        const newEventList = document.createElement("ul");
        newEventList.id = `events-${year}`;

        details.appendChild(newEventList);

        yearSection.appendChild(details);

        document.querySelector("main").appendChild(yearSection);

        console.log(yearSection);

    }
    
    const date = dateValue.slice(5).replace("-", "/");


    const title = document.querySelector("#event-title").value;
    const location = document.querySelector("#event-location").value;

    const newEvent = {
        year: year,
        date: date,
        title: title,
        location: location
    };

    console.log(year);
    console.log(newEvent);

    liveEvents.push(newEvent);

    localStorage.setItem("liveEvents", JSON.stringify(liveEvents));

    const targetList = document.querySelector(`#events-${year}`);

    displayEvent(newEvent, targetList);

    form.reset();
});