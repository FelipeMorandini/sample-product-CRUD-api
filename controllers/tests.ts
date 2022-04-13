import {Request, Response} from 'express'
import { Exam, Question, Option, testModel } from '../models/tests';
import { badRequest, internalServerError, notFound } from '../utils/errors';
import { validateNumber, ok } from '../utils/utils';

const insertExam = (req: Request, res: Response) => {
    
    {
        const exam = req.body;
        if(!exam) {
            return badRequest(res, 'Invalid exam!')
        } else if(!exam.name) {
            return badRequest(res, 'Please insert the exam name!');
        } else if(!exam.description) {
            return badRequest(res, 'please inform the exam description!')
        }
    }

    const exam = req.body as Exam
    testModel.insertExam(exam)
        .then(id => {
            res.json({
                id
            })
    }).catch(err => internalServerError(res, err))
}

const insertQuestion = (req: Request, res: Response) => {
    
    {
        const question = req.body;
        if(!question) {
            return badRequest(res, 'Invalid question!')
        } else if(!question.statement) {
            return badRequest(res, 'Please insert the question statement!');
        } else if(!question.examId) {
            return badRequest(res, 'please inform the ID of the Exam related to this question!')
        }
    }

    const question = req.body as Question
    testModel.insertQuestion(question)
        .then(id => {
            res.json({
                id
            })
    }).catch(err => internalServerError(res, err))
}

const insertOption = (req: Request, res: Response) => {
    
    {
        const option = req.body;
        if(!option) {
            return badRequest(res, 'Invalid option!')
        } else if(!option.opt) {
            return badRequest(res, 'Please insert the option!');
        } else if(!option.value) {
            return badRequest(res, 'please inform the option value!')
        } else if(!option.correct) {
            return badRequest(res, 'please inform if the option is correct!')
        } else if(!option.questionId) {
            return badRequest(res, 'please inform the ID of the question related to this option!')
        }
    }

    const option = req.body as Option
    testModel.insertOption(option)
        .then(id => {
            res.json({
                id
            })
    }).catch(err => internalServerError(res, err))
}

const updateExam = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    
    {
        const exam = req.body;

        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        } else if(!exam) {
            return badRequest(res, 'Invalid exam!')
        } else if(!exam.name) {
            return badRequest(res, 'Please insert the exam name!');
        } else if(!exam.description) {
            return badRequest(res, 'please inform the exam description!')
        }

        const examSaved = await testModel.getExam(id);
        if(!examSaved) {
            return notFound(res);
        }
    }

    const exam = req.body as Exam
    testModel.updateExam(exam)
        .then(exam => {
            res.json(exam)
    }).catch(err => internalServerError(res, err))
}

const updateQuestion = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    
    {
        const question = req.body;

        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        } else if(!question) {
            return badRequest(res, 'Invalid question!')
        } else if(!question.statement) {
            return badRequest(res, 'Please insert the question statement!');
        } else if(!question.examId) {
            return badRequest(res, 'please inform the ID of the Exam related to this question!')
        }

        const questionSaved = await testModel.getQuestion(id);
        if(!questionSaved) {
            return notFound(res);
        }
    }

    const question = req.body as Question
    testModel.updateQuestion(question)
        .then(question => {
            res.json(question)
    }).catch(err => internalServerError(res, err))
}

const updateOption = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    
    {
        const option = req.body;

        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        } else if(!option) {
            return badRequest(res, 'Invalid option!')
        } else if(!option.opt) {
            return badRequest(res, 'Please insert the option!');
        } else if(!option.value) {
            return badRequest(res, 'please inform the option value!')
        } else if(!option.correct) {
            return badRequest(res, 'please inform if the option is correct!')
        } else if(!option.questionId) {
            return badRequest(res, 'please inform the ID of the question related to this option!')
        }

        const optionSaved = await testModel.getQuestion(id);
        if(!optionSaved) {
            return notFound(res);
        }
    }

    const option = req.body as Option
    testModel.updateOption(option)
        .then(option => {
            res.json(option)
    }).catch(err => internalServerError(res, err))
}

const ListExams = (req: Request, res: Response) => {
    testModel.listExams()
        .then(exams => {
            res.json(exams)
        }).catch(err => internalServerError(res, err));
}

const getExam = (req: Request, res: Response) => {
    {
        const id = parseInt(req.params.id);
        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        }

        testModel.getExam(id)
            .then((exam) => {
                if(exam) {
                    return res.json(exam);
                } else {
                    return notFound(res);
                }
            }).catch(err => internalServerError(res, err));
    }
}

const getQuestion = (req: Request, res: Response) => {
    {
        const id = parseInt(req.params.id);
        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        }

        testModel.getQuestion(id)
            .then((question) => {
                if(question) {
                    return res.json(question);
                } else {
                    return notFound(res);
                }
            }).catch(err => internalServerError(res, err));
    }
}

const deleteExam = (req: Request, res: Response) => {
    {
        const id = parseInt(req.params.id);
        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        }

        testModel.deleteExam(id)
            .then(() => ok(res)).catch(err => internalServerError(res, err));
    }
}

const deleteQuestion = (req: Request, res: Response) => {
    {
        const id = parseInt(req.params.id);
        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        }

        testModel.deleteQuestion(id)
            .then(() => ok(res)).catch(err => internalServerError(res, err));
    }
}

const deleteOption = (req: Request, res: Response) => {
    {
        const id = parseInt(req.params.id);
        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        }

        testModel.deleteOption(id)
            .then(() => ok(res)).catch(err => internalServerError(res, err));
    }
}

export const testController = {
    insertExam,
    insertQuestion,
    insertOption,
    ListExams,
    getExam,
    getQuestion,
    deleteExam,
    deleteQuestion,
    deleteOption,
    updateExam,
    updateQuestion,
    updateOption
}