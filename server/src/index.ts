const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const submittedForms: any = [];


app.get('/api/form', (req: any, res: any) => {
  res.json(submittedForms);
});

app.post('/api/form', (req: any, res: any) => {
    const { name, email } = req.body;

    if(!name || !email) {
        return res.status(400).json({ message: "Missing fields." });
    }

    submittedForms.push({ name, email})

    return res.status(200).json({ 
        message: 'Form received', 
        data: { name, email }
    });

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});