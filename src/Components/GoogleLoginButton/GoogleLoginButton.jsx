import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from "../../assets/Google Icon.svg";
import './GoogleLoginButton.css';
import axios from 'axios';

const GoogleLoginButton = ({ setUser, setLoggedIn, toggleModal }) => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Fetch user info from Google
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });

        const userInfo = await userInfoResponse.json();
        console.log("User Info:", userInfo);

        // Send user data to backend for JWT authentication
        const { email, name } = userInfo;
        await axios.post('http://localhost:3001/api/users', { email, name }, { withCredentials: true });

        // Fetch authenticated user data
        const userSession = await axios.get("http://localhost:3001/api/users/me", { withCredentials: true });

        // Save user info in state
        setUser(userSession.data);
        setLoggedIn(true);
        toggleModal();
      } catch (error) {
        console.error("Error handling login:", error);
      }
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <div className="googleLogin">
      <button onClick={login}>
        <img src={GoogleIcon} alt="Google Icon" />
        <span className="description">Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
