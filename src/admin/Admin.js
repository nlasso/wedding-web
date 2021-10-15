import { useState, useEffect } from 'react'
import { Box, TextField, Typography, Table, TableContainer, TableBody, Paper, TableCell, TableHead, TableRow, Button, FormControlLabel, Checkbox } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { getDatabase, set, push, child, ref, get } from 'firebase/database'

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

    useEffect(() => {
        get(ref(database, "users")).then(snap => {
            console.log(snap.val())
            setUsers(Object.values(snap.val()))
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <Box height="100%">
            <Box p={2}>
                <Paper>
                    <form onSubmit={addInvitee}>
                        <TextField 
                            variant="filled"
                            InputProps={{
                                className: classes.formItem,
                                disableUnderline: true
                            }}
                            onChange={handleChange}
                            value={newUser.name}
                            name="name"
                            size="small" 
                            margin="normal" 
                            required
                            placeholder="Nombre Completo"></TextField>
                        <TextField 
                            variant="filled"
                            name="email"
                            InputProps={{
                                className: classes.formItem,
                                disableUnderline: true
                            }}
                            value={newUser.email}
                            onChange={handleChange}
                            required
                            size="small" 
                            margin="normal" 
                            placeholder="email"></TextField>
                        <TextField 
                            variant="filled"
                            name="companionsAmount"
                            type="number"
                            value={newUser.companionsAmount}
                            InputProps={{
                                className: classes.formItem,
                                disableUnderline: true
                            }}
                            onChange={handleChange}
                            required
                            size="small" 
                            margin="normal" 
                            placeholder="cantidad de invitados"></TextField>
                            <Button type="submit">Agregar</Button>

                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={newUser.preWedding || false}
                                onChange={handleCheck}
                                name="preWedding"
                                color="primary"
                            />}
                            label="Pre-boda" />
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
                                <TableCell align="right">hotel</TableCell>
                                <TableCell align="right">comida especial</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.companionsAmount ?? 0}</TableCell>
                                {/* <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell> */}
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