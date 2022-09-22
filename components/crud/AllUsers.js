import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list } from "../../actions/user";
import { useFilterContext } from "../../context/filter_context";
import Sort from "../pageelements/Sort";
import Filter from "../pageelements/Filters";
import { getuserRoles } from "../../helpers/getuserroles";
import { Select } from "../pageelements/Select";
import { Inputfield_With_Icon } from "../pageelements/forms/Inputfields";
import { IoIosCloseCircle } from "react-icons/io";


const AllUsers = () => {
  const [users, setusers] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [action, setaction] = useState("");

  useEffect(() => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setusers(data);
      }
    });
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setaction("");
    }
  }, [searchTerm]);

  const filterUsers = (e) => {
    let value = e.target.value;

    setsearchTerm(value);
  };

  const filterDropdown = (e) => {

    const options = [
      {
        value: "all",
        text: "All Roles",
      },
      {
        value: "0",
        text: "Subscribers",
      },
      {
        value: "1",
        text: "Authors",
      },
      {
        value: "2",
        text: " Admins",
      },
    ];

    return (
      <Select
        options={options}
        onChange={(e) => {
          filterUsers(e);
          setaction("role");
        }}
      />
    );
  };

  const filterText = () => {
    return (
      <input
        type="text"
        name="text"
        placeholder="search"
        className="form-control"
        onChange={(e) => {
          filterUsers(e);
          setaction("name");
        }}
      />
    );
  };

  const showAllUsers = () => {
    let tempUsers;

    if (action === "") {
      tempUsers = users;
    } else if (action === "name") {
      tempUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(searchTerm);
      });
    } else {
      tempUsers = users.filter((user) => {
        if (searchTerm === "all" || searchTerm === "") {
          return user;
        } else {
          return user.role.toString() === searchTerm;
        }
      });
    }

    return tempUsers.map((user, i) => {
      return (
        <div className="card user" key={i}>
          <Link href={`/admin/crud/user/${user.username}`}>
            <a>
              <img src="/images/ui/Edit_btn.svg" alt="" className="edit_btn" />
            </a>
          </Link>

          <div className="avatar">{!user.photo ? <img src="/images/ui/avatar.jpg" alt="" /> : <img src={user.photo} alt="" />}</div>

          <h3 className="admin_heading-3">{user.name}</h3>

          <h4 className="admin_heading-4">{getuserRoles(user.role)}</h4>
        </div>
      );
    });
  };


  return (
    <React.Fragment>
      <div className="userfilters">
        <div className="filter_text">{filterText()}</div>

        <div className="filter_role">{filterDropdown()}</div>
      </div>
      <div className="users-list">{showAllUsers()}</div>
    </React.Fragment>
  );
};

export default AllUsers;
