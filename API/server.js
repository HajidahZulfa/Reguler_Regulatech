const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;

const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://10.97.55.194:5500']
}));

const regulations = [
    {
        id: 1,
        title: "Undang-Undang Informasi dan Transaksi Elektronik (UU ITE)",
        category: "UU ITE",
        regulation_number: "Nomor 11 Tahun 2008 jo. Nomor 19 Tahun 2016",
        date_enacted: "2008, diubah 2016",
        summary: "Mengatur tentang informasi dan transaksi elektronik, termasuk ketentuan pidana terkait konten ilegal, pencemaran nama baik, dan transaksi elektronik.",
        relevant_articles: ["Pasal 27 (Pencemaran Nama Baik)", "Pasal 28 (Berita Bohong)", "Pasal 30 (Akses Ilegal)"],
        source_link: "https://jdih.komdigi.go.id/produk_hukum/view/id/555/t/undangundang+nomor+19+tahun+2016",
        keywords: ["UU ITE", "informasi", "transaksi", "elektronik", "pidana", "pencemaran", "berita bohong"]
    },
    {
        id: 2,
        title: "Undang-Undang Perlindungan Data Pribadi (UU PDP)",
        category: "UU PDP",
        regulation_number: "Nomor 27 Tahun 2022",
        date_enacted: "2022",
        summary: "Mengatur perlindungan data pribadi individu, hak subjek data, kewajiban pengendali dan prosesor data, serta sanksi administratif dan pidana.",
        relevant_articles: ["Pasal 20 (Hak Subjek Data)", "Pasal 27 (Kewajiban Pengendali Data)", "Bab VII (Sanksi Administratif)"],
        source_link: "https://www.hukumonline.com/klinik/a/uu-pdp--landasan-hukum-pelindungan-data-pribadi-lt5d588c1cc649e/",
        keywords: ["UU PDP", "data pribadi", "perlindungan", "privasi", "subjek data", "pengendali data"]
    },
    {
        id: 3,
        title: "Pedoman Etika Pengembangan Kecerdasan Artifisial (AI)",
        category: "ETIKA AI",
        regulation_number: "Belum ada regulasi formal, namun ada draf/pedoman",
        date_enacted: "Ongoing",
        summary: "Mencakup prinsip-prinsip etika dalam pengembangan dan penggunaan AI, seperti transparansi, akuntabilitas, keadilan, dan keamanan.",
        relevant_articles: ["Prinsip Keadilan", "Prinsip Akuntabilitas", "Prinsip Transparansi"],
        source_link: "https://jdih.komdigi.go.id/produk_hukum/view/id/883/t/surat+edaran+menteri+komunikasi+dan+informatika+nomor+9+tahun+2023",
        keywords: ["etika AI", "kecerdasan artifisial", "prinsip AI", "pengembangan AI"]
    },
    {
        id: 4,
        title: "Peraturan Otoritas Jasa Keuangan (OJK) terkait Inovasi Keuangan Digital (IKD) / Fintech",
        category: "FINTECH",
        regulation_number: "POJK No. 13/POJK.02/2018",
        date_enacted: "2018",
        summary: "Mengatur tentang Inovasi Keuangan Digital, termasuk *regulatory sandbox*, perizinan, dan pengawasan aktivitas fintech.",
        relevant_articles: ["Definisi IKD", "Mekanisme Regulatory Sandbox", "Perizinan Fintech"],
        source_link: "https://www.ojk.go.id/id/regulasi/Documents/Pages/POJK-2-2024-Penyelenggaraan-Inovasi-Teknologi-Sektor-Keuangan/POJK%203%20Tahun%202024%20Penyelenggaraan%20Inovasi%20Teknologi%20Sektor%20Keuangan.pdf",
        keywords: ["fintech", "inovasi keuangan digital", "OJK", "regulasi fintech", "regulatory sandbox"]
    },
    {
        id: 5,
        title: "Undang-Undang Hak Cipta",
        category: "HAK CIPTA",
        regulation_number: "Nomor 28 Tahun 2014",
        date_enacted: "2014",
        summary: "Melindungi karya cipta di bidang ilmu pengetahuan, seni, dan sastra, termasuk karya digital dan sanksi terhadap pelanggaran hak cipta.",
        relevant_articles: ["Hak Ekonomi", "Hak Moral", "Sanksi Pelanggaran"],
        source_link: "https://www.hukumonline.com/berita/a/dasar-hukum-hak-cipta-lt62b9143a498ff/2",
        keywords: ["hak cipta", "karya cipta", "digital", "UU Hak Cipta", "kekayaan intelektual"]
    },
    {
        id: 6,
        title: "Peraturan Menteri Komunikasi dan Informatika (Kominfo) terkait Penyelenggara Sistem Elektronik (PSE) / Platform Digital",
        category: "PLATFORM DIGITAL",
        regulation_number: "Permenkominfo No. 5 Tahun 2020 jo. No. 10 Tahun 2021",
        date_enacted: "2020, diubah 2021",
        summary: "Mengatur pendaftaran, kewajiban, dan sanksi bagi Penyelenggara Sistem Elektronik (PSE) lingkup privat, termasuk platform digital global.",
        relevant_articles: ["Pendaftaran PSE", "Kewajiban Konten", "Pemblokiran"],
        source_link: "https://jdih.komdigi.go.id/produk_hukum/view/id/883/t/surat+edaran+menteri+komunikasi+dan+informatika+nomor+9+tahun+2023",
        keywords: ["platform digital", "PSE", "Kominfo", "regulasi platform", "pendaftaran PSE"]
    }
];

app.get('/', (req, res) => {
    res.send('Selamat datang di API RegulaTech!');
});

app.get('/api/regulations', (req, res) => {
    res.json(regulations);
});

app.get('/api/regulations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const regulation = regulations.find(reg => reg.id === id);

    if (regulation) {
        res.json(regulation);
    } else {
        res.status(404).json({ message: 'Regulasi tidak ditemukan' });
    }
});

app.get('/api/categories', (req, res) => {
    const categories = [...new Set(regulations.map(reg => reg.category))];
    res.json(categories);
});

app.get('/api/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const categoryFilter = req.query.category ? req.query.category.toLowerCase() : '';

    let results = regulations;

    if (categoryFilter) {
        results = results.filter(reg => reg.category.toLowerCase() === categoryFilter);
    }

    if (query) {
        results = results.filter(reg =>
            reg.title.toLowerCase().includes(query) ||
            reg.summary.toLowerCase().includes(query) ||
            (reg.keywords && reg.keywords.some(keyword => keyword.toLowerCase().includes(query))) ||
            (reg.regulation_number && reg.regulation_number.toLowerCase().includes(query))
        );
    }

    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log(`Untuk melihat semua regulasi: http://localhost:${PORT}/api/regulations`);
    console.log(`Untuk mencari: http://localhost:${PORT}/api/search?q=ite`);
    console.log(`Untuk mencari berdasarkan kategori: http://localhost:${PORT}/api/search?category=UU ITE`);
});