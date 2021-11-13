import  { useState, useEffect }  from 'react'
import { signin, authenticate, isAuth } from '../../actions/auth';
import { useGlobalContext } from "../../context";
import Router from 'next/router';



const SigninComponent = () => {
  const { isModalOpen, closeModal } = useGlobalContext();


  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
});

  const { email, password, error, loading, message, showForm } = values;

  // useEffect(() => {
  //   isAuth() && Router.push(`/`);
  // }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
      } else {
          // save user token to cookie
          // save user info to localstorage
          // authenticate user
          authenticate(data, () => {
            if (isAuth() && isAuth().role === 1) {
                Router.push(`/admin`);
            } else {
                Router.push(`/user`);
            }
          });

          setTimeout(() => {
            closeModal()
          }, 1300);
      }
    });
  };

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');

  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');

  const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signinForm = () => {
    return (
        <form onSubmit={handleSubmit}>
        
            <div className="inputField">
              <img
                src="/images/ui/Icon material-email.svg"
                alt=""
                className="inputIcon"
              />
              <input
                type="email"
                className="inputCtrl"
                placeholder="Email Address"
                value={email}
                onChange={handleChange('email')}
              />
            </div>

            <div className="inputField">
              <img
                src="/images/ui/Icon awesome-key.svg"
                alt=""
                className="inputIcon"
              />

              <input
                type="password"
                className="inputCtrl"
                placeholder="Password"
                value={password}
                onChange={handleChange('password')}
              />
            </div>

            <button className="btn btn-thirdcolor-grad">Sign In</button>
            
        </form>
    );
};


  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </React.Fragment>
  )
}

export default SigninComponent
