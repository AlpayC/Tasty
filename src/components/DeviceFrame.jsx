import { useEffect, useState } from "react";
import App from "../App.jsx";
import "./DeviceFrame.css";

// Ab dieser Fensterbreite wird die App im iPhone-12-Rahmen gezeigt.
// Darunter (echtes Handy / schmales Fenster) rendern wir die App direkt.
const FRAME_BREAKPOINT = 900;

export default function DeviceFrame() {
  const [showFrame, setShowFrame] = useState(
    () => window.innerWidth > FRAME_BREAKPOINT
  );

  useEffect(() => {
    const onResize = () => setShowFrame(window.innerWidth > FRAME_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!showFrame) {
    return <App />;
  }

  // Gleiche App, aber via ?embedded geladen -> main.jsx rendert dort <App />
  // statt erneut den Rahmen (verhindert Endlos-Verschachtelung).
  const src = `${window.location.pathname}?embedded${window.location.hash}`;

  return (
    <div className="device-stage">
      <div className="device-frame">
        <div className="device-notch" />
        <iframe
          className="device-screen"
          src={src}
          title="Tasty – iPhone 12 Vorschau"
        />
      </div>
    </div>
  );
}
