import { useState, useEffect } from 'react'
import { Box, TextField, Typography, Table, TableContainer, TableBody, Paper, TableCell, TableHead, TableRow, Button, FormControlLabel, Checkbox, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getDatabase, set, push, child, ref, get } from 'firebase/database'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles({
    root: {
        background: "#F5ECE8"
    },
    table: {
      minWidth: 650,
    },
    formItem: {
        backgroundColor: "white"
    }
  });

function Admin() {
    const database = getDatabase();
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({});
    const classes = useStyles();

    const addInvitee = (e) => {
        e.preventDefault()
        const key = push(child(ref(database), 'users')).key
        set(ref(database, 'users/' + key), newUser).then(() => {
            getUsers()
            setNewUser({})
            console.log("guardado correctamente")
        }).catch(e => console.log(e))
    }

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const handleCheck = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.checked
        })
    }

    const getUsers = () => {
        get(ref(database, "users")).then(snap => {
            if(snap.val()){
                console.log(snap.val())
                setUsers(Object.values(snap.val()))
            }
        })
    }

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <Box height="100%">
            <Box p={2}>
                <Paper>
                    <Typography variant="h4" align="center">Cargar Invitado</Typography>
                    <form onSubmit={addInvitee}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField 
                                    variant="filled"
                                    InputProps={{
                                        className: classes.formItem,
                                        disableUnderline: true
                                    }}
                                    onChange={handleChange}
                                    value={newUser.name ?? ""}
                                    name="name"
                                    size="small" 
                                    margin="normal" 
                                    required
                                    fullWidth
                                    placeholder="Nombre Completo"></TextField>
                                <TextField 
                                    variant="filled"
                                    name="email"
                                    InputProps={{
                                        className: classes.formItem,
                                        disableUnderline: true
                                    }}
                                    value={newUser.email ?? ""}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    size="small" 
                                    margin="normal" 
                                    placeholder="email"></TextField>
                                <TextField 
                                    variant="filled"
                                    name="companionsAmount"
                                    type="number"
                                    value={newUser.companionsAmount ?? ""}
                                    InputProps={{
                                        className: classes.formItem,
                                        disableUnderline: true
                                    }}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                    size="small" 
                                    margin="normal" 
                                    placeholder="cantidad de invitados"></TextField>

                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={newUser.preWedding || false}
                                        onChange={handleCheck}
                                        name="preWedding"
                                        color="primary"
                                    />}
                                    label="Pre-boda" />
                                <Box p={2} textAlign="center">
                                    <Button type="submit" variant="contained">Agregar</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>       
            </Box>
            <Box p={2}>
                <Typography variant="h6">Invitados</Typography>
            </Box>
            <Box p={2}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">email</TableCell>
                                <TableCell align="right">Acompañantes</TableCell>
                                <TableCell align="right">Asiste?</TableCell>
                                <TableCell align="right">PreBoda?</TableCell>
                                <TableCell align="right">Edad</TableCell>
                                <TableCell align="right">Teléfono</TableCell>
                                <TableCell align="right">hotel</TableCell>
                                <TableCell align="right">Arribo</TableCell>
                                <TableCell align="right">Salida</TableCell>
                                <TableCell align="right">Alergias</TableCell>
                                <TableCell align="right">Alimentos</TableCell>
                                <TableCell align="right">patologías</TableCell>
                                <TableCell align="right">Peluquería</TableCell>
                                <TableCell align="right">Manicura</TableCell>
                                <TableCell align="right">Maquillaje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.reduce((previousValue, currentValue) => {
                                previousValue.push(currentValue)
                                
                                if(currentValue.companions !== undefined) {
                                    let companions = currentValue.companions.map(c => { c.asists = "true"; c.companionOf = currentValue.name; return c })
                                    let newValue = previousValue.concat(companions)
                                    return newValue
                                }

                                return previousValue
                            }, []).map((row) => (
                            <TableRow key={row?.name} >
                                <TableCell component="th" scope="row">
                                    {row?.name}
                                </TableCell>
                                <TableCell align="right">{row?.email}</TableCell>
                                <TableCell align="right">{row?.companionOf !== undefined ? row?.companionOf : (row?.companionsAmount ?? 0)}</TableCell>
                                <TableCell align="right">{row?.asists ? (row?.asists === "true" ? <CheckIcon style={{color: "green"}} /> : <CloseIcon style={{color: "red"}} />) : "Falta contestar"}</TableCell>
                                <TableCell align="right">{row?.preWedding ? <CheckIcon style={{color: "green"}} /> : <CloseIcon style={{color: "red"}} />}</TableCell>
                                <TableCell align="right">{row?.age}</TableCell>
                                <TableCell align="right">{row?.cellphone}</TableCell>
                                <TableCell align="right">{row?.hotel}</TableCell>
                                <TableCell align="right">{row?.arrival ?? "TBD"}</TableCell>
                                <TableCell align="right">{row?.departure ?? "TBD"}</TableCell>
                                <TableCell align="right">{row?.alergie ?? "TBD"}</TableCell>
                                <TableCell align="right">{row?.alimentaryPreference ?? "no"}</TableCell>
                                <TableCell align="right">{row?.patology ?? "no"}</TableCell>
                                <TableCell align="right">{row?.handsCare === true ? <CheckIcon style={{color: "green"}} /> : <CloseIcon style={{color: "red"}} />}</TableCell>
                                <TableCell align="right">{row?.hairCare === true ? <CheckIcon style={{color: "green"}} /> : <CloseIcon style={{color: "red"}} />}</TableCell>
                                <TableCell align="right">{row?.makeup === true ? <CheckIcon style={{color: "green"}} /> : <CloseIcon style={{color: "red"}} />}</TableCell>
                                
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Admin