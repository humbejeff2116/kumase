'use client'
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Review from './review';
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
// import { Org } from '@/lib';
import SwiperNavButtons from './sliderButtons';

const org = {
    name: 'Kumase College of Health Technology'
}



const reviews = [
    {
        id:"1",
        name: "Maureen Usiagwu",
        school: `Kumase College of Health Technology, Markudi, Benue State.`,
        location: 'Earth', 
        imageSrc: "",
        review: `I would like to express my heart felt appreciation for my experience
         so far. Pursuing a career in CHEW has always been a challenging endeavor, 
         and ${org.name} have truly stood out in terms of dedication, communication, 
         curriculum, and skill development. 
        `
    },
    {
        id:"2",
        name: "Prince Million",
        school: "Kumase College of Health Technology, Markudi, Benue State.",
        location: 'Earth', 
        imageSrc: "",
        review: `Very wonderful experience in my program here at ${org.name} Challenging but
        well worth it. 
        `
    },
    {
        id:"3",
        name: "Reign-el Mukoro",
        school: "Kumase College of Health Technology, Markudi, Benue State.",
        location: 'Earth', 
        imageSrc: "",
        review: `I had a great experience with ${org.name}. The administration and clinical 
        instructors are very helpful and knowlegeable. Curriculum could be challenging
        but it's worth it. Highly recommend.
        `,
    }
]

export default function Reviews() {
    const [sliderChange, setSliderChange] = useState(0);

    return (
           <SliderTemplate>
                <Swiper
                // className={styles.mySwiper}
                modules={[Navigation, Scrollbar, A11y, EffectFade, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 7000 }}
                onSlideChange={() => setSliderChange(prevState => {
                    return prevState === 10 ? 0 : prevState + 1
                })}
                >
                <div className={styles.sliderButtons}>
                    <SwiperNavButtons sliderChange={sliderChange}/>
                </div>
                {reviews.map(({id, ...rest}, i) =>
                    <SwiperSlide key={id ?? i} virtualIndex={Number(id) ?? i}>
                        <Review {...rest}/>
                    </SwiperSlide> 
                )}
                </Swiper>
            </SliderTemplate>
    )
}


export function SliderTemplate({
    children
}: {children: React.ReactNode}) {
    const [showSlider, setShowLider] = useState(false);
    // const isMobile = useIsMobile();

    useEffect(() => {
        setShowLider(true);
    }, []);
    
    return (
            <div className={styles.container}>
            {showSlider && children}
            </div>
    )
}