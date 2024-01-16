import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzZWZiYTA4My1jZmNiLTRiZmYtYjc2Yy1hNTQ4MWFlM2JkMmIiLCJlbWFpbCI6InJ0b3JyZXpAdWNtLmVzIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjcxMGRlMzNlMDBmMTc3YmYxMGM3Iiwic2NvcGVkS2V5U2VjcmV0IjoiY2FhNzBhNGI2YjA1ZjM0MzAyMjgyMjgyYmM5NThiMDZhMWZmZTgwMzZiMjNiYzYzNjUxNDVjOWUyMDJkOWQ2NSIsImlhdCI6MTcwNTI0NTk4M30.uy5cMDuOGhwbTSFGY_D3nSCTWk-VHLlP0sLVutFRO9s";

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "src/utils/images/logo_ucm.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()