import './App.module.scss';
import GuestsTableComponent from './GuestsTableComponent';

export default function App() {
  return (
    <div>
      <form>
        <label>
          First name
          <input />
        </label>
        <label>
          Last name
          <input />
        </label>
      </form>
      <GuestsTableComponent />
    </div>
  );
}
