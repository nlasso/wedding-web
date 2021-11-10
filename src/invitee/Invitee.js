import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Grid, Typography, TextField, Checkbox, FormControlLabel, Button, Stepper, Step, StepLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'
import { getDatabase, set, ref } from 'firebase/database'
import weddingLogo from '../resources/wedding_logo.svg'

const useStyles = makeStyles({
    root: {
        background: "#F5ECE8"
    },

    button: {
        backgroundColor: "#B7004C",
        color: "white"
    },
    stepper: {
        background: "none"
    },
    stepIcon: {
        color: "#B7004C !important"
    },
    textButton: {
        color: "#B7004C !important",
        background: "none"
    },
    buttonContained: {
        backgroundColor: "#B7004C !important",
        color: "white !important"
    }
})

function Invitee(props) {
    const database = getDatabase();
    const [invitee, setInvitee] = useState({})
    const [loading, setLoading] = useState(false)
    const [activeInvitee, setActiveInvitee] = useState({})
    const classes = useStyles();
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(0)
    const history = useHistory()
    const [companionsAmount, setCompanionsAmount] = useState(0)

    useEffect(() => {
        setInvitee(location.state?.invitee)
        setActiveInvitee(location.state?.invitee)
        console.log(location.state?.invitee)
        var cAmount = Number(isNaN(location.state?.invitee?.companionsAmount) ? 0 : location.state?.invitee?.companionsAmount)
        setCompanionsAmount(cAmount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        setActiveInvitee({
            ...activeInvitee,
            [e.target.name]: e.target.value
        })
    }

    const handleCheck = (e) => {
        setActiveInvitee({
            ...activeInvitee,
            [e.target.name]: e.target.checked
        })
    }

    const handleNext = (isConfirm) => {
        // If user has companions to invite
        if(activeInvitee.asists === "false") {
            updateInvitee(activeInvitee)
            return
        }

        if(companionsAmount > 0){  
            
            // If it´s the last companion and clicked next then is a submit.
            if(isConfirm) {
                
                // Submit - update user
                var inviteeCopy = invitee
                
                if(activeStep !== 0) {
                    //Add companions to invitee

                    if(invitee.companions?.length >= activeStep) {
                        inviteeCopy.companions[activeStep - 1] = activeInvitee
                    } else {
                        
                        if(!inviteeCopy.companions) {
                            inviteeCopy.companions = []
                        }
                        //TODO: Validar que activeInvitee no tenga nombre vacio
                        if(activeInvitee.name && activeInvitee.name.length > 0 && activeInvitee.email && activeInvitee.email.length > 0) {
                            inviteeCopy.companions.push(activeInvitee)
                        }
                    }
                } else {
                    //Update user
                    inviteeCopy = activeInvitee
                }
                
                setInvitee(inviteeCopy)
                console.log("invitee", inviteeCopy)
                
                updateInvitee(inviteeCopy)
                return 
            } else {
                //If it´s not a submit.
                var companionIndex = activeStep 
                
                var inviteeCopyNotConfirm = invitee
                if (activeStep > 0) {
                    // Need to save the companion into invitee.companion array.
                    if (invitee.companions?.length >= companionIndex) {
                        // Then there´s a companion set and it´s needed to update the companion
                        inviteeCopyNotConfirm.companions[activeStep - 1] = activeInvitee
                    } else {
                        
                        if(inviteeCopyNotConfirm.companions === undefined) {
                            inviteeCopyNotConfirm.companions = []
                        }

                        inviteeCopyNotConfirm.companions.push(activeInvitee)
                    }

                } else {
                    inviteeCopyNotConfirm = activeInvitee
                }

                //If this companion is not yet loaded into array.
                var companion = {
                    arrival: activeInvitee.arrival,
                    departure: activeInvitee.departure,
                    hotel: activeInvitee.hotel,
                    hotelAddress: activeInvitee.hotelAddress
                }

                if(invitee.companions?.length > companionIndex) {
                    // Companion is loaded. Might be an edition so load it into active invitee.
                    companion = invitee.companions[companionIndex]
                }

                setInvitee(inviteeCopyNotConfirm)
                setActiveInvitee(companion)
                setActiveStep(activeStep + 1)
            }
            return
        }

        //submit   
        setInvitee(activeInvitee)
        console.log("invitee", activeInvitee)
        
        updateInvitee(activeInvitee)
    }

    const handleBack = () => {
        if(activeStep > 0) {
            let inviteeCopy = invitee
            if(!inviteeCopy.companions) {
                inviteeCopy.companions = []
            }

            if(activeInvitee.name && activeInvitee.name.length > 0 && activeInvitee.email && activeInvitee.email.length > 0) {
                inviteeCopy.companions[activeStep - 1] = activeInvitee
            }

            setInvitee(inviteeCopy)

            if(activeStep === 1) {
                setActiveInvitee(invitee)
            } else {
                setActiveInvitee(invitee.companions[activeStep - 2])
            }
        }

        let activeStepCopy = activeStep
        setActiveStep(activeStepCopy - 1)
    }

    const updateInvitee = (inviteeParam) => {
        setLoading(true)
        set(ref(database, 'users/' + location.state?.inviteePath), inviteeParam).then(response => {
            if(inviteeParam.asists === "true") {
                localStorage.setItem("invitee", JSON.stringify(inviteeParam))
                localStorage.setItem("inviteePath", location.state?.inviteePath)
            }

            history.push(inviteeParam.asists === "true" ? "/?invitation=true" : "/")
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Box p={2} className={classes.root} minHeight="100vh">
            <Box flexGrow={1} alignSelf="left" p={2}>
                <img src={weddingLogo} height="40px" width="40px" alt="logo"/>
            </Box>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={8} lg={6}>
                    <Box py={2}>
                        <Typography variant="h6">
                            Confirmá tu asistencia
                        </Typography>
                        <Typography variant="body1">
                            Por favor, completá los siguientes datos así podemos brindarte una experiencia completa teniendo en cuenta tus necesidades.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {
                (invitee?.companionsAmount > 0 && (activeInvitee?.asists === true || activeInvitee?.asists === "true")) &&
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={12} md={8} lg={6}>
                        <Stepper className={classes.stepper} activeStep={activeStep}>
                            <Step key={"Tu invitación"}>
                                <StepLabel 
                                    StepIconProps={{
                                        classes: { root: classes.stepIcon }
                                    }}
                                    >Tu Invitación</StepLabel>
                            </Step>
                            {   
                                Array.from(Array(companionsAmount ?? 0), (x, index) => index).map((i) => {
                                    console.log("invitado", i)
                                    return (
                                        <Step key={`Invitado/a ${i + 1}`}>
                                            <StepLabel
                                                StepIconProps={{
                                                    classes: { root: classes.stepIcon }
                                                }}
                                                >{`Invitado/a ${i + 1}`}</StepLabel>
                                        </Step>     
                                    )
                                })
                            }
                        </Stepper>
                    </Grid>
                </Grid>
            }
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField 
                        variant="filled"
                        label="Nombre Completo"
                        InputProps={{
                            className: classes.formItem,
                            disableUnderline: true
                        }}
                        onChange={handleChange}
                        value={activeInvitee?.name ?? ""}
                        name="name"
                        size="small" 
                        margin="normal" 
                        disabled={activeStep === 0}
                        required
                        fullWidth
                        placeholder="Nombre Completo"></TextField>
                    <TextField 
                        variant="filled"
                        label="Email"
                        InputProps={{
                            className: classes.formItem,
                            disableUnderline: true
                        }}
                        onChange={handleChange}
                        value={activeInvitee?.email ?? ""}
                        name="email"
                        size="small" 
                        margin="normal" 
                        disabled={activeStep === 0}
                        required
                        fullWidth
                        placeholder="Email"></TextField>
                    <TextField 
                        variant="filled"
                        label="Nro. de celular"
                        InputProps={{
                            className: classes.formItem,
                            disableUnderline: true
                        }}
                        onChange={handleChange}
                        value={activeInvitee?.cellphone ?? ""}
                        name="cellphone"
                        size="small" 
                        margin="normal" 
                        required
                        fullWidth
                        placeholder="Nro. de celular"></TextField>
                    {
                        activeStep === 0 && 
                        <>
                            <Box py={2}>
                                <Typography variant="subtitle1">Confirmá tu asistencia:</Typography>
                            </Box>
                            <FormControl fullWidth>
                                <InputLabel id="asists-select-label">Confirmá tu asistencia</InputLabel>
                                <Select
                                    labelId="asists-select-label"
                                    value={activeInvitee?.asists ?? "undefined"}
                                    name="asists"
                                    id="asists-select"
                                    fullWidth
                                    label="confirmá tu asistencia"
                                    onChange={handleChange} >
                                    <MenuItem value={"undefined"}> - </MenuItem>
                                    <MenuItem value={"true"}>Si asisto</MenuItem>
                                    <MenuItem value={"false"}>No asisto</MenuItem>                                    
                                </Select>

                            </FormControl>
                        </>
                    }
                    {
                        (activeInvitee?.asists === true || activeInvitee?.asists === "true" || activeStep > 0) &&
                        <>
                            <Box py={2}>
                                <Typography variant="h6">Edad</Typography>
                                <Typography variant="subtitle2">Si sos mayor y querés mentir un poquito, todo bien, pero menores de 18 porfa edad que tendrá a la fecha del evento 19/02 :)</Typography>
                            </Box>
                            <TextField 
                                variant="filled"
                                label="Edad"
                                InputProps={{
                                    className: classes.formItem,
                                    disableUnderline: true
                                }}
                                onChange={handleChange}
                                value={activeInvitee?.age ?? 0}
                                name="age"
                                size="small" 
                                margin="normal" 
                                required
                                fullWidth
                                placeholder="Edad"></TextField>
                            <Box py={2}>
                                <Typography variant="h6">Tus fechas en mendoza</Typography>
                                <Typography variant="subtitle2">No es necesario que las cargues ahora si aún no lo sabés, podés cargarlo luego! Pero si por favor recordá hacerlo ya que de esto dependen las transfers que pasarán por ustedes el día del evento.</Typography>
                            </Box>
                            <FormControl fullWidth>
                                <InputLabel id="arrival-date-label">Fecha de llegada</InputLabel>
                                <TextField 
                                    variant="filled"
                                    InputProps={{
                                        className: classes.formItem,
                                        disableUnderline: true
                                    }}
                                    onChange={handleChange}
                                    value={activeInvitee?.arrival ?? Date.now}
                                    name="arrival"
                                    size="small" 
                                    margin="normal" 
                                    required
                                    fullWidth
                                    type="date"></TextField>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="departure-date-label">Fecha de partida</InputLabel>
                                <TextField 
                                    variant="filled"
                                    InputProps={{
                                        className: classes.formItem,
                                        disableUnderline: true
                                    }}
                                    onChange={handleChange}
                                    value={activeInvitee?.departure ?? Date.now}
                                    name="departure"
                                    size="small" 
                                    margin="normal" 
                                    type="date"
                                    required
                                    fullWidth></TextField>
                            </FormControl>
                            <TextField 
                                variant="filled"
                                InputProps={{
                                    className: classes.formItem,
                                    disableUnderline: true
                                }}
                                label="¿En qué hotel te quedás?"
                                onChange={handleChange}
                                value={activeInvitee?.hotel || ""}
                                name="hotel"
                                size="small" 
                                margin="normal" 
                                type="text"
                                required
                                fullWidth
                                placeholder="Hotel"></TextField>
                            <TextField 
                                variant="filled"
                                InputProps={{
                                    className: classes.formItem,
                                    disableUnderline: true
                                }}
                                label="¿Cuál es la dirección de tu hotel?"
                                onChange={handleChange}
                                value={activeInvitee?.hotelAddress || ""}
                                name="hotelAddress"
                                size="small" 
                                margin="normal" 
                                type="text"
                                required
                                fullWidth
                                placeholder="Dirección del hotel"></TextField>
                            
                            <Box py={2}>
                                <Typography variant="h6">Un poco sobre vos...</Typography>
                                <Typography variant="subtitle2">Te pedimos que nos indiques si tenés alguna preferencia alimenticia así como cualquier otro detalle de salud que debamos tener en cuenta para que los organizadores puedan cuidarte y hacerte sentir cómodo/a en todo el evento.</Typography>
                            </Box>
                            <TextField 
                                variant="filled"
                                InputProps={{
                                    className: classes.formItem,
                                    disableUnderline: true
                                }}
                                label="¿Tenés alguna alergia?"
                                onChange={handleChange}
                                value={activeInvitee?.alergie || ""}
                                name="alergie"
                                size="small" 
                                margin="normal"
                                rows={4} 
                                type="multiline"
                                fullWidth
                                placeholder="Miel, kiwi, etc..."></TextField>
                            <TextField 
                                variant="filled"
                                InputProps={{
                                    className: classes.formItem,
                                    disableUnderline: true
                                }}
                                label="¿Tenés alguna preferencia alimenticia?"
                                onChange={handleChange}
                                value={activeInvitee?.alimentaryPreference || ""}
                                name="alimentaryPreference"
                                size="small" 
                                margin="normal"
                                rows={4} 
                                type="multiline"
                                fullWidth
                                placeholder="Vegano/a, Vegetariano/a, etc..."></TextField>
                            <TextField 
                                variant="filled"
                                InputProps={{
                                    className: classes.formItem,
                                    disableUnderline: true
                                }}
                                label="¿Tenés alguna patología relacionada a la alimentación?"
                                onChange={handleChange}
                                value={activeInvitee?.patology || ""}
                                name="patology"
                                size="small" 
                                margin="normal"
                                rows={4} 
                                type="multiline"
                                fullWidth
                                placeholder="Celíaco/a, Intolerancias, etc..."></TextField>

                            <Box py={2}>
                                <Typography variant="h6">Hora de ponerse vanidoso/a</Typography>
                                <Typography variant="subtitle2">Si necesitás alguno de estos servicios en Mendoza, antes de la boda, confirmalo así luego te pasamos información o alguien del equipo se contacta con vos. A todos nos gusta vernos impecables ;)</Typography>
                            </Box>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={activeInvitee.handsCare || false}
                                    onChange={handleCheck}
                                    name="handsCare"
                                    color="primary"
                                />}
                                label="Manicura" />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={activeInvitee.hairCare || false}
                                    onChange={handleCheck}
                                    name="hairCare"
                                    color="primary"
                                />}
                                label="Peluquería" />
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={activeInvitee.makeup || false}
                                    onChange={handleCheck}
                                    name="makeup"
                                    color="primary"
                                />}
                                label="Maquillaje" />
                            <Box py={2}>
                                <Typography variant="caption">(*) Los costos de estos servicios serán enviados a requerimiento.</Typography>
                            </Box>
                            {
                                companionsAmount > 0 &&
                                <Box>
                                    <Typography variant="body1"><b>Apretá "siguiente" para cargar a tu invitado/a!</b></Typography>
                                </Box>
                            }
                            <Box display="flex" my={2}>
                                {
                                    activeStep > 0 && 
                                    <Box flexGrow={1} alignSelf="left">
                                        <Button variant="text" color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                                            Atras
                                        </Button>
                                    </Box>
                                }
                                {
                                    companionsAmount > 0 &&
                                    <Box alignSelf="right" mr={1}>
                                        <Button
                                            className={classes.buttonContained}
                                            disabled={activeInvitee?.email === undefined || companionsAmount === 0 || activeStep >= companionsAmount }
                                            variant="contained"
                                            onClick={() => handleNext(false)}>+ Invitado/a</Button>
                                    </Box>
                                }
                                <Box alignSelf="right" >
                                    <LoadingButton
                                        loading={loading}
                                        className={classes.buttonContained}
                                        fullWidth
                                        variant="contained"
                                        onClick={() => handleNext(true)}>Confirmar</LoadingButton>
                                </Box>
                            </Box>
                            
                        </>
                    }
                    {
                        (activeInvitee?.asists !== "true" && activeInvitee?.asists !== true && activeStep === 0) && 
                        <Box p={2}>
                            <LoadingButton
                                loading={loading}
                                className={classes.buttonContained}
                                fullWidth
                                variant="contained"
                                onClick={() => handleNext(true)}
                                type="submit">Confirmar</LoadingButton>
                        </Box>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default Invitee