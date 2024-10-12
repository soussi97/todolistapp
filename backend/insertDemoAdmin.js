// Import the necessary modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema and model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  insertDemoUsers();
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Function to insert demo users
async function insertDemoUsers() {
  try {
    const users = [
      {
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123',
      },
      {
        username: 'janedoe',
        email: 'janedoe@example.com',
        password: 'password123',
      },
      {
        username: 'alice',
        email: 'alice@example.com',
        password: 'password123',
      },
    ];

    // Hash passwords and save users
    for (let userData of users) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
      const user = new User(userData);
      await user.save();
    }

    console.log('Demo users inserted successfully');
    process.exit();
  } catch (error) {
    console.error('Error inserting demo users:', error);
    process.exit(1);
  }
}

/*password123*/
