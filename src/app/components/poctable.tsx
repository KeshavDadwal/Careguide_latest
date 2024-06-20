import React, { useState } from 'react';
import VideoPlayerPopup from '../components/VideoPlayerPopup';
import EditPopup from '../components/EdiitPopup';
import PlayButtons from '../images/playbuttonpoc1.png'; 
import Edita from '../images/editedit.png';

interface ProgramcareProps {
    title: string;
}

interface VideoProps {
    title: string;
    video_path: string;
}

interface PocData {
    id: number;
    client_id: number;
    company_id: number;
    programcare_id: number;
    description: string;
    ProgramCare: ProgramcareProps;
    Video?: VideoProps;
}

interface PocProps {
    data: PocData[];
    title: string;
    clientId:number;
}

const PocTable: React.FC<PocProps> = ({ data, title,clientId }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [pocId, setPocId] = useState(0);
    const [editedItem, setEditedItem] = useState<PocData | null>(null);
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);
    const validData = Array.isArray(data) ? data : [];
    const pocData = validData.filter(item => item.ProgramCare?.title === title);

    const handleOpenPopup = (item: PocData,pocId:number) => {
        setEditedItem(item);
        setPocId(pocId);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setEditedItem(null);
    };

    const handleSave = (updatedItem: PocData) => {
        handleClosePopup();
    };

    const handlePlayVideo = (video: string) => {
        setPlayingVideo(video);
    };

    return (
        <div className='mt-5'>
            <div className="grid m-2">
                <div className="flex flex-col shadow-md bg-white p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-black text-2xl">{title}</span>
                    </div>
                    {pocData.length > 0 ? (
                        <div className="text-black space-y-2">
                            {pocData.map((item) => (
                                <div key={item.id} className="butn p-1 border rounded-md bg-gray-100 hover:bg-gray-200 transition-colors flex">
                                    <div>
                                    <p>
                                        {item.description}
                                    </p>
                                    </div>
                                    <div className='icon flex items-center  mx-2'>
                                        <img
                                            src={Edita.src as unknown as string}
                                            alt="Edit"
                                            className='small-icon'
                                            style={{ width: '20px', height: '20px' }}
                                            onClick={() => handleOpenPopup(item,item.id)}
                                        />
                                        {item.Video && (                                       
                                        <img
                                            src={PlayButtons.src as unknown as string} 
                                            alt="Play Video"
                                            className="cursor-pointer mt-2"
                                            style={{ width: '20px', height: '20px', marginTop: '-1px', marginLeft:'5px' }}
                                            onClick={() => handlePlayVideo(item.Video!.video_path)}
                                        />
                                        )}
                                   </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="flex justify-center items-center h-28 text-gray-500">No data available</p>
                    )}
                </div>
            </div>
            {isPopupOpen && editedItem && (
                <EditPopup
                    editedItem={editedItem}
                    onClose={handleClosePopup}
                    onSave={handleSave}
                    clientId={clientId}
                    pocId={pocId}
                />
            )}
            {playingVideo && (
                <VideoPlayerPopup
                    videoPath={playingVideo}
                    onClose={() => setPlayingVideo(null)}
                />
            )}
        </div>
    );
};

export default PocTable;
