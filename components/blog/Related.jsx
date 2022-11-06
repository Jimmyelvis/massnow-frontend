import React from 'react'
import Link from "next/link";
import { CardOverlayVersion } from "../pageelements/Cards";

const Related = ({ related }) => {

  
  const showRelatedBlog = () => {
    return related.map((blog, i) => (
     
      <CardOverlayVersion
        mainphoto={blog.mainphoto}
        title={blog.title}
        subtitle={blog.subtitle}
        author={blog.author}
        slug={blog.slug}
        key={i}
      />
    ));
  };

  return (
    <div className="related">
      <h3 className="heading-3">You May Also Like</h3>

      <div className="related-blogs">{showRelatedBlog()}</div>
    </div>
  );
}

export default Related