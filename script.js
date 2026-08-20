/// 保存されている公演を読み込む
let liveEvents = JSON.parse(localStorage.getItem("liveEvents")) || [];


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


// 保存されている公演を年ごとに表示する
liveEvents.forEach(function(event) {

    const year = event.year;

    let eventList = document.querySelector(`#events-${year}`);

    // その年がHTMLにない場合は、新しく作る
    if (!eventList) {

        const yearSection = document.createElement("section");
        yearSection.classList.add("year-section");

        const details = document.createElement("details");

        const summary = document.createElement("summary");
        summary.textContent = year;

        const newEventList = document.createElement("ul");
        newEventList.id = `events-${year}`;

        details.appendChild(summary);
        details.appendChild(newEventList);

        yearSection.appendChild(details);

        document.querySelector("main").appendChild(yearSection);

        eventList = newEventList;
    }

    displayEvent(event, eventList);

});


// 年を小さい順に並べ替える
const main = document.querySelector("main");
const yearSections = [...main.querySelectorAll(".year-section")];

yearSections.sort(function(a, b) {
    const yearA = Number(a.querySelector("summary").textContent);
    const yearB = Number(b.querySelector("summary").textContent);

    return yearA - yearB;
});

yearSections.forEach(function(section) {
    main.appendChild(section);
});

// 各年の公演を日付順に並べ替える
yearSections.forEach(function(section) {

    const eventList = section.querySelector("ul");
    const events = [...eventList.querySelectorAll("li")];

    events.sort(function(a, b) {
        const dateA = a.querySelector(".date").textContent;
        const dateB = b.querySelector(".date").textContent;

        const [monthA, dayA] = dateA.split("/").map(Number);
        const [monthB, dayB] = dateB.split("/").map(Number);

        return (monthA * 100 + dayA) - (monthB * 100 + dayB);
    });

    events.forEach(function(event) {
        eventList.appendChild(event);
    });

});