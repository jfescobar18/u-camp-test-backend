const express = require("express")
const router = express.Router()
const SearchController = require("../Controllers/SearchController.js")

const routes = function () {
    router.route("/:query").get(SearchController.getProducts)

    return router
}

module.exports = routes
