export default function SettingsView({ theme, toggleTheme }) {
  return (
    <div className="content">
      <section className="panel">
        <p className="eyebrow">Персоналізація</p>
        <h2>Налаштування сайту</h2>
        <p>Перемикай тему під освітлення на робочому місці.</p>
      </section>
      <button className="primary-action" onClick={toggleTheme}>
        {theme === "dark" ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
      </button>
    </div>
  );
}
