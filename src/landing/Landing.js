import { useState, useEffect } from 'react'
import { Box, Grid, Typography, TextField, Button, useMediaQuery, Dialog, Alert, Stack, Collapse } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { makeStyles, useTheme } from '@mui/styles'
import { getDatabase, get, orderByChild, equalTo, ref, query } from 'firebase/database'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-scroll'
import weddingLogo from '../resources/wedding_logo.svg'
import vistalbaBkg from '../resources/vistalba_bkg.svg'
// import avatar from '../resources/avatar.svg'
import mendozaBkg from '../resources/mendoza_bkg.svg'
import logoVistalba from '../resources/logo_bodega_vistalba.svg'
import vistalba1 from '../resources/vistalba1.png'
import vistalba2 from '../resources/vistalba2.png'
import vistalba3 from '../resources/vistalba3.png'
import Invitation from '../invitation/Invitation';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#F5ECE8",
        minHeight: "100%",
        fontFamily: 'Proxima Nova !important'
    },
    menuItem: {
        color: "#B7004C",
        fontWeight: "bold"
    },
    sectionOneContainer: {
        backgroundColor: "rgba(245, 236, 232, 0.76)"
    },
    upperCard: {
        background: "#F5ECE8",
        borderRadius:"10px"
    },
    button: {
        color: "#B7004C !important"
    },
    buttonContained: {
        backgroundColor: "#B7004C !important",
        color: "white"
    },
    formItem: {
        backgroundColor: "white"
    }
})

function Landing(props) {
    const db = getDatabase()
    const [openAlert, setOpenAlert] = useState(false)
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    const [invitationRedeemed, setInvitationRedeemed] = useState()
    const [inviteePath, setInviteePath] = useState()
    const [openInvitation, setOpenInvitation] = useState(false)
    let history = useHistory();

    useEffect(() => {
        let invitee = JSON.parse(localStorage.getItem("invitee"))
        if(invitee) {
            let path = localStorage.getItem("inviteePath")
            setInviteePath(path)
            setInvitationRedeemed(invitee)
        }
    }, [])

    const getUser = async (e) => {
        e.preventDefault();
        setLoading(true)
        setOpenAlert(false)
        
        if(!email) {
            setLoading(false)
            return
        }

        let userByEmail = await query(ref(db, "users"), orderByChild("email"), equalTo(email.trim()))
        get(userByEmail).then(snap => {
            let value = snap.val()
            let invitees = Object.keys(value)
            if(invitees.length > 0) {
                console.log(invitees[0])
                let invitee = value[invitees[0]]
                history.push("/rsvp", { invitee: invitee, inviteePath: invitees[0] })
            }
        })
        .catch(e => {
            setOpenAlert(true)
            console.log(e)
        })
        .finally(() => {
            setLoading(false)
        })
        
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    let classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box display="flex" >
                <Box flexGrow={1} alignSelf="left" p={2} pl={4}>
                    <img src={weddingLogo} height="40px" width="40px" alt="logo"/>
                </Box>
                {
                    !isMobile && 
                    <Box p={2}>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Box px={2} pt={1}>
                                    <Link to='bodega' spy={true} smooth={true} style={{textDecoration: "none", cursor: "pointer"}}>
                                        <Typography className={classes.menuItem} variant="body1">La Bodega</Typography>
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box px={2} pt={1}>
                                    <Link to='hotels' spy={true} smooth={true} style={{textDecoration: "none", cursor: "pointer"}}>
                                        <Typography className={classes.menuItem} variant="body1">Hoteles</Typography>
                                    </Link> 
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box px={2} pt={1} >
                                    <Link to='rsvp' spy={true} smooth={true} style={{textDecoration: "none", cursor: "pointer"}}>
                                        <Typography className={classes.menuItem} variant="body1">RSVP</Typography>
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box px={2} pt={1}>
                                    <Link to='map' spy={true} smooth={true} style={{textDecoration: "none", cursor: "pointer"}}>
                                        <Typography className={classes.menuItem} variant="body1">Mapa</Typography>
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                }
            </Box>
            {
                invitationRedeemed && 
                <Box p={2} textAlign="center">
                    <Typography variant="body1">Tenés una invitación guardada</Typography>
                    <Button variant="text" className={classes.button} onClick={() => setOpenInvitation(true)}>Ver invitación</Button>
                </Box>
            }
            <Box style={{background: `url(${vistalbaBkg}) no-repeat 100%`, backgroundSize: "cover"}}>
                <Box className={classes.sectionOneContainer}>
                    <Grid container justifyContent={isMobile ? "center" : "flex-start"}>
                        <Grid item xs={11} sm={11} md={6} lg={4}>
                            <Box textAlign="center" className={classes.upperCard} ml={!isMobile ? 10 : 0} my={10} p={5}>
                                {/* <img src={avatar} height="80px" width="80px" alt="avatar"/> */}
                                <Box py={2}>
                                    <Typography variant="h6">Somos Caro y Nico y... <br/> ¡Nos casamos!</Typography>
                                </Box>
                                <Box pb={3}>
                                    <Typography variant="body1">Estamos muy contentos de anunciar que nos casamos y queremos compartirlo con las personas que nos han acompañado estos 12 años</Typography>
                                </Box>
                                <Box pb={2}>
                                    <Typography className={classes.menuItem} variant="h5">19/02/2022</Typography>
                                </Box>
                                <Box pb={2}>
                                    <Typography className={classes.menuItem} variant="h6">Lujan de cuyo, Mendoza, Argentina</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box id="rsvp">
                <Grid container justifyContent="center">
                    <Grid item xs={11} sm={8} md={4} lg={3}>
                        <Box textAlign="center" pt={2}>
                            <Typography variant="h6">Confirmá tu asistencia</Typography>
                            <Typography variant="subtitle1">Ingresá tu dirección de mail</Typography>
                        </Box>
                        <Box pb={4} pt={2}>
                            <form onSubmit={getUser}>
                                <TextField
                                    variant="filled"
                                    fullWidth 
                                    InputProps={{
                                        className: classes.formItem,
                                        disableUnderline: true
                                    }}
                                    onChange={handleChange}
                                    name="email"
                                    size="small" 
                                    margin="normal" 
                                    placeholder="Email"></TextField>
                                    <LoadingButton
                                        loading={loading}
                                        className={classes.buttonContained}
                                        fullWidth
                                        variant="contained"
                                        type="submit">Confirmar</LoadingButton>
                            </form>
                        </Box>
                        <Box mb={2}>
                            <Collapse in={openAlert}>
                                <Stack spacing={2}>
                                    <Alert severity="error">Ese mail no se encuentra cargado. Por favor hablá con Nico o Caro!</Alert>
                                </Stack>
                            </Collapse>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <img width="100%" src={mendozaBkg} alt="background de mendoza" />
            </Box>
            <Box textAlign="center" id={'bodega'}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Box p={2} my={5}>
                            <Box py={2}>
                                <Typography variant="body1">
                                    Sobre la bodega
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2">
                                Nos encanta la idea de hacer algo distinto, nos encanta viajar y creemos 
                                que es una gran oportunidad para encontrarnos en un lugar distinto. Fuera de nuestro hogar.
                                <br />
                                <br/>
                                Así que decidimos mudar el casamiento a Mendoza!
                                <br />
                                <br/>
                                Nos casamos en la bodega más linda que encontramos, que nos deja estar cerca de la naturaleza y bueno de los vinos.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Box minHeight="200px" display="flex" alignItems="center" textAlign="center">
                            <img style={{margin: "0 auto"}} src={logoVistalba} height="120px" alt="logo vistalba"/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <img src={vistalba3} width="100%" alt="vistalba3"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <img src={vistalba2} width="100%" alt="vistalba2"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <img src={vistalba1} width="100%" alt="vistalba1"/>
                    </Grid>
                </Grid>
            </Box>
            <Box p={3} id={'hotels'}>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <Box p={4} textAlign="center">
                            <Typography variant="h6">Alojamiento y hoteles</Typography>
                            <Typography variant="body1">La idea es que <b>no manejes y te puedas relajar y disfrutar</b> del evento. Para esto habrán
                            transfers que te pasarán a buscar por el hotel en el que te hospedes. <br/> <br/>
                            Te dejamos una lista de los <b>hoteles que recomendamos por la zona</b> y cercanía a la bodega. 
                            <br/> <br/> 
                            <b>En caso de no querer</b> uno de estos hoteles, <b>te pedimos tratar de quedarte cerca de la zona de los mismos</b>. Podrás 
                            indicar en que hotel, departamento, hostel o camping te quedás para que te busquen ahí también. </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <Typography variant="subtitle1"><u><b>Hotel Hyatt</b></u></Typography>
                            <Typography variant="body1"><b>5 Estrellas - Centro de mendoza</b></Typography>
                            <Typography variant="body2">Precio estimado: AR$ 17.000 a 22.000 la noche</Typography>
                        </Box>
                        <Box p={2}>
                            <Typography variant="subtitle1"><u><b>Hotel Sheraton</b></u></Typography>
                            <Typography variant="body1"><b>5 Estrellas - Centro de mendoza</b></Typography>
                            <Typography variant="body2">Precio estimado: AR$ 17.000 a 22.000 la noche</Typography>
                        </Box>
                        <Box p={2}>
                            <Typography variant="subtitle1"><u><b>Hotel Diplomatic</b></u></Typography>
                            <Typography variant="body1"><b>5 Estrellas - Centro de mendoza</b></Typography>
                            <Typography variant="body2">Precio estimado: AR$ 12.000 a 15.000 la noche</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <Typography variant="subtitle1"><u><b>Hotel Amerian</b></u></Typography>
                            <Typography variant="body1"><b>4 Estrellas - Centro de mendoza</b></Typography>
                            <Typography variant="body2">Precio estimado: AR$ 8000 a 12.000 la noche</Typography>
                        </Box>
                        <Box p={2}>
                            <Typography variant="subtitle1"><u><b>Hotel Raices Aconcagua</b></u></Typography>
                            <Typography variant="body1"><b>4 Estrellas - Centro de mendoza</b></Typography>
                            <Typography variant="body2">Precio estimado: AR$ 8.000 a 10.000 la noche</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box id={"map"}>
                <div class="mapouter">
                    <div class="gmap_canvas">
                        <iframe title="google maps" width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=amerian%20hotel,%20mendoza&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>                        
                    </div>
                </div>
            </Box>
            <Box textAlign="center" py={10}>
                <Box textAlign="center" p={2}>
                    <Typography variant="h6">Sumá tus temas a la lista de la boda</Typography>
                    <Typography variant="subtitle1">Esta lista es pública y podés sumar todos los temas que te gustaría que suenen en la boda! Pensá en temas bailables, no pongas a Lana del Rey que nos pinta el bajón!</Typography>
                    <Button variant="contained">Ver Lista</Button>
                </Box>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={3}>
                        <Typography variant="body1">
                            Esperamos poder verte ahí ❤️
                        </Typography>
                        <Typography variant="body1">
                            <b>Los queremos, Caro y Nico.</b>
                        </Typography>
                    </Grid>
                </Grid>
                <Box textAlign="right" pt={5} px={2}>
                    <Typography variant="caption">built by Nico with ❤️</Typography>
                </Box>
            </Box>
            <Dialog fullScreen={isMobile} open={openInvitation} onClose={() => setOpenInvitation(false)} p={0}>
                <Invitation invitee={invitationRedeemed} inviteePath={inviteePath} onClose={() => setOpenInvitation(false)} />
            </Dialog>
        </Box>
    )
}

export default Landing