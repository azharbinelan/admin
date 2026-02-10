// 1. FUNGSI UNTUK MEMUAT DATA SAAT HALAMAN DIBUKA (REFRESH)
window.onload = function() {
    const savedData = localStorage.getItem('cbt_sman23_final');
    if (savedData) {
        const config = JSON.parse(savedData);
        document.getElementById('site-url').value = config.url || "";
        document.getElementById('p-in').value = config.pin || "";
        document.getElementById('p-out').value = config.pout || "";
        console.log("Data berhasil dimuat dari penyimpanan.");
    }
};

// 2. FUNGSI UNTUK MENYIMPAN DATA
function saveData() {
    const config = {
        url: document.getElementById('site-url').value,
        pin: document.getElementById('p-in').value,
        pout: document.getElementById('p-out').value
    };

    if(!config.url || !config.pin || !config.pout) {
        return alert("Mohon isi semua data sebelum menyimpan!");
    }

    localStorage.setItem('cbt_sman23_final', JSON.stringify(config));
    alert("✅ Data Berhasil Disimpan!");
}