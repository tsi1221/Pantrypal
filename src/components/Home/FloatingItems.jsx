const FloatingItems = () => {
  const emojis = [
    "🥦", "🍎", "🥛", "🍞", "🥤", "🍿", "🧀", "🥚",
    "🥩", "🍗", "🐟", "🥫", "🧂", "🍫"
  ];

  return (
    <div className="floating-items">
      {emojis.map((emoji, idx) => (
        <span key={idx} className="floating-item">{emoji}</span>
      ))}
    </div>
  );
};

export default FloatingItems;
