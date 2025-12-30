import type { Product } from "@/lib/types"

export const products: Product[] = [
  {
    id: "1",
    name: "Kursi Kantor AeroGlide",
    description: "Investasikan pada kenyamanan Anda dengan AeroGlide. Didesain untuk mendukung Anda selama berjam-jam, kursi ini dilengkapi sandaran jaring breathable yang menjaga punggung tetap sejuk, penyangga pinggang dinamis yang menyesuaikan dengan gerakan Anda, dan sandaran tangan 4D. Mekanisme kemiringan sinkronnya memastikan postur yang sehat, mengurangi ketegangan pada punggung dan leher.",
    price: 5250000,
    imageUrl: "https://picsum.photos/seed/1/600/400",
    stock: 8,
    imageHint: "office chair",
    category: "Furnitur",
    variants: [
      {
        type: "Warna",
        options: [
          { value: "hitam", label: "Hitam" },
          { value: "abu-abu", label: "Abu-abu" },
          { value: "biru", label: "Biru Navy" },
        ],
      },
    ],
    reviews: [
      {
        id: "rev1-1",
        author: "Budi S.",
        rating: 5,
        comment: "Kursi terbaik yang pernah saya punya! Sangat nyaman untuk kerja seharian.",
        createdAt: "2023-10-20T10:00:00Z",
      },
      {
        id: "rev1-2", author: "Citra L.", rating: 4, comment: "Bahan jaringnya adem, tapi butuh waktu untuk terbiasa dengan penyangga pinggangnya.", createdAt: "2023-10-22T14:30:00Z",
      },
      {
        id: "rev1-3",
        author: "Doni R.", rating: 3, comment: "Perakitannya agak sulit, instruksinya kurang jelas. Tapi setelah jadi, kursinya cukup nyaman.", createdAt: "2023-10-25T11:00:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "Headphone SoundWave Pro",
    description: "Masuki dunia audio imersif dengan SoundWave Pro. Teknologi peredam bising hibrida canggih secara cerdas menghilangkan gangguan, sementara driver 40mm yang dilapisi titanium menghasilkan suara jernih dengan bass yang dalam. Nikmati kenyamanan luar biasa dari bantalan telinga busa memori dan konektivitas Bluetooth 5.2 yang stabil, lengkap dengan daya tahan baterai 30 jam.",
    price: 2995000,
    imageUrl: "https://picsum.photos/seed/2/600/400",
    stock: 12,
    imageHint: "headphones",
    category: "Elektronik",
    variants: [
      {
        type: "Warna",
        options: [
          { value: "hitam", label: "Midnight Black" },
          { value: "putih", label: "Arctic White" },
          { value: "abu", label: "Slate Gray" },
        ],
      },
    ],
    reviews: [
      {
        id: "rev2-1",
        author: "Rina A.",
        rating: 5,
        comment: "Kualitas suaranya jernih banget dan peredam bisingnya bekerja dengan sangat baik. Worth it!",
        createdAt: "2023-11-05T09:15:00Z",
      },
      {
        id: "rev2-2", author: "Joko P.", rating: 4, comment: "Baterainya awet, tapi agak berat kalau dipakai terlalu lama.", createdAt: "2023-11-04T18:00:00Z",
      },
      {
        id: "rev2-3",
        author: "Sari W.", rating: 5, comment: "Sempurna untuk meeting online. Suara saya terdengar jelas kata rekan kerja.", createdAt: "2023-11-08T16:20:00Z",
      },
    ],
  },
  {
    id: "3",
    name: "Keyboard Mekanik TitanType",
    description: "Dominasi permainan dan pekerjaan Anda dengan TitanType. Dibangun dengan sasis aluminium kelas pesawat terbang, keyboard ini menawarkan daya tahan dan estetika premium. Switch mekanis Gateron Brown memberikan umpan balik taktil yang memuaskan tanpa terlalu berisik. Personalisasikan pengalaman Anda dengan pencahayaan RGB per tombol dan makro yang dapat diprogram melalui perangkat lunak kami.",
    price: 1935000,
    imageUrl: "https://picsum.photos/seed/3/600/400",
    stock: 3,
    imageHint: "keyboard",
    category: "Elektronik",
    variants: [
      {
        type: "Switch",
        options: [
          { value: "brown", label: "Gateron Brown" },
          { value: "blue", label: "Gateron Blue" },
          { value: "red", label: "Gateron Red" },
        ],
      },
    ],
    reviews: [
      {
        id: "rev3-1",
        author: "GamerPro",
        rating: 5,
        comment: "Feel mengetiknya mantap, RGB-nya juga keren. Sangat responsif untuk main game kompetitif.",
        createdAt: "2023-12-01T20:00:00Z",
      },
      {
        id: "rev3-2", author: "CoderLife", rating: 5, comment: "Keyboard ini membuat coding jadi lebih menyenangkan. Build quality-nya solid.", createdAt: "2023-11-28T11:45:00Z",
      },
      {
        id: "rev3-3",
        author: "Penulis", rating: 4, comment: "Suara 'clicky'-nya memuaskan, tapi mungkin terlalu berisik untuk lingkungan kantor yang sepi.", createdAt: "2023-12-05T14:00:00Z",
      },
    ],
  },
  {
    id: "4",
    name: "Monitor 4K CrystalView",
    description: "Visualisasikan karya Anda dalam detail yang memukau. Monitor CrystalView 27 inci ini menghadirkan resolusi 4K UHD (3840x2160) yang tajam dan panel IPS untuk akurasi warna superior dengan cakupan sRGB 99%. Desain bezel ultra-tipisnya sempurna untuk pengaturan multi-monitor, sementara teknologi Flicker-Free dan Low Blue Light memastikan kenyamanan mata saat digunakan dalam waktu lama.",
    price: 7500000,
    imageUrl: "https://picsum.photos/seed/4/600/400",
    stock: 0,
    imageHint: "computer monitor",
    category: "Elektronik",
    reviews: [
      {
        id: "rev4-1",
        author: "Desainer Grafis",
        rating: 5,
        comment: "Warnanya akurat sekali, sangat membantu pekerjaan desain saya. Resolusi 4K-nya membuat semuanya terlihat tajam.",
        createdAt: "2024-01-10T13:00:00Z",
      },
      {
        id: "rev4-2", author: "MovieLover", rating: 4, comment: "Bagus untuk nonton film, tapi speakernya internalnya kurang nendang.", createdAt: "2024-01-09T22:00:00Z",
      },
      {
        id: "rev4-3",
        author: "Trader Saham", rating: 5, comment: "Layar luas dan tajam, enak untuk melihat banyak chart sekaligus. Recommended!", createdAt: "2024-01-12T09:30:00Z",
      },
    ],
  },
  {
    id: "5",
    name: "Jam Tangan Pintar ChronoFit",
    description: "Capai puncak performa Anda dengan ChronoFit. Jam tangan pintar ini adalah pelatih pribadi di pergelangan tangan Anda, dengan pelacakan detak jantung 24/7, pemantauan oksigen darah (SpO2), dan analisis tidur mendalam. Layar AMOLED 1.43 inci yang selalu aktif menampilkan semua data Anda dengan jelas, bahkan di bawah sinar matahari. Dengan GPS internal dan ketahanan air 5 ATM, ia siap untuk petualangan apa pun.",
    price: 3735000,
    imageUrl: "https://picsum.photos/seed/5/600/400",
    stock: 15,
    imageHint: "smart watch",
    category: "Perangkat Pakai",
    variants: [
      {
        type: "Warna Strap",
        options: [
          { value: "hitam", label: "Hitam Silikon" },
          { value: "biru", label: "Biru Laut" },
          { value: "merah", label: "Merah Bata" },
        ],
      },
    ],
    reviews: [
      {
        id: "rev5-1",
        author: "Fitriani",
        rating: 5,
        comment: "Sangat membantu memotivasi saya untuk olahraga. Trackingnya akurat dan baterainya tahan lama.",
        createdAt: "2023-12-15T08:30:00Z",
      },
      {
        id: "rev5-2", author: "Andi", rating: 4, comment: "Desainnya bagus, tapi pilihan watch face-nya bisa lebih banyak lagi.", createdAt: "2023-12-16T16:20:00Z",
      },
      {
        id: "rev5-3",
        author: "Ibu Rumah Tangga", rating: 5, comment: "Fitur notifikasinya sangat membantu saat tidak bisa memegang HP. Baterainya juga awet.", createdAt: "2023-12-20T10:10:00Z",
      },
    ],
  },
  {
    id: "6",
    name: "Speaker BoomBox Mini",
    description: "Suara besar dalam paket kecil. BoomBox Mini dirancang untuk petualangan, dengan sertifikasi IPX7 yang membuatnya tahan air sepenuhnya. Nikmati suara 360 derajat yang kaya dan bass yang menghentak dari radiator pasif ganda. Sambungkan dua speaker untuk mode stereo dan nikmati musik hingga 15 jam non-stop dengan sekali pengisian daya.",
    price: 1200000,
    imageUrl: "https://picsum.photos/seed/6/600/400",
    stock: 25,
    imageHint: "bluetooth speaker",
    category: "Elektronik",
    variants: [
      {
        type: "Warna",
        options: [
          { value: "hitam", label: "Hitam" },
          { value: "biru", label: "Biru Samudra" },
          { value: "merah", label: "Merah Karang" },
        ],
      },
    ],
    reviews: [
      {
        id: "rev6-1",
        author: "TravelerSejati",
        rating: 5,
        comment: "Ukurannya kecil tapi suaranya dahsyat! Tahan air jadi aman dibawa ke pantai.",
        createdAt: "2024-01-02T17:00:00Z",
      },
      {
        id: "rev6-2", author: "Anak Kos", rating: 4, comment: "Bass-nya oke untuk ukuran segini. Koneksi bluetooth stabil.", createdAt: "2024-01-03T19:00:00Z",
      },
      {
        id: "rev6-3",
        author: "Pecinta Piknik", rating: 5, comment: "Wajib dibawa saat piknik atau kumpul bareng teman. Suaranya mengisi ruangan dengan baik.", createdAt: "2024-01-05T13:45:00Z",
      },
    ],
  },
  {
    id: "7",
    name: "Sepatu Lari Velocity",
    description: "Rasakan sensasi terbang di setiap langkah. Sepatu lari Velocity dirancang untuk kecepatan dan kenyamanan, menampilkan midsole busa 'React-X' yang sangat responsif untuk pengembalian energi maksimal. Bagian atas jaring rekayasa memberikan sirkulasi udara dan dukungan strategis, sementara sol luar karet karbon menawarkan daya cengkeram dan daya tahan superior.",
    price: 2100000,
    imageUrl: "https://picsum.photos/seed/7/600/400",
    stock: 4,
    imageHint: "running shoes",
    category: "Pakaian",
    variants: [
      {
        type: "Ukuran",
        options: [
          { value: "40", label: "40" },
          { value: "41", label: "41" },
          { value: "42", label: "42" },
          { value: "43", label: "43" },
          { value: "44", label: "44" },
        ],
      },
    ],
    reviews: [
      {
        id: "rev7-1",
        author: "Pelari Pagi",
        rating: 5,
        comment: "Sangat ringan dan empuk, nyaman banget buat lari jarak jauh.",
        createdAt: "2023-11-11T07:00:00Z",
      },
      {
        id: "rev7-2", author: "Dewi", rating: 4, comment: "Desainnya keren, cocok juga buat jalan-jalan santai.", createdAt: "2023-11-12T15:00:00Z",
      },
      {
        id: "rev7-3",
        author: "Hobi Lari", rating: 3, comment: "Bantalannya nyaman, tapi ukurannya terasa sedikit lebih kecil dari biasanya. Sarankan naik setengah ukuran.", createdAt: "2023-11-15T18:00:00Z",
      },
    ],
  },
  {
    id: "8",
    name: "Botol Baja HydroFlask",
    description: "Hidrasi optimal, di mana saja. Botol HydroFlask 32oz (946ml) ini dibuat dengan teknologi insulasi vakum TempShield™ untuk menjaga minuman es tetap dingin hingga 24 jam dan minuman panas tetap hangat hingga 12 jam. Terbuat dari baja tahan karat 18/8 pro-grade yang bebas BPA dan tidak akan mentransfer rasa. Lapisan bubuk Color Last™ yang khas memberikan pegangan anti-selip.",
    price: 675000,
    imageUrl: "https://picsum.photos/seed/8/600/400",
    stock: 50,
    imageHint: "water bottle",
    category: "Aksesori",
    variants: [
      {
        type: "Warna",
        options: [
          { value: "pacific", label: "Pacific" },
          { value: "olive", label: "Olive" },
          { value: "stone", label: "Stone" },
        ],
      },
    ],
    reviews: [
      {
        id: "rev8-1",
        author: "Pecinta Alam",
        rating: 5,
        comment: "Benar-benar menjaga air tetap dingin seharian. Kualitas bahannya premium.",
        createdAt: "2023-10-30T12:00:00Z",
      },
      {
        id: "rev8-2", author: "Mahasiswa", rating: 5, comment: "Tidak bocor sama sekali dan mudah dibersihkan. Wajib punya!", createdAt: "2023-11-01T09:00:00Z",
      },
      {
        id: "rev8-3",
        author: "Pekerja Kantoran", rating: 4, comment: "Warnanya bagus dan tidak mudah tergores. Sedikit berat jika diisi penuh, tapi sepadan.", createdAt: "2023-11-03T08:20:00Z",
      },
    ],
  },
  {
    id: "9",
    name: "Lampu Meja Lumina",
    description: "Penerangan cerdas untuk ruang kerja modern. Lampu meja LED Lumina tidak hanya terlihat elegan dengan bodi aluminiumnya, tetapi juga fungsional. Sesuaikan antara 5 mode suhu warna (dari hangat ke dingin) dan 7 tingkat kecerahan melalui panel sentuh yang intuitif. Lengan yang dapat disesuaikan dan kepala yang dapat diputar memastikan cahaya jatuh tepat di tempat yang Anda butuhkan.",
    price: 1345000,
    imageUrl: "https://picsum.photos/seed/9/600/400",
    stock: 18,
    imageHint: "desk lamp",
    qualityPassport: {
      tokenId: "QP-LUMI-2024-0009",
      origin: "Desain oleh studio 'Lumina Design' di Bandung, manufaktur presisi di fasilitas modern.",
      materials: ["Badan: Aluminium kelas aviasi", "Lengan: Baja ringan", "Panel: Sentuh kapasitif", "LED: Chip efisiensi tinggi dari Jerman"],
      manufacturingProcess: "Setiap unit melalui proses CNC untuk presisi, anodisasi untuk durabilitas, dan perakitan tangan untuk kontrol kualitas akhir. Diuji selama 48 jam non-stop sebelum dikemas.",
      certifications: ["Sertifikasi Hemat Energi (SNI)", "Sertifikasi Keamanan Elektronik (CE)"],
    },
    category: "Furnitur",
    reviews: [
      {
        id: "rev9-1",
        author: "Wulan",
        rating: 5,
        comment: "Desainnya elegan dan cahayanya bisa diatur jadi tidak bikin mata lelah. Suka banget!",
        createdAt: "2023-12-25T21:00:00Z",
      },
      {
        id: "rev9-2", author: "Ardi", rating: 4, comment: "Terang dan fungsional, tapi kabelnya agak kependekan untuk meja saya.", createdAt: "2023-12-26T22:30:00Z",
      },
      {
        id: "rev9-3",
        author: "Seniman Digital", rating: 5, comment: "Pengaturan suhu warnanya sangat berguna agar warna di layar tidak terdistorsi. Desainnya juga modern.", createdAt: "2023-12-28T15:50:00Z",
      },
    ],
  },
  {
    id: "10",
    name: "Kopi Artisan Roast",
    description: "Nikmati pengalaman kopi spesial dari dataran tinggi Aceh Gayo. Biji Arabika tunggal (single-origin) ini diproses secara semi-washed untuk menghasilkan profil rasa yang kompleks dan bersih. Anda akan menemukan nuansa cokelat hitam, rempah-rempah, dan sentuhan akhir jeruk yang menyegarkan. Disangrai medium untuk keseimbangan rasa yang sempurna.",
    price: 270000,
    imageUrl: "https://picsum.photos/seed/10/600/400",
    stock: 100,
    imageHint: "coffee beans",
    category: "Bahan Makanan",
    reviews: [
      {
        id: "rev10-1",
        author: "Barista Rumahan",
        rating: 5,
        comment: "Aromanya wangi sekali saat digiling. Rasanya seimbang, ada sedikit rasa buah. Kopi berkualitas!",
        createdAt: "2024-01-15T07:30:00Z",
      },
      {
        id: "rev10-2", author: "Pecinta Kopi", rating: 5, comment: "Salah satu kopi lokal terbaik yang pernah saya coba.", createdAt: "2024-01-14T08:00:00Z",
      },
      {
        id: "rev10-3",
        author: "Pemula", rating: 4, comment: "Rasanya tidak terlalu pahit, cocok untuk yang baru mau coba kopi biji. Aftertaste-nya enak.", createdAt: "2024-01-16T10:00:00Z",
      },
    ],
  },
  {
    id: "11",
    name: "Madu Hutan Asli 'Nektar Rimba'",
    description: "Nikmati kemurnian alam dengan Madu Hutan Asli Nektar Rimba. Dipanen secara lestari dari lebah liar di hutan pedalaman, madu ini memiliki rasa yang kaya dan kompleks dengan aroma bunga liar. Tanpa proses pemanasan berlebih, enzim dan nutrisi alaminya tetap terjaga.",
    price: 185000,
    imageUrl: "https://picsum.photos/seed/11/600/400",
    stock: 40,
    imageHint: "jar of wild honey",
    category: "Bahan Makanan",
    reviews: [
      {
        id: "rev11-1",
        author: "Herbalis Sehat",
        rating: 5,
        comment: "Madu ini benar-benar asli. Rasanya khas dan kental. Sangat bagus untuk menjaga stamina.",
        createdAt: "2024-01-18T09:00:00Z",
      },
      {
        id: "rev11-2",
        author: "Ibu Ani",
        rating: 4,
        comment: "Anak-anak suka sekali. Saya campurkan ke dalam teh atau olesan roti. Manisnya pas.",
        createdAt: "2024-01-19T15:30:00Z",
      },
    ],
  },
  {
    id: "12",
    name: "Teh Hijau Melati 'Sari Wangi'",
    description: "Rasakan ketenangan dalam setiap cangkir Teh Hijau Melati Sari Wangi. Perpaduan daun teh hijau pilihan dengan bunga melati segar menciptakan aroma yang menenangkan dan rasa yang lembut. Kaya akan antioksidan, teh ini adalah pilihan sempurna untuk relaksasi di sore hari.",
    price: 75000,
    imageUrl: "https://picsum.photos/seed/12/600/400",
    stock: 200,
    imageHint: "jasmine green tea leaves",
    category: "Bahan Makanan",
    reviews: [
      {
        id: "rev12-1",
        author: "Pecinta Teh",
        rating: 5,
        comment: "Aroma melatinya sangat wangi dan alami, tidak seperti teh celup biasa. Kualitasnya premium.",
        createdAt: "2024-01-20T16:00:00Z",
      },
      {
        id: "rev12-2",
        author: "Yoga Master",
        rating: 5,
        comment: "Sangat menenangkan. Saya minum ini sebelum sesi meditasi untuk membantu fokus.",
        createdAt: "2024-01-21T08:45:00Z",
      },
    ],
  },
  {
    id: "13",
    name: "Minyak Kelapa Murni (VCO) 'Tropica'",
    description: "Minyak Kelapa Murni Tropica adalah minyak serbaguna untuk kesehatan dan kecantikan. Dibuat dari kelapa segar melalui proses cold-pressed, VCO ini kaya akan asam laurat dan antioksidan. Gunakan untuk memasak, sebagai pelembap kulit, atau untuk perawatan rambut alami.",
    price: 95000,
    imageUrl: "https://picsum.photos/seed/13/600/400",
    stock: 80,
    imageHint: "virgin coconut oil in a glass bottle",
    category: "Bahan Makanan",
    reviews: [
      {
        id: "rev13-1",
        author: "Beauty Guru",
        rating: 5,
        comment: "Saya pakai ini untuk menghapus makeup dan sebagai pelembap. Kulit jadi lebih lembut dan sehat.",
        createdAt: "2023-12-10T19:00:00Z",
      },
      {
        id: "rev13-2",
        author: "Chef Sehat",
        rating: 4,
        comment: "Bagus untuk menumis, memberikan aroma kelapa yang ringan pada masakan. Tidak mudah gosong.",
        createdAt: "2023-12-12T12:00:00Z",
      },
    ],
  },
  {
    id: "14",
    name: "Keripik Singkong Balado 'Renyah Pedas'",
    description: "Nikmati sensasi pedas manis yang renyah dari Keripik Singkong Balado kami. Dibuat dari singkong pilihan yang diiris tipis dan dibalut dengan bumbu balado asli, camilan ini dijamin membuat ketagihan. Tanpa bahan pengawet, cocok untuk teman nonton atau kumpul keluarga.",
    price: 45000,
    imageUrl: "https://picsum.photos/seed/14/600/400",
    stock: 150,
    imageHint: "spicy balado cassava chips",
    category: "Bahan Makanan",
    reviews: [{ id: "rev14-1", author: "Anak Jajan", rating: 5, comment: "Pedasnya pas, manisnya juga! Renyah banget, susah berhenti ngunyah.", createdAt: "2024-01-22T14:00:00Z" }, { id: "rev14-2", author: "Bapak Budi", rating: 4, comment: "Enak buat teman ngopi sore-sore. Bumbunya melimpah.", createdAt: "2024-01-23T16:30:00Z" }],
  },
  {
    id: "15",
    name: "Dompet Kulit RFID 'Elegan'",
    stock: 22,
    description:
      "Tampil gaya sekaligus aman dengan Dompet Kulit Elegan. Dibuat dari kulit sapi asli berkualitas tinggi, dompet ini memiliki desain minimalis yang tipis namun fungsional. Dilengkapi lapisan RFID-blocking untuk melindungi kartu kredit dan data pribadi Anda dari pencurian nirkabel.",
    price: 450000,
    qualityPassport: {
      tokenId: "QP-ELEG-2024-0015",
      origin: "Pengrajin lokal di Garut, Jawa Barat, Indonesia.",
      materials: ["Kulit sapi asli (Full-grain)", "Lapisan kain RFID-blocking dari Jerman", "Benang jahit dari serat nilon"],
      manufacturingProcess: "Kulit dipilih secara manual, dipotong dengan presisi, dan dijahit tangan oleh pengrajin berpengalaman. Proses penyamakan nabati yang ramah lingkungan.",
      certifications: ["Sertifikasi Kulit Asli Indonesia", "Uji Lab RFID Blocking"],
    },
    variants: [
      {
        type: "Warna",
        options: [
          { value: "coklat", label: "Coklat Tua" },
          { value: "hitam", label: "Hitam Klasik" },
        ],
      },
    ],
    imageUrl: "https://picsum.photos/seed/15/600/400",
    imageHint: "slim leather wallet with rfid protection",
    category: "Aksesori",
    reviews: [{ id: "rev15-1", author: "Rian H.", rating: 5, comment: "Desainnya sangat tipis, nyaman di saku. Kulitnya terasa premium dan jahitannya rapi.", createdAt: "2024-01-25T10:00:00Z" }, { id: "rev15-2", author: "Dina S.", rating: 5, comment: "Fitur RFID blocking-nya memberikan rasa aman. Slot kartunya pas dan tidak mudah longgar.", createdAt: "2024-01-26T11:20:00Z" }],
  },
  {
    id: "16",
    name: "Kemeja Flanel Kotak-kotak 'Urban'",
    description:
      "Kemeja flanel klasik yang tak lekang oleh waktu. Terbuat dari 100% katun yang lembut dan hangat, kemeja 'Urban' ini sangat nyaman untuk dipakai sehari-hari. Pola kotak-kotaknya yang stylish mudah dipadukan untuk gaya kasual yang santai namun tetap rapi.",
    price: 380000,
    stock: 30,
    imageUrl: "https://picsum.photos/seed/16/600/400",
    imageHint: "plaid flannel shirt",
    category: "Pakaian",
    variants: [
      {
        type: "Ukuran",
        options: [
          { value: "s", label: "S" },
          { value: "m", label: "M" },
          { value: "l", label: "L" },
          { value: "xl", label: "XL" },
        ],
      },
    ],
    reviews: [{ id: "rev16-1", author: "Fajar A.", rating: 5, comment: "Bahannya adem dan tebalnya pas. Enak dipakai untuk kerja atau jalan-jalan.", createdAt: "2023-11-20T14:00:00Z" }, { id: "rev16-2", author: "Lia K.", rating: 4, comment: "Warnanya sesuai dengan gambar, ukurannya juga pas di badan. Suka banget!", createdAt: "2023-11-22T09:30:00Z" }],
  },
  {
    id: "17",
    name: "Cincin Pintar 'Aura Ring'",
    description:
      "Pantau kesehatan Anda dengan cara yang lebih elegan dan nyaman. Aura Ring adalah cincin pintar berbahan titanium yang ringan dan tahan lama. Ia melacak kualitas tidur, aktivitas harian, detak jantung, dan tingkat stres Anda secara akurat, lalu menyajikannya dalam aplikasi yang mudah dipahami.",
    price: 4500000,
    stock: 10,
    qualityPassport: {
      tokenId: "QP-AURA-2024-0017",
      origin: "Dirancang di Finlandia, dirakit di fasilitas berteknologi tinggi di Taiwan.",
      materials: ["Cincin: Titanium Grade 2 (Hypoallergenic)", "Sensor: Sensor inframerah, sensor suhu NTC, akselerometer 3D", "Lapisan dalam: Resin medis non-alergi"],
      manufacturingProcess: "Dibentuk dari blok titanium padat, dipoles hingga 10 tahap untuk kehalusan maksimal. Sensor dikalibrasi secara individual dan disegel untuk ketahanan air.",
      certifications: ["Sertifikasi FCC & CE", "ISO 13485 (Standar Alat Medis)"],
    },
    imageUrl: "https://picsum.photos/seed/17/600/400",
    imageHint: "a sleek smart ring on a finger",
    category: "Perangkat Pakai",
    reviews: [{ id: "rev17-1", author: "Tech Enthusiast", rating: 5, comment: "Jauh lebih nyaman dipakai tidur daripada smartwatch. Data analisis tidurnya sangat detail dan membantu.", createdAt: "2024-01-10T22:00:00Z" }, { id: "rev17-2", author: "Sarah M.", rating: 5, comment: "Desainnya cantik, orang tidak akan menyangka ini gadget. Baterainya tahan hampir seminggu, luar biasa!", createdAt: "2024-01-12T08:15:00Z" }],
  },
  {
    id: "18",
    name: "Rak Buku Industrial 'Loft'",
    description:
      "Hadirkan sentuhan gaya industrial modern ke ruangan Anda dengan Rak Buku Loft. Menggabungkan material kayu solid yang hangat dengan rangka besi hitam yang kokoh, rak ini tidak hanya fungsional tetapi juga menjadi statement piece yang menarik. Lima tingkat rak yang luas memberikan banyak ruang untuk koleksi buku dan dekorasi Anda.",
    price: 2200000,
    stock: 7,
    imageUrl: "https://picsum.photos/seed/18/600/400",
    imageHint: "industrial style bookshelf with wood and metal",
    category: "Furnitur",
    reviews: [{ id: "rev18-1", author: "Dekorator Rumah", rating: 5, comment: "Kualitasnya melebihi ekspektasi. Sangat kokoh dan terlihat jauh lebih mahal dari harganya. Mudah dirakit.", createdAt: "2023-12-01T18:00:00Z" }, { id: "rev18-2", author: "Kutu Buku", rating: 5, comment: "Akhirnya semua buku saya muat! Raknya kuat dan desainnya bikin ruang tamu jadi lebih keren.", createdAt: "2023-12-03T20:45:00Z" }],
  },
  {
    id: "19",
    name: "Proyektor Mini Portabel 'CinemaGo'",
    description:
      "Ubah dinding mana pun menjadi layar bioskop dengan CinemaGo. Proyektor portabel ini sangat ringkas namun mampu menampilkan gambar HD hingga 100 inci. Dilengkapi dengan baterai internal yang tahan hingga 2 jam dan speaker terintegrasi, proyektor ini sempurna untuk malam film spontan, presentasi, atau bahkan bermain game.",
    price: 1750000,
    stock: 1,
    imageUrl: "https://picsum.photos/seed/19/600/400",
    imageHint: "a mini portable projector displaying an image on a wall",
    category: "Elektronik",
    reviews: [{ id: "rev19-1", author: "Movie Mania", rating: 4, comment: "Untuk ukurannya yang kecil, kualitas gambarnya sangat bagus. Praktis dibawa ke mana-mana. Sangat direkomendasikan!", createdAt: "2024-01-08T21:00:00Z" }, { id: "rev19-2", author: "Ayah Hebat", rating: 5, comment: "Anak-anak senang sekali bisa nonton film di halaman belakang. Pengoperasiannya mudah dan koneksinya stabil.", createdAt: "2024-01-09T19:30:00Z" }],
  },
  {
    id: "20",
    name: "Celana Chino Slim-Fit 'Versa'",
    description:
      "Tingkatkan gaya kasual Anda dengan Celana Chino Versa. Dibuat dari bahan katun twill premium dengan sedikit stretch untuk kenyamanan bergerak sepanjang hari. Potongan slim-fit modern memberikan siluet yang rapi tanpa terasa terlalu ketat. Sempurna untuk dipadukan dengan kemeja atau kaos untuk berbagai kesempatan.",
    price: 420000,
    stock: 45,
    imageUrl: "https://picsum.photos/seed/20/600/400",
    imageHint: "men's slim-fit chino pants in khaki",
    category: "Pakaian",
    variants: [
      {
        type: "Warna",
        options: [
          { value: "khaki", label: "Khaki" },
          { value: "navy", label: "Navy" },
          { value: "hitam", label: "Hitam" },
          { value: "abu", label: "Abu-abu" },
        ],
      },
      {
        type: "Ukuran",
        options: [
          { value: "28", label: "28" },
          { value: "30", label: "30" },
          { value: "32", label: "32" },
          { value: "34", label: "34" },
          { value: "36", label: "36" },
        ],
      },
    ],
    reviews: [
      {
        id: "rev20-1",
        author: "Andika P.",
        rating: 5,
        comment: "Bahannya adem dan stretch, nyaman banget dipakai. Warnanya juga bagus.",
        createdAt: "2023-12-10T12:00:00Z",
      },
      {
        id: "rev20-2",
        author: "Rina W.",
        rating: 5,
        comment: "Beli untuk suami dan dia suka sekali. Katanya celana paling nyaman yang dia punya.",
        createdAt: "2023-12-15T18:30:00Z",
      },
    ],
  },
  {
    id: "21",
    name: "Kacamata Pintar 'Visionary X'",
    description:
      "Rasakan masa depan dengan Kacamata Pintar Visionary X. Dengarkan musik, terima panggilan telepon, dan dapatkan notifikasi langsung di depan mata Anda melalui layar micro-OLED transparan. Dilengkapi kamera terintegrasi untuk mengabadikan momen dari sudut pandang Anda. Desain ringan dan stylish membuatnya nyaman dipakai seharian.",
    price: 5800000,
    stock: 5,
    imageUrl: "https://picsum.photos/seed/21/600/400",
    imageHint: "stylish smart glasses",
    category: "Perangkat Pakai",
    reviews: [
      {
        id: "rev21-1",
        author: "Gadget Reviewer",
        rating: 4,
        comment: "Konsepnya keren! Kualitas audionya bagus, tapi daya tahan baterainya bisa lebih baik lagi.",
        createdAt: "2024-02-01T14:00:00Z",
      },
      {
        id: "rev21-2", author: "Biker Modern", rating: 5, comment: "Sangat berguna untuk navigasi saat bersepeda tanpa harus melihat HP. Keren!", createdAt: "2024-02-03T10:00:00Z",
      },
    ],
  },
]

export const productCategories = [...new Set(products.map((p) => p.category))]
