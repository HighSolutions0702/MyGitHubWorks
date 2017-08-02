document.addEventListener('turbolinks:load', function() {
  gon.order_data = {
    left_currency: 'btc',
    left_volume: 0.0,
    right_volume: 0.0,
    order_type: 'buy',
    order_type_options: ['buy', 'sell'],
    currency_options: ['btc', 'eth', 'eur'],
    right_currency: 'eur'
  }
  gon.order_data = _.extend(gon.order_data, {balances: gon.balances}, {exchanges: gon.exchanges})

  if ($('#new_order').length) {
    console.log('new vue');
    new Vue({
      el: '#new_order',
      data: gon.order_data,
      watch: {
        left_currency: function(value, old_value) {
          console.log('left currency change')
          this.right_currency = _.first(this.right_currency_options)
          $('#right_currency').select2()
        },
        right_volume: function (value, old_value) {
          if (Math.abs(this.left_volume - this.right_volume * this.exchange_rate) > 0.001) {
            this.left_volume = this.right_volume / this.exchange_rate;
          }
        },
        left_volume: function (value, old_value) {
          if (Math.abs(this.right_volume - this.left_volume * this.exchange_rate) > 0.001) {
            this.right_volume = this.left_volume * this.exchange_rate;
          }
        },
        order_type: function (value, old_value) {
          this.left_volume = 0
        }
      },
      computed: {
        right_currency_options: function() {
          var that = this
          return _.reject(that.currency_options, function(currency){ return currency === that.left_currency; });
        },
        right_text: function () {
          return this.order_type === 'buy'? 'Pay with': 'Receive'
        },
        exchange_rate: function () {
          var pattern = this.left_currency + '2' + this.right_currency
          return this.exchanges[pattern]
        }
      },
      methods: {
        use_all: function () {
          console.log('use all')
          if (this.order_type === 'buy') {
            this.right_volume = this.balances[this.right_currency]
          }
          else {
            this.left_volume = this.balances[this.left_currency]
          }
        },
        submit: function () {

        }
      }
    });
  }
});
