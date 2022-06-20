'use strict';

let errors = {};

function ValidationContract() {
    errors = {};

}

const validacpf = (cpf) => {
    const isRepeatingNumber = str => /^(\d)(\1){10}$/.test(str);
	 cpf = cpf.replace(/\D/g, '');

	if (
		cpf === '' ||
		cpf.length !== 11 ||
		!/^\d{11}$/.test(cpf) ||
		isRepeatingNumber(cpf)
	) {
		return false;
	}

	const digits = cpf.split('').map(x => parseInt(x));

	for (let j = 0; j < 2; j++) {
		let sum = 0;

		for (let i = 0; i < 9 + j; i++) {
			sum += digits[i] * (10 + j - i);
		}

		let checkDigit = 11 - (sum % 11);

		if (checkDigit === 10 || checkDigit === 11) {
			checkDigit = 0;
		}

		if (checkDigit !== digits[9 + j]) {
			return false;
		}
	}

	return true;
};

ValidationContract.prototype.isCpfValid = (value,name, message) => {
 
   
    if (!validacpf(value))
    errors[name] = [message];
   
}



ValidationContract.prototype.isEmailUpdade = (value,valueOld,name, message) => {
 
   
    if (value && valueOld.email != value.email)
    errors[name] = [message];
   
}

ValidationContract.prototype.isCpfUpdade = (value,valueOld,name, message) => {
 
   
    if (value && valueOld.cpf != value.cpf)
    errors[name] = [message];
   
}
ValidationContract.prototype.isEnderecoUpdade = (value,id,name, message) => {
 
   
    if(value && value.id != id)
    errors[name] = [message];
   
}

ValidationContract.prototype.isValue = (value,name, message) => {
 
   
    if (value)
    errors[name] = [message];
   
}

ValidationContract.prototype.isRequired = (value,name, message) => {
    if (!value || value.length <= 0)
    errors[name] = [message];
}

ValidationContract.prototype.hasMinLen = (value, min,name, message,) => {
    if (!value || value.length < min)
    errors[name] = {[name]:[message]};
}

ValidationContract.prototype.hasMaxLen = (value,name, max, message) => {
    if (!value || value.length > max)
    errors[name] = {[name]:[message]};
}

ValidationContract.prototype.isFixedLen = (value,name, len, message) => {
    if (value.length != len)
    errors[name] = {[name]:[message]};
}

ValidationContract.prototype.isEmail = (value,name, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
    errors[name] = [message];
}

ValidationContract.prototype.errors = () => { 
    return errors; 
}

ValidationContract.prototype.clear = () => {
    errors = [];
}

ValidationContract.prototype.isValid = () => {
  
    if(isEmpty(errors)){
      
        return true;
    }
    
      
        return false;
    
  
}


function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
module.exports = ValidationContract;