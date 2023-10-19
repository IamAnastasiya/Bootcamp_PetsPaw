const API_KEY = "live_cJJq1XRJPGRYOvxTVW06i3PHF4q1JaUX38KGzQvFtLdSRg9nOTnyUJJUUUNT0AUX";
const BASE_URL = "https://api.thecatapi.com/v1/";
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'x-api-key': API_KEY
}

export const getAllFavorites = async (userId: string) => {
    const data = await fetch(`${BASE_URL}favourites?sub_id=${userId}`, {
        headers: headers
    });
    return await data.json();
}

export const addToApiFavorites = async (imageData: {image_id: string, sub_id: string}) => {
    let newFavourite = await fetch(`${BASE_URL}favourites`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(imageData)
    });
    return await newFavourite.json();          
}

export const deleteFromApiFavorites = async (favId: number) => {
    const data = await fetch(`https://api.thecatapi.com/v1/favourites/${favId}`, {
        method: 'DELETE',
        headers: headers
    });
    return data;         
}
