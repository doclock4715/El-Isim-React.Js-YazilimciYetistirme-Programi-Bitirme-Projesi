import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../addProduct/AddProduct.css"
import { db, storage } from "../../firebase"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//send data to db
import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
//send file to storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//
import ProgressBar from 'react-bootstrap/ProgressBar';


function AddProduct() {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const navigate = useNavigate()
    const [progressP, setProgressP] = useState(0)

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().toLocaleString() + ""
            const storageRef = ref(storage, name + file.name)

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                   
                    console.log('Upload is ' + progress + '% done');
                    setProgressP(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }));
                    });
                }
            );

        }
        file && uploadFile();
    }, [file])

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value, "userId": `${JSON.parse(localStorage.getItem("user")).uid}`, "seller": `${JSON.parse(localStorage.getItem("user")).email}` });
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, "products"), {
                ...data,
                timeStamp: serverTimestamp(),
            });
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='addProduct'>
            <Form>
                <h2>Add Product</h2>
                <div className="formInput">
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
               { progressP >0 && <ProgressBar animated now={progressP} label={`${progressP.toFixed(2)}%`} />}
                <Row className="mb-3">
                    <Form.Group controlId='title' as={Col} >
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control type="input" placeholder="Enter product title" onChange={handleInput} />
                    </Form.Group>
                </Row>

                <Form.Group controlId='details' className="mb-3" >
                    <Form.Label>Details</Form.Label>
                    <Form.Control as="textarea" aria-label="With textarea" onChange={handleInput} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group controlId='price' as={Col} >
                        <Form.Label>Price: $</Form.Label>
                        <Form.Control type="input" placeholder="Price" onChange={handleInput} />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit"  onClick={handleAdd}>
                    Submit
                </Button>
            </Form>
        </div>

    );
}



export default AddProduct