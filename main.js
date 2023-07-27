moment().format();

const form = document.getElementById('date_fm');

const dayErr = document.getElementById('dayErr');
const monthErr = document.getElementById('monthErr');
const yearErr = document.getElementById('yearErr');

const dayOutput = document.getElementById('day');
const monthOutput = document.getElementById('month');
const yearOutput = document.getElementById('year');

function validate(e) {
    e.preventDefault();
    const now = new Date();
    const year = form.year.value;
    const month = form.month.value;
    const day = form.day.value;

    let invalidYear = false;
    let invalidMonth = false;
    let invalidDay = false;

    if (year === '') {
        yearErr.innerHTML = "This field is required";
        form.year.style.borderColor = 'hsl(0, 100%, 67%)';
        form.year.previousElementSibling.style.color = 'hsl(0, 100%, 67%)';
    } else {
        if (year > now.getFullYear()) {
            yearErr.innerHTML = 'Must be in the past';
            form.year.style.borderColor = 'hsl(0, 100%, 67%)';
            form.year.previousElementSibling.style.color = 'hsl(0, 100%, 67%)';
            invalidYear = true;
        } else {
            yearErr.innerHTML = '';
            form.year.style.borderColor = 'hsl(0, 0%, 94%)';
            form.year.previousElementSibling.style.color = 'hsl(0, 1%, 44%)';
            invalidYear = false;
        }
    }

    if (month === '') {
        monthErr.innerHTML = 'This field is required';
        form.month.style.borderColor = 'hsl(0, 100%, 67%)';
        form.month.previousElementSibling.style.color = 'hsl(0, 100%, 67%)';
    } else {
        if (month > 12 || month < 1) {
            monthErr.innerHTML = 'Must be a valid month';
            form.month.style.borderColor = 'hsl(0, 100%, 67%)';
            form.month.previousElementSibling.style.color = 'hsl(0, 100%, 67%)';
            invalidMonth = true;
        } else {
            monthErr.innerHTML = '';
            form.month.style.borderColor = 'hsl(0, 0%, 94%)';
            form.month.previousElementSibling.style.color = 'hsl(0, 1%, 44%)';
            invalidMonth = false;
        }
    }

    if (day === '') {
        dayErr.innerHTML = 'This field is required';
        form.day.style.borderColor = 'hsl(0, 100%, 67%)';
        form.day.previousElementSibling.style.color = 'hsl(0, 100%, 67%)';
    } else {
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth || day < 1) {
            dayErr.innerHTML = 'Must be a valid day';
            form.day.style.borderColor = 'hsl(0, 100%, 67%)';
            form.day.previousElementSibling.style.color = 'hsl(0, 100%, 67%)';
            invalidDay = true;
        } else {
            dayErr.innerHTML = '';
            form.day.style.borderColor = 'hsl(0, 0%, 94%)';
            form.day.previousElementSibling.style.color = 'hsl(0, 1%, 44%)';
            invalidDay = false;
        }
    }

    if (invalidYear && invalidMonth && invalidDay) {
        dayErr.innerHTML = 'Must be a valid date';
        monthErr.innerHTML = '';
        yearErr.innerHTML = '';
    }

    if (year === '' || month === '' || day === '') {
        yearOutput.innerHTML = '--';
        monthOutput.innerHTML = '--';
        dayOutput.innerHTML = '--';
    } else {
        if (!invalidYear && !invalidMonth && !invalidDay) {
            const bday = new Date(year, month - 1, day);
            showAge(bday, now);
        } else {
            yearOutput.innerHTML = '--';
            monthOutput.innerHTML = '--';
            dayOutput.innerHTML = '--';
        }
    }

    return false;
}

function showAge(bday, now) {
    const a = moment(now);
    const b = moment(bday);

    const years = a.diff(b, 'years');
    b.add(years, 'years');

    const months = a.diff(b, 'months');
    b.add(months, 'months');

    const days = a.diff(b, 'days');

    yearOutput.innerHTML = 0;
    monthOutput.innerHTML = 0;
    dayOutput.innerHTML = 0;
    const countYears = setInterval(() => {
        if (parseInt(yearOutput.innerHTML) !== years) {
            yearOutput.innerHTML = parseInt(yearOutput.innerHTML) + 1;
        } else {
            clearInterval(countYears);
        }
    }, 50);
    const countMonths = setInterval(() => {
        if (parseInt(monthOutput.innerHTML) !== months) {
            monthOutput.innerHTML = parseInt(monthOutput.innerHTML) + 1;
        } else {
            clearInterval(countMonths);
        }
    }, 50);
    const countDays = setInterval(() => {
        if (parseInt(dayOutput.innerHTML) !== days) {
            dayOutput.innerHTML = parseInt(dayOutput.innerHTML) + 1;
        } else {
            clearInterval(countDays);
        }
    }, 50);
}

form.addEventListener('submit', validate);