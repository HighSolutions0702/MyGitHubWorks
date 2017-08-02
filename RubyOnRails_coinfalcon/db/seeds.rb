# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ibans = ['KW81CBKU0000000000001234560101', 'GB82WEST12345698765432', 'RS35260005601001611379', 'PT50000201231234567890154']

['info@coinfalcon.com', 'info@shausdorf.de', 'jeeperscreepers28@gmail.com', 'dilin.life@gmail.com'].each_with_index do |email, index|
  user = User.new(email: email, password: 'coinfalcon', eur_sum: 500, btc_sum: 500)
  user.skip_confirmation!
  user.save!(validate: false)
  user.bank_accounts << BankAccount.create!(iban: ibans[index], bic: 'NTSBDEB1XXX', name: 'N26 Bank GmbH')
end

DepositBitcoinAddress.create!(address: 'mr4JSQbGf5wjSr1DK18hqs6tG4uqJ9nhQL')

currency = Currency.new
currency.code = 'eur'
currency.name = 'Euro'
currency.save!

currency = Currency.new
currency.code = 'btc'
currency.name = 'Bitcoin'
currency.save!

currency = Currency.new
currency.code = 'eth'
currency.name = 'Ethereum'
currency.save!

bank_account = BankAccount.new
bank_account.iban = 'DE95100110012620621011'
bank_account.bic = 'NTSBDEB1XXX'
bank_account.name = 'N26 Bank GmbH'
bank_account.user_id = 1
bank_account.save!

transaction = Transfer.new
transaction.currency_id = 1
transaction.user_id = 1
transaction.amount = '100.00'
transaction.transfer_type = :deposit
transaction.complete!
transaction.save!

transaction = Transfer.new
transaction.currency_id = 1
transaction.user_id = 1
transaction.amount = '100.00'
transaction.transfer_type = :deposit
transaction.deny!
transaction.reject_reason = 'Account holder not the same'
transaction.save!

@iban = BankAccount.find(1)

transaction = @iban.transfers.new
transaction.currency_id = 1
transaction.user_id = 1
transaction.amount = '70.00'
transaction.address_id = 1
transaction.transfer_type = :withdraw
transaction.processed_at = DateTime.now
transaction.save!

language = Language.new
language.code = 'en'
language.language = 'English'
language.save!

language = Language.new
language.code = 'de'
language.language = 'Deutsch'
language.save!

prices = [100, 99, 95, 95.01, 1.01, 1, 94, 94, 94]
[0.4342, 1, 0.5, 1, 1, 1.2, 5, 10, 10.2].each_with_index do |volume, index|
  order = Order.new(user_id: 2, status: :open, price: prices[index], volume: volume, cur_bid_id: 1, cur_ask_id: 2)
  order.save!
end

prices = [101, 102, 101.13, 106.44, 107.19, 110, 1100, 10505, 10000.15]
[0.4342, 1, 0.5, 1, 1, 1.2, 5, 10, 10.2].each_with_index do |volume, index|
  order = Order.new(user_id: 2, status: :open, price: prices[index], volume: volume, cur_bid_id: 2, cur_ask_id: 1)
  order.save!
end