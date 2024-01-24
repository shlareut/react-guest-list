import React, { useState } from 'react';
import styles from './FormfieldComponent.module.scss';

export default function FormfieldComponent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const guests = '';
  return (
    <div className={styles.formfields}>
      <label htmlFor="firstName">First name</label>
      <input name="firstName" id="firstName" />
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
            // const newLastName = event.currentTarget.value;
            // setLastName(newLastName);
            // const newFirstName = event.target;
            guests = { lastName };
          }
        }}
      />
      <p>{guests}</p>
    </div>
  );
}
