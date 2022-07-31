import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default () => {
  const Navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService);
    Navigate('/');
  };
  return (
    <>
      <button onClick={onLogOutClick}>Sign Out</button>
    </>
  );
};
