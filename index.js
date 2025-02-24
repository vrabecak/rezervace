// Backend: Node.js + Express + MongoDB (Mongoose)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
});

const Booking = mongoose.model('Booking', BookingSchema);

// Konfigurace emailového účtu
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'your-email@gmail.com', pass: 'your-email-password' },
});

app.post('/book', async (req, res) => {
  const { name, email, date, time } = req.body;
  
  const booking = new Booking({ name, email, date, time });
  await booking.save();
  
  // Odeslání potvrzovacího emailu
  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Potvrzení rezervace',
    text: `Vaše rezervace na ${date} v ${time} byla úspěšně vytvořena.`,
  });

  res.json({ message: 'Rezervace vytvořena!' });
});

app.listen(5000, () => console.log('Server běží na portu 5000'));
