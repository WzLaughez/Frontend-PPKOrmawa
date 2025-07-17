import React from 'react';

const OrganizationalDevelopmentPlan = () => {
  const sections = [
    {
      title: "Menciptakan Lingkungan Beriman, Bertakwa, dan Toleran",
      programs: [
        {
          name: "Kajian Rutin Keimanan dan Kebangsaan",
          description: "Mengadakan forum lintas agama untuk meningkatkan pemahaman, toleransi, dan harmoni antar mahasiswa."
        },
        {
          name: "Kampanye Nilai Kemanusiaan",
          description: "Mengadakan kegiatan seperti Hari Peduli Sesama atau diskusi tematik untuk menguatkan kesadaran beragama dan berbudaya."
        },
        {
          name: "Mentoring Rohani dan Psikologis",
          description: "Fasilitasi kegiatan seperti kelompok kecil diskusi keagamaan dan support group untuk menjaga keseimbangan spiritual dan mental mahasiswa."
        }
      ]
    },
    {
      title: "Membangun Iklim Organisasi yang Hidup dan Adaptif",
      programs: [
        {
          name: "Pemetaan Potensi Anggota",
          description: "Mengidentifikasi kekuatan, minat, dan keterampilan anggota untuk distribusi tugas yang efektif."
        },
        {
          name: "Pelatihan Kepemimpinan Dinamis",
          description: "Mengadakan workshop kepemimpinan berbasis adaptasi dan inovasi."
        },
        {
          name: "Rapat Evaluasi Berkala",
          description: "Menggunakan pendekatan partisipatif untuk meningkatkan kinerja dan dinamika organisasi."
        }
      ]
    },
    {
      title: "Menghadirkan Pengabdian yang Bernyawa",
      programs: [
        {
          name: "Bakti Sosial Berkelanjutan",
          description: "Pelaksanaan medical camp di daerah terpencil secara rutin dengan kolaborasi instansi kesehatan."
        },
        {
          name: "Edukasi Masyarakat Progresif",
          description: "Kampanye kesehatan berbasis isu aktual seperti stunting, kesehatan ibu-anak, dan penyakit menular."
        },
        {
          name: "Kampanye Lingkungan Aktif",
          description: "Program seperti eco-friendly campus, reboisasi, dan pengelolaan limbah medis."
        }
      ]
    },
    {
      title: "Membangkitkan Kesadaran Kolektif dan Mendorong Tindakan Nyata",
      programs: [
        {
          name: "Forum Isu Strategis",
          description: "Diskusi rutin dengan tema-tema kesehatan dan sosial yang relevan."
        },
        {
          name: "Kampanye Digital",
          description: "Menggunakan media sosial BEM untuk menyuarakan isu penting melalui infografik, video, dan artikel."
        },
        {
          name: "Hari Kesadaran Bersama",
          description: "Mengadakan acara seperti aksi damai atau kampanye donasi untuk menggerakkan kesadaran kolektif."
        }
      ]
    },
    {
      title: "Menghidupkan Potensi Prestasi Mahasiswa",
      programs: [
        {
          name: "Kompetisi Internal dan Eksternal",
          description: "Mengadakan mini-competition seperti lomba debat, poster kesehatan, atau penelitian."
        },
        {
          name: "Fasilitasi Peluang Prestasi",
          description: "Membentuk tim khusus untuk membantu mahasiswa mendapatkan informasi beasiswa, lomba, atau pelatihan internasional."
        },
        {
          name: "Inspirasi Prestasi",
          description: "Mengadakan talkshow dengan alumni atau mahasiswa berprestasi untuk membangun motivasi."
        }
      ]
    },
    {
      title: "Menjalin Kolaborasi untuk Dampak Lebih Besar",
      programs: [
        {
          name: "Kemitraan Strategis",
          description: "Mengadakan kerja sama dengan lembaga pemerintah, organisasi kesehatan, dan perusahaan."
        },
        {
          name: "Kolaborasi Antar BEM",
          description: "Menginisiasi proyek lintas fakultas atau universitas seperti National Medical Forum."
        }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {sections.map((section, index) => (
      <div 
        key={index} 
        className="bg-gradient-to-br from-[#1e1e2f] to-[#151522] rounded-xl ring-1 ring-white/10 shadow-lg transition-all duration-300 hover:ring-2 hover:ring-SweetDaisy/30"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">
            {index + 1}. {section.title}
          </h2>
        </div>

        {/* Program Items */}
        <div className="p-5">
          <div className="space-y-4">
            {section.programs.map((program, i) => (
              <div 
                key={i}
                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
              >
                <div className="mt-1 text-SweetDaisy text-lg">→</div>
                <div>
                  <h3 className="font-semibold text-white text-sm group-hover:text-SweetDaisy transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-gray-300 mt-1 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


  );
};

export default OrganizationalDevelopmentPlan;