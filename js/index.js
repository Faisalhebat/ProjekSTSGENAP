function loadRiwayatKeluhan() {
        const data2 = JSON.parse(localStorage.getItem("dataKeluhan") || "[]");
        const container = document.getElementById("riwayat-keluhan");

        const latestKeluhan = data2.slice(-5).reverse();

        if (latestKeluhan.length === 0) {
          container.innerHTML =
            '<p style="text-align: center; color: var(--text-muted);">Belum ada keluhan</p>';
          return;
        }

        container.innerHTML = latestKeluhan
          .map(
            (keluhan) => `
        <div class="riwayat-item">
          <div class="riwayat-header">
            <h4>${keluhan.nama}</h4>
            <span class="status-badge status-${keluhan.status.toLowerCase().replace(" ", "-")}">${keluhan.status}</span>
          </div>
          <p class="riwayat-info">Blok ${keluhan.blok} • ${keluhan.umur} thn</p>
          <p class="riwayat-jenis"><i class="fa-solid fa-tag"></i> ${keluhan.jenis}</p>
          <p class="riwayat-desc">${keluhan.deskripsi.substring(0, 80)}${keluhan.deskripsi.length > 80 ? "..." : ""}</p>
        </div>
      `,
          )
          .join("");
      }

      window.onload = function () {
        loadRiwayatKeluhan();
      };