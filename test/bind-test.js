function _error(label) {
  return function(error){
    console.log(label, error);
  }
}

_error('TEST LABEL')({ error : "world"});
_error('TEST LABEL 2')({ error : "world 2"});
