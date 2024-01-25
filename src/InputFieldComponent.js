import React from 'react';

export default function InputFieldComponent(props) {
  return (
    <form>
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
