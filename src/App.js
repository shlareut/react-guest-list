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
  const [isShowAll, setIsShowAll] = useState(true);
  const [isShowAttending, setIsShowAttending] = useState(false);
  const [isShowNotAttending, setIsShowNotAttending] = useState(false);
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
  // 5. Helper function to delete all attending guests without setting the state YET
  async function deleteAllAttendingGuestWithoutSettingState(guestId) {
    const response = await fetch(`${baseUrl}/guests/${guestId}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    return deletedGuest;
  }
  // 6. Function to delete all attending guests
  async function deleteAllAttendingGuests() {
    console.log('start deleting...');
    const deleteAttendingGuestsPromises = guests
      .filter((guest) => guest.attending === true)
      .map((guest) => deleteAllAttendingGuestWithoutSettingState(guest.id));
    const deleteAttendingGuests = await Promise.all(
      deleteAttendingGuestsPromises,
    );
    const deletedGuests = await Promise.all(
      deleteAttendingGuests.map((guest) => guest.id),
    );
    console.log('finish deleting...');
    console.log(deletedGuests);
    // Checking if ANY guest was not deleted, it yes, this guest will be pushed into the new guests array
    const newGuests = [];
    for (const guest of guests) {
      if (!deletedGuests.includes(guest.id)) {
        newGuests.push(guest);
        console.log('Non-deleted guest found!');
      }
    }
    setGuests(newGuests);
  }
  return (
    <div className={styles.mainWrapper}>
      <h1>Guest List</h1>
      <div className={styles.topSubWrapper}>
        <fieldset className={styles.textInputFields}>
          <legend>Add guests</legend>
          <label className={styles.textInputLabel}>
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
          <label className={styles.textInputLabel}>
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
        </fieldset>
      </div>
      <div className={styles.bottomSubWrapper}>
        <div>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Attending</th>
                <th> </th>
              </tr>
            </thead>
            {isLoading ? (
              'Loading...'
            ) : (
              <tbody>
                {guests
                  .filter((guest) => {
                    if (isShowAttending) {
                      return guest.attending === true;
                    }
                    if (isShowNotAttending) {
                      return guest.attending === false;
                    } else {
                      return guest;
                    }
                  })
                  .map((guest) => (
                    <tr key={`ID${guest.id}`} data-test-id="guest">
                      <td>{guest.firstName}</td>
                      <td>{guest.lastName}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={guest.attending}
                          aria-label={`${guest.firstName} ${guest.lastName} attending status`}
                          onChange={() => {
                            updateGuest(guest.id, guest.attending).catch(
                              (error) => {
                                console.log(error);
                              },
                            );
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
            )}
          </table>
        </div>
        <div className={styles.quickActions}>
          <fieldset className={styles.filters}>
            <legend>Filters</legend>
            <label>
              <input
                type="radio"
                defaultChecked
                checked={isShowAll === true}
                onClick={() => {
                  setIsShowAll(true);
                  setIsShowAttending(false);
                  setIsShowNotAttending(false);
                }}
              />
              Show all
            </label>
            <label>
              <input
                type="radio"
                checked={isShowAttending === true}
                onClick={() => {
                  setIsShowAll(false);
                  setIsShowAttending(true);
                  setIsShowNotAttending(false);
                }}
              />
              Show attending
            </label>
            <label>
              <input
                type="radio"
                checked={isShowNotAttending === true}
                onClick={() => {
                  setIsShowAll(false);
                  setIsShowAttending(false);
                  setIsShowNotAttending(true);
                }}
              />
              Show not attending
            </label>
          </fieldset>
          <fieldset>
            <legend>Quick actions</legend>
            <button
              onClick={() => {
                deleteAllAttendingGuests().catch((error) => {
                  console.log(error);
                });
              }}
            >
              Remove attending guests
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
