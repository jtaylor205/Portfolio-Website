import React, { useEffect, useRef, useCallback, useState } from 'react';
import '../css/ContactModal.css';
import emailjs from 'emailjs-com'; // Import EmailJS

const ContactModal = ({ closeModal }) => {
    const modalRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Use useCallback to memoize the handleClose function
    const handleClose = useCallback(() => {
        const modalOverlay = document.querySelector('.contact-modal-overlay');
        modalOverlay.classList.add('closing');
        setTimeout(() => {
            closeModal();
            modalOverlay.classList.remove('closing'); 
        }, 500);
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
    }, [handleClose]); 

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Show sending status
      

        emailjs.send('service_r093z8c', 'template_9h60x6m', formData, 'h1HMCPWBJNG75eUYH')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setFormData({name: '', email: '', message: '' });
                handleClose();
            })
            .catch((error) => {
                console.log('FAILED...', error);
            });
    };

    return (
        <div className="contact-modal-overlay">
            <div className="container" ref={modalRef}>
                <button className="close-button" onClick={handleClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <p>Send me a message!</p>
                    <input 
                        type="name" 
                        name="name" 
                        placeholder="Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    /><br />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    /><br />
                    <textarea 
                        name="message" 
                        placeholder="Message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                    ></textarea><br />
                    <button type="submit">Send Message</button><br />
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
