import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './FormfieldComponent.module.scss';

export default function FormfieldComponent() {
  const [firstName, setFirstName] = useState('');
  const firstNameRef = useRef();
  const [lastName, setLastName] = useState('');
  const lastNameRef = useRef();
  const [guests, setGuests] = useState([]);

  // useEffect(() => {
  //   const newGuests = [...guests];
  //   newGuests.push('Test');
  //   setGuests(newGuests);
  // }, [guests]);

  // useEffect(() => {
  //   const createGuest = async () => {
  //     const response = await fetch(`${baseUrl}/guests`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         firstName: firstName,
  //         lastName: lastName,
  //       }),
  //     });
  //     const createdGuest = await response.json();
  //   };
  //   createGuest();
  //   return () => {};
  // }, [firstName, lastName]);

  return (
    <>
      <div className={styles.formfields}>
        <label htmlFor="firstName">First name</label>
        <input
          name="firstName"
          id="firstName"
          value={firstName}
          ref={firstNameRef}
          placeholder="Donald"
          onChange={(event) => {
            const newFirstName = event.currentTarget.value;
            setFirstName(newFirstName);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              lastNameRef.current.focus();
            }
          }}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          name="lastName"
          id="lastName"
          value={lastName}
          ref={lastNameRef}
          placeholder="Duck"
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
              setFirstName('');
              setLastName('');
              firstNameRef.current.focus();
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
            <tr key={`ID${guest.uuid}`} data-test-id="guest">
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
