import { GET, POST_FORM_DATA } from './request'

export const getAllParkedBicyclesWithCoords = async () => {
    const url = `https://www.bisikletimolsun.xyz/api/bicycle/by-coords?status=parked`;
    const response = await GET(url);
    const { success } = response;

    if (success)
        return response.data;

    return [];
}


export const getAllMyBicycles = async (tc) => {
    const url = `https://www.bisikletimolsun.xyz/api/bicycle/query?owner=${tc}`;
    const response = await GET(url);
    const { success } = response;


    if (success)
        return response.data;

    return false;
}

export const createBicycleMeeting = async (formData) => {
    const url = `https://www.bisikletimolsun.xyz/api/bicycle/meeting`;
    const response = await POST_FORM_DATA(url, formData);
    const { success } = response;

    if (success)
        return response.data;

    return false;
}