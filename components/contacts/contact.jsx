import { AiFillMessage } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import styles from "./contact.module.css";
import { Button, Container, FormControl, FormErrorMessage, Text, FormLabel, Heading, Input, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import axios from "axios";

const initValues = {
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
}

const initState = { values: initValues }

const Contact = () => {

    const [state, setState] = useState(initState)
    const [touched, setTouched] = useState({})
    const [ip, setIp] = useState("")

    const { values, isLoading, error } = state;

    useEffect(()=>{
        axios.get(`https://api.ipify.org/?format=json%27`)
        .then((res)=>setIp(res.data))
        //for get ip and locationx`
        // axios.get(`http://ip-api.com/json/?fields=61439`)
        // .then((res)=>console.log(res.data))
    }, [])

    const onBlurhandler = ({ target }) => setTouched((prev) => ({
        ...prev,
        [target.name]: true
    }))
    const handleChange = ({ target }) => setState((prev) => ({
        ...prev,
        values: {
            ...prev.values,
            [target.name]: target.value,
        }
    }))

    const onSubmit = async () => {
        setState((prev) => ({
            ...prev,
            isLoading: true
        }))
        if (!values.name || !values.email || !values.number || !values.subject || !values.message) {
            alert("fill data")
            setState((prev) => ({
                ...prev,
                isLoading: false,
            }))
        } else {

            try {
                const sendContact = await fetch('http://localhost:3000/api/contacts', {
                    method: "POST",
                    body: JSON.stringify({...values, ip}),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                })
                if (!sendContact.ok) {
                    console.log("failed tosend message !")
                } else {
                    setTouched({})
                    setState(initState)

                    return sendContact.json()
                }

            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: error.message
                }))
            }
        }
    }

    return (
        <div className={styles.fluidcontainer}>

            <div className={styles.imgOverLay}>
                <img src="/projectimages/bussines-04.jpg"  alt="my works" />
                <div className={styles.overLay}>
                    <div className={styles.itemContent}>
                        <h3>
                            Contact us
                        </h3>
                    </div>
                </div>
            </div>

            <div className={styles.container}>

                <div className={styles.contacts}>

                    <div className={styles.contactHead}>
                        <span> // contact Us</span>
                        <h2>Get in Touch</h2>
                    </div>

                    <div className={styles.contactcontent}>
                        <div className={styles.contactData} >
                            <div className={styles.icons}>
                                <AiFillMessage />
                            </div>
                            <div className={styles.contactitem}>
                                <p>Call Anytime</p>
                                <h3><a href="/">0 111 222 333</a></h3>
                            </div>
                        </div>

                        <div className={styles.contactData} >
                            <div className={styles.icons}>
                                <HiOutlineMailOpen />
                            </div>
                            <div className={styles.contactitem}>
                                <p>Send Email</p>
                                <h3><a href="/">ramanatleogic@gmail.com</a></h3>
                            </div>
                        </div>

                        <div className={styles.contactData} >
                            <div className={styles.icons}>
                                <FiSend />
                            </div>
                            <div className={styles.contactitem}>
                                <p>Visit Office</p>
                                <h3><a href="/">86 Road Broklyn street, New York</a></h3>
                            </div>
                        </div>
                    </div>

                </div>

                <Container my={"50px"} mx={"auto"} className="w-full lg:w-[40vw] m-0 flex flex-col justify-center gap-4 items-center rounded shadow-lg bg-slate-200 py-12">
                    {
                        error && <Text className="text-red-600 text-sm" my={4} fontSize="xl" >
                            {error}
                        </Text>
                    }
                    <div className="flex flex-col lg:flex-row gap-3">
                        <FormControl isRequired mb={5} isInvalid={touched.name && !values.name} className="flex flex-col justify-around " >
                            <FormLabel>Name</FormLabel>

                            <Input type={"text"} name="name" size='lg' onBlur={onBlurhandler} errorBorderColor='red-300' value={values.name} onChange={handleChange} className="rounded p-2 text-lg w-[80vw] lg:w-full outline-none" />
                            <FormErrorMessage className="text-red-600 text-sm">Required</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired mb={5} className="flex flex-col justify-around" isInvalid={touched.email && !values.email}>
                            <FormLabel>Email</FormLabel>
                            <Input type={"email"} name="email" size='lg' onBlur={onBlurhandler} errorBorderColor='red.300' value={values.email} onChange={handleChange} className="rounded p-2 text-lg w-[80vw] lg:w-full outline-none" />
                            <FormErrorMessage className="text-red-600 text-sm">Required</FormErrorMessage>
                        </FormControl>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-3">
                        <FormControl isRequired mb={5} className="flex flex-col justify-around" isInvalid={touched.number && !values.number}>
                            <FormLabel>Number</FormLabel>
                            <Input type={"number"} name="number" size='lg' onBlur={onBlurhandler} errorBorderColor='red.300' value={values.number} onChange={handleChange} className="rounded p-2 text-lg w-[80vw] lg:w-full outline-none" />
                            <FormErrorMessage className="text-red-600 text-sm">Required</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired mb={5} className="flex flex-col justify-around" isInvalid={touched.subject && !values.subject}>
                            <FormLabel>Subject</FormLabel>
                            <Input type={"text"} name="subject" size='lg' onBlur={onBlurhandler} errorBorderColor='red.300' value={values.subject} onChange={handleChange} className="rounded p-2 text-lg w-[80vw] lg:w-full outline-none" />
                            <FormErrorMessage className="text-red-600 text-sm">Required</FormErrorMessage>
                        </FormControl>
                    </div>
                    <FormControl isRequired mb={5} className="flex flex-col justify-around" isInvalid={touched.message && !values.message}>
                        <FormLabel>Message</FormLabel>
                        <Textarea type={"message"} rows={3} cols={30} name="message" value={values.message} onChange={handleChange} onBlur={onBlurhandler} className="rounded p-2 text-lg w-[80vw] lg:w-full outline-none" />
                        <FormErrorMessage className="text-red-600 text-sm">Required</FormErrorMessage>
                    </FormControl>

                    <Button className="bg-blue-600 hover:bg-blue-500 text-xl text-white p-2 rounded"
                        disabled={!values.name || !values.email || !values.number || !values.subject || !values.message} onClick={onSubmit}
                        isLoading={isLoading}
                    >submit</Button>
                </Container>

            </div>
            <div className="w-[92vw] m-auto">

                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14720.50172694357!2d75.8733751!3d22.7235788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd44d1beb083%3A0xf997696d678db324!2sAtal%20Dwar%2C%20HIG%20Main%20Rd%2C%20Near%20MIG%20Thana%2C%20Nehru%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452003!5e0!3m2!1sen!2sin!4v1675406186521!5m2!1sen!2sin" width="100%" height="450" style={{ border: "1px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                {/* 22.717, 75.8337 */}
            </div>
        </div>
    )
}

export default Contact;