<script>
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyD3XCHkvMkO5W_hyvntnEuGLqGLMG650uo",
        authDomain: "hackathonmvp-c888d.firebaseapp.com",
        databaseURL: "https://hackathonmvp-c888d-default-rtdb.firebaseio.com",
        projectId: "hackathonmvp-c888d",
        storageBucket: "hackathonmvp-c888d.appspot.com",
        messagingSenderId: "638041821853",
        appId: "1:638041821853:web:53e318afd5e53ff19e3a74"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    const rootRef = db.ref('/');

    // Sales Chart setup
    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [{ label: 'Sales', data: [], borderColor: '#3c8dbc', backgroundColor: 'rgba(60,141,188,0.15)', fill: true, tension: 0.4 }] },
        options: { plugins: { legend: { labels: { color: '#333' } } }, scales: { x: { ticks: { color: '#555' } }, y: { ticks: { color: '#555' } } } }
    });

    // Listen for live Firebase updates
    rootRef.on('value', snapshot => {
        const data = snapshot.val();
        if (!data) return;

        // Update distributor name
        document.getElementById('distributor-name').innerHTML = `Welcome, <strong>${data.distributorName || 'Distributor'}</strong>`;

        // Update cards
        document.getElementById('monthly-sales-value').innerText = `$${data.sales?.monthly || 0}`;
        document.getElementById('weekly-sales-value').innerText = `$${data.sales?.weekly || 0}`;
        document.getElementById('active-promotions-value').innerText = data.promotions?.activePromotions || 0;
        document.getElementById('survey-status-value').innerText = data.survey?.due || 0;

        // Update sales chart if chartData exists
        if (data.sales?.chartData?.length) {
            salesChart.data.labels = data.sales.chartData.map(d => d.month);
            salesChart.data.datasets[0].data = data.sales.chartData.map(d => d.amount);
            salesChart.update();
        }

        // Active Promotions panel only shows the number
        document.querySelector('.promotions-summary strong').innerText = data.promotions?.activePromotions || 0;
    });
</script>
