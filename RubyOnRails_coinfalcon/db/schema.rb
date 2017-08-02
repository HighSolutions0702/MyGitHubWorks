# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170711131211) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bank_accounts", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "iban"
    t.string   "bic"
    t.string   "name"
    t.boolean  "deleted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bitcoin_network_transactions", force: :cascade do |t|
    t.decimal  "amount",        precision: 14, scale: 8
    t.integer  "confirmations",                          default: 0
    t.string   "txid"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "transfer_id"
  end

  create_table "chats", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "currencies", force: :cascade do |t|
    t.string   "code"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "deposit_bitcoin_addresses", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "address"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "languages", force: :cascade do |t|
    t.string   "language"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "status"
    t.decimal  "price",         precision: 36, scale: 18
    t.decimal  "volume",        precision: 36, scale: 18
    t.decimal  "volume_filled", precision: 36, scale: 18
    t.integer  "cur_bid_id"
    t.integer  "cur_ask_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "settings", force: :cascade do |t|
    t.string   "var",                   null: false
    t.text     "value"
    t.integer  "thing_id"
    t.string   "thing_type", limit: 30
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["thing_type", "thing_id", "var"], name: "index_settings_on_thing_type_and_thing_id_and_var", unique: true, using: :btree
  end

  create_table "trades", force: :cascade do |t|
    t.decimal  "price",          precision: 36, scale: 18
    t.decimal  "volume",         precision: 36, scale: 18
    t.integer  "order_left_id"
    t.integer  "order_right_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "transfers", force: :cascade do |t|
    t.integer  "user_id"
    t.decimal  "amount",        precision: 36, scale: 18
    t.string   "reject_reason"
    t.datetime "processed_at"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.integer  "currency_id"
    t.integer  "transfer_type"
    t.string   "address_type"
    t.integer  "address_id"
    t.string   "status"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                                               default: "",    null: false
    t.string   "encrypted_password",                                  default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                                       default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",                                     default: 0,     null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at",                                                          null: false
    t.datetime "updated_at",                                                          null: false
    t.string   "time_zone"
    t.integer  "language_id"
    t.string   "encrypted_otp_secret"
    t.string   "encrypted_otp_secret_iv"
    t.string   "encrypted_otp_secret_salt"
    t.integer  "consumed_timestep"
    t.boolean  "otp_required_for_login"
    t.string   "reference"
    t.decimal  "eur_sum",                   precision: 9,  scale: 2,  default: "0.0"
    t.decimal  "btc_sum",                   precision: 16, scale: 8,  default: "0.0"
    t.decimal  "eth_sum",                   precision: 36, scale: 18, default: "0.0"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true, using: :btree
  end

  create_table "withdraw_bitcoin_addresses", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.string   "address"
  end

end
