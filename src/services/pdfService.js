// src/services/pdfService.js
import jsPDF from "jspdf";

export const generatePdf = (consultationData) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Doctor Consultation Summary", 20, 20);

  doc.setFontSize(12);
  doc.text(`Doctor: ${consultationData.doctor}`, 20, 40);
  doc.text(`Patient: ${consultationData.patient?.displayName || "N/A"}`, 20, 50);
  doc.text(`Email: ${consultationData.patient?.email || "N/A"}`, 20, 60);
  doc.text(`Consultation Type: ${consultationData.type}`, 20, 70);
  doc.text(`Symptoms: ${consultationData.symptoms}`, 20, 80);
  doc.text(`Preferred Time: ${consultationData.scheduledTime}`, 20, 90);
  doc.text(`Booking Date: ${consultationData.bookingDate}`, 20, 100);

  doc.save("consultation_summary.pdf");
};
