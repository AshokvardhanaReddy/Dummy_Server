
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

const client = new MongoClient(mongoUri);

client.connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));

const database = client.db('sr_frozen_foods');

// Middleware to parse JSON data
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Ashokvardhan's Server is running on http://localhost:${PORT}`);
});

// GET Method 
app.get('/api/:collectionName', async (req, res) => {
    const { collectionName } = req.params;
    try {
        const collection = database.collection(collectionName);
        const data = await collection.find().toArray();
        console.log(data)
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// // POST Method
// app.post('/api/:collectionName', async (req, res) => {
//     const { collectionName } = req.params;
//     try {
//         const newData = req.body;
//         const collection = database.collection(collectionName);
//         const result = await collection.insertOne(newData);
//         res.status(201).json(result);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // PUT Method
// app.put('/api/:collectionName/:id', async (req, res) => {
//     const { collectionName, id } = req.params;
//     try {
//         const { customer_name, customer_mobile, customer_office } = req.body;
//         const collection = database.collection(collectionName);
//         const updatedUser = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { customer_name: customer_name, customer_mobile: customer_mobile, customer_office: customer_office } });
//         if (!updatedUser) {
//             return res.status(404).send('User not found');
//         }
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });

// // DELETE Method
// app.delete('/api/:collectionName/:id', async (req, res) => {
//     console.log(req.params)
//     const { collectionName, id } = req.params;
//     try {
//         const collection = database.collection(collectionName)
//         const result = await collection.deleteOne({ _id: new ObjectId(id) });
//         if (result.deletedCount === 1) {
//             res.status(200).json({ message: 'Document deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'Document not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting document:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });