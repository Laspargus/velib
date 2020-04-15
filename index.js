let url = "";
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=10&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes&geofilter.distance=${position.coords.latitude},${position.coords.longitude},1500`;
  });
} else {
  url =
    "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=10&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes&geofilter.distance=48.8520930694,2.34738897685,2";
}

let velibDiv = document.querySelector("#velib");

const checkVelib = () => {
  velibDiv.innerHTML = "";
  const velib = fetch(url)
    .then((response) => response.json())
    .then((velibList) => nodeVelib(velibList.records))
    .catch((error) => console.error("error:", error));

  const nodeVelib = (list) => {
    list.forEach((station) => {
      console.log(station);

      const stationName = station.fields.name;
      const bikeFree = station.fields.mechanical;
      const ebikeFree = station.fields.ebike;
      const freeSlot = station.fields.numdocksavailable;

      velibDiv.innerHTML += `<tr>
          <td>${stationName}</td>
          <td>${bikeFree}</td>
          <td>${ebikeFree}</td>
          <td>${freeSlot}</td>
        </tr>`;
    });
  };
};

let checkRefresh = setInterval(checkVelib, 60000);
