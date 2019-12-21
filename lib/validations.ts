/**
 * @param {string} email - string to check
 * @return {boolean} if string = valid email
 */
export const isEmailValid = (data): boolean => {
  if (typeof data != 'string') {
    return false
  }
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(data)
}

export const isUsernameValid = (data): boolean => {
  return typeof data == 'string' && isAlphaNumeric(data) && data.length >= 4
}

export const isPasswordValid = (data): boolean => {
  return typeof data == 'string' && data.length >= 6
}

//
//utilities
//

export const isEmpty = (data: any): boolean => {
  if (typeof data === 'object') {
    if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
      return true
    } else if (!data) {
      return true
    }
    return false
  } else if (typeof data === 'string') {
    if (!data.trim()) {
      return true
    }
    return false
  } else if (typeof data === 'undefined' || data === null) {
    return true
  } else {
    return false
  }
}

export const isAlphaNumeric = (data: string): boolean => {
  let alphaNumRegExp = /[^A-Za-z0-9]+/g, //only letters and numbers
    notAllowedArr = data.match(alphaNumRegExp)
  return notAllowedArr == null
}
