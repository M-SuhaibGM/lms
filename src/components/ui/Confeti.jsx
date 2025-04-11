// Confetti.js
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiAnimation = ({ duration = 5000 }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide the confetti after the specified duration
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, duration);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [duration]);

  if (!showConfetti) return null;

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      recycle={false} // Stop recycling after the animation ends
      numberOfPieces={200} // Number of confetti pieces
      gravity={0.2} // How fast the confetti falls
      wind={0.05} // Horizontal movement of confetti
    />
  );
};

export default ConfettiAnimation;