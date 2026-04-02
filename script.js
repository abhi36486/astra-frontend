
// 🔹 Navigation
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

// 🔹 API URL
const API_URL = "https://luana-wafery-tornly.ngrok-free.dev";

// 🔊 SPEAK FUNCTION (NEW)
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 0.9;
    window.speechSynthesis.speak(speech);
}

function startContinuousListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = "en-IN";
    recognition.continuous = true;

    recognition.onresult = function(event) {
        const command = event.results[event.results.length - 1][0].transcript;

        console.log("You:", command);

        sendCommand(command);
    };

    recognition.onerror = (e) => {
        console.log("Mic error:", e);
    };

    recognition.onend = () => {
        // 🔁 Restart automatically (important)
        startContinuousListening();
    };

    recognition.start();
}

// 🔹 Send Command
async function sendCommand(cmd) {
    console.log("Sending:", cmd);

    try {
        const res = await fetch(`${API_URL}/command?query=${encodeURIComponent(cmd)}`, {
            method: "POST"
        });

        const data = await res.json();

        const response = data.response || "No response";

        console.log("Astra:", response);

        // 🔊 SPEAK RESPONSE
        speak(response);

        // 🖥 SHOW ON UI
        const output = document.getElementById("output");
        if (output) {
            output.innerText = response;
        }

    } catch (err) {
        console.error("Error:", err);
        alert("Backend not connected");
      
    }
}
// ✅ MAKE FUNCTIONS GLOBAL
window.sendCommand = sendCommand;
window.onload = () => {
    startContinuousListening();
};

