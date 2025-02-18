import React, { useState, useRef } from 'react';
import { FaUser, FaCamera, FaPen, FaPlus } from 'react-icons/fa';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        phone: '',
        bio: '',
        avatar: null,
        skills: [],
        interests: []
    });

    const [newSkill, setNewSkill] = useState('');
    const [newInterest, setNewInterest] = useState('');
    const fileInputRef = useRef(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({
                    ...prev,
                    avatar: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addSkill = () => {
        if (newSkill.trim()) {
            setProfile(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const addInterest = () => {
        if (newInterest.trim()) {
            setProfile(prev => ({
                ...prev,
                interests: [...prev.interests, newInterest.trim()]
            }));
            setNewInterest('');
        }
    };

    const removeSkill = (indexToRemove) => {
        setProfile(prev => ({
            ...prev,
            skills: prev.skills.filter((_, index) => index !== indexToRemove)
        }));
    };

    const removeInterest = (indexToRemove) => {
        setProfile(prev => ({
            ...prev,
            interests: prev.interests.filter((_, index) => index !== indexToRemove)
        }));
    };

    return (
        <div className={styles.profilePage}>
            <div className={styles.container}>
                <h1>Profile Management</h1>

                {/* Avatar Section */}
                <div className={styles.avatarSection}>
                    <div className={styles.avatarContainer}>
                        {profile.avatar ? (
                            <img src={profile.avatar} alt="Profile" className={styles.avatar} />
                        ) : (
                            <FaUser className={styles.avatarPlaceholder} />
                        )}
                        <button 
                            className={styles.uploadButton}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FaCamera />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            hidden
                        />
                    </div>
                </div>

                {/* Personal Information Section */}
                <section className={styles.section}>
                    <h2>Thông tin cá nhân</h2>
                    <div className={styles.formGroup}>
                        <label>Họ và tên</label>
                        <input
                            type="text"
                            name="fullName"
                            value={profile.fullName}
                            onChange={handleInputChange}
                            placeholder="Nhập họ và tên"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            placeholder="Nhập email"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Số điện thoại</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Giới thiệu bản thân</label>
                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleInputChange}
                            placeholder="Viết vài điều về bản thân..."
                            rows="4"
                        />
                    </div>
                </section>

                {/* Skills Section */}
                <section className={styles.section}>
                    <h2>Kỹ năng</h2>
                    <div className={styles.tagInput}>
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Thêm kỹ năng mới"
                        />
                        <button onClick={addSkill}><FaPlus /></button>
                    </div>
                    <div className={styles.tags}>
                        {profile.skills.map((skill, index) => (
                            <span key={index} className={styles.tag}>
                                {skill}
                                <button onClick={() => removeSkill(index)}>×</button>
                            </span>
                        ))}
                    </div>
                </section>

                {/* Interests Section */}
                <section className={styles.section}>
                    <h2>Sở thích</h2>
                    <div className={styles.tagInput}>
                        <input
                            type="text"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            placeholder="Thêm sở thích mới"
                        />
                        <button onClick={addInterest}><FaPlus /></button>
                    </div>
                    <div className={styles.tags}>
                        {profile.interests.map((interest, index) => (
                            <span key={index} className={styles.tag}>
                                {interest}
                                <button onClick={() => removeInterest(index)}>×</button>
                            </span>
                        ))}
                    </div>
                </section>

                <button className={styles.saveButton}>Lưu thay đổi</button>
            </div>
        </div>
    );
};

export default ProfilePage; 