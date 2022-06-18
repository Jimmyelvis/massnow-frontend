import React from 'react'
import { useFilterContext } from "../../../filter_context";

/**
 * Mobile Filters For Display on mobile devices
 * passed in from parent(Filters.js)
 */

const MobileFilters = ({filterText, showCategories, showcheckbox, clear}) => {
  const { filtered_blogs: blogs } = useFilterContext();

  return (
    <>
      <div className="mobileSortAndFilter">

        <div className="sorting">
          <h2 className="heading-2 blogs-total">{blogs.length} Blogs Total</h2>
        </div>
        <div className="filters mobileFilters">
          <div className="contain">
            {filterText}

            <h3 className="heading-3">Catagories</h3>

            <div className="links">
              {showCategories}
              {showcheckbox}
              {clear}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilters