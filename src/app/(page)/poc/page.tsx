// "use client"
// import React, { useState, useEffect, useContext } from 'react';
// import SideNav from '../../components/sidenav';
// import Button from '../../components/button';
// import Topnav from '../../components/topnav';
// import PocTable from '@/app/components/poctable';
// import { useSearchParams } from 'next/navigation';
// import { isTokenExpired } from '@/app/utils/token';

// interface ProgramcareProps {
//   title: string;
// }
// interface PocProps {
//   data: {
//       id: number;
//       client_id: number;
//       company_id: number;
//       programcare_id: number;
//       description: string;
//       ProgramCare: ProgramcareProps;
//   }[];
//   title: string;
// }
// const POC = () => {
//   const searchParams = useSearchParams();
//   const clientName = searchParams.get('name');
//   const clientId = searchParams.get('id');
//   const [loading, setLoading] = useState<boolean>(true);
//   const [clientDetails, setClientDetails] = useState<{ clientname: string, clientId: number }>({
//     clientname: "",
//     clientId: 0
//   });
//   useEffect(() => {
//     if (clientName && clientId) {
//       setClientDetails({
//         clientname: decodeURIComponent(clientName),
//         clientId: parseInt(clientId, 10)
//       });
//     }
//   }, [clientName, clientId]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [data, setData] = useState([]);
//   const [programs, setPrograms] = useState<{ description: string }[]>([])
//   const [proCare, setProCare] = useState<PocProps['data']>([]);
//   const [TitleId,setSelectedTitleId] = useState(0)
//   const handleAddField = () => {
//     const newProgram = { description: '' };
//     setPrograms([...programs, newProgram]);
//   };
//   const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const newPrograms = [...programs];
//     newPrograms[index].description = event.target.value;
//     setPrograms(newPrograms);
//   };
//   const handleRemoveField = (index: any) => {
//     const newPrograms = programs.filter((_, i) => i !== index);
//     setPrograms(newPrograms);
//   };
//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };
//   const handleSubmit = async (event: any) => {
//     event.preventDefault();
//     const programsData = programs.filter(program => program.description.trim() !== '');
//     const requestData = {
//       client_id:clientDetails.clientId,
//       program_care_id:TitleId,
//       arr: programsData,
//     };
//     try {
//       const tokenn = localStorage.getItem('token');
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programcare`, {
//         method: 'POST',
//         headers: {
//           'x-access-token': tokenn as string,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const result = await response.json();
//       togglePopup();
//       setPrograms([]);
//       window.location.reload();
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   useEffect(() => {
//     const tokenn = localStorage.getItem('token');
//     if (tokenn) {
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/programcare`, {
//         headers: {
//           'x-access-token': tokenn
//         }
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setData(data.data)
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       if (clientId !== null) {
//         const clientIdNumber = parseInt(clientId, 10);
//         if (!isNaN(clientIdNumber) && clientIdNumber !== 0) {
//           try {
//             const tokenn = localStorage.getItem('token');
//             if (!tokenn) return;
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/procare?client=${clientIdNumber}`, {
//               headers: {
//                 'x-access-token': tokenn,
//               },
//             });
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setProCare(data.data);
//             setLoading(false);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//             setProCare([]);
//           }
//         }
//       }
//     };
//     fetchData();
//   }, [clientId, showPopup]);
//   return (
//     <div className="flex bg-color">
//       <SideNav />
//       <div className="flex-grow bg-color">
//         <div className="data-box">
//           <Topnav />
//           <div className="flex justify-between">
//             <div>
//               <h2 className="text-2xl font-bold mt-4">Program of Care</h2>
//             </div>
//             <div>
//               <h2 className="text-xl mt-4">{clientDetails.clientname}</h2>
//             </div>
//             <div className="input-group m-5">
//               <Button type="submit" label="Add POC" onClick={togglePopup} />
//             </div>
//           </div>
//           {loading ? <p>Loading...</p> :
//           <>
//           <div style={{ display: "flex" }}>
//           <div style={{ flex: "1 0 50%" }}>
//           <PocTable data={proCare} title="AM" clientId={clientDetails.clientId} />
//           </div>
//           <div style={{ flex: "1 0 50%" }}>
//          <PocTable data={proCare} title="NOON"clientId={clientDetails.clientId} />
//           </div>
//         </div>
//         <div style={{ display: "flex" }}>
//           <div style={{ flex: "1 0 50%" }}>
//           <PocTable data={proCare} title="TEA"clientId={clientDetails.clientId} />
//           </div>
//           <div style={{ flex: "1 0 50%" }}>
//           <PocTable data={proCare}title="NIGHT"clientId={clientDetails.clientId} />
//           </div>
//         </div>
//           </>
//           }
//           {showPopup && (
//             <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
//               <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-2xl font-bold">Add POC</h2>
//                   <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700 focus:outline-none">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-4">
//                     <div className="form-box mb-4">
//                       <label htmlFor="pocTitle" className="block text-gray-700 mb-2">Select title of POC</label>
//                       <select
//                         id="pocTitle"
//                         name="pocTitle"
//                         required
//                         className="form-input rounded-lg mt-1 block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         value={TitleId}
//                         onChange={(e) => setSelectedTitleId(parseInt(e.target.value))}
//                       >
//                         <option value="">Select a title</option>
//                         {data.map((poc: any) => (
//                           <option key={poc.id} value={poc.id} className="text-gray-700">
//                             {poc.title}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <div className="form-box">
//                       <label htmlFor="Programs" className="block text-gray-700">Programs</label>
//                       {programs.map((program, index) => (
//                         <div key={index} className="flex items-center mt-1"
//                           style={{ border: "2px solid #D6D4D4", padding: "5px" }}>
//                          <input
//                           type="text"
//                           value={program.description}
//                           onChange={(e) => handleInputChange(index, e)}
//                           className="p-1 block w-full focus:ring-0 focus:border-gray-300"
//                           required
//                         />
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveField(index)}
//                             className="ml-2 p-2 bg-red-500 text-white rounded-full flex items-center justify-center"
//                             style={{ width: '32px', height: '32px' }}
//                           >
//                             -
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="mb-4 flex justify-end mr-1">
//                     <button
//                       type="button"
//                       onClick={handleAddField}
//                       className="p-2 text-white rounded-full flex items-center justify-center"
//                       style={{ backgroundColor: '#1ABE1A', width: '32px', height: '32px' }}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div className="flex justify-center">
//                     <button
//                       type="button"
//                       onClick={togglePopup}
//                       className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default POC;

"use client"
import React, { useState, useEffect, FormEvent } from 'react';
import SideNav from '../../components/sidenav';
import Button from '../../components/button';
import Topnav from '../../components/topnav';
import PocTable from '@/app/components/poctable';
import { useSearchParams } from 'next/navigation';
import { isTokenExpired } from '../../utils/token'; 

interface ProgramcareProps {
  title: string;
}

interface PocProps {
  data: {
    id: number;
    client_id: number;
    company_id: number;
    programcare_id: number;
    description: string;
    ProgramCare: ProgramcareProps;
  }[];
  title: string;
}

const POC = () => {
  const searchParams = useSearchParams();
  const clientName = searchParams.get('name');
  const clientId = searchParams.get('id');

  const [loading, setLoading] = useState<boolean>(true);
  const [clientDetails, setClientDetails] = useState<{ clientname: string, clientId: number }>({
    clientname: "",
    clientId: 0
  });

  useEffect(() => {
    if (clientName && clientId) {
      setClientDetails({
        clientname: decodeURIComponent(clientName),
        clientId: parseInt(clientId, 10)
      });
    }
  }, [clientName, clientId]);

  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [programs, setPrograms] = useState<{ description: string }[]>([]);
  const [proCare, setProCare] = useState<PocProps['data']>([]);
  const [TitleId, setSelectedTitleId] = useState(0);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      window.location.href = '/login'; 
    }
  }, []);

  const handleAddField = () => {
    const newProgram = { description: '' };
    setPrograms([...programs, newProgram]);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrograms = [...programs];
    newPrograms[index].description = event.target.value;
    setPrograms(newPrograms);
  };

  const handleRemoveField = (index: number) => {
    const newPrograms = programs.filter((_, i) => i !== index);
    setPrograms(newPrograms);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const programsData = programs.filter(program => program.description.trim() !== '');
    const requestData = {
      client_id: clientDetails.clientId,
      program_care_id: TitleId,
      arr: programsData,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programcare`, {
        method: 'POST',
        headers: {
          'x-access-token': token as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      togglePopup();
      setPrograms([]);
      window.location.reload(); // Refresh the page after successful submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/programcare`, {
        headers: {
          'x-access-token': token
        }
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setData(data.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (clientId !== null) {
        const clientIdNumber = parseInt(clientId, 10);
        if (!isNaN(clientIdNumber) && clientIdNumber !== 0) {
          try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/procare?client=${clientIdNumber}`, {
              headers: {
                'x-access-token': token,
              },
            });

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProCare(data.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setProCare([]);
          }
        }
      }
    };

    fetchData();
  }, [clientId, showPopup]);

  return (
    <div className="flex bg-color">
      <SideNav />
      <div className="flex-grow bg-color">
        <div className="data-box">
          <Topnav />
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold mt-4">Program of Care</h2>
            </div>
            <div>
              <h2 className="text-xl mt-4">{clientDetails.clientname}</h2>
            </div>
            <div className="input-group m-5">
              <Button type="submit" label="Add POC" onClick={togglePopup} />
            </div>
          </div>
          {loading ? <p>Loading...</p> :
            <>
              <div style={{ display: "flex" }}>
                <div style={{ flex: "1 0 50%" }}>
                  <PocTable data={proCare} title="AM" clientId={clientDetails.clientId} />
                </div>
                <div style={{ flex: "1 0 50%" }}>
                  <PocTable data={proCare} title="NOON" clientId={clientDetails.clientId} />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: "1 0 50%" }}>
                  <PocTable data={proCare} title="TEA" clientId={clientDetails.clientId} />
                </div>
                <div style={{ flex: "1 0 50%" }}>
                  <PocTable data={proCare} title="NIGHT" clientId={clientDetails.clientId} />
                </div>
              </div>
            </>
          }
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
              <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Add POC</h2>
                  <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="form-box mb-4">
                      <label htmlFor="pocTitle" className="block text-gray-700 mb-2">Select title of POC</label>
                      <select
                        id="pocTitle"
                        name="pocTitle"
                        required
                        className="form-input rounded-lg mt-1 block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={TitleId}
                        onChange={(e) => setSelectedTitleId(parseInt(e.target.value))}
                      >
                        <option value="">Select a title</option>
                        {data.map((poc: any) => (
                          <option key={poc.id} value={poc.id} className="text-gray-700">
                            {poc.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="form-box">
                      <label htmlFor="Programs" className="block text-gray-700">Programs</label>
                      {programs.map((program, index) => (
                        <div key={index} className="flex items-center mt-1">
                          <input
                            type="text"
                            className="form-input rounded-lg w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Program ${index + 1}`}
                            value={program.description}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                          <button
                            type="button"
                            className="ml-2 text-red-600 focus:outline-none"
                            onClick={() => handleRemoveField(index)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                   <div className="mb-4 flex justify-end mr-1">
                    <button
                      type="button"
                     onClick={handleAddField}
                     className="p-2 text-white rounded-full flex items-center justify-center"
                     style={{ backgroundColor: '#1ABE1A', width: '32px', height: '32px' }}
                    >
                      +
                     </button>
                     </div>
                  </div>
                  <div className="mb-4">
                    <Button type="submit" label="Save" />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default POC;
