import React from 'react';

export default function TableComponent() {
  return (
    <>
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
