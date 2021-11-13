import Link from "next/link";

const Sectionhero = ({
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


  return (
    <div className={`${heroclasses}`}>
      <div className={`content`}>
        <h2 className="heading-2 u-margin-bottom-small">{headline}</h2>
        {children}
      </div>

      <div className="overlay"></div>
      <img src={image} className="herobg" alt="" />
    </div>
  );
};

export default Sectionhero;
