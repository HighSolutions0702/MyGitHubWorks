class OrdersController < ApplicationController

  before_action :authenticate_user!

  def new
    @transfers = current_user.transfers.page params[:page]
    @order = Order.new
    gon.balances = {btc: current_user.btc_sum, eth: current_user.eth_sum, eur: current_user.eur_sum}
    gon.exchanges = {btc2eth: 0.5, eth2btc: 2.0, btc2eur: 0.25, eur2btc: 4.0}
  end

  def create
    ap order_params
    @order = Order.new(order_params)
    if @order.save
      current_user.orders << @order
      flash[:success] = t('order.created.success')
      redirect_to :new
    else
      flash[:danger] = @order.errors.full_messages.join("")
      render :new
    end
  end

  private

  def order_params
    params.require(:order).permit(:cur_bid_id, :cur_ask_id, :volume)
  end

end
