<script>
// 🔹 Navigation function
function go(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const labels = {
    home: 'Home',
    capabilities: 'Capabilities',
    system: 'System',
    security: 'Security'
  };
  document.querySelectorAll('.nav-links li').forEach(li => {
    if (li.textContent.trim() === labels[name]) {
      li.classList.add('active');
    }
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
// 🔹 Backend API URL
const API_URL = "https://luana-wafery-tornly.ngrok-free.dev";

async function sendCommand(cmd) {
    console.log("Sending:", cmd);

    try {
        const res = await fetch(`${API_URL}/command?query=${encodeURIComponent(cmd)}`, {
            method: "POST"
        });

        const data = await res.json();

        console.log("Astra:", data);

        alert("Astra: " + (data.response || JSON.stringify(data)));

    } catch (err) {
        console.error("Error:", err);
        alert("Backend not connected");
    }
}
</script>
