import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './FormfieldComponent.module.scss';

export default function FormfieldComponent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([]);

  // useEffect(() => {
  //   const newGuests = [...guests];
  //   newGuests.push('Test');
  //   setGuests(newGuests);
  // }, [guests]);

  return (
    <>
      <div className={styles.formfields}>
        <label htmlFor="firstName">First name</label>
        <input
          name="firstName"
          id="firstName"
          onChange={(event) => {
            const newFirstName = event.currentTarget.value;
            setFirstName(newFirstName);
          }}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          name="lastName"
          id="lastName"
          onChange={(event) => {
            const newLastName = event.currentTarget.value;
            setLastName(newLastName);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const uuid = uuidv4();
              const newGuests = [...guests];
              newGuests.push({
                uuid: uuid,
                firstName: firstName,
                lastName: lastName,
              });
              setGuests(newGuests);
            }
          }}
        />
      </div>
      <div>
        <div className={styles.guestTable}>
          <tr>
            <th>Attendance</th>
            <th>uuid</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          {guests.map((guest) => (
            <tr key={`ID${guest.uuid}`}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{guest.uuid}</td>
              <td>{guest.firstName}</td>
              <td>{guest.lastName}</td>
              <td>
                <button
                  onClick={() => {
                    const guestIndex = guests.findIndex(
                      (item) => item.uuid === guest.uuid,
                    );
                    const newGuests = [...guests];
                    newGuests.splice(guestIndex, 1);
                    setGuests(newGuests);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </div>
      </div>
    </>
  );
}
