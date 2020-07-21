// Griglia 6x6, ad ogni click parte una
// richiesta AJAX che prende un
// numero random da 1 a 9.
// Se è <= 5 il quadrato diventa giallo,
// se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro
// del quadrato
var id = 0;

function addNewIntListener() {
  var btn = $('#btn');
  btn.click(getNewIntListener);
}

function getNewIntListener() {

  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/random/int',
    method: 'GET',
    success: function (data, state) {
      var target = $('.slot[data-id=' + id + ']');

      var success = data['success'];
      var value = data['response'];
      var isValueEven = (value % 2 === 0);

      if (success) {
        if (value <= 5) {
          target.append(value);
          $(target).addClass('yellow');
        } else if (value > 5) {
          target.append(value);
          $(target).addClass('green');
        }
      } else {
        console.log('error');
      }

      id += 1;

      if (id > 36) {
        alert('Gioco Finito');
        location.reload();
      }

    },

    error: function (request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);
    }
  });
}


function init() {
  addNewIntListener();
}

$(document).ready(init);
