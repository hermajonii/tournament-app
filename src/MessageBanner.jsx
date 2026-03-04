import "./MessageBanner.css";

export default function MessageBanner({ message }) {
  if (!message || !message.trim()) return null;

  return (
    <div className="message-banner">
      <div className="message-banner-line" />
      <p className="message-banner-text">{message}</p>
      <div className="message-banner-line" />
    </div>
  );
}
