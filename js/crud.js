let data2 = [];
      let editIndex2 = -1;
      let modal2 = document.getElementById("popup2");

      window.onload = function () {
        const savedData = localStorage.getItem("dataKeluhan");
        if (savedData) {
          data2 = JSON.parse(savedData);
        }
        tampil2();
      };

      function buka2() {
        modal2.style.display = "block";
        document.body.style.overflow = "hidden";
      }

      function tutup2() {
        modal2.style.display = "none";
        document.body.style.overflow = "auto";

        document.getElementById("nama2").value = "";
        document.getElementById("blok2").value = "";
        document.getElementById("umur2").value = "";
        document.getElementById("telp2").value = "";
        document.getElementById("jenis2").value = "";
        document.getElementById("deskripsi2").value = "";
        document.getElementById("status2").value = "Menunggu";

        editIndex2 = -1;
      }

      function simpan2() {
        const nama = document.getElementById("nama2").value;
        const blok = document.getElementById("blok2").value;
        const umur = document.getElementById("umur2").value;
        const telp = document.getElementById("telp2").value;
        const deskripsi = document.getElementById("deskripsi2").value;

        if (!nama || !blok || !umur || !telp || !deskripsi) {
          alert("⚠️ Lengkapi semua field yang wajib!");
          return;
        }

        let obj = {
          nama: nama,
          blok: blok,
          umur: umur,
          telp: telp,
          jenis: document.getElementById("jenis2").value,
          deskripsi: deskripsi,
          status: document.getElementById("status2").value,
        };

        if (editIndex2 === -1) {
          data2.push(obj);
          alert("✅ Keluhan berhasil ditambahkan!");
        } else {
          data2[editIndex2] = obj;
          alert("✅ Data berhasil diupdate!");
          editIndex2 = -1;
        }

        localStorage.setItem("dataKeluhan", JSON.stringify(data2));

        tutup2();
        tampil2();
      }

      function tampil2() {
        const list2 = document.getElementById("list2");
        const cari2 = document.getElementById("cari2").value.toLowerCase();

        list2.innerHTML = "";

        let total = 0,
          menunggu = 0,
          diproses = 0,
          selesai = 0;

        data2.forEach((d, i) => {
          if (
            d.nama.toLowerCase().includes(cari2) ||
            d.blok.toLowerCase().includes(cari2)
          ) {
            total++;

            if (d.status === "Menunggu") menunggu++;
            if (d.status === "Diproses") diproses++;
            if (d.status === "Selesai") selesai++;

            let warna = "#334155";
            if (d.status === "Diproses") warna = "#10b981";
            if (d.status === "Selesai") warna = "#059669";

            list2.innerHTML += `
        <div class="card2">
          <h3>${d.nama} 
            <span class="totaldata2" style="background:${warna}; color: white; padding: 5px 12px; border-radius: 20px; font-size: 12px;">${d.status}</span>
          </h3>
          <p><strong>🏠</strong> Blok ${d.blok} • ${d.umur} tahun • <strong>📱</strong> ${d.telp}</p>
          <p><strong>📋 ${d.jenis}</strong></p>
          <p>${d.deskripsi}</p>
          <div style="margin-top: 15px;">
            <button class="btn-edit2" onclick="edit2(${i})">✏️ Edit</button>
            <button class="btn-delete2" onclick="hapus2(${i})">🗑️ Hapus</button>
          </div>
        </div>`;
          }
        });

        document.getElementById("total2").innerText = total;
        document.getElementById("menunggu2").innerText = menunggu;
        document.getElementById("diproses2").innerText = diproses;
        document.getElementById("selesai2").innerText = selesai;
      }

      function edit2(i) {
        const d = data2[i];

        document.getElementById("nama2").value = d.nama;
        document.getElementById("blok2").value = d.blok;
        document.getElementById("umur2").value = d.umur;
        document.getElementById("telp2").value = d.telp;
        document.getElementById("jenis2").value = d.jenis;
        document.getElementById("deskripsi2").value = d.deskripsi;
        document.getElementById("status2").value = d.status;

        editIndex2 = i;
        buka2();
      }

      function hapus2(i) {
        if (confirm("🗑️ Yakin ingin menghapus keluhan ini?")) {
          data2.splice(i, 1);

          localStorage.setItem("dataKeluhan", JSON.stringify(data2));

          tampil2();
          alert("✅ Data berhasil dihapus!");
        }
      }

      window.onclick = function (e) {
        if (e.target === modal2) {
          tutup2();
        }
      };