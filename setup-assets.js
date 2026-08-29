const fs = require('fs');
const path = require('path');
const https = require('https');

// Konfigurasi file yang akan diunduh
const assets = [
    {
        url: 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.21/mammoth.browser.min.js',
        filename: 'mammoth.browser.min.js'
    },
    {
        url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js',
        filename: 'pdf.min.js'
    },
    {
        url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js',
        filename: 'pdf.worker.min.js'
    }
];

const targetDir = path.join(__dirname, 'assets', 'js');

// Membuat folder assets/js jika belum ada
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log('📁 Folder assets/js berhasil dibuat.');
}

// Fungsi untuk mengunduh file
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Gagal mengunduh. Status Code: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {}); 
            reject(err);
        });
    });
}

// Menjalankan proses unduhan secara sekuensial
async function main() {
    console.log('⏳ Memulai pengunduhan aset library untuk mode offline...');
    for (const asset of assets) {
        const destPath = path.join(targetDir, asset.filename);
        try {
            console.log(`⬇️ Mengunduh ${asset.filename}...`);
            await downloadFile(asset.url, destPath);
            console.log(`✅ Selesai: ${asset.filename}`);
        } catch (error) {
            console.error(`❌ Gagal mengunduh ${asset.filename}:`, error.message);
        }
    }
    console.log('\n🎉 Semua aset berhasil disiapkan di folder lokal!');
}

main();