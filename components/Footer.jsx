import React from 'react'
import Link from "next/link";


const Footer = () => {
  return (
    <footer>
      <div className="logotagline">
        <img src="/images/signal-logo.png" alt="" />
      </div>

      <div className="nav">
        <ul>
          <li>
            <Link href="/latest" passHref>
              <a>Latest</a>
            </Link>
          </li>
          <li>
            <Link href="/sports" passHref>
              <a>Sports</a>
            </Link>
          </li>
          <li>
            <Link href="/local" passHref>
              <a>Local</a>
            </Link>
          </li>
        </ul>
      </div>

      <p className="copyright">Copyright 2022</p>
    </footer>
  );
}

export default Footer
