import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import styles from '../ProfileSettings/ProfileSettings.module.css';

const ProfileSettings = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [futureFeaturePreviews, setFutureFeaturePreviews] = useState(false);

    const handleSaveChanges = () => {
        // Handle save changes logic
    };

    const handleUpdatePassword = () => {
        // Handle update password logic
    };

    return (
        <Box className={styles.profileSettingsPage}>
            <Box className={styles.header}>
                <Typography variant="h4" className={styles.logo}>StudentProfileHub</Typography>
                <Box className={styles.nav}>
                    <Typography variant="body1">Profile Overview</Typography>
                    <Typography variant="body1">Messaging</Typography>
                    <Typography variant="body1">Settings</Typography>
                </Box>
            </Box>
            <Box className={styles.container}>
                <Box className={styles.section}>
                    <Typography variant="h6">Profile Settings</Typography>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Box>
                <Box className={styles.section}>
                    <Typography variant="h6">Account Information</Typography>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdatePassword}>
                        Update Password
                    </Button>
                </Box>
                <Box className={styles.section}>
                    <Typography variant="h6">Privacy Preferences</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                        }
                        label="Make my profile private"
                    />
                </Box>
                <Box className={styles.section}>
                    <Typography variant="h6">Account Manager</Typography>
                    <Button variant="contained" color="primary">
                        Access Account Manager
                    </Button>
                </Box>
                <Box className={styles.section}>
                    <Typography variant="h6">Share Documents</Typography>
                    <Button variant="contained" color="primary">
                        Upload Documents
                    </Button>
                </Box>
                <Box className={styles.section}>
                    <Typography variant="h6">Notification Settings</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={emailNotifications}
                                onChange={(e) => setEmailNotifications(e.target.checked)}
                            />
                        }
                        label="Receive email notifications"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={smsNotifications}
                                onChange={(e) => setSmsNotifications(e.target.checked)}
                            />
                        }
                        label="Receive SMS notifications"
                    />
                </Box>
                <Box className={styles.section}>
                    <Typography variant="h6">Preferences for Future Interactions</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={futureFeaturePreviews}
                                onChange={(e) => setFutureFeaturePreviews(e.target.checked)}
                            />
                        }
                        label="Enable future feature previews"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileSettings;