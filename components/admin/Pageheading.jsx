import React from 'react'

const Pageheading = ({ title, subtitle}) => {
  return (
    <div className="admin_section_heading">
      <h2 className="admin_heading-2 title">{title}</h2>
      <h3 className="admin_heading-3 subtitle">{subtitle}</h3>
    </div>
  );
}

export default Pageheading