class ProfilesController < ApplicationController

  def show
    @user = current_user
    @profile = current_user.prepare_profile
  end

  def update
    @profile = current_user.prepare_profile
    @profile.id = current_user.id
    @profile.assign_attributes(profile_params)
    if @profile.save
      redirect_to profile_path, notice: '更新完了'
    else
      flash.now[:error] = '更新失敗'
      render :show
    end
  end

  private
  def profile_params
    params.require(:profile).permit(:avatar)
  end
  
end