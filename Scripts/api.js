export default async function getData(URL) {
  var res = await fetch(URL);
  var data = await res.json();
  return data;
}
