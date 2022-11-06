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

export const CardOverlayVersion = ({ mainphoto, title, subtitle, author, slug, key, clickFunction }) => { 
  return (
    <div className="card-OverlayType" key={key}>
      <div className="card-info">
        <Link href={`/blogs/${slug}`}>
          <a onClick={ clickFunction ? clickFunction : null}>
            <h2 className="heading-2 title">{title}</h2>
            <h3 className="heading-3 subtitle">{subtitle}</h3>
            {
              author ? <h4 className="heading-4 author">{author}</h4> : ""
            }
          </a>
        </Link>
      </div>

      <div className="overlay"></div>
      <img src={mainphoto} alt="" className="card-bg" />
    </div>
  );
}

