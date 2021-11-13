{
  !isAuth() && (
    <React.Fragment>
      <Link href="/signin">
        <a style={{ cursor: "pointer" }}>Signin</a>
      </Link>

      <Link href="/signup">
        <a style={{ cursor: "pointer" }}>Signup</a>
      </Link>
    </React.Fragment>
  );
}

{
  isAuth() && isAuth.role === 0 && (
    <li>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
    </li>
  );
}

{
  isAuth() && isAuth().role === 1 && (
    <Link href="/admin">{`${isAuth().name}'s   Dashboard`}</Link>
  );
}

{
  isAuth() && (
    <li onClick={() => signout(() => Router.replace(`/signin`))}>Signout</li>
  );
}
