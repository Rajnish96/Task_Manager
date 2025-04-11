const { validationResult, body, param } = require('express-validator');

const titleValidator = body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title is required');

const descriptionValidator = body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string');

const statusValidator = body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be one of: pending, in-progress, completed');

const dueDateValidator = body('dueDate')
    .notEmpty()
    .withMessage('Due date is required')
    .isISO8601()
    .withMessage('Due date must be a valid date');

const validateTaskId = param('id')
    .exists({ checkFalsy: true }) // makes sure it's not undefined/null/empty
    .withMessage('Task ID is required')
    .bail() // stop running validations if previous one fails
    .isInt({ gt: 0 })
    .withMessage('Task ID must be a positive integer');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

// Create Task
exports.validateCreateTask = [
    titleValidator,
    descriptionValidator,
    statusValidator,
    dueDateValidator,
    handleValidationErrors
];

// Update Task
exports.validateUpdateTask = [
    validateTaskId,
    titleValidator.optional(),
    descriptionValidator.optional(),
    statusValidator,
    dueDateValidator.optional(),
    handleValidationErrors
];

// Get/Delete Task by ID
exports.validateTaskIdParam = [validateTaskId, handleValidationErrors];
