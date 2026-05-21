require('dotenv').config();

const mongoose = require('mongoose');

beforeAll(async () => {

    await mongoose.connect(
        process.env.MONGO_URI
    );
});

beforeEach(async () => {

    // Clear all collections before each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

afterAll(async () => {

    await mongoose.disconnect();
}, 10000);