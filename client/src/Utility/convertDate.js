export default function convertDate(timestamp) {
  const date = new Date(timestamp);

  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
