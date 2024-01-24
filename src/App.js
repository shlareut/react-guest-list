import './App.module.scss';
import FormfieldComponent from './FormfieldComponent';
import logo from './logo.svg';

export default function App() {
  const baseUrl = 'http://localhost:4000';
  return (
    <div data-test-id="guest">
      <div>Test</div>
      <div>
        <FormfieldComponent />
      </div>
    </div>
  );
}
