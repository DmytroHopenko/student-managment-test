const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, class: className, section, roll } = req.query;
    const payload = {
        name,
        className,
        section,
        roll
    }
    const students = await getAllStudents(payload);

    res.json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    const message = await addNewStudent(payload)

    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id: studentId} = req.params;
    const data = req.body;
    const payload = {
        userId: studentId,
        ...data
    }
    const message = await updateStudent(payload);

    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);

    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const data = req.body;
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user;
    const payload = {
        userId,
        reviewerId,
        ...data
    }
    const message = await setStudentStatus(payload);

    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
