import { dbQuery, dbQueryFirst } from "../services/loadDbFile";

export interface Option {
    id: number;
    opt: string;
    value: string;
    correct: boolean;
    questionId: number;
}
  
export interface Question {
    id: number;
    statement: string;
    examId: number;
    options?: Option[];
}
  
export interface Exam {
    id: number;
    name: string;
    description: string;
    online: boolean;
    questions?: Question[];
}

export const insertExam = async (exam: Exam) => {
    await dbQuery(`INSERT INTO exam (name, description, online) VALUES(?, ?, ?)`, [exam.name, exam.description, exam.online])
    let id = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'exam'`);
    return `Exam successfully inserted as ID no. ${id[0].Id as number | undefined}`;
};

export const insertQuestion = async (question: Question) => {
    await dbQuery(`INSERT INTO question (statement, examId) VALUES(?, ?)`, [question.statement, question.examId])
    let id = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'question'`);
    return `Question successfully inserted as ID no. ${id[0].Id as number | undefined}`;
};

export const insertOption = async (option: Option) => {
    await dbQuery(`INSERT INTO option (opt, value, correct, questionId) VALUES(?, ?, ?, ?)`, [option.opt, option.value, option.correct, option.questionId])
    let id = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'option'`);
    return `Option successfully inserted as ID no. ${id[0].Id as number | undefined}`;
};

export const updateExam = async (exam: Exam) => {
    await dbQuery(`UPDATE exam SET name = ?, description = ?, online = ? WHERE id = ?`, [exam.name, exam.description, exam.online, exam.id])
    return getExam(exam.id);
};

export const updateQuestion = async (question: Question) => {
    await dbQuery(`UPDATE question SET statement = ?, examId = ? WHERE id = ?`, [question.statement, question.examId, question.id])
    return getQuestion(question.id);
};

export const updateOption = async (option: Option) => {
    await dbQuery(`UPDATE option SET opt = ?, value = ?, correct = ?, questionId = ? WHERE id = ?`, [option.opt, option.value, option.correct, option.questionId, option.id])
    return getQuestion(option.questionId);
};

export const listExams = async () => {
    const answer = await dbQuery(`SELECT * FROM exam`);
    return answer as Exam[];
}

export const getExam = async (id: number) => {
    const answer = await dbQueryFirst(`SELECT * FROM exam WHERE id = ?`, [id]);
    return answer as Exam | undefined;
}

export const getQuestion = async (id: number) => {
    const answer = await dbQueryFirst(`SELECT * FROM question WHERE id = ?`, [id]);
    return answer as Question | undefined;
}

export const deleteExam = async (id: number) => {
    await dbQueryFirst(`DELETE FROM exam WHERE id = ?`, [id]);
    await dbQuery(`DELETE FROM question WHERE examId = ?`, [id]);
}

export const deleteQuestion = async (id: number) => {
    await dbQueryFirst(`DELETE FROM question WHERE id = ?`, [id]);
    await dbQuery(`DELETE FROM option WHERE questionId = ?`, [id]);
}

export const deleteOption = async (id: number) => {
    await dbQueryFirst(`DELETE FROM option WHERE id = ?`, [id]);
}

export const testModel = {
    insertExam,
    insertQuestion,
    insertOption,
    listExams,
    getExam,
    getQuestion,
    deleteExam,
    deleteQuestion,
    deleteOption,
    updateExam,
    updateQuestion,
    updateOption
}