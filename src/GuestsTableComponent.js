import React, { useEffect, useRef, useState } from 'react';
import styles from './GuestsTableComponent.module.scss';

export default function GuestsTableComponent() {
  // Defining const
  const baseUrl = 'http://localhost:4000';
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  // Define refs for input field focus feature
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  // Functions
  // 1. fetch guest list when guests change
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
  }, [guests]);
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
    await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'DELETE',
    });
  }
  // 4. Async function to update user attendance
  async function updateGuest(guestId) {
    await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: isAttending }),
    });
    setIsAttending(!isAttending);
  }
  // Loading condition
  if (isLoading) {
    return 'Loading...';
  }
  // Start body
  return (
    <>
      {/* Start input fields */}
      <form>
        <label>
          First Name
          <input />
        </label>
        <label>
          Last Name
          <input />
        </label>
      </form>
      <div className={styles.inputFields}>
        {/* Start firstName input field */}
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          value={firstName}
          ref={firstNameRef}
          placeholder="Donald"
          disabled={isDisabled}
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
          id="lastName"
          name="lastName"
          value={lastName}
          ref={lastNameRef}
          placeholder="Duck"
          disabled={isDisabled}
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
                  aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                  onClick={() => {
                    updateGuest(guest.id).catch((error) => {
                      console.log(error);
                    });
                  }}
                />
              </td>
              <td>
                <button
                  aria-label={`Delete ${guest.firstName} ${guest.lastName}`}
                  onClick={() => {
                    deleteGuest(guest.id).catch((error) => {
                      console.log(error);
                    });
                  }}
                >
                  Delete
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
