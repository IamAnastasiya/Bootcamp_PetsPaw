const API_KEY = "live_cJJq1XRJPGRYOvxTVW06i3PHF4q1JaUX38KGzQvFtLdSRg9nOTnyUJJUUUNT0AUX";
const BASE_URL = "https://api.thecatapi.com/v1/";


export const sendNewImage = async (file: File, sub_id: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sub_id", sub_id || "");
    let response = await fetch(`${BASE_URL}images/upload`, {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY
        },
        body: formData
    });

    return response;
}




