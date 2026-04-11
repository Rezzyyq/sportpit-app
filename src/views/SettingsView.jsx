export default function SettingsView({ theme, toggleTheme }) {
  return (
    <div className="content">
      <h2>Налаштування сайту</h2>
      <button onClick={toggleTheme}>
        {theme === "dark" ? "Світла тема" : "Темна тема"}
      </button>
    </div>
  );
}
