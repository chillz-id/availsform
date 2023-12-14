```javascript
const calendar = document.getElementById('calendar');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const today = new Date();

const currentMonth = today.getMonth();

const currentYear = today.getFullYear();

function generateCalendar(month, year) {
  const firstDayOfMonth = new Date(year, month, 1);

  const lastDayOfMonth = new Date(year, month + 1, 0);

  const numDaysInMonth = lastDayOfMonth.getDate();

  const firstDayOfMonthIndex = firstDayOfMonth.getDay();

  let html = '';

  html += '<div class="month">';
  html += '<div class="month-name">' + months[month] + ' ' + year + '</div>';
  html += '<div class="weekdays">';

  for (let i = 0; i < days.length; i++) {
    html += '<div class="day-name">' + days[i] + '</div>';
  }

  html += '</div>';

  html += '<div class="days">';

  for (let i = 0; i < firstDayOfMonthIndex; i++) {
    html += '<div class="day unavailable"></div>';
  }

  for (let i = 1; i <= numDaysInMonth; i++) {
    const date = new Date(year, month, i);

    const dayOfWeek = date.getDay();

    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

    html += '<div class="day ' + (isToday ? 'today' : '') + ' ' + (dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : '') + '">';
    html += '<input type="checkbox" id="' + date.toISOString() + '" name="' + date.toISOString() + '" value="' + date.toISOString() + '">';
    html += '<label for="' + date.toISOString() + '">' + i + '</label>';
    html += '</div>';
  }

  for (let i = lastDayOfMonth.getDay(); i < 6; i++) {
    html += '<div class="day unavailable"></div>';
  }

  html += '</div>';

  html += '</div>';

  calendar.innerHTML = html;
}

generateCalendar(currentMonth, currentYear);

document.getElementById('prev-month').addEventListener('click', () => {
  generateCalendar(currentMonth - 1, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
  generateCalendar(currentMonth + 1, currentYear);
});

document.getElementById('today').addEventListener('click', () => {
  generateCalendar(today.getMonth(), today.getFullYear());
});

document.getElementById('submit').addEventListener('click', () => {
  const data = new FormData(document.getElementById('form'));

  fetch('https://script.google.com/macros/s/AKfycbw75432jhiu345lkjhdsfgjh4356789/exec', {
    method: 'POST',
    body: data,
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.error(error);
  });
});
```