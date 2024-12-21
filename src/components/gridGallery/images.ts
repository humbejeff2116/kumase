import { Image } from "react-grid-gallery";
import image1 from '@/images/slider/students/image1.jpg'
import image2 from '@/images/slider/students/image2.jpg'
import image3 from '@/images/slider/students/image3.jpg'
import image4 from '@/images/slider/students/image4.jpg'
import image5 from '@/images/slider/students/image5.jpg'
import image6 from '@/images/slider/students/image6.jpg'
import image7 from '@/images/slider/students/image7.jpg'
import image8 from '@/images/slider/students/image8.jpg'
import image9 from '@/images/slider/students/image9.jpg'
import image10 from '@/images/slider/students/students-matric7-crop.jpg'

export interface CustomImage extends Image {
  original: string
}

const imageSize = {
  sizOne: {
    width: 340,
    height: 213,
  },
  sizTwo: {
    width: 330,
    height: 180,
  },
  sizThree: {
    width: 330,
    height: 180,
  },
}

export const images: Array<CustomImage> = [
  {
    src: image1.src,
    original: image1.src,
    ...imageSize.sizOne,
    tags: [{value: "Students", title: "Studnts"}],
    caption: "Students",
  },
  {
    src: image6.src,
    original: image6.src,
    ...imageSize.sizOne,
    caption: "Students with Provost",
  },
  {
    src: image8.src,
    original: image8.src,
    ...imageSize.sizOne,
    caption: "Students",
  },
  {
    src: image2.src,
    original: image2.src,
    ...imageSize.sizOne,
    caption: "Students",
  },
  {
    src: image3.src,
    original: image3.src,
    ...imageSize.sizOne,
    caption: "Students",
  },
  {
    src: image9.src,
    original: image9.src,
    ...imageSize.sizOne,
    tags: [
      {value: "Students", title: "Students"},
      {value: "Matric", title: "Matric"}
    ],
    caption: "Matriculating students with Admin staff",
  },
  {
    src: image4.src,
    original: image4.src,
    ...imageSize.sizOne,
    caption: "Students with a staff",
  },
  {
    src: image10.src,
    original: image4.src,
    ...imageSize.sizOne,
    tags: [{ value: "Matric", title: "Matric" }],
    caption: "Matric event at school",
  }
]