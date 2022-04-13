import { Router } from 'express';
import { testController } from '../controllers/tests';

const testRouter = Router();
testRouter.post('exams/insert', testController.insertExam);
testRouter.post('questions/insert', testController.insertQuestion);
testRouter.post('options/insert', testController.insertOption);
testRouter.get('exams/list', testController.ListExams);
testRouter.get('exams/get/:id', testController.getExam);
testRouter.get('questions/get/:id', testController.getQuestion);
testRouter.delete('exams/delete/:id', testController.deleteExam);
testRouter.delete('questions/delete/:id', testController.deleteQuestion);
testRouter.delete('options/delete/:id', testController.deleteOption);
testRouter.put('exams/update/:id', testController.updateExam);
testRouter.put('questions/update/:id', testController.updateQuestion);
testRouter.put('options/update/:id', testController.updateOption);

export { testRouter };