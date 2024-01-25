import './App.module.scss';
import { useState } from 'react';
import InputFieldComponent from './InputFieldComponent';
import TableComponent from './TableComponent';

export default function App() {
  const baseUrl = 'http://localhost:4000';
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <div>
      <InputFieldComponent isDisabled={isDisabled} />
      <TableComponent
        baseUrl={baseUrl}
        guests={guests}
        setGuests={setGuests}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setIsDisabled={setIsDisabled}
      />
    </div>
  );
}
