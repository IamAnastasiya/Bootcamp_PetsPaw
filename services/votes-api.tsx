const API_KEY = "live_cJJq1XRJPGRYOvxTVW06i3PHF4q1JaUX38KGzQvFtLdSRg9nOTnyUJJUUUNT0AUX";
const BASE_URL = "https://api.thecatapi.com/v1/";
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'x-api-key': API_KEY
}

export const getAllVotes = async (userId: string) => {
    const data = await fetch(`${BASE_URL}votes?api_key=${API_KEY}&sub_id=${userId}`);
    return await data.json();
}

export const getRandomImage = async () => {
    const data = await fetch(`${BASE_URL}images/search`);
    const json = await data.json();
    return json[0];
}

export const sendImageVote = async (imageData: {image_id: string, sub_id: string, value: number}) => {
    let response = await fetch(`${BASE_URL}votes`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(imageData)
    });
    await response.json();
}


