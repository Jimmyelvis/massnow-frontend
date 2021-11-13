import Link from "next/link";

const sports = () => {
  return (
    <div className="sports">
      <div className="secheading">
        <h2 className="heading-2 u-margin-bottom-big">Sports</h2>
      </div>

      <div className="content">
        <div className="featured-story">
          <div className="overlay"></div>

          <img
            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634399887/ox8f8lcmugxlpx3de2mc.jpg"
            alt=""
          />

          <div className="featured-info">
            <Link href={"blogs/what-is-the-best-outlook-for-the-celtics-this-season"}>
              <a>
                <h3 className="heading-3 u-margin-bottom-small">
                  What is the best outlook for the Celtics this season
                </h3>
                <p>Can the Celtics exceed expetations</p>
              </a>
            </Link>
          </div>
        </div>

        <div className="additional-stories">
          <div className="entry">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1633648390/j0hjv4ihrgpmrxsugm8c.webp"
              alt=""
            />
            <Link
              href={
                "blogs/redsox-beats-yankees"
              }
            >
              <a>
                <h4 className="heading-4">
                Redsox beats Yankees In Winner Takes All Game
                </h4>
              </a>
            </Link>
          </div>

          <div className="entry">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634598601/ocwplq784oqhc0yshgih.jpg"
              alt=""
            />
            <Link href={"blogs/bruins-win-3-1-over-the-dallas-stars"}>
              <a>
                <h4 className="heading-4">
                  Bruins win 3-1 over the Dallas Stars
                </h4>
              </a>
            </Link>
          </div>

          <div className="entry">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634357682/ud8ulswmhssreqvga54b.jpg"
              alt=""
            />
            <Link
              href={
                "blogs/despite-covid-restrictions-high-school-sports-still-go-one"
              }
            >
              <a>
                <h4 className="heading-4">
                  Despite Covid Restrictions, High School Sports Still Go On
                </h4>
              </a>
            </Link>
          </div>

          <div className="entry">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634598964/ymtzfmvseyu3btrkmn4a.jpg"
              alt=""
            />
            <Link href={"blogs/patriots-lose-to-cowboys-in-overtime"}>
              <a>
                <h4 className="heading-4">
                  Patriots Lose To Cowboys In Overtime
                </h4>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sports;
