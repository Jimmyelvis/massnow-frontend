import React, { useState, useEffect } from "react";
import Link from "next/link";
import { sortElems } from "../../helpers/sorting";
import { Smallblogcard } from "../pageelements/Cards";
import { Avatar } from "../../components/pageelements/Avatar";
import moment from "moment";
import renderHTML from "react-render-html";


const local = ({ articles }) => {
  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {

    let sortArticles;

    if (articles.length > 0) {
      sortArticles = [...articles]
        .sort((art1, art2) => {
          return sortElems(art1, art2, "featuredLocal");
        })
        .filter((article) => {
          return article.featuredLocal > 0;
        });
    }

    console.log('========bfdb============================');
    console.log(sortArticles);
    console.log('====================================');

    
    let firstArticle = sortArticles[0];
    let secondArticle = sortArticles[1];

    let theRest = sortArticles.slice(2, 7);

    console.log('=================rest===================');
    console.log(theRest);
    console.log('====================================');

    return (
      <>

        <div className="left">
          <div className="article">
            <div className="mainphoto">
              <img src={firstArticle.mainphoto} alt="" />
            </div>

            <Link href={`/article/${firstArticle.slug}`}>
              <a className="heading-3 title">{firstArticle.title} </a>
            </Link>
            
            <div className="author">
              <Avatar user={firstArticle.postedBy} />

              <div className="date">{moment(firstArticle.createdAt).format("MMM Do YYYY")}</div>

              <div className="name">{firstArticle.postedBy && firstArticle.postedBy.name}</div>
            </div>
          </div>

          <div className="article">
            <div className="mainphoto">
              <img src={secondArticle.mainphoto} alt="" />
            </div>


            <Link href={`blogs/${secondArticle.slug}`}>
              <a className="heading-3 title">{secondArticle.title}</a>
            </Link>

            <div className="author">
              <Avatar user={secondArticle.postedBy} />

              <div className="date">{moment(secondArticle.createdAt).format("MMM Do YYYY")}</div>

              <div className="name">{secondArticle.postedBy && secondArticle.postedBy.name}</div>
            </div>
          </div>
        </div>

        <div className="right"> 
        
          {theRest.map((article) => {

            return (
              <div className="article">
                <div className="mainphoto">
                  <img src={article.mainphoto} alt="" />
                </div>

                <div className="info">

                  <Link href={`blogs/${article.slug}`}>
                    <a className="heading-3 title">{article.title}</a>
                  </Link>

                  <div className="execrpt">{renderHTML(article.excerpt)}</div>

                  <div className="author">
                    <Avatar user={article.postedBy} />

                    <div className="date">{moment(article.createdAt).format("MMM Do YYYY")}</div>

                    <div className="name">{article.postedBy && article.postedBy.name}</div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </>
    );
     
  };



  return (
    <div className="local">
      <div className="secheading">
        <h2 className="heading-2 u-margin-bottom-big">Local</h2>
      </div>
      <div className="content">{getBlogs()}</div>
    </div>
  );
};

export default local;
