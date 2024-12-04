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

let index = 0;

function moveSlide(step) {
	const slides = document.querySelectorAll(".carousel-slide img");
	const totalSlides = slides.length;

	index += step;

	// Jika index kurang dari 0 (sebelum slide pertama), kita kembali ke slide terakhir
	if (index < 0) {
		index = totalSlides - 1;
	}
	// Jika index lebih dari jumlah slide (melewati slide terakhir), kita kembali ke slide pertama
	else if (index >= totalSlides) {
		index = 0;
	}

	const carousel = document.querySelector(".carousel-slide");
	carousel.style.transform = `translateX(-${index * 33.33}%)`; // 33.33% untuk menampilkan 3 gambar per tampilan
}

// Set interval untuk slide otomatis setiap 3 detik (3000 ms)
setInterval(() => {
	moveSlide(1); // Geser ke depan otomatis
}, 3000);
document.querySelectorAll(".gallery-image").forEach((image) => {
	image.addEventListener("click", (e) => {
		const imageUrl = e.target.src;
		const modalImage = document.getElementById("modalImage");
		modalImage.src = imageUrl;
		const myModal = new bootstrap.Modal(document.getElementById("imageModal"));
		myModal.show();
	});
});
