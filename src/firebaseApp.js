import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCaox1N_HLOYenMAfBD6Q5UKrqSKTMLld8",
    authDomain: "wedding-edab9.firebaseapp.com",
    databaseURL: "https://wedding-edab9-default-rtdb.firebaseio.com",
    projectId: "wedding-edab9",
    storageBucket: "wedding-edab9.appspot.com",
    messagingSenderId: "545246711818",
    appId: "1:545246711818:web:b6e95a011d17e33e950ff3",
    measurementId: "G-V8D94LMVGQ"
}

let firebase = initializeApp(firebaseConfig)

export default firebase