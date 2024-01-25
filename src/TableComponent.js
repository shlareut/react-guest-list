import React, { useEffect } from 'react';

export default function TableComponent(props) {
  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${props.baseUrl}/guests`);
      const allGuests = await response.json();
      await props.setIsLoading(false);
      await props.setGuests(allGuests);
      await props.setIsDisabled(false);
    };
    getGuests().catch((error) => {
      console.log(error);
    });
  });
  if (props.isLoading) {
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
        {props.guests.map((person) => (
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
