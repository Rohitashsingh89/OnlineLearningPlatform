const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;

async function generateCertificate(userData) {
    // Load the modified certificate template copy
    const templatePdfBytes = await fs.readFile('./certificateTemplate.pdf');
    const pdfDoc = await PDFDocument.load(templatePdfBytes);
  
    // Get the first page of the template
    const page = pdfDoc.getPages()[0];
    
    // Calculate the center of the page
    const pageWidth = page.getSize().width;
    const centerX = pageWidth / 2;

    // Customize certificate content
    const { name, course, completionDate } = userData;
    
    // Calculate the width of the text
    const nameWidth = name.length * 15; // Adjust the value as needed
    const courseWidth = course.length * 10; // Adjust the value as needed
    
    // Calculate the starting x coordinate for center alignment and expansion
    const nameStartX = centerX - (nameWidth / 2);
    const courseStartX = centerX - (courseWidth / 2);

    // Calculate the actual x coordinates to ensure text doesn't go beyond page boundaries
    const nameX = Math.max(nameStartX, 0); // Ensure the text doesn't go off the left edge
    const courseX = Math.max(courseStartX, 0); // Ensure the text doesn't go off the left edge
    
    page.drawText(name, { x: nameX, y: 400, size: 30 });
    page.drawText(course, { x: courseX, y: 320, size: 20 });
    page.drawText(completionDate, { x: 290, y: 60, size: 20 });
  
    // Save the PDF to a buffer
    const pdfBytes = await pdfDoc.save();
  
    // Generate a timestamp-friendly filename
    const formattedDate = new Date().toISOString().replace(/:/g, '-');
    const fileName = `certificate_${formattedDate}.pdf`;
    
    // Save the PDF buffer to a file
    await fs.writeFile('./generatedCertificates/' + fileName, pdfBytes);
}

module.exports = generateCertificate;





// const { PDFDocument } = require('pdf-lib');
// const fs = require('fs').promises;

// async function generateCertificate(userData) {
//     // Load the modified certificate template copy
//     const templatePdfBytes = await fs.readFile('./certificateTemplate.pdf');
//     const pdfDoc = await PDFDocument.load(templatePdfBytes);
  
//     // Get the first page of the template
//     const page = pdfDoc.getPages()[0];
  
//     // Customize certificate content
//     const { name, course, completionDate } = userData;
//     page.drawText(name, { x: 200, y: 400, size: 30 });
//     page.drawText(course, { x: 200, y: 320, size: 20 });
//     page.drawText(completionDate, { x: 290, y: 60, size: 20 });
  
//     // Save the PDF to a buffer
//     const pdfBytes = await pdfDoc.save();
  
//     // Generate a timestamp-friendly filename
//     const formattedDate = new Date().toISOString().replace(/:/g, '-');
//     const fileName = `certificate_${formattedDate}.pdf`;
    
//     // Save the PDF buffer to a file
//     await fs.writeFile('./generatedCertificates/' + fileName, pdfBytes);
// }

// module.exports = generateCertificate;
