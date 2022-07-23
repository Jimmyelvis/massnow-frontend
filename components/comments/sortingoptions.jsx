import React from 'react'

export const Sortingoptions = ({ setsortValue }) => {
  return (
    <div className="dropdown">
      <label htmlFor="sort">Sort by</label>

      <div className="selector">
        <select
          name="sort"
          id="sort"
          className="sort-input"
          //  value={sort}
          onChange={(e) => {
            setsortValue(e.target.value);
          }}
        >
          <option value="earliest">Earliest</option>
          <option value="latest">Latest</option>
          <option value="replies">Replies</option>
          <option value="recommended">Recommended</option>
        </select>
        <div class="custom-arrow"></div>
      </div>
    </div>
  );
}
