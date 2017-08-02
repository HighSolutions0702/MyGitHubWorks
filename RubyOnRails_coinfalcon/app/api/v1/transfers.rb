module API
  module V1
    class Transfers < Grape::API

      desc 'deposit notfiy'
      params do
        requires :transfer_id, type: String
      end
      post '/deposit/notify' do
        transfer = Transfer.find(params[:transfer_id])
        if transfer.completed?
          UserMailer.deposit_success(transfer.user).deliver
          title = 'Deposit confirmed'
        else
          title = 'Bitcoin received'
        end
        content = {
            title: title,
            notification: render_view('notifications/deposit', transfer: transfer, currency: 'Bitcoin', currency_code: 'btc'),
            balance_header: render_view('layouts/balance_header', current_user: transfer.user),
            histories: render_view('transfers/list', pagination_enable: false, transfers: transfer.user.transfers.order(created_at: :desc).page),
        }
        NotificationChannel.broadcast_to(transfer.user, content)
        render_success
      end
    end
  end
end