import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon
} from 'react-share';

const ShareComponent = ({ url }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className="relative">
            <button
                className="bg-white px-4 py-2 rounded cursor-pointer flex items-center"
                onClick={handleButtonClick}
            >
               <FontAwesomeIcon icon={faShareNodes} className='text-xl'/>
                
            </button>

            {isPopupOpen && (
                <div className="absolute rounded top-full mt-0.1 right-0 bg-white border p-2 shadow">
                    <ul className="list-none p-0 flex">
                        <li className="inline-block mr-2">
                            <FacebookShareButton url={url}>
                                <FacebookIcon size={25} round={true} />
                            </FacebookShareButton>
                        </li>
                        <li className="inline-block mr-2">
                            <TwitterShareButton url={url}>
                                <TwitterIcon size={25} round={true} />
                            </TwitterShareButton>
                        </li>
                        <li className="inline-block mr-2">
                            <LinkedinShareButton url={url}>
                                <LinkedinIcon size={25} round={true} />
                            </LinkedinShareButton>
                        </li>
                        <li className="inline-block">
                            <WhatsappShareButton url={url}>
                                <WhatsappIcon size={25} round={true} />
                            </WhatsappShareButton>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShareComponent;
