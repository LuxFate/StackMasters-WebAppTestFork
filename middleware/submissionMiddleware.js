//function validate when a submission is created, are these variables in the database
const validSubmission = (req, res, next) =>{
    console.log(req.body);// Log the data sent by the client
    // Extract specific fields from the request body
    const{
        submissionID,
        userID,
        assignmentID,
        moduleCode,
        submissionDate,
        videoURL
    } = req.body;
    if(!submissionID || !userID || !assignmentID || !moduleCode ||
        !submissionDate || !videoURL){
            //returns a JSON response that there are missing fields
            return res.status(400).json({message: 'Missing required fields'});
        }
    next();
};
//exports the function
module.exports = {validSubmission};