const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const shareBtn = document.getElementById('share-btn');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const resultDiv = document.getElementById('result');
const themeSwitch = document.getElementById('theme-switch');

// Enable or Disable Calculate Button based on Input Validity
[startDateInput, endDateInput].forEach(input => {
    input.addEventListener('input', () => {
        calculateBtn.disabled = !(startDateInput.value && endDateInput.value);
    });
});

// Calculate Date Difference
calculateBtn.addEventListener('click', () => {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (startDate > endDate) {
        resultDiv.textContent = 'Error: End date must be after start date!';
        return;
    }

    const timeDiff = endDate - startDate;
    const days = timeDiff / (1000 * 60 * 60 * 24);
    const weeks = (days / 7).toFixed(2);
    const months = (days / 30.44).toFixed(2);
    const years = (days / 365.25).toFixed(2);

    resultDiv.innerHTML = `
        Days: <strong>${days}</strong><br>
        Weeks: <strong>${weeks}</strong><br>
        Months: <strong>${months}</strong><br>
        Years: <strong>${years}</strong>
    `;
});

// Reset All Inputs
resetBtn.addEventListener('click', () => {
    startDateInput.value = '';
    endDateInput.value = '';
    resultDiv.innerHTML = '';
    calculateBtn.disabled = true;
});

// Share Link with Pre-filled Dates
shareBtn.addEventListener('click', () => {
    const url = `${window.location.href}?start=${startDateInput.value}&end=${endDateInput.value}`;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
    });
});

// Apply Theme Switching
themeSwitch.addEventListener('change', () => {
    document.documentElement.setAttribute('data-theme', themeSwitch.checked ? 'dark' : 'light');
});
