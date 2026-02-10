const API_URL = "https://script.google.com/macros/s/AKfycbwRFbWalfPUExSBzyI_aXNGcBOkD6S-i7UYWtQ2-nLYPDHhJcNLpkcDCrp76tEEOuqAkA/exec"; // Tempel link deployment di sini

window.onload = async function() {
    try {
        const response = await fetch(API_URL);
        const config = await response.json();
        if (config.url) {
            document.getElementById('site-url').value = config.url;
            document.getElementById('p-in').value = config.pin;
            document.getElementById('p-out').value = config.pout;
        }
    } catch (err) {
        console.error("Gagal memuat data dari Cloud.");
    }
};

async function saveData() {
    const config = {
        url: document.getElementById('site-url').value,
        pin: document.getElementById('p-in').value,
        pout: document.getElementById('p-out').value
    };

    if(!config.url || !config.pin || !config.pout) {
        return alert("Mohon isi semua data!");
    }

    try {
        // Mengirim data ke Google Sheets
        await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(config)
        });
        alert("✅ Konfigurasi Berhasil Disimpan ke Cloud!");
    } catch (err) {
        alert("Gagal menyimpan: " + err);
    }
}
