const getUniqueErrorMessage = (err) => {
    let output
    try {
        const fieldName = Object.keys(err.keyPattern)[0]
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' Already Exists'
    } catch (ex) {
        output = 'Unique Field Already Exists'
    }

    return output
}

const getError = (err) => {
    let message = 'Something went wrong'

    if (err.code) {
        switch (err.code) {
        case 11000:
        case 11001:
            message = getUniqueErrorMessage(err)
            break
        default:
            message = 'Something went wrong'
        }
    } else {
        if (err.reason) {
            message = err.reason.toString().slice(7)
        } else {
            for (const errName in err.errors) {
                if (err.errors[errName].message) { message = err.errors[errName].message }
            }
        }
    }

    return message === '' ? undefined : message
}

module.exports = getError
