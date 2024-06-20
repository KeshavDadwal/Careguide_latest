import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerPopupProps {
  videoPath: string; 
  onClose: () => void;
}

const VideoPlayerPopup: React.FC<VideoPlayerPopupProps> = ({ videoPath, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg relative image-pop">
        <ReactPlayer url={videoPath} playing controls width="640px" height="360px" />
        <button 
          className="absolute top-0 right-0 m-2 p-2 bg-red-500 text-white rounded-fullx"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default VideoPlayerPopup;