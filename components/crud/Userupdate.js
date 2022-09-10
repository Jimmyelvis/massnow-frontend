import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getOneUser, changeUserRole } from "../../actions/user";
import { Inputfield_With_Icon } from "../pageelements/forms/Inputfields";
import { Avatar } from "../pageelements/Avatar";
import { getuserRoles } from "../../helpers/getuserroles";

const Userupdate = ({ router }) => {
  const token = getCookie("token");
  const roles = [0, 1, 2];
  let selectOptions;
  const [role, setRole] = useState(null);

  const [values, setValues] = useState({
    email: "",
    name: "",
    photo: "",
    username: "",
    user: {},
    userRole: null
  });

  const { email, name, photo, username, user, userRole } = values;

  useEffect(() => {
    getUser();
  }, [router]);

  const getUser = () => {
    if (router.query.user) {
      let username = router.query.user;

      getOneUser(token, username).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            email: data.email,
            name: data.name,
            photo: data.photo,
            username: data.username,
            user: data,
            userRole: data.role
          });
          setRole(data.role)
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    changeUserRole(token, username, role).then((data) => {
       if (data.error) {
         console.log(data.error);
       } else {
        console.log('===============response=====================');
        console.log(data);
        console.log('====================================');
       }
    })
  };

  return (
    <div className="userupdate">
      <div className="left">
        <Avatar user={user} />
      </div>

      <div className="right">
        <Inputfield_With_Icon
          value={name}
          icon="/images/ui/Icon ionic-md-person.svg"
          iconClassname="inputIcon"
          disabled={true}
        />

        <Inputfield_With_Icon
          value={username}
          icon="/images/ui/Icon ionic-md-person.svg"
          iconClassname="inputIcon"
          disabled={true}
        />

        <Inputfield_With_Icon
          value={email}
          icon="/images/ui/Icon material-email.svg"
          iconClassname="inputIcon"
          disabled={true}
        />

        <select
          onChange={(e) => {
            setRole(Number(e.target.value));
          }}
        >
          {/**
           * First get the current user role, then use the getuserRoles
           * helper to return the text
           */}
          <option value={user.role}>{getuserRoles(user.role)}</option>

          {/**
           * Get the other roles the is not currently assign to the user
           */}
          {(selectOptions = roles.filter((role) => role !== user.role))}

          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {getuserRoles(option)}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={(e) => { handleSubmit(e) }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default withRouter(Userupdate);
