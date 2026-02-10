// Konfigurasi Firebase (Dapatkan dari Firebase Console > Project Settings)
const firebaseConfig = {
    databaseURL: "https://belajar-cbt-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };
  
  // Inisialisasi Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // 1. Ambil data otomatis dari Cloud saat halaman dibuka
  window.onload = function() {
      database.ref('config').on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
              document.getElementById('site-url').value = data.url || "";
              document.getElementById('p-in').value = data.pin || "";
              document.getElementById('p-out').value = data.pout || "";
          }
      });
  };
  
  // 2. Fungsi Simpan ke Firebase
  function saveData() {
      const config = {
          url: document.getElementById('site-url').value,
          pin: document.getElementById('p-in').value,
          pout: document.getElementById('p-out').value
      };
  
      if(!config.url || !config.pin || !config.pout) {
          return alert("Mohon isi semua data sebelum menyimpan!");
      }
  
      database.ref('config').set(config)
          .then(() => alert("✅ Berhasil! Data tersinkron ke Cloud."))
          .catch((error) => alert("Gagal menyimpan: " + error.message));
  }
