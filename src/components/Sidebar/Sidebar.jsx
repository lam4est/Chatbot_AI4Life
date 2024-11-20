import React, { useState, useRef } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [selectedChat, setSelectedChat] = useState(null);

    const moreIconRefs = useRef([]);

    const handleMoreClick = (chat, index) => {
        setSelectedChat(chat);
        const rect = moreIconRefs.current[index].getBoundingClientRect();
        setMenuPosition({
            top: rect.top + rect.height,
            left: rect.left - 10,
        });
        setIsMenuOpen((prevState) => !prevState);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={`sidebar ${extended ? "" : "collapsed"}`}>
            <div className="top">
                <img onClick={() => setExtended((prev) => !prev)} className="menu" src={assets.menu_icon} alt="" />

                <div className="new_chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                <div className="search">
                    <img src={assets.search_icon} alt="" />
                    {extended ? <p>Search</p> : null}
                </div>

                {extended ? (
                    <div className="recent">
                        <p className="recent_title">Recent</p>
                        <div className="recent_entry">
                            <img src={assets.message_icon} alt="" />
                            <p>What is react...</p>
                            <div className="icons" onClick={() => handleMoreClick("Chat 1", 0)} ref={(el) => (moreIconRefs.current[0] = el)}>
                                <img src={assets.more_icon} alt="More" />
                            </div>
                        </div>

                        <div className="recent_entry">
                            <img src={assets.message_icon} alt="" />
                            <p>Learning React Modal</p>
                            <div className="icons" onClick={() => handleMoreClick("Chat 2", 1)} ref={(el) => (moreIconRefs.current[1] = el)}>
                                <img src={assets.more_icon} alt="More" />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="bottom">
                <div className="bottom_item recent_entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>

                <div className="bottom_item recent_entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>
            </div>

            {/* Popup menu */}
            {isMenuOpen && (
                <div
                    className="more-menu"
                    style={{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                    }}
                    onClick={closeMenu}
                >
                    <div className="menu-item">
                        <img src={assets.share_icon} alt="" />
                        Share
                    </div>
                    <div className="menu-item">
                        <img src={assets.rename_icon} alt="" />
                        Rename
                    </div>
                    <div className="menu-item delete">
                        <img src={assets.delete_icon} alt="" />
                        Delete
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
