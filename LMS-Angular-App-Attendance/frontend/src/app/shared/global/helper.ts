import { isEmpty, isNil } from 'ramda';

export const isNumber = (n: any): boolean => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export const getDateOfBirth = (idNumber: any): Date | undefined => {
  if (isEmpty(idNumber) || isNil(idNumber)) {
    return;
  }
  const tempDate = new Date();
  const year: number =
    idNumber.substring(0, 2) < 45
      ? 2000 + parseInt(idNumber.substring(0, 2), 10)
      : 1900 + parseInt(idNumber.substring(0, 2), 10);
  const month = parseInt(idNumber.substring(2, 4), 10) - 1;
  const date = idNumber.substring(4, 6);
  tempDate.setFullYear(year, month, date);
  return tempDate;
};

export const getGender = (idNumber: any): any => {
  if (idNumber?.dirty) {
    idNumber.markAllAsTouched();
  }

  if (idNumber) {
    const genderCode = idNumber.substring(6, 10);
    const gender = parseInt(genderCode) < 5000 ? 'Female' : 'Male';
    return gender;
  }
  return;
};

export const splitCamalCaseWords = (camalCase: string): any => {
  var match,
    output = [];
  var regexPattern = /([A-Za-z]?)([a-z]+)/g;

  match = regexPattern.exec(camalCase);

  while (match) {
    // output.push(match.join(""));
    output.push([match[1].toLocaleLowerCase(), match[2]].join(''));
    match = regexPattern.exec(camalCase);
  }

  output[0] = output[0].charAt(0).toUpperCase() + output[0].substr(1);
  return output.join(' ');
};

export const validateIdNumber = (idNumber: any): any => {
  // Check if the user has provided any number
  if (isEmpty(idNumber) || isNil(idNumber)) {
    return { required: true };
  }

  // Check if the SA ID Number has 13 digits
  if (idNumber.length !== 13 || !isNumber(idNumber)) {
    return { invalidIdLength: true };
  }

  const dateOfBirth = getDateOfBirth(idNumber);

  const tempYear = dateOfBirth?.getFullYear().toString();

  if (
    tempYear?.substr(tempYear.length - 2) !== idNumber.substring(0, 2) &&
    dateOfBirth?.getMonth() !== idNumber.substring(2, 4) &&
    dateOfBirth?.getDate() !== idNumber.substring(4, 6)
  ) {
    return { invalidIdDate: true };
  }

  // Check if they are South African
  // if (parseInt(idNumber.substring(10, 11), 10) !== 0) {
  //   return { invalidCitizenship: true };
  // }

  // Apply Luhn formula for check-digits
  let tempTotal = 0;
  let checkSum = 0;
  let multiplier = 1;

  for (let i = 0; i < 13; ++i) {
    tempTotal = parseInt(idNumber.charAt(i)) * multiplier;
    if (tempTotal > 9) {
      tempTotal =
        parseInt(tempTotal.toString().charAt(0)) +
        parseInt(tempTotal.toString().charAt(1));
    }
    checkSum = checkSum + tempTotal;
    multiplier = multiplier % 2 === 0 ? 1 : 2;
  }

  // Check if the ID number provided is correct against the Luhn formula
  if (checkSum % 10 !== 0) {
    return { invalidIdNumber: true };
  }

  return;
};

