import React from "react";

export const Avatar = ({ user }) => {
  
  return (
    <div className="avatar">
      {!user.photo ? (
        <img src="/images/ui/avatar.jpg" alt="" />
      ) : (
        <img src={user.photo} alt="" />
      )}
    </div>
  );
}


