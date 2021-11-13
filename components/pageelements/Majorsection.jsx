const Majorsection = (
  {
    picture1, 
    picture2, 
    picture3, 
    headline1, 
    headline2, 
    headline3, 
    author1,
    author2, 
    author3, 
  }
  ) => {
  return (
    <div className="majorsection">
       <div className="entry">
            <div className="thumb">
              <img src={picture1} alt="" />
            </div>
  
            <h4 className="heading-4">{ headline1 }</h4>
            <span className="author">By { author1 }</span>
          </div>
  
          <div className="entry">
            <div className="thumb">
              <img src={picture2} alt="" />
            </div>
  
            <h4 className="heading-4">{ headline2 }</h4>
            <span className="author">By { author2 }</span>
          </div>
  
          <div className="entry">
            <div className="thumb">
              <img src={ picture3 } alt="" />
            </div>
  
            <h4 className="heading-4">{ headline3 } </h4>
            <span className="author">By { author3 }</span>
          </div>
      
    </div>
  )
}

export default Majorsection
