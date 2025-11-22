import * as React from 'react';  
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';

import { Snackbar, LinearProgress, Alert } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
    // Basic fields
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [role, setRole] = React.useState('patient');
    
    // Doctor-specific fields
    const [specialization, setSpecialization] = React.useState('');
    const [qualification, setQualification] = React.useState('');
    const [experience, setExperience] = React.useState('');
    
    // Patient-specific fields
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [address, setAddress] = React.useState('');
    
    // UI state
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [bgImage, setBgImage] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    // Generate random background image
    React.useEffect(() => {
        const generateImage = () => {
            const categories = ['hospital', 'medical', 'healthcare', 'doctor', 'clinic'];
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            return `https://source.unsplash.com/random/${width}x${height}/?${randomCategory}`;
        };

        const img = new Image();
        img.src = generateImage();
        
        img.onload = () => {
            setBgImage(img.src);
            setLoading(false);
        };
        
        img.onerror = () => {
            const fallbackImages = [
                'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80',
                'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920&q=80',
                'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=1920&q=80',
                'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&q=80'
            ];
            const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
            setBgImage(randomFallback);
            setLoading(false);
        };
    }, []);

    // Form validation
    const validateForm = () => {
        setError('');
        
        if (formState === 0) {
            if (!email || !password) {
                setError('Please fill in all fields');
                return false;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                setError('Please enter a valid email address');
                return false;
            }
        } else {
            if (!name || !email || !password || !phone || !role) {
                setError('Please fill in all required fields');
                return false;
            }
            
            if (!/\S+@\S+\.\S+/.test(email)) {
                setError('Please enter a valid email address');
                return false;
            }
            
            if (password.length < 6) {
                setError('Password must be at least 6 characters long');
                return false;
            }
            
            if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
                setError('Please enter a valid 10-digit phone number');
                return false;
            }
            
            if (role === 'doctor') {
                if (!specialization || !qualification || !experience) {
                    setError('Please fill in all doctor-specific fields');
                    return false;
                }
            }
            
            if (role === 'patient') {
                if (!dateOfBirth || !gender) {
                    setError('Please fill in all patient-specific fields');
                    return false;
                }
            }
        }
        
        return true;
    };

    // Reset fields
    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setRole('patient');
        setSpecialization('');
        setQualification('');
        setExperience('');
        setDateOfBirth('');
        setGender('');
        setAddress('');
        setError('');
    };

    // Handle login/register
    const handleAuth = async () => {
        if (!validateForm()) return;
        
        try {
            if (formState === 0) {
                await handleLogin(email, password);
            } else {
                const userData = {
                    name,
                    email,
                    password,
                    phone,
                    role
                };
                
                if (role === 'doctor') {
                    userData.specialization = specialization;
                    userData.qualification = qualification;
                    userData.experience = Number(experience);
                } else {
                    userData.dateOfBirth = dateOfBirth;
                    userData.gender = gender;
                    userData.address = address;
                }
                
                const result = await handleRegister(userData);
                setMessage(result || 'Registration successful! Please login.');
                setOpen(true);
                setFormState(0);
                resetForm();
            }
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Authentication failed';
            setError(message);
        }
    };

    const toggleFormState = (state) => {
        setFormState(state);
        resetForm();
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                
                {/* LEFT SIDE IMAGE */}
                <Grid
                    item
                    xs={false}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                    }}
                >
                    {loading && (
                        <LinearProgress 
                            sx={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                width: '100%'
                            }} 
                        />
                    )}
                </Grid>
                
                {/* RIGHT SIDE FORM */}
                <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxHeight: '100vh',
                            overflowY: 'auto'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            {formState === 0 ? 'Sign In' : 'Create Account'}
                        </Typography>

                        {/* Switch Buttons */}
                        <Box sx={{ mt: 2, mb: 2 }}>
                            <Button 
                                variant={formState === 0 ? "contained" : "outlined"} 
                                onClick={() => toggleFormState(0)}
                                sx={{ mr: 2 }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant={formState === 1 ? "contained" : "outlined"} 
                                onClick={() => toggleFormState(1)}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        {/* FORM */}
                        <Box
                            component="form"
                            noValidate
                            sx={{ mt: 1, width: '100%' }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAuth();
                            }}
                        >
                            {formState === 1 && (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        autoFocus
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        select
                                        id="role"
                                        label="Register As"
                                        name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </TextField>
                                </>
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                value={email}
                                autoComplete="email"
                                autoFocus={formState === 0}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {formState === 1 && (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="10-digit number"
                                    />

                                    {role === 'doctor' && (
                                        <>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="specialization"
                                                label="Specialization"
                                                name="specialization"
                                                value={specialization}
                                                onChange={(e) => setSpecialization(e.target.value)}
                                                placeholder="e.g., Cardiology"
                                            />

                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="qualification"
                                                label="Qualification"
                                                name="qualification"
                                                value={qualification}
                                                onChange={(e) => setQualification(e.target.value)}
                                                placeholder="e.g., MBBS"
                                            />

                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="experience"
                                                label="Years of Experience"
                                                name="experience"
                                                type="number"
                                                value={experience}
                                                onChange={(e) => setExperience(e.target.value)}
                                            />
                                        </>
                                    )}

                                    {role === 'patient' && (
                                        <>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="dateOfBirth"
                                                label="Date of Birth"
                                                name="dateOfBirth"
                                                type="date"
                                                value={dateOfBirth}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                                InputLabelProps={{ shrink: true }}
                                            />

                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                select
                                                id="gender"
                                                label="Gender"
                                                name="gender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                SelectProps={{ native: true }}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </TextField>

                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="address"
                                                label="Address (Optional)"
                                                name="address"
                                                multiline
                                                rows={2}
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </>
                                    )}
                                </>
                            )}

                            {error && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                type="submit"
                            >
                                {formState === 0 ? "Sign In" : "Create Account"}
                            </Button>

                            {formState === 0 && (
                                <Box sx={{ textAlign: 'center', mt: 1 }}>
                                    <Button size="small" color="primary">
                                        Forgot password?
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
