const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const connectDB = require('./connectDb');
const apiRoutes = require('./routes/apiRoute');
const loginRoutes = require('./routes/loginRoute');
const countStudentRoutes = require('./routes/countStudentRoute');
const countTeacherRoutes = require('./routes/countTeacherRoute');
const classRoute = require('./routes/ClassRoute');
const astudentRoute = require('./routes/astudentRoute');
const teacherRoute = require('./routes/teacherRoute')
const attendanceRoute = require('./routes/attendanceRoute')

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors())
app.use('/api', apiRoutes);
app.use('/login', loginRoutes);
app.use('/studentCount', countStudentRoutes);
app.use('/teacherCount', countTeacherRoutes);
app.use('/class', classRoute);
app.use('/astudent', astudentRoute);
app.use('/teacher', teacherRoute)
app.use('/attendance', attendanceRoute);  
// app.use('/teacher', teacherRoute)

connectDB().then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
});



// https// 