import {initializeApp} from 'firebase/app';
import 'firebase/auth';
import {getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, updateDoc, doc  } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCFgsM1qkXu_SiX-H4qqCbnO0O90GtI8NQ",
    authDomain: "exposocar.firebaseapp.com",
    projectId: "exposocar",
    storageBucket: "exposocar.appspot.com",
    messagingSenderId: "56940325728",
    appId: "1:56940325728:web:1e9816c6f15f6e1b324c05",
    measurementId: "G-G34S3XJ1FV"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

const imagesRef = ref(storage,'/images');

export {
    firestore,
    collection,
    getDocs,
    addDoc,
    storage,
    imagesRef,
    uploadBytes,
    getDownloadURL,
    serverTimestamp,
    getStorage,
    ref,
    updateDoc,
    doc
}
