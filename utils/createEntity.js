const fs = require('fs');
const modelDir = `${__dirname}/../models`;
const controllerDir = `${__dirname}/../controllers`;
const routeDir = `${__dirname}/../routes`

const finish = (err, path) => {
    if (err) console.log(err)
    else console.log(`created folder at path "${path}" because one did not exist`)
}

[modelDir, controllerDir, routeDir].forEach(item => {
    if (!fs.existsSync(item)) fs.mkdir(item, (err) => finish(err, item))
})

const genModel = (modelStream, entityNameCapitalized) => {
    modelStream.write("const mongoose = require('mongoose')\n\n");
    modelStream.write(`const ${entityNameCapitalized} = mongoose.Schema({\n\n`);
    modelStream.write("})\n\n")
    modelStream.write(`module.exports = mongoose.model("${entityNameCapitalized}", ${entityNameCapitalized})`)
    modelStream.end();
}

const genControllers = (controllerStream, entityName, entityNameCapitalized) => {
    const lines = [
        `const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)\n\n`,
        `const ${entityNameCapitalized} = require("../models/${entityNameCapitalized}")\n\n`,
        `exports.add${entityNameCapitalized} = asyncHandler(async (req, res, next) => {\n`,
        `     const ${entityName} = await ${entityNameCapitalized}.create(req.body);\n`,
        `     res.json({success: true, data: ${entityName}})\n`,
        `})`,
        `\n\n`,
        `exports.get${entityNameCapitalized}s = asyncHandler(async (req, res, next) => {\n`,
        `     const query = {}\n`,
        `     const ${entityName}s = await ${entityNameCapitalized}.find(query);\n`,
        `     res.json({success: true, data: ${entityName}s})\n`,
        `})\n\n`,
        `exports.edit${entityNameCapitalized} = asyncHandler(async (req, res, next) => {\n`,
        `     let ${entityName} = await ${entityNameCapitalized}.findById(req.params.id);\n`,
        `     ${entityName} = Object.assign(${entityName}, req.body);\n`,
        `     await ${entityName}.save();`,
        `     res.json({success: true, data: ${entityName}})\n`,
        `})\n\n`,
        `exports.get${entityNameCapitalized}ById = asyncHandler(async (req, res, next) => {\n`,
        `     const ${entityName} = await ${entityNameCapitalized}.findById(req.params.id);\n`,
        `     res.json({success: true, data: ${entityName}})\n`,
        `})\n\n`,
        `exports.remove${entityNameCapitalized} = asyncHandler(async (req, res, next) => {\n`,
        `     await ${entityNameCapitalized}.findByIdAndRemove(req.params.id);\n`,
        `     res.json({success: true})\n`,
        `})\n\n`
    ]
    lines.forEach(line => controllerStream.write(line))
    controllerStream.end()
}

const genRoutes = (routeStream, entityName, entityNameCapitalized) => {
    const lines = [
        "const express = require('express')\n\n",
        `const {get${entityNameCapitalized}s, add${entityNameCapitalized}, get${entityNameCapitalized}ById, edit${entityNameCapitalized}, remove${entityNameCapitalized}} = require("../controllers/${entityName}")\n\n`,
        "const router = express.Router();\n\n",
        `router.route("/")
            .get(get${entityNameCapitalized}s)
            .post(add${entityNameCapitalized})\n`,
        `router.route("/:id")
            .get(get${entityNameCapitalized}ById)
            .put(edit${entityNameCapitalized})
            .delete(remove${entityNameCapitalized})`,
        "\n\n",
        "module.exports = router;"
    ]
    lines.forEach(line => routeStream.write(line));
    routeStream.end();
}

for (let i = 2; i < process.argv.length; i++) {
    const entityName = process.argv[i];
    const entityNameCapitalized = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    const modelStream = fs.createWriteStream(`${__dirname}/../models/${entityNameCapitalized}.js`);
    const controllerStream = fs.createWriteStream(`${__dirname}/../controllers/${entityName}.js`);
    const routeStream = fs.createWriteStream(`${__dirname}/../routes/${entityName}.js`)

    modelStream.once('open', () => genModel(modelStream, entityNameCapitalized))
    controllerStream.once('open', () => genControllers(controllerStream, entityName, entityNameCapitalized));
    routeStream.once('open', () => genRoutes(routeStream, entityName, entityNameCapitalized))
}