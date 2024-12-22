const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
// import './image140.webp'

// Middleware
app.use(cors());
app.use(express.json()); // To handle JSON data from React frontend
app.use(bodyParser.json());

let otpStorage = {}; // Store OTPs temporarily (for demo purposes, use a database in production)

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Create a schema and model for the form data
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle form submissions
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  const newContact = new Contact({ firstName, lastName, email, message });

  try {
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save contact' });
  }
});

// mongoose.connect('mongodb://localhost:27017/restaurantOrders', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// Order Schema and Model
const orderSchema = new mongoose.Schema({
  Braised_Turtle: { type: Number, default: 0 },
  Cheesy_Tokbokki: { type: Number, default: 0 },
  Chicken_Skewers: { type: Number, default: 0 },
  Fried_Quail_Eggs: { type: Number, default: 0 },
  Gyeran_Jjim: { type: Number, default: 0 },
  Steak_with_Herbes: { type: Number, default: 0 },
  Braised_Turtle1: { type: Number, default: 0 },
  Cheesy_Tokbokki1: { type: Number, default: 0 },
  orderDate: { type: Date, default: Date.now },
  firstname: String,
  lastname: String,
  email2: String,
  phone: String,
  address: String,
  totalAmount: Number,
  status: String,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// API Endpoint to Save Order Data
app.post('/api/save-order', async (req, res) => {
  const orderData = req.body;

  try {
    const newOrder = new Order(orderData); // Create a new order instance
    const savedOrder = await newOrder.save(); // Save to MongoDB
    res.status(200).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Failed to save order' });
  }
});

// mongoose.connect ('mongodb://localhost:27017/myorderdata', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// .then (() => console.log ('Connected to Mongodb'))
// .catch ((err) => console.log ('Mongodb connection error', err))

// const contactaSchema = new mongoose.Schema ({
//   Braised_Turtle: String,
//   Cheesy_Tokbokki: String,
//   Chicken_Skewers: String,
//   Fried_Quail_Eggs: String,
//   Gyeran_Jjim: String,
//   Steak_with_Herbes: String,
//   Braised_Turtle1: String,
//   Cheesy_Tokbokki1: String,
// })

// const Contacta = mongoose.model ('Contacta', contactaSchema)

app.get('/api/orders', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const orders = await Order.find({ email2: email }).sort({ orderDate: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  otpStorage[email] = otp;

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'princekhandelwal412@gmail.com', // Replace with your email
          pass: 'moln fpte njcl pdbm', // Replace with your email's app-specific password
      },
  });

  const mailOptions = {
      from: 'princekhandelwal412@gmail.com',
      to: email,
      subject: 'Your OTP for Email Verification',
      html: `<p>Welcome to the Great Indian Restaurant</p>
      <h2>Your OTP is: ${otp}</h2>
      <p>"Cooked with Love, Served with Joy."</p>
      <img style={{height: '50px', width: '50px'}} src="https://i.postimg.cc/264fjvt4/image140.webp" alt="logo">
      <p>for more information <a href="/">www.thegreatindianrestaurant.com</a>`
      ,
  };

  try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStorage[email] && otpStorage[email] === parseInt(otp)) {
      delete otpStorage[email]; // Remove OTP after verification
      return res.json({ success: true, message: 'OTP verified successfully' });
  }
  res.status(400).json({ success: false, message: 'Invalid OTP' });
});

app.post ('/send-info', async (req, res) => {
  const {email, message} = req.body;
  if (!email || !message)  {
    return res.status (400).json ({success: false, message: 'Email and message is required'});
  }
  const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
      user: 'princekhandelwal412@gmail.com',
      pass: 'moln fpte njcl pdbm',
    },
  });

  const mailOptions = {
    from: 'princekhandelwal412@gmail.com',
    to: email,
    subject: 'order details',
    html: `<p>Welcome to the Great Indian Restaurant</p>
    <p>"Cooked with Love, Served with Joy."</p>
    <h2>Your Order details</h2>
    <p>${message.replace (/\n/g, '<br>')}</p>
    <img src="https://i.postimg.cc/264fjvt4/image140.webp" alt="logo">
    <p>for more information <a href="/">www.thegreatindianrestaurant.com</a>`
    ,
  };

  try {
    await transporter.sendMail (mailOptions);
    res.json ({success: true, message: 'Order details sent to email'})
  }

  catch (error) {
    console.error (error);
    res.status (500).json ({success: false, message: 'failed to send message'});
  }
})

app.post ('/send-order', async (req, res) => {
  const {item1, item2, item3, item4, item5, item6, item7, item8, total, firstname, lastname, email, phone, address, totalAmount} = req.body;
  if (!email || !item1 || !item2 || !item3 || !item4 || !item5 || !item6 || !item7 || !item8)  {
    return res.status (400).json ({success: false, message: 'Email and order is required'});
  }
  const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
      user: 'princekhandelwal412@gmail.com',
      pass: 'moln fpte njcl pdbm',
    },
  });

  const mailOptions = {
    from: 'princekhandelwal412@gmail.com',
    to: email,
    subject: 'order details',
    html: `<p>Welcome to the Great Indian Restaurant</p>
    <p>"Cooked with Love, Served with Joy."</p>
    <h2>Your Order details</h2>
    <p>Hi ${firstname.replace (/\n/g, '<br>')}<p>
    <p>Braised Turtle : ${item1.replace (/\n/g, '<br>')}<p>
    <p>Cheesy Tokbokki : ${item2.replace (/\n/g, '<br>')}<p>
    <p>Chicken Skewers : ${item3.replace (/\n/g, '<br>')}<p>
    <p>Fried Quail Eggs : ${item4.replace (/\n/g, '<br>')}<p>
    <p>Gyeran Jjim : ${item5.replace (/\n/g, '<br>')}<p>
    <p>Steak with Herbes : ${item6.replace (/\n/g, '<br>')}<p>
    <p>Braised Turtle1 : ${item7.replace (/\n/g, '<br>')}<p>
    <p>Cheesy Tokbokki1 : ${item8.replace (/\n/g, '<br>')}<p>
    <h4>total Bill :$${total}</h4>
    <span>Your Delivery address is :- <h4>${address}</h4></span>
    <p>if you what to change address then kindly email us<p>
    <img src="https://i.postimg.cc/264fjvt4/image140.webp" alt="logo">
    <p>for more information <a href="/">www.thegreatindianrestaurant.com</a>`
  };

  try {
    await transporter.sendMail (mailOptions);
    res.json ({success: true, message: 'Order details sent to email'})
  }

  catch (error) {
    console.error (error);
    res.status (500).json ({success: false, message: 'failed to send message'});
  }
})

app.post ("/send-order-otp", async (req, res) => {
  const {email} = req.body;
  if (!email) {
     return res.status (400).json ({success: false, message: "email is required"})
  }

  // const orders = await Order.find ({email2: email});

  // if (orders.length === 0) {
  //   alert ('No Order is found');
  //   return;
  // }

  const otp = Math.floor (100000 + Math.random () * 900000);
  otpStorage[email] = otp;

  const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
      user: 'princekhandelwal412@gmail.com',
      pass: 'moln fpte njcl pdbm',
    },
  })

  const mailOptions = {
    from: 'princekhandelwal412@gmail.com',
    to: email,
    subject: 'OTP for Previous Orders',
    html: `<p>Welcome to The Great Indian Restaurant</p>
    <h2>Your OTP is: ${otp}</h2>
    <p>"Cooked with Love, Served with Joy."</p>
    <img src="https://i.postimg.cc/264fjvt4/image140.webp" alt="logo">
    <p>for more information <a href="/"www.thegreatindianrestaurant.com</a>`
    ,
  };

  try {
    await transporter.sendMail (mailOptions);
    res.json ({success: true, message: 'OTP sent successfully'});
  }

  catch (error) {
    console.error (error);
    res.status (500).json ({success: false, message: 'falied to send otp'});
  }
});

app.post ('/verify-order-otp', (req, res) => {
  const {email, otp} = req.body;
  if (otpStorage[email] && otpStorage[email] === parseInt (otp, 10)) {
    delete otpStorage[email];
    return res.json ({success: true, message: "OTP verification successful"});
  }

  res.status (400).json ({success: false, message: 'Invalid OTP'});
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
