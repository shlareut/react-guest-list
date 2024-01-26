import './App.module.scss';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const baseUrl =
    'https://3017054f-3047-4982-af57-e3eba6bfda04-00-2rhehhnwbgksp.picard.replit.dev';
  // 'https://3017054f-3047-4982-af57-e3eba6bfda04-00-2rhehhnwbgksp.picard.replit.dev';
  const [guestCounter, setGuestCounter] = useState(0); // Create helper state to use in useEffect as a dependency
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  // Define refs for input field focus feature
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  // useEffect to fetch data from API
  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuests(allGuests);
      setIsDisabled(false);
      setIsLoading(false);
      console.log('Pageload...');
    };
    getGuests().catch((error) => {
      console.log(error);
    });
  }, [isAttending, guestCounter]);
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
    setGuestCounter(guestCounter + 1);
  }
  // 3. Async function to delete user
  async function deleteGuest(guestId) {
    await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'DELETE',
    });
    setGuestCounter(guestCounter - 1);
  }
  // 4. Async function to update user attendance
  async function updateGuest(guestId) {
    await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !isAttending }),
    });
  }
  // Start of HTML content
  return (
    <>
      {/* Start input fields */}
      <p>
        {firstName}
        {lastName}
        {isAttending}
      </p>
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
      </form>
      {/* End input fields */}
      {/* Loading condition */}
      {isLoading ? (
        'Loading...'
      ) : (
        // Start guest table
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
                    onChange={() => {
                      updateGuest(guest.id).catch((error) => {
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
        // End guest table
      )}
    </>
  );
}
