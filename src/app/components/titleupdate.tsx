// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import { showErrorToast, showSuccessToast } from '@/app/components/toastmessage';

// interface UpdateProps {
//   videoId: number;
//   videoPath: string; 
//   onCancel: () => void;
//   currentTitle: string; 
//   clientId: number; 
//   isAttached: boolean;
// }
// interface ProgramcareProps {
//   title: string;
// }


// interface PocProps {
//   data: {
//     id: number;
//     client_id: number;
//     company_id: number;
//     programcare_id: number;
//     description: string;
//     ProgramCare: ProgramcareProps;
//   }[];
//   title: string;
// }

// const Titleupdate: React.FC<UpdateProps> = ({ videoId, videoPath, onCancel, clientId,isAttached }) => {
//   const [tokenn, setToken] = useState("currentTitle");
//   const [title, setTitle] = useState('');
//   const [procareData, setProcareData] = useState<PocProps['data']>([]);
//   const [selectedProcare, setSelectedProcare] = useState('');
//   const [videoattach, setVideoAttach] = useState(false);



//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setToken(token || ''); 
//   }, []);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!clientId) return; 

//         const tokenn = localStorage.getItem('token');
//         if (!tokenn) return; 
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/procare?client=${clientId}`, {
//           headers: {
//             'x-access-token': tokenn,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setProcareData(data.data);
       
//       } catch (error) {
//         console.error('Error fetching Procare data:', error);
//         setProcareData([]); 
//       }
//     };

//     fetchData();
//   }, [clientId]);

//   const updatetitle = async () => {
//     if (!tokenn) {
//       return;
//     }
  
//     let videoUpdated = false;
//     let programCareUpdated = false;
  
//     try {
//       if (title || videoattach) {
//         const videoFormData = {
//           title: title || "",
//           is_attached: videoattach || false,
//           previous_video_id: 0,
//         };
  
//         const videoResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/${videoId}`, {
//           method: 'PUT',
//           headers: {
//             'x-access-token': tokenn,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(videoFormData),
//         });
  
//         const videoErrorMessage = await videoResponse.json();
  
//         if (videoResponse.ok) {
//           showSuccessToast(videoErrorMessage.message);
//           videoUpdated = true;
//         } else {
//           showErrorToast(videoErrorMessage.message);
//         }
//       } else {
//         videoUpdated = true; 
//       }
  
//       if (selectedProcare) {
//         const programCareFormData = {
//           video_id: videoId || 0,
//           description: "",
//         };
  
//         const programCareResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programcare/${selectedProcare}`, {
//           method: 'PUT',
//           headers: {
//             'x-access-token': tokenn,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(programCareFormData),
//         });
  
//         const programCareErrorMessage = await programCareResponse.json();
  
//         if (programCareResponse.ok) {
//           showSuccessToast(programCareErrorMessage.message);
//           programCareUpdated = true;
//         } else {
//           showErrorToast(programCareErrorMessage.message);
//         }
//       } else {
//         programCareUpdated = true; 
//       }
  
//       if (videoUpdated && programCareUpdated) {
//         onCancel();
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error("Error details:", error);
//       showErrorToast('An unexpected error occurred.');
//     }
//   };

//   const handlerProcare = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setVideoAttach(true);
//     setSelectedProcare(e.target.value);
//   }
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
//       <div className="bg-white rounded-lg p-8 flex flex-col items-center">
//         <h2 className="text-2xl font-bold mb-4">Edit Video</h2>
//         <div className="w-full mb-4">
//           <div className="form-box">
//             <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               required
//               className="form-input rounded-lg mt-1 block w-full px-3 py-2 border border-gray-300"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>
//         </div>
        
//         {
//       isAttached === false ? (
//     <div className="w-full mb-4">
//       <label htmlFor="procareSelect" className="block text-gray-700 mb-2">Program Care</label>
//       <select
//         id="procareSelect"
//         className="form-select rounded-lg mt-1 block w-full px-3 py-2 border border-gray-300"
//         value={selectedProcare}
//         onChange={(e) => {handlerProcare(e) }}
//       >
//         <option value="">Select Program Care</option>
//         {procareData.length > 0 && procareData.map((item, index) => (
//           <option key={index} value={item.id}>{item.description}</option>
//         ))}
//       </select>
//     </div>
//   ) : null
// }
//         <div className="w-full mb-4">
//           <ReactPlayer url={videoPath} controls width="640px" height="360px" />
//         </div>
      
//         <div className="mt-4 flex space-x-4">
//           <button
//             onClick={updatetitle}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//           >
//             Submit
//           </button>
//           <button
//             onClick={onCancel}
//             className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Titleupdate;

import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { showErrorToast, showSuccessToast } from '@/app/components/toastmessage';

interface UpdateProps {
  videoId: number;
  videoPath: string; 
  onCancel: () => void;
  currentTitle: string; 
  clientId: number; 
  isAttached: boolean;
}

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

const Titleupdate: React.FC<UpdateProps> = ({ videoId, videoPath, onCancel, currentTitle, clientId, isAttached }) => {
  const [tokenn, setToken] = useState("");
  const [title, setTitle] = useState(currentTitle);
  const [procareData, setProcareData] = useState<PocProps['data']>([]);
  const [selectedProcare, setSelectedProcare] = useState('');
  const [videoattach, setVideoAttach] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token || ''); 
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clientId) return; 

        const tokenn = localStorage.getItem('token');
        if (!tokenn) return; 
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/procare?client=${clientId}`, {
          headers: {
            'x-access-token': tokenn,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProcareData(data.data);
      } catch (error) {
        console.error('Error fetching Procare data:', error);
        setProcareData([]); 
      }
    };

    fetchData();
  }, [clientId]);

  const updatetitle = async () => {
    if (!tokenn) {
      return;
    }
  
    let videoUpdated = false;
    let programCareUpdated = false;
  
    try {
      if (title || videoattach) {
        const videoFormData = {
          title: title || "",
          is_attached: videoattach || false,
          previous_video_id: 0,
        };
  
        const videoResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/video/${videoId}`, {
          method: 'PUT',
          headers: {
            'x-access-token': tokenn,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(videoFormData),
        });
  
        const videoErrorMessage = await videoResponse.json();
  
        if (videoResponse.ok) {
          showSuccessToast(videoErrorMessage.message);
          videoUpdated = true;
        } else {
          showErrorToast(videoErrorMessage.message);
        }
      } else {
        videoUpdated = true; 
      }
  
      if (selectedProcare) {
        const programCareFormData = {
          video_id: videoId || 0,
          description: "",
        };
  
        const programCareResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programcare/${selectedProcare}`, {
          method: 'PUT',
          headers: {
            'x-access-token': tokenn,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(programCareFormData),
        });
  
        const programCareErrorMessage = await programCareResponse.json();
  
        if (programCareResponse.ok) {
          showSuccessToast(programCareErrorMessage.message);
          programCareUpdated = true;
        } else {
          showErrorToast(programCareErrorMessage.message);
        }
      } else {
        programCareUpdated = true; 
      }
  
      if (videoUpdated && programCareUpdated) {
        onCancel();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating video title or Programcare:', error);
    }
  };

  const handleProcareChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcare(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoAttach(event.target.checked);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Edit Video</h2>
        <div className="w-full mb-4">
          <div className="form-box">
            <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="form-input rounded-lg mt-1 block w-full px-3 py-2 border border-gray-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        
        {!isAttached && (
          <div className="w-full mb-4">
            <label htmlFor="procareSelect" className="block text-gray-700 mb-2">Program Care</label>
            <select
              id="procareSelect"
              className="form-select rounded-lg mt-1 block w-full px-3 py-2 border border-gray-300"
              value={selectedProcare}
              onChange={handleProcareChange}
            >
              <option value="">Select Program Care</option>
              {procareData.length > 0 && procareData.map((item, index) => (
                <option key={index} value={item.id}>{item.description}</option>
              ))}
            </select>
          </div>
        )}
        
        <div className="w-full mb-4">
          <ReactPlayer url={videoPath} controls width="640px" height="360px" />
        </div>
        
        <div className="mt-4 flex space-x-4">
          <button
            onClick={updatetitle}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
          <button
            onClick={onCancel}
            className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Titleupdate;
