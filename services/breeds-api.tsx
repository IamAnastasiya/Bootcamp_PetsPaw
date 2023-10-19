const API_KEY = "live_cJJq1XRJPGRYOvxTVW06i3PHF4q1JaUX38KGzQvFtLdSRg9nOTnyUJJUUUNT0AUX";
const BASE_URL = "https://api.thecatapi.com/v1/";
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'x-api-key': API_KEY
}

export const getImagesByBreed = async (breedId: string) => {
    const data = await fetch(`${BASE_URL}images/search?limit=5&breed_ids=${breedId}`);
    return await data.json();
}

export const getAllBreeds = async () => {
    const data = await fetch(`${BASE_URL}breeds`);
    return await data.json();
}

export const getImageDetails = async (id: string) => {
    const data = await fetch(`${BASE_URL}images/${id}`);
    return await data.json();
}

export const getSetOfImages = async (path: string) => {
    const data = await fetch(`${BASE_URL}${path}`, {
        headers: headers
    });
    return await data.json();
}


