import './App.module.scss';
import { useState } from 'react';
import InputFieldComponent from './InputFieldComponent';
import TableComponent from './TableComponent';

export default function App() {
  const baseUrl = 'http://localhost:4000';
  // 'https://3017054f-3047-4982-af57-e3eba6bfda04-00-2rhehhnwbgksp.picard.replit.dev';
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
