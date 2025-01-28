`use client`;

import { PiWarningCircleBold } from "react-icons/pi";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Spinner from "@/Components/Common/Loading";

import { useEffect } from "react";
import Swal from 'sweetalert2';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ContactUsForm } from '@/store/slices/commonAction';
import { successMessage, errorMessage } from '@/store/slices/slice';
import { RootState, AppDispatch } from '@/store/store';

const ContactSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Trop court !')
        .max(50, 'rop longtemps !')
        .required('Entrez un prénom.'),
    email: Yup.string().email('E-mail invalide').required('Saisissez une adresse e-mail telle que exemple@monsite.com.'),
    phone: Yup.number().required('Entrez un numéro de téléphone.'),
});

const ContactForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { Loading, success, errors } = useSelector((state: RootState) => state.lindicateur);

    const mapStyle: React.CSSProperties = {
        position: "relative",
        textAlign: "right",
        width: "100%",
    };

    const canvasStyle: React.CSSProperties = {
        overflow: "hidden",
        background: "none",
        width: "100%",
    };

    // const iframeStyle: React.CSSProperties = {
    //     height: "100%",
    // };

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: success?.message,
                icon: "success",
                iconColor: "#36AA00",
                confirmButtonColor: "#36AA00",
                confirmButtonText: "D'accord",
                timer: 5000,
            }).then(() => {
                dispatch(successMessage(""));
            })
        }
        else if (errors) {
            Swal.fire({
                title: errors?.response?.data?.message,
                icon: "error",
                iconColor: "#CA0505",
                confirmButtonColor: "#CA0505",
                confirmButtonText: "D'accord",
                timer: 5000,
            }).then(() => {
                dispatch(errorMessage(""));
            })
        }
    }, [dispatch, success, errors]);

    return (
        <>
            <div className="container mx-auto text-center py-4 mb-10 lg:flex lg:w-full">
                <div className="bg-gray-100 p-4 pt-8 lg:w-1/2 lg:mr-6">
                    <div className="text-left">
                        <h3 className="pb-2">Des questions sur nos services?</h3>
                        <h3>Besoin d'un renseignement?</h3>
                    </div>
                    <div className="pt-4">
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                phone: '',
                                message: '',
                            }}
                            validationSchema={ContactSchema}
                            onSubmit={(values, { resetForm }) => {
                                console.log(values);
                                let contactData = {
                                    firstName: values?.firstName,
                                    lastName: values?.lastName,
                                    email: values?.email,
                                    phone: values?.phone,
                                    descrtiption: values?.message
                                }

                                dispatch(ContactUsForm({ contactData }))
                                resetForm();
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className="lg:flex lg:flex-wrap lg:w-full">
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pr-4'>
                                        <label htmlFor="firstName" className='text-left'>Nom *</label>
                                        <Field name="firstName" className='h-10 border-b-2 border-gray-400 bg-transparent outline-none focus:border-gray-700' />
                                        {errors.firstName && touched.firstName ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.firstName}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pl-4'>
                                        <label htmlFor="lastName" className='text-left'>Prénom</label>
                                        <Field name="lastName" className='h-10 border-b-2 border-gray-400 bg-transparent outline-none focus:border-gray-700' />
                                        {errors.lastName && touched.lastName ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.lastName}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pr-4'>
                                        <label htmlFor="email" className='text-left'>Email *</label>
                                        <Field name="email" type="email" className='h-10 border-0 border-b-2 border-gray-400 bg-transparent outline-none focus:ring-transparent focus:border-gray-700' />
                                        {errors.email && touched.email ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-1/2 lg:pl-4'>
                                        <label htmlFor="phone" className='text-left'>Téléphone *</label>
                                        <Field name="phone" className='h-10 border-0 border-b-2 border-gray-400 bg-transparent outline-none focus:ring-transparent focus:border-gray-700' />
                                        {errors.phone && touched.phone ? (
                                            <div className="text-red-500 flex text-left gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.phone}</div>
                                        ) : null}
                                    </div>
                                    <div className='flex flex-col pt-4 lg:w-full'>
                                        <label htmlFor="message" className='text-left'>Message</label>
                                        <Field name="message" as="textarea" className='h-24 border-0 border-b-2 border-gray-400 bg-transparent outline-none focus:ring-transparent focus:border-gray-700' />
                                        {errors.message && touched.message ? (
                                            <div className="text-red-500 flex items-center gap-1 py-2"><span><PiWarningCircleBold className="w-5 h-5" /></span>{errors.message}</div>
                                        ) : null}
                                    </div>
                                    <button type="submit" className="text-black font-bold border_black p-3 w-full mt-6 sm:w-64 lg:w-full mb-5 lg:mb-3 search-btn">
                                        {
                                            Loading ?
                                                <Spinner />
                                                : "Envoyer"
                                        }
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="bg-gray-100 lg:bg-transparent p-4 lg:p-0 pb-8 lg:w-1/2 lg:ml-6">
                    <div className="mapouter h-96 lg:h-full" style={mapStyle}>
                        <div className="gmap_canvas h-96 lg:h-full" style={canvasStyle}>
                            <iframe
                                className="gmap_iframe"
                                width="100%"
                                height="100%"
                                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=53 Rue Carnot, 92100 Boulogne-Billancourt, France&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            ></iframe>
                            <a href="https://sprunkiplay.com/">Sprunki Game</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactForm;