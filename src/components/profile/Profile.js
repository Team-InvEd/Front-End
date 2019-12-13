import React from "react";

const Profile = props => {
  if (!props.user.email) {
    props.history.push("/log-in");
  }
  return (
    <div>
      Profile <br />
      Welcome {props.user.name} <br />
      Email: {props.user.email}
    </div>
  );
};

export default Profile;
