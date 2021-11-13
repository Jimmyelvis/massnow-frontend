import Link from "next/link";

const Hero = ({
  headline,
  subheadline,
  image,
  children,
  heroclasses,
  contentColCount,
  multicolType,
  readmoreSection,
  readmoreLink,
}) => {
  const readMore = () => {
    if (readmoreSection) {
      return (
        <div className="readmore">
          {/* <svg className="readmoreicon">
                <use xlink:href="/images/sprite.svg#icon-arrow-right2"></use>
            </svg> */}

          <span className="readstory">
            <Link href={`/${readmoreLink}`}>
              <a>Read More</a>
            </Link>
          </span>
        </div>
      );
    }
  };

  return (
    <div className={`${heroclasses}`}>
      <div className={`content ${contentColCount} ${multicolType}`}>
        <div className="currentslideinfo">
          <h2 className="heading-2 u-margin-bottom-small">{headline}</h2>
          <p className="u-margin-bottom-medium">{subheadline}</p>
          {readMore()}
        </div>

        {children}
      </div>

      <div className="overlay"></div>
      <img src={image} className="herobg" alt="" />
    </div>
  );
};

export default Hero;
