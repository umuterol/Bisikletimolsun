import { GET, POST } from './request'

export const getMyDrive = async (tc) => {
    const url = `https://www.bisikletimolsun.xyz/api/drive/query?tc=${tc}&status=notactive`;
    const response = await GET(url);
    const { success } = response;

    if (success)
        return response.data.reverse();

    return false;
}

export const getActiveMyDrive = async (tc) => {
    const url = `https://www.bisikletimolsun.xyz/api/drive/my-active/${tc}`;
    const response = await GET(url);
    const { success } = response;

    if (success)
        return response.data;

    return false;
}

export const finishMyDrive = async (tc) => {
    const url = `https://www.bisikletimolsun.xyz/api/drive/transactions/create`;
    const data = {
        tc,
        transaction_type: 'finished',
    }
    const response = await POST(url, data);
    const { success } = response;

    return success;
}

export const startMyDrive = async (tc, bicycle_id) => {
    const url = `https://www.bisikletimolsun.xyz/api/drive/transactions/create`;
    const data = {
        tc,
        transaction_type: 'started',
        bicycle_id,
    }
    const response = await POST(url, data);
    const { success, message } = response;

    if (message === "no driving allowed") {
        return message;
    }
    return success;
}

export const getMyDriveRoute = async (driveId) => {
    const url = `https://www.bisikletimolsun.xyz/api/drive/route/${driveId}`;
    const response = await GET(url);
    const { success } = response;

    if (success) {
        return response.data;
    }
    return false;
}