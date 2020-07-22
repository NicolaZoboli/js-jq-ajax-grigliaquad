// Griglia 6x6, ad ogni click parte una
// richiesta AJAX che prende un
// numero random da 1 a 9.
// Se è <= 5 il quadrato diventa giallo,
// se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro
// del quadrato

// var id = 0;

function addNewIntListener() {
  var input = $('.slot');
  input.click(getNewIntListener);
}

function getNewIntListener() {
  var target = $(this);

  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/random/int',
    method: 'GET',
    success: function (data, state) {

      var success = data['success'];
      var value = data['response'];

      if (success) {
        if (value <= 5 && $(target).hasClass('empty')) {
          target.append(value);
          $(target).removeClass('empty');
          $(target).addClass('yellow');
        } else if (value > 5 && $(target).hasClass('empty')) {
          target.append(value);
          $(target).removeClass('empty');
          $(target).addClass('green');
        }
      } else {
        console.log('error');
      }

      if ($('.slot.empty').length == 0) {
        setTimeout(gameOver, 10);
      }
    },

    error: function (request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);
    }
  });
}

function gameOver() {
  alert('Gioco Finito. Premi OK per giocare ancora.');
  location.reload();
}


function init() {
  addNewIntListener();
}

$(document).ready(init);
