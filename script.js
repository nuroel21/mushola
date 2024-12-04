$(document).ready(function () {
	const danaDibutuhkan = 100000000; // Contoh jumlah dana yang dibutuhkan

	// Inisialisasi DataTable
	const table = $("#example").DataTable({
		responsive: true,
		ajax: "https://script.google.com/macros/s/AKfycbwaVtFUpEy2ZXH-U7LQLR3pCliFHNnAgWakbUv1fJL_n6KV2wjcg-K0GKKayMpBOrOV/exec",
		columns: [
			{ title: "NO", data: "id" },
			{ title: "Tanggal", data: "tanggal" },
			{ title: "Wakif/Donatur", data: "nama_wakif" },
			{ title: "Jenis", data: "jenis" },
			{
				data: "nilaiRp",
				title: "Nilai Rupiah",
				render: function (data) {
					return formatRupiah(data.toString(), "Rp. ");
				},
			},
			{ title: "Keterangan", data: "keterangan" },
		],
		footerCallback: function (row, data, start, end, display) {
			// Hitung total donasi terkumpul
			let totalDonasi = data.reduce((sum, record) => {
				let nilaiRp = parseInt(record.nilaiRp) || 0; // Validasi angka
				return sum + nilaiRp;
			}, 0);

			// Hitung kekurangan
			let kekurangan = danaDibutuhkan - totalDonasi;

			// Update elemen card
			document.getElementById("donasiTerkumpul").textContent = formatRupiah(totalDonasi.toString(), "Rp. ");
			document.getElementById("kekurangan").textContent = formatRupiah(kekurangan.toString(), "Rp. ");
		},
	});

	// Fungsi format rupiah
	function formatRupiah(angka, prefix) {
		if (!angka) return "-";
		let number_string = angka.replace(/[^,\d]/g, "").toString(),
			split = number_string.split(","),
			sisa = split[0].length % 3,
			rupiah = split[0].substr(0, sisa),
			ribuan = split[0].substr(sisa).match(/\d{3}/gi);

		if (ribuan) {
			let separator = sisa ? "." : "";
			rupiah += separator + ribuan.join(".");
		}

		return prefix + rupiah;
	}
});
