import React from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import insertRole from '../../utils/insertRole';
import avatar from '../../img/avatar.png';

function ProfileSidebar({ user, access, deleteUser }) {
  return (
    <Card>
      <CardMedia
        overlay={<CardTitle title={user.username}
        subtitle={user.email} />}>
        <img src={avatar} />
      </CardMedia>
      <CardTitle title={user.name}
        subtitle={insertRole(user.roleId)}
      />
      {(access.user.roleId === 1 || access.user.id === user.id) &&
      <CardActions>
        <Link to={`/users/${user.id}/edit`}>
          <RaisedButton label="EDIT PROFILE" primary={true} />
        </Link>
        <Link to="" onClick={deleteUser}>
          <RaisedButton label="DELETE ACCOUNT" secondary={true} />
        </Link>
      </CardActions>
      }
    </Card>
  );
}

export default ProfileSidebar;
