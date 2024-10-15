const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');
const prisma = new PrismaClient();
const router = express.Router();


// Create a new subject
router.post('/', authenticateToken, async (req, res) => {
  const { name, code } = req.body;
  const teacherId = req.teacher.teacherId;

  try {
    const subject = await prisma.subject.create({
      data: { name, code, teacherId },
    });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subject" });
  }
});

// Add a student to a subject
// router.post('/subjects/:subjectId/students', authenticateToken, async (req, res) => {
//   const { subjectId } = req.params;
//   const { id, name, rollNumber } = req.body;

//   try {
//     const student = await prisma.student.create({
//       data: {
//         id,
//         name,
//         rollNumber,
//         subjectId
//       },
//     });
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add student" });
//   }
// });

// // Get students for a specific subject
// router.get('/subjects/:subjectId/students', authenticateToken, async (req, res) => {
//   const { subjectId } = req.params;

//   try {
//     const students = await prisma.student.findMany({
//       where: { subjectId: parseInt(subjectId) },
//     });
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch students" });
//   }
// });

module.exports = router;