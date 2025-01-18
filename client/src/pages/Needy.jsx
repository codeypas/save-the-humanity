import React from 'react'

export default function Needy() {
  return (
    <div>
      needy
    </div>
  )
}



// import React, { useState } from 'react';
// import axios from 'axios';

// export default function NeedyForm() {
//   const [name, setName] = useState('');
//   const [need, setNeed] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/needy', { name, need })
//       .then(() => alert('Your request has been submitted!'))
//       .catch(err => console.error(err));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Needy Form</h1>
//       <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//       <textarea placeholder="What do you need?" value={need} onChange={(e) => setNeed(e.target.value)} required />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
