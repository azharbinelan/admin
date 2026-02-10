// Ganti dengan URL Web App dari Google Apps Script Bapak
const API_URL = "https://script.google.com/macros/s/AKfycbwRFbWalfPUExSBzyI_aXNGcBOkD6S-i7UYWtQ2-nLYPDHhJcNLpkcDCrp76tEEOuqAkA/exec"; 

window.onload = async function() {
    // Mencoba mengambil data terbaru dari Cloud saat Admin dibuka
    try {
        const response = await fetch(API_URL);
        const config = await response.json();
        if (config) {
            document.getElementById('site-url').value = config.url || "";
            document.getElementById('p-in').value = config.pin || "";
            document.getElementById('p-out').value = config.pout || "";
        }
    } catch (err) {
        console.log("Gagal memuat dari Cloud, mencoba Lokal...");
        // Cadangan: tetap ambil dari local jika internet bermasalah
        const savedData = localStorage.getItem('cbt_sman23_final');
        if (savedData) {
            const config = JSON.parse(savedData);
            document.getElementById('site-url').value = config.url || "";
            document.getElementById('p-in').value = config.pin || "";
            document.getElementById('p-out').value = config.pout || "";
        }
    }
};

async function saveData() {
    const config = {
        url: document.getElementById('site-url').value,
        pin: document.getElementById('p-in').value,
        pout: document.getElementById('p-out').value
    };

    if(!config.url || !config.pin || !config.pout) {
        return alert("Mohon isi semua data sebelum menyimpan!");
    }

    try {
        // Kirim data ke Cloud (Google Sheets)
        await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors', 
            body: JSON.stringify(config)
        });

        // Tetap simpan di lokal sebagai backup
        localStorage.setItem('cbt_sman23_final', JSON.stringify(config));
        alert("✅ Berhasil! Data tersimpan di Cloud & Lokal.");
    } catch (err) {
        alert("Gagal menyimpan ke Cloud: " + err);
    }
}
