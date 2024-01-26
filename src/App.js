import './App.module.scss';
import { useEffect, useRef, useState } from 'react';
import styles from './App.module.scss';

export default function App() {
  const baseUrl =
    'https://3017054f-3047-4982-af57-e3eba6bfda04-00-2rhehhnwbgksp.picard.replit.dev';
  // 'https://3017054f-3047-4982-af57-e3eba6bfda04-00-2rhehhnwbgksp.picard.replit.dev';
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // Define refs for input field focus feature
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  // Fetch users on page load
  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuests(allGuests);
      setIsLoading(false);
      setIsDisabled(false);
    };
    getGuests().catch((error) => {
      console.log(error);
    });
  }, []);
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
    const newGuests = guests.filter((guest) => guest.id !== deletedGuest.id);
    setGuests(newGuests);
  }
  // 4. Async function to update user attendance
  async function updateGuest(guestId, guestAttending) {
    const response = await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !guestAttending }),
    });
    const updatedGuest = await response.json();
    const newGuests = guests.map((guest) =>
      guest.id === updatedGuest.id ? updatedGuest : guest,
    );
    setGuests(newGuests);
  }
  return (
    <>
      <h1>Guest List</h1>
      <form>
        <label>
          First name
          <input
            disabled={isDisabled}
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
        </label>
        <label>
          Last name
          <input
            disabled={isDisabled}
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
        </label>
        <p>Press ENTER to add new guest.</p>
      </form>
      {isLoading ? (
        'Loading...'
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Attending</th>
              <th>Check</th>
              <th>Remove?</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={`ID${guest.id}`} data-test-id="guest">
                <td>{guest.id}</td>
                <td>{guest.firstName}</td>
                <td>{guest.lastName}</td>
                <td className={styles.attendance}>
                  {JSON.stringify(guest.attending)}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={guest.attending}
                    aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                    onChange={() => {
                      updateGuest(guest.id, guest.attending).catch((error) => {
                        console.log(error);
                      });
                    }}
                  />
                </td>
                <td>
                  <button
                    aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                    onClick={() => {
                      deleteGuest(guest.id).catch((error) => {
                        console.log(error);
                      });
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
