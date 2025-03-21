import React, { useState, useRef } from 'react';
import { FaUser, FaCamera, FaPen, FaPlus } from 'react-icons/fa';
import { Box, Typography, Button, TextField, Avatar, IconButton, Paper, Grid } from '@mui/material';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        fullName: 'Nguyễn Văn A',
        username: 'nguyenvana',
        bio: 'Mô tả ngắn về bản thân...',
        avatar: null,
        coverPhoto: null,
        posts: [],
        followers: 120,
        following: 180,
        skills: [], // Initialize skills
        interests: [] // Initialize interests
    });

    const [newSkill, setNewSkill] = useState('');
    const [newInterest, setNewInterest] = useState('');
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

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

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({
                    ...prev,
                    coverPhoto: reader.result
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
        <Box className={styles.profilePage}>
            <Box className={styles.coverPhotoContainer}>
                {profile.coverPhoto ? (
                    <img src={profile.coverPhoto} alt="Cover" className={styles.coverPhoto} />
                ) : (
                    <Box className={styles.coverPhotoPlaceholder}></Box>
                )}
                <Button
                    className={styles.uploadCoverButton}
                    onClick={() => coverInputRef.current.click()}
                >
                    <FaCamera /> Thay đổi ảnh bìa
                </Button>
                <input
                    type="file"
                    ref={coverInputRef}
                    onChange={handleCoverChange}
                    accept="image/*"
                    hidden
                />
            </Box>

            <Box className={styles.container}>
                <Box className={styles.avatarSection}>
                    <Box className={styles.avatarContainer}>
                        {profile.avatar ? (
                            <Avatar src={profile.avatar} alt="Profile" className={styles.avatar} />
                        ) : (
                            <Avatar className={styles.avatarPlaceholder}>
                                <FaUser />
                            </Avatar>
                        )}
                        <IconButton
                            className={styles.uploadButton}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <FaCamera />
                        </IconButton>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleAvatarChange}
                            accept="image/*"
                            hidden
                        />
                    </Box>
                    <Typography variant="h5">{profile.fullName}</Typography>
                    <Typography variant="subtitle1">@{profile.username}</Typography>
                </Box>

                <Box className={styles.statsSection}>
                    <Typography variant="body1">Bài đăng: {profile.posts.length}</Typography>
                    <Typography variant="body1">Người theo dõi: {profile.followers}</Typography>
                    <Typography variant="body1">Đang theo dõi: {profile.following}</Typography>
                </Box>

                <Box className={styles.bioSection}>
                    <Typography variant="h6">Tiểu sử</Typography>
                    <Typography variant="body1">{profile.bio}</Typography>
                </Box>

                <Box className={styles.postsSection}>
                    <Typography variant="h6">Bài đăng</Typography>
                    {profile.posts.length > 0 ? (
                        profile.posts.map((post, index) => (
                            <Paper key={index} className={styles.post}>
                                <Typography variant="body1">{post.content}</Typography>
                            </Paper>
                        ))
                    ) : (
                        <Typography variant="body1">Chưa có bài đăng nào.</Typography>
                    )}
                </Box>

                <Box className={styles.skillsSection}>
                    <Typography variant="h6">Kỹ năng</Typography>
                    <Box className={styles.tagInput}>
                        <TextField
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Thêm kỹ năng mới"
                            variant="outlined"
                            size="small"
                        />
                        <Button onClick={addSkill}><FaPlus /></Button>
                    </Box>
                    <Box className={styles.tags}>
                        {profile.skills.map((skill, index) => (
                            <Box key={index} className={styles.tag}>
                                {skill}
                                <Button onClick={() => removeSkill(index)}>×</Button>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box className={styles.interestsSection}>
                    <Typography variant="h6">Sở thích</Typography>
                    <Box className={styles.tagInput}>
                        <TextField
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            placeholder="Thêm sở thích mới"
                            variant="outlined"
                            size="small"
                        />
                        <Button onClick={addInterest}><FaPlus /></Button>
                    </Box>
                    <Box className={styles.tags}>
                        {profile.interests.map((interest, index) => (
                            <Box key={index} className={styles.tag}>
                                {interest}
                                <Button onClick={() => removeInterest(index)}>×</Button>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Button className={styles.saveButton} variant="contained" color="primary">
                    Lưu thay đổi
                </Button>
            </Box>
        </Box>
    );
};

export default ProfilePage;