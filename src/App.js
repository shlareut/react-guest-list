import './App.module.scss';
import { useState } from 'react';
import GuestsTableComponent from './GuestsTableComponent';
import InputFieldComponent from './InputFieldComponent';
import TableComponent from './TableComponent';

export default function App() {
  const baseUrl = 'http://localhost:4000';
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      {/* <GuestsTableComponent /> */}
      <InputFieldComponent />
      <TableComponent
        baseUrl={baseUrl}
        guests={guests}
        setGuests={setGuests}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
