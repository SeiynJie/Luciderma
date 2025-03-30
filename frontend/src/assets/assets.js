import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import CosmeticDermatologist from './Cosmetic_Dermatologist.svg'
import Aesthetician from './Aesthetician.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'Therapist',
        image: General_physician
    },
    {
        speciality: 'Cosmetic Dermatologist',
        image: CosmeticDermatologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatrician',
        image: Pediatricians
    },
    {
        speciality: 'Aesthetician',
        image: Aesthetician
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'Therapist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Richard James is a compassionate therapist known for his unique mindfulness techniques and personalized therapy sessions that help patients overcome emotional challenges.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Larson',
        image: doc2,
        speciality: 'Cosmetic Dermatologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily Larson specializes in cosmetic dermatology, offering innovative skin treatments and aesthetic procedures to rejuvenate and enhance natural beauty.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Raj Abdullah',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Raj Abdullah is a dedicated dermatologist with a keen eye for skin health, providing advanced treatments for various skin conditions.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christopher Lee is a caring pediatrician who excels in child healthcare, ensuring a nurturing environment for his young patients.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Jennifer Garcia',
        image: doc5,
        speciality: 'Aesthetician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia, an experienced aesthetician, brings a creative approach to skincare, blending science with art to create personalized beauty regimens.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrew Williams',
        image: doc6,
        speciality: 'Therapist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Andrew Williams is a trusted therapist with expertise in cognitive behavioral therapy, helping patients navigate stress and anxiety with tailored strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Christopher Davis',
        image: doc7,
        speciality: 'Cosmetic Dermatologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Christopher Davis offers state-of-the-art cosmetic dermatology services, merging medical precision with artistic flair to enhance skin aesthetics.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Timothy White',
        image: doc8,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Timothy White is a skilled dermatologist whose innovative treatments ensure healthy and radiant skin for all his patients.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Ava Mitchell',
        image: doc9,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Ava Mitchell is a devoted pediatrician known for her gentle care and ability to connect with children during routine check-ups and treatments.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Jeffrey King',
        image: doc10,
        speciality: 'Aesthetician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Jeffrey King is a creative aesthetician who focuses on non-invasive beauty enhancements, providing customized skincare solutions that bring out a natural glow.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Zoe Kelly',
        image: doc11,
        speciality: 'Therapist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly is a dedicated therapist specializing in stress management and emotional wellness, fostering a supportive space for mental healing.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patrick Harris',
        image: doc12,
        speciality: 'Cosmetic Dermatologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Patrick Harris is an innovative cosmetic dermatologist committed to transforming skin health through advanced, tailored treatments.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Chloe Evans',
        image: doc13,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Chloe Evans is a meticulous dermatologist who combines modern technology with expert care to treat a variety of skin conditions effectively.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ryan Martinez',
        image: doc14,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez is a friendly pediatrician with a passion for child wellness, known for his engaging and comforting approach to young patients.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Amelia Hill',
        image: doc15,
        speciality: 'Aesthetician',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Amelia Hill is a seasoned aesthetician dedicated to enhancing natural beauty through personalized skincare and rejuvenation therapies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]
