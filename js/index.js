
$(document).ready(function() {

  var entry = '';
  var decimal = true;
  var current = '';
  var answer = '';
  var log = '';
  var reset = '';

  $('button').click(function() {

    entry = $(this).attr("value");

    if (reset) {
      if (entry === '/' || entry === '*' || entry === '-' || entry === '+') {
        log = answer;
      } else {
        answer = '';
      }
    }
    reset = false;

    if (entry === 'ac' || entry === 'ce' && current === 'noChange') {
      answer = '';
      current = '';
      entry = '';
      log = '';
      $('#history').html('0');
      $('#answer').html('0');
      decimal = true;
    } else if (entry === 'ce') {
      $('#history').html(log.slice(0, -current.length));
      log = log.slice(0, -current.length);
      answer = answer.slice(0, -current.length);
      current = answer;
      if (log.length === 0 || log === ' ') {
        $('#history').html('0');
      }
      $('#answer').html('0');
      entry = '';
      decimal = true;
    }

    if (entry === '.' || entry === '0.') {
      if (!decimal) {
        entry = '';
      }
    }

    if (answer.length === 0 && isNaN(entry) && entry !== '.' || answer.length === 0 && entry === '0') {
      entry = '';
      answer = '';
    }

    if (current !== 'noChange') {
      if (current === '' && isNaN(entry) && entry !== '.' || isNaN(current) && isNaN(entry) && entry !== '.') {
        entry = '';
      }
    }

    while (Number(entry) || entry === '0' || current === '.') {

      if (isNaN(current) && entry === '0' && current !== '.') {
        entry = '';
      } else if (isNaN(current) && Number(entry) && current !== '.') {
        current = '';
      }
      if (entry === '.') {
        decimal = false;
      }
      if (current === '0.' && isNaN(entry)) {
        entry = '';
      } else {
        if (current[current.length - 1] === '.') {
          current = current.concat(entry);
        } else {
          current += entry;
        }
        answer += entry;
        $('#answer').html(current);
        log += entry;
        $('#history').html(log);
        entry = '';
      }
    }


    if (entry === '.') {
      if (current === '' || isNaN(current[current.length - 1])) {
        current = '0.';
        answer += entry;
        $('#answer').html('0.');
        log += current;
        $('#history').html(log);

      } else {
        current = current.concat('.');
        answer = answer.concat('.');
        log = answer;
        $('#history').html(answer);
        $('#answer').html(current);
      }
      entry = '';
      decimal = false;

    } else if (entry === '/') {
      current = '/';
      answer = prepare(eval(answer)) + current;
      log += current;
      $('#history').html(log);
      $('#answer').html('/');
      entry = '';
      decimal = true;

    } else if (entry === '*') {
      current = '*';
      answer = prepare(eval(answer)) + current;
      log += 'x';
      $('#history').html(log);
      $('#answer').html('x');
      entry = '';
      decimal = true;

    } else if (entry === '-') {
      current = '-';
      answer = prepare(eval(answer)) + current;
      log += current;
      $('#history').html(log);
      $('#answer').html('-');
      entry = '';
      decimal = true;

    } else if (entry === '+') {
      current = '+';
      answer = prepare(eval(answer)) + current;
      log += current;
      $('#history').html(log);
      $('#answer').html('+');
      entry = '';
      decimal = true;

    } else if (entry === '=') {
      if (current[current.length - 1] === '.') {
        entry = '';
      } else {
        current = eval(answer).toString();
        $('#answer').html(prepare(eval(answer)));
        answer = prepare(eval(answer));
        log += entry + answer;
        $('#history').html(log);
        log = answer;
        entry = '';
        reset = true;
        decimal = true;
      }
      current = 'noChange';
    }
    entry = '';

    if (reset) {
      log = '';
    }

    if ($('#entry').children().text().length > 8 || $('#history').text().length > 22) {
      $('#answer').html('0');
      $('#history').html('Digit Limit Met');
      current = '';
      answer = '';
      log = '';
      decimal = true;
    }
  
  });
  
  
  function prepare(item) {
    item = item.toString().split('');
    if (item.indexOf('.') !== -1) {
      var test = item.slice(item.indexOf('.') + 1, item.length);
      item = item.slice(0, item.indexOf('.') + 1);
      var i = 0;
      while (test[i] < 1) {
        i++
      }
      test = test.join('').slice(0, i + 2);
      if (test[test.length-1] === '0') {
        test = test.slice(0, -1);
      }
      return item.join('') + test;
    } else {
      return item.join('');
    }
  }  
  
});