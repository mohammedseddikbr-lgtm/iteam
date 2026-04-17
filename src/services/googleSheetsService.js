// src/services/googleSheetsService.js

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby2-u75b6v_1u4L0mpKfykCGkFkdNMGDZ0xjrXzplB6n7Hl8biaUn0-9R6MsWM7btxN/exec";

export const submitToGoogleSheets = async (formData) => {
  try {
    console.log("Sending to:", WEBHOOK_URL);
    console.log("Data:", formData);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // مهم لتجنب مشاكل CORS
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        phone: formData.phone || '',
        service: formData.service || '',
        message: formData.message,
        budget: formData.budget || '',
        status: 'new'
      }),
    });

    // مع mode: 'no-cors'، لا يمكن قراءة الرد
    return { success: true, message: 'Sent successfully' };
    
  } catch (error) {
    console.error('Error details:', error);
    throw new Error('Failed to send to Google Sheets');
  }
};