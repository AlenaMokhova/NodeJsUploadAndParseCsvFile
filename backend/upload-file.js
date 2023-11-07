const uploadedFiles = (req) => {
    return req.files;
}

module.exports.uploaded = uploadedFiles;