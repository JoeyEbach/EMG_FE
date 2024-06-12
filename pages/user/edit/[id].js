import React, { useEffect, useState } from 'react';
import RegisterForm from '../../../components/RegisterForm';
import { useAuth } from '../../../utils/context/authContext';
import { singleUser } from '../../../api/userData';

export default function UpdateUser() {
  const [thisUser, setThisUser] = useState({});
  const { user } = useAuth();
  document.querySelector('body').setAttribute('data-theme', 'site');

  useEffect(() => {
    singleUser(user.uid)?.then(setThisUser);
  }, [user]);

  return (
    <RegisterForm userObj={thisUser} />
  );
}
