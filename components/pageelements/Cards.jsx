import React from 'react'
import Link from 'next/dist/client/link';

export const Smallblogcard = ({ mainphoto, title, author, slug}) => {
  return (
    <div className="entry">
      <div className="thumb">
        <img src={mainphoto} alt="" />
      </div>

      <Link href={`blogs/${slug}`} key={slug}>
        <a>
          <h4 className="heading-4">{title}</h4>
        </a>
      </Link>
    </div>
  );
}

