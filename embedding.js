/**
 * Dependencies
 */
const mongoose = require('mongoose');

/**
 * Connection
 */
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

/**
 * Models
 */
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

/**
 * Functions
 */
async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // update directly in DB
  const course = await Course.update({ _id: courseId}, {
    $set: {
      'author.name': 'John Smith'
    }
  });
}

/**
 * Calls
 */
// createCourse('Node Course', new Author({ name: 'Mosh' }));
updateAuthor('5d399cc86919ef4c0c1db119');