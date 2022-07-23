import React from 'react'

export const ShowForm = ({ submitForm, body, handleBody, rows }) => {
  return (
    <form action="" onSubmit={submitForm}>
      <textarea
        type="text"
        className="form-control"
        placeholder="Add a comment"
        rows={rows}
        value={body}
        onChange={handleBody}
        name={"fdsfdsfdsfsdf"}
      />

      <button type="submit" className="btn btn-submit btn-primary-grad">
        Submit
      </button>
    </form>
  );
};

ShowForm.defaultProps = {
  rows: 10,
};