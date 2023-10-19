import BreedData from '@/models/BreedData';

type ApiImageData = {
    id: string, 
    url: string, 
    breeds: BreedData[]
}

export default ApiImageData;