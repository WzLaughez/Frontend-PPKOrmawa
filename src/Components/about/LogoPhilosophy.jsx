export default function LogoPhilosophy() {
    const philosophyItems = [
      {
        image: "/Logo fk UM.png",
        title: "LOGO “FK UM”",
        text: "BEM FK UM bukan hanya organisasi yang berlandaskan ketakwaan dan kekeluargaan,  tetapi juga wadah kepemimpinan yang progresif, harmonis, dan adaptif. Dengan semangat kebermanfaatan, BEM FK UM membangun lingkungan dinamis, kolaboratif, serta mencetak dokter berprestasi, peduli, dan inovatif yang berdampak nyata bagi masyarakat."
      },
      {
        image: "/Logo Tulisan.png",
        title: `"BEM Fakultas Kedokteran UM"`,
        text: "Menggambarkan identitas organisasi yang kuat sebagai kolegium mahasiswa FK UM. Susunan melingkar menegaskan kesatuan dan kontinuitas perjuangan organisasi."
      },
      {
        image: "/ular.png",
        title: "ULAR",
        text: "Simbol kesehatan dan kedokteran, terinspirasi dari Tongkat Asklepios yang melambangkan penyembuhan dan kebijaksanaan. Simbol ular yang melingkar melambangkan kesatuan, perlindungan, dan keberlanjutan perjuangan mahasiswa kedokteran dalam mengembangkan ilmu dan bakti sosial."
      },
      {
        image: "/padi.png",
        title: "TIGA BUTIR PADI",
        text: "Tiga butir padi dalam logo BEM FK UM menggambarkan kesejahteraan, tanggung jawab akademik, serta dedikasi dalam dunia medis dan sosial. Simbol ini juga merepresentasikan Tri Dharma Perguruan Tinggi yang menjadi landasan mahasiswa FK UM dalam belajar, meneliti, dan mengabdi."
      },
      {
        image: "/tangan.png",
        title: "Tangan Menengadah",
        text: "Tangan menengadah melambangkan BEM FK UM tidak hanya menjadi organisasi mahasiswa biasa, tetapi juga rumah bagi pemimpin yang berkarakter, berakhlak, dan berdedikasi dalam mengabdi kepada Tuhan dan sesama."
      },
      {
        image: "/daun.png",
        title: "DAUN",
        text: "Merepresentasikan pertumbuhan ilmu, inovasi, dan pengembangan diri dalam dunia kesehatan. BEM FK UM juga memiliki kepedulian terhadap lingkungan yang sehat dan berkelanjutan."
      },
      {
        image: "/bintang.png",
        title: "BINTANG",
        text: "Bintang menjadi lambang nilai-nilai ketuhanan,moral, etika, serta keyakinan bahwa semua ilmu dan usaha harus didasarkan pada kebaikan serta keikhlasan. 5 Arah Sudut lancip dalam bintang juga mengimplementasikan bahwa BEM FK UM selalu berlandaskan dengan ideologi Pancasila."
      },
      {
        image: "/Logo_Hijau.png",
        title: "Warna Emas dan Hijau",
        text: `🟡 Warna Emas Melambangkan karakter pemimpin yang Berwibawa, bijak, beretika, dan bertanggung jawab dalam menjalankan tugas serta pengabdian kepada masyarakat. 🟢 Warna Hijau Warna hijau identik dengan dunia medis dan kesehatan, mencerminkan peran BEM FK UM dalam menjaga kesejahteraan dan keselamatan masyarakat dan senantiasa menjaga semangat inovasi, kaderisaasi, dan perkembangan ilmu kedokteran yang terus berkelanjutan.`
      }
    ];
  
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Full Logo Section */}
      <div className="text-center">
        <img src="/Logo_Hijau.png" alt="Full Logo" className="w-48 mx-auto" />
        <p className="mt-4 text-lg text-Peach">
        BEM FK UM bukan hanya organisasi yang berlandaskan ketakwaan dan kekeluargaan tetapi juga wadah kepemimpinan yang progresif, harmonis, dan adaptif yang siap mencetak tenaga kesehatan berprestasi, peduli, dan inovatif yang berdampak nyata bagi masyarakat.
        </p>
        <p className="mt-2 text-sm text-white">
          ~Arunika Nawasena
        </p>
      </div>

      {/* Philosophy Items */}
      <div className="grid gap-6 grid-cols-1 ">
        {philosophyItems.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-4 border rounded-lg shadow-sm transition duration-300 ease-in-out transform hover:shadow-md hover:-translate-y-1">
            <img src={item.image} alt={item.title} className="w-16 h-16  object-cover rounded-full md:mr-4  " />
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-Peach">{item.title}</h3>
              <p className="text-Peach">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  }
  