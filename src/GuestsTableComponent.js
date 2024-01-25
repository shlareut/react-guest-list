import React, { useEffect, useRef, useState } from 'react';
import styles from './GuestsTableComponent.module.scss';

export default function GuestsTableComponent() {
  // Defining const
  const baseUrl = 'http://localhost:4000';
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  // Define refs for input field focus feature
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  // Functions
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
  }
  // 4. Async function to update user attendance
  async function updateGuest(guestId) {
    const response = await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: isAttending }),
    });
  }
  // 5. Handle checkbox behaviour
  function handleCheck() {
    // The issue is that setting the state directly in the checkbox won't work as it referring to the old state
    setIsAttending(!isAttending);
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
            <tr key={`ID${guest.id}`} data-test-id="guest">
              <td>{guest.id}</td>
              <td>{guest.firstName}</td>
              <td>{guest.lastName}</td>
              <td>{JSON.stringify(guest.attending)}</td>
              <td>
                <input
                  type="checkbox"
                  checked={guest.attending}
                  onChange={() => {
                    handleCheck();
                    updateGuest(guest.id).catch((error) => {
                      console.log(error);
                    });
                  }}
                />
              </td>
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
