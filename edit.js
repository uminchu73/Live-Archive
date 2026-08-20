const form = document.querySelector("#event-form");

let liveEvents = JSON.parse(localStorage.getItem("liveEvents")) || [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dateValue = document.querySelector("#event-date").value;
    const year = dateValue.slice(0, 4);

    const date = dateValue.slice(5).replace("-", "/");

    const title = document.querySelector("#event-title").value;
    const location = document.querySelector("#event-location").value;

    const newEvent = {
        year: year,
        date: date,
        title: title,
        location: location
    };

    liveEvents.push(newEvent);

    localStorage.setItem("liveEvents", JSON.stringify(liveEvents));

    form.reset();
});