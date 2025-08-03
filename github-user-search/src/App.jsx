import GitHubSearch from './components/GitHubSearch';
import './index.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
      </header>
      <main className="app-main">
        <GitHubSearch />
      </main>
    </div>
  );
}

export default App;