require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Groq = require('groq-sdk');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Industry Databases Connections
const techIndustryDb = mongoose.createConnection('mongodb://localhost:27017/tech-industry', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const constructionIndustryDb = mongoose.createConnection('mongodb://localhost:27017/construction', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const healthcareIndustryDb = mongoose.createConnection('mongodb://localhost:27017/healthcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fireserviceIndustryDb = mongoose.createConnection('mongodb://localhost:27017/fireservice', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['todo', 'drafting', 'inReview', 'done'],
    default: 'todo',
  },
  assignedTo: String,
  createdAt: { type: Date, default: Date.now },
  employeeName: String,
  employeeEmail: String,
  taskName: String,
  dueDate: Date,
  todayDate: Date,
  userId: String,
});

// Industry Models
const TechTask = techIndustryDb.model('TechTask', taskSchema, 'tasks');
const ConstructionTask = constructionIndustryDb.model('ConstructionTask', taskSchema);
const HealthTask = healthcareIndustryDb.model('HealthTask', taskSchema);
const FireServiceTask = fireserviceIndustryDb.model('FireServiceTask', taskSchema);

// Dynamic User Database Registration
app.post('/register-user', async (req, res) => {
  const { email, password, role } = req.body;
  const dbName = `db_${email.replace(/[@.]/g, '_')}`; // Create a unique database name

  try {
    // Log database creation attempt
    console.log(`Creating new database for user ${email} with dbName: ${dbName}`);

    // Create a new connection for the user's database
    const newDbConnection = mongoose.createConnection(`mongodb://localhost:27017/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Define a model for tasks in this new user database
    const UserTask = newDbConnection.model('UserTask', taskSchema, 'tasks');

    console.log(`Database ${dbName} created successfully.`);
    res.json({ success: true, dbName });
  } catch (error) {
    console.error('Error creating new database:', error.message, error.stack);
    res.status(500).json({ success: false, error: 'Error creating new database.' });
  }
});


// Industry Endpoints
app.get('/tech-tasks/:userId', async (req, res) => {
  const tasks = await TechTask.find({ userId: req.params.userId });
  res.json(tasks);
});

app.post('/tech-tasks', async (req, res) => {
  const task = new TechTask(req.body);
  await task.save();
  res.json(task);
});

app.put('/tech-tasks/:id', async (req, res) => {
  const task = await TechTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete('/tech-tasks/:id', async (req, res) => {
  await TechTask.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Construction Endpoints
app.get('/construction/:userId', async (req, res) => {
  const tasks = await ConstructionTask.find({ userId: req.params.userId });
  res.json(tasks);
});

app.post('/construction', async (req, res) => {
  const task = new ConstructionTask(req.body);
  await task.save();
  res.json(task);
});

app.put('/construction/:id', async (req, res) => {
  const task = await ConstructionTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete('/construction/:id', async (req, res) => {
  await ConstructionTask.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Healthcare Endpoints
app.get('/healthcare/:userId', async (req, res) => {
  const tasks = await HealthTask.find({ userId: req.params.userId });
  res.json(tasks);
});

app.post('/healthcare', async (req, res) => {
  const task = new HealthTask(req.body);
  await task.save();
  res.json(task);
});

app.put('/healthcare/:id', async (req, res) => {
  const task = await HealthTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete('/healthcare/:id', async (req, res) => {
  await HealthTask.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Fire Service Endpoints
app.get('/fireservice/:userId', async (req, res) => {
  const tasks = await FireServiceTask.find({ userId: req.params.userId });
  res.json(tasks);
});

app.post('/fireservice', async (req, res) => {
  const task = new FireServiceTask(req.body);
  await task.save();
  res.json(task);
});

app.put('/fireservice/:id', async (req, res) => {
  const task = await FireServiceTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete('/fireservice/:id', async (req, res) => {
  await FireServiceTask.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// GROQ Chat API Endpoint
app.post('/ask-query', async (req, res) => {
  const { query } = req.body;
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'llama3-8b-8192',
    });
    res.json({ response: chatCompletion.choices[0]?.message?.content || 'No response' });
  } catch (error) {
    res.status(500).json({ error: 'Error processing query' });
  }
});

// Proxy for /api/chat
app.use('/api/chat', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
