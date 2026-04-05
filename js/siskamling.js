let data3 = [
        { hari: "Senin", nama: ["akbar", "idonk"] },
        { hari: "Selasa", nama: ["budi", "vconk"] },
        { hari: "Rabu", nama: ["charlie", "puth"] },
        { hari: "Kamis", nama: ["dewi", "garut"] },
        { hari: "Jumat", nama: ["eko", "serasa"] },
        { hari: "Sabtu", nama: ["fina", "ikut"] },
        { hari: "Minggu", nama: ["nogkrong", "hendra"] },
      ];

      function tampil3() {
        data3.forEach(function (hariData, hariIndex) {
          let list = document.getElementById("list-" + hariIndex);
          list.innerHTML = "";

          if (hariData.nama.length === 0) {
            list.innerHTML = "<p>Belum ada nama</p>";
          } else {
            hariData.nama.forEach(function (nama, namaIndex) {
              list.innerHTML += `
              <div class="d-flex justify-content-between mb-2">
                <span>${nama}</span>
                <div>
                  <button class="btn btn-sm btn-success" onclick="edit3(${hariIndex}, ${namaIndex})">Edit</button>
                  <button class="btn btn-sm btn-danger" onclick="hapus3(${hariIndex}, ${namaIndex})">Hapus</button>
                </div>
              </div>
              `;
            });
          }
        });
      }

      function tambah3(index) {
        let input = document.getElementById("input-" + index);
        let nama = input.value;

        if (nama !== "") {
          data3[index].nama.push(nama);
          input.value = "";
          tampil3();
        }
      }

      function hapus3(i, j) {
        data3[i].nama.splice(j, 1);
        tampil3();
      }

      function edit3(i, j) {
        let namaBaru = prompt("edit nama:", data3[i].nama[j]);
        if (namaBaru !== null) {
          data3[i].nama[j] = namaBaru;
          tampil3();
          alert("nama diubah");
        } else {
          alert("edit dibatalkan");
        }
      }

      tampil3();    