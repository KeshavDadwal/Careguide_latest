import React, { useState, useEffect } from 'react';
import { showErrorToast, showSuccessToast } from '@/app/components/toastmessage';

interface EditPopupProps {
  editedItem: any;
  onClose: () => void;
  onSave: (updatedItem: any) => void;
  clientId: number;
  pocId: number;
}

const EditPopup: React.FC<EditPopupProps> = ({ editedItem, onClose, onSave, clientId, pocId }) => {
  const [description, setDescription] = useState(editedItem?.description || '');
  const [videoListing, setVideoListing] = useState([]);
  const [videoId, setSelectedVideo] = useState<number | null>(null);

  const handleSave = async () => {
    const tokenn = localStorage.getItem('token');
    if (!tokenn) return;
  
    let programCareUpdated = false;
    let videoUpdated = false;
  
    try {
      const formData = {
        video_id: videoId,
        description: description,
      };
  
      const programCareResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programcare/${pocId}`, {
        method: 'PUT',
        headers: {
          'x-access-token': tokenn,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const programCareErrorMessage = await programCareResponse.json();
  
      if (programCareResponse.ok) {
        // showSuccessToast(programCareErrorMessage.message);
        // onClose();
        programCareUpdated = true;
      }
  
      if (videoId) {
        let previous_vid_id = 0;
        if (editedItem?.Video?.id) {
          previous_vid_id = editedItem.Video.id;
        }
  
        const videoFormData = {
          title: "",
          is_attached: true,
          previous_video_id: previous_vid_id,
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
  
      if (programCareUpdated && videoUpdated) {
        onSave({ ...editedItem, description });
        window.location.reload();
      }
    } catch (error) {
      showErrorToast('An error occurred while updating the title');
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (clientId !== null) {
        try {
          const tokenn = localStorage.getItem('token');
          if (!tokenn) return;

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videolisting?client=${clientId}`, {
            headers: {
              'x-access-token': tokenn,
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setVideoListing(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setVideoListing([]);
        }
      }
    };

    fetchData();
  }, [clientId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold mb-4">Edit POC</h2>
          <label htmlFor="title" className="block text-gray-700 mb-2 font-bold mb-4">
            {editedItem?.ProgramCare.title || ''}
          </label>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
            <input
              id="description"
              name="description"
              className="form-input rounded-lg mt-1 block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-box mb-4">
            <label htmlFor="videoTitle" className="block text-gray-700 mb-2">Select video</label>
            <select
              id="videoTitle"
              name="videoTitle"
              className="form-input rounded-lg mt-1 block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={videoId || ''}
              onChange={(e) => setSelectedVideo(parseInt(e.target.value))}
            >
              <option value="">Select a video</option>
              {videoListing.length > 0 && videoListing.map((video: any) => (
                <option key={video.id} value={video.id} className="text-gray-700">
                  {video.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              style={{ backgroundColor: "#1ABE1A" }}
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
