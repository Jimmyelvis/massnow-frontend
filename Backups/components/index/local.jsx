import Link from "next/link";

const local = () => {
  return (
    <div className="local">
      <div className="secheading">
        <h2 className="heading-2 u-margin-bottom-big">Local</h2>
      </div>

      <div className="content">
        <div className="entry">
          <div className="thumb">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1608082349/vuooeo8wlbg4nbptiatf.jpg"
              alt=""
            />
          </div>

          <Link href={"blogs/why-your-vote-matters"}>
            <a>
              <h4 className="heading-4">Why Your Vote Matters</h4>
            </a>
          </Link>
        </div>

        <div className="entry">
          <div className="thumb">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634401031/yvxmmeqvfm6nz8curiyy.jpg"
              alt=""
            />
          </div>

          <Link
            href={"blogs/local-car-show-will-bring-fun-for-the-entire-family"}
          >
            <a>
              <h4 className="heading-4">
                Local Car Show Will Bring Fun for the Entire Family
              </h4>
            </a>
          </Link>
        </div>

        <div className="entry">
          <div className="thumb">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634418006/vqukzqwmb1tphalilqd5.jpg"
              alt=""
            />
          </div>

          <Link
            href={"blogs/downtown-concert-series-set-to-start-this-weekend"}
          >
            <a>
              <h4 className="heading-4">
                Downtown Concert Series Set To Start This Weekend
              </h4>
            </a>
          </Link>
        </div>

        <div className="entry">
          <div className="thumb">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634358696/xgh7f5efwk8ckzkesyjt.jpg"
              alt=""
            />
          </div>

          <Link
            href={"blogs/as-covid-restrictions-ease-more-people-dining-out"}
          >
            <a>
              <h4 className="heading-4">
                As Covid Restrictions Ease, More People Dining Out
              </h4>
            </a>
          </Link>
        </div>

        <div className="entry">
          <div className="thumb">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634354893/nwpaj8tjbpyodgtdwoxq.jpg"
              alt=""
            />
          </div>

          <Link href={"blogs/what-is-your-favorite-kind-of-coffee"}>
            <a>
              <h4 className="heading-4">
                What is your favorite kind of Coffee?
              </h4>
            </a>
          </Link>
        </div>

        <div className="entry">
          <div className="thumb">
            <img
              src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634353722/jkmwm9ma7xtyzx1h6bld.jpg"
              alt=""
            />
          </div>

          <Link href={"blogs/2021-big-e-fair-draws-big-crowds"}>
            <a>
              <h4 className="heading-4">2021 Big E Fair Draws Big Crowds</h4>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default local;
