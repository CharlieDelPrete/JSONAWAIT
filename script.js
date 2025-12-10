// JSON file names
const mySchedule = "KingSchedule.json";
const friends = ["AvaSchedule.json", "JoshSchedule.json", "MiaSchedule.json"];

// DOM elements
const select = document.getElementById("scheduleSelect");
const container = document.getElementById("scheduleContainer");
const status = document.getElementById("status");

// AUTOLOAD King’s schedule on page open
window.addEventListener("DOMContentLoaded", () => {
  loadSchedule(mySchedule);
});

// EVENT TRIGGER — when dropdown changes (NOT a button)
select.addEventListener("change", () => {
  loadSchedule(select.value);
});

// ASYNC FUNCTION TO LOAD JSON SCHEDULES
async function loadSchedule(fileName) {
  status.innerHTML = `<div class="alert alert-info">Loading schedule...</div>`;
  container.innerHTML = "";

  try {
    // Fetch the JSON using template literal
    const response = await fetch(`./json/${fileName}`);

    if (!response.ok) {
      throw new Error("Failed to load JSON file.");
    }

    const data = await response.json();

    // Sort by period (extra credit!)
    data.sort((a, b) => a.period - b.period);

    // Build cards
    data.forEach((cls) => {
      const html = `
        <div class="col-md-4">
          <div class="card shadow-sm p-3">
            <h5 class="card-title">${cls.className}</h5>
            <p><strong>Teacher:</strong> ${cls.teacher}</p>
            <p><strong>Room:</strong> ${cls.roomNumber}</p>
            <span class="badge bg-primary period-badge">Period ${cls.period}</span>
            <p class="mt-2 text-muted">${cls.subjectArea}</p>
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", html);
    });

    status.innerHTML = "";
  } catch (error) {
    status.innerHTML = `
      <div class="alert alert-danger">
        ❌ Error loading schedule. Check file name or JSON format.
      </div>`;
  }
}
