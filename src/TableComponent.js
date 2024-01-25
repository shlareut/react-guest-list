import React, { useEffect } from 'react';

export default function TableComponent({
  setGuests,
  setIsDisabled,
  setIsLoading,
  isLoading,
  guests,
  baseUrl,
}) {
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
  }, [baseUrl, setGuests, setIsDisabled, setIsLoading]);
  if (isLoading) {
    return 'Loading...';
  }
  return (
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
  );
}
