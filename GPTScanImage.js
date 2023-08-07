const axios = require('axios');

const subscriptionKey = '9de5b66f7abe40caa27deec1e0dcb44d';
const endpoint = 'https://pnp-hackthon-core-team-compute-vision.cognitiveservices.azure.com/';
//const imageUrl = 'https://docs.microsoft.com/azure/includes/media/shared-image-galleries/shared-image-gallery.png'; 
// For local images, you can use base64 encoded image data instead.
const imageUrl = 'https://raw.githubusercontent.com/Jegatheesh-GV/LivAdvisor/main/images/Sowmya_Medicine.jpeg'; // For local images, you can use base64 encoded image data instead.


async function extractTextFromImage() {
  try {
    const url = `${endpoint}/vision/v3.2/ocr?language=en`;
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    };

    const requestBody = {
      url: imageUrl,
    };

    const response = await axios.post(url, requestBody, { headers });
    const extractedText = parseOCRResponse(response.data);
    console.log('Extracted Text:', extractedText);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function parseOCRResponse(responseData) {
  let extractedText = '';
  if (responseData && responseData.regions) {
    responseData.regions.forEach((region) => {
      region.lines.forEach((line) => {
        line.words.forEach((word) => {
          extractedText += word.text + ' ';
        });
        extractedText += '\n';
      });
      extractedText += '\n';
    });
  }
  return extractedText;
}

extractTextFromImage();
