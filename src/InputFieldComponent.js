import React from 'react';

export default function InputFieldComponent(props) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        First name
        <input disabled={props.isDisabled} />
      </label>
      <label>
        Last name
        <input disabled={props.isDisabled} />
      </label>
    </form>
  );
}
