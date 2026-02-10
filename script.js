const API_URL = "https://script.google.com/macros/s/AKfycbwRFbWalfPUExSBzyI_aXNGcBOkD6S-i7UYWtQ2-nLYPDHhJcNLpkcDCrp76tEEOuqAkA/exec";

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
        await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(config)
        });
        alert("✅ Data Berhasil Disimpan ke Cloud!");
    } catch (err) {
        alert("Gagal menyimpan ke Cloud: " + err);
    }
}
