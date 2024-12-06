const API_URL = process.env.EXPO_PUBLIC_API_URL

export const getPlaces = async (data) => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error ('Failed to post data')
        
    const result = await response.json();

    return result
}