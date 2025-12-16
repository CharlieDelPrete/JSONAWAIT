const container = document.getElementById('scheduleContainer');
const status = document.getElementById('status');
const scheduleSelect = document.getElementById('scheduleSelect');

async function loadSchedule(fileName) {
    container.innerHTML = "";
    status.innerHTML = `<div class="alert alert-info">Loading schedule...</div>`;

    try {
        const response = await fetch(`${fileName}`);
        if (!response.ok) throw new Error('Failed to load schedule');
        const data = await response.json();

        data.sort((a, b) => a.period - b.period);

        status.innerHTML = ""; 

        data.forEach(cls => {
            const html = `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${cls.className}</h5>
                        <p>Teacher: ${cls.teacher}</p>
                        <p>Room: ${cls.roomNumber}</p>
                        <p>Period: ${cls.period}</p>
                        <p>Subject: ${cls.subjectArea}</p>
                    </div>
                </div>
            </div>`;
            container.insertAdjacentHTML('beforeend', html);
        });
    } catch (error) {
        status.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    }
}

loadSchedule(scheduleSelect.value);

scheduleSelect.addEventListener('change', () => {
    loadSchedule(scheduleSelect.value);
});
