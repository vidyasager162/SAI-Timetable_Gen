import React from "react";
import UserCard from "./UserCard";

function UserList(props) {
  return props.items.map((user) => {
    return (
      <div className="col">
        <UserCard
          key={user.id}
          id={user.id}
          img={user.img}
          name={user.name}
          class={user.class}
        />
      </div>
    );
  });
}

export default UserList;
