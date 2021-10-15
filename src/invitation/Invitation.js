import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Divider, Stepper, Step, StepLabel, IconButton, MobileStepper, useMediaQuery, Button } from '@mui/material'
import { makeStyles, useTheme } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RoomIcon from '@mui/icons-material/Room';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import QRCode from "react-qr-code";


const useStyles = makeStyles({
    root: {
        backgroundColor: "#F5ECE8",
        fontFamily: 'Proxima Nova !important'
    },
    dateComponent: {
        background: "none",
        border: "3px black solid"
    },
    stepIcon: {
        color: "#B7004C !important"
    },
    rightIcon: {
        position: "absolute",
        right: "10",
        top: "50%"
    },
    leftIcon: {
        position: "absolute",
        left: "10",
        top: "50%"
    },
    mobileStepper: {
        backgroundColor: "#B7004C !important",
        color: "white !important"
    }
})

function getEvents() {
    return [
        {
            title: "Pre-boda",
            subtitle: "a partir de las 11 AM.",
            eventDate: "18",
            eventMonth: "FEB",
            date: "Viernes 18 de Febrero",
            time: "11:00Hs - 18:00 Hs",
            place: "Bodega Alfa Crux",
            location: "Valle de Uco, Mendoza.",
            dressCode: "El código de vestimenta es formal relajado. Puede ser un jean + saco, mujeres algún vestido o pantalón formal.",
            extraInfo: "La pre-boda es un evento para los más cercanos a nosotros. Es en valle de uco con lo cual, get ready for the ride! Va a ser un almuerzo relajado, con una vista excepcional del cordon del plata! Preparate para las fotos y los vinazos."
        },
        {
            title: "Boda de Caro y Nico",
            subtitle: "a partir de las 17Hs.",
            eventDate: "19",
            eventMonth: "FEB",
            date: "Sábado 19 de Febrero",
            time: "17:00Hs - 05:00 Hs",
            place: "Bodega Vistalba",
            location: "Luján de cuyo, Mendoza.",
            dressCode: "El código de vestimenta es formal. Tené en cuenta que hace calor (Febrero, mendoza...), con lo cual, ambos/sacos de lino para los hombres por ejemplo y mujeres.. bueno, las mujeres saben mejor.",
            extraInfo: "Mostrá esto en la entrada del evento. Siempre verás la entrada en la pantalla de inicio. En caso de ser un nuevo dispositivo, solo volvé a cargar tu mail."
        }
    ]
}

function Invitation(props) {
    const [invitee, setInvitee] = useState({})
    const [inviteePath, setInviteePath] = useState("")
    const [step, setStep] = useState(0)
    const events = getEvents()
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    useEffect(() => {
        if(!props.invitee?.preWedding) {
            setStep(1)
        }
        setInvitee(props.invitee)
        setInviteePath(props.inviteePath)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  

    const goForward = () => {
        setStep(1)
    }

    const goBack = () => {
        setStep(0)
    }

    return (
        <Box className={classes.root} py={4} px={6} >
            <Box textAlign="right">
                <CloseIcon onClick={props.onClose} sx={{cursor: "pointer"}} />
            </Box>
            {
                invitee?.preWedding &&     
                <Box py={2}>
                    <Stepper activeStep={step}>
                        <Step>
                            <StepLabel StepIconProps={{
                                classes: { root: classes.stepIcon }
                            }}>Pre-Boda</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel StepIconProps={{
                                classes: { root: classes.stepIcon }
                            }}>Boda</StepLabel>
                        </Step>
                    </Stepper>
                </Box>
            }
            <Grid container direction="row">
                <Grid item xs={12} sm={12} md={4}>
                    <Box p={2} textAlign="center">
                        <QRCode size={150} value={inviteePath ?? ""} fgColor="#B7004C" bgColor="#F5ECE8"/>
                    </Box>                    
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Box ml={2}>
                        <Box mb={1}>
                            <Typography variant="caption">EVENTO</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            <Box display="flex" textAlign="center" flexDirection="column" className={classes.dateComponent} mr={2} px={2} py={1}>
                                <Typography variant="subtitle1">{events[step].eventDate}</Typography>
                                <Typography variant="body1"><b>{events[step].eventMonth}</b></Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h6">{events[step].title}</Typography>
                                <Typography variant="body1">{events[step].subtitle}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Box py={2}>
                                        <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
                                            <CalendarTodayIcon sx={{width: "15px"}}/>
                                            <Typography sx={{paddingLeft: "5px"}} variant="caption">FECHA Y HORA</Typography>
                                        </Box>
                                        <Typography variant="subtitle1"><b>{events[step].date}</b></Typography>
                                        <Typography variant="body1">{events[step].time}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box py={2}>
                                        <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
                                            <RoomIcon sx={{width: "15px"}}/>
                                            <Typography sx={{paddingLeft: "5px"}} variant="caption">UBICACIÓN</Typography>
                                        </Box>
                                        <Typography variant="subtitle1"><b>{events[step].place}</b></Typography>
                                        <Typography variant="body1">{events[step].location}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box p={2}>
                        <Typography variant="caption"><b>INVITADOS</b></Typography>
                        <Box mt={2}>
                            <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
                                <AccountCircleIcon sx={{width: "25px"}}/>
                                <Typography sx={{paddingLeft: "5px"}} variant="body2">{invitee?.name}</Typography>
                            </Box>
                            {
                                invitee?.companions?.map(companion => {
                                    return (
                                        <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
                                            <AccountCircleIcon sx={{width: "25px"}}/>
                                            <Typography sx={{paddingLeft: "5px"}} variant="body2">{companion.name}</Typography>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={2}>
                <Divider variant="middle" />
            </Box>
            <Box p={2}>
                <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
                    <InfoIcon sx={{width: "20px"}}/>
                    <Typography sx={{paddingLeft: "5px"}} variant="caption">INFORMACIÓN IMPORTANTE</Typography>
                </Box>
                <Typography variant="body2">{events[step].extraInfo}</Typography>
            </Box>
            <Box p={2}>
                <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
                    <AirportShuttleIcon sx={{width: "20px"}}/>
                    <Typography sx={{paddingLeft: "5px"}} variant="caption">TRASLADOS</Typography>
                </Box>
                <Typography variant="body2">Una transfer te pasará a buscar por tu hotel antes del evento. Te habremos contactado para coordinar los horarios!</Typography>
            </Box>
            <Box p={2}>
                <Box display="flex" alignItems="center" flexWrap="wrap" mb={1}>
                    <CheckroomIcon sx={{width: "20px"}}/>
                    <Typography sx={{paddingLeft: "5px"}} variant="caption">DRESSCODE</Typography>
                </Box>
                <Typography variant="body2">{events[step].dressCode}</Typography>
            </Box>
            {
                (step > 0 && invitee?.preWedding && !isMobile) && 
                <Box position="absolute" top="50%" left="10px">
                    <IconButton sx={{backgroundColor: "#B7004C", color: "white"}} onClick={goBack}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
            }
            {
                (step === 0 && invitee?.preWedding && !isMobile) && 
                <Box position="absolute" top="50%" right="10px">
                    <IconButton sx={{backgroundColor: "#B7004C", color: "white"}} onClick={goForward}>
                        <ChevronRightIcon />
                    </IconButton>
                </Box>
            }
            {
                (isMobile && invitee?.preWedding) && 
                <MobileStepper
                    variant="dots"
                    steps={2}
                    position="bottom"
                    className={classes.mobileStepper}
                    
                    activeStep={step}
                    nextButton={
                        <Button size="small" onClick={goForward} disabled={step === 1} sx={{color: "white"}}>Siguiente</Button>
                    }
                    backButton={
                        <Button size="small" onClick={goBack} disabled={step === 0} sx={{color: "white"}}>atras</Button>
                    }
                    />
            }
        </Box>
    )
}

export default Invitation
