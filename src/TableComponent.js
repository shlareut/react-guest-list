import React, { useEffect } from 'react';

export default function TableComponent(props) {
  useEffect(() => {
    const getGuests = async () => {
      props.setIsDisabled(false);
      props.setIsLoading(false);
      const response = await fetch(`${props.baseUrl}/guests`);
      const allGuests = await response.json();
      props.setGuests(allGuests);
    };
    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);
  // Should try to place useEffect into App.js and only trigger on initial render // or alternatively I should create all functions first and then see if the error still persists, maybe it fixes something
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
