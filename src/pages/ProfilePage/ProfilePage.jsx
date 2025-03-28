import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaCamera } from 'react-icons/fa';
import { Box, Typography, Avatar, IconButton, Paper, Grid, Button } from '@mui/material';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    // Hàm tải dữ liệu từ localStorage
    const loadProfileFromStorage = () => {
        const storedProfile = localStorage.getItem('profileData');
        return storedProfile ? JSON.parse(storedProfile) : null;
    };

    const defaultProfile = {
        fullName: 'Alexandra Johnson',
        major: 'Computer Science Major',
        avatar: null,
        activityStatus: 'Last active: 2 hours ago',
        recentPosts: [
            { title: 'Exploring AI Techniques', date: 'October 15, 2023', content: 'Just attended a fascinating workshop on AI and machine learning. Learned a lot about the latest trends...' },
            { title: 'Joined New Coding Group', date: 'October 10, 2023', content: 'Excited to join the "Code Masters" group. Looking forward to collaborating on exciting projects...' }
        ],
        friendsList: [
            { name: 'Emily Carter', avatar: null },
            { name: 'Michael Brown', avatar: null },
            { name: 'Sarah Lee', avatar: null }
        ],
        groupsJoined: 5,
        eventsFollowed: 3,
        opportunitiesFound: 2
    };

    const [profile, setProfile] = useState(loadProfileFromStorage() || defaultProfile);
    const fileInputRef = useRef(null);
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Cập nhật localStorage mỗi khi profile thay đổi
    useEffect(() => {
        localStorage.setItem('profileData', JSON.stringify(profile));
    }, [profile]);

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

    return (
        <Box className={styles.profilePage}>
            {/* Header */}
            <Box className={styles.header}>
                <Typography variant="h4" className={styles.logo}>StudentProfileHub</Typography>
                <Box className={styles.nav}>
                    <Typography variant="body1">Profile Overview</Typography>
                    <Typography variant="body1">Messaging</Typography>
                    <Typography variant="body1">Settings</Typography>
                </Box>
            </Box>

            <Box className={styles.container}>
                {/* Left Column */}
                <Box className={styles.leftColumn}>
                    <Box className={styles.profileSection}>
                        {/* Avatar */}
                        <Box className={styles.avatarContainer}>
                            <Avatar
                                src={profile.avatar || ""}
                                alt="Profile"
                                sx={{ width: 120, height: 120, bgcolor: profile.avatar ? "transparent" : "gray" }}
                            >
                                {!profile.avatar && <FaUser size={50} />}
                            </Avatar>
                            <IconButton
                                sx={{ position: "absolute", bottom: 5, right: 5, bgcolor: "white" }}
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
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

                        <Typography variant="h5">{storedUserInfo?.email}</Typography>
                        <Typography variant="subtitle1">{profile.major}</Typography>

                        {/* Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                            <Button variant="contained" color="primary" href="profile-settings">Edit Profile</Button>
                            <Button variant="contained" color="primary" href="#">Update Picture</Button>
                            <Button variant="contained" color="primary" href="#">Privacy Settings</Button>
                        </Box>
                    </Box>

                    {/* Activity Status */}
                    <Box className={styles.activityStatus}>
                        <Typography variant="h6">Activity Status</Typography>
                        <Typography variant="body2">{profile.activityStatus}</Typography>
                    </Box>
                </Box>

                {/* Right Column */}
                <Box className={styles.rightColumn}>
                    {/* Recent Posts */}
                    <Box className={styles.recentPosts}>
                        <Typography variant="h6">Recent Posts</Typography>
                        {profile.recentPosts.map((post, index) => (
                            <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
                                <Typography variant="h6">{post.title}</Typography>
                                <Typography variant="body2">{post.date}</Typography>
                                <Typography variant="body1">{post.content}</Typography>
                            </Paper>
                        ))}
                    </Box>

                    {/* Friends List */}
                    <Box className={styles.friendsList}>
                        <Typography variant="h6">Friends List</Typography>
                        <Grid container spacing={2}>
                            {profile.friendsList.map((friend, index) => (
                                <Grid item xs={4} key={index}>
                                    <Box sx={{ textAlign: "center" }}>
                                        <Avatar
                                            src={friend.avatar || ""}
                                            sx={{ width: 60, height: 60, bgcolor: friend.avatar ? "transparent" : "gray" }}
                                        >
                                            {!friend.avatar && <FaUser />}
                                        </Avatar>
                                        <Typography variant="body1">{friend.name}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Stats Section */}
                    <Box className={styles.stats}>
                        <Box className={styles.stat}>
                            <Typography variant="h6">Groups Joined</Typography>
                            <Typography variant="body1">{profile.groupsJoined} Groups</Typography>
                        </Box>
                        <Box className={styles.stat}>
                            <Typography variant="h6">Events Followed</Typography>
                            <Typography variant="body1">{profile.eventsFollowed} Events</Typography>
                        </Box>
                        <Box className={styles.stat}>
                            <Typography variant="h6">Opportunities Found</Typography>
                            <Typography variant="body1">{profile.opportunitiesFound} Opportunities</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
