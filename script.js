const canvas = document.getElementById("signature-pad");
const signaturePad = new SignaturePad(canvas);
const form = document.getElementById("formPresensi");
const tableBody = document.querySelector("#tabelPresensi tbody");
const exportBtn = document.getElementById("exportBtn");
const clearBtn = document.getElementById("clearBtn");

let dataPresensi = [];

clearBtn.addEventListener("click", () => {
  signaturePad.clear();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (signaturePad.isEmpty()) {
    alert("Silakan isi tanda tangan terlebih dahulu.");
    return;
  }

  const nama = document.getElementById("nama").value;
  const nip = document.getElementById("nip").value;
  const ttd = signaturePad.toDataURL();

  dataPresensi.push({ nama, nip, ttd });
  updateTable();
  form.reset();
  signaturePad.clear();
});

function updateTable() {
  tableBody.innerHTML = "";
  dataPresensi.forEach((data, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="border p-2">${index + 1}</td>
      <td class="border p-2">${data.nama}</td>
      <td class="border p-2">${data.nip}</td>
      <td class="border p-2">${data.jabatan}</td>
      <td class="border p-2"><img src="${data.ttd}" class="h-12"></td>
    `;
    tableBody.appendChild(row);
  });
}

exportBtn.addEventListener("click", () => {
  const exportData = dataPresensi.map((d, i) => ({
    No: i + 1,
    Nama: d.nama,
    Jabatan: d.jabatan,
    NIP: d.nip
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Presensi");
  XLSX.writeFile(wb, "Data_Presensi.xlsx");
});