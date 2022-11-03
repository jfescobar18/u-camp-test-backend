const HttpCodes = require("../Utils/HttpCodes")
const axios = require("axios")

exports.getProducts = (req, res) => {
    axios
        .get(
            `https://api.mercadolibre.com/sites/MLA/search?q=${req.params.query}`
        )
        .then(function (response) {
            return res.status(HttpCodes.OK).jsonp(response.data)
        })
        .catch(function (error) {
            return res.status(HttpCodes.BAD_REQUEST).jsonp({
                result: { name: "Unexpected" },
                errors: error.message,
            })
        })
}
