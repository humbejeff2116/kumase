import { useState } from "react";
import { Gallery as GridGallery } from "react-grid-gallery";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { images, CustomImage } from "./images";
import styles from './index.module.css';

const slides = images.map(({ original, width, height }) => ({
    src: original,
    width,
    height,
}));

export default function Gallery() {
  const [index, setIndex] = useState(-1);

    const handleClick = (index: number, item: CustomImage) => {
        setIndex(index)
    }

    return (
        <div className={styles.gridWrapper}>
            <GridGallery
            images={images}
            onClick={handleClick}
            enableImageSelection={false}
            />
            <Lightbox
            slides={slides}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            />
        </div>
    )
}