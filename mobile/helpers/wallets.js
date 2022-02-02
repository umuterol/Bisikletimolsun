const { GET, POST } = require("./request");


export const getWallet = async (tc) => {
    const url = `https://bisikletimolsun.xyz/api/wallet/${tc}`;
    const response = await GET(url);
    const { success } = response;

    if (success)
        return response.data;
    return false;
}

export const addMoneyToWallet = async (tc, amount) => {
    const url = `https://bisikletimolsun.xyz/api/wallet/create`;
    const transaction_amount = parseFloat(amount);
    const data = {
        tc,
        transaction_amount,
        transaction_type: 'add',
    }
    const response = await POST(url, data);
    const { success } = response;

    return success;
}