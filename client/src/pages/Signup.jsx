import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './Signup.css';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('donor'); // Default status
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = { username, email, status, password, phone };

  //   try {
  //     const res = await fetch('/api/auth/signup', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!res.ok) {
  //       throw new Error(`Error: ${res.status}`);
  //     }

  //     const data = await res.json();
  //     console.log('Signup successful:', data);

  //     navigate('/signin'); // Navigate to the success page
  //   } catch (error) {
  //     console.error('Error during signup:', error);
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = { username, email, status, password, phone };
  
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error: ${res.status}, ${errorData.message || errorData}`);
      }
  
      const data = await res.json();
      console.log('Signup successful:', data);
  
      navigate('/signin'); // Navigate to the success page
    } catch (error) {
      console.error('Error during signup:', error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" className="input-label">Username</label>
            <input
              type="text"
              id="username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="status" className="input-label">Status</label>
            <select
              id="status"
              className="input-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="donor">Donor</option>
              <option value="needy">Needy</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone" className="input-label">Phone Number</label>
            <input
              type="text"
              id="phone"
              className="input-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </div>
        </form>
        <p className="signin-prompt">
          Have an account?{' '}
          <Link to="/signin" className="signin-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
}






// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; // Import Link
// import './Signup.css';

// export default function SignUp() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [userType, setUserType] = useState('donor'); // Default userType
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = { username, email, userType, password, phone };

//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         throw new Error(`Error: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log('Signup successful:', data);

//       navigate('/signin'); // Navigate to the success page
//     } catch (error) {
//       console.error('Error during signup:', error);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h1 className="signup-title">Sign Up</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label htmlFor="username" className="input-label">Username</label>
//             <input
//               type="text"
//               id="username"
//               className="input-field"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="email" className="input-label">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="input-field"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="userType" className="input-label">Status</label>
//             <select
//               id="userType"
//               className="input-field"
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//               required
//             >
//               <option value="donor">Donor</option>
//               <option value="needy">Needy</option>
//             </select>
//           </div>
//           <div className="input-group">
//             <label htmlFor="password" className="input-label">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="input-field"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="phone" className="input-label">Phone Number</label>
//             <input
//               type="text"
//               id="phone"
//               className="input-field"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />
//           </div>
//           <div className="button-group">
//             <button type="submit" className="signup-button">
//               Sign Up
//             </button>
//           </div>
//         </form>
//         <p className="signin-prompt">
//           Have an account?{' '}
//           <Link to="/signin" className="signin-link">Sign In</Link>
//         </p>
//       </div>
//     </div>
//   );
// }
