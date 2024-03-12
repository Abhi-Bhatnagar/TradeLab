import { addDoc, collection } from 'firebase/firestore'; // Add this line to import addDoc and collection
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from './Firebase'; // Import the Firebase Firestore instance

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, toggle] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(); // Get the Auth instance
      if (signIn) {
        await signInWithEmailAndPassword(auth, email, password); // Sign in user with email and password
        alert("Logged In Successfully");
        window.location.href = "/dashboard";
      } else {
        // Check if the name field is empty
        if (!name.trim()) {
          setError('Name is required');
          return; // Stop form submission if name is missing
        } else {
          setError(null); // Clear name error if name is provided
          const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Create user with email and password
        const user = userCredential.user;
        await addUserToFirestore(user.uid, name); // Add user details to Firestore
        alert("Account Created Successfully");
        window.location.href = "/dashboard";
        }
        
      }
    } catch (error) {
      const code = error.code.replace("auth/", "").split("-");
      console.log(code)
      const error_code = code.map(code => code.charAt(0).toUpperCase() + code.slice(1)).join(" ");
      console.log(error_code)
      setError(error_code);
    }
  }

  const addUserToFirestore = async (userID, username) => {
    try {
      await addDoc(collection(db, "user_info"), {
        UserID: userID,
        Username: username,
        Wallet: 100000, // You can initialize other fields here
      });
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
  };

  const containerStyle = {
    backgroundColor: "#141F2A",
    borderRadius: "15px",
    boxShadow:
      "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
    position: "relative",
    overflow: "hidden",
    width: "678px",
    maxWidth: "100%",
    minHeight: "400px",
    transform: "scale(1.5)"
  };

  const signUpContainerStyle = {
    position: "absolute",
    top: 0,
    height: "100%",
    transition: "all 0.6s ease-in-out",
    left: 0,
    width: "50%",
    opacity: signIn !== true ? 1 : 0,
    zIndex: signIn !== true ? 2 : null,
    transform: signIn !== true ? "translateX(100%)" : null,
  };

  const signInContainerStyle = {
    position: "absolute",
    top: 0,
    height: "100%",
    transition: "all 0.6s ease-in-out", // Add transition property for smoothness
    left: 0,
    width: "50%",
    zIndex: signIn !== true ? null : 2,
    opacity: signIn !== true ? 0 : 1,
    transform: signIn !== true ? "translateX(100%)" : null,
  };

  const formStyle = {
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 50px",
    height: "100%",
    textAlign: "center",
  };

  const titleStyle = {
    fontWeight: "bold",
    margin: 0,
  };

  const inputStyle = {
    backgroundColor: "#eee",
    border: "none",
    padding: "12px 15px",
    margin: "8px 0",
    width: "100%",
  };

  const buttonStyle = {
    borderRadius: "20px",
    border: "1px solid #2962FF",
    backgroundColor: "#2962FF",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "12px 45px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    transition: "transform 80ms ease-in",
    outline: "none",

    cursor: "pointer",
    ":active": {
      transform: "scale(0.95)",
    },
  };

  const ghostButtonStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    borderColor: "#ffffff",
  };

  const anchorStyle = {
    //color: "#333",
    fontSize: "14px",
    textDecoration: "none",
    margin: "15px 0",
  };

  const overlayContainerStyle = {
    position: "absolute",
    top: 0,
    left: "50%",
    width: "50%",
    height: "100%",
    overflow: "hidden",
    transition: "transform 0.6s ease-in-out",
    zIndex: 100,
    transform: signIn !== true ? "translateX(-100%)" : null,
  };

  const overlayStyle = {
    background:
      "linear-gradient(to right, #08203b, #2962FF)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "0 0",
    color: "#ffffff",
    position: "relative",
    left: "-100%",
    height: "100%",
    width: "200%",
    transform: signIn !== true ? "translateX(50%)" : null, // Combine the transform property
    transition: "transform 0.6s ease-in-out",
  };

  const overlayPanelStyle = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 40px",
    textAlign: "center",
    top: 0,
    height: "100%",
    width: "50%",
    transform: "translateX(0)",
    transition: "transform 0.6s ease-in-out",
  };

  const leftOverlayPanelStyle = {
    ...overlayPanelStyle,
    transform: signIn !== true ? "translateX(0%)" : null,
  };

  const rightOverlayPanelStyle = {
    ...overlayPanelStyle,
    right: 0,
    transform: signIn !== true ? "translateX(20%)" : null,
  };

  const paragraphStyle = {
    fontSize: "14px",
    fontWeight: 100,
    lineHeight: "20px",
    letterSpacing: "0.5px",
    margin: "20px 0 30px",
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#131D28' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div style={containerStyle}>
          <div style={signUpContainerStyle}>
            <form style={formStyle}>
              <h1 style={titleStyle}>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                style={inputStyle}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ paddingTop: '10px' }}>
                <button style={buttonStyle} onClick={handleSubmit} >Sign Up</button>
              </div>
              {error && <p style={{ color: 'red', paddingTop: '10px' }}>{error}</p>}
            </form>
          </div>

          <div style={signInContainerStyle}>
            <form style={formStyle}>
              <h1 style={titleStyle}>Log in</h1>
              <input
                type="email"
                placeholder="Email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#" style={anchorStyle}>Forgot your password?</a>
              <button style={buttonStyle} onClick={handleSubmit}>Log In</button>
              {error && <p style={{ color: 'red', paddingTop: '10px' }}>{error}</p>}
            </form>
          </div>

          <div style={overlayContainerStyle}>
            <div style={overlayStyle}>
              <div style={leftOverlayPanelStyle}>
                <h1 style={titleStyle}>Welcome Back!</h1>
                <p style={paragraphStyle}>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  style={ghostButtonStyle}
                  onClick={() => {
                    toggle(true); // Update the email state
                    setError(null)
                }}
                >
                  Log In
                </button>
              </div>
              <div style={rightOverlayPanelStyle}>
                <h1 style={titleStyle}>Learn to Earn</h1>
                <p style={paragraphStyle}>
                  Enter your details and start your journey with us
                </p>
                <button
                  style={ghostButtonStyle}
                  onClick={() => {
                    toggle(false);
                    setError(null);
                }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;