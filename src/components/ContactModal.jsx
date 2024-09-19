import React, { useEffect, useRef, useCallback } from 'react';
import '../css/ContactModal.css';

const ContactModal = ({ closeModal }) => {
    const modalRef = useRef(null);

    // Use useCallback to memoize the handleClose function
    const handleClose = useCallback(() => {
        // Add closing class for animation
        const modalOverlay = document.querySelector('.contact-modal-overlay');
        modalOverlay.classList.add('closing');
        setTimeout(() => {
            closeModal();
            modalOverlay.classList.remove('closing'); // Clean up the class
        }, 500); // Match this duration with the CSS transition
    }, [closeModal]);

    // Handle clicks outside the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.classList.contains('drop')) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClose]); // Include handleClose in the dependency array

    return (
        <div className="contact-modal-overlay">
            <div className="container" ref={modalRef}>
                <button className="close-button" onClick={handleClose}>×</button>
                <form>
                    <p>Send Message! (Not currently active)</p>
                    <input type="email" placeholder="Email" /><br />
                    <input type="password" placeholder="Password" /><br />
                    <input type="text" placeholder="Message" /><br />
                    <input type="button" value="Send Message" /><br />
                </form>
                <div className="drops">
                    <div className="drop drop-1"></div>
                    <div className="drop drop-2"></div>
                    <div className="drop drop-3"></div>
                    <div className="drop drop-4"></div>
                    <div className="drop drop-5"></div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
