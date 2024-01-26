import React, { useEffect } from 'react';

export default function TableComponent(props) {
  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${props.baseUrl}/guests`);
      const allGuests = await response.json();
      props.setGuests(allGuests);
      props.setIsDisabled(false);
      props.setIsLoading(false);
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
    <ul>
      {props.guests.map((person) => (
        <li key={`ID${person.id}`} data-test-id="guest">
          {person.firstName} {person.lastName}
        </li>
      ))}
    </ul>
  );
}
