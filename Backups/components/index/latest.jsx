import Link from "next/link";

const Latest = () => {
  return (
    <div className="latest">
      <div className="secheading">
        <h2 className="heading-2 u-margin-bottom-big">Latest</h2>
      </div>

      <div className="content">
        <div className="featured-story">
          <div className="overlay"></div>
          <img
            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1633648390/j0hjv4ihrgpmrxsugm8c.webp"
            alt=""
          />

          <div className="featured-info">
            <h3 className="heading-3">
              Redsox beats Yankees In Winner Takes All Game
            </h3>
            <p>New York Yankees 2-6 Boston Red Sox</p>
            <span className="author">Dylan Cougar </span>
          </div>
        </div>

        <div className="secondary">
          <div className="entry">
            <Link href={"blogs/more-employees-are-returning-to-their-offices"}>
              <a className="heading-3">
                More employees are returning to their offices
              </a>
            </Link>

            <span className="author">By Kate Vanny</span>

            <p>
              <div className="excerpt">
                Yr banjo cliche, everyday carry austin PBR&B fashion axe hexagon
                pok pok vice keffiyeh deep v crucifix chillwave. Migas crucifix
                celiac, ethical tattooed biodiesel slow-carb direct trade salvia
                skateboard waistcoat bespoke dreamcatcher iPhone kitsch. Keytar
                put a bird on it raclette, hammock humblebrag brunch butcher
                etsy try-hard lo-fi lumbersexual salvia cloud bread ramps small
                batch.
              </div>
            </p>

            <div className="thumb">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634355588/b1hq3p5nluwlshkgewth.jpg"
                alt=""
              />
            </div>
          </div>

          <div className="entry">
            <Link href={"blogs/local-music-festival-draws-thousands"}>
              <a className="heading-3">Local Music Festival draws Thousands</a>
            </Link>

            <span className="author">By Kate Vanny </span>

            <p>
              <div className="excerpt">
                Non pinterest hexagon, man braid tilde twee est intelligentsia.
                Hell of sriracha lomo heirloom velit asymmetrical cardigan VHS
                kogi. Taxidermy messenger bag sed, slow-carb migas swag neutra
                single-origin coffee. Sriracha austin sustainable slow-carb dolore
                anim enamel pin. Gochujang kale chips affogato chillwave air plant
                venmo cloud bread kinfolk. You probably haven't heard of them
                flannel kickstarter commodo velit neutra DIY williamsburg XOXO
                whatever pitchfork lumbersexual art party.
              </div>
            </p>

            <div className="thumb">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634355368/nli98udgkbhh5lkg9h1h.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="additional-stories">
          <Link
            href={
              "blogs/southwest-airlines-cancels-1800-flights-blaming-weather-and-staffing"
            }
          >
            <a className="entry">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634358385/edlacs0wdt8wycrvtmym.jpg"
                alt=""
              />
              <h4 className="heading-4">
                Southwest Airlines cancels 1,800 flights, blaming weather and
                staffing
              </h4>
            </a>
          </Link>

          <Link
            href={"blogs/as-covid-restrictions-ease-more-people-dining-out"}
          >
            <a className="entry">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634358696/xgh7f5efwk8ckzkesyjt.jpg"
                alt=""
              />
              <h4 className="heading-4">
                As Covid Restrictions Ease, More People Dining Out
              </h4>
            </a>
          </Link>

          <Link
            href={"blogs/as-covid-restrictions-ease-more-people-dining-out"}
          >
            <a className="entry">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634401585/rufvq8g6wxdxwd60rfb7.jpg"
                alt=""
              />
              <h4 className="heading-4">
                Caring For Newborns During Pandemic Times
              </h4>
            </a>
          </Link>

          <Link href={"blogs/how-secure-is-your-data-connection"}>
            <a className="entry">
              <img
                src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1634401829/f69hibjqz0ndziqqwjjv.jpg"
                alt=""
              />
              <h4 className="heading-4">How Secure is Your Data Connection?</h4>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Latest;
