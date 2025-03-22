import React, { useState, useRef } from 'react';
import { FaUser, FaCamera } from 'react-icons/fa';
import { Box, Typography, Button, Avatar, IconButton, Paper, Grid, Divider } from '@mui/material';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        fullName: 'Alexandra Johnson',
        major: 'Computer Science Major',
        avatar: null,
        coverPhoto: null,
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
    });

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

    return (
        <Box className={styles.profilePage}>
            <Box className={styles.header}>
                <Typography variant="h4" className={styles.logo}>StudentProfileHub</Typography>
                <Box className={styles.nav}>
                    <Typography variant="body1">Profile Overview</Typography>
                    <Typography variant="body1">Messaging</Typography>
                    <Typography variant="body1">Settings</Typography>
                </Box>
            </Box>
            <Box className={styles.container}>
                <Box className={styles.leftColumn}>
                    <Box className={styles.profileSection}>
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
                        <Typography variant="subtitle1">{profile.major}</Typography>
                        <Box className={styles.profileButtons}>
                            <Button variant="contained" color="primary">Edit Profile</Button>
                            <Button variant="contained" color="primary">Update Picture</Button>
                            <Button variant="contained" color="primary">Privacy Settings</Button>
                        </Box>
                    </Box>
                    <Box className={styles.activityStatus}>
                        <Typography variant="h6">Activity Status</Typography>
                        <Typography variant="body2">{profile.activityStatus}</Typography>
                    </Box>
                </Box>
                <Box className={styles.rightColumn}>
                    <Box className={styles.recentPosts}>
                        <Typography variant="h6">Recent Posts</Typography>
                        {profile.recentPosts.map((post, index) => (
                            <Paper key={index} className={styles.post}>
                                <Typography variant="h6">{post.title}</Typography>
                                <Typography variant="body2">{post.date}</Typography>
                                <Typography variant="body1">{post.content}</Typography>
                            </Paper>
                        ))}
                    </Box>
                    <Box className={styles.friendsList}>
                        <Typography variant="h6">Friends List</Typography>
                        <Grid container spacing={2}>
                            {profile.friendsList.map((friend, index) => (
                                <Grid item xs={4} key={index}>
                                    <Box className={styles.friend}>
                                        {friend.avatar ? (
                                            <Avatar src={friend.avatar} alt={friend.name} className={styles.friendAvatar} />
                                        ) : (
                                            <Avatar className={styles.friendAvatarPlaceholder}>
                                                <FaUser />
                                            </Avatar>
                                        )}
                                        <Typography variant="body1">{friend.name}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
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