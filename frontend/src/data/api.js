export default function getData(lat, lgn) {
  fetch(
    `https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=${lgn}&lat=${lat}&kinds=museums&format=json&apikey=5ae2e3f221c38a28845f05b672f12987087d7275fb9e12b59b197eaf`
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export function getdetails(xid) {
  fetch(
    `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b672f12987087d7275fb9e12b59b197eaf`
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}
