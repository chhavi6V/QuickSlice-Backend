import {body, validationResult} from "express-validator"

const handleValidationErrors = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array});
    }
    next();
}

export const validateMyUserRequest = [
    body("name").notEmpty().withMessage("Name must be a string"),
    body("addressLine1").notEmpty().withMessage("AddressLine1 must be a string"),
    body("city").notEmpty().withMessage("City must be a string"),
    body("country").notEmpty().withMessage("Country must be a string"),
    handleValidationErrors,
];