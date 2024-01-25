import React, { useEffect, useState } from 'react';

export default function InputAndTable() {
  const baseUrl = 'http://localhost:4000';
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuests(allGuests);
      setIsDisabled(false);
      setIsLoading(false);
    };
    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);
  if (isLoading) {
    return 'Loading...';
  }
  return (
    <>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          First name
          <input disabled={isDisabled} />
        </label>
        <label>
          Last name
          <input disabled={isDisabled} />
        </label>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Attending</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((person) => (
            <tr key={`ID${person.id}`} data-test-id="guest">
              <td>{person.id}</td>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
