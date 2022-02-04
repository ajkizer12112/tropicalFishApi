
// Requiring the module
const reader = require('xlsx')

const read = (filename, entity) => {
    const file = reader.readFile(`${__dirname}/../_data/${filename}.xlsx`)
    const sheets = file.SheetNames
    if (!sheets.includes(entity)) return "Error: Entity does not exist"
    const data = reader.utils.sheet_to_json(file.Sheets[entity])
    return data
}

const write = (filename, entity, data) => {
    const file = reader.readFile(`../_data/${filename}.xlsx`)
    const ws = reader.utils.json_to_sheet(data)

    reader.utils.book_append_sheet(file, ws, entity)
    reader.writeFile(file, `../_data/${filename}.xlsx`)
}


module.exports = { read, write }