import React, { useEffect, useRef, useState } from 'react';
import styles from './GuestsTableComponent.module.scss';

export default function GuestsTableComponent() {
  // Defining const
  const baseUrl = 'http://localhost:4000';
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // Define refs for input field focus feature
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  // useEffect functions
  // 1. fetch guest list on each render
  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuests(allGuests);
    };
    getGuests().catch((error) => {
      console.log(error);
    });
  });
  // 2. Async function to create user
  async function createGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    const createdGuest = await response.json();
    const newGuests = [...guests];
    newGuests.push(createdGuest);
    setGuests(newGuests);
  }
  // 3. Async function to delete user
  async function deleteGuest(guestId) {
    const response = await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    const deletedGuestIndex = guests.findIndex((item) => item.id === guestId);
    const newGuests = [...guests];
    newGuests.splice(deletedGuestIndex, 1);
    setGuests(newGuests);
  }

  // Start body
  return (
    <>
      {/* Start input fields */}
      <div className={styles.inputFields}>
        {/* Start firstName input field */}
        <label htmlFor="firstName">First name</label>
        <input
          name="firstName"
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
        {/* End firstName input field */}
        {/* Start lastName input field */}
        <label htmlFor="lastName">Last name</label>
        <input
          name="lastName"
          value={lastName}
          ref={lastNameRef}
          placeholder="Duck"
          onChange={(event) => {
            const newLastName = event.currentTarget.value;
            setLastName(newLastName);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              createGuest().catch((error) => {
                console.log(error);
              });
              setFirstName('');
              setLastName('');
              firstNameRef.current.focus();
            }
          }}
        />
        {/* End lastName input field */}
      </div>
      <p>{firstName}</p>
      <p>{lastName}</p>
      {/* End input fields */}
      {/* Start guest table display */}
      <table className={styles.guestTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Attending</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={`ID${guest.id}`}>
              <td>{guest.id}</td>
              <td>{guest.firstName}</td>
              <td>{guest.lastName}</td>
              <td>{guest.attending ? 'true' : 'false'}</td>
              <td>
                <button
                  onClick={() => {
                    deleteGuest(guest.id).catch((error) => {
                      console.log(error);
                    });
                  }}
                >
                  Delete {guest.id}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* End guest table display */}
    </>
  );
}
