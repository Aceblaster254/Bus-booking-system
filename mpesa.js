//Access token
const axios = require('axios');
const consumerkey = 'consumer';
const consumerSecret = 'secret';

async function getAccessToken() {
    const auth = Buffer.from(`${consumerkey}:${consumerSecret}`).toString('base64');
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${auth}`
        } 
    });
    return response.data.access_token;
}
// Compare this snippet from Models/bus-model.js:
// const mongoose = require('mongoose');

//Payment request
async function makeMpesaPayment(phoneNumber, amount) {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        BusinessShortCode: '7708789',
        Password: 'password',
        Timestamp: '20201117101010',
        TransactionType: 'CustomerPayBillOnline',
        Amount: 'amount',
        PartyA: phoneNumber,
        PartyB: '7708789',
        PhoneNumber: phoneNumber,
        CallBackURL: 'https://mycallbackurl.com',
        AccountReference: 'BusBooking',
        TransactionDesc: 'Bus Booking Payment'},
        { 
        headers: { 
            Authorization: 'Bearer ${access_token}',}
        });
    return response.data;
}
module.exports = makeMpesaPayment;

//payment response
async function handleMpesaResponse() {
    try {
        const paymentResponse = await makeMpesaPayment('254712345678', 100);
        console.log('payment Response:', paymentResponse);
    }
    catch (error) {
        console.error('Payment Error:', error);
    }
}

handleMpesaResponse();
         








