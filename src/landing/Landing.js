import React from 'react'
import {Box, Grid, Typography, makeStyles, TextField, Button} from '@material-ui/core'
import weddingLogo from '../resources/wedding_logo.svg'
import vistalbaBkg from '../resources/vistalba_bkg.svg'
import avatar from '../resources/avatar.svg'
import mendozaBkg from '../resources/mendoza_bkg.svg'
import logoVistalba from '../resources/logo_bodega_vistalba.svg'
import vistalba1 from '../resources/vistalba1.svg'
import vistalba2 from '../resources/vistalba2.svg'
import vistalba3 from '../resources/vistalba3.svg'

const useStyles = makeStyles({
    root: {
        backgroundColor: "#F5ECE8",
        minHeight: "100%"
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
        backgroundColor: "#B7004C",
        color: "white"
    },
    formItem: {
        backgroundColor: "white"
    }
})

function Landing(){
    let classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box display="flex" >
                <Box flexGrow={1} alignSelf="left" p={2}>
                    <img src={weddingLogo} height="40px" width="40px" alt="logo"/>
                </Box>
                <Box p={2}>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Box px={2} pt={1}>
                                <Typography className={classes.menuItem} variant="body1">La Bodega</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box px={2} pt={1}>
                                <Typography className={classes.menuItem} variant="body1">Hoteles</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box px={2} pt={1}>
                                <Typography className={classes.menuItem} variant="body1">RSVP</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box px={2} pt={1}>
                                <Typography className={classes.menuItem} variant="body1">Mapa</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box style={{background: `url(${vistalbaBkg}) no-repeat`}}>
                <Box className={classes.sectionOneContainer}>
                    <Grid container justifyContent="flex-start">
                        <Grid item xs={11} sm={11} md={6} lg={4}>
                            <Box textAlign="center" className={classes.upperCard} ml={10} my={10} p={5}>
                                <img src={avatar} height="60px" width="60px" alt="avatar"/>
                                <Box py={2}>
                                    <Typography variant="h6">Somos Caro y Nico y... ¡Nos casamos!</Typography>
                                </Box>
                                <Box pb={3}>
                                    <Typography variant="body1">Estamos muy contentos de anunciar que nos casamos y queremos compartirlo con las personas que nos han acompañado estos 12 años</Typography>
                                </Box>
                                <Box pb={2}>
                                    <Typography variant="h5">19/02/2022</Typography>
                                </Box>
                                <Box pb={2}>
                                    <Typography variant="h6">Lujan de cuyo, Mendoza, Argentina</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box>
                <Grid container justify="center">
                    <Grid item xs={11} sm={10} md={6} lg={4}>
                        <Box textAlign="center" py={2}>
                            <Typography variant="h6">Canjeá tu invitación</Typography>
                        </Box>
                        <Box py={4}>
                            <form>
                                <TextField
                                    variant="filled"
                                    fullWidth 
                                    InputProps={{
                                        className: classes.formItem,
                                        disableUnderline: true
                                    }}
                                    size="small" 
                                    margin="normal" 
                                    placeholder="Código"></TextField>
                                <TextField
                                    variant="filled"
                                    fullWidth 
                                    InputProps={{
                                        className: classes.formItem,
                                        disableUnderline: true
                                    }}
                                    size="small" 
                                    margin="normal" 
                                    placeholder="Mail"></TextField>
                                <Button className={classes.button} title="Canjear" type="submit" fullWidth> Canjear</Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <img height="100%" src={mendozaBkg} alt="background de mendoza" />
            </Box>
            <Box textAlign="center">
                <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Box p={2}>
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
                        <Box height="100%">
                            <img src={logoVistalba} height="120px" alt="logo vistalba"/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <img src={vistalba1} width="100%" alt="vistalba1"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <img src={vistalba2} width="100%" alt="vistalba2"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <img src={vistalba3} width="100%" alt="vistalba3"/>
                    </Grid>
                </Grid>
            </Box>
            <Box p={3}>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <Box p={4} textAlign="center">
                            <Typography variant="h6">Alojamiento y hoteles</Typography>
                            <Typography variant="body1">La idea es que <b>no manejes y te puedas relajas y disfrutar</b> del evento. Para esto habrán
                            transfers que te pasarán a buscar por el hotel en el que te hospedes. <br/> <br/>
                            Te dejamos una lista de los <b>hoteles que recomendamos por la zona</b> y cercanía a la bodega. 
                            <br/> <br/> 
                            <b>En caso de no querer</b> uno de estos hoteles, <b>te pedimos tratar de quedarte cerca de la zona de los mismos</b>. Podrás 
                            indicar en que hotel, departamento, hostel o camping te quedás para que te busquen ahí también. </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box p={2}>
                            <Typography variant="subtitle1"><u><b>Hotel Hyatt</b></u></Typography>
                            <Typography variant="body1"><b>5 Estrellas - Centro de mendoza</b></Typography>
                            <Typography variant="body2">Precio estimado: AR$ 17.000 a 22.000 la noche</Typography>
                        </Box>
                        <Box p={2}>
                            <Typography variant="subtitle1"><u><b>Hotel Hyatt</b></u></Typography>
                            <Typography variant="body1"><b>5 Estrellas - Centro de mendoza</b></Typography>
                            <Typography variant="body2">Precio estimado: AR$ 17.000 a 22.000 la noche</Typography>
                        </Box>
                        <Box p={2}>
                            <Typography variant="subtitle1"><u><b>Hotel Hyatt</b></u></Typography>
                            <Typography variant="body1"><b>5 Estrellas - Centro de mendoza</b></Typography>
                            <Typography variant="body2">Precio estimado: AR$ 17.000 a 22.000 la noche</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box p={2}>
                            <Typography variant="subtitle1"><u><b>Hotel Hyatt</b></u></Typography>
                            <Typography variant="body1"><b>5 Estrellas - Centro de mendoza</b></Typography>
                            <Typography variant="body2">Precio estimado: AR$ 17.000 a 22.000 la noche</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <div class="mapouter">
                    <div class="gmap_canvas">
                        <iframe title="google maps" width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=amerian%20hotel,%20mendoza&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>                        
                    </div>
                </div>
            </Box>
            <Box textAlign="center" py={10}>
                <Grid container justify="center">
                    <Grid item xs={12} md={3}>
                        <Typography variant="body1">
                            Esperamos poder verte ahí {"<3"}
                        </Typography>
                        <Typography variant="body1">
                            <b>Los queremos, Caro y Nico.</b>
                        </Typography>
                    </Grid>
                </Grid>
                <Box textAlign="right" pt={5} px={2}>
                    <Typography variant="caption">built by Nico with :heart:</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Landing