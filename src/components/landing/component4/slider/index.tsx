'use client'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { 
    Navigation, 
    Pagination, 
    Scrollbar, 
    A11y, 
    EffectFade,
    Autoplay, 
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './index.module.css';
import { SliderTemplate } from '../../reviews';
import SwiperNavButtons from '../../reviews/sliderButtons';
import Image, { StaticImageData } from 'next/image';
import studentsMatric1 from '@/images/students-matric7-crop.jpg';
import image1 from '@/images/slider/school/image-1.jpg';
import image2 from '@/images/slider/school/image-2.jpg';
import image3 from '@/images/slider/school/image-3.jpg';
import image4 from '@/images/slider/school/image-4.jpg';
import image5 from '@/images/slider/school/image-5.jpg';

const schoolImages = [
    {
        id:"1",
        description: ``,
        imageSrc: image5,
    },
    {
        id:"2",
        description: `Front view of Kumase College of Health Technology`,
        imageSrc: image2,
    },
    {
        id:"3",
        description: `Student Hostel of Kumase College of Health Technology`,
        imageSrc: image3,
    },
    {
        id:"4",
        description: `The School Clinic of Kumase College of Health Technology`,
        imageSrc: image4,
    },
    {
        id:"5",
        description: ``,
        imageSrc: image1,
    },
    // {
    //     id:"6",
    //     description: `Students at the 2021/2022 matriculation event`,
    //     imageSrc: studentsMatric1,
    // }
]
export default function Slider() {
    const [sliderChange, setSliderChange] = useState(0);
    
    return (
        <SliderTemplate>
            <Swiper
            className={styles.slider}
            modules={[Navigation, Scrollbar, A11y, EffectFade, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={15}
            pagination={{ clickable: true }}
            onSlideChange={() => setSliderChange(prevState => {
                return prevState === 10 ? 0 : prevState + 1
            })}
            >
            <div className={styles.sliderButtons}>
                <SwiperNavButtons sliderChange={sliderChange}/>
            </div>
            {schoolImages.map(({id, ...rest}, i) =>
                <SwiperSlide key={id ?? i} virtualIndex={Number(id) ?? i}>
                    <SchoolImage {...rest}/>
                </SwiperSlide> 
            )}
            </Swiper>
        </SliderTemplate>
    )
}


interface SchoolImageProps {
    description: string
    imageSrc: StaticImageData | string 
}

function SchoolImage({
    description,
    imageSrc 
}: SchoolImageProps) {
    return (
        <div className={styles.imageWrapper}>
            <Image src={imageSrc} alt={description}/>
            {description && (
                <caption className={styles.imageCaption}>
                {description}
                </caption>
            )} 
        </div>
    )
}


function SliderImage({
    description,
    imageSrc 
}: SchoolImageProps) {
    return (
        <div className={styles.imageWrapper}>
            <Image src={imageSrc} alt={description}/>
            <caption className={styles.imageCaption}>
                {description}
            </caption>
        </div>
    )
}