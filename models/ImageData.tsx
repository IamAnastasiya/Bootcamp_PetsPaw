type ImageData = {
    id?: number;
    image: {url: string}
    image_id: string;
    value?: 1 | -1;
    breeds?: {
        name: string,
        breedId?: string
    },
    isFav?: boolean
}

export default ImageData;