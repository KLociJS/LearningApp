import "./Notifier.css";

export default function Notifier({ count }) {
  const countDisplay = count > 9 ? "9+" : `${count}`;
  return (
    <>
      {count ? (
        <div className="counter-container">
          <p className="counter">{countDisplay}</p>
        </div>
      ) : null}
    </>
  );
}
