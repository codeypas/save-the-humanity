// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const [topDonors, setTopDonors] = useState([]);
//   const navigate = useNavigate();

//   // Fetch top donors from the API
//   useEffect(() => {
//     const fetchTopDonors = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/top-donors");
//         setTopDonors(response.data);
//       } catch (error) {
//         console.error("Error fetching top donors:", error);
//       }
//     };

//     fetchTopDonors();
//   }, []);

//   // Handle Logout
//   const handleLogout = () => {
//     // Clear any stored user session data
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // Redirect to login page
//     navigate("/signin");
//   };

//   return (
//     <div>
//       <h1>Welcome to Our Non-Profit Organization</h1>

//       <h2>Top Donors</h2>
//       <ul>
//         {topDonors.length > 0 ? (
//           topDonors.map((donor) => (
//             <li key={donor.id}>
//               {donor.name} - ${donor.amount}
//             </li>
//           ))
//         ) : (
//           <p>No donors available at the moment.</p>
//         )}
//       </ul>

//       {/* Logout Button */}
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import for additional styling

export default function Home() {
  const [topDonors, setTopDonors] = useState([]);
  const [topDonor, setTopDonor] = useState(null);
  const navigate = useNavigate();

  // Fetch top donors from the API
  useEffect(() => {
    const fetchTopDonors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/top-donors");
        const donors = response.data;

        // Find the top donor based on the donation amount
        const highestDonor = donors.reduce((prev, curr) =>
          curr.amount > prev.amount ? curr : prev
        );

        setTopDonors(donors);
        setTopDonor(highestDonor);
      } catch (error) {
        console.error("Error fetching top donors:", error);
      }
    };

    fetchTopDonors();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    // Clear any stored user session data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to sign-in page
    navigate("/signin");
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Non-Profit Organization</h1>

      {/* Shoutout Section */}
      {topDonor && (
        <div className="shoutout-section">
          <h2>Shoutout to Our Top Donor!</h2>
          <div className="top-donor-card">
            <h3>{topDonor.name}</h3>
            <p>Donated: ${topDonor.amount}</p>
            <p>Thank you for making a difference!</p>
          </div>
        </div>
      )}

      <h2>All Top Donors</h2>
      <ul className="donor-list">
        {topDonors.length > 0 ? (
          topDonors.map((donor) => (
            <li key={donor.id}>
              {donor.name} - ${donor.amount}
            </li>
          ))
        ) : (
          <p>No donors available at the moment.</p>
        )}
      </ul>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

