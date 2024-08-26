const request = require('supertest');
const app = require('../app'); // Your Express app
const http = require('http');

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(5000, () => {
    console.log('Test server running on port 5000');
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('Test server closed');
    done();
  });
});

describe('Assignments API', () => {
  it('should create a new assignment', async () => {
    const response = await request(app)
      .post('/assignments')
      .send({
        assignmentName: 'Test Assignment',
        ModuleCode: 'CS101',
        uploadDate: '2024-08-25',
        dueDate: '2024-09-01',
        assignmentInfo: 'Test assignment info',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('assignmentID');
  });

  it('should retrieve an assignment by ID', async () => {
    const response = await request(app)
      .get('/assignments/1'); // Assuming an assignment with ID 1 exists
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('assignmentName');
  });

  // Add more tests for update, delete, and other scenarios
});
