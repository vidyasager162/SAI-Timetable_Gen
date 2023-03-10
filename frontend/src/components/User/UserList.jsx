import React from "react";
import UserCard from "./UserCard";

function UserList(props) {
  return props.users.map((user) => {
    return (
      <div className="col">
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name}
          department={user.department}
        />
      </div>
    );
  });
}

export default UserList;
