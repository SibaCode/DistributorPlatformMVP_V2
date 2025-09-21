// Sidebar toggle
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.querySelector('.sidebar');
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Animated counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});

// Revenue chart
const ctx = document.getElementById('revenueChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue',
            data: [1200, 1900, 3000, 2500, 4000, 4500],
            backgroundColor: 'rgba(60,140,188,0.2)',
            borderColor: '#3c8dbc',
            borderWidth: 3,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});
