import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list } from "../../actions/user";
import moment from "moment";
import { useFilterContext } from "../../context/filter_context";
import Sort from "../pageelements/Sort";
import Filter from "../pageelements/Filters";
import {getuserRoles} from "../../helpers/getuserroles";


const AllUsers = () => {

  const [users, setusers] = useState([]);

  useEffect(() => {
   list().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      setusers(data)
    }
   })
  }, []);


  const showAllUsers = () => {
    
    return users.map((user, i) => {

      return (
        <div className="user" key={i}>
          <div className="left">
            <div className="avatar">
              {!user.photo ? (
                <img src="/images/ui/avatar.jpg" alt="" />
              ) : (
                <img src={user.photo} alt="" />
              )}
            </div>
          </div>

          <div className="right">
            <h3 className="heading-3">{user.name}</h3>

            <h4 className="heading-4">{getuserRoles(user.role)}</h4>

            <div className="btn btn-primary-grad btn-edit">
              <Link href={`/admin/crud/user/${user.username}`}>
                Edit
              </Link>
            </div>
          </div>
        </div>
      );
    })
  }
  
  { console.log(users)}
  return (
    <React.Fragment>
      <div className="users-list">{showAllUsers()}</div>
    </React.Fragment>
  );
}

export default AllUsers;
