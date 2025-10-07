const express = require("express"),
  app = express(),
  PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

const trashData = [
  {
    title: "Trash 1",
    distance: 3.32,
    lastUpdate: "2025-10-06 09:15:32",
    maxDistance: 25,
  },
  {
    title: "Trash 2",
    distance: 18.7,
    lastUpdate: "2025-10-06 09:12:08",
    maxDistance: 25,
  },
  {
    title: "Trash 3",
    distance: 7.6,
    lastUpdate: "2025-10-06 09:10:45",
    maxDistance: 25,
  },
  {
    title: "Trash 4",
    distance: 22.5,
    lastUpdate: "2025-10-06 09:08:10",
    maxDistance: 25,
  },
  {
    title: "Trash 5",
    distance: 4.9,
    lastUpdate: "2025-10-06 09:06:30",
    maxDistance: 25,
  },
  {
    title: "Trash 6",
    distance: 25,
    lastUpdate: "2025-10-06 09:06:30",
    maxDistance: 25,
  },
].map((trash, idx) => ({
  ...trash,
  id: idx + 1,
  status: trash.distance < 10 ? "Penuh" : "Kosong",
  percentage: (100 - trash.distance / (trash.maxDistance / 100)).toFixed(0),
}));

const avgPercentage =
    trashData.reduce((sum, trash) => sum + Number(trash.percentage), 0) /
    trashData.length,
  valueAvgPercentage = avgPercentage.toFixed(0),
  dataLength = trashData.length;
app.get("/", (req, res) => {

  // console.log(trashData);

  res.render("index", {
    title: "Beranda",
    trashData,
    valueAvgPercentage,
    dataLength,
  });
});

app.get("/comp/detail-trash/:id", (req, res) => {
  const { id } = req.params;

  res.render("comp/detail", {
    trashData: trashData.filter((t) => t.id == parseInt(id))[0],
  });
});

app.get("/comp/dashboard/", (req, res) => {
  res.render("comp/dashboard", {
    trashData,dataLength,valueAvgPercentage
  })
})

app.listen(PORT, () => console.log(`SERVER BERJALAN DI ${PORT}`));
