'use client'
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import styles from './index.module.css';


interface GalleryImage {
    id: string
    name: string
    src: StaticImageData | string
}

const images: Array<GalleryImage> = [];

export function Gallery() {
    const [data, setData] = useState(images);
    const [activeId, setActiveId] = useState ('0');
    const [viewImage, setViewImage] = useState(false);

    useEffect(() => {
        loadData('https://s3-us-west-2.amazonaws.com/s.cdpn.io/735173/rpg-2-data.json')
        return () => {
            // loadData.abort()
        }
    }, [])


	const loadData = async (url: string) => {
		return fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => setData([...json.gallery]))
        .catch((err) => {
            console.log(err.message)
            try {
                const xhr = new XMLHttpRequest()
                xhr.open('GET', url)
                xhr.responseType = 'json'

                xhr.onload = () => {
                    let json = xhr.response
                    setData([...json.gallery])
                }

                xhr.onerror = () => {
                    throw new Error('XMLHttpRequest Failed...')
                }

                xhr.send()
            } catch (err) {
                // console.log(err.message)
            }
        })
	}

	const openImageView = (id: string) => {
        setActiveId(id);
        setViewImage(true);
	}

	const closeImageView = () => {
		setViewImage(false);
	}

    const getImage = (id: string) => {
        return data.filter(image => image.id === id)[0];
    }

    return (
        <div className={styles.wrapper}>
        {viewImage ? (
            <ImageView {...getImage(activeId)}
            closeImageView={closeImageView} 
            />
        ) : (
            <GalleryImagesWrapper>
            {data.map((image, i) => 
                <Tile key={image.id || i}
                {...image}
                openImageView={openImageView} 
                />
            )}
            </GalleryImagesWrapper>
        )}
        </div>
    )
}


interface ImageViewProps {
    src: string | StaticImageData
    name: string
    // desc: string
    // tags: string
    closeImageView: () => void
}

function ImageView({
    src,
    name,
    // desc,
    // tags,
    closeImageView
}: ImageViewProps) {
    return (
        <div className={`${styles.imageviewWrapper} ${styles.fadeIn}`}>
            <div className={styles.imageview}>
                <GalleryImage imageClass={styles.imageview}
                src={src}
                name={name} 
                />
                <div className={styles.imageviewInfo}>
                    <button 
                    className={styles.imageviewClose} 
                    onClick={closeImageView}
                    >
                        x
                    </button>
                    <h2>{name}</h2>
                    {/* <p>{desc}</p> */}
                    {/* <h3>Tags</h3>
                    <ul>
                        {tags.map(tag => <li>{tag}</li>)}
                    </ul> */}
                </div>
            </div>
        </div>
    )
}

function GalleryImagesWrapper({
    children
}: {children: React.ReactNode}) {
    return (
        <div className={`${styles.gallery} ${styles.fadeIn}`}>
            {children}
        </div>
    )
}

interface TileProps {
    name: string
    src: string | StaticImageData
    openImageView: (id: string) => void
    id: string
}

function Tile({
    name,
    src,
    openImageView,
    id
}: TileProps) {
    return (
        <div className={styles.galleryTile} onClick={(e)=> openImageView(id)}>
            <div className={styles.pictureInfo}>
                <h2>{name}</h2>
            </div>
            <GalleryImage
            imageClass={styles.tileImage}
            src={src} 
            name={name} 
            />
        </div>
    )
}

interface GalleryImageProps {
    src: string | StaticImageData
    name: string
    imageClass: string
}

function GalleryImage({
    src,
    name,
    imageClass
}: GalleryImageProps) {
    return (
        <Image
        className={imageClass}
        src={src} 
        alt={name} 
        />
    )
}