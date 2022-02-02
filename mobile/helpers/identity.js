const { GET, POST } = require("./request");

export const isExistUser = async (phoneNumber) => {
    const editPhone = phoneNumber.replace("+", "%2B");
    const url = `https://bisikletimolsun.xyz/api/user/identity/query?phone=${editPhone}`
    const response = await GET(url);
    const { success } = response;

    if (success) {
        const { tc } = response.data[0];
        return tc;
    }
    return false;
}

export const identityInfoSave = async (data) => {
    const url = `https://bisikletimolsun.xyz/api/user/identity/create`;
    return await POST(url, data);
}

export const getIdentityStatus = async (tc) => {
    const url = `https://bisikletimolsun.xyz/api/user/identity/${tc}`;
    const response = await GET(url);
    const { success } = response;

    if (success) {
        const { status } = response.data;
        return status;
    }
    return false;
}