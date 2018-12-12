const expect = require('chai').expect
const fields = require('../../lib/mapper/fields')

describe('QueryString: Fields', function () {

    context('when query fields are a simple string', function () {
        it('should return a JSON with field params', function (done) {
            var query = { fields: 'name,age,created_at' }
            verify(fields.fields(query, default_options))
            done()
        })
    })

    context('when query fields are an array of strings', function () {
        it('should return a JSON with field params', function (done) {
            var query = { fields: ['name,age', 'created_at'] }
            verify(fields.fields(query, default_options))
            done()
        })
    })

    context('when there are blank spaces between query fields', function () {
        it('should return a JSON with field params, ignoring the blank space', function (done) {
            var query = { fields: '  name   , name,  age ,   created_at' }
            verify(fields.fields(query, default_options))
            done()
        })
    })

    context('when there are null fields in query fields', function () {
        it('should return a JSON with field params, ignoring the null fields', function (done) {
            var query = { fields: ',,name,,,age,,,,,created_at,,' }
            verify(fields.fields(query, default_options))
            done()
        })
    })

    context('when there are special characters in query fields', function () {
        it('should return a JSON with field params, ignoring the special characteres', function (done) {
            var query = { fields: ' ,,,   ^ & * ( ´) @!n@a"m "e,$%ag" e",created  _a t  ' }
            verify(fields.fields(query, default_options))
            done()

        })
    })

    context('when use the default options without query', function () {
        it('should return a JSON with default field params', function (done) {
            var result = fields.fields({}, default_options)
            expect(result).is.not.null
            expect(result).to.eql(default_options.default.fields)
            done()
        })
    })

    context('when use custom params without query', function () {
        it('should return a JSON with custom params', function () {
            var custom_options = { default: { fields: { name: 1, age: 1, _id: 0 } } }
            var result = fields.fields({}, custom_options)
            expect(result).is.not.null
            expect(result).to.have.property('name')
            expect(result).to.have.property('age')
            expect(result).to.have.property('_id')
            expect(result.name).to.eql(custom_options.default.fields.name)
            expect(result.age).to.eql(custom_options.default.fields.age)
            expect(result._id).to.eql(custom_options.default.fields._id)

        })
    })
})

function verify(result) {
    expect(result).is.not.null
    expect(result).to.have.property('name')
    expect(result).to.have.property('age')
    expect(result).to.have.property('created_at')
    expect(result.name).to.eql(1)
    expect(result.age).to.eql(1)
    expect(result.created_at).to.eql(1)
}
