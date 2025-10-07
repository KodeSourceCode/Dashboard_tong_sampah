// Ambil semua tombol menu header
showDashboard();
const headers = document.querySelectorAll(".menu-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const targetId = header.getAttribute("data-target");
    const submenu = document.getElementById(targetId);

    // Tutup semua submenu lain
    document.querySelectorAll(".submenu").forEach((menu) => {
      if (menu !== submenu) menu.classList.remove("show");
    });

    // Hapus kelas aktif dari semua header
    document.querySelectorAll(".menu-header").forEach((btn) => {
      if (btn !== header) btn.classList.remove("active");
    });

    // Toggle submenu yang diklik
    submenu.classList.toggle("show");
    header.classList.toggle("active");
  });
});


async function showDashboard() {
  const res = await fetch("/comp/dashboard");
  const text = await res.text();
  document.querySelector(".main").innerHTML = text;
  const circle = document.querySelector(".circular");
  const value = document.getElementById("percentValue"),
    inputValue = value.dataset.targetp;
  
  let percent = 0;
  
  const interval = setInterval(() => {
    value.innerHTML = `${percent}% <span>Kepenuhan</span>`;
    circle.style.background = `conic-gradient(#4285f4 ${
      percent * 3.6
    }deg, #dad9d965 0deg)`;
    if (percent >= inputValue) clearInterval(interval);
    percent++;
  }, 20);
}
const btn = document.getElementById("dashboard-menu");

btn.addEventListener("click", showDashboard);

const triggers = document.querySelectorAll("[detailTrigger]");
triggers.forEach((el) => {
  el.addEventListener("click", async () => {
    id = el.dataset.id;
    const res = await fetch("/comp/detail-trash/" + id);
    const text = await res.text();
    document.querySelector(".main").innerHTML = text;

    const circle = document.querySelector(".circular");
    const value = document.getElementById("percentValue"),
      inputValue = value.dataset.targetp;

    let percent = 0;
    let color = "#4285f4";

    const interval = setInterval(() => {
      value.innerHTML = `${percent}% <span>Kepenuhan</span>`;
      circle.style.background = `conic-gradient(${color} ${
        percent * 3.6
      }deg, #dad9d965 0deg)`;
      if (percent >= inputValue) clearInterval(interval);
      percent++;
      if (percent >= 70) color = "red";
    }, 20);

    const trashStatus = document.getElementById("trash-status");
    const root = document.querySelector(":root");
    if (trashStatus.textContent === "Kosong") {
      root.style.setProperty("--background-status", "green");
    } else {
      root.style.setProperty("--background-status", "red");
    }
  });
});
