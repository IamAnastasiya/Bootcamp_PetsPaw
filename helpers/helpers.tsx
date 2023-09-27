export const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
}

export const capitalize = (str: string) => str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());