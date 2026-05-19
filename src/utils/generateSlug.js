const generateSlug = (title) => {

    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, '-');

};

module.exports = generateSlug;