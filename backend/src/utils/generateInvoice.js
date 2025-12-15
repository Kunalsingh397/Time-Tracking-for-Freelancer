const PDFDocument = require('pdfkit');

module.exports = (invoice) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      doc.fontSize(20).text('Invoice', { align: 'center' });
      doc.moveDown();

      doc.fontSize(12).text(`Invoice ID: ${invoice._id}`);
      doc.text(`Issue Date: ${new Date(invoice.issueDate).toLocaleDateString()}`);
      if (invoice.dueDate) doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`);

      doc.moveDown();
      doc.text(`Client: ${invoice.client.name}`);
      if (invoice.project) doc.text(`Project: ${invoice.project.name}`);

      doc.moveDown();
      doc.text('Time Logs:', { underline: true });
      invoice.timeLogs.forEach((t) => {
        doc.text(`${new Date(t.date).toLocaleDateString()} — ${t.durationHours.toFixed(2)} hrs — ${t.notes || ''}`);
      });

      doc.moveDown();
      doc.text(`Hourly rate: $${invoice.hourlyRate.toFixed(2)}`);
      doc.text(`Total hours: ${invoice.totalHours.toFixed(2)}`);
      doc.text(`Total amount: $${invoice.totalAmount.toFixed(2)}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
