import React, { useState } from 'react';
import Image from 'next/image';
import Edit from '../images/Edit.svg';
import Img from '../images/Delete.svg';
import { Video } from "../components/interfaces";
import Delete from '../components/delete';
import Titleupdate from '../components/titleupdate';
import PlayButton from '../images/playbutton1.png';
import ReactPlayer from 'react-player'; 
import VideoPlayerPopup from '../components/VideoPlayerPopup';

interface VideoTableProps {
  data: Video[];
  clientId: number;
}

const VideoTable: React.FC<VideoTableProps> = ({ data, clientId }) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<number | null>(null);
  const [titleToggle, setTitleToggle] = useState(false);
  const [titleUpdate, setTitleUpdate] = useState<{ id: number; path: string; title: string } | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [isAttached, setIsAttached] = useState(false);

  const toggleDelete = (id: number) => {
    setVideoToDelete(id);
    setDeletePopup(true);
  };

  const toggleEdit = (id: number, path: string, isAttached: boolean, title: string) => {
    setTitleToggle(true);
    setIsAttached(isAttached);
    setTitleUpdate({ id, path, title });
  };

  const handleMouseEnter = (id: number) => {
    setHoveredVideo(id);
  };

  const handleMouseLeave = () => {
    setHoveredVideo(null);
  };

  const handlePlayVideo = (video: Video) => {
    setPlayingVideo(video);
  };

  return (
    <div className='data-box-inside mt-5'>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="p-2 text-left">No.</th>
            <th className="p-2 text-left">Video</th>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((video, index) => (
            <tr key={index}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                <div 
                  className='relative flex items-center'
                  onMouseEnter={() => handleMouseEnter(video.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {playingVideo === video ? (
                    <ReactPlayer url={video.video_path} playing={true} controls={true} width={50} height={90} />
                  ) : (
                    <div className='relative'>
                      <Image
                        src={video.video_frame}
                        alt="POC"
                        width={50}
                        height={80}
                        className="mr-2 cursor-pointer rounded-fully"
                      />
                      {hoveredVideo === video.id && (
                        <div
                          className='absolute inset-0 flex items-center justify-center cursor-pointer'
                          onClick={() => handlePlayVideo(video)}
                        >
                          <Image src={PlayButton} alt="Play Button" width={35} height={35} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </td>
              <td className="p-2">
                {video.title}
              </td>
              <td className="p-2">
                <button onClick={() => toggleEdit(video.id, video.video_path, video.is_attached, video.title)} className="text-blue-500 mr-2">
                  <Image src={Edit} alt="Edit Image" className='small-icon' />
                </button>
                <button onClick={() => toggleDelete(video.id)} className="text-red-500">
                  <Image src={Img} alt="Delete Image" className='small-icon' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deletePopup && videoToDelete !== null && (
        <Delete
          videoId={videoToDelete}
          onCancel={() => setDeletePopup(false)}
        />
      )}
      {titleToggle && titleUpdate !== null && (
        <Titleupdate
          videoId={titleUpdate.id}
          currentTitle={titleUpdate.title}
          videoPath={titleUpdate.path}
          onCancel={() => setTitleToggle(false)}
          clientId={clientId}
          isAttached={isAttached}
        />
      )}
      {playingVideo && (
        <VideoPlayerPopup
          videoPath={playingVideo.video_path}
          onClose={() => setPlayingVideo(null)}
        />
      )}
    </div>
  );
};

export default VideoTable;


