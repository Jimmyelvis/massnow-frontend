const Hero = () => {
  return (
    <div className="hero">
        <div className="content">
          <div className="currentslideinfo">
            <h2 className="heading-2 u-margin-bottom-small">
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <p className="u-margin-bottom-medium">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non,
              nihil.
            </p>

            <div className="readmore">
              {/* <svg className="readmoreicon">
                <use xlink:href="/images/sprite.svg#icon-arrow-right2"></use>
            </svg> */}

              <span className="readstory"> Read Story </span>
            </div>
          </div>

          <div className="otherstories">
            <ul>
              <li className="story">
                <img
                  src="/images/thumbs/domenico-loia-310197-unsplash@2x.jpg"
                  alt=""
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dignissimos, sit.
                </p>
              </li>
              <li className="story">
                <img src="/images/thumbs/pexels-photo-2781760.jpg" alt="" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dignissimos, sit.
                </p>
              </li>
              <li className="story">
                <img
                  src="/images/thumbs/pexels-ichad-windhiagiri-4096356.jpg"
                  alt=""
                />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dignissimos, sit.
                </p>
              </li>
              <li className="story">
                <img src="/images/thumbs/bald-eagle-5657154_1920.jpg" alt="" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dignissimos, sit.
                </p>
              </li>
            </ul>

            {/* <h3 className="heading-3">ALL NEWS</h3> */}

            
            
          </div>
        </div>

        <div className="overlay"></div>
        <img src="/images/HeroBg.jpg"class="herobg" alt=""/>
      </div>
      
  )
}

export default Hero
