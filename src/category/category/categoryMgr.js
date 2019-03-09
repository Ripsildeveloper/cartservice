var categoryDA = require('./categoryDA')


exports.showSuperCategory = function (req, res) {
    try {
        categoryDA.showSuperCategory(req, res);
    } catch (error) {
        console.log(error);
    }

}

exports.categoryProduct = function (req, res) {
    try {
        categoryDA.categoryProduct(req, res);
    } catch (error) {
        console.log(error);
    }
}


