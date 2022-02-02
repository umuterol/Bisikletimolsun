export const POST = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}

export const GET = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}

export const POST_FORM_DATA = async (url, formData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
        return await response.json();
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}