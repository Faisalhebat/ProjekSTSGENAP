let data2 = JSON.parse(localStorage.getItem("keluhanData")) || [];
let editIndex2 = -1;
let modal2 = document.getElementById("popup2");

function saveLocal(){
  localStorage.setItem("keluhanData", JSON.stringify(data2));
}

function formatTanggal(tgl){
  let b = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  let d = new Date(tgl);
  return d.getDate() + " " + b[d.getMonth()] + " " + d.getFullYear();
}

function buka2(){
  modal2.style.display = "block";
}

function tutup2(){
  modal2.style.display = "none";
  nama2.value = "";
  blok2.value = "";
  umur2.value = "";
  telp2.value = "";
  deskripsi2.value = "";
  tanggal2.value = "";
  editIndex2 = -1;
}

function simpan2(){
  if (!nama2.value || !blok2.value || !umur2.value || !telp2.value || !deskripsi2.value || !tanggal2.value){
    alert("Lengkapi formnya terlebih dahulu!");
    return;
  }

  let obj = {
    nama: nama2.value,
    blok: blok2.value,
    umur: umur2.value,
    telp: telp2.value,
    tanggal: formatTanggal(tanggal2.value),
    jenis: jenis2.value,
    deskripsi: deskripsi2.value,
    status: status2.value
  };

  if (editIndex2 == -1){
    data2.push(obj);
  } else {
    data2[editIndex2] = obj;
  }

  saveLocal();
  tutup2();
  tampil2();
}

function tampil2(){
  list2.innerHTML = "";

  let total = 0, diproses = 0, selesai = 0;
  let keyword = cari2.value.toLowerCase();

  data2.forEach((d,i)=>{
    if (d.nama.toLowerCase().includes(keyword)){
      total++;
      if(d.status=="Diproses") diproses++;
      if(d.status=="Selesai") selesai++;

      let warna = "#334155";
      if (d.status=="Diproses") warna="#10b981";
      if (d.status=="Selesai") warna="#064e3b";

      list2.innerHTML += `
      <div class="card2">
        <h3>${d.nama} 
        <span style="background:${warna}">${d.status}</span></h3>
        <p>Blok ${d.blok} • ${d.umur} tahun • ${d.telp}</p>
        <p>${d.jenis}</p>
        <p>${d.deskripsi}</p>
        <p style="margin-top:10px; font-size:12px; opacity:0.7;">${d.tanggal}</p>
        <button class="btn-edit2" onclick="edit2(${i})">Edit</button>
        <button class="btn-delete2" onclick="hapus2(${i})">Hapus</button>
      </div>`;
    }
  });

  total2.innerText = total;
  diproses2.innerText = diproses;
  selesai2.innerText = selesai;
}

function edit2(i){
  if (confirm("Yakin mau edit data ini?")) {
    let d = data2[i];

    nama2.value = d.nama;
    blok2.value = d.blok;
    umur2.value = d.umur;
    telp2.value = d.telp;
    jenis2.value = d.jenis;
    deskripsi2.value = d.deskripsi;
    status2.value = d.status;

    editIndex2 = i;
    buka2();
  } else {
    alert("Dibatalkan");
  }
}

function hapus2(i){
  if (confirm("Yakin mau hapus data ini?")) {
    data2.splice(i, 1);
    saveLocal();
    tampil2();
    alert("Data berhasil dihapus");
  } else {
    alert("Dibatalkan");
  }
}

window.onclick = function(e){
  if(e.target == modal2){
    tutup2();
  }
}

tampil2();