import "./Notifier.css";

export default function Notifier({ count }) {
  return (
    <>
      {count ? (
        <div className="counter-container">
          <p className="counter">{count}</p>
        </div>
      ) : null}
    </>
  );
}
